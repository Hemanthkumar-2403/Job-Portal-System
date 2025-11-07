import React from "react";
import { TrendingUp, Users, Briefcase, Target } from "lucide-react";

const Analytics = () => {
  // Stats data
  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "2.4M+",
      growth: "+15%",
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "Jobs Posted",
      value: "150K+",
      growth: "+22%",
      color: "purple",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "89K+",
      growth: "+18%",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Match Rate",
      value: "94%",
      growth: "+8%",
      color: "orange",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Platform{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Analytics
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time stats showing how our platform connects job seekers and employers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon; // store icon for easy use
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-lg hover:scale-105 transition-transform"
              >
                {/* Icon + Growth */}
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${stat.color}-100`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm font-semibold">
                    {stat.growth}
                  </span>
                </div>

                {/* Value + Title */}
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
