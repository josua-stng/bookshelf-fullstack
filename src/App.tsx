import { Route, Routes } from "react-router-dom"
import LoginPage from "./Authentication/Login"
import Register from "./Authentication/Register"
import Bookshelf from "./Components/Bookshelf"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/bookshelf" element={<Bookshelf/>}/>
    </Routes>
    </>
  )
}

export default App
