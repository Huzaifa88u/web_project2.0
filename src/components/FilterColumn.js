import React from 'react';
import AccodionCard from "./AccordionCard";

const sidebarArray = [["TRUSTED CARS",["PakWheels Inspected ", " PakWheels Certified","Suzuki Certified Cars", "Auction Sheet Verified", "Managed by PakWheels"]],
                    ["Price Range","to"], 
                    ["YEAR","to"], 
                    ["MAKE",["Toyota", "Suzuki", "Honda", "Daihatsu", "Nissan"]], 
                    ["PROVINCE", ["Punjab", "Sindh", "KPK", "Balochistan","Azad Kashmir", " Federally Administered Tribal Areas"]], 
                    ["CITY", ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Peshawar"]], 
                    ["Registered In", ["Sindh", "Punjab", "Lahore", "Karachi", "Islamabad"]], 
                    ["Mileage", "to"], 
                    ["Transmission", ["Automatic", "Manual"]],
                    ["Engine Type", ["Petrol", "Hybrid", "Diesel", "CNG", "Electric"]],
                    ["Assembly",["Local", "Imported"]],
                    ["Engine Capacity","to"], 
                    ["Color",["White", "Black", "Silver", "Grey", "Red", "Blue"]], 
                    ["Body Type", ["Sedan", "Hatchback", "SUV", "Crossover", "Truck", "Off-Roader"]], 
                    ["Model Category", ["Family", "Big", "Small","Old","Low Priced"]], 
                    ["Picture Availability", ["With Pictures"]],
                    ["Video Availability", ["With Video"]],
                    ["Seller Type", ["Indiviuals", "Dealers"]],
                    ["Ad Type",["Featured Ads"]]
                ]

const FilterColumn = () => {
    return(
        <div class="border border-black mt-5 mx-2 col-sm-12 col-md-3 p-0 bg-white">
                        <div class=" d-flex flex-column pb-5">
                            <div class="d-flex flex-column justify-content-center h-7vh bg-primary">
                                <p class="font-weight-bold m-0 text-white text-sm pl-3">SHOW RESULTS BY:</p>
                            </div>
                            <div class="dropdown-divider m-0"></div>
                            <div class="">
                                <div id="accordion">
                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            SEARCH BY KEYWORK
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            <form>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="e.g. Honda in Lahore" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                <div class="input-group-append">
                                                <button class="btn btn-outline-secondary" type="button">Go</button>
                                                </div>
                                            </div>
                                            </form>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    sidebarArray.map((item)=>(<AccodionCard title={item[0]} subHeadings={item[1]} />))
                                }
                            </div>
                        </div>
                    </div>
    )
}

export default FilterColumn;