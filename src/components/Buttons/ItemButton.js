import React from 'react'
import '../../layout.css'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const ItemButton = ({item, selectedItemID, setSelectedItemID, handleEdit}) => {
  return (
    <div style={(selectedItemID === item.id) ? styles.selected : styles.unselected} 
          className="itemButton outline"
          onClick={() => {setSelectedItemID(item.id)}}
          onDoubleClick={handleEdit}>
        
        <div style={styles.imageContainer}>
          <div style={styles.imageBackground}>

            <img src={item.itemImage} style={{width: '100%'}} className="outline"/>
          </div>
          
        </div>

        <div style={styles.itemName} className="outline">
            {item.name}
        </div>

        <div style={styles.itemDescription} className="outline">
            {item.description}
        </div>

        <div style={styles.itemPrice} className="outline">
            ${item.price}
        </div>
        
    </div>

  )
}

const styles = {
  selected: {
    display: 'flex',
    width: '100%',
    height: getWindowDimensions().width * 0.1,
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
    height: getWindowDimensions().width * 0.1,
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    borderTop: '1px solid #D6D6D6',
    borderBottom: '1px solid #D6D6D6',
  },

  imageContainer: {
    display: 'flex', 
    flex: 1, 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  imageBackground: {
    overflow: 'hidden',
    width: '120px',
    height: '80px',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 15,
  },

  itemName: {
    flex: 1,
    fontWeight: 'bold', 
    borderRadius: 15,
    paddingLeft: '20px',
    justifyContent: 'start'
  },

  itemDescription: {
    flex: 2,
    width: '30%', 
    overflowWrap: "break-word",
    borderRadius: 15,
    paddingLeft: '20px',
    paddingRight: '20px',

  },

  itemPrice: {
    flex: 1,
    fontWeight: 'bold', 
    borderRadius: 15,
    justifyContent: 'start'
  },

}

export default ItemButton