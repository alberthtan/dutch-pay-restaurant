import React from 'react'
import '../layout.css'

const CategoryButton = ({menuName, categoryName, navigate, width}) => {
  return (
    <div 
        style={{
            display: 'flex',
            width: '100%',
            height: width * 0.01,
            minWidth: 50,
            minHeight: 50,
            alignItems: 'center',
            borderTop: '1px solid #D6D6D6'
        }}
        className="categoryButton"
        onClick={()=> {navigate('/items/' + menuName + '/' + categoryName)}}
        // onMouseEnter={() => {console.log('hello')}}
    >
        <div style={{display: 'flex', marginLeft: width * 0.05, width: '100%', fontWeight: 'bold'}}>
        {categoryName}
        </div>
        
    </div>
  )
}

export default CategoryButton