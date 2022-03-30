import react,{useEffect, useState} from 'react'
import fb from '../../firebase';

import Navbar from '../temp/navbar';
const DB =fb.firestore();
const UserAc=()=>{
    const signout =()=>{
        fb.auth().signOut();
    };
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
        <div>
            <Navbar/>
            {user ? (
                <>
                <img src={user.photoURL} alt={user.displayName}/>
                <p>{user.displayName}</p>
                <button onClick={signout}>sign out</button>
                </>
            )
            : null
            }
            <h1>
                welcome to user profile page
                
            </h1>
        </div>
    );
};
export default UserAc;