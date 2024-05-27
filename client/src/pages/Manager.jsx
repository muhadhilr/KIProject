import React, { useState } from "react";

const Manager = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, meja: 1, pesanan: "Ayam Goreng", totalHarga: 20000, isLunas: true },
    { id: 2, meja: 2, pesanan: "Nasi Goreng", totalHarga: 18000, isLunas: false },
    { id: 3, meja: 3, pesanan: "Es Teh", totalHarga: 5000, isLunas: true },
  ]);

  const [menuAvailability, setMenuAvailability] = useState([
    { id: 1, nama: "Ayam Goreng", harga: 20000, tersedia: true },
    { id: 2, nama: "Ayam Bakar", harga: 22000, tersedia: false },
    { id: 3, nama: "Nasi Goreng", harga: 18000, tersedia: true },
    { id: 4, nama: "Nasi Bakar", harga: 19000, tersedia: true },
    { id: 5, nama: "Es Teh", harga: 5000, tersedia: true },
    { id: 6, nama: "Es Jeruk", harga: 6000, tersedia: false },
  ]);

  const toggleAvailability = (id) => {
    setMenuAvailability(menuAvailability.map(menu => 
      menu.id === id ? { ...menu, tersedia: !menu.tersedia } : menu
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-3/4 py-10">
        <h1 className="mb-5 text-3xl font-bold text-sky-500">Manager</h1>
        
        <h2 className="mb-3 text-2xl font-semibold">Daftar Transaksi</h2>
        <table className="w-full border-collapse border border-gray-200 mb-10">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nomor Meja</th>
              <th className="border border-gray-200 px-4 py-2">Pesanan</th>
              <th className="border border-gray-200 px-4 py-2">Total Harga</th>
              <th className="border border-gray-200 px-4 py-2">Lunas</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="border border-gray-200 px-4 py-2">{transaction.meja}</td>
                <td className="border border-gray-200 px-4 py-2">{transaction.pesanan}</td>
                <td className="border border-gray-200 px-4 py-2">{transaction.totalHarga}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.isLunas ? "Lunas" : "Belum Lunas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mb-3 text-2xl font-semibold">Ketersediaan Menu</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nama Menu</th>
              <th className="border border-gray-200 px-4 py-2">Harga</th>
              <th className="border border-gray-200 px-4 py-2">Tersedia</th>
              <th className="border border-gray-200 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menuAvailability.map(menu => (
              <tr key={menu.id}>
                <td className="border border-gray-200 px-4 py-2">{menu.nama}</td>
                <td className="border border-gray-200 px-4 py-2">{menu.harga}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {menu.tersedia ? "Tersedia" : "Habis"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className={`px-4 py-2 rounded ${menu.tersedia ? "bg-red-500" : "bg-green-500"} text-white`}
                    onClick={() => toggleAvailability(menu.id)}
                  >
                    {menu.tersedia ? "Tandai Habis" : "Tandai Tersedia"}
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
