import React, {useState} from 'react'
import '../Modal.css'

const MenuPopUp = ({toggleModal, getMenus}) => {

  const [newMenu, setNewMenu] = useState('')

const createNewMenu = async () => {
  return fetch('/menus/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newMenu,
      restaurant: JSON.parse(localStorage.getItem("userObj"))["restaurant"],
  }),
  })
  .then(
    response => response.json()
  )
  .then(json => {
    console.log(json)
    getMenus()
  })
}

  const handle = ({target:{value}}) => {
    setNewMenu(value)
    console.log(newMenu)
  }

  return (
    <div>
      <div className="modal" style={{display: 'flex'}}>
      <div className="overlay toggleModal"></div>
        <div className="modal-content">
          <h4>
            New Menu
          </h4>
          <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}
          onSubmit={(e) => {
            e.preventDefault()
            createNewMenu()
            toggleModal()
          }}>
            <input style={{width: '100%', 
            borderRadius: 5, 
            borderWidth: 1, 
            padding: 10}} 
            type="text" 
            placeholder="Enter menu name" 
            autoFocus 
            value={newMenu} 
            onChange={handle}/>
          </form>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
            <div style={{marginRight: 20, cursor: 'pointer'}}
            onClick={() => {
              toggleModal()
              setNewMenu('')}}>
              Cancel
            </div>
            <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
              if (newMenu) {
                createNewMenu()
                toggleModal()
                setNewMenu('')
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
    
  


export default MenuPopUp