import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./PAGES/CategoryPage";
import InventoryManager from "./PAGES/HomePAge";
// PAGES PAGES PAGES
import Electronics from "./PAGES/categories/Electronics";
import Groceries from "./PAGES/categories/Groceries";
import Tools from "./PAGES/categories/Tools";
import OfficeSupplies from "./PAGES/categories/OfficeSupplies";
// COMPONENTS COMPONENTS COMPONENTS
import EditItemModal from "./components/EditItemModal";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <InventoryManager />,
  },
  {
    path: "categories/:categoryName",
    element: <CategoryPage />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <EditItemModal />
    </>
  );
}
