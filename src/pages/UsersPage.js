import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async () => {
    if (form.id) {
      await updateUser(form.id, form);
    } else {
      await createUser(form);
    }
    fetchUsers();
    setOpen(false);
    setForm({ id: null, name: "", email: "", role: "", status: "" });
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Table style={{ marginTop: "1rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => {
                    setForm(user);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          style={{
            backgroundColor: "white",
            margin: "5% auto",
            padding: "1rem",
            width: "50%",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">
            {form.id ? "Edit User" : "Add User"}
          </Typography>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersPage;
