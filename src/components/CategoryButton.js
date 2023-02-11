import React, {useState, useEffect} from 'react'
import '../layout.css'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const CategoryButton = ({menu, category, selectedCategoryID, setSelectedCategoryID, navigate, width}) => {
  return (
    <div 
    style={(selectedCategoryID == category.id) ? styles.selected : styles.unselected}
        className="categoryButton outline"
        onClick={() => {
            setSelectedCategoryID(category.id)
        }}
        onDoubleClick={()=> {
            navigate('/items/' + menu.id + '/' + category.id, { state: { menu: menu, category: category } })
        }}
        // onMouseEnter={() => {console.log('hello')}}
    >
        <div 
          style={{display: 'flex', marginLeft: width * 0.05, width: '100%', fontWeight: 'bold'}}
          className="outline"
        >
        {category.name}
        </div>
        
    </div>
  )
}

const styles = {
  selected: {
    display: 'flex',
    width: '100%',
    height: getWindowDimensions().width * 0.01,
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    borderTop: '1px solid #000be0',
    borderBottom: '1px solid #000be0',
    backgroundColor: '#e0ecff',
  },

  unselected: {
    display: 'flex',
    width: '100%',
    height: getWindowDimensions().width * 0.01,
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    borderTop: '1px solid #D6D6D6',
    borderBottom: '1px solid #D6D6D6'
  },
}

export default CategoryButton