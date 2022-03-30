import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import fb from "../../firebase";
const DB =fb.firestore();
const foods_list = DB.collection('foods');
const cart_list = DB.collection('Cart');

const FoodsByRestro=()=>{
  const[Foods, SetFoods] = useState([]);
  const[CartFood, SetCartFood] = useState([]);
  const[n, setn] = useState("");
  const[m, setm] = useState("");
  const[r, setr] = useState("");
  const[i, seti] = useState("");
  const[p, setp] = useState("");
  
  useEffect(()=>{
    const unsubrestro = foods_list.onSnapshot((snapshot) => {
       const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        SetFoods(data);
   });
   return unsubrestro;
 },[]);

 const AddToCart=(id)=>{
  foods_list.doc(id).get().then((snapshot) => {
      const data = snapshot.data();
      SetCartFood(data);
      setn(data.Name);
      setm(data.MealType);
      setr(data.Restro);
      seti(data.Img);
      setp(data.Price);
  });
  cart_list.add({
    Name: n,
    MealType: m,
    Restro: r,
    Img: i,
    Price: p,
    quantity: "1"
  })
 
  
 }
    return(
        <>
<Navbar/>

        <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
    {Foods.map(item=> (
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full" key={item.id}>
        <a href="/" class="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
        </a>
        <div class="mt-4">
            <div className="flex justify-between">
                <div>
                    <h2 class="text-gray-900 title-font text-lg font-medium">{item.Name}</h2>
                    <p>{item.Restro}</p>
                </div>
                <div>
                    <p>
                        <span className="bg-green-700 text-white px-1 rounded-lg">
                            4.0 *
                        </span>
                    </p>
                    <p class="mt-1">{item.Price} ₹</p>
                </div>
                
            </div>
            <div >
                <button onClick={()=>{AddToCart(item.id)}} 
                className="w-full text-center bg-yellow-500 text-white rounded-lg py-1">Add to cart</button>
            </div>
          
          
        </div>
      </div>
      ))} 
      
      
      
      
      
    </div>
  </div>
</section>
</>
    );
};
export default FoodsByRestro;