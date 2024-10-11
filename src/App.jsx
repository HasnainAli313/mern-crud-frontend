import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  async function fetchUsers() {
    const response = await axios.get(API_URL);
    const content = response.data;

    setUsers(content.data);    
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditDialogOpen = (user) => {
    setUpdateUser(user);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setUpdateUser({ id: "", name: "", email: "" });
  };

  const handleAddUser = () => {
    axios
      .post(API_URL, newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: "", email: "" }); // Reset input
        fetchUsers();
        handleAddDialogClose();
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateUser = () => {
    axios
      .put(`${API_URL}/${updateUser.id}`, { name: updateUser.name, email: updateUser.email })
      .then((response) => {
        setUsers(users.map((user) => (user.id === updateUser.id ? response.data : user)));
        fetchUsers();
        handleEditDialogClose();
      })
      .catch((err) => console.error(err));
  };

  const deleteUserById = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
      <>
          <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Student Management System</h1>
      <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>
        Add User
      </Button>
          </div>
      </>
  )
}

export default App