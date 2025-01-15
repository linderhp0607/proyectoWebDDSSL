const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const upload = require("../config/upload");

// Rutas existentes
router.get("/", teacherController.getAllTeachers);
router.get("/dni/:dni", teacherController.getTeacherByDNI);
router.post("/", teacherController.createTeacher);
router.put("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

// Nueva ruta para subir hoja de vida
router.post(
  "/:id/upload",
  upload.single("hoja_vida"),
  teacherController.uploadHojaDeVida
);

module.exports = router;
