const db = require("../config/db");

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estudiantes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.getStudentByDni = async (req, res) => {
  const { dni } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT id_estudiante, nombres, apellidos, dni FROM estudiantes WHERE dni = ?",
      [dni]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    res.status(200).json(rows[0]); // Devuelve el primer resultado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.createStudent = async (req, res) => {
  const { nombres, apellidos, dni } = req.body;
  try {
    await db.query(
      "INSERT INTO estudiantes (nombres, apellidos, dni) VALUES (?, ?, ?)",
      [nombres, apellidos, dni]
    );
    res.status(201).json({ message: "Estudiante creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, dni } = req.body;
  try {
    await db.query(
      "UPDATE estudiantes SET nombres = ?, apellidos = ?, dni = ? WHERE id_estudiante = ?",
      [nombres, apellidos, dni, id]
    );
    res.status(200).json({ message: "Estudiante actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM estudiantes WHERE id_estudiante = ?", [id]);
    res.status(200).json({ message: "Estudiante eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
