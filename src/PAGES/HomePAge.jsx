import React, { useState, useEffect } from "react";
import { useInventory } from "../store/InventoryContext";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const CategoriesContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #cce0f5;
  border-radius: 30px;
  padding: 1rem;
  display: flex;
  flex-direction: grid;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1000px;
`;

export default function InventoryManager() {
  const { items } = useInventory();

  const uniqueCategories = (items) => {
    const cats = new Set();
    items.forEach((item) => cats.add(item.category || "Uncategorized"));
    return [...cats];
  };

  const categories = uniqueCategories(items);

  return (
    <PageWrapper>
      <Title>Inventory</Title>
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
    </PageWrapper>
  );
}
