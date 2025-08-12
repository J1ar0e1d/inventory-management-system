// components/EditItemModal.jsx
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInventory } from "../store/InventoryContext";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Modal = styled(motion.div)`
  background: #e6f7ea;
  padding: 2rem;
  width: 700px;
  max-width: 95%;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    margin-bottom: 1rem;
    color: #206030;
  }
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  label {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #2a4d3f;

    input,
    select {
      margin-top: 0.4rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;

  .cancel {
    background: #ccc;
    color: #333;
  }

  .edit {
    background: #27ae60;
    color: white;
  }

  button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }
`;

export default function EditItemModal({ item, onClose }) {
  const { updateInventory } = useInventory();
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item); // preload data on item prop change
  }, [item]);

  // const updatedItems = items.map((item) =>
  //   item.id === editeditem.id ? editedItem : item
  // );

  // updateInventory(updatedItems);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    updateInventory(formData); // logic in context
    onClose(); // close modal after update
  };

  return (
    <Overlay>
      <Modal
        initial={{ opacity: 0, y: "-20%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "-20%" }}
        transition={{ duration: 0.3 }}
      >
        <h2>Edit Item</h2>
        <Form>
          <label>
            Name:
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Barcode:
            <input
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
            />
          </label>
          <label>
            Purchase Price:
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
            />
          </label>
          <label>
            Sell Price:
            <input
              type="number"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Tools">Tools</option>
              <option value="Paint">Paint</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Hardware">Hardware</option>
            </select>
          </label>
          <label>
            Existence:
            <input
              type="number"
              name="existence"
              value={formData.existence}
              onChange={handleChange}
            />
          </label>
        </Form>

        <ButtonRow>
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
          <button onClick={handleEdit} className="edit">
            Edit
          </button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}
