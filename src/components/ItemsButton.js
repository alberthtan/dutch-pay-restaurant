import React from 'react'
import '../layout.css'

const ItemsButton = ({name, description, price, navigate, width}) => {
  return (
    <div 
        style={{
            display: 'flex',
            width: '100%',
            height: width * 0.1,
            minWidth: 50,
            minHeight: 50,
            alignItems: 'center',
            borderTop: '1px solid #D6D6D6'
        }}
        className="categoryButton"
        // onMouseEnter={() => {console.log('hello')}}
    >
        <div style={{display: 'flex', marginLeft: width * 0.05, width: '15%', height: '70%', fontWeight: 'bold', backgroundColor: 'gray', borderRadius: 15}}>
        </div>

        <div style={{display: 'flex', marginLeft: width * 0.05, width: width * 0.1, fontWeight: 'bold', borderRadius: 15}}>
        {name}
        </div>

        <div style={{display: 'flex', marginLeft: width * 0.05, width: '30%', fontWeight: 'bold', borderRadius: 15}}>
        {description}
        </div>

        <div style={{display: 'flex', marginLeft: width * 0.1, fontWeight: 'bold', borderRadius: 15}}>
        {price}
        </div>
        
    </div>

  )
}

export default ItemsButton