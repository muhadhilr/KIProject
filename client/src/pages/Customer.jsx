import React, { useState } from "react";
import Dropdown from "../elements/Dropdown";
import Input from "../elements/Input";
import Button from "../elements/Button";

const Customer = () => {
  const [order, setOrder] = useState({
    menu: "",
    kuantitas: "",
    meja: "",
    totalHarga: 0,
    isLunas: false,
  });

  const menuOptions = [
    { value: "Ayam Goreng", label: "Ayam Goreng", harga: 20000 },
    { value: "Ayam Bakar", label: "Ayam Bakar", harga: 22000 },
    { value: "Nasi Goreng", label: "Nasi Goreng", harga: 18000 },
    { value: "Nasi Bakar", label: "Nasi Bakar", harga: 19000 },
    { value: "Es Teh", label: "Es Teh", harga: 5000 },
    { value: "Es Jeruk", label: "Es Jeruk", harga: 6000 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder, [name]: value };
      if (name === "menu" || name === "kuantitas") {
        const selectedMenu = menuOptions.find(option => option.value === newOrder.menu);
        const kuantitas = parseInt(newOrder.kuantitas, 10) || 0;
        const totalHarga = selectedMenu ? selectedMenu.harga * kuantitas : 0;
        newOrder.totalHarga = totalHarga;
      }
      return newOrder;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-5 text-3xl font-bold text-sky-500">Pemesanan</h1>
          <p>Pilihan Menu</p>
          <Dropdown
            options={menuOptions}
            selectedOption={order.menu}
            onChange={(e) => setOrder({ ...order, menu: e.target.value })}
          />
          <Input
            placeholder="Masukkan Kuantitas"
            type="number"
            value={order.kuantitas}
            onChange={handleChange}
            id="kuantitas"
            name="kuantitas"
          >
            Kuantitas
          </Input>
          <Input
            placeholder="Masukkan Nomor Meja"
            type="number"
            value={order.meja}
            onChange={handleChange}
            id="meja"
            name="meja"
          >
            Nomor Meja
          </Input>
          <div className="mt-5">
            <Button type="submit">Pesan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;
