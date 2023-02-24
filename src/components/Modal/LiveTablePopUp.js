import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
// import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

const LiveTablePopUp = ({toggleModal, table, items, handleDelete, clearTable}) => {
    console.log(items)

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
      }



      for (const user in user_receipts) {


        const date = new Date();
        const isoDateTime = date.toISOString();
        createReceipt(user, isoDateTime, JSON.stringify(user_receipts[user]), 
        JSON.parse(localStorage.getItem("userObj"))["restaurant"])
      }

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