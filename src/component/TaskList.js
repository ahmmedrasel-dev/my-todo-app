import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskList = ({ task, refetch }) => {
  const { title, description, _id } = task;

  const navigate = useNavigate();

  const handleNavigateDetails = (id) => {
    navigate(`task/${id}`);
  }
  const handleComplet = (id) => {
    const updateStatus = async () => {
      try {
        const { data } = await axios.put(`https://my-todo-app-express.herokuapp.com/taskStatus/${id}`);
        if (data.modifiedCount > 0) {
          toast.success('Task is Completed!')
          refetch()
        }
      }
      catch (error) {
        toast.error(error.message)
      }
    }
    updateStatus()
  }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={task.status === 'completed' ? true : false} />
          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        <Link to="" onClick={() => handleNavigateDetails(_id)}>{title}</Link>

      </th>
      <td className="px-6 py-4">
        {description}
      </td>
      <td className="px-6 py-4">
        {task.status !== 'completed' ? 'Active' : 'completed'}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="font-medium hover:underline btn btn-sm btn-success m-2" onClick={() => handleComplet(_id)} disabled={task.status === 'completed' && true}>Complete</button>
      </td>
    </tr>
  );
};

export default TaskList;