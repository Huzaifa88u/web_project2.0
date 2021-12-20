import React from "react";
import "./styless.css";

export default function FriendCard(){
    const adstuff=[
        {
            name:"Huzaifa Shahzad Khan",
            email: "huzaifa88u@gmail.com",
        },
        {
            name:"Mirza Haad Baig",
            email: "haadbaig@gmail.com",
        }  
    ]
    return (
        
               
              <div class="h-100 p-4 border border-black mx-2 d-inline-block col-sm-12 col-md-9 bg-light">
                    
                    {/* start of cards */}
                    {
                        adstuff.map(
                     (ad)=>{ 
                    return (<div class="shadow p-3 mb-5 bg-white rounded col-12 p-1 pt-5 bg-light">
                      
                      <div class="d-flex flex-row col-12">
                          <div class="col-4 m-2">
                              <img class="img_style" src="https://cache4.pakwheels.com/ad_pictures/5789/Slide_honda-civic-oriel-1-8-i-vtec-cvt-2018-57896101.jpg"/>
                          </div>
                           <div class=" p-1 col-5">
                              <p class="text-primary font-weight-bold">{ad.name}</p>
                              <p>{ad.email}</p>
                        </div>
                          <div class="p-1 col-3">
                            <button class="btn-success">Remove Friend</button>
                        </div>
                      </div>  

                    </div>
                    )
                    }
                    )
                        
                }
                                        
                    {/* End of card */}
                    <hr/>
         </div>
             
    
    )
};