import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
// import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

const LiveOrderPopUp = ({toggleModal, items, table, handleDelete, handleSend}) => {
  
    return (
      <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleOrderModal"></div>
          <div className="item-modal-content">
            <h4>
              Table {table.name}: INCOMING
            </h4>

            {items.map((item, index) => {
              return(
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flex: 1}}>
                    {item.item.name}
                    </div>
                    <div style={{cursor: 'pointer'}}
                      onClick={() => {
                        // toggleModal()
                        console.log(item.id)
                        if(items.length == 1) {
                          toggleModal()
                          handleDelete(table.id, item.id)
                        } else {
                          handleDelete(table.id, item.id)
                        }
                        
                      }}>
                        Delete
                    </div>
                </div>)
            })}


            
            
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <div style={{marginRight: 20, cursor: 'pointer'}}
              onClick={() => {
                toggleModal()}}>
                Cancel
              </div>
              <div style={{cursor: 'pointer', color: '#0A60C9'}} 
              onClick={() => {
                  // toggleModal()

                  for(let i=0; i<items.length; i++) {
                    if(i==items.length-1) {
                      toggleModal()
                      handleSend(table.id, items[i].id)
                    } else {
                      handleSend(table.id, items[i].id)
                    }
                    
                  }
              }}>
                Send
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

export default LiveOrderPopUp