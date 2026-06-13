import {
  Activity,
  Shield,
  Users,
  Server,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function UserHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>
        <p className="text-slate-400 mt-2">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Total Users</p>
                <h2 className="text-3xl font-bold">12,450</h2>
              </div>
              <Users className="h-10 w-10 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Security Score</p>
                <h2 className="text-3xl font-bold">98%</h2>
              </div>
              <Shield className="h-10 w-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">API Requests</p>
                <h2 className="text-3xl font-bold">56K</h2>
              </div>
              <Activity className="h-10 w-10 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Growth</p>
                <h2 className="text-3xl font-bold">+24%</h2>
              </div>
              <TrendingUp className="h-10 w-10 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Section */}
      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {[
                "User login detected",
                "Password updated",
                "API token generated",
                "OAuth account connected",
                "Profile information modified",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <Zap className="h-5 w-5 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Panel */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">
              System Status
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span>Authentication</span>
                <span className="text-green-400">Online</span>
              </div>

              <div className="flex justify-between">
                <span>Database</span>
                <span className="text-green-400">Healthy</span>
              </div>

              <div className="flex justify-between">
                <span>API Server</span>
                <span className="text-green-400">Running</span>
              </div>

              <div className="flex justify-between">
                <span>Storage</span>
                <span className="text-yellow-400">82%</span>
              </div>

              <div className="flex justify-between">
                <span>CPU Usage</span>
                <span className="text-cyan-400">36%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-8 w-8 text-cyan-400" />
              <h2 className="text-xl font-semibold">
                Infrastructure
              </h2>
            </div>

            <p className="text-slate-400">
              All services are operating normally.
              No incidents reported in the last 30 days.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Quick Actions
            </h2>

            <div className="flex flex-wrap gap-3">
              <Button>Create Project</Button>
              <Button variant="outline">
                View Reports
              </Button>
              <Button variant="outline">
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserHome;