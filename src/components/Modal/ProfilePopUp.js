import React, {useState} from 'react'
import { v4 } from 'uuid'
import '../Modal.css'
import PhoneInput from 'react-phone-number-input'

const ProfilePopUp = ({toggled, toggleModal, restaurant, getRestaurant}) => {
    const [name, setName] = useState(restaurant.name)
    const [address, setAddress] = useState(restaurant.address)
    const [email, setEmail] = useState(restaurant.email)
    const [phone, setPhone] = useState(restaurant.phone_number)
    const [description, setDescription] = useState(restaurant.description)
    const [hours, setHours] = useState(restaurant.open_hours)
    const [imageFile, setImageFile] = useState(null)

  
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        var file = event.target.files[0]
        setImageFile(file)
        console.log("file")
        console.log(file)

        var reader  = new FileReader();
        reader.onload = function(e)  {
          console.log("reader")
            document.getElementById("setRestaurantImage").src = e.target.result;
        }
        // you have to declare the file loading
        reader.readAsDataURL(file);
      }
    }

    const validateEmailFormat = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return (reg.test(email))
    }

  
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

        console.log("edit restaurant")
        console.log(email)
        
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
      console.log("handleEmail")
      console.log(email)
    }

    const handleAddress = ({target:{value}}) => {
        setAddress(value)
        console.log(address)
      }

    const handleHours = ({target:{value}}) => {
      setHours(value)
      console.log(hours)
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
                  maxLength={50}
                />

                <div style={{marginTop: 30, marginBottom: 5}}>
                    Phone
                </div>
                <PhoneInput placeholder="Enter phone number" style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1,
                    height: 40, 
                  }}
                  value={phone}
                  onChange={phone => {setPhone(phone)}}
                  maxLength={18}
                />


                <div style={{marginTop: 30, marginBottom: 5}}>
                  Description
                </div>
                <textarea style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10, 
                    height: 100
                  }} 
                  placeholder="Enter description" 
                  value={description} 
                  onChange={handleDescription} 
                  maxLength={150}
                />

                <div style={{marginTop: 30, marginBottom: 5}}>
                  Address
                </div>
                <textarea style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10, 
                    height: 100
                  }} 
                  placeholder="Enter address" 
                  value={address} 
                  onChange={handleAddress}
                  maxLength={75} 
                />

                <div style={{marginTop: 30, marginBottom: 5}}>
                  Open Hours
                </div>
                <textarea style={{
                    width: '100%', 
                    borderRadius: 5, 
                    borderWidth: 1, 
                    padding: 10, 
                    height: 100
                  }} 
                  placeholder="Monday - Friday: 10am - 8pm&#10;Saturday - Sunday: 10am - 10pm" 
                  value={hours} 
                  onChange={handleHours}
                  maxLength={75} 
                />

                

                <div style={{display: 'flex', flexDirection: 'row'}}>


                  <div style={{marginLeft: 50}}>
                  </div>

                </div>

                <div style={{marginTop: 30}}>
                  Photo
                </div>


                  <label style={styles.customFileUpload}>
                      <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={onImageChange}/>

                      {imageFile || restaurant.restaurant_image ? <img id="setRestaurantImage" src={restaurant.restaurant_image} style={{width: '100%', borderRadius: 15}}/>:
                        <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', width: '100%'}}>Add Profile Photo</div>
                      }
                  </label>
                 
                {/* </div> */}
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
                  if(validateEmailFormat(email)) {
                      editRestaurant()
                      toggleModal()
                  } else {
                    alert("Invalid email format")
                  }
                }}>
                Save
              </div>
            </div>
          </div>
      </div>
      
      </div>
      )
}

const styles = {
  customFileUpload: {
    cursor: 'pointer',
    overflow: 'hidden',
    width: '180px',
    height: '120px',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#CACACA'
  }
}

export default ProfilePopUp