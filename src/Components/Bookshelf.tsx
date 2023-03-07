import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchBooks from "./SearchBooks";
interface Books_data {
  id: number;
  title_book: string;
  year_book: number;
  author_book: string;
  summary_book: string;
}

const Bookshelf = () => {
  const [books, setBooks] = useState<Books_data[]>([]);
  const [searchBooks, setSearchBooks] = useState("");
  const [userName, setUsername] = useState<string>("");
  const navigate = useNavigate();
  // Ambil userId dari localStorage
  const userId: string | null = localStorage.getItem("userId");

  const getValueInputSearchBooks = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchBooks(event.target.value);
  };

  const getBooks = async (userId: string | null) => {
    const response = await fetch(`http://localhost:3001/bookshelf/${userId}`);
    const data = await response.json();
    setBooks(data);
  };

  const deleteBooks = async (bookId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookshelf/${bookId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status >= 401) {
        console.error(Error);
      }
      const updateBooks = books.filter((book) => book.id !== bookId);
      setBooks(updateBooks);
    } catch (error) {
      console.error(error);
    }
  };

  const getDeleteBooks = (bookId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to return this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooks(bookId);
        Swal.fire("Deleted!", "Your book has been deleted.", "success");
      }
    });
  };

  const logOut = async () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const getUser = async () => {
    try {
      const userNameData = await fetch(`http://localhost:3001/users/${userId}`);
      const data = await userNameData.json();
      setUsername(data[0].username);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    // Pastikan userId ada sebelum memanggil getBooks
    if (userId) {
      getBooks(userId);
      getUser();
    }
  }, [userId]);

  return (
    <div className="App">
      <div className="flex justify-end ">
        <div className="flex justify-center items-center">
          <button
            className="mt-2 mr-2 bg-gray-200 flex justify-center items-center w-[80px] h-10 rounded-lg"
            onClick={logOut}
          >
            Log out
          </button>
          <p className="mt-2 mr-5   flex justify-center items-center w-[80px] h-10 rounded-lg">
            Hii {userName}
          </p>
        </div>
      </div>
      <div className="bg-red-200 mx-auto text-center lg:mt-18 mt-12 p-10 w-[90%] mb-10">
        <h2 className="text-3xl font-bold">Book List</h2>
        <div className="flex justify-center mt-3 mb-2  ">
          <SearchBooks onChange={getValueInputSearchBooks} />
          <Link
            to="/books/add "
            className="bg-gray-200 w-[120px] h-[50px] flex flex-col justify-center text-sm hover:bg-gray-300"
          >
            Add Books
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 lg:grid-cols-3">
          {books
            .filter((book) => {
              if (searchBooks === "") {
                return book;
              } else if (
                book.title_book
                  .toLowerCase()
                  .includes(searchBooks.toLowerCase())
              ) {
                return book;
              }
              return null;
            })
            .map((book) => {
              return (
                <div key={book.id} className="mt-5 flex flex-col ">
                  <div className="bg-cyan-200 h-[230px] p-2">
                    <p className="font-bold p-5 lg:text-2xl">
                      {book.title_book}
                    </p>
                    <p className="lg:text-base">
                      Summary : {book.summary_book}
                    </p>
                    <div className="flex justify-evenly pt-5 pb-5">
                      <p>Year : {book.year_book}</p>
                      <p>Author : {book.author_book}</p>
                    </div>
                    <div className="flex justify-around mt-2">
                      <Link to={`/books/${book.id}`}>
                        <button className="bg-gray-300 w-[100px] h-[30px] hover:bg-slate-200">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => getDeleteBooks(book.id)}
                        className="bg-gray-300 w-[100px] h-[30px] hover:bg-gray-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
