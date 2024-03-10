import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Thumbnail, setThumbnail] = useState(null);
  const [UploadFile, setUploadFile] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // For Thumbnail (Image)
      let thumbId;
      if (Thumbnail) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('files', Thumbnail);
        const thumbnailResponse = await axios.post('https://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/upload', thumbnailFormData);
        thumbId = thumbnailResponse.data[0].id;
      }

      // For UploadFile (Other File Types)
      let fileId;
      if (UploadFile) {
        const fileFormData = new FormData();
        fileFormData.append('files', UploadFile);
        const fileResponse = await axios.post('https://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/upload', fileFormData);
        fileId = fileResponse.data[0].id;
      }

      await axios.post('https://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/cruds', {
        data: {
          Name,
          Email,
          PhoneNumber,
          Thumbnail: thumbId,
          UploadFile: fileId
        }
      });

      navigate('/');
      window.location.reload();
      console.log('Data added successfully');
      
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  
  return (
    <>
      <div className="container mx-auto mt-8">
        <h2 className="text-center text-2xl font-semibold text-white text-center mb-4">Add New Data</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full py-8 px-6 md:px-8">
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input type="text" className="form-input w-full" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input type="email" className="form-input w-full" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}  required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input type="tel" className="form-input w-full" id="phoneNumber" placeholder="Enter Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">Thumbnail</label>
                  <input type="file" className="form-input w-full" id="thumbnail" onChange={(e) => setThumbnail(e.target.files[0])} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="uploadFile" className="block text-gray-700 text-sm font-bold mb-2">Upload File</label>
                  <input type="file" className="form-input w-full" id="uploadFile" onChange={(e) => setUploadFile(e.target.files[0])} required/>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
