import axios from 'axios';
import React from 'react';

const AdCard = ({title, location, info, updatedTime, price}) => {
   const getblog=async(e)=>{
        e.preventDefault();
        const token = await axios
      .get("http://localhost:3000/auth/getblogs")
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
   }


    return(
        <div class="shadow p-3 mb-5 bg-white rounded col-12 bg-light">
                    <div class="d-flex flex-sm-column flex-md-row col-12 w-100 p-0 m-0 ">
                        
                        
                      
                    </div>   
                  </div>
    )
}

export default AdCard;