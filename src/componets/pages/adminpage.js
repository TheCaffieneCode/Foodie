import React from "react";
import CreateMealType from "../admin/create_meal_type";
import CreateRestro from "../admin/create_restro";
import CreateFood from "../admin/create_food";

import Navbar from "../temp/navbar";

const AdminPage=()=>{
    return(
        <div>
            <Navbar/>
            <div>
                <h1>Create Foods</h1>
                <CreateFood/>
                <br/>
            </div>
            <div>
                <h1>Create Meal Type</h1>
                <CreateMealType/>
                <br/>
            </div>
            <div>
                <h1>Create Restro</h1>
                <CreateRestro/>
                <br/>
            </div>
        </div>
    );
};

export default AdminPage;