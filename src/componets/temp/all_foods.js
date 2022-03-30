import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import fb from '../../firebase';
const DB =fb.firestore();

const foods_list = DB.collection('foods');

const AllFoodlist = () => {
    const[foods, Setfood] = useState([]);
    useEffect(() =>{
        const unsubscribe = foods_list.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            Setfood(data);
          });
          return unsubscribe;
    }, []);
    return(
        <div>
            
            {foods.map(food=> (
                <div key={food.id}>
                    <p>Title: {food.Name}</p>
                    {food.Img
                        ?<>
                            <img src={food.Img} alt={food.Name} />
                        </>
                        :null
                    }
                    
                </div>
            ))}

        </div>
    );
};

export default AllFoodlist;