import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import SideNavbar from '../../components/Navbar/SideNavbar';
import ProfilePopUp from '../../components/Modal/ProfilePopUp';
import PastOrderItemButton from '../../components/Buttons/PastOrderItemButton';


const PastOrderPage = () => {
  const [allMenus, setAllMenus] = useState([])
  const [restaurant, setRestaurant] = useState('')
  const [items, setItems] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [tableId, setTableId] = useState('')
  const [stripeCustomer, setStripeCustomer] = useState(null)
  const [restaurantDescription, setRestaurantDescription] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const { state } = useLocation();
  let navigate = useNavigate();

  console.log(state.receipt)

  const getFormattedDate = (timestamp) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const daySuffix = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
        "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
        "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
        "st"];
    const date = new Date(timestamp);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dayWithSuffix = day + daySuffix[day - 1];
    const formattedDate = `${month} ${dayWithSuffix}, ${year}`;
    return formattedDate
}

    const getFormattedTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Convert the hours from a 24-hour format to a 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        
        // Determine whether it's AM or PM
        const amOrPm = hours < 12 ? "am" : "pm";
        
        const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
        return formattedTime
    }

  const [modal, _setModal] = useState(false)
  const modalRef = useRef(modal);
  const setModal = data => {
    modalRef.current = data;
    _setModal(data);
  };

  const toggleModal = () => {
    setModal(!modalRef.current)
  }


  const getPaymentMethod = async () => {
    const accessToken = localStorage.getItem("access")
    return fetch('https://dutch-pay-test.herokuapp.com/get_payment_method_from_id/' + state.receipt.payment_method_id, {
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip,deflate,br',
      Connection: 'keep-alive',
      Authorization: `Bearer ${accessToken}`,
    }})
    .then(response => response.json())
    .then(json => {
        console.log("HERE")
        console.log(json)
        console.log(typeof json.payment_method)
        setPaymentMethod(json.payment_method)
    })
  }

  const getStripeCustomer = async () => {
    return fetch('https://dutch-pay-test.herokuapp.com/stripe-customers/' + state.receipt.user + '/',
    {
        method: 'GET',
    }).then(response => response.json())
    .then(json => {
        console.log("FUCK")
        console.log(json)
        setStripeCustomer(json.stripe_customer_id)
    })
  }

  useEffect(() => {
    if(stripeCustomer) {
        getPaymentMethod()
    }
  }, [stripeCustomer])

  const getMenus = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('https://dutch-pay-test.herokuapp.com/menus/', 
    {
      method: 'GET',
    }).then((response) => response.json())
    .then(json => {
      let result = json.filter(menu => menu['restaurant'] == userObj['restaurant'])
      setAllMenus(result)
      console.log('here')
      console.log(allMenus)
    })
  }

  const getRestaurant = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('https://dutch-pay-test.herokuapp.com/restaurants/' + userObj["restaurant"] + '/', 
    {
      method: 'GET',
    }).then((response) => response.json())
    .then(json => {
      console.log(json)
      setRestaurant(json)
      setRestaurantDescription(json.description)
      setRestaurantAddress(json.address)
      console.log(json.active_menu)
      setActiveMenu(json.active_menu)
    })
  }

  useEffect(() => {
    getStripeCustomer()
    getMenus()
    getRestaurant()
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if(e.target.className.includes('toggleModal')) {
        toggleModal()
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    let cart_string = JSON.parse(state.receipt.cart_string)
    console.log(cart_string)
    let result = []
    for(let i =0; i < cart_string.length; i++) {
        let orderedBy = JSON.parse(cart_string[i].orderedBy)
        if (orderedBy.id == state.receipt.user) {
            let name = orderedBy.first_name + ' ' + orderedBy.last_name
            setCustomerName(name)
            setTableId(cart_string[i].table_id)
            result.push(cart_string[i])
        }
    }
    setItems(result)
  },[])

  return (
    <div>
      <Navbar />

      {modalRef.current && 
        <ProfilePopUp toggleModal={toggleModal} getRestaurant={getRestaurant} restaurant={restaurant}/>
      }

      <Layout style={{ minHeight: "100vh" }}>
        <SideNavbar selectedKey={'5'}/>
      
      <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
        <div style={{display: 'flex', flex: 2, flexDirection: 'column', paddingLeft: 20}}>
            <div style={styles.headerBarContainer}>
        
                <div 
                style={styles.headerBarGreenItem}>
                Order #{state.id}
                </div>
            </div>

            <div>
                Order Time: {getFormattedTime(state.receipt.timestamp)}
            </div>

            <div>
                Date: {getFormattedDate(state.receipt.timestamp)}
            </div>

            <div>
                Customer: {customerName}
            </div>

            <div>
                Table: {tableId}
            </div>

        </div>

        <div style={{ display: 'flex', flex: 5, flexDirection: 'column'}}>
        <div style={styles.itemBarContainer}>
                
                <div style={{display: 'flex', flex: 2, justifyContent: 'start'}}>
                <div style={{marginLeft: '15%'}}>
                    Item
                    </div>
                </div>
                
                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
          
                    Price
                </div>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    Status
                </div>
            </div>
            {console.log(items)}  
            {items.map((item, index) => {
                return(
                    // <div style={{display: 'flex', flexDirection: 'row'}}>
                    //     {item.item.name}
                    //     <div>
                    //         {item.item.price / (item.sharedBy.length + 1)}
                    //     </div>
                    // </div>
                    <PastOrderItemButton name={item.item.name} price={item.item.price} sharedBy={item.sharedBy}/>
                    )
            })}

            <div style={{fontSize: 18,
        fontWeight: 'bold',
        padding: '5px', paddingTop: 50}}>
                Subtotal: ${state.receipt.subtotal}
            </div>
            <div style={{fontSize: 18,
        fontWeight: 'bold',
        padding: '5px', paddingTop: 50}}>
                Tax: ${state.receipt.tax}
            </div>
            <div style={{fontSize: 18,
        fontWeight: 'bold',
        padding: '5px', paddingTop: 50}}>
                Total: ${parseFloat(state.receipt.subtotal) + parseFloat(state.receipt.tax)}
            </div>
            <div style={{fontSize: 18,
        fontWeight: 'bold',
        padding: '5px', paddingTop: 50}}>
                Tip: ${state.receipt.tip}
            </div>

            {paymentMethod && 
            <div style={{fontSize: 18,
              fontWeight: 'bold',
              padding: '5px', paddingTop: 50}}>
                Payment Method: **** **** **** {paymentMethod.last4}
            </div>
                  }
        </div>
      </div>
        

      </Layout>



    </div>
  )
}

