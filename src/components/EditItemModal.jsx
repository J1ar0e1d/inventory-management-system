import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInventory } from "../store/InventoryContext";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled(motion.div)`
  background: #e8f8f5;
  padding: 2rem;
  border-radius: 1rem;
  width: 400px;
  max-width: 95%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #2e7d32;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  border: 1px solid #aaa;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  ${(props) =>
    props.$cancel
      ? "background: #ccc; color: #333;"
      : "background: #2e7d32; color: white;"}

  &:hover {
    opacity: 0.9;
  }
`;

export default function EditItemModal() {
  const { editingItem, editItem, setEditingItem, updateInventory } =
    useInventory();
  const [form, setForm] = useState(editingItem || {});

  useEffect(() => {
    if (editingItem) setForm(editingItem);
  }, [editingItem]);

  if (!editingItem) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    editItem({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
      description: String(form.description),
    });
  };

  return (
    <Overlay onClick={() => setEditingItem(null)}>
      <Modal
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <Title>Edit Item</Title>
        <Input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Item Name"
        />
        <Input
          name="quantity"
          type="number"
          value={form.quantity || ""}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <Input
          name="price"
          type="number"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="Price"
        />
        <Input
          name="description"
          type="string"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Description"
        />
        <ButtonRow>
          <Button $cancel onClick={() => setEditingItem(null)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
