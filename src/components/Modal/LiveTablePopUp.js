import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
// import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

const LiveTablePopUp = ({toggleModal, table, items, handleDelete, clearTable}) => {
    console.log(items)

    const [tableCleared, setTableCleared] = useState(false)
    // const [isError, setIsError] = useState(false)
    const [failedUsers, setFailedUsers] = useState([])

    const createReceipt = async (user, timestamp, cart, restaurant_id) => {
      // console.log(typeof cart)
      console.log(typeof restaurant_id)
      console.log(cart)
      return fetch('/receipts/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user,
          timestamp: timestamp,
          cart_string: cart,
          restaurant: restaurant_id
      }),
      })
      .then(
        response => response.json()
      )
      .then(json => {
        console.log(json)
      })
    }

    const handleClear = (table_id) => {
      console.log("HANDLE CLEAR for " + table_id)

      // Generate receipts from items list
      console.log("ITEMS") 
      console.log(items) // an array of big items

      let user_receipts = {} // dictionary of user receipts - Ex. {user_id: [item, item, ...], user_id: [item], ...}
      for(let i=0; i < items.length; i++) {

        let user = JSON.parse(items[i].orderedBy)["id"]
        let item = items[i]
        if(!(user in user_receipts)) {
          user_receipts[user] = []
        }
        user_receipts[user].push(item)

        for(let j=0; j < items[i].sharedBy.length; j++) {
          let shared_user = JSON.parse(items[i].sharedBy[j])["id"]
          if(!(shared_user in user_receipts)) {
            user_receipts[shared_user] = []
          }
          user_receipts[shared_user].push(item)
        }
      }

      console.log("USER RECEIPTS")
      console.log(user_receipts)

      // Process Stripe Payments
      for (const user in user_receipts) {
        let subtotal = 0
        for (let i=0; i < user_receipts[user].length; i++) {
          let item_price = user_receipts[user][i]["item"]["price"] / (user_receipts[user][i].sharedBy.length + 1)
          subtotal += parseFloat(item_price)
        }
        
        const accessToken = localStorage.getItem("access")
        // Process payment

        try {
          fetch('/create-payment/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              user_id: user,
              amount: subtotal * 100,
              currency: 'usd',
              restaurant_id: JSON.parse(localStorage.getItem("userObj"))["restaurant"]
            }),
          })
          .then(response => {
            console.log(response.status)
            if(response.status === 500) {
              // setIsError(true)
              let temp = failedUsers
              temp.push(user)
              setFailedUsers(temp)
              alert("Error in payments for some users!")
            } else if (response.status !== 201) {
              alert("Another error with status: " + response.status)
            } else {
              const date = new Date();
              const isoDateTime = date.toISOString();
              createReceipt(user, isoDateTime, JSON.stringify(user_receipts[user]), 
              JSON.parse(localStorage.getItem("userObj"))["restaurant"])
            }
            return response.json();
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        } catch (errorInfo) {
          console.log(errorInfo)
          return;
        }
      }

      setTableCleared(true)

      clearTable(table.id)

      
    }


    return (
      <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleTableModal"></div>
          <div className="item-modal-content">
            <h4>
              TABLE {table.name}: Orders

            </h4>
            
            {/* {failedUsers && failedUsers.map((item, index) => {
                if(item.status == "received") {
                  return(
                    <div key={index} 
                      style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flex: 1}}>
                        {item}
                        </div>
                        <div style={{cursor: 'pointer'}}
                            onClick={() => {
                              // handleDelete(table.id, item.id)
                              console.log("handling user")
                            }}
                        >
                            Delete
                        </div>
                    </div>
                  )
                }
            })}            */}


            {items && items.map((item, index) => {
                if(item.status == "received") {
                  return(
                    <div key={index} 
                      style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flex: 1}}>
                        {item.item.name}
                        </div>
                        <div style={{cursor: 'pointer'}}
                            onClick={() => {
                              handleDelete(table.id, item.id)
                            }}
                        >
                            Delete
                        </div>
                    </div>
                  )
                }
            })}           

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <div style={{marginRight: 20, cursor: 'pointer'}}
              onClick={() => {
                toggleModal()
              }}>
                Cancel
              </div>
              <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
                  // toggleModal()
                  handleClear(table.id)
                }}>
                Clear 
              </div>
            </div>
          </div>
      </div>
      
      </div>
      )
}

const styles = {
  customFileUpload: {
    cursor: 'pointer',
    overflow: 'hidden',
    width: '180px',
    height: '120px',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#CACACA'
  }
}

export default LiveTablePopUp