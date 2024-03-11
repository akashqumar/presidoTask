import React, { useState } from "react";
import teacherService from "../services/teacherService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

function AddTeacher() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dob: "",
    numClasses: "",
  });

  const [open, setOpen] = useState(false); // State to manage dialog open/close

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await teacherService.addTeacher(formData);
      handleClose(); // Close dialog after successful submission
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Failed to add teacher. Please try again.");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear form
    setFormData({ fullName: "", age: "", dob: "", numClasses: "" });
  };

  return (
    <Box sx={{ position: "absolute", top: 45, right: 45, zIndex: 999 }}>
      <Fab
        size="small"
        onClick={handleOpen}
        aria-label="delete"
        color="primary"
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form to add a new teacher.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Number of Classes"
              type="number"
              name="numClasses"
              value={formData.numClasses}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Teacher
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AddTeacher;
