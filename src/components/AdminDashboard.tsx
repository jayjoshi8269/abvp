import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2, Users, Download, Search } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import type { Page } from "../App";

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
}

interface Registration {
  registrationId: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderContact: string;
  collegeName: string;
  students: Array<{ name: string; email: string; contact: string }>;
  registeredAt: string;
  status: string;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7ad55f58/registrations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }

      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      alert("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) =>
    reg.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.leaderContact.includes(searchTerm) ||
    reg.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Registration ID", "Team Leader Name", "Contact Number", "Team Name", "College", "Email", "Registration Date", "Status"];
    const rows = filteredRegistrations.map((reg) => [
      reg.registrationId,
      reg.leaderName,
      reg.leaderContact,
      reg.teamName,
      reg.collegeName,
      reg.leaderEmail,
      new Date(reg.registeredAt).toLocaleString(),
      reg.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coderfest-registrations-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-10 h-10 text-orange-600" />
                <div>
                  <h1 className="text-orange-600">Admin Dashboard</h1>
                  <p className="text-gray-600 text-sm">Coder Fest 2025 Registrations</p>
                </div>
              </div>
              <Button
                onClick={() => onNavigate("home")}
                variant="outline"
              >
                Back to Home
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <p className="text-orange-100 text-sm mb-1">Total Registrations</p>
                <p className="text-white">{registrations.length}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <p className="text-green-100 text-sm mb-1">Total Participants</p>
                <p className="text-white">{registrations.length * 5}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <p className="text-blue-100 text-sm mb-1">Total Revenue</p>
                <p className="text-white">₹{registrations.length * 199}</p>
              </Card>
            </div>

            {/* Search and Export */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by team leader name, contact, or team name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={exportToCSV}
                disabled={registrations.length === 0}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={fetchRegistrations}
                variant="outline"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No registrations found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Team Leader Name</TableHead>
                      <TableHead>Contact Number</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration, index) => (
                      <motion.tr
                        key={registration.registrationId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-orange-50 transition-colors"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {registration.leaderName}
                        </TableCell>
                        <TableCell>{registration.leaderContact}</TableCell>
                        <TableCell>{registration.teamName}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {registration.collegeName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {registration.leaderEmail}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(registration.registeredAt).toLocaleDateString("en-IN")}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {registration.status}
                          </span>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>

          {/* Results count */}
          {!loading && filteredRegistrations.length > 0 && (
            <p className="text-center text-gray-600 text-sm mt-4">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}