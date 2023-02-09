import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./SecondPage.css";
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Check if user information is present in local storage
  const user = localStorage.getItem('user');
  if (!user) {
    navigate('/', {
      state: {
        error: 'You must enter your details before accessing the page'
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (err: any) {
        setError(err.message);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        className="datagrid"
        rows={posts}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "title", headerName: "Title", width: 150 },
          { field: "body", headerName: "Body", width: 150 },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default SecondPage;
