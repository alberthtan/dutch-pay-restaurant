import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'

const ProfilePopUp = ({toggled, toggleModal, restaurant, getRestaurant}) => {
    const [name, setName] = useState(restaurant.name)
    const [address, setAddress] = useState(restaurant.address)
    const [email, setEmail] = useState(restaurant.email)
    const [phone, setPhone] = useState(restaurant.phone_number)
    const [description, setDescription] = useState(restaurant.description)
    const [imageFile, setImageFile] = useState(null)

    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImageFile(event.target.files[0])
      }
    }

    useEffect(() => {
      console.log(imageFile)
    }, [imageFile])

  
    const editRestaurant = async () => {
        let formdata = new FormData();
        formdata.append("name", name)
        formdata.append("address", address)
        formdata.append("phone_number", phone)
        formdata.append("email", email)
        formdata.append("description", description)
        // formdata.append("table_count", tableCount)
        if (imageFile) {
            formdata.append("restaurant_image", imageFile, "restaurant-" + v4())
        }

        console.log(imageFile)
        
        return fetch('/restaurants/' + restaurant.id + '/', {
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
          getRestaurant()
          console.log(json)
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

    const handleEmail = ({target:{value}}) => {
      setEmail(value)
      console.log(email)
    }

    const handlePhone = ({target:{value}}) => {
        setPhone(value)
        console.log(phone)
      }
  

    const handleAddress = ({target:{value}}) => {
        setAddress(value)
        console.log(address)
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
          <div className="profile-modal-content">
            <h4>
              Profile
            </h4>
            
            <form style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10, flexDirection: 'column'}}
            onSubmit={(e) => {e.preventDefault()}}>
              <input className="no-outline" style={{
                width: '100%', 
                borderWidth: 0, 
                borderBottomWidth: 1, 
                padding: 10, 
                backgroundColor: '#f1f1f1'
              }} 
                type="text" 
                placeholder="Restaurant Name" 
                autoFocus value={name}
                onChange={handleName} 
                maxLength={38}
              />


                <div style={{marginTop: 30, marginBottom: 5}}>
                  Description
                </div>
                <textarea style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10, height: 100}} placeholder="Enter description" value={description} onChange={handleDescription} />

                <div style={{marginTop: 30, marginBottom: 5}}>
                  Address
                </div>
                <textarea style={{width: '100%', borderRadius: 5, borderWidth: 1, padding: 10, height: 100}} placeholder="Enter address" value={address} onChange={handleAddress} />

                <div style={{marginTop: 30, marginBottom: 5}}>
                    Email
                </div>
                <input style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10
                  }} 
                  type="text" 
                  placeholder="Enter email" 
                  value={email} 
                  onChange={handleEmail}
                  maxLength={30}
                />

                <div style={{marginTop: 30, marginBottom: 5}}>
                    Phone
                </div>
                <input style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10
                  }} 
                  type="text" 
                  placeholder="Enter email" 
                  value={phone} 
                  onChange={handlePhone}
                  maxLength={12}
                  />


                <div style={{display: 'flex', flexDirection: 'row'}}>


                  <div style={{marginLeft: 50}}>
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
                }}>
                Cancel
              </div>
              <div style={{cursor: 'pointer', color: '#0A60C9'}} onClick={() => {
                  editRestaurant()
                  toggleModal()
                }}>
                Save
              </div>
            </div>
          </div>
      </div>
      
      </div>
      )
}

export default ProfilePopUp