import React, {useState} from 'react'
import '../Modal.css'

const CategoryPopUp = ({toggleModal, menuId, getCategories}) => {
    const [newCategory, setNewCategory] = useState('')
  
    const createNewCategory = async () => {
        return fetch('https://dutch-pay-test.herokuapp.com/categories/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newCategory,
            menu: menuId,
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
  
    return (
      <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleModal"></div>
          <div className="modal-content">
            <h4>
              New Category
            </h4>
            <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}
            onSubmit={(e) => {
              e.preventDefault()
              createNewCategory()
              toggleModal()
            }}>
              <input style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10}} type="text" placeholder="Enter category name" autoFocus value={newCategory} onChange={handle}/>
            </form>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
              <div style={{marginRight: 20, cursor: 'pointer'}}
              onClick={() => {
                toggleModal()
                setNewCategory([])}}>
                Cancel
              </div>
              <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
                if (newCategory) {
                  createNewCategory()
                  toggleModal()
                  setNewCategory('')
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

export default CategoryPopUp