const db = require("../config/db");

// Listar todas las aulas
// Listar todas las aulas con el DNI del estudiante incluido
exports.getAllClassrooms = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id_aula, 
        CONCAT(e.nombres, ' ', e.apellidos) AS estudiante, 
        e.dni AS estudiante_dni, 
        CONCAT(d.nombres, ' ', d.apellidos) AS docente, 
        a.aula, 
        a.turno 
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
exports.getAulaByDni = async (req, res) => {
  const { dni } = req.params;
  try {
    const [rows] = await db.query(
      `
      SELECT a.id_aula, a.aula, a.turno, 
             CONCAT(e.nombres, ' ', e.apellidos) AS estudiante,
             e.dni AS estudiante_dni,
             CONCAT(d.nombres, ' ', d.apellidos) AS docente
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
        .json({ message: "El estudiante no tiene un aula asignada." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor." });
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

  if (!id_estudiante || !id_docente) {
    return res
      .status(400)
      .json({ message: "Estudiante o docente no pueden ser nulos." });
  }

  try {
    await db.query(
      "UPDATE aulas SET id_estudiante = ?, id_docente = ?, aula = ?, turno = ? WHERE id_aula = ?",
      [id_estudiante, id_docente, aula, turno, id]
    );
    res.status(200).json({ message: "Aula actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar aula" });
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

exports.getEstudianteByDni = async (req, res) => {
  const { dni } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT id_estudiante, nombres, apellidos, turno FROM estudiantes WHERE dni = ?`,
      [dni]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "El estudiante no existe." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};
