import React, { useState, useEffect } from "react";
import { getRoles, createRole, updateRole, deleteRole } from "../services/api";
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

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", permissions: "" });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const handleSubmit = async () => {
    const permissions = form.permissions.split(",").map((perm) => perm.trim());
    if (form.id) {
      await updateRole(form.id, { ...form, permissions });
    } else {
      await createRole({ ...form, permissions });
    }
    fetchRoles();
    setOpen(false);
    setForm({ id: null, name: "", permissions: "" });
  };

 const handleDelete = async (id) => {
   try {
     console.log(`Attempting to delete role with ID: ${id}`); // Log the ID
     await deleteRole(id); // Ensure ID is correctly passed
     fetchRoles(); // Refresh roles after deletion
   } catch (error) {
     console.error(`Failed to delete role with ID ${id}:`, error);
   }
 };


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Roles
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Role
      </Button>
      <Table style={{ marginTop: "1rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => {
                    setForm({
                      ...role,
                      permissions: role.permissions.join(", "),
                    });
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(role.id)}>
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
            {form.id ? "Edit Role" : "Add Role"}
          </Typography>
          <TextField
            label="Role Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Permissions (comma-separated)"
            value={form.permissions}
            onChange={(e) => setForm({ ...form, permissions: e.target.value })}
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

export default RolesPage;
