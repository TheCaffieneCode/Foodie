import React, {useState, useEffect} from "react";
import fb from "./firebase";

import AdminPage from "./componets/pages/adminpage";
import Homepage from "./componets/pages/homepage";
import Signinpage from "./componets/pages/signInpage";
import UserAc from "./componets/pages/useraccount";
import Restrolist from "./componets/temp/restros";
import FoodsByRestro from "./componets/temp/foods_in_restro";
import SearchResult from "./componets/pages/searchResult";


import Footer from "./componets/temp/footer";
import ContactPage from "./componets/pages/contactpage";
import Cart from "./componets/pages/cartpage";


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
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
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route path="/Restros/:Meal" element={<Restrolist/>}/>
          <Route path="/FoodsList/:Restro" element={<FoodsByRestro/>}/>
          <Route path="/search/:Query" element={<SearchResult/>}/>
          <Route path="/Cart/" element={<Cart/>}/>
          {
            user ?
            <>  
              <Route  path="/Signin/" element={<UserAc/>}/>
              <Route  path="/Account/" element={<UserAc/>}/>
                
            </>
            : 
            <> 
              <Route  path="/Signin/" element={<Signinpage/>}/>
              <Route  path="/Account/" element={<Signinpage/>}/>
            </>
          }
          <Route  path="/Contact/" element={<ContactPage/>}/>
          <Route  path="/Admin/" element={<AdminPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    );
};
export default App;
