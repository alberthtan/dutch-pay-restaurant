import React, {useState, useEffect} from 'react'

const ViewPastOrders = ({menuId, menuName, activeMenu, setActiveMenu, restaurant}) => {

    // console.log(menuId == activeMenu)

    // const updateActiveMenu = async (id) => {
    //     let formdata = new FormData();
    //     formdata.append("active_menu", id)
    //     return fetch('/restaurants/' + restaurant.id + '/', {
    //         method: 'PATCH',
    //         headers: {
    //           Accept: '*/*',
    //           'Accept-Encoding': 'gzip,deflate,br',
    //           Connection: 'keep-alive',
    //           // Authorization: authorization
    //         },
    //         body: formdata
    //       })
    //       .then(
    //         response => response.json()
    //       )
    //       .then(json => {
    //         console.log(json)
    //       })
    // }

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
            justiyContent: 'center'}}>

            <div style={{
                display: 'flex', 
                flex: 5, 
                flexDirection: 'column'}}>
                <div style={{marginLeft: 50,}}>
                    <div style={{ fontSize: 20, marginBottom: 10,}}>
                    {/* {menuName} */}
                    Order: #12345
                    </div>

                    <div style={{fontSize: 11, paddingLeft: 15,}}>
                        June 6, 2022 at 12:30pm
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