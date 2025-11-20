import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Page } from "../App";

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-orange-500 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4">About Coder Fest 2025</h3>
            <p className="text-orange-100 text-sm">
            A web development event organized by ABVP indore , bringing together innovative minds to solve real-world problems.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4">Event Details</h3>
            <div className="space-y-2 text-sm text-orange-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>SGSIT College, Indore</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>9630082694</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>jayjoshi82694@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Organized By */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4">Organized By</h3>
            <p className="text-orange-100 text-sm mb-2">
              ABVP  Indore
            </p>
            <p className="text-orange-100 text-sm">
              Hosted at SGSIT College, Indore
            </p>
            <p className="text-orange-100 text-sm mt-4">
              Date: 7 December 2025
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-orange-400 mt-8 pt-8 text-center text-orange-100 text-sm"
        >
          <p>© 2025 Coder Fest - ABVP Mahanagar Indore. All rights reserved.</p>
         
        </motion.div>
      </div>
    </footer>
  );
}