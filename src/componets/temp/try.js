import fb from '../../firebase';
const DB =fb.firestore();
const restro_list = DB.collection('restros');
const[restros, Setrestros] = useState([]);

useEffect(()=>{
    const unsubrestro = restro_list.orderByChild('MealType').on('value', snapshot => {
       snapshot.forEach(docu => {
          const data = docu.docs.forEach(doc => ({
             ...doc.val(),
             id: doc.id,
           }));
           Setrestros(data);
        });
   });
   return unsubrestro;
 },[]);

 .onSnapshot((snapshot) => {
    const data = snapshot.docs.map(doc => ({
       ...doc.data(),
       id: doc.id,
     }));
     Setrestros(data);
     
});

.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        Setrestros(data);
    });
})
.catch((error) => {
    console.log("Error getting documents: ", error);
});


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

 useEffect(()=>{
    const unsubrestro = foods_list.onSnapshot((snapshot) => {
       const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        SetFoods(data);
   });
   return unsubrestro;
 },[]);