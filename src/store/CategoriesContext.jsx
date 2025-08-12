import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CatetoryContext = createContext();

export const CatetoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Load from localStorage or from base JSON
  useEffect(() => {
    const stored = localStorage.getItem("inventory");

    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      fetch("/baseInventory.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setItems(data);

          localStorage.setItem("inventory", JSON.stringify(data));
        })
        .catch((err) => console.error("Failed to load base inventory:", err));
    }
  }, []);

  // 🔁 Always sync state updates with localStorage
  const updateInventory = (newItems) => {
    setItems(newItems);
    localStorage.setItem("inventory", JSON.stringify(newItems));
  };

  const editItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    localStorage.setItem("inventory", JSON.stringify(updatedItem));
  };

  // Adds items to the corresponding category
  const addItem = (newItem) => {
    setItems((prev) => {
      const updated = [...prev, { ...newItem, id: Date.now() }];
      localStorage.setItem("items", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        setItems,
        updateInventory,
        addItem,
        editItem,
        editingItem,
        setEditingItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export function useInventory() {
  return useContext(InventoryContext);
}
