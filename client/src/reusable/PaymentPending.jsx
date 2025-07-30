import React from "react";

const PaymentPending = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="Warning"
          className="w-20 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Payment Pending!
        </h1>
        <p className="text-gray-700 mb-4">
          Looks like we haven't received your payment for the project yet.
        </p>
        <p className="text-sm text-gray-500 italic mb-6">
          "Code delivered, but payment pending..."
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full">
          Settle Now
        </button>
        <p className="text-xs text-gray-400 mt-4">
          This message will keep haunting you until dues are cleared. 👻
        </p>
      </div>
    </div>
  );
};

export default PaymentPending;
