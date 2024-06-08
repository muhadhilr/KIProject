import React, { useState, useEffect } from "react";
import axios from "axios";
import CardMenu from "../elements/CardMenu";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Dropdown from "../elements/Dropdown";

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [username, setUsername] = useState("");
  const [noTable, setNoTable] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const BASE_URL = window.REACT_APP_SERVER_URL
    ? window.REACT_APP_SERVER_URL
    : "http://localhost:3000";
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(BASE_URL + "/api/menus");
        if (!response.data) {
          throw new Error("No data received from API");
        }
        setMenus(response.data.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenus();
  }, []);
  const handleAddItem = (menuId) => {
    const existingItem = selectedItems.find((item) => item.menuId === menuId);

    if (existingItem) {
      const updatedItems = selectedItems.map((item) => {
        if (item.menuId === menuId) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      });
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { menuId, amount: 1 }]);
    }
  };

  const handleRemoveItem = (menuId) => {
    const existingItem = selectedItems.find((item) => item.menuId === menuId);

    if (existingItem) {
      if (existingItem.amount > 1) {
        const updatedItems = selectedItems.map((item) => {
          if (item.menuId === menuId) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
          return item;
        });
        setSelectedItems(updatedItems);
      } else {
        const updatedItems = selectedItems.filter(
          (item) => item.menuId !== menuId
        );
        setSelectedItems(updatedItems);
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNoTableChange = (event) => {
    setNoTable(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      if (!username || !noTable) {
        setShowErrorPopup(true);
        return;
      }

      // Kirim data ke endpoint
      const response = await axios.post(BASE_URL + "/api/transaction", {
        username,
        noTable,
        items: selectedItems,
      });
      console.log(response.data.message);

      // Reset form setelah checkout berhasil
      setUsername("");
      setNoTable("");
      setSelectedItems([]);
      setShowPopup(false);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const openPopup = () => {
    if (!username || !noTable) {
      setShowErrorPopup(true);
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowErrorPopup(false);
  };

  const tableOptions = Array.from({ length: 100 }, (_, i) => ({
    value: `A${i + 1}`,
    label: `A${i + 1}`,
  }));

  return (
    <div className="mt-10 flex  justify-center">
      <div className="ms-8">
        <h1 className="mb-8 text-3xl font-bold text-sky-500 text-center">
          Daftar Menu
        </h1>
        <div className=" grid gap-8 max-w-max lg:grid-cols-3 md:grid-cols-2 w-full">
          {menus.map((menu) => (
            <CardMenu
              key={menu.id}
              menu={menu}
              onAdd={handleAddItem}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>
      <div className="mx-8 max-h-[340px] text-center flex flex-col justify-center border-[1px] px-8 py-8 rounded-lg border-sky-500">
        <h1 className="mt-8 mb-4  text-3xl font-bold text-sky-500">
          Pemesanan
        </h1>
        <form className=" mx-auto">
          <div className="mb-5">
            <Input
              placeholder="Masukkan Nama"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              id="username"
              required
            >
              Nama
            </Input>
          </div>
          <div className="mb-5">
            <Dropdown
              options={tableOptions}
              selectedOption={noTable}
              onChange={handleNoTableChange}
            />
          </div>
          <Button className="mb-8" onClick={openPopup} type="button">
            Pesan
          </Button>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Konfirmasi Pesanan</h2>
            <p>Nama: {username}</p>
            <p>Nomor Meja: {noTable}</p>
            <h3 className="text-xl font-bold mt-4">Daftar Menu</h3>
            <ul className="mt-2 mb-4">
              {selectedItems.map((item) => {
                const menu = menus.find((menu) => menu.id === item.menuId);
                return (
                  <li key={item.menuId} className="mb-2">
                    {menu.name} x {item.amount}
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-end space-x-4">
              <Button onClick={closePopup} className="bg-gray-400">
                Batal
              </Button>
              <Button onClick={handleCheckout} className="bg-green-500">
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Oops! 😅</h2>
            <p>Maaf, sepertinya kamu lupa mengisi nama atau nomor meja.</p>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowErrorPopup(false)}
                className="bg-blue-500 text-white"
              >
                Oke
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
