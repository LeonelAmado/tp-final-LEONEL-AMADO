# API CURL Commands

**Base URL:** `http://localhost:3000`

> **Nota:** Reemplaza `<TOKEN>` con el token JWT obtenido en el login

---

## 🔐 AUTENTICACIÓN (AUTH)

### 1. Registro de Usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "leonel",
    "email": "leonel@example.com",
    "password": "Secure123!",
    "nombre": "Leonel",
    "apellido": "Amado",
    "direccion": "Calle Principal 123",
    "telefono": "555-1234",
    "mascotas": ["Firulais", "Michi"]
  }'
```

**Respuesta exitosa (201):**

```json
{
  "message": "Usuario creado exitosamente"
}
```

---

### 2. Login de Usuario

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "leonel@example.com",
    "password": "Secure123!"
  }'
```

**Respuesta exitosa (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2ZkYTQ2ZTU4YzE0MzUwMDAwMDAwMSIsInVzZXJuYW1lIjoibGVvbmVsIiwiZW1haWwiOiJsZW9uZWxAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5vbWJyZSI6Ikxlb25lbCIsImFwZWxsaWRvIjoiQW1hZG8iLCJpYXQiOjE3MzgyNzI0MDAsImV4cCI6MTczODM1ODgwMH0.xxxxx"
}
```

---

## 🏥 VETERINARIAS

### 3. Obtener todas las Veterinarias

```bash
curl -X GET http://localhost:3000/api/veterinaria/ \
  -H "Authorization: Bearer <TOKEN>"
```

**Respuesta exitosa (200):**

```json
[
  {
    "id": "66cfda46e58c1435000000001",
    "name": "Veterinaria Central",
    "direccion": "Av. Principal 500",
    "telefono": "555-0001",
    "email": "central@vet.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 4. Obtener Veterinaria por ID

```bash
curl -X GET http://localhost:3000/api/veterinaria/66cfda46e58c1435000000001
```

**Respuesta exitosa (200):**

```json
{
  "id": "66cfda46e58c1435000000001",
  "name": "Veterinaria Central",
  "direccion": "Av. Principal 500",
  "telefono": "555-0001",
  "email": "central@vet.com",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 5. Crear Veterinaria (ADMIN)

```bash
curl -X POST http://localhost:3000/api/veterinaria/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Veterinaria Nueva",
    "direccion": "Calle Nueva 456",
    "telefono": "555-9999",
    "email": "nueva@vet.com"
  }'
```

**Respuesta exitosa (201):**

```json
{
  "id": "66cfda46e58c1435000000002",
  "name": "Veterinaria Nueva",
  "direccion": "Calle Nueva 456",
  "telefono": "555-9999",
  "email": "nueva@vet.com",
  "createdAt": "2024-01-15T10:45:00.000Z",
  "updatedAt": "2024-01-15T10:45:00.000Z"
}
```

---

### 6. Actualizar Veterinaria (ADMIN)

```bash
curl -X PUT http://localhost:3000/api/veterinaria/66cfda46e58c1435000000001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "telefono": "555-8888",
    "direccion": "Dirección Actualizada",
    "email": "actualizado@vet.com"
  }'
```

**Respuesta exitosa (200):**

```json
{
  "id": "66cfda46e58c1435000000001",
  "name": "Veterinaria Central",
  "direccion": "Dirección Actualizada",
  "telefono": "555-8888",
  "email": "actualizado@vet.com",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:50:00.000Z"
}
```

---

### 7. Eliminar Veterinaria (ADMIN)

```bash
curl -X DELETE http://localhost:3000/api/veterinaria/66cfda46e58c1435000000001 \
  -H "Authorization: Bearer <TOKEN>"
