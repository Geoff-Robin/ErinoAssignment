import { Button } from "@/components/ui/button";
import { api } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import {LeadsTable} from "@/components/leadTable";

export default function DashboardPage() {
    const navigate = useNavigate();
    const { user, loading,setUser } = useAuth();
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { replace: true });
        }
    }, [loading, user, navigate]);
    const handleLogout = () => {
        api.post('/api/auth/logout')
            .then(() => {
                navigate('/login', { replace: true });
                setUser(null);
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };
    if (loading) return <div>Loading...</div>;
    else
    return (
        <div>
            <Navbar onLogout={handleLogout} />
            <LeadsTable/>
        </div>
    );
}
