// pages/CategoryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useInventory } from "../store/InventoryContext";
import ItemCard from "../components/ItemCard";
import styled from "styled-components";
import { categoriesTheme } from "../themes/categoriesTheme";

const Container = styled.div`
  display: grid;
  align-items: center;
  gap: 3px;
  padding: 1rem;
  background-color: ${(props) => props.bg || "#f5f5f5"};
  min-height: 100vh;
  min-width: 100vw;
  color: ${(props) => props.color || "#000"};
`;
// justify-content: center;

const Header = styled.h1`
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.color || "#0077cc"};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ItemsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { items } = useInventory();

  const categoryKey = categoryName?.toLowerCase() || "";
  const theme = categoriesTheme[categoryKey] ?? categoriesTheme.default;

  const filteredItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === categoryName.toLowerCase()
      )
    : [];
  console.log(filteredItems);

  return (
    <Container bg={theme.bg} color={theme.color}>
      <Header>
        <span style={{ fontSize: "2rem" }}>{theme.icon}</span>
        {categoryName.toUpperCase()}
      </Header>

      <BackLink to="/" color={theme.color}>
        ← Back to Categories
      </BackLink>

      {filteredItems.length > 0 ? (
        <ItemsGrid>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onEdit={item} />
          ))}
        </ItemsGrid>
      ) : (
        <p>No items found in this category.</p>
      )}
    </Container>
  );
}

// style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
