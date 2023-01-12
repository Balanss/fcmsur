import React from 'react'
import Home from './Home'
import { Link} from 'react-router-dom'

const Error = () => {


return <div className="error"> <h1> 404 Error</h1>  <Link to='/'>home</Link> </div>

}

export default Error;
