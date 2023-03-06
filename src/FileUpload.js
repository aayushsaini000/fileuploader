import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FileUpload.css';
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FileUpload = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState()
  const [fileData, setFileData] = useState([])
  const [fileDatas, setFileDatas] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  useEffect(() => {
    const loginData = localStorage.getItem("loginData")
    setLoginData(JSON.parse(loginData))
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please select a file to upload');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('file', file);
      formData.append("user_id", loginData?.id)
      try {
        await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
        const response = await axios.post(
          'http://176.9.137.77:3002/process_pdf', formData);
        toast("File uploaded");
        getFiles()

        setResponse(response.data);// set the response state
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error);
        // handle the error
      }
    } else {
      setError('Please select a file to upload');
    }
  };

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const getFiles = async () => {
    const response = await axios.get(
      `http://176.9.137.77:3002/files/${loginData?.id}`);
    setFileData(response.data)
    setFileDatas(response.data)

  }

  const handleFileDetails = (id) => {
    navigate(`/file-info/${id}`)
  }

  const handlSearch = (e) => {
    if (e.target.value != "") {
      let search = fileData.filter((item) => {
        return item?.created_at?.toLowerCase().includes(e.target.value.toLowerCase()) || item?.filename?.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setFileData(search)
    } else {
      setFileData(fileDatas)
    }
  }

  // const handlSearch = (e) => {
  //   console.log(startDate,">>>>>>>>...")
  //   if (startDate != "") {
  //     let search = fileData.filter((item) => {
  //       return item?.created_at?.toLowerCase().includes(startDate?.toLowerCase())
  //     })
  //     console.log(search,"???")
  //     setFileData(search)
  //   } else {
  //     setFileData(fileDatas)
  //   }
  // }


  return (
    <div className="file-upload-background">
      <div className="file-upload-container">
        <ToastContainer />

        <h1 className="file-upload-title">File Upload</h1>
        <form onSubmit={handleSubmit} className='m-auto'>
          <div className="form-group">
            <label htmlFor="file" className="file-upload-label">Select a file</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
            />
          </div>

          {error && <p className="file-upload-error">{error}</p>}
          <button type="submit" className="btn file-upload-btn">
            {isLoading ? <Loader /> : 'Upload'}
          </button>
          <button className="btn btn-sm btn-primary w-25" onClick={logout}>
            Logout
          </button>
        </form>
        {response.length > 0 && (
          <div className='table-responsive'>
            <table className="file-upload-table table table-hover">
              <thead>
                <tr>
                  {Object.keys(response[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <InputGroup className="w-50 p-4">
            <Form.Control
            style={{ width: 300 }}
            placeholder="Enter Filename...."
            onChange={(e) => handlSearch(e)}
            />
            <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
          </InputGroup>
        <div style={{ display: "flex", justifyContent: "space-between", width: 900, margin: "auto", paddingTop: 20 }}>
          <div style={{ display: "flex" }}>
            <h6 style={{ marginTop: 15, paddingRight: 10 }}>Start Date</h6>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <h6 style={{ marginTop: 15, paddingRight: 10 }}>End Date</h6>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
          <div style={{ display: "flex", justifyContent: "end", paddingRight: 110, marginTop: -20 }}>
            <button className='btn btn-sm btn-primary'
              onClick={(e) => handlSearch(e)}
            >Search</button>
          </div>
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <Table striped bordered hover style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>File Name</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {fileData?.map((file) => {
                return (
                  <tr style={{ cursor: "pointer" }} onClick={() => handleFileDetails(file?.id)}>
                    <td>{file?.id}</td>
                    <td>{file?.filename}</td>
                    <td>{file?.created_at}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>

    </div>
  );
};

export default FileUpload;
