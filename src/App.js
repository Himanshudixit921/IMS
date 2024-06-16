import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderDetails from "./component/orderdetail/OrderDetails";
import Orderlist from "./component/orderlist/Orderlist";
import InventoryManagement from "./component/InventoryManagement/InventoryManagement";
import { ordersData, itemsData } from "./data/data";

const App = () => {
  const [orders, setOrders] = useState(ordersData);

  const onUpdateStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: order.status === "Pending" ? "Completed" : "Pending",
            }
          : order
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Orderlist orders={orders} onUpdateStatus={onUpdateStatus} />
          }
        />
        <Route
          path="/order/:id"
          element={
            <OrderDetails
              orders={orders}
              items={itemsData}
              onUpdateStatus={onUpdateStatus}
            />
          }
        />
        <Route
          path="/inventory"
          element={<InventoryManagement itemsData={itemsData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
