const db = require("../config/db");
const path = require("path");

// Listar todos los docentes
exports.getAllTeachers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM docentes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Buscar docente por DNI
exports.getTeacherByDNI = async (req, res) => {
  const { dni } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM docentes WHERE dni = ?", [
      dni,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.createTeacher = async (req, res) => {
  const { nombres, apellidos, dni, curso, turno } = req.body;
  const hoja_vida = req.file?.filename;

  if (!nombres || !apellidos || !dni || !curso || !turno || !hoja_vida) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    await db.query(
      "INSERT INTO docentes (nombres, apellidos, dni, hoja_vida, curso, turno) VALUES (?, ?, ?, ?, ?, ?)",
      [nombres, apellidos, dni, hoja_vida, curso, turno]
    );
    res.status(201).json({
      message: "Docente registrado exitosamente",
      hoja_vida_url: `http://localhost:5000/uploads/${hoja_vida}`, // Ruta pública para acceder al archivo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar un docente
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, dni, hoja_vida, curso, turno } = req.body;
  try {
    await db.query(
      "UPDATE docentes SET nombres = ?, apellidos = ?, dni = ?, hoja_vida = ?, curso = ?, turno = ? WHERE id_docente = ?",
      [nombres, apellidos, dni, hoja_vida, curso, turno, id]
    );
    res.status(200).json({ message: "Docente actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar un docente
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM docentes WHERE id_docente = ?", [id]);
    res.status(200).json({ message: "Docente eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Subir hoja de vida para un docente existente
exports.uploadHojaDeVida = async (req, res) => {
  const { id } = req.params;
  const fileName = req.file?.filename;

  if (!fileName) {
    return res.status(400).json({ message: "Debe subir un archivo PDF." });
  }

  try {
    await db.query("UPDATE docentes SET hoja_vida = ? WHERE id_docente = ?", [
      fileName,
      id,
    ]);
    res
      .status(200)
      .json({ message: "Hoja de vida subida con éxito", fileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir hoja de vida" });
  }
};
