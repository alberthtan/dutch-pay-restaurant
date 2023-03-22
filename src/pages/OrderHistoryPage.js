import React, { useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';
import ViewPastOrders from '../components/ViewPastOrders'

const OrderHistoryPage = () => {
  const [pastOrders, setPastOrders] = useState([])

  let navigate = useNavigate();

  const getPastOrders = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch("/receipts").then(
      response => response.json()
    ).then(
      json => {
        console.log(json)
        let result = json.filter(receipt => receipt['restaurant'] == userObj['restaurant'])
        setPastOrders(result)
      }
    )
  }

  useEffect(() =>{
    getPastOrders()
  },[])

  return (
    <div>
      <Navbar />
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavbar selectedKey={'5'}/>

        <div style={{flexDirection:'column', width: '100%'}}>

        <div style={styles.headerBarContainer}>
     
     <div 
       style={styles.headerBarGreenItem}>
       Order History
     </div>
 </div>

        <div style={{marginLeft: '30px', display: 'flex', width: '100%', height: 100, alignItems: 'center'}}>
            </div>
            {(pastOrders.length !== 0) &&
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
                      {pastOrders.map((receipt, index) => {
                        console.log(receipt)
                        return(
                      <ViewPastOrders receipt={receipt} navigate={navigate}/>
                      )
                      })}


                </div>
          }

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