import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { auth , fs } from '../Firebase';
import {useState, useEffect} from 'react'
import { InstantSearch, SearchBox, Hits ,  PoweredBy } from 'react-instantsearch-dom';
import Error from './Error'
import home from '../Image/home.png'
import {Link} from 'react-router-dom'


const searchClient = algoliasearch(
  import.meta.env.VITE_SOME_KEY_ALOGLIA_APP_ID,
  import.meta.env.VITE_SOME_KEY_ALGOLIA_SEARCH_API_KEY
);

function Hit ({ hit }) {
  return (
  <article>
     <h3> {hit.date.slice(0, 25)} </h3>
       <h3 className="">  {hit.checkIn} </h3>
      <h3> {hit.start} </h3>
        <h3> {hit.finish} </h3>
          <h3> {hit.dropoff} </h3>
            <h3>  {hit.count} </h3>
                <h3>  {hit.clockout} </h3>
                    <h3>  {hit.pause} </h3>


  </article>
  );
}



export default function Filter() {


  //getting user info
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

const uid = GetUserUid();

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

console.log(user);
const [ driver,setDriver] = useState('elliot')

  const master = import.meta.env.VITE_SOME_KEY_API

  if (uid === master){
  


  
  
    return (<>
  
      <div className="link-div">
      <Link  className='link' to="/"> Home</Link>
       <button className='link' onClick={() => setDriver('elliot')} > elliot Felayno </button>
       <button  className='link' onClick={() => setDriver('miquel')} >Miquel Welsh </button>
        <button  className='link' onClick={() => setDriver('mitchel')} >Mitchel Raafenberg </button>
        <button  className='link' onClick={() => setDriver('valerie')} >Valerie Renfrum </button>
         <button  className='link' onClick={() => setDriver('imanuel')}>Regrenso Imanuel </button> 
         <button  className='link' onClick={() => setDriver('mel')}>mellory Overman</button> 
  
       </div>
         <div> <h3 className='logged'> Logged in as { user } </h3> </div>
  
      <div>
  
      <InstantSearch searchClient={searchClient} indexName= {driver}>
  
  
            <h3 className='title'>{driver} <img className="logo-small" src={home} alt={home} /> </h3>
  
        <SearchBox autoFocus placeholder='Search...' className='searchbox'/>
  
        <PoweredBy className='poweredby'/>
  
        <Hits hitComponent={Hit} className="hits"/>
  
        </InstantSearch>
  
      </div>
  
    </>);
  
  } else{ return <Error />}
}
