import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Link, useNavigate } from "react-router";
import useAuth from "@/auth/store";

import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useState, type ReactElement } from "react";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";

function Login() {

  const [data, setData] = useState<LoginData>({
    email:"",
    password:"",
  });

  const [loading, setLoading] = useState(false);
  const[error, setError] = useState<string | null>(null);
 const login = useAuth((state) => state.login);
const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    const {name, value} = event.target;

     setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);
  setError(null);

  try {
    if (data.email.trim() === "") {
      toast.error("Email is required!");
      return;
    }

    if (data.password.trim() === "") {
      toast.error("Password is required!");
      return;
    }

    const result = await login(data);

    // console.log("RESULT:", result);

    toast.success("Successfully Login...");

    setData({
      email: "",
      password: "",
    });

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong...");
  } finally {
    setLoading(false);
  }
};
  

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-black dark:text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-cyan-100 dark:from-slate-950 dark:via-black dark:to-blue-950" />

      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/20" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />

      <div className="relative z-10 flex min-h-screen">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-600 dark:text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
              Secure Authentication Platform
            </div>

            <h1 className="text-6xl font-bold leading-tight">
              Secure Access
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                For Modern Apps
              </span>
            </h1>

            <p className="mt-8 text-lg text-slate-600 dark:text-slate-400">
              JWT Authentication, OAuth2 Login, Role-Based Access
              Control and enterprise-grade security for your users.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <Card className="border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-bold text-cyan-500">
                    1M+
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Users Protected
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-bold text-cyan-500">
                    99.99%
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Uptime
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
          <Card className="w-full max-w-md border-slate-200 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">
                  Welcome Back
                </h2>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Sign in to your account
                </p>
              </div>

           <form onSubmit={handleSubmit}>
              {/* Google Login */}
              <Button
                variant="outline"
                className="mb-4 w-full"
                type="button"
              >
                Continue with Google
              </Button>

              {/* GitHub Login */}
              <Button
                variant="outline"
                className="w-full"
                type="button"
              >
                Continue with GitHub
              </Button>

              <div className="my-6 flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-sm text-slate-500">
                  OR
                </span>
                <Separator className="flex-1" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                    placeholder="shibu@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-5 space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" required />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-cyan-500 hover:text-cyan-600"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

              {/* Register */}
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cyan-500 hover:text-cyan-600"
                >
                  Create Account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;