import { api } from "../api/ApiSlice";

const wishListApi = api.injectEndpoints({
  endpoints: (build) => ({
    addWishList: build.mutation({
      query: (body) => ({
        url: "/api/wishlist/my",
        method: "POST",
        body,
      }),
    }),
    deleteWishList: build.mutation({
      query: (id) => ({
        url: `/api/wishlist/my/${id}`,
        method: "DELETE",
      }),
    }),
    getWishList: build.query({
      query: (token) => `/api/wishlist/my?token=${token}`,
    }),
  }),
});

export const {
  useAddWishListMutation,
  useGetWishListQuery,
  useDeleteWishListMutation,
} = wishListApi;
