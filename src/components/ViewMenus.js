import React from 'react'

const ViewMenus = ({menuId, menuName, activeMenu, setActiveMenu, restaurant}) => {

    const updateActiveMenu = async (id) => {
        let formdata = new FormData();
        formdata.append("active_menu", id)
        return fetch('https://dutch-pay-test.herokuapp.com/restaurants/' + restaurant.id + '/', {
            method: 'PATCH',
            headers: {
              Accept: '*/*',
              'Accept-Encoding': 'gzip,deflate,br',
              Connection: 'keep-alive',
              // Authorization: authorization
            },
            body: formdata
          })
          .then(
            response => response.json()
          )
          .then(json => {
            console.log(json)
          })
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
            justiyContent: 'center'}}>

            <div style={{
                display: 'flex', 
                flex: 5, 
                flexDirection: 'column'}}>
                <div style={{marginLeft: 50,}}>
                    <div style={{ fontSize: 20, marginBottom: 10,}}>
                    {menuName}
                    </div>

                    <div style={{fontSize: 11, paddingLeft: 15,}}>
                        Hours: 8:00am - 11:00am
                    </div>
                </div>
            </div>

            {(menuId === activeMenu) ? 
                (<div style={styles.activeButton}
                    onClick={() => {
                        setActiveMenu("")
                        updateActiveMenu("")
                    }}
                    >
                        ACTIVE
                </div>):
                <div style={styles.inactiveButton}
                    onClick={() => {
                        setActiveMenu(menuId)
                        updateActiveMenu(menuId)
                    }}
                    >
                        ACTIVATE
                </div>
            }
            

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

export default ViewMenus