import { api } from "../api/ApiSlice";

const bookAPi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: (value) =>
        `/api/book/allbook?value=${value.search}&filter=${value.filter}`,
    }),
  }),
});

export const { useGetBooksQuery } = bookAPi;
