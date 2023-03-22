import React, { useRef, useState, useEffect } from "react";
import '../../layout.css'

import removeIcon from '../../assets/icons/trash.png'
import editIcon from '../../assets/icons/edit.png'

function ContextMenu({x, y, yOffset, handleRename, handleDelete,}) {
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
    // console.log("ref height " + ref.current.clientHeight())
    // useEffect()

    useEffect(() => {
        setYDiff(getWindowDimensions().height - y - ref.current.clientHeight)
        setXDiff(getWindowDimensions().width - x - ref.current.clientWidth)
        setClientWidth(ref.current.clientWidth)
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
                className='contextMenuRow outline' 
                style={styles.subContainer} 
                onClick={handleRename}
            >
                <img className='outline' src={editIcon} style={styles.icon} alt="rename"/>
                <div className='outline' style={styles.text}>Rename</div>
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

export default ContextMenu;
