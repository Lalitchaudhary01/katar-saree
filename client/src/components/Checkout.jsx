import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const cart = location.state?.cart || []; // 🛒 Cart details
  const totalAmount = location.state?.totalAmount || 0;

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Your Shop",
      description: "Purchase",
      handler: function (response) {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "Lalit",
        email: "lalit@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">
        Complete Your Payment
      </h1>
      <p className="text-lg text-center mb-4">Total Amount: ₹{totalAmount}</p>

      {/* 🛒 Cart Items Preview */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <ul className="divide-y divide-gray-300">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center py-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md shadow-sm"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-md font-semibold">{item.title}</h3>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-500 text-sm">
                  Size: {item.size}, Color: {item.color}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 🚀 Payment Button */}
      <button
        onClick={handlePayment}
        className="mt-6 bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;

// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//   const location = useLocation();
//   const totalAmount = location.state?.totalAmount || 0;

//   useEffect(() => {
//     const loadRazorpay = async () => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       document.body.appendChild(script);
//     };
//     loadRazorpay();
//   }, []);

//   const handlePayment = async () => {
//     try {
//       // 🏷️ Step 1: Create Order from Backend
//       const orderResponse = await axios.post(
//         "http://localhost:5000/create-order",
//         {
//           amount: totalAmount,
//         }
//       );

//       const { orderId } = orderResponse.data;

//       // 🏷️ Step 2: Open Razorpay Payment
//       const options = {
//         key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
//         amount: totalAmount * 100,
//         currency: "INR",
//         name: "Your Shop",
//         description: "Purchase",
//         order_id: orderId,
//         handler: async (response) => {
//           // 🏷️ Step 3: Verify Payment
//           const verifyResponse = await axios.post(
//             "http://localhost:5000/verify-payment",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             }
//           );

//           if (verifyResponse.data.success) {
//             alert(
//               `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
//             );
//           } else {
//             alert("Payment Verification Failed!");
//           }
//         },
//         prefill: {
//           name: "Lalit",
//           email: "lalit@example.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment failed!");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         Complete Your Payment
//       </h1>
//       <p className="text-lg text-center">Total Amount: ₹{totalAmount}</p>
//       <button
//         onClick={handlePayment}
//         className="mt-4 bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default Checkout;
