// components/EditItemModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useInventory } from "../store/InventoryContext";

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
  color: #000;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${({ cancel }) => (cancel ? "#999" : "#0077ff")};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

export default function EditItemModal({ item, onClose, onUpdate }) {
  const { items, updateInventory } = useInventory();

  const [form, setForm] = useState({ ...item });

  const updatedItems = items.map((item) =>
    item.id === editedItem.id ? editedItem : item
  );

  updateInventory(updatedItems);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = {
      ...form,
      purchasePrice: parseFloat(form.purchasePrice),
      sellPrice: parseFloat(form.sellPrice),
    };

    const changes = {};
    Object.keys(updated).forEach((key) => {
      if (updated[key] !== item[key]) {
        changes[key] = { from: item[key], to: updated[key] };
      }
    });

    console.log("📝 Edited item changes:", changes);
    onUpdate(updated);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h2>Edit Item</h2>

        <FormRow>
          <Column>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />

            <Label>Purchase Price</Label>
            <Input
              name="purchasePrice"
              type="number"
              value={form.purchasePrice}
              onChange={handleChange}
            />

            <Label>Sell Price</Label>
            <Input
              name="sellPrice"
              type="number"
              value={form.sellPrice}
              onChange={handleChange}
            />
          </Column>

          <Column>
            <Label>Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <Label>Image URL</Label>
            <Input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />

            <Label>Barcode</Label>
            <Input
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
            />
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
          <Button onClick={handleSave}>Edit Item</Button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
