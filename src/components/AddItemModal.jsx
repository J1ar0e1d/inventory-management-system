// components/AddItemModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { useInventory, InventoryProvider } from "../store/InventoryContext";
import { v4 as uuidv4 } from "uuid";
import { CATEGORY_OPTIONS } from "../assets/constants";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 80, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #e6f4ea;
  border: 2px solid #4caf50;
  border-radius: 12px;
  padding: 2rem;
  width: 700px;
  max-width: 95%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #000;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Column = styled.div`
  flex: 1 1 45%;
  min-width: 200px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 6px 0 16px;
  border: 1px solid #a5d6a7;
  border-radius: 6px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #2e7d32;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: ${(props) => (props.cancel ? "#ccc" : "#4caf50")};
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const BarcodeGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const BarcodeButton = styled.button`
  padding: 0.4rem 0.6rem;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  background: #66bb6a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #a5d6a7;
`;

export default function AddItemModal({ onClose, onAdd }) {
  const { addItem } = useInventory();

  const [itemData, setItemData] = useState({
    name: "",
    existence: "",
    description: "",
    purchasePrice: "",
    sellPrice: "",
    category: CATEGORY_OPTIONS[0],
    imageUrl: "",
    barcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateBarcode = () => {
    const randomCode = Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();
    setItemData((prev) => ({ ...prev, barcode: randomCode }));
  };

  const handleSubmit = () => {
    addItem(itemData);
    onClose();
  };

  // const newItem = {
  //   ...form,
  //   id: nanoid(),
  //   barcode: form.barcode.trim() || nanoid(10),
  //   purchasePrice: parseFloat(form.purchasePrice),
  //   sellPrice: parseFloat(form.sellPrice),
  //   existence: parseInt(form.existence),
  // };

  return (
    <Overlay>
      <Modal>
        <Row>
          <Label>Name:</Label>
          <Input name="name" value={itemData.name} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Barcode:</Label>
          <Input
            name="barcode"
            value={itemData.barcode}
            onChange={handleChange}
          />
          <BarcodeButton onClick={handleGenerateBarcode}>Auto</BarcodeButton>
        </Row>
        <Row>
          <Label>Description:</Label>
          <Input
            name="description"
            value={itemData.description}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label>Purchase Price:</Label>
          <Input
            name="purchasePrice"
            value={itemData.purchasePrice}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label>Sell Price:</Label>
          <Input
            name="sellPrice"
            value={itemData.sellPrice}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label>Stock:</Label>
          <Input name="stock" value={itemData.stock} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Category:</Label>
          <Select
            name="category"
            value={itemData.category}
            onChange={handleChange}
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </Row>
        <Row>
          <Label>Image URL:</Label>
          <Input name="image" value={itemData.image} onChange={handleChange} />
        </Row>
        <ButtonRow>
          <Button cancel onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Item</Button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
