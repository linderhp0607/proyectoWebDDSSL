const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const upload = require("../config/upload");

// Rutas existentes
router.get("/", teacherController.getAllTeachers);
router.get("/dni/:dni", teacherController.getTeacherByDNI);
router.post("/", upload.single("hoja_vida"), teacherController.createTeacher); // Aquí usamos multer para manejar la subida de la hoja de vida
router.put("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

// Nueva ruta para actualizar la hoja de vida
router.post(
  "/:id/upload",
  upload.single("hoja_vida"),
  teacherController.uploadHojaDeVida
);

module.exports = router; // Corrección del espacio aquí
