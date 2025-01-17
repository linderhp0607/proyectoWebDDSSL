const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController");

// Rutas
router.get("/", classroomController.getAllClassrooms); // Listar todas las aulas
router.get("/dni/:dni", classroomController.getAulaByDni); // Buscar aula por DNI del estudiante
router.post("/", classroomController.createClassroom); // Registrar aula
router.put("/:id", classroomController.updateClassroom); // Actualizar aula
router.delete("/:id", classroomController.deleteClassroom); // Eliminar aula

module.exports = router;
