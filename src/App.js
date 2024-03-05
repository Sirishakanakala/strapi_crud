import React from 'react';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
import DisplayData from './components/DisplayData';
import AddData from './components/AddData';

function App() {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/crud/${id}`);
      console.log('Data deleted successfully');
      // Refresh data after deletion
      // You can also implement optimistic UI update by removing the deleted item from the state directly.
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <div>
        <Home />
        <div>
        <div className="flex justify-center items-center py-8">
         <h1 className="text-2xl font-bold">Data</h1>
        </div>
          <DisplayData handleDelete={handleDelete} />
          <AddData />
        </div>
      </div>
    </>
  );
}

export default App;

