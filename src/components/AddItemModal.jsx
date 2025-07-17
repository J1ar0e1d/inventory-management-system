// components/AddItemModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { useInventory } from "../store/InventoryContext";
import { v4 as uuidv4 } from "uuid";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 700px;
  max-width: 90%;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  color: #000;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1 1 45%;
  min-width: 200px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin: 6px 0 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 8px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${({ cancel }) => (cancel == "True" ? "#999" : "#0077ff")};
  color: white;
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
  padding: 8px 12px;
  background: #555;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function AddItemModal({ onClose, onAdd }) {
  const { items, updateInventory } = useInventory();

  const [form, setForm] = useState({
    name: "",
    existence: "",
    description: "",
    purchasePrice: "",
    sellPrice: "",
    category: "",
    imageUrl: "",
    barcode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerateBarcode = () => {
    setForm({ ...form, barcode: nanoid(10) });
  };

  const handleSubmit = () => {
    const newItem = {
      ...form,
      id: uuidv4(),
    };

    updateInventory([...items, newItem]);
    onClose();
  };

  const newItem = {
    ...form,
    id: nanoid(),
    barcode: form.barcode.trim() || nanoid(10),
    purchasePrice: parseFloat(form.purchasePrice),
    sellPrice: parseFloat(form.sellPrice),
    existence: parseInt(form.existence),
  };

  return (
    <Overlay>
      <Modal>
        <h2>Add New Item</h2>

        <FormRow>
          <Column>
            <Label>Name*</Label>
            <Input name="name" value={form.name} onChange={handleChange} />

            <Label>Purchase Price*</Label>
            <Input
              name="purchasePrice"
              type="number"
              value={form.purchasePrice}
              onChange={handleChange}
            />
            <Label>Initial Existence*</Label>
            <Input
              name="existence"
              type="number"
              value={form.existence}
              onChange={handleChange}
            />

            <Label>Sell Price*</Label>
            <Input
              name="sellPrice"
              type="number"
              value={form.sellPrice}
              onChange={handleChange}
            />
          </Column>

          <Column>
            <Label>Category*</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <Label>Image URL (optional)</Label>
            <Input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />

            <Label>Barcode</Label>
            <BarcodeGroup>
              <Input
                name="barcode"
                value={form.barcode}
                onChange={handleChange}
                placeholder="Leave empty or generate"
              />
              <BarcodeButton type="button" onClick={handleGenerateBarcode}>
                Generate
              </BarcodeButton>
            </BarcodeGroup>
          </Column>
        </FormRow>

        <Label>Description</Label>
        <Input
          as="textarea"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />

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
