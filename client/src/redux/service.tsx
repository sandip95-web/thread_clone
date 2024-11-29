import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),

})


export const {  } = serviceApi