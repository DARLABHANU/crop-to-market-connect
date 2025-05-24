
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Search, Plus, Eye, Phone, User, LogOut, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MarketerDashboard = () => {
  const { toast } = useToast();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  
  // Mock marketer data
  const marketerData = {
    name: "Priya Sharma",
    mobile: "+91 9876543210",
    email: "priya@example.com"
  };

  // Form state for market price submission
  const [priceData, setPriceData] = useState({
    marketLocation: '',
    cropName: '',
    customCrop: '',
    currentPrice: '',
    priceDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Mock farmer crop submissions
  const [farmerCrops] = useState([
    {
      id: 1,
      cropName: "Tomatoes",
      quantity: 500,
      desiredPrice: 45,
      farmerName: "Rajesh Kumar",
      farmerMobile: "+91 9876543210",
      submissionDate: "2024-05-24",
      notes: "Fresh organic tomatoes, harvested yesterday",
      status: "Active"
    },
    {
      id: 2,
      cropName: "Onions",
      quantity: 200,
      desiredPrice: 35,
      farmerName: "Suresh Patel",
      farmerMobile: "+91 9876543211",
      submissionDate: "2024-05-23",
      notes: "Premium quality red onions",
      status: "Active"
    },
    {
      id: 3,
      cropName: "Wheat",
      quantity: 1000,
      desiredPrice: 28,
      farmerName: "Arun Singh",
      farmerMobile: "+91 9876543212",
      submissionDate: "2024-05-23",
      notes: "High quality wheat, pesticide-free",
      status: "Active"
    },
    {
      id: 4,
      cropName: "Rice",
      quantity: 800,
      desiredPrice: 55,
      farmerName: "Mohan Reddy",
      farmerMobile: "+91 9876543213",
      submissionDate: "2024-05-22",
      notes: "Basmati rice, premium grade",
      status: "Active"
    }
  ]);

  // Mock market price submissions
  const [marketSubmissions, setMarketSubmissions] = useState([
    {
      id: 1,
      marketLocation: "Central Market",
      cropName: "Tomatoes",
      currentPrice: 45,
      priceDate: "2024-05-24",
      submissionDate: "2024-05-24",
      notes: "High demand, good quality available"
    },
    {
      id: 2,
      marketLocation: "Farmers Plaza",
      cropName: "Onions",
      currentPrice: 35,
      priceDate: "2024-05-24",
      submissionDate: "2024-05-24",
      notes: "Steady prices, good supply"
    }
  ]);

  const cropOptions = [
    "Tomatoes", "Onions", "Wheat", "Rice", "Potatoes", "Corn", "Carrots", "Cabbage", "Other"
  ];

  // Filter farmer crops based on search and price
  const filteredCrops = farmerCrops.filter(crop => {
    const matchesSearch = crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = !priceFilter || crop.desiredPrice <= parseInt(priceFilter);
    return matchesSearch && matchesPrice;
  });

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCropName = priceData.cropName === 'Other' ? priceData.customCrop : priceData.cropName;
    
    const newSubmission = {
      id: marketSubmissions.length + 1,
      marketLocation: priceData.marketLocation,
      cropName: finalCropName,
      currentPrice: parseInt(priceData.currentPrice),
      priceDate: priceData.priceDate,
      submissionDate: new Date().toISOString().split('T')[0],
      notes: priceData.notes
    };

    setMarketSubmissions([newSubmission, ...marketSubmissions]);
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
  };

  const handleConnectFarmer = (farmer: any) => {
    toast({
      title: "Contact Information",
      description: `You can reach ${farmer.farmerName} at ${farmer.farmerMobile}`,
    });
  };

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
                  <span>{marketerData.name}</span>
                </Button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Welcome, {marketerData.name}!
                      </div>
                      <Link
                        to="/auth"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Link>
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
          <p className="text-gray-600">Connect with farmers and manage market prices</p>
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
                      placeholder="Search by crop name or farmer..."
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
                  {filteredCrops.map((crop) => (
                    <Card key={crop.id} className="border border-green-100 hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{crop.cropName}</h3>
                            <p className="text-gray-600">Available: {crop.quantity} KG</p>
                          </div>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {crop.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Farmer</p>
                            <p className="font-semibold">{crop.farmerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Desired Price</p>
                            <p className="font-semibold text-green-600 text-lg">₹{crop.desiredPrice}/kg</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Value</p>
                            <p className="font-semibold">₹{crop.quantity * crop.desiredPrice}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Submitted</p>
                            <p className="font-semibold">{crop.submissionDate}</p>
                          </div>
                        </div>
                        
                        {crop.notes && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Notes</p>
                            <p className="text-gray-800">{crop.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex space-x-3">
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleConnectFarmer(crop)}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Farmer
                          </Button>
                          <Button variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                    <Input value={marketerData.name} disabled className="bg-gray-50" />
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
                  {marketSubmissions.map((submission) => (
                    <Card key={submission.id} className="border border-green-100">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{submission.cropName}</h3>
                            <p className="text-gray-600">{submission.marketLocation}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">₹{submission.currentPrice}/kg</div>
                            <p className="text-sm text-gray-600">Price Date: {submission.priceDate}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">Submitted on {submission.submissionDate}</p>
                        </div>
                        
                        {submission.notes && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Notes</p>
                            <p className="text-gray-800">{submission.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
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
