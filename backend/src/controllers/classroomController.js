const db = require("../config/db");

// Listar todas las aulas
exports.getAllClassrooms = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.id_aula, e.nombres AS estudiante, e.apellidos AS estudiante_apellido, e.dni AS estudiante_dni, 
             d.nombres AS docente, d.apellidos AS docente_apellido, a.aula, a.turno 
      FROM aulas a
      JOIN estudiantes e ON a.id_estudiante = e.id_estudiante
      JOIN docentes d ON a.id_docente = d.id_docente
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Buscar aula por DNI del estudiante
exports.getClassroomByStudent = async (req, res) => {
  const { dni } = req.params;
  try {
    const [rows] = await db.query(
      `
      SELECT a.id_aula, e.nombres AS estudiante, e.apellidos AS estudiante_apellido, 
             d.nombres AS docente, d.apellidos AS docente_apellido, a.aula, a.turno 
      FROM aulas a
      JOIN estudiantes e ON a.id_estudiante = e.id_estudiante
      JOIN docentes d ON a.id_docente = d.id_docente
      WHERE e.dni = ?
    `,
      [dni]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Aula no encontrada para el estudiante" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Registrar una nueva aula
exports.createClassroom = async (req, res) => {
  const { id_estudiante, id_docente, aula, turno } = req.body;
  try {
    await db.query(
      "INSERT INTO aulas (id_estudiante, id_docente, aula, turno) VALUES (?, ?, ?, ?)",
      [id_estudiante, id_docente, aula, turno]
    );
    res.status(201).json({ message: "Aula registrada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar una aula
exports.updateClassroom = async (req, res) => {
  const { id } = req.params;
  const { id_estudiante, id_docente, aula, turno } = req.body;
  try {
    await db.query(
      "UPDATE aulas SET id_estudiante = ?, id_docente = ?, aula = ?, turno = ? WHERE id_aula = ?",
      [id_estudiante, id_docente, aula, turno, id]
    );
    res.status(200).json({ message: "Aula actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar una aula
exports.deleteClassroom = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM aulas WHERE id_aula = ?", [id]);
    res.status(200).json({ message: "Aula eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
