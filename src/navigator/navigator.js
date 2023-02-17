import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MenuPage from "../pages/MenuPage";
import TablePage from "../pages/TablePage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import PaymentPage from "../pages/PaymentPage";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ItemsPage from "../pages/ItemsPage";
import RegisterPage from "../pages/RegisterPage";

import { Context } from "../globalContext/globalContext";

const Navigator = () => {
  const globalContext = useContext(Context);
  const { isLoggedIn, setIsLoggedIn } = globalContext;
  console.log(localStorage.getItem("access"))

    const getUser = async () => {
        let token = localStorage.getItem('access')
        let authorization = "Bearer".concat(" ", token)
        return fetch('/get-manager', {
          method: 'GET',
          headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip,deflate,br',
            Connection: 'keep-alive',
            'Content-Type': 'application/json',
            Authorization: authorization
          },
        })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("userObj", JSON.stringify(json))
            
        })
        .catch(error => {
            console.error(error);
        });
      }

  useEffect(() => {
    // localStorage.removeItem("access");
    //     localStorage.removeItem("refresh");
    //     localStorage.removeItem("userObj")
    //     setIsLoggedIn(false)
    const check = async () => {
      if (localStorage.getItem('access')) {
        getUser()
        console.log("USER IS LOGGED IN")
        setIsLoggedIn(true)
      } else {
        console.log("USER IS NOT LOGGED IN")
      }
    }

    check()
  }, [])

    return (
        <BrowserRouter>
            <Routes>
                {(!isLoggedIn) ? 
                <>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage />} />
                </>
                    :
                <>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/menus" element={<MenuPage/>} />
                    <Route path="/items/:menuId/:categoryId" element={<ItemsPage/>} />
                    <Route path="/categories/:menuId" element={<CategoryPage/>} />
                    <Route path="/tables" element={<TablePage />} />
                    <Route path="/order-history" element={<OrderHistoryPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                </>
                }
              
            </Routes>
          </BrowserRouter>
      );
}

export default Navigator

