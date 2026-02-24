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

export interface CreateHClinicasDTO {
  mascotaId: number;
  peso?: string;
  motivoConsulta: string;
  diagnostico?: string;
  notas?: string;
  tratamiento?: string;
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
export interface UpdateHClinicaDTO extends Partial<CreateHClinicasDTO> {}

/**
 * INTERFAZ: VeterinariaResponseDTO
 *
 * DTO para la respuesta al cliente cuando se devuelve una veterinaria
 * Incluye el ID y los timestamps de creación y actualización
 * Esto es lo que ve el cliente en las respuestas GET/POST/PUT
 */
export interface HClinicaResponseDTO {
  id: String;
  mascotaId: number;
  peso?: string;
  motivoConsulta: string;
  diagnostico?: string;
  tratamiento?: string;
  notas?: string;
  fecha: Date;
  createdAt: Date;
  updatedAt: Date;
}
