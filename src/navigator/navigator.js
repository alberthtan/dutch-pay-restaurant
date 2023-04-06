import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/dutchpay-restaurant/LoginPage";
import MenuPage from "../pages/dutchpay-restaurant/MenuPage";
import TablePage from "../pages/dutchpay-restaurant/TablePage";
import OrderHistoryPage from "../pages/dutchpay-restaurant/OrderHistoryPage";
import PaymentPage from "../pages/dutchpay-restaurant/PaymentPage";
import HomePage from "../pages/dutchpay-restaurant/HomePage";
import CategoryPage from "../pages/dutchpay-restaurant/CategoryPage";
import ItemsPage from "../pages/dutchpay-restaurant/ItemsPage";
import RegisterPage from "../pages/dutchpay-restaurant/RegisterPage";
import LiveOrdersPage from "../pages/dutchpay-restaurant/LiveOrdersPage";
import PastOrderPage from "../pages/dutchpay-restaurant/PastOrderPage";

import TermsPage from "../pages/home/TermsPage";
import PrivacyPolicyPage from "../pages/home/PrivacyPolicyPage";
import LandingPage from "../pages/home/LandingPage";

import PunchmePrivacyPolicy from "../Punchme/PunchmePrivacyPolicy";
import PunchmeTermsOfUse from "../Punchme/PunchmeTermsOfUse";
import PunchmeManagerPrivacyPolicy from "../Punchme/PunchmeManagerPrivacyPolicy";
import PunchmeManagerTermsOfUse from "../Punchme/PunchmeManagerTermsOfUse";

import { Context } from "../globalContext/globalContext";

const Navigator = () => {
  const globalContext = useContext(Context);
  const { isLoggedIn, setIsLoggedIn } = globalContext;
  console.log(localStorage.getItem("access"))

    const getUser = async () => {
        let token = localStorage.getItem('access')
        let authorization = "Bearer".concat(" ", token)
        return fetch('https://dutch-pay-test.herokuapp.com/get-manager', {
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
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage />} />
                </>
                    :
                <>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/menus" element={<MenuPage/>} />
                    <Route path="/items/:menuId/:categoryId" element={<ItemsPage/>} />
                    <Route path="/categories/:menuId" element={<CategoryPage/>} />
                    <Route path="/tables" element={<TablePage />} />
                    <Route path="/live-orders" element={<LiveOrdersPage />} />
                    <Route path="/order-history" element={<OrderHistoryPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/past-order/:receiptId" element={<PastOrderPage />} />
                </>
                }
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/terms-of-use" element={<TermsPage/>} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
                <Route path="/punchme/privacy-policy" element={<PunchmePrivacyPolicy/>} />
                <Route path="/punchme/terms-of-use" element={<PunchmeTermsOfUse/>} />
                <Route path="/punchme-manager/privacy-policy" element={<PunchmeManagerPrivacyPolicy/>} />
                <Route path="/punchme-manager/terms-of-use" element={<PunchmeManagerTermsOfUse/>} />
                              
            </Routes>
          </BrowserRouter>
      );
}

export default Navigator

