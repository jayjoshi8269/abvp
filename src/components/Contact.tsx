import { motion } from "motion/react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { Card } from "./ui/card";
import type { Page } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ContactProps {
  onNavigate: (page: Page) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-orange-600 mb-4">Contact Us</h1>
            <p className="text-gray-600">
              Have questions? Feel free to reach out to our event coordinator
            </p>
          </div>

          {/* Coordinator Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 bg-white shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Profile Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-8 ring-orange-500 shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1627776880991-808c5996527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjBtYWxlJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzI3NjY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Jay Joshi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="mb-2">Mr. Jay Joshi</h2>
                  <p className="text-orange-600 mb-1">Event Coordinator</p>
                  <p className="text-gray-600 text-sm">SCSIT DAVV</p>
                </motion.div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <h3 className="text-orange-600 mb-6">Get in Touch</h3>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Mobile Number</p>
                      <a href="tel:9630082694" className="text-orange-600 hover:underline">
                        9630082694
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Email Address</p>
                      <a href="mailto:jayjoshi82694@gmail.com" className="text-orange-600 hover:underline">
                        jayjoshi82694@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Guidance</p>
                      <p className="text-gray-800">Under the guidance of</p>
                      <p className="text-orange-600">Mr. Devesh Gujar</p>
                      <p className="text-sm text-gray-600">ABVP Indore Secretary, ABVP</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Venue Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h3 className="mb-4 text-white">Event Venue</h3>
                <p className="text-xl mb-2">SGSIT College</p>
                <p className="text-orange-100 mb-4">Indore, Madhya Pradesh</p>
                <p className="text-orange-100">7 December 2025</p>
              </div>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              For any queries regarding registration, payment, or event details,<br />
              please don't hesitate to contact our coordinator.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}