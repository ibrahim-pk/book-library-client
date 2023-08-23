import { api } from "../api/ApiSlice";

const bookAPi = api.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
    }),
    userRegister: build.mutation({
      query: (body) => ({
        url: "/api/user/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = bookAPi;
