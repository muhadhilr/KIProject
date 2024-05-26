import React, { useState } from "react";

const Cashier = () => {
  const [orders, setOrders] = useState([
    { id: 1, meja: 1, pesanan: "Ayam Goreng", totalHarga: 20000, isLunas: false },
    { id: 2, meja: 2, pesanan: "Nasi Goreng", totalHarga: 18000, isLunas: false },
    { id: 3, meja: 3, pesanan: "Es Teh", totalHarga: 5000, isLunas: false },
  ]);

  const handleLunas = (id, status) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, isLunas: status } : order
    ));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="w-1/2">
        <h1 className="mb-5 text-3xl font-bold text-sky-500">Kasir</h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nomor Meja</th>
              <th className="border border-gray-200 px-4 py-2">Pesanan</th>
              <th className="border border-gray-200 px-4 py-2">Total Harga</th>
              <th className="border border-gray-200 px-4 py-2">Lunas</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="border border-gray-200 px-4 py-2">{order.meja}</td>
                <td className="border border-gray-200 px-4 py-2">{order.pesanan}</td>
                <td className="border border-gray-200 px-4 py-2">{order.totalHarga}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {order.isLunas ? (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleLunas(order.id, false)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleLunas(order.id, true)}
                    >
                      Lunas
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cashier;
