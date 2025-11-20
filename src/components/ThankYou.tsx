import { motion } from "motion/react";
import { CheckCircle, Sparkles, Mail, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Page } from "../App";

interface ThankYouProps {
  data: any;
  onNavigate: (page: Page) => void;
}

export function ThankYou({ data, onNavigate }: ThankYouProps) {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Animation */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="relative">
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-24 h-24 bg-green-500 rounded-full blur-xl"
                />
              </div>
            </motion.div>
          </div>

          <Card className="p-8 md:p-12 bg-white shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-green-600 mb-4">Registration Successful!</h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-orange-600"
              >
                <Sparkles className="w-6 h-6" />
                <p className="text-xl">Welcome to Coder Fest 2025</p>
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>

            {/* Team Details */}
            {data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 mb-8"
              >
                <h3 className="text-orange-600 mb-4">Team Details</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Name:</span>
                    <span>{data.teamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Leader:</span>
                    <span>{data.leaderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">College:</span>
                    <span>{data.collegeName}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-6"
            >
              <div className="border-t border-orange-200 pt-6">
                <h3 className="text-orange-600 mb-4">What's Next?</h3>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        A confirmation email has been sent to <span className="text-orange-600">{data?.leaderEmail}</span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Mark your calendar: <span className="text-orange-600">7 December 2025</span> at SGSIT College, Indore
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Further details and guidelines will be shared via email before the event
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="text-center pt-6">
                <p className="text-gray-600 mb-6">
                  For any queries, contact our coordinator at<br />
                  <a href="tel:9630082694" className="text-orange-600 hover:underline">9630082694</a> or{" "}
                  <a href="mailto:jayjoshi82694@gmail.com" className="text-orange-600 hover:underline">jayjoshi82694@gmail.com</a>
                </p>
                <Button
                  onClick={() => onNavigate("home")}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6"
                  size="lg"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </Card>

          {/* Celebration Animation */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
                animate={{
                  y: window.innerHeight + 20,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute"
              >
                <Sparkles
                  className="text-orange-500"
                  style={{
                    width: 20 + Math.random() * 20,
                    height: 20 + Math.random() * 20,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}