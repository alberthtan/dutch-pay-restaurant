import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
// import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

const LiveTablePopUp= ({toggled, toggleModal, categoryId, getMenuItems}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)
  
    return (
      <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleTableModal"></div>
          <div className="item-modal-content">
            <h4>
              TABLE 
            </h4>
            
            <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10, flexDirection: 'column'}}
            onSubmit={(e) => {e.preventDefault()}}>
              <input className="no-outline" style={{
                  width: '100%', 
                  borderWidth: 0, 
                  borderBottomWidth: 1, 
                  padding: 10, 
                  backgroundColor: '#f1f1f1'
                  }} 
                  type="text" 
                  placeholder="Name" 
                  autoFocus 
                  value={name} 
                  onChange={{}} 
              />


                <div style={{marginTop: 30, marginBottom: 5}}>
                  Description
                </div>
                <textarea style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10, height: 100}} placeholder="Enter description" value={description} onChange={{}} />

                <div style={{display: 'flex', flexDirection: 'row'}}>

                  <div style={{alignSelf: 'flex-end'}}>
                    <div style={{ marginTop: 30, marginBottom: 5}}>
                      Price
                    </div>
                    <input style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10}} type="number" presicion={2} placeholder="Enter price" value={price} onChange={{}}/>
                  </div>

                  <div style={{marginLeft: 50}}>
                    <div style={{marginTop: 30, marginBottom: 5}}>
                      Tax
                    </div>
                    <input style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10}} type="number" presicion={2} placeholder="Enter price" value={price} onChange={{}} webkitdirectory/>
                  </div>

                </div>

                <div style={{marginTop: 30}}>
                  Photo
                </div>

                <label style={styles.customFileUpload}>
                </label>                

            </form>
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

export default LiveTablePopUp