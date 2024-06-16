import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = ({ orders, items, onUpdateStatus }) => {
  const { id } = useParams(); // Fetch the order ID from URL params
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  const getTotalItemCount = (order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <div className="mb-4">
        <strong>Order ID:</strong> {order.id}
      </div>
      <div className="mb-4">
        <strong>Customer:</strong> {order.customer}
      </div>
      <div className="mb-4">
        <strong>Status:</strong>{" "}
        <span
          className={`${
            order.status === "Completed" ? "text-green-600" : "text-red-600"
          }`}
        >
          {order.status}
        </span>
      </div>
      <h2 className="text-xl font-semibold mb-2">Items in Order</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Item ID</th>
              <th className="border border-gray-300 px-4 py-2">Item Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Availability</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {items.find((stockItem) => stockItem.id === item.id)?.stock >
                  item.quantity ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          className={`${
            order.status === "Pending"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white px-4 py-2 rounded focus:outline-none`}
          onClick={() => onUpdateStatus(order.id)}
        >
          {order.status === "Pending" ? "Mark Completed" : "Mark Pending"}
        </button>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
