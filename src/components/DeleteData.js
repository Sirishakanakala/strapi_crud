import React from 'react';
import axios from 'axios';

const DeleteData = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:1337/crud/${id}`);
      console.log('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteData;
