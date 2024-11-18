import { createApi } from '@reduxjs/toolkit/query/react';

let isServerAvailable = false;

// Функция для проверки доступности сервера
const checkServerAvailability = async () => {
  try {
    const response = await fetch('http://localhost:3001/tasks', { method: 'HEAD' });
    isServerAvailable = response.ok;
    console.log(`Сервер доступен: ${isServerAvailable}`);
  } catch (err) {
    isServerAvailable = false;
    console.warn('Сервер недоступен, используем локальные данные');
  }
};

// Вызов проверки при загрузке модуля
checkServerAvailability();

// Локальные методы для работы с `localStorage`
const getLocalTasks = () => {
  try {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  } catch {
    return [];
  }
};

const saveLocalTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Кастомный `baseQuery` для работы с сервером и `localStorage`
const customBaseQuery = async ({ url, method, body }) => {
  if (isServerAvailable) {
    try {
      const response = await fetch(`http://localhost:3001${url}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null, // Сериализация тела запроса
      });
      if (!response.ok) throw new Error('Ошибка при запросе к серверу');
      return { data: await response.json() };
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
      throw new Error('Ошибка при запросе к серверу');
    }
  } else {
    if (method === 'GET') {
      return { data: getLocalTasks() };
    }
    if (method === 'POST') {
      const newTask = typeof body === 'string' ? JSON.parse(body) : body; // Проверяем формат тела
      const localTasks = getLocalTasks();
      newTask.id = Date.now();
      const updatedTasks = [...localTasks, newTask];
      saveLocalTasks(updatedTasks);
      return { data: newTask };
    }
    if (method === 'PUT') {
      const updatedTask = typeof body === 'string' ? JSON.parse(body) : body; // Проверяем формат тела
      const localTasks = getLocalTasks();
      const updatedTasks = localTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      saveLocalTasks(updatedTasks);
      return { data: updatedTask };
    }
    if (method === 'DELETE') {
      const id = parseInt(url.split('/').pop(), 10);
      const localTasks = getLocalTasks();
      const updatedTasks = localTasks.filter((task) => task.id !== id);
      saveLocalTasks(updatedTasks);
      return { data: { success: true } };
    }
    return { error: { status: 400, data: 'Некорректный запрос' } };
  }
};


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({ url: '/tasks', method: 'GET' }),
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
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: `/tasks/${updatedTask.id}`,
        method: 'PUT',
        body: updatedTask,
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
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
