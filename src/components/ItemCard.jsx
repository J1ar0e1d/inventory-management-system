// components/ItemCard.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }
`;

const ItemName = styled.h3`
  margin: 0;
  color: #000;
`;

const ItemDetails = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;
  color: #555;
`;

const EditButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #0077ff;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
`;

export default function ItemCard({ item, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Card onClick={() => setShowEdit((prev) => !prev)}>
      {showEdit && (
        <EditButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
        >
          Edit
        </EditButton>
      )}

      <ItemName>{item.name}</ItemName>
      <ItemDetails>Barcode: {item.barcode}</ItemDetails>
      <ItemDetails>Category: {item.category}</ItemDetails>
      <ItemDetails>
        Purchase: ${item.purchasePrice} | Sell: ${item.sellPrice}
      </ItemDetails>
      <ItemDetails>
        Stock: {item.existence} unit{item.existence === 1 ? "" : "s"}
      </ItemDetails>
      <ItemDetails>Description: {item.description}</ItemDetails>
    </Card>
  );
}
