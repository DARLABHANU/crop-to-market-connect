import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Mail, Users, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const developers = [
    {
      name: "Joshitha",
      email: "joshithaaguru@gmail.com"
    },
    {
      name: "Moulini",
      email: "mouliniippili@gmail.com"
    },
    {
      name: "Kusuma",
      email: "kusumagothireddi@gmail.com"
    }
  ];

  const handleEmailClick = (email: string, name: string) => {
    const subject = encodeURIComponent("Climate Crop Inquiry");
    const body = encodeURIComponent(`Hello ${name},\n\nI hope this email finds you well. I am reaching out regarding Climate Crop.\n\nBest regards`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Climate Crop</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">Home</Link>
              <a href="/#about" className="text-gray-600 hover:text-green-600 transition-colors">About Us</a>
              <a href="/#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</a>
              <a href="/#market-prices" className="text-gray-600 hover:text-green-600 transition-colors">Market Prices</a>
              <Link to="/contact" className="text-green-600 font-medium">Contact</Link>
            </div>
            
            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              <Link to="/auth">
                <Button className="bg-green-600 hover:bg-green-700">
                  Login / Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-green-100">
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors py-2">Home</Link>
                <a href="/#about" className="text-gray-600 hover:text-green-600 transition-colors py-2">About Us</a>
                <a href="/#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors py-2">How It Works</a>
                <a href="/#market-prices" className="text-gray-600 hover:text-green-600 transition-colors py-2">Market Prices</a>
                <Link to="/contact" className="text-green-600 font-medium py-2">Contact</Link>
                <Link to="/auth" className="pt-2">
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    Login / Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Get in
              <span className="text-green-600"> Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions or need support? Our development team is here to help you with Climate Crop.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Development Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of developers who built Climate Crop to connect farmers and marketers sustainably.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {developers.map((developer, index) => (
              <Card key={index} className="text-center p-6 border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">
                      {developer.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{developer.name}</h3>
                  <p className="text-gray-600 mb-4">Developer</p>
                  <button 
                    onClick={() => handleEmailClick(developer.email, developer.name)}
                    className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{developer.email}</span>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help or Have Questions?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Feel free to reach out to any of our developers for support, feedback, or collaboration opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleEmailClick("joshithaaguru@gmail.com,mouliniippili@gmail.com,kusumagothireddi@gmail.com", "Team")}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Team
            </button>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-bold text-green-800">Climate Crop</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
              <Link to="/contact" className="hover:text-green-600 transition-colors">Support</Link>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>&copy; 2024 Climate Crop. All rights reserved. Building sustainable agricultural communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
