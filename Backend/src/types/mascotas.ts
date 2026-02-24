/**
 * INTERFAZ: CreateVeterinariaDTO
 *
 * DTO (Data Transfer Object) para crear una nueva veterinaria
 * Define qué datos son necesarios cuando se crea una veterinaria
 *
 * Campos:
 * - name: Nombre de la veterinaria (requerido)
 * - direccion: Dirección física de la veterinaria (opcional)
 * - telefono: Número de teléfono (opcional)
 * - email: Correo electrónico de contacto (opcional)
 */

export interface CreateMascotasDTO {
  name: string;
  duenoId: string;
  edad: number;
  especie: string;
  raza: string;
  fecha: Date;
}

/**
 * INTERFAZ: UpdateVeterinariaDTO
 *
 * DTO para actualizar una veterinaria existente
 * Extiende CreateVeterinariaDTO pero todos los campos son opcionales
 * Esto permite actualizar solo algunos campos sin enviar todos
 *
 * Ejemplo: { telefono: "555-1234" } actualiza solo el teléfono
 */
export interface UpdateMascotasDTO extends Partial<CreateMascotasDTO> {}

/**
 * INTERFAZ: VeterinariaResponseDTO
 *
 * DTO para la respuesta al cliente cuando se devuelve una veterinaria
 * Incluye el ID y los timestamps de creación y actualización
 * Esto es lo que ve el cliente en las respuestas GET/POST/PUT
 */
export interface MascotasResponseDTO {
  id: String;
  name: string;
  duenoId: string;
  edad: number;
  especie: string;
  raza: string;
  fecha: Date;
  createdAt: Date;
  updatedAt: Date;
}
