const db = require("../config/db");

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id_estudiante, 
        nombres, 
        apellidos, 
        dni, 
        modalidad, 
        UPPER(carrera_profesional) AS carrera_profesional, -- Convertir todas las carreras a mayúsculas
        turno
      FROM estudiantes
    `);
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
      `SELECT id_estudiante, nombres, apellidos, dni, modalidad, carrera_profesional, turno
       FROM estudiantes WHERE dni = ?`,
      [dni]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.getCarreras = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT UPPER(carrera_profesional) AS carrera_profesional
      FROM estudiantes
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.createStudent = async (req, res) => {
  const { nombres, apellidos, dni, modalidad, carrera_profesional, turno } =
    req.body;

  // Validar que todos los campos requeridos estén presentes
  if (
    !nombres ||
    !apellidos ||
    !dni ||
    !modalidad ||
    !carrera_profesional ||
    !turno
  ) {
    return res.status(400).json({
      message:
        "Todos los campos son obligatorios para registrar al estudiante.",
    });
  }

  try {
    await db.query(
      "INSERT INTO estudiantes (nombres, apellidos, dni, modalidad, carrera_profesional, turno) VALUES (?, ?, ?, ?, ?, ?)",
      [nombres, apellidos, dni, modalidad, carrera_profesional, turno]
    );
    res.status(201).json({ message: "Estudiante creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, dni, modalidad, carrera_profesional, turno } =
    req.body;

  // Validar que todos los campos están presentes
  if (
    !nombres ||
    !apellidos ||
    !dni ||
    !modalidad ||
    !carrera_profesional ||
    !turno
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    await db.query(
      `UPDATE estudiantes 
       SET nombres = ?, apellidos = ?, dni = ?, modalidad = ?, carrera_profesional = ?, turno = ? 
       WHERE id_estudiante = ?`,
      [nombres, apellidos, dni, modalidad, carrera_profesional, turno, id]
    );
    res.status(200).json({ message: "Estudiante actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el estudiante" });
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
