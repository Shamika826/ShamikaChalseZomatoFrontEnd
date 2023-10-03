import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

// let { locID, mealID, cuisineID, sortPrice, highCost, lowCost } = request.body
function SearchPageResultSec() {

    //navigate code
    let navigatePg = useNavigate()

    //params code
    let params = useParams();
    // console.log(params);
    let { meal_Id } = params
    // console.log(meal_Id)
    
    //To handle switch case will make filter accessable globally
    let [filter, setfilterGlobal] = useState({ mealID: meal_Id })

    //restaurant data code
    let [restList, setRestList] = useState([]);

    let filterOperations = async (filter) => {
        let URL = "https://shamikachalse-zomatobackend.onrender.com/restaurant_filterData"
        // let filter = {
        //     mealID: meal_Id
        // }
        // console.log("filter.mealId = " + filter.mealID)

        try {
            let { data } = await axios.post(URL, filter)
            // console.log(data)
            setRestList(data)

        } catch (error) {
            console.log(error)
            alert("Server side error in searchResultPg")
        }
    }
    // console.log("data = ", restList)

    // location of filter section code
    let [location_list, set_locationlist] = useState([])
    let getFilter_LocationList = async () => {
        try {
            let response = await axios.get("https://shamikachalse-zomatobackend.onrender.com/location_api");
            // console.log("result = ", response.data)
            set_locationlist(response.data)
        } catch (error) {
            console.log(error)
            alert("Server side error in loc!")
        }
    }



    //filteration location section seclected location should appear on R.H.S code:-

    let makeFilteration = (event, type) => {
        let value = event.target.value;
        // console.log("value1 = " + value)
        // let filter = {
        //     mealID: meal_Id //default value of filter
        // };
        let _filter = { ...filter };
        switch (type) {
            case "locID":
                if (value > 0) {
                    _filter['locID'] = value;
                } else {
                    delete _filter['locID'];//delete keyword
                }
                break;
            case "sortPrice": //sort logic of filter section:-
                _filter['sortPrice'] = value;
                break;
            case "cost-for-two":
                let a = value.split("-") // split method gives an array from string
                _filter['lowCost'] = a[0];
                _filter['highCost'] = a[1];
                break;
            // default 
        }
        console.log(_filter)
        setfilterGlobal({ ..._filter });
        filterOperations(_filter);
    }



    useEffect(
        () => {
            // console.log("filterOperations")
            // let filter = { --->commenting this because we have created the global logic
            //     mealID: meal_Id //default value of filter
            // };
            filterOperations(filter);
            getFilter_LocationList();
        }, []);


    return (<>
        <section className="row ">
            <div className="col-12 ">
                <div className="container">
                    <p className="m-0 h3 py-4 ">Breakfast Places in Mumbai</p>
                    <div className="row ">
                        <div className=" col-lg-3 col-md-4 col-12  border border-1 p-3">
                            <div className="d-flex justify-content-between">

                                <p className="fw-bold mb-2">Filters</p>
                                <button className="d-lg-none border border-sm-none " data-bs-toggle="collapse"
                                    data-bs-target="#filter-id" area-control="filter-id">
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </button>

                            </div>

                            <div className="collapse show" id="filter-id">
                                <p className="m-0">Select Location</p>

                                <select name="" id="" className="form-select" onChange={(event) => makeFilteration(event, 'locID')}>
                                    <option value="-1">Select Location</option>
                                    {
                                        location_list.map(
                                            (value, index) => {
                                                return (
                                                    <option key={index} value={value.location_id}> {value.name}  , {value.city}</option>
                                                )
                                            }
                                        )
                                    }
                                </select>
                                <p className="my-2  mt-4">Cuisine</p>
                                <div className="form-check">
                                    <input type="checkbox" className=" form-check-input" value="1" />
                                    <label htmlFor="" className="form-check-label">North Indian</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className=" form-check-input" value="2" />
                                    <label htmlFor="" className="form-check-label">South Indian</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className=" form-check-input" value="3" />
                                    <label htmlFor="" className="form-check-label">Chinise</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className=" form-check-input" value="4" />
                                    <label htmlFor="" className="form-check-label">Fast Food</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className=" form-check-input" value="5" />
                                    <label htmlFor="" className="form-check-label">Street Food</label>
                                </div>

                                <p className="my-2  mt-4">Cost For Two</p>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="costForTwo" value="500" onChange={(event) => makeFilteration(event, 'cost-for-two')} />
                                    <label htmlFor="" className="form-check-label">Less than ` 500</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="costForTwo" value="500-1000" onChange={(event) => makeFilteration(event, 'cost-for-two')} />
                                    <label htmlFor="" className="form-check-label">` 500 to ` 1000</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="costForTwo" value="1000-1500" onChange={(event) => makeFilteration(event, 'cost-for-two')} />
                                    <label htmlFor="" className="form-check-label">` 1000 to ` 1500</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="costForTwo" value="1500-2000" onChange={(event) => makeFilteration(event, 'cost-for-two')} />
                                    <label htmlFor="" className="form-check-label">` 1500 to ` 2000</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="costForTwo" value="2000-3000" onChange={(event) => makeFilteration(event, 'cost-for-two')} />
                                    <label htmlFor="" className="form-check-label">` 2000+</label>
                                </div>

                                <p className="my-2  mt-4 fw-bold">Sort</p>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="sort" value="1" onChange={(event) => makeFilteration(event, 'sortPrice')} />
                                    <label htmlFor="" className="form-check-label">Price low to high</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className=" form-check-input" name="sort" value="-1" onChange={(event) => makeFilteration(event, 'sortPrice')} />
                                    <label htmlFor="" className="form-check-label">Price high to low</label>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-lg-8 col-md-8 ms-lg-3 ms-md-3 mt-sm-3 mt-lg-0 mt-md-0  ">
                            <div className="row ">
                                {
                                    restList.map(
                                        (value, index) => {
                                            // console.log(value)
                                            return (
                                                <div key={index} className="col-12 border border-1 p-4 mt-3 " onClick={()=> navigatePg("/restaurant-page/"+value._id)}>

                                                    <div className="d-flex p-3 align-items-center ">

                                                        <img src={"/images/" + value.image} alt="idli" className="img2 h3" />
                                                        <div className="ms-3 ">
                                                            <p className="m-0 h4 p-1">{value.name}</p>
                                                            <p className="m-0 fw-bold h6 ms-1 p-1">{value.city}</p>
                                                            <p className="m-0 h6 text-muted p-1">
                                                                <i className="fa fa-map-marker me-1 fa2x" aria-hidden="true"></i>
                                                                {value.locality}, {value.city} …
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <hr />


                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 col-6">
                                                            <p>CUISINES:</p>
                                                            <p>COST FOR TWO:</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="fw-bold">{value.cuisine[index].name}</p>
                                                            <p className="fw-bold">{
                                                                value.cuisine.reduce(function joinString(previousValue, currentValue) {
                                                                    return (previousValue.name + " , " + currentValue.name)
                                                                })
                                                            }
                                                            </p>

                                                            <p className="fw-bold"><i className="fa fa-inr me-1" aria-hidden="true"></i>{value.min_price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            <div className="row my-4">
                                <ul className="pagination d-flex justify-content-center">
                                    {/* <li className="page-item"> <a href="#">&lt;</a> </li> */}
                                    <li className="page-item">
                                        <i className="fa fa-chevron-left" daria-hidden="true"></i>
                                    </li>
                                    <li className="page-item">1</li>
                                    <li className="page-item">2</li>
                                    <li className="page-item">3</li>
                                    <li className="page-item">4</li>
                                    <li className="page-item">5</li>
                                    <li className="page-item">
                                        <i className="fa fa-chevron-right" daria-hidden="true"></i>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>


            </div>

        </section>
    </>
    )
}

export default SearchPageResultSec