import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./PAGES/CategoryPage";
import InventoryManager from "./PAGES/HomePAge";
import Electronics from "./PAGES/categories/Electronics";
import Groceries from "./PAGES/categories/Groceries";
import Tools from "./PAGES/categories/Tools";
import OfficeSupplies from "./PAGES/categories/OfficeSupplies";

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
  return <RouterProvider router={router} />;
}
