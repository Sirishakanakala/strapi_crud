import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DisplayData = ({ data, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
      {data.map(item => (
        <div key={item.id} style={{ background: 'rgb(118, 103, 136)' }} className="bg-white p-4 shadow-md rounded-md">
          {/* Display Thumbnail if it exists */}
          {item.attributes.Thumbnail && item.attributes.Thumbnail.data && item.attributes.Thumbnail.data[0] && (
            <div className="mb-2">
              <img src={`https://fruitful-approval-a23bb4e501.strapiapp.com${item.attributes.Thumbnail.data[0].attributes.url}`} alt="Thumbnail" className="w-full h-40 object-cover mb-2 rounded-lg" />
            </div>
          )}
          {/* Display information */}
          <h2 className="text-lg font-bold mb-2" style={{ color: 'rgb(246, 246, 246)' }}><span style={{ color: '#361c54' }}>Name:</span> {item.attributes.Name}</h2>
          <p className="text-gray-700 mb-2" style={{ color: 'rgb(246, 246, 246)' }}><b style={{ color: '#361c54' }}>Email: </b>{item.attributes.Email}</p>
          <p className="text-gray-700 mb-2" style={{ color: 'rgb(246, 246, 246)' }}> <b style={{ color: '#361c54' }}>PhoneNo : </b>{item.attributes.PhoneNumber}</p>

          {/* Display PDF File if it exists */}
          {item.attributes.UploadFile && item.attributes.UploadFile.data && item.attributes.UploadFile.data[0] && (
            <div className="mt-2">
              <a href={`https://fruitful-approval-a23bb4e501.strapiapp.com/${item.attributes.UploadFile.data[0].attributes.url}`}
                target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" style={{ color: '#361c54' }}>View Details For More</a>
            </div>
          )}

          {/* Add Update button here */}
          <div className='mt-2 flex flex-wrap'>
            <Link to={`/updateData/${item.id}`}>
              <button className=" text-white font-bold py-2 px-4 rounded mr-2">
                <FaEdit style={{ color: '#361c54' }} />
              </button>
            </Link>
            <div className="flex-grow"></div>
            <button
              onClick={() => handleDelete(item.id)}
              className=" text-white font-bold py-2 px-4 rounded"
            >
              <FaTrash style={{ color: '#361c54' }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
