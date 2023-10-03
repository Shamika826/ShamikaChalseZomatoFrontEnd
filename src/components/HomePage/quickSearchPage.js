import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function QuickSearchPage() {

    let navigate = useNavigate()

    let getSecondPg =  (Id)=>{
        // navigate("/search-page")
        navigate(`/search-page/${Id}`)
    }   
    let [mealtype_list, set_mealtype_list] = useState([])


    let getQuickSearch_MealTypes = async () => {
        try{
            let response = await axios.get("https://shamikachalse-zomatobackend.onrender.com/mealTypes_api")
    
            let mealTypedata = response.data

            set_mealtype_list(mealTypedata)
          
        }catch(error){
            console.log(error)
            alert("Server side error in rest!")
        }
    }

    useEffect(
        () => {
            console.log("useeffect code")
            getQuickSearch_MealTypes()
        },
        []
    )
    // console.log("upadted mealtype_list = ", mealtype_list);
    // let arr = [1, 2, 3, 4]
    return (<>
        {console.log("jsx code")}
        <section className="row justify-content-center mt-4">
            <section className="col-10   ">
                <h3 className="fw-bold NavyBlue">Quick Search</h3>
                <p className="text-muted">Discover restaurants by type of meal</p>
            </section>
            <section className="col-10   ">
                <section className="row  py-2 ">
                    <section className="col-12  px-0 d-lg-flex flex-wrap ">
                        {
                            mealtype_list.map(
                                (value, index) => {
                                    // console.log("map = ", index);
                                    return (
                                        <section key={index} onClick={ ()=> getSecondPg(value.meal_type)} className="px-0 d-flex border border-1 searchSize m-3 ">
                                        {/* <section key={index} onClick={getSecondPg} className="px-0 d-flex border border-1 searchSize m-3 "> */}
                                            <img src={"./images/"+value.image} alt="idliImg" className=" imgSize  " />
                                            <div className="pt-3 px-2  ">
                                                <h4 className="NavyBlue text2">{value.name}</h4>
                                                <p className="text-muted small">{value.content}</p>
                                            </div>
                                        </section>
                                    )
                                })
                        }
                    </section>
                </section>
            </section>
        </section>
    </>
    )
}

export default QuickSearchPage