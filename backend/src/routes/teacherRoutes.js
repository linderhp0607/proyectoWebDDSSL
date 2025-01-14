const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// Rutas
router.get("/", teacherController.getAllTeachers); // Listar docentes
router.get("/:dni", teacherController.getTeacherByDNI); // Buscar por DNI
router.post("/", teacherController.createTeacher); // Registrar docente
router.put("/:id", teacherController.updateTeacher); // Actualizar docente
router.delete("/:id", teacherController.deleteTeacher); // Eliminar docente

module.exports = router;
