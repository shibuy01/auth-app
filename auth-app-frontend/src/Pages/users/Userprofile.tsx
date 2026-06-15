import useAuth from "@/auth/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Calendar, Shield } from "lucide-react";
import { NavLink } from "react-router";

function UserProfile() {
  const user = useAuth((state) => state.user);
  console.log("User--------->", user);

  const profileImage =
    user?.image?.trim()
      ? user.image
      : `https://api.dicebear.com/7.x/adventurer/svg?seed=${
          user?.name || "Shibu"
        }`;

  const name = user?.name || "Shibu Kumar";
  const email = user?.email || "shibu@example.com";
  const provider = user?.provider || "L@CAL";
  const createdAt = user?.created_at || "2026-01-01";
  console.log("provider-->", provider)
  console.log("createdAt-->", createdAt)
  console.log("After_User_CreatedAt--------->", user?.created_at);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[140px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-40 blur-2xl animate-pulse"></div>

                <div className="absolute -inset-3 rounded-full border border-cyan-400/40 animate-spin"></div>

                <img
                  src={profileImage}
                  alt={name}
                  className="relative h-40 w-40 rounded-full border-4 border-white/20 object-cover bg-slate-900"
                />

                <div className="absolute bottom-3 right-3 h-5 w-5 rounded-full bg-green-500 border-2 border-black animate-pulse"></div>

                <button className="absolute bottom-2 left-2 rounded-full bg-cyan-500 p-2 hover:bg-cyan-400 transition">
                  <Edit size={16} />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {name}
                </h1>

                <p className="mt-3 text-slate-400 flex items-center gap-2">
                  <Mail size={16} />
                  {email}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-400">
                    {provider}
                  </span>

                  <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                    {user?.enabled ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
              </div>
            <NavLink to="/dashboard/editProfile">
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  Edit Profile
                </Button>
              </NavLink>
              
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">
                Account Information
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-slate-400">Full Name</p>
                  <p>{name}</p>
                </div>

                <div>
                  <p className="text-slate-400">Email</p>
                  <p>{email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">
                Roles & Security
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-green-400" />
                <span>Verified User</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {user?.roles?.length ? (
                  user.roles.map((role: any, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-500/20 px-3 py-1 text-purple-300"
                    >
                      {role.name}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-purple-500/20 px-3 py-1 text-purple-300">
                    USER
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/5 border-white/10 hover:scale-105 transition">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-cyan-400">128</h3>
              <p>Total Logins</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 hover:scale-105 transition">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-400">24</h3>
              <p>Projects</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 hover:scale-105 transition">
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-green-400">99%</h3>
              <p>Security Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;