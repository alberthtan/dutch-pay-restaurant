import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import TablePage from "./pages/TablePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import PaymentPage from "./pages/PaymentPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ItemsPage from "./pages/ItemsPage";
import RegisterPage from "./pages/RegisterPage";

// import CategoryPage from "./pages/CategoryPage";
// import ItemsPage from "./pages/ItemsPage";
// import UserManagementPage from "./pages/UserManagementPage";
// import StudentPreferenceForm from "./components/StudentPreferenceForm";
// import RegisterPage from "./pages/RegisterPage";
// import AdminPage from "./pages/AdminPage";


ReactDOM.render(
  // <div>hello</div>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/menu" element={<MenuPage/>} />
      <Route path="/items/:menuId/:categoryId" element={<ItemsPage/>} />
      <Route path="/categories/:menuId" element={<CategoryPage/>} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/order-history" element={<OrderHistoryPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
