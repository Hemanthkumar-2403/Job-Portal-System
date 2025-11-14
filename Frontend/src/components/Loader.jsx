import React from "react";

export default function Loader({ size = 6 }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-pink-600`}
        style={{ borderTopColor: "transparent" }}
      />
    </div>
  );
}
