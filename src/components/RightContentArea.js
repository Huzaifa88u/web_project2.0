import React from 'react';
import AdCard from './AdCard';

const adContent=[
    {
        title:"Honda Civic 2019 Oriel i-VTEC CVT for Sale",
        location: "Islamabad",
        info: "2019 | 40,000km | Petrol | 1800cc | automatic",
        updatedTime: "updated 9 minutes ago",
        price: "PKR 37.5 lacs"
    },
    {
        title:"Honda Civic 2019 Oriel i-VTEC CVT for Sale",
        location: "Islamabad",
        info: "2019 | 40,000km | Petrol | 1800cc | automatic",
        updatedTime: "updated 9 minutes ago",
        price: "PKR 37.5 lacs"
    },
    {
        title:"Honda Civic 2019 Oriel i-VTEC CVT for Sale",
        location: "Islamabad",
        info: "2019 | 40,000km | Petrol | 1800cc | automatic",
        updatedTime: "updated 9 minutes ago",
        price: "PKR 37.5 lacs"
    },
    {
        title:"Honda Civic 2019 Oriel i-VTEC CVT for Sale",
        location: "Islamabad",
        info: "2019 | 40,000km | Petrol | 1800cc | automatic",
        updatedTime: "updated 9 minutes ago",
        price: "PKR 37.5 lacs"
    },

]

const RightContentArea = () => {
    return(
        <div class="h-100 p-4 border border-black mt-5 d-inline-block col-sm-12 col-md-9 bg-light">
                <div class="px-3 d-flex flex-row col-12 justify-content-md-between align-items-center bg-white py-2">
                    <div class="btn-group col-7 ">
                        <p>Sort By:</p>
                          <button type="button" class="ml-2 rounded btn btn-sm dropdown-toggle text-start" style={{flex:0, border: "0.5px solid rgb(185, 184, 184)"}} data-bs-toggle="dropdown">
                              Updated Date:Recent First
                          </button>
                    </div>
                    <div class="p-0 m-0 col-5 d-flex flex-row justify-content-end">
                      <i class="list icon"></i>
                      <i class="table icon"></i>
                    </div>
                </div>
                <br/>
                {adContent.map((ac)=>(
                    <AdCard 
                        title={ac["title"]} 
                        location={ac["location"]} 
                        info={ac["info"]} 
                        updatedTime={ac["updatedTime"]} 
                        price={ac["price"]} 
                    />
                    )
                )}
                <hr/>
            </div>

    )
}

export default RightContentArea