import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
      getTasks: builder.query({
        query: () => '/tasks',
        providesTags: ['Tasks'],
      }),
      createTask: builder.mutation({
        query: (newTask) => ({
          url: '/tasks',
          method: 'POST',
          body: newTask,
        }),
        invalidatesTags: ['Tasks'],
      }),
      deleteTask: builder.mutation({
        query: (id) => ({
          url: `/tasks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Tasks'],
      }),
      updateTask: builder.mutation({
        query: (updatedTask) => ({
          url: `/tasks/${updatedTask.id}`,
          method: 'PUT',
          body: updatedTask,
        }),
        invalidatesTags: ['Tasks'],
      }),
    }),
});

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = apiSlice;