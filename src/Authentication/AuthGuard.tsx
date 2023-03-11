import { Link } from "react-router-dom";

const AuthGuard = () => {
  return (
    <>
      <Link to="/">
        <button className=" m-2 bg-gray-300 w-20 h-10 rounded-lg">Back</button>
      </Link>
      <div className="flex justify-center items-center h-[85vh] text-xl text-center font-bold md:text-2xl">
        <div>
          <p>Anda harus login terlebih dahulu untuk mengakses halaman ini</p>
        </div>
      </div>
    </>
  );
};

export default AuthGuard;
