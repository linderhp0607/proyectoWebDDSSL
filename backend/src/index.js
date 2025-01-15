const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de la carpeta uploads
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/classrooms", require("./routes/classroomRoutes"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
