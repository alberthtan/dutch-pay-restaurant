import React, {useState, useEffect} from 'react'
import '../../layout.css'
import ContextMenu from '../ContextMenu/ContextMenu';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

const MenuButton = ({selectedMenuID, setSelectedMenuID, menu, navigate}) => {
    const { height, width } = useWindowDimensions();
    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    let selectedStyle = {
        width: width * 0.15,
        height: width * 0.15,
        minWidth: 150,
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30,
        border: '1px solid #000be0',
        backgroundColor: '#e0ecff',
        borderRadius: 15,
    }

    let unselectedStyle = {
        width: width * 0.15,
        height: width * 0.15,
        minWidth: 150,
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30,
        border: '1px solid #D6D6D6',
        borderRadius: 15,
    }

    return (
        <div 
            style={(selectedMenuID === menu.id) ? (selectedStyle): (unselectedStyle)}
            className="menuCard outline"
            onClick={() => {
                setSelectedMenuID(menu.id)
            }}
            onDoubleClick={() => {
                navigate('/categories/' + menu.id, { state: { menu: menu } })
            }}
        >
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 'bold'}}
                className="outline">
            {menu.name}
            </div>
            
            
        </div>
    )
}

// const styles = {
//     selected: {
//         // width: width * 0.15,
//         // height: width * 0.15,
//         border: '1px solid #000be0',
//         backgroundColor: '#e0ecff',
//         marginBottom: 30,
//     },

//     unselected: {
//         // width: width * 0.15,
//         // height: width * 0.15,
//         border: '1px solid #D6D6D6',
//         marginBottom: 30,
//     },
// }

export default MenuButton