import React, {useState, useEffect, useContext} from 'react'
import '../Modal.css'
// import ImageUploading

const TablePopUp = ({toggleModal, getTables}) => {

  const [newTable, setNewTable] = useState('')
  console.log("here")

  // let headers = new Headers();
  // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

const createNewTable = async () => {
  return fetch('/tables/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newTable,
      restaurant: JSON.parse(localStorage.getItem("userObj"))["restaurant"],
  }),
  })
  .then(
    response => response.json()
  )
  .then(json => {
    console.log(json)
    getTables()
  })
}

  const handle = ({target:{value}}) => {
    setNewTable(value)
    console.log(newTable)
  }

  return (
    <div>
      <div className="modal" style={{display: 'flex'}}>
      <div className="overlay toggleModal"></div>
        <div className="modal-content">
          <h4>
            New Table
          </h4>
          <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}
          onSubmit={(e) => {
            e.preventDefault()
            createNewTable()
            toggleModal()
          }}>
            <input style={{width: '100%', 
            borderRadius: 5, 
            borderWidth: 1, 
            padding: 10}} 
            type="text" 
            placeholder="Enter Table ID" 
            autoFocus 
            value={newTable} 
            onChange={handle}/>
          </form>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
            <div style={{marginRight: 20, cursor: 'pointer'}}
            onClick={() => {
              toggleModal()
              setNewTable('')}}>
              Cancel
            </div>
            <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
              if (newTable) {
                createNewTable()
                toggleModal()
                setNewTable('')
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
    
  


export default TablePopUp