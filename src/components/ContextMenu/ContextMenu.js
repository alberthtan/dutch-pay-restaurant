import React from "react";
import { Layout } from "antd";
import '../../layout.css'

// import { UserOutlined, DownOutlined } from "@ant-design/icons";
// import jwt_decode from "jwt-decode";
// import "antd/dist/antd.css";

import removeIcon from '../../assets/icons/trash.png'
import editIcon from '../../assets/icons/edit.png'

function ContextMenu({x, y, handleRename, handleDelete,}) {

    return (
        <div style={{
            width: 171, 
            height: 110,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '1px 1px 5px #9e9e9e',
            alignItems: 'start',
            position: 'absolute',
            backgroundColor: 'white',
            top: y,
            left: x,
            borderRadius: '5px',
        }}
        >

            <div 
                className='contextMenuRow' 
                style={styles.subContainer} 
                onClick={handleRename}
            >
                <img src={editIcon} style={styles.icon} alt="rename"/>
                <div style={styles.text}>Rename</div>
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
