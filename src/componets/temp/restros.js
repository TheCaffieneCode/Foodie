import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import fb from '../../firebase';
const DB =fb.firestore();
const restro_list = DB.collection('restros');

const Restrolist = () => {
   const[filtered, Setfiltered] = useState(false);
   const[restros, Setrestros] = useState([]);
   const[Frestros, SetFrestros] = useState([]);
   useEffect(()=>{
      const unsubrestro = restro_list.onSnapshot((snapshot) => {
         const data = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          Setrestros(data);
          
     });
     return unsubrestro;
   },[]);
   const FilterRestro = (str)=> {
      SetFrestros(restros.filter((item)=>
            item.MealType.toLowerCase().includes(str.toLowerCase())
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
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Drinks")}} >Drink</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Dinner")}} >Dinner</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Snacks")}} >Snacks</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Breakfast")}} >Breakfast</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Lunch")}} >Lunch</button>
   <button className="bg-green-500 p-2 text-white w-28" onClick={()=> {FilterRestro("Night Life")}} >Night Life</button>
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
            <button className="bg-red-500 p-2 text-white"><Link to={'/FoodsList/'}>Find Food</Link></button>
            
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