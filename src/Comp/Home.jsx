import React from 'react';
import Navbar from "./Navbar"
import {useState, useEffect} from 'react'
import { auth, fs} from '../Firebase'
import {Link, useNavigate} from 'react-router-dom'
import home from '../Image/home.png'
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const navigate = useNavigate()
     // getting current user uid
        function GetUserUid(){
            const [uid, setUid]=useState(null);
            useEffect(()=>{
                auth.onAuthStateChanged(user=>{
                    if(user){
                        setUid(user.uid);
                    }
                })
            },[])
            return uid;
        }

        const uid = GetUserUid(); // ignore errror


        // getting current user function
        function GetCurrentUser(){
            const [user, setUser]=useState(null);
            useEffect(()=>{
                auth.onAuthStateChanged(user=>{
                    if(user){
                         fs.collection('users').doc(user.uid).get().then(snapshot=>{
                            setUser(snapshot.data().FullName);


                         })


                    }
                    else{
                        setUser(null);
                    }
                })
            },[])
            return user;
        }

        const user = GetCurrentUser();
         //console.log(user);



  return(<>
  <div className="img-div"> <img className="img-logo" src={home} /> </div>
      <Navbar user={user} />
      </>
    )

}
export default Home
