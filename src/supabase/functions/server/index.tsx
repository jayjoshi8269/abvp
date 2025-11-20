import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Initialize storage bucket
const BUCKET_NAME = "make-7ad55f58-coderfest-payments";

async function initializeBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, { public: false });
      console.log(`Created bucket: ${BUCKET_NAME}`);
    }
  } catch (error) {
    console.error("Error initializing bucket:", error);
  }
}

// Initialize bucket on startup
initializeBucket();

// Registration endpoint
app.post("/make-server-7ad55f58/register", async (c) => {
  try {
    const formData = await c.req.formData();
    
    const teamName = formData.get("teamName") as string;
    const leaderName = formData.get("leaderName") as string;
    const leaderEmail = formData.get("leaderEmail") as string;
    const leaderContact = formData.get("leaderContact") as string;
    const collegeName = formData.get("collegeName") as string;
    const studentsJson = formData.get("students") as string;
    const paymentProof = formData.get("paymentProof") as File;

    // Validate required fields
    if (!teamName || !leaderName || !leaderEmail || !leaderContact || !collegeName || !studentsJson || !paymentProof) {
      console.error("Missing required fields in registration");
      return c.json({ error: "Missing required fields" }, 400);
    }

    let students;
    try {
      students = JSON.parse(studentsJson);
    } catch (error) {
      console.error("Error parsing students JSON:", error);
      return c.json({ error: "Invalid students data" }, 400);
    }

    // Generate unique registration ID
    const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Upload payment proof to storage
    let paymentProofUrl = "";
    try {
      const fileExt = paymentProof.name.split(".").pop();
      const fileName = `${registrationId}.${fileExt}`;
      const fileBytes = await paymentProof.arrayBuffer();
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, fileBytes, {
          contentType: paymentProof.type,
        });

      if (uploadError) {
        console.error("Error uploading payment proof:", uploadError);
        throw uploadError;
      }

      // Get signed URL for the uploaded file
      const { data: urlData } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year expiry

      paymentProofUrl = urlData?.signedUrl || "";
    } catch (error) {
      console.error("Error handling payment proof upload:", error);
      return c.json({ error: "Failed to upload payment proof" }, 500);
    }

    // Store registration data in KV store
    const registrationData = {
      registrationId,
      teamName,
      leaderName,
      leaderEmail,
      leaderContact,
      collegeName,
      students,
      paymentProofUrl,
      registeredAt: new Date().toISOString(),
      status: "confirmed",
    };

    try {
      await kv.set(`registration:${registrationId}`, registrationData);
      console.log(`Registration stored: ${registrationId}`);
    } catch (error) {
      console.error("Error storing registration in KV:", error);
      return c.json({ error: "Failed to store registration data" }, 500);
    }

    // Send confirmation email
    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey && resendApiKey.trim() !== "") {
        await sendConfirmationEmail(registrationData);
        console.log(`Confirmation email sent to: ${leaderEmail}`);
      } else {
        console.log("RESEND_API_KEY not configured - skipping email notification");
        console.log(`Registration confirmed for: ${leaderEmail} (Team: ${teamName})`);
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      // Don't fail registration if email fails
    }

    return c.json({
      success: true,
      message: "Registration successful",
      registrationId,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ 
      error: "Registration failed", 
      details: error instanceof Error ? error.message : String(error) 
    }, 500);
  }
});

// Function to send confirmation email
async function sendConfirmationEmail(data: any) {
  const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    .details { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .student { background: #f9fafb; padding: 10px; margin: 10px 0; border-left: 3px solid #ea580c; }
    h1, h2, h3 { color: #ea580c; }
    .success { color: #16a34a; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Registration Confirmed!</h1>
      <p>Coder Fest 2025</p>
    </div>
    
    <div class="content">
      <p class="success">✓ Your team has been successfully registered for Coder Fest 2025!</p>
      
      <div class="details">
        <h3>Registration Details</h3>
        <p><strong>Registration ID:</strong> ${data.registrationId}</p>
        <p><strong>Team Name:</strong> ${data.teamName}</p>
        <p><strong>Team Leader:</strong> ${data.leaderName}</p>
        <p><strong>College:</strong> ${data.collegeName}</p>
        <p><strong>Contact:</strong> ${data.leaderContact}</p>
      </div>

      <h3>Team Members</h3>
      ${data.students.map((student: any, index: number) => `
        <div class="student">
          <p><strong>Student ${index + 1}:</strong> ${student.name}</p>
          <p>Email: ${student.email} | Contact: ${student.contact}</p>
        </div>
      `).join('')}

      <h3>Event Details</h3>
      <p><strong>Date:</strong> 7 December 2025</p>
      <p><strong>Venue:</strong> SGSIT College, Indore</p>
      <p><strong>Organized by:</strong> ABVP Mahanagar Indore</p>

      <h3>What to Expect</h3>
      <ul>
        <li>AI tools are allowed and encouraged</li>
        <li>High-speed WiFi facility available</li>
        <li>Complimentary refreshments</li>
        <li>Certificates for all participants</li>
        <li>Exciting prizes for winners</li>
      </ul>

      <h3>Important Notes</h3>
      <p>✓ Save this email for your records</p>
      <p>✓ Further details will be shared closer to the event date</p>
      <p>✓ Bring your student ID cards on the event day</p>

      <p><strong>For any queries, contact:</strong></p>
      <p>Jay Joshi (Event Coordinator)<br>
      Mobile: 9630082694<br>
      Email: jayjoshi82694@gmail.com</p>
    </div>

    <div class="footer">
      <p>Coder Fest 2025 - ABVP Mahanagar Indore</p>
      <p style="font-size: 12px; color: #666;">This is an automated confirmation email</p>
    </div>
  </div>
</body>
</html>
  `;

  // Send email to team leader
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "Coder Fest 2025 <onboarding@resend.dev>",
      to: [data.leaderEmail],
      cc: ["jayjoshi82694@gmail.com"],
      subject: `Registration Confirmed - Coder Fest 2025 | Team: ${data.teamName}`,
      html: emailContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email sending failed: ${errorText}`);
  }

  return await response.json();
}

// Get all registrations (admin endpoint)
app.get("/make-server-7ad55f58/registrations", async (c) => {
  try {
    const registrations = await kv.getByPrefix("registration:");
    return c.json({ success: true, registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return c.json({ error: "Failed to fetch registrations" }, 500);
  }
});

// Health check endpoint
app.get("/make-server-7ad55f58/health", (c) => {
  return c.json({ status: "ok", service: "Coder Fest 2025 Registration" });
});

Deno.serve(app.fetch);