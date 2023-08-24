import { api } from "../api/ApiSlice";

const bookAPi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: (value) =>
        `/api/book/allbook?value=${value.search}&filter=${value.filter}`,
    }),
    getMyBooks: build.query({
      query: (token) => `/api/book/my/allbook?token=${token}`,
    }),

    addBook: build.mutation({
      query: (body) => ({
        url: "/api/book/addbook",
        method: "POST",
        body,
      }),
    }),
    deleteBook: build.mutation({
      query: (body) => ({
        url: "/api/book/deletebook",
        method: "DELETE",
        body,
      }),
    }),
    editBook: build.mutation({
      query: (body) => ({
        url: "/api/book/updatebook",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useGetMyBooksQuery,
  useDeleteBookMutation,
  useEditBookMutation,
} = bookAPi;
