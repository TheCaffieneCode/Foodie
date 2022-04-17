import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import fb from "../../firebase";
import '../css/bgImg.css';
import Mealtypelist from "../temp/meal_type";
import SearchBox from "../temp/searchBox";

const Homepage=()=>{
    const[searchQuery, SetsearchQuery]= useState('Emptyquery');
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

    const Search=(event)=>{
    };
    return(
        <div>
            <div class="w-full bg-center bg-cover h-96 BgImg">
                <div class="flex items-center justify-center w-full h-full bg-red-900 bg-opacity-25">
                    <div class="text-center">
                        <div className="flex justify-between text-white text-2xl font-semibold">
                            <div><h1>FOODIE.COM</h1></div>
                            <div>
                            {
                                user ?
                                <>  
                                    <div className="flex">
                                        <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 mx-auto rounded-full " />
                                        <Link to={"/Account/"}>
                                            <p className="text-white">Hii, {user.displayName}</p>
                                        </Link>
                                    </div>
                                   
                                </>
                                : 
                                <> 
                                    <div className="bg-white text-red-500 px-2 py-1 rounded-none"><Link to={"/Signin/"}>Sign In</Link></div>
                                </>
                            }
                            </div>
                            
                        </div>
                        <div className="mb-8">
                            <h1 class="logo p-4 text-3xl lg:text-6xl">foodie</h1>
                        </div>
                        <h1 class="text-2xl font-bold text-white lg:text-4xl mb-8">Find the best restaurants, cafés, and bars</h1>
                        <div className="md:flex space-x-3">
                            <div>
                                <form  onSubmit={(event)=>{Search(event)}}>
                                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-4 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="0" selected disabled>Please type a location</option>
                                        <option value="1">Scheme no. 1</option>
                                        <option value="1">Lagpa</option>
                                        <option value="1">Kormangala,Bangalore</option>
                                        <option value="1">Bannerghata Road,Bangalore</option>
                                    </select>
                                </form>
                            </div>
                            <SearchBox/>
                        </div>
                    </div>
                </div>
            </div>
            <Mealtypelist/>
        </div>
    );
};

export default Homepage;