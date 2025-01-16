const express = require("express");
const cors = require("cors");
const path = require("path");
const aulaRoutes = require("./routes/aulaRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware para servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configurar CORS y middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/classrooms", require("./routes/classroomRoutes"));
app.use("/api/aulas", aulaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
