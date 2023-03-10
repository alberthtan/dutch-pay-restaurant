import React from 'react'
import '../../layout.css'

const LiveOrderButton = ({onClick, setSelectedOrderID, table, items}) => {
    console.log(items)
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
        setSelectedOrderID(items[0].order_id)
    }}
>
    <div style={{
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 5,
    }}>
        Table {table.name}: ASDFF13 ({JSON.parse(items[0].orderedBy).first_name})
    </div>
    {items.map((item, index) => {
        return(<div style={{marginLeft: 20, paddingTop: 5,}}>
            <div style={{fontWeight: 'bold'}}>
                {item.item.name}
            </div>
        </div>)
    })}
    
</div>
  )
}

export default LiveOrderButton