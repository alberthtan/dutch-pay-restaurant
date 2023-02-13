import React, { useRef, useState, useEffect } from "react";
import { Layout } from "antd";
import '../../layout.css'


import removeIcon from '../../assets/icons/trash.png'
import duplicateIcon from '../../assets/icons/duplicate.png'
import viewIcon from '../../assets/icons/view.png'

function ItemContextMenu({x, y, yOffset, handleView, handleDelete,}) {
    const ref = useRef(null)
    const [yDiff, setYDiff] = useState(0);
    const [xDiff, setXDiff] = useState(0);
    const [clientWidth, setClientWidth] = useState(0)

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }
    console.log("height " + getWindowDimensions().height)
    console.log("y " + y)

    useEffect(() => {
        setYDiff(getWindowDimensions().height - y - ref.current.clientHeight)
        setXDiff(getWindowDimensions().width - x - ref.current.clientWidth)
        setClientWidth(ref.current.clientWidth)
        console.log(ref.current.clientHeight)
    })

    return (
        <div 
        ref={ref}
        style={{
            width: 171, 
            height: 110,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '1px 1px 5px #9e9e9e',
            alignItems: 'start',
            position: 'absolute',
            backgroundColor: 'white',
            top: (yDiff <= 0) ? y+yDiff+yOffset : y+yOffset,
            left: (xDiff <= 0) ? x-clientWidth : x,
            borderRadius: '5px',
        }}
        >

            <div 
                className='contextMenuRow' 
                style={styles.subContainer} 
                onClick={handleView}
            >
                <img src={viewIcon} style={styles.icon} alt="view details"/>
                <div style={styles.text}>View Details</div>
            </div>
        
            {/* <div className='contextMenuRow' style={styles.subContainer} >
                <img  src={duplicateIcon} style={styles.icon} alt="duplicate"/>
                <div style={styles.text}>Duplicate</div>
            </div> */}

            <div 
                className='contextMenuRow' 
                style={styles.subContainer}
                onClick={handleDelete}
            >
                <img  src={removeIcon} style={styles.icon} alt="remove"/>
                <div style={styles.text}>Remove</div>
            </div>
        </div>
    );
}

let styles = {
    // container: {
    //     width: 171, 
    //     height: 151,
    //     display: 'flex',
    //     flexDirection: 'column',
    //     boxShadow: '1px 1px 5px #9e9e9e',
    //     alignItems: 'start',
    //     position: 'absolute',
    //     top: 100,
    //     left: 200,
    // },

    subContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },


    
    icon: {
        flex: 1, 
        width: '5px', 
        marginLeft: '15px',
        marginRight: '15px',
    },

    text: {
        flex: 7, 
        fontSize: 18,
    },
}

export default ItemContextMenu;
