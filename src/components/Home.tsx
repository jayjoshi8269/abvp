import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Trophy,
  Wifi,
  Coffee,
  Award,
  Zap,
  Users,
  Code,
} from "lucide-react";
import { Countdown } from "./Countdown";
import { Button } from "./ui/button";
import type { Page } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Code,
      title: "AI Tools Allowed",
      description:
        "Use modern AI tools to enhance your solutions",
    },
    {
      icon: Wifi,
      title: "WiFi Facility",
      description: "High-speed internet throughout the event",
    },
    {
      icon: Coffee,
      title: "Refreshments",
      description:
        "Complimentary refreshments for all participants",
    },
    {
      icon: Award,
      title: "Certificates",
      description:
        "Participation certificates for all attendees",
    },
  ];

  const rules = [
    "Teams must have 3 to 5 members",
    "All team members must be college students",
    "Registration fee: ₹199 per team",
    "Use of AI tools is permitted and encouraged",
    "Original work only - plagiarism will lead to disqualification",
    "Follow the code of conduct throughout the event",
  ];

  const prizes = [
    {
      position: "1st Prize",
      amount: "₹21,000",
      extras: "Medal + Certificate",
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      position: "2nd Prize",
      amount: "₹11,000",
      extras: "Medal + Certificate",
      gradient: "from-gray-300 to-gray-500",
    },
    {
      position: "3rd Prize",
      amount: "₹5,100",
      extras: "Medal + Certificate",
      gradient: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudCUyMGJhbm5lcnxlbnwxfHx8fDE3NjMyNzY2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hackathon Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm uppercase tracking-wider">
                  ABVP  Indore Presents
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-white"
            >
              Coder's Fest 2025
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-orange-100"
            >
              Where Innovation Meets Excellence
              We are sorry to inform you that the event is being postponed due to a large number of registrations. We are arranging a new venue and a new date, which will be announced very soon. Thank you for your understanding
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Calendar className="w-5 h-5" />
                <span>7 December 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <MapPin className="w-5 h-5" />
                <span>SGSIT College, Indore</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate("registration")}
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg"
              >
                Register Now - ₹199/Team
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Shapes */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-orange-600 mb-4">
              Event Starts In
            </h2>
          </motion.div>
          <Countdown />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-orange-600 mb-4">
              Event Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide everything you need for an amazing
              hackathon experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Trophy className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-orange-600 mb-4">
              Exciting Prizes
            </h2>
            <p className="text-gray-600">
              Compete for amazing prizes and recognition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {prizes.map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div
                  className={`bg-gradient-to-br ${prize.gradient} rounded-2xl p-8 text-white text-center shadow-2xl`}
                >
                  <div className="mb-4">
                    <Trophy className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="mb-4 text-white">
                    {prize.position}
                  </h3>
                  <div className="mb-4 text-white">
                    {prize.amount}
                  </div>
                  <p className="text-sm opacity-90">
                    {prize.extras}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-orange-600 mb-4">
              Rules & Guidelines
            </h2>
            <p className="text-gray-600">
              Please read and follow these important guidelines
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{rule}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-orange-600 mb-4">
              Meet Our Leaders
            </h2>
            <p className="text-gray-600">
              The driving force behind Coder Fest 2025
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-orange-500">
                <ImageWithFallback
                  src="https://qbdaqpkdtcukljganman.supabase.co/storage/v1/object/sign/mian%20pthos/jk.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NTJhNDg3MS05NDQ1LTRiNzEtYTUyNi05NzU1MjI0YjMzNGEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtaWFuIHB0aG9zL2prLmpwZWciLCJpYXQiOjE3NjM2NjU3NzQsImV4cCI6MTc5NTIwMTc3NH0.A9SLqHW2cg0Y5B0iHBQrQV0gUHh3pJ1OIw67daq13nk"
                  alt="Jay Joshi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mb-2">Mr. Jay Joshi</h3>
              <p className="text-orange-600 mb-2">
                Event Coordinator
              </p>
              <p className="text-gray-600 text-sm mb-4">
                SCSIT DAVV
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>9630082694</p>
                <p>jayjoshi82694@gmail.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-orange-500">
                <ImageWithFallback
                  src="https://vzsmmxremmtzjzjagdmc.supabase.co/storage/v1/object/public/main%20jk/IMG_3953.jpg"
                  alt="Devesh Gujar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mb-2">Mr. Devesh Gujar</h3>
              <p className="text-orange-600 mb-2">
                 Secretary
              </p>
              <p className="text-gray-600 text-sm mb-4">
              City secratary Abvp indore
              </p>
              <p className="text-sm text-gray-700">
                Guidance & Support
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-white">
              Ready to Join Coder Fest 2025?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Register your team now and be part of this amazing
              event!
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("registration")}
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg"
            >
              Register Your Team Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
