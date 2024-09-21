import { useRef, useState } from "react";
import Header from "./Header";
import './login.css';
import { checkValidation } from "../../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/store/userSlice";


const Login = () => {
    const dispatch = useDispatch();
    const [isSignUpForm, setIsSignUpForm] = useState(true);
    const changeForm = () => {
        setIsSignUpForm(!isSignUpForm);
        setError(false);
    }

    const [error, setError] = useState(false);
    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const [validationObj, setValidationObj] = useState({});

    const validateForm = (e) => {

        e.preventDefault();
        const [validationObjTemp, status] = checkValidation(email.current.value, password.current.value, name?.current?.value)
        setValidationObj(validationObjTemp);

        // if status is false then stop function
        if (!status) return;

        if (isSignUpForm) {

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name?.current?.value
                    }).then(() => {
                        const { uid, displayName, email } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            displayName: displayName,
                            email: email,
                        }));
                    })

                })
                .catch((error) => {
                    const errorCode = error.code;


                    if (errorCode === "auth/email-already-in-use") {
                        setError("User with this email is already exist !");
                    }
                });
        }
        else {

            signInWithEmailAndPassword(auth, email.current.value, password.current.value,)
                .then((userCredential) => {
                    // Signed in 


                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;

                    if (errorCode === "auth/invalid-login-credentials") {
                        setError("Invalid email or password");

                    }

                });

        }


    }
    return (
        <div className="loginDiv" >
            <div className="   ">
                <Header />

            </div>

            <div className="formDiv sm:p-8 p-4 rounded-md sm:w-4/12 lg:w-3/12">

                <div className="sm:text-4xl text-3xl font-bold mb-8 text-white mt-6 mb-4">Sign {isSignUpForm ? "Up" : "In"} </div>

                {error &&
                    <div className="bg-yellow-300 font-bold  mb-5 p-3 rounded text-yellow-900">{error}</div>
                }


                <form action="mt-4" >
                    {isSignUpForm &&

                        <div className="mb-6">                            <input type="text" ref={name} placeholder="Name" id="name" className="py-3 w-full mt-2 bg-transparent border p-2 rounded text-white  transition-all " />
                            {!validationObj?.name?.isValid &&
                                <p className="text-yellow-600 text-sm mt-1">{validationObj?.name?.message}</p>
                            }

                        </div>
                    }
                    <div className="mb-6">                        <input ref={email} type="email" placeholder="Email Address" id="email" className="w-full mt-2 bg-transparent border p-2 py-3 rounded text-white transition-all focus:bg-transparent" />
                        {!validationObj?.email?.isValid &&
                            <p className="text-yellow-600 text-sm mt-1">{validationObj?.email?.message}</p>
                        }
                    </div>
                    <div>
                        <input type="password" ref={password} placeholder="Password" id="password" className="py-3 bg-transparent border w-full focus:bg-transparent bg-gray-700 mt-2 p-2 rounded text-white  transition-all" />
                        {isSignUpForm &&
                            <p className="text-gray-400 mt-2 text-sm">
                                Password must be more than 6 character, contains one numeric, special, and uppercase character.</p>
                        }
                        {!validationObj?.password?.isValid &&
                            <p className="text-yellow-600 text-sm mt-1">{validationObj?.password?.message}</p>
                        }
                    </div>
                    <div className="text-center mt-6">
                        {/* <a href={isSignUpForm ? "/signu" : "/browse"}> */}
                        <button type="submit" className="bg-red-600 text-white block w-full p-3  rounded hover:bg-red-700" onClick={validateForm}>Sign {isSignUpForm ? "Up" : "In"}</button>
                        {/* </a> */}
                    </div>

                </form>
                <p className="mt-3 text-gray-400 text-white cursor-pointer">
                    {!isSignUpForm ? "New To Netflix?" : "Already Joined Netflix? "}

                    <span onClick={changeForm}> Sign {isSignUpForm ? "In" : "Up"} Now</span>
                </p>
            </div>






        </div>

    )
}

export default Login;