```

**Respuesta exitosa (200):**

```json
{
  "mensaje": "Veterinaria con ID 66cfda46e58c1435000000001 eliminada exitosamente"
}
```

---

## 🏥 HISTORIALES CLÍNICOS

### 8. Obtener todos los Historiales Clínicos

```bash
curl -X GET http://localhost:3000/api/historiaClinica/
```

**Respuesta exitosa (200):**

```json
[
  {
    "_id": "66cfda46e58c1435000000010",
    "paciente": "Firulais",
    "dueñoId": 123,
    "edad": 4,
    "raza": "Labrador",
    "peso": 22.5,
    "motivoConsulta": "Control anual",
    "diagnostico": "Saludable",
    "tratamiento": "Ninguno",
    "fecha": "2024-01-15T10:00:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### 9. Obtener Historial Clínico por ID

```bash
curl -X GET http://localhost:3000/api/historiaClinica/66cfda46e58c1435000000010
```

**Respuesta exitosa (200):**

```json
{
  "_id": "66cfda46e58c1435000000010",
  "paciente": "Firulais",
  "dueñoId": 123,
  "edad": 4,
  "raza": "Labrador",
  "peso": 22.5,
  "motivoConsulta": "Control anual",
  "diagnostico": "Saludable",
  "tratamiento": "Ninguno",
  "fecha": "2024-01-15T10:00:00.000Z",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

---

### 10. Crear Historial Clínico (ADMIN)

```bash
curl -X POST http://localhost:3000/api/historiaClinica/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "paciente": "Michi",
    "dueñoId": 456,
    "edad": 2,
    "raza": "Gato Persa",
    "peso": 4.5,
    "motivoConsulta": "Vacunación",
    "diagnostico": "Sin problemas",
    "tratamiento": "Vacuna triple felina",
    "fecha": "2024-01-16T14:30:00.000Z"
  }'
```

**Respuesta exitosa (201):**

```json
{
  "_id": "66cfda46e58c1435000000011",
  "paciente": "Michi",
  "dueñoId": 456,
  "edad": 2,
  "raza": "Gato Persa",
  "peso": 4.5,
  "motivoConsulta": "Vacunación",
  "diagnostico": "Sin problemas",
  "tratamiento": "Vacuna triple felina",
  "fecha": "2024-01-16T14:30:00.000Z",
  "createdAt": "2024-01-16T14:35:00.000Z",
  "updatedAt": "2024-01-16T14:35:00.000Z"
}
```

---

### 11. Actualizar Historial Clínico (ADMIN)

```bash
curl -X PUT http://localhost:3000/api/historiaClinica/66cfda46e58c1435000000010 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "peso": 23.0,
    "tratamiento": "Cambio de pauta terapéutica",
    "diagnostico": "Hipertensión leve"
  }'
```

**Respuesta exitosa (200):**

```json
{
  "_id": "66cfda46e58c1435000000010",
  "paciente": "Firulais",
  "dueñoId": 123,
  "edad": 4,
  "raza": "Labrador",
  "peso": 23.0,
  "motivoConsulta": "Control anual",
  "diagnostico": "Hipertensión leve",
  "tratamiento": "Cambio de pauta terapéutica",
  "fecha": "2024-01-15T10:00:00.000Z",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-16T15:00:00.000Z"
}
```

---

### 12. Eliminar Historial Clínico (ADMIN)

```bash
curl -X DELETE http://localhost:3000/api/historiaClinica/66cfda46e58c1435000000010 \
  -H "Authorization: Bearer <TOKEN>"
```

**Respuesta exitosa (200):**

```json
{
  "message": "Historial clínico eliminado!"
}
```

---

## 📝 RESUMEN DE ENDPOINTS

| Método | Endpoint                   | Autenticación | Rol Requerido |
| ------ | -------------------------- | ------------- | ------------- |
| POST   | `/auth/register`           | ❌            | -             |
| POST   | `/auth/login`              | ❌            | -             |
| GET    | `/api/veterinaria/`        | ✅            | -             |
| GET    | `/api/veterinaria/:id`     | ❌            | -             |
| POST   | `/api/veterinaria/`        | ✅            | admin         |
| PUT    | `/api/veterinaria/:id`     | ✅            | admin         |
| DELETE | `/api/veterinaria/:id`     | ✅            | admin         |
| GET    | `/api/historiaClinica/`    | ❌            | -             |
| GET    | `/api/historiaClinica/:id` | ❌            | -             |
| POST   | `/api/historiaClinica/`    | ✅            | admin         |
| PUT    | `/api/historiaClinica/:id` | ✅            | admin         |
| DELETE | `/api/historiaClinica/:id` | ✅            | admin         |

---

## 🔒 Validación de Contraseña

La contraseña debe cumplir:

- ✅ Mínimo 8 caracteres
- ✅ Al menos un número (0-9)
- ✅ Al menos una mayúscula (A-Z)
- ✅ Al menos un carácter especial (!@#$%^&\* etc)

**Ejemplo válido:** `Secure123!`

---

## ⚠️ Rate Limiting

Los endpoints de autenticación (`/auth/register` y `/auth/login`) tienen límite de **5 intentos por IP cada 15 minutos**.

---

## 🛠️ Instrucciones de Uso

1. **Inicia el servidor:**

   ```bash
   npm run dev
   ```

2. **Registra un usuario:**

   ```bash
   curl -X POST http://localhost:3000/auth/register ...
   ```

3. **Obtén el token de login:**

   ```bash
   curl -X POST http://localhost:3000/auth/login ...
   ```

4. **Usa el token en las peticiones protegidas:**
   ```bash
   curl -X GET http://localhost:3000/api/veterinaria/ \
     -H "Authorization: Bearer <TOKEN>"
   ```

---

## 📞 Ejemplo Completo: Flujo Típico

```bash
# 1. Registrar usuario
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "leonel",
    "email": "leonel@example.com",
    "password": "Secure123!",
    "nombre": "Leonel",
    "apellido": "Amado"
  }')
echo "Registro: $TOKEN_RESPONSE"

# 2. Hacer login
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "leonel@example.com",
    "password": "Secure123!"
  }')
echo "Login: $LOGIN_RESPONSE"

# Extrae el token (necesitarás instalar jq para parsear JSON)
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

# 3. Obtener veterinarias con token
curl -X GET http://localhost:3000/api/veterinaria/ \
  -H "Authorization: Bearer $TOKEN"
```
