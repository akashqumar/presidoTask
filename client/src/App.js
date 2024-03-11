import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TeacherList from "./components/TeacherList";
import AddTeacher from "./components/AddTeacher";

function App() {
  return (
    <Container
      maxWidth="md"
      sx={{ textAlign: "center", mt: 4, position: "relative" }}
    >
      <Typography variant="h3" component="h3" gutterBottom>
        Teacher Management System
      </Typography>
      <AddTeacher />
      <TeacherList />
      <Box
        sx={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          zIndex: 999,
        }}
      ></Box>
    </Container>
  );
}

export default App;
