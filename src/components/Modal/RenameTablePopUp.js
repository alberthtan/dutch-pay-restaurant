import React, {useState} from 'react'
import '../Modal.css'

const RenameTablePopUp = ({toggleModal, getTables, table}) => {

    const [newTable, setNewTable] = useState(table.name)

    const renameTable = async () => {
    return fetch('/tables/' + table.id + '/', {
        method: 'PATCH',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: newTable,
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
                renameTable()
                toggleModal()
            }}>
                <input style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10}} 
                    type="text" 
                    placeholder={newTable}
                    autoFocus 
                    onFocus={handleFocus}
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
                    renameTable()
                    toggleModal()
                    setNewTable('')
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
    
  


export default RenameTablePopUp