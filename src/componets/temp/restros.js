import React , {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./navbar";
import fb from '../../firebase';
const DB =fb.firestore();
const restro_list = DB.collection('restros');

const Restrolist = () => {
   const query = useParams();
   const[filtered, Setfiltered] = useState(false);
   const[restros, Setrestros] = useState([]);
   const[Frestros, SetFrestros] = useState([]);
   useEffect(()=>{
      if (query) {
         console.log(query.Meal);
         const unsubrestro = restro_list.where("MealType", "==", query.Meal).onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => ({
               ...doc.data(),
               id: doc.id,
             }));
             Setrestros(data);
        });
        return unsubrestro;
      }
   },[query]);
   const FilterRestro = (str)=> {
      SetFrestros(restros.filter((item)=>
            item.Type.toLowerCase().includes(str.toLowerCase())
        ));
      Setfiltered(true);
  };
  const UnFilterRestro = (str)=> {
   Setfiltered(false);
};
    return(

<>
<Navbar/>
<div className="space-x-2 text-center">
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {UnFilterRestro()}} >All</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("southIndian food")}} >southIndian food</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Soft Drinks")}} >Soft Drinks</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Juice")}} >Juice</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Indian Foods")}} >Indian Foods</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("NorthIndian Food")}} >NorthIndian Food</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Ice N Spices")}} >Ice N Spices</button>
</div>

        <div className="space-y-4">
{filtered ?<>
   {Frestros.map(restro=> (
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
</>
: <>
{restros.map(restro=> (
<div class="flex justify-center items-center" key={restro.id}>
   <div  class="max-w-2xl bg-white border-2 border-gray-300 p-2 rounded-md tracking-wide shadow-lg">
      <div id="header" class="flex"> 
         <img alt="mountain" class="w-48 h-48 rounded-md border-2 border-gray-300" src={restro.Img} />
         <div id="body" class="flex flex-col ml-5">
            <h4 id="name" class="text-2xl text-black font-semibold">{restro.Name}</h4>
            <p id="job" class="text-gray-500">{restro.Address}</p>
            <p id="job" class="text-gray-800">CITY: {restro.City}</p>
            <p id="job" class="text-gray-800 mt-2">CUISINES: {restro.Type}</p>
            <button className="bg-red-500 p-2 text-white"><Link to={'/FoodsList/'+restro.Name}>Find Food</Link></button>
            
         </div>
      </div>
   </div>  
</div>
))} 
</>}

        </div>

</>
    );
};

export default Restrolist;