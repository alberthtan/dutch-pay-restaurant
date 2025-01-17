import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Layout, Button } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout.css'
import CategoryButton from '../../components/Buttons/CategoryButton';
import frontArrowIcon from '../../assets/icons/frontarrow.png';
import CategoryPopUp from '../../components/Modal/CategoryPopUp';
import RenameCategoryPopUp from '../../components/Modal/RenameCategoryPopUp';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import SideNavbar from '../../components/Navbar/SideNavbar';

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


const CategoryPage = () => {
    let navigate = useNavigate();
    const { menuId } = useParams();
    const { state } = useLocation();
    const { height, width } = useWindowDimensions();
    const [allCategories, setAllCategories] = useState([])
    const [rightClicked, setRightClicked] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState("")
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
    const [renameModal, _setRenameModal] = useState(false)
    const renameModalRef = useRef(renameModal);
    const setRenameModal = data => {
      renameModalRef.current = data;
      _setRenameModal(data)
    }

    const toggleModal = () => {
      setModal(!modalRef.current)
    }

    const toggleRenameModal = () => {
      setRenameModal(!renameModalRef.current)
    }

    const getCategories = async () => {
      return fetch('https://dutch-pay-test.herokuapp.com/categories/', 
      {
        method: 'GET',
      })
      .then((response) => response.json())
      .then(json => {
        console.log("JSON")
        console.log(json)
        let result = json.filter(category => category['menu'] === parseInt(menuId))
        // console.log(menuId)
        console.log(result)
        setAllCategories(result)})
    }

    const handleRename = () => {
      toggleRenameModal()
    }
  
    const handleDelete = async () => {
      console.log("handle delete")
      let index = allCategories.map(function(category) { return category.id }).indexOf(selectedCategoryID)
      allCategories.splice(index, 1)
      setAllCategories(allCategories)
      const accessToken = localStorage.getItem("access")
      return fetch('https://dutch-pay-test.herokuapp.com/categories/' + selectedCategoryID + '/', 
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
    }

    useEffect(() => {
      const handleClick = (e) => {
        setRightClicked(false);
        if(!e.target.className.includes('outline') && !renameModalRef.current) {
          setSelectedCategoryID('')
        }
        if(e.target.className.includes('toggleModal')) {
          toggleModal()
        }
        if(e.target.className.includes('toggleRenameModal')) {
          toggleRenameModal()
        }
      }
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, []);

    useEffect(() => {
      console.log("Here")
      console.log(allCategories)
      getCategories()
    }, [])


  return (
    <div>
      <Navbar />

      {modalRef.current && 
        <CategoryPopUp toggled={modalRef.current} toggleModal={toggleModal} menuId={menuId} getCategories={getCategories}/>
      }

      {renameModalRef.current && 
        <RenameCategoryPopUp toggleModal={toggleRenameModal} getCategories={getCategories}
       category={allCategories.find(obj => obj.id === selectedCategoryID)}/>
      }
      
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavbar selectedKey={'2'}/>

        <div style={{width: width}}>

            <div style={{marginLeft: '30px', display: 'flex', width: '100%', height: 100, alignItems: 'center'}}>
                <div style={styles.headerBarContainer}>
                    <div className='HeaderBarItem' style={styles.headerBarItem} onClick={() => {navigate('/menus')}}>
                       Menus
                    </div> 
                    <img src={frontArrowIcon} style={styles.frontArrowIcon} alt=">"/>
                    <div 
                      style={styles.headerBarGreenItem}>
                       {state.menu.name}
                    </div>
                </div>
            </div>

            <Form.Item // Form Item (Register Button)
            name="addMenu"
            style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
            >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={toggleModal}>
                + New Category
                </Button>
            </Form.Item>


            {allCategories.map((category, index) => {
                return (
                    <div
                        key={index}
                        style={{borderWidth: '3px', borderColor: 'black'}}
                        onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setRightClicked(true);
                            setSelectedCategoryID(category.id);
                            setPoints({
                                x: e.clientX,
                                y: e.clientY,
                            });
                         }}> 
                        <CategoryButton 
                          menu={state.menu} 
                          category={category} 
                          selectedCategoryID={selectedCategoryID} 
                          setSelectedCategoryID={setSelectedCategoryID} 
                          navigate={navigate} 
                          width={width}
                        />
                    </div>
                );
            })}

            {rightClicked && (
                <ContextMenu x={points.x} y={points.y} yOffset={window.pageYOffset}
                  handleRename={handleRename} 
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
    // borderRadius: '10px',
    // backgroundColor: 'green'
  },

  headerBarItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5px',
    borderRadius: '10px',
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

export default CategoryPage