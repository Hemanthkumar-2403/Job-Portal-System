import React from "react";
import { Briefcase } from "lucide-react";

const Footer = () => {
  // Current year (example of simple JS logic)
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-900 py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">JobPortal</h3>
        </div>

        {/* Tagline */}
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Connecting talented professionals with innovative companies worldwide.
          Your career success is our mission.
        </p>

        {/* Copyright */}
        <div>
          <p className="text-sm text-gray-600">
            © {currentYear} Time To Program.
          </p>
          <p className="text-xs text-gray-500 mt-1">Made with ❤️ Happy Coding</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
