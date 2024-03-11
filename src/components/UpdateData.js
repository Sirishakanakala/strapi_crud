import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateData = ({ fetchData }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Thumbnail, setThumbnail] = useState(null);
  const [UploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://fruitful-approval-a23bb4e501.strapiapp.com/api/cruds/${id}?populate=*`);
        const itemData = response.data.data;

        setName(itemData.attributes.Name || '');
        setEmail(itemData.attributes.Email || '');
        setPhoneNumber(itemData.attributes.PhoneNumber || '');

    // //     const thumbnailId = itemData.attributes?.Thumbnail?.data[0]?.id;
    // // if (thumbnailId) {
    //   // const thumbnailResponse = await axios.get(`http://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/upload/files/${thumbnailId}`);
    //   // const thumbnailURL = (`http://localhost:1337${thumbnailResponse.data.url}`);
    //   // const thumbnailResponse = await axios.get(thumbnailId);

    //   const thumbnailURL = itemData.attributes.Thumbnail?.data[0]?.attributes?.url;
    //   setThumbnail(thumbnailURL);
    // // }

    // // Fetch UploadFile URL
    // // const uploadFileId = itemData.attributes?.UploadFile?.data[0]?.id;
    // // if (uploadFileId) {
    // //   // const uploadFileResponse = await axios.get(`http://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/upload/files/${uploadFileId}`);
    // //   // const uploadFileURL = (`http://localhost:1337${uploadFileResponse.data.url}`);
    // //   const uploadFileResponse = await axios.get(uploadFileId);
    // //   const uploadFileURL = (uploadFileResponse.data.url);
    // //   setUploadFile(uploadFileURL);
    // // }
    //    const uploadFileURL = itemData.attributes.UploadFile?.data[0]?.attributes?.url
    //    setUploadFile(uploadFileURL)

    const thumbnailId = itemData.attributes?.Thumbnail?.data[0]?.id;
    if (thumbnailId) {
      const thumbnailResponse = await axios.get(`https://fruitful-approval-a23bb4e501.strapiapp.com/api/upload/files/${thumbnailId}`, { responseType: 'blob' });
      const thumbnailFile = new File([thumbnailResponse.data], 'thumbnail.png', { type: 'image/png' });
      setThumbnail(thumbnailFile);
    }

    // Fetch UploadFile
    const uploadFileId = itemData.attributes?.UploadFile?.data[0]?.id;
    if (uploadFileId) {
      const uploadFileResponse = await axios.get(`https://fruitful-approval-a23bb4e501.strapiapp.com/api/upload/files/${uploadFileId}`, { responseType: 'blob' });
      const uploadFile = new File([uploadFileResponse.data], 'uploadFile.pdf', { type: 'application/pdf' }); // Adjust the file type as per your requirement
      setUploadFile(uploadFile);
    }

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching item data for update:', error);
      }
    };

    fetchItem();
  }, [id]);

  console.log("prev data:" , {Name, Email, PhoneNumber, Thumbnail, UploadFile})
  const handleChange = (e) => {
    if (e.target.name === 'thumbnail') {
      if (e.target.files.length > 0) {
        setThumbnail(e.target.files[0]);
      }
    } else if (e.target.name === 'uploadFile') {
      if (e.target.files.length > 0) {
        setUploadFile(e.target.files[0]);
      }
    } else {
      switch (e.target.name) {
        case 'name':
          setName(e.target.value);
          break;
        case 'email':
          setEmail(e.target.value);
          break;
        case 'phoneNumber':
          setPhoneNumber(e.target.value);
          break;
        default:
          break;
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // For Thumbnail (Image)
      // let thumbId;
      
      //   const thumbnailFormData = new FormData();
      //   thumbnailFormData.append('files', Thumbnail);
      //   const thumbnailResponse = await axios.post('http://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/upload', thumbnailFormData);
      //   thumbId = thumbnailResponse.data[0].id;

      // // For UploadFile (Other File Types)
      // let fileId;
     
      //   const fileFormData = new FormData();
      //   fileFormData.append('files', UploadFile);
      //   const fileResponse = await axios.post('http://Fruitfull-approval-a23bb4e501.atrqpiqpp.com/api/upload', fileFormData);
      //   fileId = fileResponse.data[0].id;
     
      //   fileId = UploadFile; // Use existing UploadFile ID if not a File
      
      let thumbId = null;
    if (Thumbnail) {
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('files', Thumbnail);
      const thumbnailResponse = await axios.post('https://fruitful-approval-a23bb4e501.strapiapp.com/api/upload', thumbnailFormData);
      thumbId = thumbnailResponse.data[0].id;
    }

    // For UploadFile (Other File Types)
    let fileId = null;
    if (UploadFile) {
      const fileFormData = new FormData();
      fileFormData.append('files', UploadFile);
      const fileResponse = await axios.post('https://fruitful-approval-a23bb4e501.strapiapp.com/api/upload', fileFormData);
      fileId = fileResponse.data[0].id;
    }

    console.log("prev" , Thumbnail);
    const dataToSend = {
      Name: Name || '',
      Email: Email || '',
      PhoneNumber: PhoneNumber || '',
      Thumbnail: thumbId || Thumbnail || 'null', // Pass the existing Thumbnail if no new one is provided
      UploadFile: fileId || UploadFile || 'null', // Pass the existing UploadFile if no new one is provided
    };

    await axios.put(`https://fruitful-approval-a23bb4e501.strapiapp.com/api/cruds/${id}`, {
      data: dataToSend,
      headers: {
        'Content-Type': 'application/json',
      },
    });

      navigate('/');
      window.location.reload();
      console.log('Data uploaded successfully', dataToSend);
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  return (
    <div>
      <h1 className="text-xl font-bold text-white text-center">Update Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name  <span className="text-red-500">*</span> {/* Add star mark */}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={Name}
                onChange={handleChange}
                placeholder="Name"
                
              />
              
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                Phone Number  <span className="text-red-500">*</span> {/* Add star mark */}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={PhoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
               
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email  <span className="text-red-500">*</span> {/* Add star mark */}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={Email}
                onChange={handleChange}
                placeholder="Email"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                Thumbnail  <span className="text-red-500">*</span> {/* Add star mark */}
              </label>
              
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="thumbnail"
                type="file"
                name="thumbnail"
                onChange={handleChange}
                required
              />
             {Thumbnail && (Thumbnail instanceof File) && (
  <img src={URL.createObjectURL(Thumbnail)} alt="Thumbnail" className="mt-2" style={{ maxWidth: '100px' }} />
)}

            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uploadFile">
                Upload File  <span className="text-red-500">*</span> {/* Add star mark */}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="uploadFile"
                type="file"
                name="uploadFile"
                required
                onChange={handleChange}
               
              />
             {UploadFile && (UploadFile instanceof File) && (
  <img src={URL.createObjectURL(UploadFile)} alt="UploadFile" className="mt-2" style={{ maxWidth: '100px' }} />
)}

            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Data
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateData;
