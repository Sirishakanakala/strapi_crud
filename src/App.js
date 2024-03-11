import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes,  Link} from 'react-router-dom';
import Home from './components/Home';
import DisplayData from './components/DisplayData';
import AddData from './components/AddData';
import UpdateData from './components/UpdateData'; // Import UpdateData component

function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://fruitful-approval-a23bb4e501.strapiapp.com/api/cruds?populate=*');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://Fruitfull-approval-a23bb4e501.strapiapp.com/api/cruds/${id}?populate=*`);
      console.log('Data deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
  }
  };
 
  const handleUpdate = async (id, newData) => {
    try {
      await axios.put(`https://Fruitfull-approval-a23bb4e501.strapiapp.com/api/cruds/${id}`, newData);
      console.log('Data updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#1d112b' }}> 
        <div>
          <Home />
          <div>
            <Link to={`/addData`}>
            <div className='px-10'>
               <button className="bg-white hover:bg-purple-100 text-black font-bold py-2 px-10 rounded mr-2">
                     AddData
               </button>
            </div>
          </Link>
            <Routes>
              <Route
                path="/addData"
                element={<AddData fetchData={fetchData} />}
              />
              <Route
                path="/updateData/:id"
                element={<UpdateData fetchData={fetchData} />}
              />
              <Route
                path="/"
                element={<DisplayData data={data} handleDelete={handleDelete} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

