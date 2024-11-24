import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";

const Sidebar = () => (
  <div
    style={{
      width: 240,
      background: "#f5f5f5",
      height: "100vh",
      padding: "1rem",
    }}
  >
    <List>
      <ListItem button component={Link} to="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/roles">
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/permissions">
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Permissions" />
      </ListItem>
    </List>
  </div>
);

export default Sidebar;
