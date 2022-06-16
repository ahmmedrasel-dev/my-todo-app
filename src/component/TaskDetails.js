import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: task, isLoading, refetch } = useQuery('task',
    async () => {
      try {
        const { data } = await axios.get(`https://my-todo-app-express.herokuapp.com/task/${id}`);
        return data;
      }
      catch (error) {
        console.log(error.message)
      }
    }
  )

  const handleForm = event => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    const updateTask = { title, description };
    try {
      const postData = async () => {
        const { data } = await axios.put(`https://my-todo-app-express.herokuapp.com/task/${id}`, updateTask);
        if (data.modifiedCount > 0) {
          toast.success('Update Task!')
          event.target.reset();
          refetch()
        }

      }
      postData()
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='max-w-xl mx-auto h-screen flex items-center'>
        <form className='w-full  bg-slate-300 p-8 rounded-md' onSubmit={handleForm}>
          <Link to="/">Back Home</Link>
          <h1 className='text-center my-6 text-xl'>Edit Task</h1>
          <div className="mb-6">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Task Title</label>
            <input type="text" id="base-input" name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Task Description</label>
          <textarea id="message" name='description' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

          <button type="submit" className="focus:outline-none mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>

          <button type="submit" className="focus:outline-none mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Delete</button>
        </form>
      </div>

    </div>
  );
};

export default TaskDetails;