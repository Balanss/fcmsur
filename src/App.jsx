
import {HashRouter ,Routes,Route} from "react-router-dom"
import Driver from './Comp/Driver'
import Home from './Comp/Home'
import Login from './Comp/Login'
import Filter from './Comp/Filter'
import './App.css'

function App() {


  return (
    <HashRouter>
    <Routes>

    <Route path="/" element={<Home />}></Route >
    <Route path="/driver" element={<Driver />}></Route >
        <Route path="/Error" element={<Error />}></Route >
        <Route path="/login" element={<Login />}></Route >
        <Route path="/filter" element={<Filter />}></Route >
    </Routes>
    </HashRouter>
  )
}

export default App
