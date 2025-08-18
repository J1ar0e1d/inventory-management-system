// components/ItemCard.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInventory } from "../store/InventoryContext";

const MotionCard = styled(motion.div)`
  flex: 1 1 calc(250px - 1rem);
  background: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
  margin-right: 0.25rem;
`;

const EditButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #388e3c;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Value = styled.div`
  color: #222;
  max-width: 60%;
  text-align: right;
  word-break: break-word;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 0.95rem;
  gap: 10px;
`;

export default function ItemCard({ item }) {
  const [showEdit, setShowEdit] = useState(false);

  const { setEditingItem } = useInventory();

  return (
    <MotionCard
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      layout
      whileTap={{ scale: 0.97 }}
      // onClick={() => onEdit?.(item)}
    >
      <InfoRow>
        <Label>Name:</Label>
        <Value>{item.name}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Barcode:</Label>
        <Value>{item.barcode}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Description:</Label>
        <Value>{item.description}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Purchase Price:</Label>
        <Value>${item.purchasePrice}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Sell Price:</Label>
        <Value>${item.sellPrice}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Category:</Label>
        <Value>{item.category}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Stock:</Label>
        <Value>{item.existence}</Value>
      </InfoRow>

      <ButtonRow>
        <EditButton onClick={() => setEditingItem(item)}>Edit</EditButton>
      </ButtonRow>
    </MotionCard>
  );
}
