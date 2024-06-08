import React, { useState, useEffect } from "react";
import axios from "axios";

const Manager = () => {
  const [transactions, setTransactions] = useState([]);
  const [menuAvailability, setMenuAvailability] = useState([]);

  // Base URL
  const BASE_URL = window.REACT_APP_SERVER_URL
    ? window.REACT_APP_SERVER_URL
    : "http://localhost:3000";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/transactions`);
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchMenuAvailability = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/menus`);
        setMenuAvailability(response.data.data);
      } catch (error) {
        console.error("Error fetching menu availability:", error);
      }
    };

    fetchTransactions();
    fetchMenuAvailability();
  }, []);

  const toggleAvailability = async (id) => {
    try {
      const menuToUpdate = menuAvailability.find((menu) => menu.id === id);
      const updatedAvailability = !menuToUpdate.isAvailable;
      await axios.put(`${BASE_URL}/api/menu/${id}/availability`, {
        isAvailable: updatedAvailability,
      });
      setMenuAvailability(
        menuAvailability.map((menu) =>
          menu.id === id ? { ...menu, isAvailable: updatedAvailability } : menu
        )
      );
    } catch (error) {
      console.error("Error updating menu availability:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-3/4 py-10">
        <h1 className="mb-5 text-3xl font-bold text-sky-500">Manager</h1>

        <h2 className="mb-3 text-2xl font-semibold">Daftar Transaksi</h2>
        {/* Tabel transaksi */}
        <table className="w-full border-collapse border border-gray-200 mb-10">
          {/* Header tabel */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nomor Meja</th>
              <th className="border border-gray-200 px-4 py-2">Username</th>
              <th className="border border-gray-200 px-4 py-2">Total Harga</th>
              <th className="border border-gray-200 px-4 py-2">Lunas</th>
            </tr>
          </thead>
          {/* Isi tabel */}
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.customer.noTable}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.customer.customerName}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.totalPrice}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.paidoff ? "Lunas" : "Belum Lunas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mb-3 text-2xl font-semibold">Ketersediaan Menu</h2>
        {/* Tabel ketersediaan menu */}
        <table className="w-full border-collapse border border-gray-200">
          {/* Header tabel */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nama Menu</th>
              <th className="border border-gray-200 px-4 py-2">Harga</th>
              <th className="border border-gray-200 px-4 py-2">Tersedia</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          {/* Isi tabel */}
          <tbody>
            {menuAvailability.map((menu) => (
              <tr key={menu.id}>
                <td className="border border-gray-200 px-4 py-2">
                  {menu.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {menu.price}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {menu.isAvailable ? "Tersedia" : "Habis"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className={`px-4 py-2 rounded ${
                      menu.isAvailable ? "bg-red-500" : "bg-green-500"
                    } text-white`}
                    onClick={() => toggleAvailability(menu.id)}
                  >
                    {menu.isAvailable ? "Tandai Habis" : "Tandai Tersedia"}
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

export default Manager;