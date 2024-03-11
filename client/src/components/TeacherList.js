import React, { useEffect, useState } from "react";
import teacherService from "../services/teacherService";
import { Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Fab from "@mui/material/Fab";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dob: "",
    numClasses: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, [sortBy, searchTerm, teachers]);

  const fetchTeachers = async () => {
    try {
      const response = await teacherService.getAllTeachers();
      let sortedTeachers = [...response.data];
      if (sortBy === "age") {
        sortedTeachers.sort((a, b) => a.age - b.age);
      } else if (sortBy === "numClasses") {
        sortedTeachers.sort((a, b) => a.numClasses - b.numClasses);
      }
      if (searchTerm) {
        sortedTeachers = sortedTeachers.filter((teacher) =>
          teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setTeachers(sortedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleUpdateClick = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      fullName: teacher.fullName,
      age: teacher.age,
      dob: teacher.dob,
      numClasses: teacher.numClasses,
    });
    setOpenDialog(true);
  };

  const handleDeleteClick = async (teacherId) => {
    try {
      await teacherService.deleteTeacher(teacherId);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Failed to delete teacher. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTeacher(null);
    setFormData({
      fullName: "",
      age: "",
      dob: "",
      numClasses: "",
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      await teacherService.updateTeacher(selectedTeacher._id, formData);
      setOpenDialog(false);
      setSelectedTeacher(null);
      setFormData({
        fullName: "",
        age: "",
        dob: "",
        numClasses: "",
      });
      fetchTeachers();
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Failed to update teacher. Please try again.");
    }
  };

  const handleSortByChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "clear") {
      setSearchTerm(""); // Clear search term
      setSortBy(""); // Clear sorting
    } else {
      setSortBy(selectedValue); // Set the selected value
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <h2>Teacher List</h2>
      <TextField
        label="Search Teacher"
        value={searchTerm}
        onChange={handleSearchTermChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Select
        value={sortBy}
        onChange={handleSortByChange}
        displayEmpty
        fullWidth
        variant="outlined"
      >
        <MenuItem value="" disabled>
          Filter By
        </MenuItem>
        <MenuItem value="clear">Clear Filter</MenuItem>
        <MenuItem value="age">Age</MenuItem>
        <MenuItem value="numClasses">Number of Classes</MenuItem>
      </Select>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Number of Classes
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teachers.slice().reverse().map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.fullName}</TableCell>
                <TableCell>{teacher.age}</TableCell>
                <TableCell>
                  {new Date(teacher.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>

                <TableCell>{teacher.numClasses}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Fab
                      size="small"
                      onClick={() => handleUpdateClick(teacher)}
                      aria-label="edit"
                      color="success"
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      size="small"
                      onClick={() => handleDeleteClick(teacher._id)}
                      aria-label="delete"
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </Fab>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for updating teacher */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Teacher</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Number of Classes"
            name="numClasses"
            type="number"
            value={formData.numClasses}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TeacherList;
