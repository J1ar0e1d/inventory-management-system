// components/SearchBar.jsx
import styled from "styled-components";

const Input = styled.input`
  padding: 8px 12px;
  width: 300px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
`;

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <Input
      type="text"
      placeholder="Search by name, barcode, category..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
