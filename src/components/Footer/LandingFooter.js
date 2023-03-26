import React, { useContext } from "react";
import { Layout, Menu, Dropdown } from "antd";

import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const { Header, Footer } = Layout;

function LandingFooter(props) {
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
      <Footer
        style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%'
          // display: "flex",
          // justifyContent: "space-between",
          // position: 'fixed', top: 0, left: 0, width: '100%'
        }}
      >
    

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
          {/* <Dropdown overlay={logoutMenu}> */}
            <div style={{
                margin: "16px",
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                onClick={() => {
                    navigate('/terms-of-use')
                }        
            }
                >
                Terms of Use
            </div>
            <div style={{ 
                margin: "16px", 
                cursor: 'pointer',
                // backgroundColor: 'blue',
                textAlign: 'end'
                }}
                onClick={() => {
                    navigate('/privacy-policy')
                }              
            }    
            >
              Privacy Policy
            </div>
          {/* </Dropdown> */}
        </div>
      </Footer>
    );
}

export default LandingFooter;
