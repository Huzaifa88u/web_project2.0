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
                <br/>
                {adContent.map((ac)=>(
                    <AdCard 
                        title={ac["title"]} 
                        content={ac["content"].slice(0,30)} 
                        time={ac["time"]}
                    />
                    )
                )}
                <hr/>
            </div>

    )
}

export default RightContentArea