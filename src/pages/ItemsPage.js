import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Layout, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import ItemButton from '../components/Buttons/ItemButton';
import frontArrowIcon from '../assets/icons/frontarrow.png';
import ItemContextMenu from '../components/ContextMenu/ItemContextMenu';
import ItemPopUp from '../components/Modal/ItemPopUp';

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
  


const ItemsPage = () => {
  let navigate = useNavigate();
    const { menuId, categoryId } = useParams();
    const { state } = useLocation();
    const { height, width } = useWindowDimensions();
    const [allItems, setAllItems] = useState([])
    const [rightClicked, setRightClicked] = useState(false);
    const [selectedItemID, setSelectedItemID] = useState("")
    const [points, setPoints] = useState({
      x: 0,
      y: 0,
    });

    const [modal, _setModal] = useState(false)
    const modalRef = useRef(modal);
    const setModal = data => {
      modalRef.current = data;
      _setModal(data);
    };

    const toggleModal = () => {
      setModal(!modalRef.current)
    }

    const getMenuItems = async () => {
      return fetch('/menu-items/', 
      {
        method: 'GET',
      })
      .then((response) => response.json())
      .then(json => {
        let result = json.filter(item => item['category'] == categoryId)
        setAllItems(result)})
    }

    useEffect(() => {
      // console.log(allCategories)
      getMenuItems()
    }, [])
    

    const handleView = () => {
      console.log("handle view")
      // toggleModal()
    }
  
    const handleDelete = async () => {
      console.log("handle delete")
      let index = allItems.map(function(item) { return item.id }).indexOf(selectedItemID)
      allItems.splice(index, 1)
      setAllItems(allItems)
  
      return fetch('/menu-items/' + selectedItemID + '/', 
      {
        method: 'DELETE',
      })
    }

    useEffect(() => {
      const handleClick = (e) => {
        setRightClicked(false);
        if(!e.target.className.includes('outline')) {
          setSelectedItemID('')
        }
        if(e.target.className.includes('toggleModal')) {
          toggleModal()
        }
      }
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, []);

  return (
    <div>
      <Navbar />
      {modalRef.current && 
        <ItemPopUp toggled={modalRef.current} toggleModal={toggleModal} categoryId={categoryId} getMenuItems={getMenuItems}/>
      }
      
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavbar selectedKey={'2'}/>

        <div style={{width: width}}>

            <div style={{marginLeft: '30px', display: 'flex', height: 100}}>

                <div style={styles.headerBarContainer}>

                    <div className='HeaderBarItem' style={styles.headerBarItem} onClick={() => {navigate('/menus')}}>
                        Menus
                    </div>

                    <img src={frontArrowIcon} style={styles.frontArrowIcon} alt=">"/>

                    <div className='HeaderBarItem' style={styles.headerBarItem} onClick={() => {navigate('/categories/' + menuId, { state: { menu: state.menu } })}}>
                        {state.menu.name}
                    </div>

                    <img src={frontArrowIcon} style={styles.frontArrowIcon} alt=">"/>

                    <div 
                      style={styles.headerBarGreenItem}>
                      {state.category.name}
                    </div>

                </div>
            </div>

            <Form.Item // Form Item (Register Button)
            name="addMenu"
            style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
            >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={toggleModal}>
                + New Item
                </Button>
            </Form.Item>

            <div style={styles.itemBarContainer}>
                <div style={{display: 'flex', flex: 1, justifyContent: 'start'}}>
                  <div style={{marginLeft: '15%'}}>
                    Image
                  </div>
                </div>
                
                <div style={{display: 'flex', flex: 1, justifyContent: 'start', paddingLeft: '20px'}}>
          
                    Name
                </div>
                <div style={{display: 'flex', flex: 2, justifyContent: 'start', paddingLeft: '20px', paddingRight: '20px'}}>
                    Description
                </div>
                <div style={{display: 'flex', flex: 1, justifyContent: 'start'}}>
                    Price
                </div>
            </div>

             {allItems.map((item, index) => {
                return (
                    <div
                        key={index}
                        style={{borderWidth: '3px', borderColor: 'black'}}
                        onContextMenu={(e) => {
                            e.preventDefault(); // prevent right click popup
                            setRightClicked(true);
                            setSelectedItemID(item.id);
                            setPoints({
                                x: e.clientX,
                                y: e.clientY,
                            });
                         }}> 
                        <ItemButton 
                          item={item} 
                          selectedItemID={selectedItemID} 
                          setSelectedItemID={setSelectedItemID} 
                          handleView={handleView}
                        />
                    </div>
                );
            })}

            {rightClicked && (
                <ItemContextMenu x={points.x} y={points.y} yOffset={window.pageYOffset}
                  handleView={handleView} 
                  handleDelete={handleDelete}
                />
            )}

        </div>

      </Layout>



    </div>
  )
}

const styles = {
  headerBarContainer: {
    flexDirection: 'row', 
    display: 'flex', 
    alignItems: 'center',
  },

  headerBarItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5px',
    borderRadius: '10px',
  },

  itemBarContainer: {
    display: 'flex', 
    width: '100%',
    alignItems: 'center',
    borderTop: '1px solid #D6D6D6', 
    paddingTop: 10, 
    paddingBottom: 10
  },

  frontArrowIcon: {
    flex: 1,
    height: '20px',
    width: '20px',
    marginLeft: '20px',
    marginRight: '20px',
  },

  headerBarGreenItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5px',
    color: 'green',
  },
}

export default ItemsPage