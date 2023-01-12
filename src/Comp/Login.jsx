import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import home from "../Image/home.png";


function Login()  {
  const [ email,setEmail] = useState('')
  const [ password,setPassword] = useState("")
  const navigate = useNavigate()
  const [ errorMsg,setErrorMsg ] = useState('')
  const [successMsg,setSuccessMsg] = useState('')



  //getting user info
  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
        }
      })
    }, [])
    return uid;
  }

  const uid = GetUserUid(); // ignore errror
  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          fs.collection('users').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data().FullName);


          })


        } else {
          setUser(null);
        }
      })
    }, [])
    return user;
  }

  const user = GetCurrentUser();

  const handleSubmit = (e) =>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setSuccessMsg("sucess!!")
      setEmail("")
      setPassword("")
      setErrorMsg("")
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/")
      },2000)
    }).catch(error => setErrorMsg(error.message))

  }

  return (<>


      <div className="img-div"> <img className="img-logo" src={home} /> </div>

  <form className="login-form" onSubmit={handleSubmit}>
  <h3> Inloggen </h3>
  <div className="same"> <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} /> </div>
  <div className='same'> <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required /> </div>
    <button className='btn-login'> inloggen</button>
    </form>




      </>
    )




}

export default Login;
