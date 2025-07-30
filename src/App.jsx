import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemCard from "./components/ItemCard";
import SearchBar from "./components/SearchBar";
import AddItemModal from "./components/AddItemModal";
import EditItemModal from "./components/EditItemModal";
import { useInventory } from "./store/InventoryContext";

const CategorySection = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #000;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
`;

const categoryColors = {
  Tools: "#cce3ff",
  Snacks: "#fff4d6",
  Electronics: "#e6ffe6",
  Cleaning: "#ffe6e6",
};

// +++++++++++++++++++++++++++++++++++++++++++
const Container = styled.div`
  padding: 20px;
`;

const SortContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  margin-right: 0.5rem;
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
  const { items, updateInventory } = useInventory();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("nameAsc");

  const sortOptions = [
    { value: "nameAsc", label: "Name (A–Z)" },
    { value: "nameDesc", label: "Name (Z–A)" },
    { value: "priceAsc", label: "Price (Low → High)" },
    { value: "priceDesc", label: "Price (High → Low)" },
    { value: "stockAsc", label: "Existence (Low → High)" },
    { value: "stockDesc", label: "Existence (High → Low)" },
  ];

  // Groups items by category

  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    acc[cat] = acc[cat] ? [...acc[cat], item] : [item];
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const toggleCollapse = (category) => {
    setCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      switch (sortOrder) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "priceAsc":
          return a.sellPrice - b.sellPrice;
        case "priceDesc":
          return b.sellPrice - a.sellPrice;
        case "stockAsc":
          return a.stock - b.stock;
        case "stockDesc":
          return b.stock - a.stock;
        default:
          return 0;
      }
    });
  };

  return (
    <Container>
      <TitleRow>
        <Title>Inventory Management</Title>
        <AddButton onClick={() => setShowAddModal(true)}>+ Add Item</AddButton>
      </TitleRow>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <FilterContainer>
        <label htmlFor="categoryFilter">Filter by category: </label>
        <Select
          id="categoryFilter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </FilterContainer>

      <SortContainer>
        <Label htmlFor="sortItems">Sort items by: </Label>
        <Select
          id="sortItems"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </SortContainer>

      {Object.entries(grouped).map(([category, itemsInCategory]) => {
        if (filterCategory !== "All" && category !== filterCategory)
          return null;

        return (
          <CategorySection key={category}>
            <CategoryHeader
              style={{
                background: categoryColors[category] || "#f3f3f3",
              }}
              onClick={() => toggleCollapse(category)}
            >
              <CategoryTitle>{category}</CategoryTitle>
              <span>{collapsed[category] ? "➕ Show" : "➖ Hide"}</span>
            </CategoryHeader>

            {!collapsed[category] && (
              <ItemGrid>
                {sortItems(itemsInCategory).map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </ItemGrid>
            )}
          </CategorySection>
        );
      })}

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
