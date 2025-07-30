// components/ItemCard.jsx
import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-width: 300px;
  max-width: 500px;
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
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
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

const Label = styled.div`
  font-weight: 600;
  color: #444;
`;

const Value = styled.div`
  color: #222;
  max-width: 60%;
  text-align: right;
  word-break: break-word;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  gap: 10px;
`;

export default function ItemCard({ item, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Card>
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
        <Value>{item.stock}</Value>
      </InfoRow>

      <ButtonRow>
        <EditButton onClick={() => onEdit(item)}>Edit</EditButton>
      </ButtonRow>
    </Card>
  );
}
