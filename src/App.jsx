
import { useState } from 'react'
import './App.css'
// import Default from './components/default.jsx';


// import Home from '/src/screens/Home.jsx';


import Navigator from './components/Navigation/Navigator.jsx'
import Router from './components/Navigation/Router.jsx'

function App() {
 
  const [count, setCount] = useState(0)
  return (
    <>
     {/* <Home/>*/}
     <Navigator/>
      <Router/>
    </>
  )
}

export default App
