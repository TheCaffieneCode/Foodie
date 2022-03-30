import React , {useState, useEffect} from "react";
import fb from '../../firebase';
const DB =fb.firestore();
const storageRef = fb.storage().ref();
const foods_list = DB.collection('foods');
const meal_type_list = DB.collection('meal_type');
const Restro_list = DB.collection('restros'); 

const CreateFood = () => {

    const[name, Setname] = useState("");
    const[price, Setprice] = useState("0");
    const[img, Setimg] = useState(null);
    const[meals, Setmeals] = useState([]);
    const[SelectedMeal, SetSelectedMeal ] = useState(null);
    const[Restros, SetRes] = useState([]);
    const[SelectedRestros, SetSelectedRestros ] = useState(null);

    useEffect(() =>{
        const unsubscribe = meal_type_list.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            Setmeals(data);
          });
          return unsubscribe;
    }, []);
    useEffect(() =>{
        const unsubscribeB = Restro_list.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            SetRes(data);
          });
          return unsubscribeB;
    }, []);
    console.log("meal:",SelectedMeal);
    const handleCoverImgChange=(e)=>{
        if (e.target.files[0]) {
            Setimg(e.target.files[0]);
        }
    };
    const submit =(e)=> {
        e.preventDefault();
        const uploadTask = storageRef.child('foods/' + img.name).put(img);
        uploadTask.on(
            'state_changed', 
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                //uploadTask.snapshot.ref.getDownloadURL()
                storageRef.child('foods/' + img.name).getDownloadURL().then(url=>{
                    console.log("img url:", url)
                    foods_list.add ({
                        Name: name,
                        MealType: SelectedMeal,
                        Restro: SelectedRestros,
                        Img: url,
                        Price:price
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
            <br/>
            
            <select name="meals" 
                    onChange={(e)=>{SetSelectedMeal(e.target.value)}}
            >
                {meals.map(meal=> (
                    <option key={meal.id}
                        value={meal.name} 
                        >{meal.Name}
                    </option>
                ))}
            </select>
            <br />
            <select name="restros" 
                    onChange={(e)=>{SetSelectedRestros(e.target.value)}}
            >
                {Restros.map(meal=> (
                    <option key={meal.id}
                        value={meal.Name} 
                        >{meal.Name}
                    </option>
                ))}
            </select>
            <input type="number" placeholder="price" 
            onChange={(e)=>{Setprice(e.target.value)}} required />
            
            
            
            
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default CreateFood ;