const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const upload = require("../config/upload");

// Listar todos los docentes
router.get("/", teacherController.getAllTeachers);

// Buscar docente por DNI
router.get("/dni/:dni", teacherController.getTeacherByDNI);

// Registrar un nuevo docente con hoja de vida
router.post("/", upload.single("hoja_vida"), teacherController.createTeacher);

// Actualizar un docente
router.put("/:id", teacherController.updateTeacher);

// Eliminar un docente
router.delete("/:id", teacherController.deleteTeacher);

// Subir o actualizar hoja de vida para un docente existente
router.post(
  "/:id/upload",
  upload.single("hoja_vida"),
  teacherController.uploadHojaDeVida
);

module.exports = router;
