import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const InventoryContext = createContext();

// Custom hook to use context
export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load from localStorage or from base JSON
  useEffect(() => {
    const stored = localStorage.getItem("inventory");

    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      fetch("/data/baseInventory.json")
        .then((res) => res.json())
        .then((data) => {
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

  return (
    <InventoryContext.Provider value={{ items, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};
