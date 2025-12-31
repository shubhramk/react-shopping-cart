import React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC<{ message?: string }> = ({
  message = "Loading, please wait…",
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-12 w-full max-w-sm text-center relative overflow-hidden">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-50">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-500">
          This won’t take long
        </p>

        {/* Progress shimmer */}
        <div className="mt-6 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
