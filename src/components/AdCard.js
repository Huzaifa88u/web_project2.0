import React from 'react';

const AdCard = ({title, location, info, updatedTime, price}) => {
    return(
        <div class="shadow p-3 mb-5 bg-white rounded col-12 bg-light">
                    <div class="d-flex flex-sm-column flex-md-row col-12 w-100 p-0 m-0 ">
                        <div class="justify-content-md-between justify-content-sm-center mr-5 col-md-1 col-sm-12 p-0">
                            <img class="img_style" height="auto" width="auto" src="https://cache4.pakwheels.com/ad_pictures/5789/Slide_honda-civic-oriel-1-8-i-vtec-cvt-2018-57896101.jpg"/>
                        </div>
                         <div class="col-md-6 col-sm-12" style={{paddingLeft: "5rem"}}>
                            <p class="text-primary font-weight-bold">{title}</p>
                            <p>{location}</p>
                            <p>{info}</p>
                            <p>{updatedTime}</p>    
                        </div>
                        <div class="col-md-4 col-sm-12 d-flex flex-column align-items-end justify-content-between">
                          <h5 style={{fontWeight:"bolder"}}>{price}</h5>
                          <div>
                            <button className="btn border border-1 rounded-0 bg-light mr-2">
                                <i class="heart icon"></i>
                            </button>
                            <button class="btn btn-success rounded-0">
                                <i class="phone square icon" style={{fontSize:"19px"}}></i>
                                Show Phone No.
                            </button>
                          </div>
                      </div>
                    </div>   
                  </div>
    )
}

export default AdCard;