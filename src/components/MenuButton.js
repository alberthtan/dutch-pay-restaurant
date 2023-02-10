import React, {useState} from 'react'
import '../layout.css'
import ContextMenu from './ContextMenu';

const MenuButton = ({menuName, width, navigate}) => {
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    return (
        <div 
            style={{
            display: 'flex',
            width: width * 0.15,
            height: width * 0.15,
            minWidth: 150,
            minHeight: 150,
            alignItems: 'center',
            border: '1px solid #D6D6D6'
            }}
            className="menuCard"
            onDoubleClick={() => {
                console.log(menuName)
                navigate('/categories/' + menuName)

            }}
        >
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 'bold'}}>
            {menuName}
            </div>
            
            
        </div>
    )
    }

export default MenuButton