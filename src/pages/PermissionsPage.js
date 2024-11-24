import React, { useState, useEffect } from "react";
import {
  getPermissions,
  addPermission,
  deletePermission,
} from "../services/api";
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

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const data = await getPermissions(); // Ensure `getPermissions` returns an array with `id` fields
    setPermissions(data);
  };


  const handleSubmit = async () => {
    if (form.name) {
      await addPermission(form.name);
      fetchPermissions();
      setOpen(false);
      setForm({ name: "" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePermission(id);
      fetchPermissions(); // Refresh permissions list
    } catch (error) {
      console.error("Error while deleting permission:", error);
    }
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Permissions
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Permission
      </Button>
      <Table style={{ marginTop: "1rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(permission.id)}
                >
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
          <Typography variant="h6">Add Permission</Typography>
          <TextField
            label="Permission Name"
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
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

export default PermissionsPage;
