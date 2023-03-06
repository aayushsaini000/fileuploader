import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const FileDetails = () => {
  const [tableData, setTableData] = useState([])
  const location = useLocation();
  useEffect(() => {
    getFileDetails();
  }, [])

  const getFileDetails = async () => {
    const fileId = location.pathname.split("/")[2];
    const res = await axios.get(`http://176.9.137.77:3002/get_data/${fileId}`)
    console.log(res.data)
    setTableData(res?.data)
  }
  return (
    <div>
      <div style={{ width: "80%", margin: "auto" }}>
        <Table striped bordered hover style={{ marginTop: 20 }}>
          <thead>
            <tr>
            <th>118</th>
            <th>119</th>
              <th>Name</th>
              <th>Address</th>
              <th>City/State
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => {
              return (
                <tr style={{ cursor: "pointer" }}>
                  <td>{data?.["118"]}</td>
                  <td>{data?.["119"]}</td>
                  <td>{data?.Name}</td>
                  <td>{data?.Address}</td>
                  <td>{data['City/State']}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default FileDetails
