// components/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled(Link)`
  display: block;
  background: #f0f0f0;
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;
  text-align: center;
  text-decoration: none;
  color: #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background: #e0ffe0;
  }
`;

export default function CategoryCard({ category }) {
  return <Card to={`categories/${category}`}>{category}</Card>;
}
