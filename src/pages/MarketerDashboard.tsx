
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Search, Plus, Eye, User, LogOut, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MarketerDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // User and data state
  const [userProfile, setUserProfile] = useState<any>(null);
  const [farmerCrops, setFarmerCrops] = useState<any[]>([]);
  const [marketSubmissions, setMarketSubmissions] = useState<any[]>([]);

  // Form state for market price submission
  const [priceData, setPriceData] = useState({
    marketLocation: '',
    cropName: '',
    customCrop: '',
    currentPrice: '',
    priceDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const cropOptions = [
    "Tomatoes", "Onions", "Wheat", "Rice", "Potatoes", "Corn", "Carrots", "Cabbage", "Other"
  ];

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    // Fetch user profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Could not fetch user profile",
        variant: "destructive"
      });
      return;
    }

    if (profile.user_type !== 'marketer') {
      navigate('/farmer-dashboard');
      return;
    }

    setUserProfile(profile);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch all farmer crop submissions
      const { data: cropsData, error: cropsError } = await supabase
        .from('crop_submissions')
        .select('*')
        .eq('status', 'Active')
        .order('created_at', { ascending: false });

      if (cropsError) {
        console.error('Error fetching farmer crops:', cropsError);
        setFarmerCrops([]);
      } else {
        setFarmerCrops(cropsData || []);
      }

      // Fetch marketer's own submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('market_prices')
        .select('*')
        .eq('marketer_id', session.user.id)
        .order('created_at', { ascending: false });

      if (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
      } else {
        setMarketSubmissions(submissionsData || []);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCrops = farmerCrops.filter(crop => {
    const matchesSearch = crop.crop_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = !priceFilter || crop.desired_price <= parseInt(priceFilter);
    return matchesSearch && matchesPrice;
  });

  const handlePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const finalCropName = priceData.cropName === 'Other' ? priceData.customCrop : priceData.cropName;
    
    const { data, error } = await supabase
      .from('market_prices')
      .insert([
        {
          marketer_id: session.user.id,
          market_location: priceData.marketLocation,
          crop_name: finalCropName,
          current_price: parseFloat(priceData.currentPrice),
          price_date: priceData.priceDate,
          notes: priceData.notes
        }
      ]);

    if (error) {
      console.error('Error submitting price:', error);
      toast({
        title: "Error",
        description: "Failed to submit market price",
        variant: "destructive"
      });
      return;
    }

    setPriceData({
      marketLocation: '',
      cropName: '',
      customCrop: '',
      currentPrice: '',
      priceDate: new Date().toISOString().split('T')[0],
      notes: ''
    });

    toast({
      title: "Market Price Submitted",
      description: `Price for ${finalCropName} has been updated successfully.`,
    });

    // Refresh data
    fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (isLoading || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-8 w-8 text-green-600 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Climate Crop</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-green-600">View Market Prices</Link>
              <Link to="/contact" className="text-gray-600 hover:text-green-600">Contact</Link>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <User className="h-5 w-5" />
                  <span>{userProfile.name}</span>
                </Button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Welcome, {userProfile.name}!
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Marketer Dashboard</h1>
          <p className="text-gray-600">Browse farmer crops and manage market prices</p>
        </div>

        <Tabs defaultValue="farmer-crops" className="space-y-6">
          <TabsList className="bg-white border border-green-100">
            <TabsTrigger value="farmer-crops" className="data-[state=active]:bg-green-100">
              <Search className="h-4 w-4 mr-2" />
              Browse Farmer Crops
            </TabsTrigger>
            <TabsTrigger value="submit-prices" className="data-[state=active]:bg-green-100">
              <Plus className="h-4 w-4 mr-2" />
              Submit Market Prices
            </TabsTrigger>
            <TabsTrigger value="my-submissions" className="data-[state=active]:bg-green-100">
              <Eye className="h-4 w-4 mr-2" />
              My Submissions
            </TabsTrigger>
          </TabsList>

          {/* Browse Farmer Crops */}
          <TabsContent value="farmer-crops">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Available Farmer Crops</CardTitle>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by crop name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="sm:w-48">
                    <Input
                      type="number"
                      placeholder="Max price per kg"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCrops.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No farmer crops available at the moment.</p>
                  ) : (
                    filteredCrops.map((crop) => (
                      <Card key={crop.id} className="border border-green-100 hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{crop.crop_name}</h3>
                              <p className="text-gray-600">Available: {crop.quantity} KG</p>
                            </div>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {crop.status}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Desired Price</p>
                              <p className="font-semibold text-green-600 text-lg">₹{crop.desired_price}/kg</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Value</p>
                              <p className="font-semibold">₹{(crop.quantity * crop.desired_price).toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Submitted</p>
                              <p className="font-semibold">{new Date(crop.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          {crop.notes && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-1">Notes</p>
                              <p className="text-gray-800">{crop.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Market Prices */}
          <TabsContent value="submit-prices">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Submit Daily Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePriceSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Marketer Name</Label>
                    <Input value={userProfile.name} disabled className="bg-gray-50" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="market-location">Market Location/Shop Name *</Label>
                      <Input
                        id="market-location"
                        value={priceData.marketLocation}
                        onChange={(e) => setPriceData({...priceData, marketLocation: e.target.value})}
                        placeholder="e.g., Central Market, My Shop Name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price-date">Date of Price *</Label>
                      <Input
                        id="price-date"
                        type="date"
                        value={priceData.priceDate}
                        onChange={(e) => setPriceData({...priceData, priceDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="crop-name">Crop Name *</Label>
                      <Select value={priceData.cropName} onValueChange={(value) => setPriceData({...priceData, cropName: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {cropOptions.map(crop => (
                            <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {priceData.cropName === 'Other' && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-crop">Specify Crop *</Label>
                        <Input
                          id="custom-crop"
                          value={priceData.customCrop}
                          onChange={(e) => setPriceData({...priceData, customCrop: e.target.value})}
                          placeholder="Enter crop name"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-price">Current Market Price (per KG) *</Label>
                    <Input
                      id="current-price"
                      type="number"
                      step="0.01"
                      value={priceData.currentPrice}
                      onChange={(e) => setPriceData({...priceData, currentPrice: e.target.value})}
                      placeholder="Enter price in ₹"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price-notes">Additional Notes</Label>
                    <Textarea
                      id="price-notes"
                      value={priceData.notes}
                      onChange={(e) => setPriceData({...priceData, notes: e.target.value})}
                      placeholder="Market trends, availability, specific varieties, etc."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Submit Market Price
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Submissions */}
          <TabsContent value="my-submissions">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">My Market Price Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketSubmissions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No market price submissions yet.</p>
                  ) : (
                    marketSubmissions.map((submission) => (
                      <Card key={submission.id} className="border border-green-100">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{submission.crop_name}</h3>
                              <p className="text-gray-600">{submission.market_location}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">₹{submission.current_price}/kg</div>
                              <p className="text-sm text-gray-600">Price Date: {new Date(submission.price_date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600">Submitted on {new Date(submission.created_at).toLocaleDateString()}</p>
                          </div>
                          
                          {submission.notes && (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Notes</p>
                              <p className="text-gray-800">{submission.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketerDashboard;