const styles = {
    container: {
      width: '100%', 
      margin: '20px',
    }, 

    restaurantContainer: {
      width: '100%', 
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    
    restaurantHeaderContainer: {
      width: '100%', 
      flex: 1,
      marginBottom: '10px',
    },

    restaurantBodyContainer: {
      width: '100%', 
      marginBottom: '10px',
      borderRadius: 15,
      border: '0.5px solid #000000',
      height: 300
    },

    restaurantTop: {
      display: 'flex', 
      flexDirection: 'row', 
      height: '50%', 
      alignItems: 'center',
      borderBottom: '0.5px solid #D6D6D6',
      // backgroundColor: 'green'
    },

    restaurantImageContainer: {
      display: 'flex', 
      flex: 1, 
      height: '100%', 
      alignItems: 'center', 
      justifyContent: 'center'
    },


    restaurantTopRight: {
      display: 'flex', 
      flex:3, 
      flexDirection: 'column', 
      height: '80%',
      // backgroundColor: 'green',
    },

    restaurantName: {
      display: 'flex', 
      flex: 1,
      height: '30%', 
      alignItems: 'center', 
      fontWeight: 'bold', 
      fontSize: 18
    },

    restaurantTopDescription: {
      display: 'flex', 
      flexDirection: 'row', 
      height: '20%', 
      alignItems: 'center',
      flex: 1,
    },

    grayText: {
      fontSize: 14 ,
      color: '#8d8d8d',
      paddingRight: 5,
      // backgroundColor: 'pink'
    },
    
    blackText: {
      fontSize: 14,
      color: 'black',
      wordBreak: 'break-word'
    },
    headerBarContainer: {
        flexDirection: 'row', 
        display: 'flex', 
        // alignItems: 'center',
      },
    
    
      headerBarGreenItem: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: '5px',
        color: 'green',
      },

      itemBarContainer: {
        display: 'flex', 
        width: '100%',
        alignItems: 'center',
        borderTop: '1px solid #D6D6D6', 
        paddingTop: 10, 
        paddingBottom: 10,
        fontWeight: 'bold'
      },
}

export default PastOrderPage;