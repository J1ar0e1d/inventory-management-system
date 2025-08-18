import React, { useState, useEffect } from "react";
import { useInventory } from "../store/InventoryContext";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ActivityModal from "../components/ActivityModal";

const PageWrapper = styled.div`
  background-color: #eaf4fc; /* light blueish */
  min-height: 100vh;
  min-width: 80vh;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #1a3d5d;
  margin-bottom: 5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const CategoriesContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #cce0f5;
  border-radius: 30px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1000px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function InventoryManager() {
  const { items, activityLog } = useInventory();
  const [showModal, setShowModal] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);

  const uniqueCategories = (items = []) => {
    const cats = new Set();
    items.forEach((item) => cats.add(item.category || "Uncategorized"));
    return [...cats];
  };

  const categories = uniqueCategories(items);

  return (
    <PageWrapper>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          background: "#2d6a4f",
          color: "white",
        }}
      >
        <Title>Inventory</Title>
        <AddButton onClick={() => setShowModal(true)}>+ Add Item</AddButton>
        <div>
          <span
            style={{
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "0.2rem 0.6rem",
              fontSize: "0.75rem",
              marginLeft: "8px",
            }}
          >
            {activityLog.length}
          </span>
          <button
            onClick={() => setIsLogOpen(true)}
            style={{
              padding: "0.5rem 1rem",
              background: "#40916c",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: "white",
            }}
          >
            View Activity Log
          </button>
        </div>
      </Header>

      <CategoriesContainer>
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/categories/${cat}`}
            style={{ textDecoration: "none" }}
          >
            <CategoryCard category={cat} />
          </Link>
        ))}
      </CategoriesContainer>
      <ActivityModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
    </PageWrapper>
  );
}
