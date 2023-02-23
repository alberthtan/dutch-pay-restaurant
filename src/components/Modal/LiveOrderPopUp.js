import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
// import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

const LiveOrderPopUp = ({toggled, toggleModal, categoryId, getMenuItems}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)
  
    return (
      <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleOrderModal"></div>
          <div className="item-modal-content">
            <h4>
              Table 10: INCOMING
            </h4>

            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flex: 1}}>
                Butter Chicken
                </div>
                <div style={{cursor: 'pointer'}}>
                    Delete
                </div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <div style={{marginRight: 20, cursor: 'pointer'}}
              onClick={() => {
                toggleModal()
                setName('')
                setDescription('')
                setPrice(null)}}>
                Cancel
              </div>
              <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
                if (name && price) {
                //   createNewItem()
                  toggleModal()
                  setName('')
                  setDescription('')
                  setPrice(null)
                }
                }}>
                Create
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