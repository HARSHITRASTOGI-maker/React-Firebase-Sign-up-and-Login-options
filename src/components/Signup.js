import React, { useState } from "react";
import { Link, UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {signInWithPopup} from "firebase/auth";
import { useEffect} from "react";
import Home from "./Home";
import InputControl from "./InputControl";
import { auth ,provider,provider1} from ".//firebase";

import styles from "./Signup.module.css";
import PhoneSignUp from "./PhoneSignUp";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
            navigate("/Home");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });
      
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

    const signinwithFacebook =() =>{
      signInWithPopup(auth,provider1).then((data)=>{
        setValue(data.user.email)
        localStorage.setItem("email",data.user.email)
        console.log(data);
        navigate("/Home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
    }
  const handleClick2 =()=>{
    <Link to="/PhoneSignup"></Link>
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address or phone number "
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <div>
       <button onClick={handleClick} disabled={submitButtonDisabled}>Signin With Google</button>
        
        </div>
          <div>
       <button onClick={signinwithFacebook } disabled={submitButtonDisabled}>Signin With Facebook</button>
        
        </div>
          <div>
       <button  disabled={submitButtonDisabled}><Link to="/PhoneSignup">Sign up with Phone</Link></button>
        
        </div>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
         
        </div>
      </div>
    </div>
  );
}

export default Signup;