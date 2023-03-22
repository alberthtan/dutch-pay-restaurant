import React, {useState} from 'react'
import '../Modal.css'

const RenameMenuPopUp = ({toggleModal, getMenus, menu}) => {

    const [newMenu, setNewMenu] = useState(menu.name)

    const renameMenu = async () => {
    return fetch('/menus/' + menu.id + '/', {
        method: 'PATCH',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: newMenu,
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

    const handleFocus = (e) => {
        e.target.select()
    }

    return (
        <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleRenameModal"></div>
            <div className="modal-content">
            <h4>
                Rename
            </h4>
            <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}
            onSubmit={(e) => {
                e.preventDefault()
                renameMenu()
                toggleModal()
            }}>
                <input style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10}} 
                    type="text" 
                    placeholder={newMenu}
                    autoFocus 
                    onFocus={handleFocus}
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
                    renameMenu()
                    toggleModal()
                    setNewMenu('')
                }
                }}>
                OK
                </div>
            </div>
            </div>
        </div>
        
        </div>
    )
}
    
  


export default RenameMenuPopUp