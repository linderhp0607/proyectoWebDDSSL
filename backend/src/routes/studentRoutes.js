const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController"); // Asegúrate de que esta ruta sea válida

// Ruta para obtener todos los estudiantes
router.get("/", studentController.getAllStudents);

// Ruta para buscar estudiante por DNI
router.get("/dni/:dni", studentController.getStudentByDni);

// Ruta para crear un nuevo estudiante
router.post("/", studentController.createStudent);

// Ruta para actualizar un estudiante
router.put("/:id", studentController.updateStudent);

// Ruta para eliminar un estudiante
router.delete("/:id", studentController.deleteStudent);

//listar las carreras
router.get("/carreras", studentController.getCarreras);

module.exports = router;
