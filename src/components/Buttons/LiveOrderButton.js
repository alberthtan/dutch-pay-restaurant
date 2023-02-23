import React from 'react'
import '../../layout.css'

const LiveOrderButton = ({onClick, table, item}) => {
  return (
    <div style={{
        width: '100%',
        // backgroundColor: 'white',
        borderBottom: '1px solid #000000',
        paddingLeft: 10, 
        paddingBottom: 5}}
        className="liveOrderButton"
    onClick={onClick}
>
    <div style={{
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 5,
    }}>
        Table {table.name}: ASDFF13 ({item.orderedBy})
    </div>
    <div style={{marginLeft: 20, paddingTop: 5,}}>
        <div style={{fontWeight: 'bold'}}>
            {item.item.name}
        </div>
        {/* <div style={{marginLeft: 10}}>
            Notes: mild, no cheese
        </div> */}
    </div>
</div>
  )
}

export default LiveOrderButton