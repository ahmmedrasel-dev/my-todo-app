import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import TaskList from './TaskList';

const Home = () => {
  const { data: task, isLoading, refetch } = useQuery('task',
    async () => {
      try {
        const { data } = await axios.get('https://my-todo-app-express.herokuapp.com/task');
        return data;
      }
      catch (error) {
        toast.error(error.message)
      }
    }
  )

  const [searchResult, setSearchResult] = useState(task)

  const searchKeyword = event => {
    const searchText = event.target.value;
    const match = task.filter(result => result.title.toLowerCase().includes(searchText));
    setSearchResult(match);
  }

  const handleRemove = () => {
    const deleteTask = async () => {
      const response = await axios.delete(`https://my-todo-app-express.herokuapp.com/task`);
      if (response.data.deletedCount > 0) {
        toast.success(`Task is Deleted!`)
        refetch()
      } else {
        refetch()
        toast.error(`Somethin is Wrong!`)
      }
    }
    deleteTask()
  }


  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div className='max-w-7xl mx-auto mt-8'>
      <div className="shadow-md sm:rounded-lg">
        <Navbar
          handleRemove={handleRemove}
        ></Navbar>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3 text-right">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              task.map(item => <TaskList
                key={item._id}
                task={item}
                refetch={refetch}
              ></TaskList>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;