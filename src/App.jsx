import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemCard from "./components/ItemCard";
import SearchBar from "./components/SearchBar";
import AddItemModal from "./components/AddItemModal";
import EditItemModal from "./components/EditItemModal";
import { useInventory } from "./store/InventoryContext";

const Container = styled.div`
  padding: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
`;

export default function InventoryManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { items, updateInventory } = useInventory();

  console.log(`${items} this is what we're getting`);
  const deleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    updateInventory(updated);
  };

  // Sync items to localStorage on change
  useEffect(() => {
    localStorage.setItem("inventory-items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setItems(newItems);
    localStorage.setItem("inventory", JSON.stringify(newItems));
  };

  // const filteredItems = items.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.barcode.includes(searchTerm) ||
  //     item.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <Container>
      <TitleRow>
        <Title>Inventory Management</Title>
        <AddButton onClick={() => setShowAddModal(true)}>+ Add Item</AddButton>
      </TitleRow>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* {filteredItems.map((item) => (
        <ItemCard key={item.id} item={item} onEdit={setEditItem} />
      ))} */}

      {items.map((item) => (
        <ItemCard key={item.id} item={item} onEdit={setEditItem}>
          {item.name}{" "}
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </ItemCard>
      ))}

      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={handleUpdateItem}
        />
      )}
    </Container>
  );
}
