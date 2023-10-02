// import { useState } from "react"
import axios from 'axios'
import { useEffect, useState } from 'react';
import PageHeader from '../PageHeader'
function WalpaperPage() {

    // let selectedLocationOnInput = useRef(); //gives an element reference.
    let [location_list, set_locationlist] = useState([])
    let [disabled, setDisabled] = useState(true);

    // let getLocationId = (event)=>{
    //     // console.log(event.target.value) // ths event has a property called
    //     let value = event.target.value;
    //     if(value!=""){
    //         setDisabled(false);
    //     }
    //     else{
    //         setDisabled(true);
    //     }
    // }

    let getLocationId = async (event) => {
        console.log(event.target.value) // ths event has a property called
        let value = event.target.value;
        if(value!==""){
            try {
                let url = `http://localhost:2000/restaurant_api-by-locid/${value}`;
                let response = await axios.get(url);
                console.log(response.data.length)
                if(response.data.length === 0){
                    setDisabled(true)
                }
                else{
                    setDisabled(false)
                }
            } catch (error) {
                console.log(error)
                alert("Server side error in loc!")
            }
        }
    }

    let getQuickSearch_LocationList = async () => {
        try {
            let response = await axios.get("http://localhost:2000/location_api");
            console.log("result = ", response.data)
            set_locationlist(response.data)
        } catch (error) {
            console.log(error)
            alert("Server side error in loc!")
        }
    }

    useEffect(() => {
        getQuickSearch_LocationList();
    }, []);
    return (<>
        <section className="row  bagImg align-content-start">
            
            <header className="col-12  ">
            <PageHeader ColorHeaderProp="" />
                {/* <div className="container  d-lg-flex justify-content-end d-none">
                    <button className="btn text-white me-2" >Login</button>
                    <button className="btn btn-outline-light" >Create an account</button>
                </div> */}
            </header>

            <section className="col-12 d-flex justify-content-center align-items-center flex-column">

                <p className="Logo h1 bg-white text-danger fw-bold d-flex justify-content-center align-items-center my-lg-4 ">e!</p>
                <p className="h1  text-white my-3 text-center text1"> Find the best restaurants, cafés, and bars</p>



                <div className="row  card d-flex flex-lg-row bg-transparent border border-0  p-2 size">
                    <div className="col-5 search0 ">
                        {/* <select ref={selectedLocationOnInput} onChange={getLocationId} name="" id="" className="form-select " > */}
                        <select onChange={getLocationId} name="" id="" className="form-select " >
                            <option className="search1 dropbox text-muted " value="">Please select a location</option>
                            {
                                location_list.map(
                                    (value, index) => {
                                        return (
                                            <option key={index} className=" text-muted " value={value.location_id}> {value.name} , {value.city}</option>
                                        )
                                    }
                                )

                            }

                        </select>
                    </div>
                    <div className="col-7 search0 ">
                        <div className="input-group ">
                            <span className="input-group-text bg-white border border-0">
                                <i className="fa fa-search  text-muted" aria-hidden="true"></i>
                            </span>
                            <input disabled={disabled} type="text" className="form-control border border-0 py-2 px-3" placeholder="Search for a location" />

                        </div>
                        {/* <ul className="list-unstyled p-0 bg-white mt-2  dropbox search1">
                            <li className=" text-muted search1_1  d-flex ">
                                <img src="./assets/images/breakfast.png" alt="" className="m-2 img1  mt-2" />
                                <div className="m-2 ">
                                    <p className="NavyBlue fw-bold  m-0">The Big Chill Cakery</p>
                                    <p className="text-muted  m-0 subtext">Sarjapur Road, Bengaluru</p>
                                </div>
                            </li>
                            <li className=" text-muted search1_1  d-flex ">
                                <img src="./images/idli.png" alt="" className="m-2 img1 mt-2" />
                                <div className="m-2">
                                    <p className="NavyBlue fw-bold   m-0">Punjabi Rasoi</p>
                                    <p className="text-muted m-0 subtext">Sarjapur Road, Bengaluru</p>
                                </div>
                            </li>
                            <li className=" text-muted search1_1  d-flex ">
                                <img src="./images/idli.png" alt="" className="m-2 img1 mt-2" />
                                <div className="m-2">
                                    <p className="NavyBlue fw-bold  m-0 ">Punjabi Rasoi</p>
                                    <p className="text-muted m-0 subtext">Sarjapur Road, Bengaluru</p>
                                </div>
                            </li>
                        </ul> */}
                    </div>

                </div>
            </section>
        </section>
    </>
    )
}

export default WalpaperPage