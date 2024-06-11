import React, { useState, useEffect } from "react";
import axios from "axios";

const Cashier = () => {
  const [transactions, setTransactions] = useState([]);
  const BASE_URL = window.REACT_APP_SERVER_URL
    ? window.REACT_APP_SERVER_URL
    : "https://api-ki-project.vercel.app";
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(BASE_URL + "/api/transactions");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Perbaiki URL endpoint untuk PUT request
  const handleLunas = async (id, status) => {
    try {
      await axios.put(BASE_URL + `/api/transaction/${id}/paidoff`, {
        paidoff: status,
      });
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, paidoff: status }
            : transaction
        )
      );
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="w-1/2">
        <h1 className="mb-5 text-3xl font-bold text-sky-500">Kasir</h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border  border-gray-200 px-4 py-2">Nomor Meja</th>
              <th className="border border-gray-200 px-4 py-2">Username</th>
              <th className="border border-gray-200 px-4 py-2">Total Harga</th>
              <th className="border border-gray-200 px-4 py-2">Lunas</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border text-gray-800  border-gray-200 px-4 py-2">
                  {transaction.customer.noTable}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.customer.customerName}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.totalPrice}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.paidoff ? (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleLunas(transaction.id, false)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleLunas(transaction.id, true)}
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
