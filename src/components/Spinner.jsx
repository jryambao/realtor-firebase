import React from "react";
export default function Spinner() {
  return (
    <>
      <div className="z-50 bg-black bg-opacity-5 flex items-center justify-center fixed left-0 right-0 top-0 bottom-0">
        <div className="flex items-center justify-center h-screen">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-red-600" />
        </div>
      </div>
    </>
  );
}
