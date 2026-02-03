import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:.../stock_db";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Mongo DB conectado exitosamente");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.log("Error de Mongo DB", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo DB desconectado");
});

export default mongoose;
