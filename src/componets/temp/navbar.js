import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import fb from "../../firebase";

const Navbar=()=>{
    const[user, setuser] = useState(()=>
        fb.auth().currentUser
    )
    useEffect(()=>{
        const unsub = fb.auth().onAuthStateChanged(user=>{
            if(user) {
                setuser(user);
            }else {
                setuser(false);
            }
        });
        return unsub;
    },[]);
    return(
        <header class="text-gray-600 body-font bg-red-600">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span class="logo p-2 text-xl">foodie</span>
    </a>
    <nav class="text-white font-bold md:ml-auto flex flex-wrap items-center text-lg justify-center">
       <Link to={"/"} className="mr-5 hover:text-gray-900">Home</Link>
      <Link to={"/Contact/"} className="mr-5 hover:text-gray-900">Contact</Link>
      <Link to={"/Contact/"} className="mr-5 hover:text-gray-900">About</Link>
      <Link to={"/Cart/"} className="mr-5 hover:text-gray-900">Cart</Link>
      {
        user ?
        <>  
            <Link to={"/Account/"}>
                <p className="text-white">{user.displayName}</p>
            </Link>
        </>
        : 
        <> 
            <Link to={"/Signin/"} className="mr-5 hover:text-gray-900">Sign In</Link>
        </>
    }
    </nav>
    
  </div>
</header>
    );
};
export default Navbar;