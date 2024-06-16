import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orderlist = ({ orders, onUpdateStatus }) => {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleSort = (sortType) => {
    let sortedOrders = [...filteredOrders];
    if (sortType === "customer") {
      sortedOrders.sort((a, b) => a.customer.localeCompare(b.customer));
    } else if (sortType === "itemCount") {
      sortedOrders.sort((a, b) => getTotalItemCount(a) - getTotalItemCount(b));
    }
    setFilteredOrders(sortedOrders);
  };

  const getTotalItemCount = (order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  const applyFilter = (filterType) => {
    if (filterType === "name") {
      handleSort("customer");
    } else if (filterType === "count") {
      handleSort("itemCount");
    }
    handleFilterMenuClose();
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to filter orders based on search input
  const filterOrdersBySearch = () => {
    if (!searchInput.trim()) {
      setFilteredOrders(orders); // Reset to original orders if search input is empty
    } else {
      const filtered = orders.filter((order) =>
        order.customer.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order List</h1>

      {/* Button to navigate to Inventory Management */}
      <Link
        to="/inventory"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Go to Inventory Management
      </Link>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="border p-2 mr-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={filterOrdersBySearch}
        >
          Search
        </button>
      </div>

      {/* Filter and Sort buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onClick={() => handleFilter("Pending")}
        >
          Pending
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => handleFilter("Completed")}
        >
          Completed
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleFilterMenuOpen}
        >
          Filter
        </button>
        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ${
            filterAnchorEl ? "block" : "hidden"
          }`}
        >
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
            onClick={() => applyFilter("name")}
          >
            By Customer Name
          </button>
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
            onClick={() => applyFilter("count")}
          >
            By Item Count
          </button>
        </div>
      </div>

      {/* Table to display orders */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Item Count</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/order/${order.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {order.customer}
                  </Link>
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {getTotalItemCount(order)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className={`${
                      order.status === "Pending"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white px-4 py-2 rounded focus:outline-none`}
                    onClick={() => onUpdateStatus(order.id)}
                  >
                    {order.status === "Pending"
                      ? "Mark Completed"
                      : "Mark Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orderlist;
