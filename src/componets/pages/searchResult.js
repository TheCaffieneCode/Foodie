import React,{useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import fb from '../../firebase';
import Navbar from "../temp/navbar";

const DB =fb.firestore();
const restro_list = DB.collection('restros');
const foods_list = DB.collection('foods');
const cart_list = DB.collection('Cart');

const SearchResult=()=>{
    const query = useParams();
    const SearchQuery = query.Query;
    console.log(SearchQuery)
    const[restros, Setrestros] = useState([]);
    const[Foods, SetFoods] = useState([]);
    const[Resultrestros, SetResultrestros] = useState([]);
    const[ResultFoods, SetResultFoods] = useState([]);
    const[n, setn] = useState("");
  const[m, setm] = useState("");
  const[r, setr] = useState("");
  const[i, seti] = useState("");
  const[p, setp] = useState("");
    useEffect(() =>{
        const unsubscribe = restro_list.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            Setrestros(data);
          });
          return unsubscribe;
    }, []);
    useEffect(() =>{
        const unsubscribe = foods_list.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            SetFoods(data);
          });
          return unsubscribe;
    }, []);
    useEffect(()=>{
        if (SearchQuery) {
            if (restros) {
                SetResultrestros(restros.filter((item)=>
                    item.Name.toLowerCase().includes(SearchQuery.toLowerCase())||
                    item.Type.toLowerCase().includes(SearchQuery.toLowerCase())||
                    item.MealType.toLowerCase().includes(SearchQuery.toLowerCase())
            ));
            }
            if (Foods) {
                SetResultFoods(Foods.filter((item)=>
                    item.Name.toLowerCase().includes(SearchQuery.toLowerCase())||
                    item.Restro.toLowerCase().includes(SearchQuery.toLowerCase())||
                    item.MealType.toLowerCase().includes(SearchQuery.toLowerCase())
            ));
            } 
        }
        
    },[SearchQuery , restros , Foods]);
    const AddToCart=(id)=>{
        foods_list.doc(id).get().then((snapshot) => {
            const data = snapshot.data();
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
        }).then((docRef)=> {
          alert("Added To Cart")
        }).catch((error) => {
            console.error("error:", error);
        }); 
       }
    return(
        <>
        <Navbar/>
        <div>
            {ResultFoods ?<>
                <h1 className="bg-green-500 text-white p-2 w-48">Foods</h1>
                <div class="flex flex-wrap -m-4">
                {ResultFoods.map(item=> (
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
            </>
            :null}
            {Resultrestros ?<>
                <h1 className="bg-green-500 text-white p-2 w-48 mt-12">Restros</h1>
                <div>
                    {Resultrestros.map(restro=> (
                        <div class="flex justify-center items-center" key={restro.id}>
                        <div  class="max-w-2xl bg-white border-2 border-gray-300 p-2 rounded-md tracking-wide shadow-lg">
                            <div id="header" class="flex"> 
                                <img alt="mountain" class="w-48 h-48 rounded-md border-2 border-gray-300" src={restro.Img} />
                                <div id="body" class="flex flex-col ml-5">
                                    <h4 id="name" class="text-2xl text-black font-semibold">{restro.Name}</h4>
                                    <p id="job" class="text-gray-500">{restro.Address}</p>
                                    <p id="job" class="text-gray-800">CITY: {restro.City}</p>
                                    <p id="job" class="text-gray-800 mt-2">CUISINES: {restro.Type}</p>
                                    <button className="bg-red-500 p-2 text-white"><Link to={'/FoodsList/'}>Find Food</Link></button>
                                </div>
                            </div>
                        </div>  
                        </div>
                    ))} 
                </div>
            </>
            :null}
            
            
        </div>
    </>
    );
};
export default SearchResult;