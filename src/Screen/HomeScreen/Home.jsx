/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useGetBooksQuery } from "../../redux/book/BookAPi";
import { useAddWishListMutation } from "../../redux/wishList/WishListApi";
import { ToastContainer, toast } from "react-toastify";
const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const option = {
    search: searchValue,
    filter: filterValue,
  };
  const { data } = useGetBooksQuery(option);
  const [addWishList] = useAddWishListMutation();
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(data);
  };
  const handleFilter = (filterData) => {
    setFilterValue(filterData);
  };
  const token = JSON.parse(localStorage.getItem("book-user"))?.token;
  const handleWishList = async (id, title) => {
    const wishListData = await addWishList({ id, token, title });
    //console.log(wishListData);
    toast(wishListData.data.msg);
  };
  return (
    <div className="homescreen">
      <div>
        <div className="searchFilter">
          <div className="flex flex-col w-full">
            <div className="grid card">
              <form onSubmit={handleSearch} className="flex items-center">
                <label for="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search book..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
            <div className="divider">Filter</div>
            <div className="flex genre gap-3 w-72 px-5 flex-wrap">
              <button onClick={() => handleFilter("fiction")}>Fiction</button>
              <button onClick={() => handleFilter("narrative")}>
                Narrative
              </button>
              <button onClick={() => handleFilter("novel")}>Novel</button>
              <button onClick={() => handleFilter("science-fiction")}>
                Science-fiction
              </button>
              <button onClick={() => handleFilter("non-fiction")}>
                Non-fiction
              </button>
              <button onClick={() => handleFilter("Historical-Fiction")}>
                Historical-Fiction
              </button>
              <button onClick={() => handleFilter("Genre-fiction")}>
                Genre-fiction
              </button>
              <button onClick={() => handleFilter("Mystery")}>Mystery</button>
              <button onClick={() => handleFilter("all")}>All</button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mx-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Pub-Date</th>
              <th>Wishlist</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.books.map((res, idx) => (
              <tr>
                <th>{idx + 1}</th>
                <td>{res?.title}</td>
                <td>{res?.author}</td>
                <td>{res?.genre}</td>
                <td>{res?.publishDate}</td>
                <button
                  onClick={() => handleWishList(res._id, res?.title)}
                  className="btn m-1 btn-sm btn-info"
                >
                  Add
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Home;
