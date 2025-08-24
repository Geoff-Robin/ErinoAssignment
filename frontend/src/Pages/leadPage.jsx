import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Target, Activity, DollarSign, Calendar, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeadDetails = ({
    updateSuccess,
    status,
    setStatus,
    score,
    setScore,
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
    lead_value,
    setLead_value,
    last_activity_at,
    setLast_activity_at,
    is_qualified,
    setIs_qualified,
    handleUpdate,
    isUpdating,
    getStatusBadge,
    getScoreColor
}) => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-6 py-8 max-w-4xl">
            {updateSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                        Lead updated successfully! Redirecting to leads list...
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
                                    <User className="h-6 w-6" />
                                    Lead Details
                                </CardTitle>
                                <CardDescription>
                                    Manage and update lead information
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                {getStatusBadge(status)}
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4" />
                                    <span className={`font-semibold ${getScoreColor(score)}`}>
                                        Score: {score}%
                                    </span>
                                </div>
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
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter first name"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter last name"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter email address"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter phone number"
                                />
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
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                    placeholder="0-100"
                                />
                                <div className="text-sm text-gray-500">
                                    Current score: <span className={getScoreColor(score)}>{score}%</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lead_value">Estimated Value ($)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="lead_value"
                                        type="number"
                                        value={lead_value}
                                        onChange={(e) => setLead_value(e.target.value)}
                                        className="pl-10"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="source">Source</Label>
                                <Select value={source} onValueChange={setSource}>
                                    <SelectTrigger className="w-full">
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
                                    value={last_activity_at}
                                    onChange={(e) => setLast_activity_at(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="w-full">
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

                            <div className="space-y-2">
                                <Label htmlFor="is_qualified">Qualification Status</Label>
                                <div className="flex items-center space-x-3 p-3 border rounded-md">
                                    <Switch
                                        id="is_qualified"
                                        checked={is_qualified}
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
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleUpdate}
                                    disabled={isUpdating}
                                    className="min-w-[120px]"
                                >
                                    {isUpdating ? "Updating..." : "Update Lead"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export function LeadPage() {
    const { id } = useParams()
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [lead, setLead] = useState("");
    const [source, setSource] = useState("");
    const [status, setStatus] = useState("");
    const [score, setScore] = useState("");
    const [lead_value, setLead_value] = useState("");
    const [last_activity_at, setLast_activity_at] = useState("");
    const [is_qualified, setIs_qualified] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleLogout = () => {
        api.post('/api/auth/logout')
            .then(() => {
                setUser(null);
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };
    function formatDateForInput(value) {
        if (!value) return '';
        const date = new Date(value);
        if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0];
      }
      

    const handleUpdate = () => {
        setIsUpdating(true);
        api.put(`/api/leads/${id}`, {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            lead,
            source,
            status,
            score,
            lead_value,
            last_activity_at,
            is_qualified,
        })
            .then(() => {
                setUpdateSuccess(true);
                navigate(`/dashboard`)
            })
            .catch((error) => {
                console.error('Error updating lead:', error);
                setIsUpdating(false);
            });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            new: { variant: "secondary", text: "New" },
            contacted: { variant: "outline", text: "Contacted" },
            qualified: { variant: "default", text: "Qualified" },
            proposal: { variant: "secondary", text: "Proposal Sent" },
            won: { variant: "default", text: "Won" },
            lost: { variant: "destructive", text: "Lost" }
        };

        const config = statusConfig[status] || statusConfig.new;
        return <Badge variant={config.variant}>{config.text}</Badge>;
    };

    const getScoreColor = (score) => {
        const scoreNum = parseInt(score) || 0;
        if (scoreNum >= 80) return "text-green-600";
        if (scoreNum >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { replace: true });
        }
        api.get(`/api/leads/${id}`)
            .then((res) => {
                const lead = res.data;
                setFirstName(lead.first_name);
                setLastName(lead.last_name);
                setEmail(lead.email);
                setPhone(lead.phone);
                setLead(lead.lead);
                setSource(lead.source);
                setStatus(lead.status);
                setScore(lead.score);
                setLead_value(lead.lead_value);
                setLast_activity_at(formatDateForInput(lead.last_activity_at));
                setIs_qualified(lead.is_qualified);
            })
            .catch((error) => {
                console.error('Error fetching lead:', error);
            });
    }, [loading, user, id]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onLogout={handleLogout} />
            <LeadDetails
                updateSuccess={updateSuccess}
                status={status}
                score={score}
                setScore={setScore}
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
                lead_value={lead_value}
                setLead_value={setLead_value}
                last_activity_at={last_activity_at}
                setLast_activity_at={setLast_activity_at}
                is_qualified={is_qualified}
                setIs_qualified={setIs_qualified}
                handleUpdate={handleUpdate}
                isUpdating={isUpdating}
                getStatusBadge={getStatusBadge}
                getScoreColor={getScoreColor}
                setStatus={setStatus}
            />
        </div>
    );
}