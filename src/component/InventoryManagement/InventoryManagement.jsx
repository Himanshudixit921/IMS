import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { itemsData } from "../../data/data";

const InventoryManagement = () => {
  const [items, setItems] = useState(itemsData);
  const [filter, setFilter] = useState("all");
  const [newItemName, setNewItemName] = useState("");
  const [newItemStock, setNewItemStock] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemStock, setEditItemStock] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleAddItem = (event) => {
    event.preventDefault();
    const newItem = {
      id: Date.now(),
      name: newItemName,
      stock: parseInt(newItemStock, 10),
    };
    itemsData.push(newItem);
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemStock("");
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    itemsData.length = 0;
    itemsData.push(...updatedItems);
    setItems(updatedItems);
  };

  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setEditItemName(item.name);
    setEditItemStock(item.stock);
  };

  const handleUpdateItem = (event) => {
    event.preventDefault();
    const updatedItems = items.map((item) =>
      item.id === editingItem
        ? { ...item, name: editItemName, stock: parseInt(editItemStock, 10) }
        : item
    );
    itemsData.length = 0;
    itemsData.push(...updatedItems);
    setItems(updatedItems);
    setEditingItem(null);
    setEditItemName("");
    setEditItemStock("");
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filterItemsBySearch = () => {
    if (!searchInput.trim()) {
      setItems(itemsData);
    } else {
      const filtered = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setItems(filtered);
    }
  };

  const resetItems = () => {
    setItems(itemsData);
    setSearchInput("");
  };

  const handleBackToList = () => {
    navigate("/"); // Navigate to the root path ("/") assuming OrderList is rendered there
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="border p-2 mr-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={filterItemsBySearch}
        >
          Search
        </button>
      </div>

      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="border p-2 mr-4"
          required
        />
        <input
          type="number"
          placeholder="Initial Stock"
          value={newItemStock}
          onChange={(e) => setNewItemStock(e.target.value)}
          className="border p-2 mr-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </form>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.stock}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditItem(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItem && (
        <form onSubmit={handleUpdateItem} className="mt-4">
          <input
            type="text"
            placeholder="Item Name"
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
            className="border p-2 mr-4"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={editItemStock}
            onChange={(e) => setEditItemStock(e.target.value)}
            className="border p-2 mr-4"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Item
          </button>
        </form>
      )}

      <button
        onClick={handleBackToList}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
      >
        Back to Order List
      </button>
    </div>
  );
};

export default InventoryManagement;
