import React from 'react'
import '../../layout.css'

const LiveOrderButton = ({onClick, setSelectedItemID, table, item}) => {
  return (
    <div style={{
        width: '100%',
        // backgroundColor: 'white',
        borderBottom: '1px solid #000000',
        paddingLeft: 10, 
        paddingBottom: 5}}
        className="liveOrderButton"
    onClick={() => {
        onClick()
        setSelectedItemID(item.id)
    }}
>
    <div style={{
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 5,
    }}>
        Table {table.name}: ASDFF13 ({JSON.parse(item.orderedBy).first_name})
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