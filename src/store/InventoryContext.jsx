import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  // Load from localStorage or from base JSON
  useEffect(() => {
    const stored = localStorage.getItem("inventory-items");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          setItems([]);
          console.error("Inventory is not an array.");
        }
      } catch (err) {
        console.error("Failed to parse stored inventory:", err);
        setItems([]);
      }
    } else {
      // Optionally load default inventory
      fetch("/baseInventory.json")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setItems(data);
            localStorage.setItem("inventory-items", JSON.stringify(data));
          }
        })
        .catch((err) => {
          console.error("Failed to load base inventory:", err);
          setItems([]);
        });
    }
  }, []);

  const logActivity = (message) => {
    const entry = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleString(),
    };
    setActivityLog((prev) => [entry, ...prev]); // newest first
  };

  // 🔁 Always sync state updates with localStorage
  const updateInventory = (newItems) => {
    setItems(newItems);
    localStorage.setItem("inventory-items", JSON.stringify(newItems));
  };

  const editItem = (updatedItem) => {
    setItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === updatedItem.id) {
          // log the differences
          const changes = [];
          if (item.name !== updatedItem.name)
            changes.push(`Name: "${item.name}" → "${updatedItem.name}"`);
          if (item.quantity !== updatedItem.quantity)
            changes.push(
              `Quantity: ${item.quantity} → ${updatedItem.quantity}`
            );
          if (item.price !== updatedItem.price)
            changes.push(`Price: ${item.price} → ${updatedItem.price}`);
          if (item.description !== updatedItem.description)
            changes.push(
              `Description: "${item.description}" → "${updatedItem.description}"`
            );

          if (changes.length > 0) {
            logActivity(`Item "${item.name}" updated: ${changes.join(", ")}`);
          }
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("inventory-items", JSON.stringify(updated));
      return updated;
    });
    setEditingItem(null);
  };

  // Adds items to the corresponding category
  const addItem = (newItem) => {
    setItems((prev) => {
      const updated = [...prev, { ...newItem, id: Date.now() }];
      localStorage.setItem("inventory-items", JSON.stringify(updated));
      return updated;
    });
    logActivity(`Item "${newItem.name}" added (Qty: ${newItem.quantity})`);
  };

  // Groups items in their respective categories

  const grouped = Array.isArray(items)
    ? items.reduce((acc, item) => {
        const cat = item.category || "Uncategorized";
        acc[cat] = acc[cat] ? [...acc[cat], item] : [item];
        return acc;
      }, {})
    : {};

  const categories = Object.keys(grouped);

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
        categories,
        activityLog,
        logActivity,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export function useInventory() {
  return useContext(InventoryContext);
}
