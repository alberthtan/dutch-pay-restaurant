import React, {useState, useEffect} from 'react'

const ViewPastOrders = ({receipt, navigate}) => {

    const getFormattedDate = (timestamp) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const daySuffix = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
            "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
            "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
            "st"];
        const date = new Date(timestamp);
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const dayWithSuffix = day + daySuffix[day - 1];
        const formattedDate = `${month} ${dayWithSuffix}, ${year}`;
        return formattedDate
    }

    const getFormattedTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Convert the hours from a 24-hour format to a 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        
        // Determine whether it's AM or PM
        const amOrPm = hours < 12 ? "am" : "pm";
        
        const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
        return formattedTime
    }

    return (
        <div style={{
            display: 'flex', 
            // backgroundColor: '#E8E8E8', 
            height: 100, 
            width: '95%', 
            // marginTop: 10, 
            borderBottom: '0.5px solid #D6D6D6',
            // borderRadius: 15, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justiyContent: 'center'}}
            onDoubleClick={() => {navigate('/past-order/' + receipt.id, {state: {receipt: receipt}})}}
            >

            <div style={{
                display: 'flex', 
                flex: 5, 
                flexDirection: 'column'}}>
                <div style={{marginLeft: 50,}}>
                    <div style={{ fontSize: 20, marginBottom: 10,}}>
                    {/* {menuName} */}
                    Order: #{receipt.id}
                    </div>

                    <div style={{fontSize: 11, paddingLeft: 15,}}>
                        {getFormattedDate(receipt.timestamp)} at {getFormattedTime(receipt.timestamp)}
                    </div>
                </div>
            </div>

            {/* {(menuId == activeMenu) ? 
                (<div style={styles.activeButton}
                    onClick={() => {
                        // setActiveMenu("")
                        // updateActiveMenu("")
                    }}
                    >
                        View Receipt
                </div>):
                <div style={styles.inactiveButton}
                    onClick={() => {
                        // setActiveMenu(menuId)
                        // updateActiveMenu(menuId)
                    }}
                    >
                        View Receipt
                </div>
            } */}
            

    </div>
    )
}

const styles = {
    inactiveButton: {
        display: 'flex', 
        flex: 1, 
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        border: '0.5px solid #D6D6D6',
        fontWeight: 'bold',
        cursor: 'pointer'
    },

    activeButton: {
        display: 'flex', 
        flex: 1, 
        height: 30,
        justifyContent: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 15,
        border: '0.5px solid #D6D6D6',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: 'white'
    }
}

export default ViewPastOrders