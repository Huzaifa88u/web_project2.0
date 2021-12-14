import Header from "./components/header"
import Navbar from "./components/Navbar"
import React from 'react';
import FilterColumn from "./components/FilterColumn";
import RightContentArea from "./components/RightContentArea";



const PakWheels =( )=> {
    return(
        <div style={{flex:"1"}} className="d-flex flex-column">
            <Header />
            <hr class="p-0 m-0"/>
            <Navbar />
            {/* Body Started */}
            <div class="container m-0 p-0" style={{maxWidth: "100%"}}>
                <div className="mx-5 mt-5">
                <h1 class="pl-2" style={{color: "rgb(36, 36, 66)", fontWeight: "800"}}>Used Cars For Sale In Pakistan (114150)</h1>
                <p class="pl-2" style={{color: "rgb(149, 150, 150)"}}>Home / Used Cars / Used Cars For Sale In Pakistan</p>
                </div>
                <div class="m-0 d-flex flex-sm-column flex-md-row flex-nowrap mx-md-5">
                    <FilterColumn/>
                    <RightContentArea/>
                </div>
            </div>
        </div>
    );
}
export default PakWheels;