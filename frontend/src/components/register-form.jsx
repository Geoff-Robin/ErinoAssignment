import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { api } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"

export function RegisterForm({
    className,
    ...props
}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/auth/register", {
                username,
                email,
                password,
            }).then((response) => {
                setUser(response.data.id);
                navigate("/dashboard");
            }).catch((error) => {
                console.error(error);
            });
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Lead Management System</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Username</Label>
                                    <Input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="underline underline-offset-4">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
