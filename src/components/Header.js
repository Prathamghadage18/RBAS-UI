import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        RBAC Admin Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
