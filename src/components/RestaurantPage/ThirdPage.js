import { useEffect, useState } from "react";
import PageHeader from "../PageHeader"
import { useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

function RestaurantPage() {
    
    const Swal = require('sweetalert2')

    let getTokenDetails = () => {
        //reading token data from local storage
        let gettoken = localStorage.getItem('token_key')
        console.log(gettoken)
        if (gettoken === null) {
            return false //means user is not logedin.
        } else {
            return jwtDecode(gettoken); // means user is loged in
        }
    }

    let [userDetails, set_userDetails] = useState(getTokenDetails(), []);


    //onclick useState
    let [tab, setTab] = useState(1);

    //restaurant axios by rest id
    let dumyDefaultObj = {

        aggregate_rating: 0,
        city: "",
        city_id: 0,
        contact_number: 0,
        cuisine: [],
        cuisine_id: [],
        image: "assets/breakfast.png",
        locality: "",
        location_id: 0,
        mealtype_id: 0,
        min_price: 0,
        name: "",
        rating_text: "",
        thumb: [],
        _id: ""
    }
    let [restVar, setRestau] = useState({ ...dumyDefaultObj });

    let { restaurant_id } = useParams(); //same as used in App.js

    let getRestaurantDetails = async () => {
        try {
            let URL = "https://shamikachalse-zomatobackend.onrender.com/restaurant_api-by-restaid/" + restaurant_id;
            let { data } = await axios.get(URL);
            // console.log(data)
            setRestau(data);
        } catch (error) {
            console.log(error)
            alert("Server side error in rest details")
        }
    }


    //get meal items data 
    let [mealItemsVar, setMealItems] = useState([]);

    let getMealItems = async () => {
        try {
            let URL = "https://shamikachalse-zomatobackend.onrender.com/menuItems_By_restaurantID_api/" + restaurant_id;
            let { data } = await axios.get(URL);
            // console.log(data)
            // console.log(data[0].min_price)
            setMealItems(data)
            setTotalPrice(0);
        } catch (error) {
            console.log(error)
            alert("Server side error in menu items ")
        }
    }

    //Total Quantity Price
    let [totalPrice, setTotalPrice] = useState(0);
    let addItemQuantity = (index) => {
        // console.log(index);
        // console.log(mealItemsVar[index].price)
        let menuItems1 = [...mealItemsVar]//recreating the arry to set the quantity
        mealItemsVar[index].qty += 1
        let newPrice = mealItemsVar[index].price
        setTotalPrice(totalPrice + newPrice);
        setMealItems(menuItems1) //updating menu items state

    }
    let minusItemQuantity = (index) => {
        // console.log(index);
        // console.log(mealItemsVar[index].price)
        let menuItems1 = [...mealItemsVar]//recreating the arry to set the quantity
        mealItemsVar[index].qty -= 1
        let newPrice = mealItemsVar[index].price
        setTotalPrice(totalPrice - newPrice);
        setMealItems(menuItems1) //updating menu items state

    }

    //razor pay display code

    let loadScript = async () => {

        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => {
            return true;
        }
        script.error = () => {
            return false;
        }
        window.document.body.appendChild(script);
    }

    let displayRazorPay = async () => {

        // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        let Is_loadscript_Loaded = await loadScript();

        if (Is_loadscript_Loaded === false) { //same as ,  Is_loadscript_Loaded === false
            alert("sdk is not loaded")
        }

        var serverData = {
            amount : totalPrice
        }
        var { data } = await axios.post("https://shamikachalse-zomatobackend.onrender.com/razorPayOrderId",serverData)
        console.log(data)
        // console.log(data.amount)
        // console.log(data.currency)
        // console.log(data.id)
        var options = {
            "key": "rzp_test_H7D3UtNdUhJaxp", // Enter the Key ID generated from the Dashboard
            "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": data.currency,//indian currency
            "name": "Zomato Cone Payment",
            "description": "Buying product from zomato clone",
            "image": "https://example.com/your_logo",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) { //these 3 things we are going to submit to the server
                var sendData = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                }
                try {
                    console.log(response);
                    console.log(response.razorpay_payment_id);
                    console.log(response.razorpay_order_id);
                    console.log(response.razorpay_signature);

                    let { result } = await axios.post(
                        "https://shamikachalse-zomatobackend.onrender.com/verifyPayment",
                        sendData
                    )
                    console.log(result);
                    // alert("Order Placed Successfully!")
                    // window.location.replace("/")
                    Swal.fire({
                        icon: 'success',
                        position: 'top-center',
                        title: 'Order Placed Successfully!',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(
                        (value) => {
                            window.location.replace("/")
                        }
                    )

                } catch (error) {
                    console.log("Error : " + error)
                }

            },
            "prefill": {
                "name": userDetails.name,
                "email": userDetails.email,
                "contact": "9000090000"
            }

        };
        var razorPayObject = window.Razorpay(options);
        razorPayObject.open();
    }

    useEffect(
        () => {
            getMealItems()
            getRestaurantDetails()
        }, []
    )




    return (<>
        {/* Model Code */}
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                    <div className="p-3">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalToggleLabel ">{restVar.name}</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column">

                            {
                                mealItemsVar.map(
                                    (value, index) => {
                                        return (<>
                                            <div className="d-flex" key={index.id} >
                                                <div className=" DivMragin">
                                                    <p className="m-0 fontClass ">{mealItemsVar[index].name}</p>
                                                    <p className="m-0 fontClass ">{mealItemsVar[index].price}</p>
                                                    <p className="m-0 text-muted textSize">{mealItemsVar[index].description}</p>
                                                </div>
                                                <div className=" d-flex flex-column align-items-center">
                                                    <img src={"/images/" + mealItemsVar[index].image} alt="breakfastImg" className="mealItemImg" />
                                                    {
                                                        mealItemsVar[index].qty === 0 ? (
                                                            <div className="border bordre-0 addBoxClass add d-flex justify-content-center">
                                                                <button className="btn p-0 mx-2" onClick={() => addItemQuantity(index)} >ADD</button>
                                                            </div>
                                                        ) : (
                                                            <div className="border bordre-0 addBoxClass add d-flex justify-content-center">
                                                                <button className="btn p-0 mx-2" onClick={() => minusItemQuantity(index)}>-</button>
                                                                <button className="btn p-0 mx-2">{mealItemsVar[index].qty}</button>
                                                                <button className="btn p-0 mx-2" onClick={() => addItemQuantity(index)}>+</button>
                                                            </div>
                                                        )
                                                    }


                                                </div>
                                            </div>
                                            <hr />
                                        </>

                                        )
                                    }
                                )
                            }


                        </div>
                    </div>
                    {
                        (totalPrice > 0) ? (
                            <div className="modal-footer d-flex justify-content-between footerColor">
                                <div className="d-flex ">
                                    <h5 className="m-0">Subtotal</h5>
                                    <h5 className="mx-5">{totalPrice}</h5>
                                </div>
                                <button className="btn btn-danger px-4" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                                    Next</button>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel2">{restVar.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="NavyBlue">
                            <div className="form-group">
                                <label htmlFor="InputName">Name</label>
                                <input value={userDetails.name} readOnly={true} onChange={() => { }} type="text" className="form-control" id="InputName" placeholder="Enter your name" />
                                {/* in react if we are using value it is cumpulsary  to use onChange */}
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="InputNo">Enter your email</label>
                                <input type="email" value={userDetails.email} readOnly={true} onChange={() => { }} className="form-control" id="InputNo" placeholder="Enter mobile number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputAddress">Enter your address</label>
                                <textarea  onChange={() => { }} className="form-control" id="InputAddress" rows="3"></textarea>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button className="btn  btn-danger" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Go Back </button>
                        <button className="btn btn-success" onClick={displayRazorPay} >Pay Now</button>
                    </div>
                </div>
            </div>
        </div>
        {/* <a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}
        {/* main code  */}

        <main className="container-fluid">
            <PageHeader ColorHeaderProp="bg-danger" />
            <section className="row ">
                <div className="col-12">
                    <div className="container my-5 NavyBlue">
                        <div className=" d-flex flex-column justify-content-end">
                            <img src={"/images/" + restVar.image} alt="breakfastImg" className="ThirdPgImg" />
                            <div className="d-flex justify-content-end ">
                                <button className="btn btn-light buttonSize m-3 NavyBlue ">Click to see Image Gallery</button>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="my-4">{restVar.name}</h3>
                            <div className="d-flex  justify-content-end">
                                {
                                    userDetails ? (
                                        <button
                                            className="btn btn-danger text-white"
                                            data-bs-toggle="modal"
                                            href="#exampleModalToggle"
                                            // role="button"
                                            onClick={getMealItems}
                                        >
                                            Place Online Order
                                        </button>
                                    ) : <button className="btn btn-danger text-white disabled">Login To Place Order</button>
                                }

                            </div>

                            <span className="fontClass handCurrsor" onClick={() => setTab(1)}>Overview</span>
                            <span className="fontClass mx-5 handCurrsor" onClick={() => setTab(2)}>Contact</span>
                            <hr className="  hrHeight" />
                            {/* <section>
                                <h4 className="my-4">About this place</h4>

                                <p className="m-0 fontClass">Cuisine</p>
                                <p className="m-0 mb-4">Bakery, Fast-food</p>

                                <p className="m-0 fontClass">Average Cost</p>
                                <p className="m-0">₹700 for two people (approx.)</p>

                            </section> */}
                            {/* so that only one will get return at a time from bellow */}
                            {
                                (tab === 1) ? (
                                    <section>
                                        <h4 className="my-4">About this place</h4>

                                        <p className="m-0 fontClass">Cuisine</p>
                                        <p className="m-0 mb-4">
                                            {
                                                (restVar.cuisine.length > 0) ?
                                                    (
                                                        restVar.cuisine.reduce(function joinString(previousValue, currentValue) {
                                                            return (previousValue.name + " , " + currentValue.name)
                                                        })
                                                    ) : null
                                                // restVar.cuisine[0].name
                                            }
                                        </p>

                                        <p className="m-0 fontClass">Average Cost</p>
                                        <p className="m-0">₹{restVar.min_price} for two people (approx.)</p>
                                    </section>
                                ) : (
                                    <section>
                                        <h4 className="my-4">Contact</h4>
                                        <p className="m-0 fontClass">Phone Number</p>
                                        <p className="m-0 mb-4 text-danger">+{restVar.contact_number}</p>

                                        <p className="m-0 fontClass">{restVar.name}</p>
                                        <p className="m-0 text-muted">{restVar.locality},{restVar.city}</p>
                                    </section>
                                )

                            }
                        </div>
                    </div>
                </div>

            </section>
        </main >
    </>
    )
}

export default RestaurantPage