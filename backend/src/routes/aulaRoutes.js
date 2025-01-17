const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController"); // Asegúrate de importar correctamente el controlador

// Ruta para obtener todas las aulas
router.get("/", classroomController.getAllClassrooms);

// Ruta para obtener un aula por el DNI del estudiante
router.get("/dni/:dni", classroomController.getAulaByDni);

// Ruta para crear una nueva aula
router.post("/", classroomController.createClassroom);

// Ruta para actualizar una aula
router.put("/:id", classroomController.updateClassroom);

// Ruta para eliminar una aula
router.delete("/:id", classroomController.deleteClassroom);

module.exports = router;
