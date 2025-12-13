import React from "react";
import { Toolbar, Drawer, List, ListItem, ListItemText } from "@mui/material";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 220,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            backgroundColor: "#e4d3d3ff",
            color: "#4A148C",
            borderRight: "1px solid #eee"
          }
        }}
      >
        <Toolbar />
        <List sx={{ marginTop: 2 }}>
          <ListItem button component="a" href="/">
            <ListItemText primary="Email Classifier" />
          </ListItem>

          <ListItem button component="a" href="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: "30px" }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
