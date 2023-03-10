import React from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Layout, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';
import ViewPastOrders from '../components/ViewPastOrders'

const { Title } = Typography;

const OrderHistoryPage = () => {
  let navigate = useNavigate();

  const getPastOrders = () => {
    return fetch("/receipts").then()
  }

  return (
    <div>
      <Navbar />
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavbar selectedKey={'5'}/>

        <div style={{flexDirection:'column', width: '100%'}}>

        <div style={{marginLeft: '30px', display: 'flex', width: '100%', height: 100, alignItems: 'center'}}>
              <div style={styles.headerBarContainer}>
     
                    <div 
                      style={styles.headerBarGreenItem}>
                      Order History
                    </div>
                </div>
            </div>

            <div style={{
                    display: 'flex',
                    width: '100%',
                    marginBottom: '10px',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems:'center',
                    borderColor: 'green',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    // border: '0.5px solid',
                    borderRadius: '10px',
                    // backgroundColor: 'blue'
                    }}>

                      {/* {allMenus.map((menu, index) => {
                        return(
                          <ViewMenus menuId={menu.id} menuName={menu.name} activeMenu={activeMenu} setActiveMenu={setActiveMenu} restaurant={restaurant}/>
                        )
                      })} */}
                      <ViewPastOrders/>


                </div>

        </div>

      </Layout>



    </div>
  )
}

const styles = {
  headerBarContainer: {
    flexDirection: 'row', 
    display: 'flex', 
    alignItems: 'center',
  },




  headerBarGreenItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5px',
    color: 'green',
  },
}

export default OrderHistoryPage;