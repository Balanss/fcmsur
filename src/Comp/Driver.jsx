import React from "react";
import { useState, useEffect } from "react";
import { storage, fs, auth } from "../Firebase";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import Error from "./Error";
import home from "../Image/home.png";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import NoInternetConnection from "./NoInternetConnection";

export default function Dummy() {
  const [isClock, setIsClock] = useState(
    localStorage.getItem("isClock") === "true"
  );
  const [checked, setIsChecked] = useState(true);
  const [checked2, setIsChecked2] = useState(true);
  const [checked3, setIsChecked3] = useState(true);
  const [isActive, setIsActive] = useState(
    localStorage.getItem("isActive") === "true"
  );
  const [isStart, setIsStart] = useState(true);
  const [checkout, setCheckout] = useState(true);
  const [clockout, setClockout] = useState("Has Clocked Out");
  const [pause, setpause] = useState("Took A Break");
  const [start, setStart] = useState("start met ride");
  const [rules, setRules] = useState("-----------------");
  const [dropoff, setDropoff] = useState("dropoff");
  const [finish, setFinish] = useState("finish");
  const [count, setCount] = useState(1);
  const [checkIn, setCheckIn] = useState("checkin");
  const [error, setError] = useState("error");
  const [dummy, setDummy] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [input, setInput] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    fs.collection(user).add({
      timestamp: serverTimestamp(),
      date: new Date().toString(),
      start,
      count: "bon no : " + count,
    });
  

  };

  const handleDropoff = (e) => {
    e.preventDefault();
    fs.collection(user).add({
      timestamp: serverTimestamp(),
      date: new Date().toString(),
      dropoff,
      count: "bon no : " + count,
    });
    setIsChecked({
      display: "none",
    });
    setIsChecked2({
      display: "none",
    });
    setCount((count) => {
      return (count = count + 1);
    });

    setDummy("");
    console.log(count);
  };

  useEffect(() => {
    setCount(JSON.parse(window.localStorage.getItem("count")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    window.localStorage.setItem("isClock", isClock);
  }, [isClock]);

  useEffect(() => {
    window.localStorage.setItem("isActive", isActive);
  }, [isActive]);

  const handleMin = (e) => {
    e.preventDefault();
    fs.collection(user).add({
      timestamp: serverTimestamp(),
      date: new Date().toString(),
      clockout,
    });
    setIsActive((current) => !current);
    setIsStart((current) => !current);
    setIsClock((current) => !current);
    setIsChecked({
      display: "none",
    });
    setIsChecked2({
      display: "none",
    });
    setIsChecked3({
      display: "none",
    });

    setCount((count) => {
      return (count = 1);
    });

    setDummy("");
    setDisabled3(false);
    setDisabled2(false);
    setDisabled(false);
  };

  const handlePause = (e) => {
    e.preventDefault();
    fs.collection(user).add({
      timestamp: serverTimestamp(),
      date: new Date().toString(),
      pause,
    });
    setIsChecked({
      display: "none",
    });
    setIsChecked2({
      display: "none",
    });
    setIsChecked3({
      display: "none",
    });
  };


  const handleOpen = (e) => {
    setIsStart((current) => !current);
    setIsClock((current) => !current);
    setIsActive((current) => !current);
    e.preventDefault();
    fs.collection(user).add({
      date: new Date().toString(),
      checkIn,
    });
  };

  const handleHier = () => {
    setIsChecked((current) => !current);
    setDummy("Nu begonnen met een rit");
    setTimeout(() => {
      setDisabled(true);
    }, 500);
  };

  const handleDropByKlant = () => {
    setIsChecked2((current) => !current);
    setDummy("klaar met de klant");
    setDisabled(false);
  };


  //getting user info
  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid(); // ignore errror

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();

 console.log(user)

  const admin = import.meta.env.VITE_SOME_KEY_API;

  if (user) {
    return (
      <>
        <NoInternetConnection>
         <div className="driver">
            
            <h3 className="title">
              
              {user} <img
                className="logo-small"
                src={home}
                alt={home}
              />
            </h3>
          </div>

          <div></div>

          <div
            className="checkin"
            style={{
              display: isClock ? "none" : "block",
            }}
          >
            <button className=" btn-green" onClick={handleOpen}>
              
              Start met de dag
            </button>
          </div>

          <div
            className="form-group"
            style={{
              display: isActive ? "block" : "none",
            }}
          >
            <h1 className="status"> {dummy} </h1>
            <form onSubmit={handleSubmit}>
              
              <label> begin met rit </label>
              <button
                className=" btn-blue"
                onClick={handleHier}
                disabled={disabled}
              >
                
                Druk hier
              </button>
              <input
                className=" form-input"
                type="checkbox"
                defaultChecked
                style={{
                  display: !checked ? "block" : "none",
                }}
              />
            </form>

            <form onSubmit={handleDropoff}>
              
              <label> dropoff by klant </label>
              <button
                className=" btn-blue"
                onClick={handleDropByKlant}
                disabled={disabled2}
              >
                
                Druk hier
              </button>
              <input
                className=" form-input"
                type="checkbox"
                defaultChecked
                style={{
                  display: !checked2 ? "block" : "none",
                }}
              />
            </form>
          </div>

          <div className="checkout">
            
            <button className="btn-red" onClick={handleMin}>
              
              Uitclocken voor de dag
            </button>
          </div>

          <div className="checkout">
            
            <button className="btn-red" onClick={handlePause}>
              
              Break
            </button>
          </div>
        </NoInternetConnection>
      </>
    );
  } else if (user === admin){
return (<>
  <NoInternetConnection>
  <div className="link-div">
      <Link className="link" to="/jenerciojurgens">
        
        Jenercio Jurgens
      </Link>
      <Link className="link" to="/">
        
        Home
      </Link>
      <Link className="link" to="/elliotfelanyo">
        
        elliot Felayno
      </Link>
      <Link className="link" to="/miquelWelsh">
        
        Miquel Welsh
      </Link>
      <Link className="link" to="/mitchelraafenberg">
        
        Mitchel Raafenberg
      </Link>
      <p className="logged"> Logged in as {user} </p>
    </div>         

    <div className="driver">
      
      <h3 className="title">
        
        {user} <img
          className="logo-small"
          src={home}
          alt={home}
        />
      </h3>
    </div>

    <div></div>

    <div
      className="checkin"
      style={{
        display: isClock ? "none" : "block",
      }}
    >
      <button className=" btn-green" onClick={handleOpen}>
        
        Start met de dag
      </button>
    </div>

    <div
      className="form-group"
      style={{
        display: isActive ? "block" : "none",
      }}
    >
      <h1 className="status"> {dummy} </h1>
      <form onSubmit={handleSubmit}>
        
        <label> begin met rit </label>
        <button
          className=" btn-blue"
          onClick={handleHier}
          disabled={disabled}
        >
          
          Druk hier
        </button>
        <input
          className=" form-input"
          type="checkbox"
          defaultChecked
          style={{
            display: !checked ? "block" : "none",
          }}
        />
      </form>

      <form onSubmit={handleDropoff}>
        
        <label> dropoff by klant </label>
        <button
          className=" btn-blue"
          onClick={handleDropByKlant}
          disabled={disabled2}
        >
          
          Druk hier
        </button>
        <input
          className=" form-input"
          type="checkbox"
          defaultChecked
          style={{
            display: !checked2 ? "block" : "none",
          }}
        />
      </form>
    </div>

    <div className="checkout">
      
      <button className="btn-red" onClick={handleMin}>
        
        Uitclocken voor de dag
      </button>
    </div>

    <div className="checkout">
      
      <button className="btn-red" onClick={handlePause}>
        
        Break
      </button>
    </div>
  </NoInternetConnection>
</>)
  }
   else if (!user) {
    return  <CircularProgress /> ;
  } else {
    return  <Error />;
  }
}
