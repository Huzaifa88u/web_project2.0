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
            
            {/* Body Started */}
            <div class="container m-0 p-0" style={{maxWidth: "100%"}}>
                
                <div class="m-0 d-flex flex-sm-column flex-md-row flex-nowrap mx-md-5">
                    
                    <RightContentArea/>
                </div>
            </div>
        </div>
    );
}
export default PakWheels;