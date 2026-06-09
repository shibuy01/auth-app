import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Globe, ShieldCheck, User } from "lucide-react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegistorData";
import { registerUser } from "@/services/AuthService";
import { useNavigate } from "react-router";


export default function Signup() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {

      //validation
      if(data.name.trim()==''){
        toast.error("Name is required!");
        return;
      }
      if(data.email.trim()==''){
        toast.error("Email is required!");
        return;
      }
      if(data.password.trim()==''){
        toast.error("Password is required!");
        return;
      }

      const result = await registerUser(data);
      console.log(result)
      toast.success("User register successfully....");
      setData({
        name: "",
        email: "",
        password: "",
      })

      navigate("/login");

     } catch (err) {
    //   setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-4 text-slate-900 dark:bg-black dark:text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-cyan-100 dark:from-slate-950 dark:via-black dark:to-blue-950" />

      <Card className="relative z-10 w-full max-w-md border-slate-200 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <CardContent className="p-8">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
              <ShieldCheck className="h-8 w-8 text-cyan-500" />
            </div>

            <h1 className="text-3xl font-bold">Create Account</h1>

            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
              Secure Authentication Platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Shibu Kumar"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="shibu@example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />

            <span className="px-4 text-xs text-slate-500">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-slate-300 dark:bg-white/10" />
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              type="button"
            >
              <Globe className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              type="button"
            >
              <User className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}