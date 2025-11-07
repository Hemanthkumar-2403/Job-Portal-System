import React from "react";
// Importing the data arrays (features for Job Seekers & Employers)
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="py-20 bg-white">
      {/* Main container for spacing */}
      <div className="container mx-auto px-4">

        {/* ---------- SECTION HEADING ---------- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Succeed
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you’re a job seeker or an employer, we’ve got tools to help you grow.
          </p>
        </div>

        {/* ---------- TWO SECTIONS: JOB SEEKER + EMPLOYER ---------- */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* ===== For Job Seekers ===== */}
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              For Job Seekers
            </h3>

            {/* Mapping through job seeker data */}
            <div className="space-y-6">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Title + Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== For Employers ===== */}
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              For Employers
            </h3>

            {/* Mapping through employer data */}
            <div className="space-y-6">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
