const express = require("express");
const router = express.Router();
const aulaController = require("../controllers/aulaController");

// Obtener todos los registros de aulas
router.get("/", aulaController.getAllAulas);

// Actualizar aula y docente
router.put("/:id_aula", aulaController.updateAula);

// Eliminar un registro de aula
router.delete("/:id_aula", aulaController.deleteAula);

module.exports = router;
