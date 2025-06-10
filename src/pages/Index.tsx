import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, TrendingUp, Shield, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const fetchMarketPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching market prices:', error);
      } else {
        setMarketPrices(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Farm Direct</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About Us</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</a>
              <a href="#market-prices" className="text-gray-600 hover:text-green-600 transition-colors">Market Prices</a>
              <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</Link>
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
                <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors py-2">About Us</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors py-2">How It Works</a>
                <a href="#market-prices" className="text-gray-600 hover:text-green-600 transition-colors py-2">Market Prices</a>
                <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors py-2">Contact</Link>
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
              Connecting Fields to Markets,
              <span className="text-green-600"> Sustainably</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your Local Agricultural Hub - Empowering direct, transparent connections between farmers and marketers for fair trade and efficient local supply chains.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?type=farmer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                  Join as a Farmer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth?type=marketer">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-4">
                  Join as a Marketer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Building sustainable agricultural communities through direct farmer-marketer connections, transparent pricing, and efficient local supply chains.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-gray-600">Fostering strong relationships between local farmers and marketers for mutual growth.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
                <p className="text-gray-600">Transparent market prices ensuring fair value for farmers and competitive rates for marketers.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainable Trade</h3>
                <p className="text-gray-600">Promoting environmentally conscious and economically viable agricultural practices.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Prices Section */}
      <section id="market-prices" className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Daily Market Prices</h2>
            <p className="text-gray-600">Real-time pricing information from local markets and verified marketers</p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <Leaf className="h-8 w-8 text-green-600 animate-spin mx-auto mb-4" />
              <p>Loading market prices...</p>
            </div>
          ) : marketPrices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No market prices available yet. Be the first marketer to submit prices!</p>
              <Link to="/auth?type=marketer" className="inline-block mt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Join as Marketer
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketPrices.map((item) => (
                <Card key={item.id} className="border-green-100 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.crop_name}</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">₹{item.current_price}/kg</div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{item.market_location}</p>
                      <p>{new Date(item.price_date).toLocaleDateString()}</p>
                      {item.notes && (
                        <p className="mt-2 text-xs">{item.notes}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to connect farmers with marketers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">For Farmers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Register & Create Profile</h4>
                    <p className="text-gray-600">Sign up as a farmer and provide your contact details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">List Your Crops</h4>
                    <p className="text-gray-600">Submit crop details, quantities, and desired prices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Connect with Marketers</h4>
                    <p className="text-gray-600">Get contacted by interested marketers directly</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">For Marketers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Join the Platform</h4>
                    <p className="text-gray-600">Register as a marketer with your market details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Browse & Connect</h4>
                    <p className="text-gray-600">Search available crops and contact farmers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Share Market Prices</h4>
                    <p className="text-gray-600">Update daily prices to help the community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our growing community of farmers and marketers. Create your account today and start building valuable connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?type=farmer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Join as Farmer
              </Button>
            </Link>
            <Link to="/auth?type=marketer">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Join as Marketer
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
              <span className="text-lg font-bold text-green-800">Farm Direct</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-600 transition-colors">Support</a>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>&copy; 2025 Farm Direct. All rights reserved. Building sustainable agricultural communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
