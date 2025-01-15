const db = require("../config/db");

// Obtener todos los registros de aulas
exports.getAllAulas = async (req, res) => {
  const query = `
      SELECT 
        a.id_aula,
        e.dni AS dni_estudiante,
        CONCAT(e.nombres, ' ', e.apellidos) AS nombre_completo_estudiante,
        a.aula,
        CONCAT(d.nombres, ' ', d.apellidos) AS nombre_completo_docente,
        a.turno
      FROM aulas a
      JOIN estudiantes e ON a.id_estudiante = e.id_estudiante
      JOIN docentes d ON a.id_docente = d.id_docente;
    `;

  try {
    const [results] = await db.query(query); // Usamos await con el pool de promesas
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar aula y docente
exports.updateAula = async (req, res) => {
  const { id_aula } = req.params;
  const { aula, id_docente } = req.body;

  if (!aula || !id_docente) {
    return res
      .status(400)
      .json({ error: "Los campos aula e id_docente son obligatorios" });
  }

  const query = `UPDATE aulas SET aula = ?, id_docente = ? WHERE id_aula = ?`;

  try {
    const [results] = await db.query(query, [aula, id_docente, id_aula]);
    res.json({ message: "Aula actualizada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un registro de aula
exports.deleteAula = async (req, res) => {
  const { id_aula } = req.params;

  const query = `DELETE FROM aulas WHERE id_aula = ?`;

  try {
    const [results] = await db.query(query, [id_aula]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Aula no encontrada" });
    }
    res.json({ message: "Aula eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
