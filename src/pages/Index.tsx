
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Users, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock market data for demonstration
  const marketPrices = [
    { cropName: "Tomatoes", price: 45, market: "Central Market", date: "2024-05-24", isNew: true },
    { cropName: "Onions", price: 35, market: "Farmers Plaza", date: "2024-05-24", isNew: true },
    { cropName: "Wheat", price: 28, market: "Grain Exchange", date: "2024-05-23", isNew: false },
    { cropName: "Rice", price: 55, market: "Wholesale Hub", date: "2024-05-23", isNew: false },
    { cropName: "Potatoes", price: 25, market: "Local Mart", date: "2024-05-22", isNew: false },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farmer",
      quote: "Climate Crop helped me connect directly with local markets. My income increased by 30%!",
      avatar: "👨‍🌾"
    },
    {
      name: "Priya Sharma",
      role: "Market Vendor",
      quote: "Finding fresh produce from local farmers has never been easier. Quality is always guaranteed.",
      avatar: "👩‍💼"
    },
    {
      name: "Arun Patel",
      role: "Farmer",
      quote: "The transparent pricing system ensures I get fair value for my crops every time.",
      avatar: "👨‍🌾"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Climate Crop</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About Us</Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</Link>
              <Link to="/auth">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Login / Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Climate Crop
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connecting Fields to Markets, Sustainably. Your Local Agricultural Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?type=farmer">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                Join as a Farmer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth?type=marketer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg">
                Join as a Marketer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empowering fair trade, efficient local supply chains, and improved market access through direct connections.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-green-100">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
                <p className="text-gray-600">Connect farmers directly with local marketers, eliminating middlemen and ensuring fair prices.</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-green-100">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">Real-time market prices and transparent transactions benefit both farmers and buyers.</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-green-100">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Future</h3>
                <p className="text-gray-600">Supporting local agriculture and reducing environmental impact through efficient supply chains.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Daily Market Prices */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Daily Market Prices</h2>
            <p className="text-lg text-gray-600">Real-time pricing information from local markets</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketPrices.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.cropName}</h3>
                    {item.isNew && <Badge className="bg-green-100 text-green-800">New!</Badge>}
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">₹{item.price}/kg</div>
                  <div className="text-sm text-gray-600">
                    <p>{item.market}</p>
                    <p>{item.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Register</h3>
              <p className="text-gray-600 text-sm">Sign up as a farmer or marketer</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">List/Browse</h3>
              <p className="text-gray-600 text-sm">Farmers list crops, marketers browse available produce</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <p className="text-gray-600 text-sm">Direct communication between farmers and marketers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Trade</h3>
              <p className="text-gray-600 text-sm">Complete transactions with fair, transparent pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-green-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">Climate Crop</span>
              </div>
              <p className="text-gray-400">Connecting fields to markets, sustainably.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Climate Crop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
