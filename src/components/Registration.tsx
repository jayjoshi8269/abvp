import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Loader2, Upload, CheckCircle, QrCode } from "lucide-react";
import type { Page } from "../App";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface RegistrationProps {
  onSuccess: (data: any) => void;
  onNavigate: (page: Page) => void;
}

interface StudentDetail {
  name: string;
  email: string;
  contact: string;
}

export function Registration({ onSuccess, onNavigate }: RegistrationProps) {
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [teamSize, setTeamSize] = useState(5); // Default to 5 members

  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    leaderContact: "",
    collegeName: "",
    students: Array(5).fill(null).map(() => ({ name: "", email: "", contact: "" })),
  });

  const handleTeamSizeChange = (size: number) => {
    setTeamSize(size);
    // Resize the students array
    const newStudents = Array(size).fill(null).map((_, i) =>
      formData.students[i] || { name: "", email: "", contact: "" }
    );
    setFormData({ ...formData, students: newStudents });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStudentChange = (index: number, field: keyof StudentDetail, value: string) => {
    const newStudents = [...formData.students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setFormData({ ...formData, students: newStudents });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!formData.teamName || !formData.leaderName || !formData.leaderEmail || !formData.leaderContact || !formData.collegeName) {
      alert("Please fill all team leader details");
      return false;
    }

    for (let i = 0; i < teamSize; i++) {
      const student = formData.students[i];
      if (!student.name || !student.email || !student.contact) {
        alert(`Please fill all details for Student ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handleSubmit = async () => {
    if (!paymentProof) {
      alert("Please upload payment proof");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("teamName", formData.teamName);
      formDataToSend.append("leaderName", formData.leaderName);
      formDataToSend.append("leaderEmail", formData.leaderEmail);
      formDataToSend.append("leaderContact", formData.leaderContact);
      formDataToSend.append("collegeName", formData.collegeName);
      formDataToSend.append("students", JSON.stringify(formData.students));
      formDataToSend.append("paymentProof", paymentProof);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7ad55f58/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);

      onSuccess(formData);
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-orange-600 mb-4">Team Registration</h1>
            <p className="text-gray-600">
              {showPayment ? "Complete your payment to confirm registration" : "Fill in your team details to register for Coder Fest 2025"}
            </p>
          </div>

          {!showPayment ? (
            <Card className="p-8 bg-white shadow-xl">
              <div className="space-y-8">
                {/* Team Details */}
                <div>
                  <h2 className="text-orange-600 mb-6">Team Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input
                        id="teamName"
                        value={formData.teamName}
                        onChange={(e) => handleInputChange("teamName", e.target.value)}
                        placeholder="Enter team name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="collegeName">College Name *</Label>
                      <Input
                        id="collegeName"
                        value={formData.collegeName}
                        onChange={(e) => handleInputChange("collegeName", e.target.value)}
                        placeholder="Enter college name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamSize">Number of Team Members *</Label>
                      <select
                        id="teamSize"
                        value={teamSize}
                        onChange={(e) => handleTeamSizeChange(Number(e.target.value))}
                        className="mt-2 w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value={3}>3 Members</option>
                        <option value={4}>4 Members</option>
                        <option value={5}>5 Members</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Team Leader Details */}
                <div>
                  <h2 className="text-orange-600 mb-6">Team Leader Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="leaderName">Name *</Label>
                      <Input
                        id="leaderName"
                        value={formData.leaderName}
                        onChange={(e) => handleInputChange("leaderName", e.target.value)}
                        placeholder="Enter leader name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderEmail">Email *</Label>
                      <Input
                        id="leaderEmail"
                        type="email"
                        value={formData.leaderEmail}
                        onChange={(e) => handleInputChange("leaderEmail", e.target.value)}
                        placeholder="Enter email"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaderContact">Contact Number *</Label>
                      <Input
                        id="leaderContact"
                        value={formData.leaderContact}
                        onChange={(e) => handleInputChange("leaderContact", e.target.value)}
                        placeholder="Enter contact number"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Student Details */}
                <div>
                  <h2 className="text-orange-600 mb-6">Team Members ({teamSize} Students) *</h2>
                  <div className="space-y-6">
                    {formData.students.map((student, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-orange-200 rounded-lg p-6 bg-orange-50/50"
                      >
                        <h3 className="mb-4">Student {index + 1}</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor={`student-${index}-name`}>Name *</Label>
                            <Input
                              id={`student-${index}-name`}
                              value={student.name}
                              onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                              placeholder="Enter name"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`student-${index}-email`}>Email *</Label>
                            <Input
                              id={`student-${index}-email`}
                              type="email"
                              value={student.email}
                              onChange={(e) => handleStudentChange(index, "email", e.target.value)}
                              placeholder="Enter email"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`student-${index}-contact`}>Contact *</Label>
                            <Input
                              id={`student-${index}-contact`}
                              value={student.contact}
                              onChange={(e) => handleStudentChange(index, "contact", e.target.value)}
                              placeholder="Enter contact"
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6"
                  size="lg"
                >
                  Proceed to Payment
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 bg-white shadow-xl">
              <div className="space-y-8">
                {/* Payment Section */}
                <div className="text-center">
                  <h2 className="text-orange-600 mb-4">Payment Details</h2>
                  <div className="bg-orange-50 rounded-lg p-6 mb-6">
                    <p className="text-gray-700 mb-2">Registration Fee</p>
                    <p className="text-orange-600 mb-4">₹199 per team</p>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-xl p-8 text-center">
                  <QrCode className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="mb-4">Scan to Pay</h3>

                  {/* QR Image */}
                  <div className="bg-white p-6 rounded-lg inline-block shadow-lg mb-4">
                    <img
                      src="https://qbdaqpkdtcukljganman.supabase.co/storage/v1/object/sign/mian%20pthos/IMG_3989.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NTJhNDg3MS05NDQ1LTRiNzEtYTUyNi05NzU1MjI0YjMzNGEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtaWFuIHB0aG9zL0lNR18zOTg5LmpwZyIsImlhdCI6MTc2Mzg2NjIzNCwiZXhwIjoxNzk1NDAyMjM0fQ.EkISfhLaORcRyLbAd1fd0HZIgb-qew8BthmrKnv1VdE"    // <-- Replace with your QR image path
                      alt="Payment QR Code"
                      className="w-48 h-48 rounded-lg object-contain"
                    />
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>UPI ID: 8269488218@ptyes</p>
                    <p>Amount: ₹199</p>
                  </div>
                </div>


                {/* Upload Payment Proof */}
                <div>
                  <Label htmlFor="paymentProof">Upload Payment Screenshot *</Label>
                  <div className="mt-2 border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                    <input
                      id="paymentProof"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="paymentProof" className="cursor-pointer">
                      {paymentProof ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="w-6 h-6" />
                          <span>{paymentProof.name}</span>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                          <p className="text-gray-600">Click to upload payment proof</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowPayment(false)}
                    variant="outline"
                    className="flex-1 py-6"
                    size="lg"
                  >
                    Back to Form
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !paymentProof}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
