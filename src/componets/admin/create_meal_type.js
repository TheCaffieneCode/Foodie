import React , {useState} from "react";
import fb from '../../firebase';
const DB =fb.firestore();
const storageRef = fb.storage().ref();
const meal_type_list = DB.collection('meal_type');



const CreateMealType = () => {

    const[name, Setname] = useState("");
    const[img, Setimg] = useState(null);

    const handleCoverImgChange=(e)=>{
        if (e.target.files[0]) {
            Setimg(e.target.files[0]);
        }
    };
    const submit =(e)=> {
        e.preventDefault();
        const uploadTask = storageRef.child('meal_type/' + img.name).put(img);
        uploadTask.on(
            'state_changed', 
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                //uploadTask.snapshot.ref.getDownloadURL()
                storageRef.child('meal_type/' + img.name).getDownloadURL().then(url=>{
                    console.log("img url:", url)
                    meal_type_list.add ({
                        Name: name,
                        Img: url
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
            <input type="text" placeholder="Title" 
            onChange={(e)=>{Setname(e.target.value)}} required />
            <input type="file" name="coverimg" accept="image/*" onChange={(e)=>handleCoverImgChange(e)} />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default CreateMealType;