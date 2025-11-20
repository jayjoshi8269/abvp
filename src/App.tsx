import { useState } from "react";
import { Home } from "./components/Home";
import { Registration } from "./components/Registration";
import { Contact } from "./components/Contact";
import { TechnicalTeam } from "./components/TechnicalTeam";
import { ThankYou } from "./components/ThankYou";
import { AdminDashboard } from "./components/AdminDashboard";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export type Page = "home" | "registration" | "contact" | "team" | "thankyou" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [registrationData, setRegistrationData] = useState<any>(null);

  const handleRegistrationSuccess = (data: any) => {
    setRegistrationData(data);
    setCurrentPage("thankyou");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "registration":
        return <Registration onSuccess={handleRegistrationSuccess} onNavigate={setCurrentPage} />;
      case "contact":
        return <Contact onNavigate={setCurrentPage} />;
      case "team":
        return <TechnicalTeam onNavigate={setCurrentPage} />;
      case "thankyou":
        return <ThankYou data={registrationData} onNavigate={setCurrentPage} />;
      case "admin":
        return <AdminDashboard onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}