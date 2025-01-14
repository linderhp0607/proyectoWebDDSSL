const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { nombre_usuario, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Validar la contraseña sin encriptar (solo para pruebas)
    if (password !== user.password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Login exitoso
    res
      .status(200)
      .json({ message: "Login exitoso", usuario: user.nombre_usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
