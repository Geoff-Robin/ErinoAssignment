import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, Target, Activity, DollarSign, Calendar, CheckCircle, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/navbar";

const LeadFormUI = ({
  createSuccess,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  lead,
  setLead,
  source,
  setSource,
  status,
  setStatus,
  score,
  setScore,
  lead_value,
  setLead_value,
  last_activity_at,
  setLast_activity_at,
  is_qualified,
  setIs_qualified,
  handleCreate,
  isCreating,
  getScoreColor
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {createSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Lead created successfully! Redirecting to dashboard...
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  Create New Lead
                </CardTitle>
                <CardDescription>
                  Add a new lead to the system
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  value={firstName || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10"
                  placeholder="Enter first name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="lastName"
                  value={lastName || ""}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Lead Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">    
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="source">Lead Source *</Label>
                <Select value={source || ""} onValueChange={setSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="facebook_ads">Facebook Ads</SelectItem>
                    <SelectItem value="google_ads">Google Ads</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Lead Status *</Label>
                <Select value={status || ""} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics & Qualification */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Lead Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="score">Lead Score (%)</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={score || ""}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="0-100"
                />
                {score && (
                  <div className="text-sm text-gray-500">
                    Current score: <span className={getScoreColor(score)}>{score}%</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lead_value">Estimated Value ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="lead_value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={lead_value || ""}
                    onChange={(e) => setLead_value(e.target.value)}
                    className="pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Activity & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="last_activity_at">Last Activity Date</Label>
                <Input
                  id="last_activity_at"
                  type="date"
                  value={last_activity_at || ""}
                  onChange={(e) => setLast_activity_at(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="is_qualified">Qualification Status</Label>
                <div className="flex items-center space-x-3 p-3 border rounded-md">
                  <Switch
                    id="is_qualified"
                    checked={is_qualified || false}
                    onCheckedChange={setIs_qualified}
                  />
                  <div className="flex-1">
                    <Label htmlFor="is_qualified" className="cursor-pointer">
                      {is_qualified ? "Qualified Lead" : "Unqualified Lead"}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {is_qualified 
                        ? "This lead meets qualification criteria" 
                        : "This lead requires further qualification"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button 
                  onClick={handleCreate}
                  disabled={isCreating || !firstName || !lastName || !email || !source || !status}
                  className="min-w-[120px]"
                >
                  {isCreating ? "Creating..." : "Create Lead"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export function LeadForm() {
  const navigate = useNavigate();
  const { user, loading,setUser } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lead, setLead] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("new");
  const [score, setScore] = useState("");
  const [lead_value, setLead_value] = useState("");
  const [last_activity_at, setLast_activity_at] = useState(new Date().toISOString().split('T')[0]);
  const [is_qualified, setIs_qualified] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const onLogout = () => {
    api.post('/api/auth/logout')
      .then(() => {
        setUser(null);
        navigate('/login',{replace:true});
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const getScoreColor = (score) => {
    const scoreNum = parseInt(score) || 0;
    if (scoreNum >= 80) return "text-green-600";
    if (scoreNum >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleCreate = () => {
    setIsCreating(true);
    
    const leadData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      lead,
      source,
      status,
      score: score ? parseInt(score) : null,
      lead_value: lead_value ? parseFloat(lead_value) : null,
      last_activity_at,
      is_qualified
    };

    api.post('/api/leads', leadData)
      .then(() => {
        setCreateSuccess(true);
        navigate('/dashboard', { replace: true })
      })
      .catch((error) => {
        console.error('Error creating lead:', error);
        setIsCreating(false);
      });
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [loading, user, navigate]);
  if (loading) return <div>Loading...</div>;
  else
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={onLogout} />
      <LeadFormUI 
        createSuccess={createSuccess}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        lead={lead}
        setLead={setLead}
        source={source}
        setSource={setSource}
        status={status}
        setStatus={setStatus}
        score={score}
        setScore={setScore}
        lead_value={lead_value}
        setLead_value={setLead_value}
        last_activity_at={last_activity_at}
        setLast_activity_at={setLast_activity_at}
        is_qualified={is_qualified}
        setIs_qualified={setIs_qualified}
        handleCreate={handleCreate}
        isCreating={isCreating}
        getScoreColor={getScoreColor}
      />
    </div>
  );
}