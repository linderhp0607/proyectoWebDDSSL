const db = require("../config/db");

// Listar todos los estudiantes
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estudiantes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Buscar estudiante por DNI
exports.getStudentByDNI = async (req, res) => {
  const { dni } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM estudiantes WHERE dni = ?", [
      dni,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Registrar un nuevo estudiante
exports.createStudent = async (req, res) => {
  const { nombres, apellidos, dni, modalidad, carrera_profesional, turno } =
    req.body;
  try {
    await db.query(
      "INSERT INTO estudiantes (nombres, apellidos, dni, modalidad, carrera_profesional, turno) VALUES (?, ?, ?, ?, ?, ?)",
      [nombres, apellidos, dni, modalidad, carrera_profesional, turno]
    );
    res.status(201).json({ message: "Estudiante registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar un estudiante
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, dni, modalidad, carrera_profesional, turno } =
    req.body;
  try {
    await db.query(
      "UPDATE estudiantes SET nombres = ?, apellidos = ?, dni = ?, modalidad = ?, carrera_profesional = ?, turno = ? WHERE id_estudiante = ?",
      [nombres, apellidos, dni, modalidad, carrera_profesional, turno, id]
    );
    res.status(200).json({ message: "Estudiante actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar un estudiante
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