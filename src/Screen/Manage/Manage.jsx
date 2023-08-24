/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import { useState } from "react";
import {
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetMyBooksQuery,
} from "../../redux/book/BookAPi";
import { ToastContainer, toast } from "react-toastify";
const Manage = () => {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const token = JSON.parse(localStorage.getItem("book-user"))?.token;
  const [addBook] = useAddBookMutation();
  const { data } = useGetMyBooksQuery(token);
  const [deleteBook] = useDeleteBookMutation();
  const [editBook] = useEditBookMutation();
  //console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do something with the form data, like sending it to a server or updating state
    const formData = {
      title,
      genre,
      author,
      publishDate: publicationDate,
      token,
    };
    const { data } = await addBook(formData);
    toast(data?.msg);
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate("");
  };

  const handleDelete = async (id) => {
    const { data } = await deleteBook({ id, token });
    toast(data.msg);
    console.log(data);
  };

  const handleEdit = (id, title, author, date, genre) => {
    setBookId(id);
    setTitle(title);
    setAuthor(author);
    setGenre(genre);
    setPublicationDate(data);
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    const { data } = await editBook({
      token,
      data: { bookId, title, author, genre, publicationDate },
    });

    toast(data.msg);
  };

  return (
    <div className="">
      <div className="flex justify-around gap-5">
        <div className="w-96 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre:
              </label>
              <input
                type="text"
                id="genre"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author:
              </label>
              <input
                type="text"
                id="author"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="publicationDate"
                className="block text-sm font-medium text-gray-700"
              >
                Publication Date:
              </label>
              <input
                type="date"
                id="publicationDate"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <div className="overflow-x-auto mx-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data?.books.map((res, idx) => (
                  <tr>
                    <th>{idx + 1}</th>
                    <td>{res?.title}</td>
                    <td>{res?.author}</td>

                    {/* The button to open modal */}
                    <a
                      href="#book-edit-modal"
                      onClick={() =>
                        handleEdit(
                          res._id,
                          res?.title,
                          res.author,
                          res?.publishDate,
                          res?.genre
                        )
                      }
                      className="btn m-1 btn-sm btn-info"
                    >
                      Edit
                    </a>

                    <button
                      onClick={() => handleDelete(res._id, res?.title)}
                      className="btn m-1 btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>

      {/* Put this part before </body> tag */}
      <div className="modal" id="book-edit-modal">
        <div className="modal-box">
          <div className="modal-action">
            <a href="#" className="btn">
              X
            </a>
          </div>
          <div className="w-96 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Edit a Book</h2>
            <form onSubmit={handleEditBook}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Genre:
                </label>
                <input
                  type="text"
                  id="genre"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="publicationDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Publication Date:
                </label>
                <input
                  type="date"
                  id="publicationDate"
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
