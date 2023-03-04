import { Route, Routes } from "react-router-dom"
import LoginPage from "./Authentication/Login"
import Register from "./Authentication/Register"
import Addbooks from "./book-management/AddBooks"
import EditBooks from "./book-management/EditBooks"
import Bookshelf from "./Components/Bookshelf"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/bookshelf" element={<Bookshelf/>}/>
      <Route path="/books/add" element={<Addbooks/>}/>
      <Route path="/books/:id" element={<EditBooks/>}/>
    </Routes>
    </>
  )
}

export default App
