import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Navbar from "../temp/navbar";

import fb from "../../firebase";
const DB =fb.firestore();
const cart_list = DB.collection('Cart');

const Cart=()=>{
    const[cart, setCart] =useState([]);
    useEffect(()=>{
        const unsubrestro = cart_list.onSnapshot((snapshot) => {
           const data = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setCart(data);
       });
       return unsubrestro;
     },[]);
     const Deleteitem= (id)=> {
        cart_list.doc(id).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };
    return(
        <>
        <Navbar/>
<div class="max-w-2xl mx-auto">
	<div class="flex flex-col">
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Name
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                quantity
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Price
                            </th>
                            <th scope="col" class="p-4">
                                <span class="sr-only">Remove</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {cart.map(item=> (
                        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" key={item.id}>
                            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.Name}</td>
                            <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{item.quantity}</td>
                            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.Price}</td>
                            <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                               
                                <button onClick={()=> {Deleteitem(item.id)}} 
                                class="text-blue-600 dark:text-blue-500 hover:underline"
                                >Remove</button>
                            </td>
                        </tr>
                    ))}  
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div>
        </>
    );
};
export default Cart;

