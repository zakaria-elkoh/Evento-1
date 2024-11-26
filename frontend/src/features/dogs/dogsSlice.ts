// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface Breed {
//   name: string;
//   id: string;
//   image: {
//     url: string;
//   };
// }

// // Define a service using a base URL and expected endpoints
// export const breedApi = createApi({
//   reducerPath: "breedApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Breed[], string>({
//       query: () => `breed`,
//     }),
//   }),
// });

// export const { useGetPokemonByNameQuery } = breedApi;
