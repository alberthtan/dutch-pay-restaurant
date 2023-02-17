import React, {useState, useEffect, useRef} from 'react'
import '../../layout.css'
import {QRCodeCanvas} from 'qrcode.react'
import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas';

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

const TableButton = ({selectedTableId, setSelectedTableId, table, navigate}) => {
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
        flexDirection: 'column'
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
        flexDirection: 'column'
    }

    const qrRef = useRef();

    const downloadQRCode = async () => {

        const qrCode = document.querySelector('.qrcode');
        if (!qrCode) {
            console.error('QR code canvas not found');
            return;
          }

        const canvas = await html2canvas(qrCode, { scale: 5 });
      
        const link = document.createElement('a');
        link.download = 'table' + table.id + '.png';
        link.href = canvas.toDataURL();
        link.click();
      };

    return (
        <div 
            style={(selectedTableId == table.id) ? (selectedStyle): (unselectedStyle)}
            className="menuCard outline"
            onClick={() => {
                setSelectedTableId(table.id)
            }}
            onDoubleClick={downloadQRCode}
        >
            <div ref={qrRef} style={{display: 'flex', flex: 4, justifyContent: 'center', alignItems: 'center', width: '100%', fontWeight: 'bold', borderTopLeftRadius: 15, borderTopRightRadius: 15}}
                className="outline" class="qrcode">
                    {console.log(table.id)}
                <QRCode
                value={String(table.id)}
                size={width * 0.12}
                // scale={10}
                />
            </div>

            <div className="tableButtonFooter" style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, width: '100%', justifySelf: 'center'}}>
                Table {table.id}
            </div>
            
        </div>
    )
}

export default TableButton