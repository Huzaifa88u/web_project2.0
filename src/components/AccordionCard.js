import React from 'react';

const AccodionCard = ({title, subHeadings}) => {
    return(
        <div class="card rounded-0">
                        <div class="card-header" id={"headingOne"}>
                          <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target={"#"+title.replace( /\s/g, '')} aria-expanded="false" aria-controls="collapseOne">
                              {title.toString().toUpperCase()}
                            </button>
                          </h5>
                        </div>
                        <div id={title.replace( /\s/g, '')} class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                          <div class="card-body">
                            {subHeadings !== "to" ? subHeadings.map((sh)=>(
                                <div class="d-flex flex-row p-0 m-0">
                                    <input class="form-check-input col-3" type="checkbox" value="Fixed price project" id="flexCheckDisabled" />
                                    <div class="col-1"></div>
                                    <label class="form-check-label col-8 p-0 m-0 pl-4" style={{fontSize: "small"}} for="flexCheckCheckedDisabled">
                                        {sh}
                                    </label>
                                </div>
                            )) :
                            <div class="form-inline">
                                <input 
                                    type="text" 
                                    name="to" 
                                    placeholder="" 
                                    class="form-control col-5"
                                    style={{ borderRadius:"0px"}}
                                />
                                <input 
                                    type="text" 
                                    name="from" 
                                    placeholder="" 
                                    class="form-control col-5 border-start"
                                    style={{borderLeft:"1px solid grey !important", borderRadius:"0px"}}
                                    
                                />
                                <div class="p-0 col-2">
                                    <button class="btn btn-primary border-start-1 w-100" style={{borderRadius:"0px"}} type="button">Go</button>
                                </div>
                            </div>
                            }
                          </div>
                        </div>
                      </div>
    )
}

export default AccodionCard;