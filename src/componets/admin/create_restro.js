import React , {useState} from "react";
import fb from '../../firebase';
const DB =fb.firestore();
const storageRef = fb.storage().ref();
const restros_list = DB.collection('restros');


const CreateRestro = () => {
    const[name, Setname] = useState("");
    const[address, SetAddress] = useState("");
    const[city, SetCity] = useState("");
    const[type, Settype] = useState("");
    const[img, Setimg] = useState(null);
    
    const handleCoverImgChange=(e)=>{
        if (e.target.files[0]) {
            Setimg(e.target.files[0]);
        }
    };
    const submit =(e)=> {
        e.preventDefault();
        const uploadTask = storageRef.child('restro/' + img.name).put(img);
        uploadTask.on(
            'state_changed', 
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                //uploadTask.snapshot.ref.getDownloadURL()
                storageRef.child('restro/' + img.name).getDownloadURL().then(url=>{
                    console.log("img url:", url)
                    restros_list.add ({
                        Name: name,
                        Address: address,
                        City: city,
                        Img: url,
                        Type: type,
                        Foods: "",
                        Mealtype: ""
                    }).then((docRef)=> {
                        alert("data successfully submit")
                    }).catch((error) => {
                        console.error("error:", error);
                    });

                })
            }
        )
        }
    return(
        <div>
            <form onSubmit={(event) => {submit(event)}}>    
            <input type="text" placeholder="name" 
            onChange={(e)=>{Setname(e.target.value)}} required />
            <input type="file" name="coverimg" accept="image/*" onChange={(e)=>handleCoverImgChange(e)} />
            <br/>
            <input type="text" placeholder="city" 
            onChange={(e)=>{SetCity(e.target.value)}} required />
            <br/>
            <input type="text" placeholder="address" 
            onChange={(e)=>{SetAddress(e.target.value)}} required />
            <br/>
            <input type="text" placeholder="type" 
            onChange={(e)=>{Settype(e.target.value)}} required />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default CreateRestro;