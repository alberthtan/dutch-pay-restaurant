import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
// import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

const ItemPopUp = ({toggled, toggleModal, categoryId, getMenuItems}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null)

    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //   console.log(e.target)
        //   setImageFile(e.target.result);
        // };
        // reader.readAsDataURL(event.target.files[0]);
        // let imageUrl = URL.createObjectURL(event.target.files[0])
        // console.log(imageUrl)
        // let imageUrl = URL.createObjectURL(event.target.files[0])
        setImageFile(event.target.files[0])
      }
    }

    // useEffect(() => {
    //   // console.log(image)
    //   if(image) {
    //     fetch(image)
    //     .then(res => res.blob())
    //     .then(blob => {
    //       const file = new File([blob], "File name",{ type: "image/png" })
    //       setImageFile(file)
    //       console.log(imageFile)
    //     })
    //   }
    // }, [image])

    useEffect(() => {
      console.log(imageFile)
      // if (imageFile) {
      //   // console.log(JSON.parse(Buffer.toString(imageFile)))
      //   var strImage = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
      //   console.log(strImage)
      //   // let decoded = base64_decode(imageFile)
      //   // console.log(decoded)
      //   let base64_to_imgsrc = Buffer.from(strImage, "base64").toString()
      //   console.log(base64_to_imgsrc)
      //   // console.log(base64_to_imgsrc)
      //   setImageFile(base64_to_imgsrc)
      //   // console.log(encoded)
      // }
    }, [imageFile])

    // var fileToRead = document.getElementById("yourFile");

    // fileToRead.addEventListener("change", function(event) {
    //     var files = fileToRead.files;
    //     if (files.length) {
    //         console.log("Filename: " + files[0].name);
    //         console.log("Type: " + files[0].type);
    //         console.log("Size: " + files[0].size + " bytes");
    //     }

    // }, false);


    // let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    const createNewItem = async () => {
      let formdata = new FormData();
    //   formdata.append("itemImage", {
    //     uri: imageFile,
    //     name: "item-" + v4(),
    //     type: "image/png"
    // })
    formdata.append("name", name)
    formdata.append("description", description)
    formdata.append("price", price)
    formdata.append("itemImage", imageFile, "item-" + v4())
    formdata.append("category", categoryId)
    console.log(imageFile)
      return fetch('/menu-items/', {
        method: 'POST',
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
        getMenuItems()
      })
    }
  
    const handleName = ({target:{value}}) => {
      setName(value)
      console.log(name)
    }

    const handleDescription = ({target:{value}}) => {
      setDescription(value)
      console.log(description)
    }

    const handlePrice = ({target:{value}}) => {
      setPrice(value)
      console.log(price)
    }

    const noOutline = {
      control: (base) => ({
        ...base,
        boxShadow: "none"
      })
  }
  
    return (
      <div>
        <div className="modal" style={{display: 'flex'}}>
        <div className="overlay toggleModal"></div>
          <div className="item-modal-content">
            <h4>
              New Item
            </h4>
            
            <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10, flexDirection: 'column'}}
            onSubmit={(e) => {e.preventDefault()}}>
              <input className="no-outline" style={{width: '100%', borderWidth: 0, borderBottomWidth: 1, padding: 10, backgroundColor: '#f1f1f1'}} type="text" placeholder="Name" autoFocus value={name} onChange={handleName} />


                <div style={{marginTop: 30, marginBottom: 5}}>
                  Description
                </div>
                <textarea style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10, height: 100}} placeholder="Enter description" value={description} onChange={handleDescription} />

                <div style={{display: 'flex', flexDirection: 'row'}}>

                  <div style={{alignSelf: 'flex-end'}}>
                    <div style={{ marginTop: 30, marginBottom: 5}}>
                      Price
                    </div>
                    <input style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10}} type="number" presicion={2} placeholder="Enter price" value={price} onChange={handlePrice}/>
                  </div>

                  <div style={{marginLeft: 50}}>
                    <div style={{marginTop: 30, marginBottom: 5}}>
                      Tax
                    </div>
                    <input style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10}} type="number" presicion={2} placeholder="Enter price" value={price} onChange={handlePrice} webkitdirectory/>
                  </div>

                </div>

                <div style={{marginTop: 30}}>
                  Photo
                </div>

                <div style={{display: 'flex'}}>
                  <label style={{ backgroundColor: '#CACACA'}} class="custom-file-upload">
                    <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={onImageChange}/>
                      Custom Upload
                  </label>
                </div>
                {/* <input type="file" accept="image/png, image/gif, image/jpeg"/> */}
                

            </form>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <div style={{marginRight: 20, cursor: 'pointer'}}
              onClick={() => {
                toggleModal()
                setName('')
                setDescription('')
                setPrice(null)}}>
                Cancel
              </div>
              <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
                if (name && price) {
                  createNewItem()
                  toggleModal()
                  setName('')
                  setDescription('')
                  setPrice(null)
                }
                }}>
                Create
              </div>
            </div>
          </div>
      </div>
      
      </div>
      )
}

export default ItemPopUp