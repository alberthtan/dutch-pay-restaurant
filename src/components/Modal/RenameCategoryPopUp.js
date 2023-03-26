import React, {useState} from 'react'
import '../Modal.css'

const RenameCategoryPopUp= ({toggleModal, getCategories, category}) => {

  const [newCategory, setNewCategory] = useState(category.name)


const renameCategory = async () => {
  const accessToken = localStorage.getItem("access")
  return fetch('https://dutch-pay-test.herokuapp.com/categories/' + category.id + '/', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: newCategory,
  }),
  })
  .then(
    response => response.json()
  )
  .then(json => {
    console.log(json)
    getCategories()
  })
}

  const handle = ({target:{value}}) => {
    setNewCategory(value)
    console.log(newCategory)
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
            renameCategory()
            toggleModal()
          }}>
            <input style={{
                width: '100%', 
                borderRadius: 5, 
                borderWidth: 1, 
                padding: 10}} 
                type="text" 
                placeholder={newCategory}
                autoFocus 
                onFocus={handleFocus}
                value={newCategory} 
                onChange={handle}/>
          </form>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
            <div style={{marginRight: 20, cursor: 'pointer'}}
            onClick={() => {
              toggleModal()
              setNewCategory('')}}>
              Cancel
            </div>
            <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
              if (newCategory) {
                renameCategory()
                toggleModal()
                setNewCategory('')
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
    
  


export default RenameCategoryPopUp