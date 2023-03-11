import React from 'react'
import '../../layout.css'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const PastOrderItemButton = ({name, price, sharedBy}) => {
  return (
    <div style={styles.container}//style={(selectedItemID === item.id) ? styles.selected : styles.unselected} 
          className="itemButton outline"
          onClick={() => {}}
          onDoubleClick={{}}>

        <div style={styles.itemName} className="outline">
        <div style={{marginLeft: '15%'}}>
            {name}
            </div>
        </div>

        <div style={styles.itemDescription} className="outline">
            ${price / (sharedBy.length + 1)}
        </div>

        <div style={styles.itemPrice} className="outline">
            Completed
        </div>
        
    </div>

  )
}

const styles = {
    container: {
        display: 'flex',
    width: '100%',
    height: getWindowDimensions().width * 0.05,
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    },
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


  itemName: {
    display: 'flex',
    flex: 2,
    borderRadius: 15,
    // paddingLeft: '20px',
    justifyContent: 'start',
    // textAlign: 'center',
    // alignItems: 'center'
  },

  itemDescription: {
    display: 'flex',
    flex: 1,
    borderRadius: 15,
    // paddingLeft: '20px',
    justifyContent: 'center',

  },

  itemPrice: {
    display: 'flex',
    flex: 1,
    fontWeight: 'bold', 
    borderRadius: 15,
    justifyContent: 'center',
  },

}

export default PastOrderItemButton