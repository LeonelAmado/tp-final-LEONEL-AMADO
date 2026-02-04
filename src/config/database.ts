// Importar mongoose para trabajar con MongoDB
import mongoose from "mongoose";

// URI de conexión a MongoDB
// Si no existe en variables de entorno, usa base de datos local
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/stock_db";

/**
 * Función para conectar a la base de datos MongoDB
 * Maneja los errores de conexión e imprime mensajes de estado
 */
export const connectDB = async (): Promise<void> => {
  try {
    // Intentar conectar a MongoDB usando la URI especificada
    await mongoose.connect(MONGODB_URI);
    console.log("Mongo DB conectado exitosamente");
  } catch (error) {
    // Si hay error, registrarlo y detener la aplicación
    console.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

/**
 * Event listeners para eventos de conexión de MongoDB
 */

// Se ejecuta cuando hay un error en la conexión activa
mongoose.connection.on("error", (err) => {
  console.log("Error de Mongo DB", err);
});

// Se ejecuta cuando la conexión a MongoDB se desconecta
mongoose.connection.on("disconnected", () => {
  console.log("Mongo DB desconectado");
});

// Exportar instancia de mongoose para usarla en otros archivos
export default mongoose;
