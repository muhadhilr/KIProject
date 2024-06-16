import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from "../services/LogOut";

const BASE_URL = import.meta.env.VITE_UrlAPI;
const API_KEY = import.meta.env.VITE_APIKey;

const Cashier = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/transactions`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });
        setTransactions(response.data.data);
      } catch (error) {
        setError("Failed to fetch transactions.");
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleLunas = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/transaction/${id}/paidoff`,
        { paidoff: status },
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="w-1/2">
        <h1 className="mb-5 text-3xl font-bold text-sky-500">Kasir</h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nomor Meja</th>
              <th className="border border-gray-200 px-4 py-2">Username</th>
              <th className="border border-gray-200 px-4 py-2">Total Harga</th>
              <th className="border border-gray-200 px-4 py-2">Lunas</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td className="border text-gray-800 border-gray-200 px-4 py-2">
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
      <Logout />
    </div>
  );
};

export default Cashier;
