import React, {useState, useEffect} from 'react'
import '../../layout.css'

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

const LiveTableButton = ({table, onClick, setSelectedTableID}) => {
    const { height, width } = useWindowDimensions();

    let liveTableStyle = {
        width: width * 0.15,
        height: width * 0.15,
        minWidth: 150,
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        // marginBottom: -100,
        // marginTop: 20,
        // marginBottom: 20,
        border: '1px solid #D6D6D6',
        borderRadius: 15
    }

    return (
        <div 
            style={liveTableStyle}
            className="liveTableCard outline"
            onClick={() => {
                setSelectedTableID(table.id)
                onClick()
                
            }}
        >
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 'bold'}}
                className="outline">
            {"Table " + table.name}
            </div>
            
            
        </div>
    )
}

export default LiveTableButton