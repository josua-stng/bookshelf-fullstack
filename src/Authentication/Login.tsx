import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
interface User {
  id: number;
  username: string;
  password: string;
}

function LoginPage() {
  const [user, setUser] = useState<User[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const userLoginAccount = async () => {
    const userData = await fetch("http://localhost:3001/users");
    const responseUserData = await userData.json();
    setUser(responseUserData);
  };

  const toogleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const passwordType = showPassword ? "text" : "password";
  const navigate = useNavigate();

  const passwordWrong = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Wrong password',
    })
  }

  const usernameOrPasswordWrong= () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Wrong username or Password',
    })
  }

  const handlerUserLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let userFound = false;
    user.forEach((users) => {
      if (users.username === username && users.password === password) {
        localStorage.setItem("userId", users.id.toString()); // Simpan id pengguna ke dalam localStorage
        navigate("/bookshelf");
        userFound = true;
        return;
      } else if (users.username === username && users.password !== password) {
        passwordWrong()
        userFound = true;
        return;
      }
    });
    if (!userFound) {
      usernameOrPasswordWrong()
      return;
    }
  };

  useEffect(() => {
    userLoginAccount();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-neutral-200 ">
      <div>
        <form
          action=""
          onSubmit={handlerUserLogin}
          className="flex flex-col justify-center items-center bg-slate-50 h-[450px] w-[330px] mx-auto rounded-xl"
        >
          <h1 className="text-2xl mb-10 font-bold mt-5">Welcome</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border-b-2 border-black pl-1 mr-[-7px] h-10 "
          />
          <div className="">
            <input
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-b-2 border-black  pl-1 h-10 mt-10 mx-auto"
            />
            <button
              className="ml-[-25px] "
              type="button"
              onClick={toogleShowPassword}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 text-gray-500 " />
              )}
            </button>
          </div>
          <button className="p-2 w-[251px] rounded-xl mt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white mb-16 hover:text-slate-800">
            Login
          </button>
          <div className="flex mb-10">
            <p className="pr-2 ">Don't have an account?</p>
            <Link to="/register" className=" text-sky-600 hover:text-slate-400">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
