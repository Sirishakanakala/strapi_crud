import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayData = ({ handleDelete }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/crud');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-blue">
      <div className="w-full max-w-screen-md">
        {data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-white-400 mx-auto">
              <thead>
                <tr className="bg-grey-200">
                  <th className="px-4 py-2 border border-black-400">Name</th>
                  <th className="px-4 py-2 border border-black-400">Email</th>
                  <th className="px-4 py-2 border border-black-400">Number</th>
                  <th className="px-4 py-2 border border-black-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-4 py-2 border border-gray-400">{item.name}</td>
                    <td className="px-4 py-2 border border-gray-400">{item.email}</td>
                    <td className="px-4 py-2 border border-gray-400">{item.number}</td>
                    <td className="px-4 py-2 border border-gray-400">
                      <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                      {/* Add Update button here */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayData;
