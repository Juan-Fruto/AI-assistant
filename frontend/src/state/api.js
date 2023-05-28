import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//function to call the api
export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
        postAiText: build.mutation({
            query: (payload) => ({
                url: "/api/openai/text",
                method: "POST",
                body: payload
            })
        })
    })
});

export const {usePostAiTextMutation} = api;