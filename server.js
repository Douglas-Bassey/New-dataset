const express = require("express");
const app = express();

const PORT = 3000;

//Middleware to recieve JSON data
app.use(express.json());

//Hardcoded engine student data
let engineStudents = [
  {
    id: 1,
    name: "David Okon",
    department: "Electrical Engineering",
    level: 300,
    attendance: 80,
    gpa: 3.5,
  },
  {
    id: 2,
    name: "Favour fissy",
    department: "Computer Engineering",
    level: 100,
    attendance: 75,
    gpa: 4.2,
  },

  {
    id: 3,
    name: "Elisha Xlover",
    department: "Mechanical Engineering",
    level: 100,
    attendance: 55,
    gpa: 3.0,
  },
];

//GET request to fetch all engine students
app.get("/api/engineStudents", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All the engine students",
    data: engineStudents,
  });
});

//GET a single engine student by ID
app.get("/api/engineStudents/:id", (req, res) => {
  const id = Number(req.params.id);
  const engineStudent = engineStudents.find((student) => student.id === id);
  if (!engineStudent) {
    return res.status(404).json({
      success: false,
      message: "engine student not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "engine student found",
      data: engineStudent,
    });
  }
}); 

//POST request to add a new engine student
app.post("/api/engineStudents", (req, res) => {
  const { name, department, level, attendance, gpa } = req.body;
  const newEngineStudent = {
    id: engineStudents.length + 1,
    name,
    department,
    level,
    attendance,
    gpa,
  };
  engineStudents.push(newEngineStudent);
  res.status(201).json({
    success: true,
    message: "engine student added successfully",
    data: newEngineStudent,
  });
});

//PUT request to update a engine student by ID
app.put("/api/engineStudents/:id", (req, res) => {
  const id = Number(req.params.id);
  const engineStudent = engineStudents.find((student) => student.id === id);
  if (!engineStudent) {
    return res.status(404).json({
      success: false,
      message: "engine student not found",
    });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: " provide a new engine student name.",
    });
  }

  engineStudent.name = name;

  res.status(200).json({
    success: true,
    message: "engine student name updated successfully",
    data: engineStudent,
  });
});

// PATCH - edit everything in the json data
app.patch("/api/engineStudents/:id", (req, res) => {
  const id = Number(req.params.id);
  const engineStudent = engineStudents.find((student) => student.id === id);
  if (!engineStudent) {
    return res.status(404).json({
      success: false,
      message: "engine student not found",
    });
  }
  Object.assign(engineStudent, req.body);
  res.status(200).json({
    success: true,
    message: "engine student updated successfully",
    data: engineStudent,
  });
});

//DELETE - delete engine student from the JSON
app.delete("/api/engineStudents/:id", (req, res) => {
  const engineStudentId = parseInt(req.params.id);
  const engineStudentIndex = engineStudents.findIndex((student) => student.id === engineStudentId);

  if (engineStudentIndex !== -1) {
    engineStudents.splice(engineStudentIndex, 1);
    res.status(200).json({
      success: true,
      message: `engine student with ID ${engineStudentId} deleted successfully`,
      data: engineStudents,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `engine student with ID ${engineStudentId} not found`,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
