import { motion } from "motion/react";
import { Users } from "lucide-react";
import { Card } from "./ui/card";
import type { Page } from "../App";

interface TechnicalTeamProps {
  onNavigate: (page: Page) => void;
}

export function TechnicalTeam({ onNavigate }: TechnicalTeamProps) {
  // Team members - Edit names and colleges below
  const teamMembers = [
    { id: 1, name: "Sumit Singh", college: "BCA SCSIT" },
    { id: 2, name: "Akshara Yadav", college: "BCA SCSIT" },
    { id: 3, name: "Rimjhim Parmar", college: "BCA SCSIT" },
    { id: 4, name: "Divya Khatir", college: "M.Sy Cyber" },
    { id: 5, name: "Divyanshi Tiwari", college: "BCA SCSIT" },
    { id: 6, name: "Aagya Namdeo", college: "BCA SCSIT" },
    { id: 7, name: "Sunny Sikharwar", college: "BCA SCSIT" },
    { id: 8, name: "Yash Soni", college: "BCA SCSIT" },
    { id: 9, name: "Nandni Thakur", college: "BCA SCSIT" },
    { id: 10, name: "Yamini Soni", college: "BCA SCSIT" },
    { id: 11, name: "Rachit Neema", college: "MCA IIPS" },
    { id: 12, name: "Pratha Sahu", college: "BCA SCSIT" },
    { id: 13, name: "Pranav", college: "BCA SCSIT" },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Users className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-orange-600 mb-4">Technical Team</h1>
            <p className="text-gray-600">
              Meet the dedicated technical team behind Coder Fest 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">
                        {member.name.split(" ").map(n => n[0]).join("").toUpperCase() || member.id}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <h3 className="text-gray-800 truncate">{member.name}</h3>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 truncate">{member.college}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
           
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}