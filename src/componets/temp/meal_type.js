import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import fb from '../../firebase';
const DB =fb.firestore();
const meal_type_list = DB.collection('meal_type');

const Mealtypelist = () => {
    const[meals, Setmeals] = useState([]);
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
    return(
        <div>

<section class="text-gray-600 body-font"> 
  <div class="container px-5 py-24 mx-auto">
  <div class="flex flex-wrap w-full mb-2 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Quick Searches</h1>
      <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Discover restaurants by type of meal</p>
    </div>
    <div class="flex flex-wrap -m-4">

    {meals.map(meal=> (
                    
    <div class="p-4 md:w-1/3" key={meal.id}>
    <div class="flex flex-col justify-center">
        <div
            class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div class="w-1/2 bg-white grid place-items-center">
            {meal.Img
                ?<>
                    <img src={meal.Img} alt={meal.Name} className="h-full" />
                </>
                :null
            }
            </div>
            <div class="w-1/2 bg-white space-y-2 p-2">
                <h3 class="font-black text-gray-800 md:text-2xl text-xl">{meal.Name}</h3>
                <button className="px-2 bg-red-300 text-white" >
                    <Link to={"/Restros/"+meal.Name}>Order Now</Link>
                </button>
                <p class="md:text-lg text-gray-500 text-base">Start your day with exclusive {meal.Name} options</p>
            </div>
        </div>
    </div>
    </div>
    ))}    
    </div>

  </div>
</section>
        </div>
    );
};

export default Mealtypelist;