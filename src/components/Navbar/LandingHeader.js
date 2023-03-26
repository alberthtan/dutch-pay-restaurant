import React, { useContext } from "react";
import { Layout, Menu, Dropdown } from "antd";

import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const { Header } = Layout;

function LandingHeader(props) {
    const globalContext = useContext(Context);
    const { setIsLoggedIn } = globalContext;

    const userObj = JSON.parse(localStorage.getItem('userObj'))

    const navigate = useNavigate();

    function getItem(label, key) {
        return {
          key,
          label,
        };
    }
    
    const items = [
        getItem("Logout", "1"),
    ];

    // const onClick = (e) => {
    //   console.log("click ", e);
    //   if (e.key === "1") {
    //     handleNavigateLogin()
    //   }
    // };

    const handleNavigateLogin = async () => {
        navigate("/login");
    }

    // useEffect(() => {
    //   handleLogout()
    // })

    // function logoutMenu() {
    //     return (
    //       <Menu
    //         theme="dark"
    //         items={items}
    //                   />
    //     );
    // }

    return (
      <Header
        style={{
          // display: "flex",
          // justifyContent: "space-between",
          // position: 'fixed', top: 0, left: 0, width: '100%'
        }}
      >
    

        <div style={{backgroundColor: '#112545', width: '100%', display: 'flex'}}>
          {/* <Dropdown overlay={logoutMenu}> */}
          <div style={{
            margin: '16px',
            display: 'flex',
            flex: 1,
            color: 'white', 
            // backgroundColor: 'red', 
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: 25,
            justifyContent: 'center'
            }}>
            DutchPay
          </div>
            <div
              className="ant-dropdown-link"
              style={{ 
                display: 'flex',
                margin: "16px", 
                position: 'fixed',
                right: 0,
                color: "white", 
                cursor: 'pointer',
                alignSelf: 'center',
                textAlign: 'center'
              }}
              onClick={() => {
                handleNavigateLogin()
              }              
            }

              
            >
              Restaurant Portal
            </div>
          {/* </Dropdown> */}
        </div>
      </Header>
    );
}

export default LandingHeader;
