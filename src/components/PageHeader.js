import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import jwtDecode from "jwt-decode";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

function Header(Prop) {
    const Swal = require('sweetalert2')
    let navigate = useNavigate();
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
    let [isLogin, set_isLogin] = useState(getTokenDetails(), []);
    console.log(isLogin)

    let onSuccess = (credentialResponse) => {
        let token = credentialResponse.credential
        // let decodedToken = jwtDecode(token)
        // console.log("d = "+decodedToken)                //now we have access to email name sername 
        localStorage.setItem("token_key", token) //saving token data
        // alert("Successful Login!")
        Swal.fire({
            icon: 'success',
            position: 'top-center',
            title: 'Successfully Loged-in',
            showConfirmButton: false,
            timer: 2000
        }).then(
            (value) => {
                window.location.reload("/")//so that after login automatically page is refreshed to home page!
            }
        )
    }
    let onError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed To Login!',
        })
    }
    let LogOut = () => {
        Swal.fire({
            title: 'Are you sure to logout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, i want to logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    localStorage.removeItem('token_key'),//remove data from localstoarge
                    set_isLogin(false),
                    window.location.reload("/")
                )
            }
        })
        // alert("Logout Successfully!")
    }
    // console.log("islogin = " + isLogin)
    return (
        <>
            <GoogleOAuthProvider clientId="380668128414-9k6ismgmjq2boedptln8cn79lpt54rle.apps.googleusercontent.com">
                <div className="modal fade" id="googleSignIn" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Google Login</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <GoogleLogin
                                    onSuccess={onSuccess}
                                    onError={onError}
                                />
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                                </div> */
                            }
                        </div>
                    </div>
                </div>

                <header className={"row " + Prop.ColorHeaderProp}>
                    <div className="col-12">
                        <div className=" container-lg d-flex justify-content-between align-items-center py-2">
                            {/* <img src={isLogin.picture} className="logoClass" alt="sadcf" /> */}
                            <p className="logoClass m-0 text-danger h2 " onClick={() => navigate("/")} >e!</p>
                            {
                                isLogin ? (
                                    <div>
                                        <p className="btn text-white m-0 ">Welcome ,
                                            {
                                                "  " + isLogin.name
                                            }
                                        </p>
                                        <button className="btn text-white" onClick={LogOut}>Logout</button>

                                    </div>
                                ) : (<div>
                                    <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#googleSignIn">Login</button>
                                    <button className="btn btn-outline-light" >Create an account</button>
                                </div>)
                            }

                        </div>
                    </div>
                </header>
            </GoogleOAuthProvider>
        </>
    )
}

export default Header