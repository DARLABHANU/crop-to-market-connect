
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Plus, Eye, Edit, Trash2, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FarmerDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // User and profile data
  const [userProfile, setUserProfile] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [marketPrices, setMarketPrices] = useState<any[]>([]);

  // Form state for crop submission
  const [cropData, setCropData] = useState({
    cropName: '',
    customCrop: '',
    quantity: '',
    desiredPrice: '',
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

    if (profile.user_type !== 'farmer') {
      navigate('/marketer-dashboard');
      return;
    }

    setUserProfile(profile);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch farmer's submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('crop_submissions')
        .select('*')
        .eq('farmer_id', session.user.id)
        .order('created_at', { ascending: false });

      if (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
      } else {
        setSubmissions(submissionsData || []);
      }

      // Fetch market prices
      const { data: pricesData, error: pricesError } = await supabase
        .from('market_prices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (pricesError) {
        console.error('Error fetching market prices:', pricesError);
      } else {
        setMarketPrices(pricesData || []);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCropSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const finalCropName = cropData.cropName === 'Other' ? cropData.customCrop : cropData.cropName;
    
    const { data, error } = await supabase
      .from('crop_submissions')
      .insert([
        {
          farmer_id: session.user.id,
          crop_name: finalCropName,
          quantity: parseInt(cropData.quantity),
          desired_price: parseFloat(cropData.desiredPrice),
          notes: cropData.notes
        }
      ]);

    if (error) {
      console.error('Error submitting crop:', error);
      toast({
        title: "Error",
        description: "Failed to submit crop listing",
        variant: "destructive"
      });
      return;
    }

    setCropData({
      cropName: '',
      customCrop: '',
      quantity: '',
      desiredPrice: '',
      notes: ''
    });

    toast({
      title: "Crop Submitted Successfully",
      description: `Your ${finalCropName} listing has been added to the marketplace.`,
    });

    // Refresh submissions
    fetchData();
  };

  const handleDeleteSubmission = async (id: string) => {
    const { error } = await supabase
      .from('crop_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Submission Deleted",
      description: "Your crop listing has been removed.",
    });

    // Refresh submissions
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your crops and connect with local marketers</p>
        </div>

        <Tabs defaultValue="submit-crop" className="space-y-6">
          <TabsList className="bg-white border border-green-100">
            <TabsTrigger value="submit-crop" className="data-[state=active]:bg-green-100">
              <Plus className="h-4 w-4 mr-2" />
              Submit Crop
            </TabsTrigger>
            <TabsTrigger value="my-submissions" className="data-[state=active]:bg-green-100">
              <Eye className="h-4 w-4 mr-2" />
              My Submissions
            </TabsTrigger>
            <TabsTrigger value="market-prices" className="data-[state=active]:bg-green-100">
              Market Prices
            </TabsTrigger>
          </TabsList>

          {/* Submit Crop Form */}
          <TabsContent value="submit-crop">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Submit Crop for Sale</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCropSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Farmer Name</Label>
                      <Input value={userProfile.name} disabled className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <Input value={userProfile.mobile} disabled className="bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="crop-name">Crop Name *</Label>
                      <Select value={cropData.cropName} onValueChange={(value) => setCropData({...cropData, cropName: value})}>
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

                    {cropData.cropName === 'Other' && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-crop">Specify Crop *</Label>
                        <Input
                          id="custom-crop"
                          value={cropData.customCrop}
                          onChange={(e) => setCropData({...cropData, customCrop: e.target.value})}
                          placeholder="Enter crop name"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (in KG) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={cropData.quantity}
                        onChange={(e) => setCropData({...cropData, quantity: e.target.value})}
                        placeholder="Enter quantity"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Desired Price (per KG) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={cropData.desiredPrice}
                        onChange={(e) => setCropData({...cropData, desiredPrice: e.target.value})}
                        placeholder="Enter price in ₹"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={cropData.notes}
                      onChange={(e) => setCropData({...cropData, notes: e.target.value})}
                      placeholder="Quality, harvest date, organic certification, etc."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Submit Crop Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Submissions */}
          <TabsContent value="my-submissions">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">My Crop Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No submissions yet. Create your first crop listing!</p>
                  ) : (
                    submissions.map((submission) => (
                      <Card key={submission.id} className="border border-green-100">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{submission.crop_name}</h3>
                              <p className="text-gray-600">Submitted on {new Date(submission.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Badge variant={submission.status === 'Active' ? 'default' : 'secondary'}>
                                {submission.status}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteSubmission(submission.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Quantity</p>
                              <p className="font-semibold">{submission.quantity} KG</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Desired Price</p>
                              <p className="font-semibold text-green-600">₹{submission.desired_price}/kg</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Value</p>
                              <p className="font-semibold">₹{(submission.quantity * submission.desired_price).toFixed(2)}</p>
                            </div>
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

          {/* Market Prices View */}
          <TabsContent value="market-prices">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Current Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketPrices.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center py-8">No market prices available yet.</p>
                  ) : (
                    marketPrices.map((item) => (
                      <Card key={item.id} className="border border-green-100">
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.crop_name}</h3>
                          <div className="text-2xl font-bold text-green-600 mb-2">₹{item.current_price}/kg</div>
                          <div className="text-sm text-gray-600">
                            <p>{item.market_location}</p>
                            <p>{new Date(item.price_date).toLocaleDateString()}</p>
                          </div>
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

export default FarmerDashboard;
