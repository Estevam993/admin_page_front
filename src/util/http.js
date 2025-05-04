"use server";

import axios from "axios";
import {cookies} from "next/headers";

export const postRequest = async (config) => {
  const {url, params, headers} = config;

  const newHeaders = {...headers};

  if (newHeaders.Authorization === undefined) {
    const cookie = await getCookie('jwt')

    newHeaders.Authorization = `Bearer ${cookie}`;
  }

  try {
    const response = await axios.post(url, params, {headers: newHeaders});

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRequest = async (config) => {
  const {url, headers} = config;

  const newHeaders = {...headers};

  if (newHeaders.Authorization === undefined) {
    const cookie = await getCookie('jwt')

    newHeaders.Authorization = `Bearer ${cookie}`;
  }

  try {
    const response = await axios.get(url, {headers: newHeaders});

    if (typeof response.data !== "object") {
      throw new Error("An error has ocurred");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRequest = async (config) => {
  const {url, headers} = config;

  const newHeaders = {...headers};

  newHeaders.Authorization = `Bearer ${newHeaders.Authorization}`;

  try {
    const response = await axios.delete(url, {headers: newHeaders});

    if (typeof response.data !== "object") {
      throw new Error("An error has occurred");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setCookie = async (name, value, options = {}) => {
  const cookieStore = cookies();

  cookieStore.set(name, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 24 * 60 * 60,
    ...options,
  });
};

export const getCookie = async (name) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  return cookie?.value || null;
};
