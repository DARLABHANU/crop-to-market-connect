
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Plus, Eye, Edit, Trash2, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FarmerDashboard = () => {
  const { toast } = useToast();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Mock farmer data
  const farmerData = {
    name: "Rajesh Kumar",
    mobile: "+91 9876543210",
    email: "rajesh@example.com"
  };

  // Form state for crop submission
  const [cropData, setCropData] = useState({
    cropName: '',
    customCrop: '',
    quantity: '',
    desiredPrice: '',
    notes: ''
  });

  // Mock submissions data
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      cropName: "Tomatoes",
      quantity: 500,
      desiredPrice: 45,
      status: "Active",
      submissionDate: "2024-05-24",
      notes: "Fresh organic tomatoes, harvested yesterday"
    },
    {
      id: 2,
      cropName: "Onions",
      quantity: 200,
      desiredPrice: 35,
      status: "Pending Match",
      submissionDate: "2024-05-23",
      notes: "Premium quality red onions"
    }
  ]);

  // Mock market prices for viewing
  const marketPrices = [
    { cropName: "Tomatoes", price: 45, market: "Central Market", date: "2024-05-24" },
    { cropName: "Onions", price: 35, market: "Farmers Plaza", date: "2024-05-24" },
    { cropName: "Wheat", price: 28, market: "Grain Exchange", date: "2024-05-23" },
    { cropName: "Rice", price: 55, market: "Wholesale Hub", date: "2024-05-23" },
  ];

  const cropOptions = [
    "Tomatoes", "Onions", "Wheat", "Rice", "Potatoes", "Corn", "Carrots", "Cabbage", "Other"
  ];

  const handleCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCropName = cropData.cropName === 'Other' ? cropData.customCrop : cropData.cropName;
    
    const newSubmission = {
      id: submissions.length + 1,
      cropName: finalCropName,
      quantity: parseInt(cropData.quantity),
      desiredPrice: parseInt(cropData.desiredPrice),
      status: "Active",
      submissionDate: new Date().toISOString().split('T')[0],
      notes: cropData.notes
    };

    setSubmissions([newSubmission, ...submissions]);
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
  };

  const handleDeleteSubmission = (id: number) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
    toast({
      title: "Submission Deleted",
      description: "Your crop listing has been removed.",
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
                  <span>{farmerData.name}</span>
                </Button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Welcome, {farmerData.name}!
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
                      <Input value={farmerData.name} disabled className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <Input value={farmerData.mobile} disabled className="bg-gray-50" />
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
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="border border-green-100">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{submission.cropName}</h3>
                            <p className="text-gray-600">Submitted on {submission.submissionDate}</p>
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
                            <p className="font-semibold text-green-600">₹{submission.desiredPrice}/kg</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Value</p>
                            <p className="font-semibold">₹{submission.quantity * submission.desiredPrice}</p>
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
                  ))}
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
                  {marketPrices.map((item, index) => (
                    <Card key={index} className="border border-green-100">
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.cropName}</h3>
                        <div className="text-2xl font-bold text-green-600 mb-2">₹{item.price}/kg</div>
                        <div className="text-sm text-gray-600">
                          <p>{item.market}</p>
                          <p>{item.date}</p>
                        </div>
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

export default FarmerDashboard;
