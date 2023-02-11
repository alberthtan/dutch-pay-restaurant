import React from 'react'
import '../layout.css'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const ItemButton = ({item, selectedItemID, setSelectedItemID, handleView}) => {
  return (
    <div style={(selectedItemID == item.id) ? styles.selected : styles.unselected} 
          className="itemButton outline"
          onClick={() => {setSelectedItemID(item.id)}}
          onDoubleClick={handleView}>
        
        <div style={styles.imageContainer}>
          <div style={styles.imageBackground} className="outline"/>
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
    height: '90%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  imageBackground: {
    width: '70%', 
    height: '70%', 
    backgroundColor: 'gray', 
    borderRadius: 15,
  },

  itemName: {
    // display: 'flex',
    flex: 1,
    // marginLeft: getWindowDimensions().width * 0.05, 
    // width: getWindowDimensions().width * 0.1, 
    fontWeight: 'bold', 
    borderRadius: 15,
    // backgroundColor: 'blue',
    paddingLeft: '20px',
    justifyContent: 'start'
  },

  itemDescription: {
    // display: 'flex',
    flex: 2,
    // marginLeft: getWindowDimensions().width * 0.05, 
    width: '30%', 
    overflowWrap: "break-word",
    borderRadius: 15,
    backgroundColor: 'green',
    paddingLeft: '20px',
    paddingRight: '20px',

  },

  itemPrice: {
    // display: 'flex', 
    flex: 1,
    // marginLeft: getWindowDimensions().width * 0.1, 
    fontWeight: 'bold', 
    borderRadius: 15,
    backgroundColor: 'red',
    justifyContent: 'start'
  },

}

export default ItemButton