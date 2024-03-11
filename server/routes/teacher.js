const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// GET all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single teacher
router.get("/:id", getTeacher, (req, res) => {
  res.json(res.teacher);
});

// Create a new teacher
router.post("/", async (req, res) => {
  const teacher = new Teacher({
    fullName: req.body.fullName,
    age: req.body.age,
    dob: req.body.dob,
    numClasses: req.body.numClasses,
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a teacher
router.patch("/:id", getTeacher, async (req, res) => {
  if (req.body.fullName != null) {
    res.teacher.fullName = req.body.fullName;
  }
  if (req.body.age != null) {
    res.teacher.age = req.body.age;
  }
  if (req.body.dob != null) {
    res.teacher.dob = req.body.dob;
  }
  if (req.body.numClasses != null) {
    res.teacher.numClasses = req.body.numClasses;
  }
  try {
    const updatedTeacher = await res.teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a teacher
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Deleted teacher" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter teachers based on age and number of classes
router.post("/filter", async (req, res) => {
  const { age, numClasses } = req.body;

  try {
    let query = {};

    if (age) {
      query.age = age;
    }

    if (numClasses) {
      query.numClasses = numClasses;
    }

    const filteredTeachers = await Teacher.find(query);

    res.json(filteredTeachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTeacher(req, res, next) {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.teacher = teacher; // Attach the teacher object to res
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
