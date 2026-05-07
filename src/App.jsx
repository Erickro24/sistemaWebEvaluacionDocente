
import { useState } from 'react'
import './App.css'


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
