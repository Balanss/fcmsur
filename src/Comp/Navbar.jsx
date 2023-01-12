import React from 'react'
import { Link} from 'react-router-dom'
import { auth } from '../Firebase'
import {useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';



const Navbar = ({user}) => {
const navigate = useNavigate()


const handleLogout = () => {
  auth.signOut().then(() => {
    navigate('/')
  })
};


const admin = import.meta.env.VITE_A_NAME
 const mel = import.meta.env.VITE_SOME_KEY_NAME2
 const miquel = import.meta.env.VITE_SOME_KEY_NAME3
const elliot = import.meta.env.VITE_SOME_KEY_NAME_10
const mitchel = import.meta.env.VITE_SOME_KEY_NAME6 
const valerie = import.meta.env.VITE_SOME_KEY_NAME5
 const imanuel =import.meta.env.VITE_SOME_KEY_NAME7


if(user === admin) {
   console.log(user)
   return(<>
   {user&& <>

     <div className='navlink navlinklogout'
                          onClick={handleLogout}><h1 className='links'>Logout</h1>

   <div><h1 className='links'>Logged in as {user}</h1></div>

    </div>

     </>}

     <div className="driver-list">
   <Link className='links' to="/login"> login</Link>
      <Link className='links' to="/filter"> Driver bonnen </Link>
   </div>


     </>
   )

 } else if(elliot === user){
  return  <div className='center'> <Link className='center-text' to="/driver"> Elliot</Link> </div>
} else if (valerie === user){
  return  <div className='center'><Link className='center-text' to="/driver"> Valerie</Link> </div>
 } else if(mitchel === user){
  return  <div className='center'><Link className='center-text' to="/driver"> Mitchel</Link> </div>
  } else if(miquel === user){
       return  <div className='center'><Link className='center-text' to="/driver"> Miquel</Link> </div>
   } else if (user === mel){
       return <div className='center'> <Link className='center-text' to="/driver"> Mellory</Link> </div>
     }else if (imanuel === user){
        return  <div className='center'><Link className='center-text' to="/driver"> Imanuel</Link> </div>
       }
 else 
 { return <div className='center'> <CircularProgress />  </div> 
}










}

export default Navbar
