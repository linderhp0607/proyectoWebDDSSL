const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Rutas
router.get("/", studentController.getAllStudents); // Listar estudiantes
router.get("/:dni", studentController.getStudentByDNI); // Buscar por DNI
router.post("/", studentController.createStudent); // Registrar estudiante
router.put("/:id", studentController.updateStudent); // Actualizar estudiante
router.delete("/:id", studentController.deleteStudent); // Eliminar estudiante

module.exports = router;
