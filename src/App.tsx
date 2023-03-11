import { Route, Routes } from "react-router-dom";
import AuthGuard from "./Authentication/AuthGuard";
import LoginPage from "./Authentication/Login";
import Register from "./Authentication/Register";
import Addbooks from "./book-management/AddBooks";
import EditBooks from "./book-management/EditBooks";
import Bookshelf from "./Components/Bookshelf";
import PageNotFound from "./Components/PageNotFound";
import ProtectRoutes from "./Components/ProtectRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/bookshelf"
          element={
            <ProtectRoutes>
              <Bookshelf />
            </ProtectRoutes>
          }
        />

        <Route path="*" element={<PageNotFound />} />
        <Route path="/warning" element={<AuthGuard />} />
        <Route path="/books/add" element={<Addbooks />} />
        <Route path="/books/:id" element={<EditBooks />} />
      </Routes>
    </>
  );
}

export default App;
