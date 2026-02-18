# Buenas Profes!!!

# Comentario: las anotaciones que dejé en cada archivo, son para ayudarme a mi a entender como funciona cada cosa.

# Los comentarios los hizo Copilot, puede haber errores.

# El README, los CURL y los collection los hizo copilot tambien.

# El trabajo lo hice pasando a mano lo hecho en clase para poder entender tag por tag, luego lo adapté a Patitas Felices.

# Elegí hacerlo en Mongo DB ya que para SQL debo pedir prestada una PC y me es incómodo.

# Espero que todo esté Ok. Saludos!

# 🏥 Sistema de Gestión Veterinaria - API REST

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-brightgreen.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-v4.18-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

> API REST completa para la gestión de clínicas veterinarias e historiales clínicos, desarrollada con Node.js, Express, TypeScript y MongoDB.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Autenticación](#-autenticación)
- [Validaciones](#-validaciones)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Autor](#-autor)
- [Licencia](#-licencia)

## ✨ Características

- ✅ **Autenticación JWT** con tokens seguros
- ✅ **Autorización basada en roles** (user/admin)
- ✅ **Validación robusta** con express-validator
- ✅ **Protección contra fuerza bruta** con rate limiting
- ✅ **Encriptación de contraseñas** con bcrypt
- ✅ **Base de datos MongoDB** con Mongoose ODM
- ✅ **TypeScript** para seguridad de tipos
- ✅ **CRUD completo** para veterinarias e historiales clínicos
- ✅ **Manejo centralizado de errores**
- ✅ **Middleware de autenticación y autorización**
- ✅ **Código completamente documentado**

## 🛠️ Tecnologías

### Backend

- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Superset tipado de JavaScript
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Seguridad

- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcrypt** - Encriptación de contraseñas
- **express-rate-limit** - Protección contra fuerza bruta
- **express-validator** - Validación de datos

### Desarrollo

- **ts-node-dev** - Recarga automática en desarrollo
- **dotenv** - Gestión de variables de entorno

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MongoDB](https://www.mongodb.com/) (v6.0 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/LeonelAmado/tp-intermedio-LEONEL-AMADO.git
cd tp-intermedio-LEONEL-AMADO
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/veterinaria_db

# JWT Secret (¡Cambia esto en producción!)
JWT_SECRET=tu_secreto_super_seguro_aqui

# JWT Expiration
JWT_EXPIRATION=24h

# Node Environment
NODE_ENV=development
```

### 4. Iniciar MongoDB

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

### 5. Ejecutar el servidor

**Modo desarrollo (con recarga automática):**

```bash
npm run dev
```

**Modo producción:**

```bash
npm run build
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno

| Variable         | Descripción                    | Valor por Defecto                          |
| ---------------- | ------------------------------ | ------------------------------------------ |
| `PORT`           | Puerto del servidor            | `3000`                                     |
| `MONGO_URI`      | URI de conexión a MongoDB      | `mongodb://localhost:27017/veterinaria_db` |
| `JWT_SECRET`     | Clave secreta para JWT         | -                                          |
| `JWT_EXPIRATION` | Tiempo de expiración del token | `24h`                                      |
| `NODE_ENV`       | Entorno de ejecución           | `development`                              |

## 💻 Uso

### Crear primer usuario administrador

Opción 1: Usando MongoDB Shell

```bash
mongosh
use veterinaria_db
db.users.updateOne(
  { email: "admin@veterinaria.com" },
  { $set: { role: "admin" } }
)
```

Opción 2: Variable de entorno

```env
ADMIN_EMAIL=admin@veterinaria.com
```

### Ejemplos básicos

Ver archivo [CURLS.md](CURLS.md) para ejemplos completos de uso.

**Registro:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "leonel",
    "email": "leonel@example.com",
    "password": "Secure123!",
    "nombre": "Leonel",
    "apellido": "Amado"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "leonel@example.com",
    "password": "Secure123!"
  }'
```

## 📁 Estructura del Proyecto

```
tp-intermedio-LEONEL-AMADO/
├── public/                 # Archivos estáticos
│   └── index.html
├── src/
│   ├── config/            # Configuraciones
│   │   └── database.ts    # Conexión a MongoDB
│   ├── controllers/       # Controladores (lógica de negocio)
│   │   ├── auth.controller.ts
│   │   ├── veterinarias.controller.ts
│   │   └── hClinicas.controller.ts
│   ├── middlewares/       # Middlewares personalizados
│   │   ├── auth.middleware.ts
│   │   ├── dto.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/            # Modelos de Mongoose
│   │   ├── users.model.ts
│   │   ├── veterinarias.model.ts
│   │   └── hClinicas.model.ts
│   ├── routes/            # Definición de rutas
│   │   ├── auth.routes.ts
│   │   ├── veterinarias.routes.ts
│   │   └── hClinicas.routes.ts
│   ├── services/          # Servicios (lógica de datos)
│   │   ├── auth.service.ts
│   │   ├── veterinarias.service.ts
│   │   └── hClinicas.service.ts
│   ├── types/             # Tipos y DTOs TypeScript
│   │   ├── appError.ts
│   │   ├── auth.ts
│   │   ├── categories.ts
│   │   └── express.d.ts
│   ├── validators/        # Validadores de entrada
│   │   ├── auth.validator.ts
│   │   └── category.validator.ts
│   └── index.ts           # Punto de entrada principal
├── .env                      # Variables de entorno (no incluido)
├── .gitignore
├── CURLS.md                  # Documentación de endpoints con ejemplos curl
├── postman-collection.json   # Colección para Postman
├── thunder-collection.json   # Colección para Thunder Client (VS Code)
├── package.json
├── README.md
└── tsconfig.json             # Configuración de TypeScript
```

## 🌐 API Endpoints

### Autenticación

| Método | Endpoint         | Descripción             | Auth | Rol |
| ------ | ---------------- | ----------------------- | ---- | --- |
| POST   | `/auth/register` | Registrar nuevo usuario | ❌   | -   |
| POST   | `/auth/login`    | Iniciar sesión          | ❌   | -   |

### Veterinarias

| Método | Endpoint               | Descripción                    | Auth | Rol   |
| ------ | ---------------------- | ------------------------------ | ---- | ----- |
| GET    | `/api/veterinaria`     | Obtener todas las veterinarias | ✅   | -     |
| GET    | `/api/veterinaria/:id` | Obtener veterinaria por ID     | ❌   | -     |
| POST   | `/api/veterinaria`     | Crear nueva veterinaria        | ✅   | admin |
| PUT    | `/api/veterinaria/:id` | Actualizar veterinaria         | ✅   | admin |
| DELETE | `/api/veterinaria/:id` | Eliminar veterinaria           | ✅   | admin |

### Historiales Clínicos

| Método | Endpoint                   | Descripción                   | Auth | Rol   |
| ------ | -------------------------- | ----------------------------- | ---- | ----- |
| GET    | `/api/historiaClinica`     | Obtener todos los historiales | ❌   | -     |
| GET    | `/api/historiaClinica/:id` | Obtener historial por ID      | ❌   | -     |
| POST   | `/api/historiaClinica`     | Crear nuevo historial         | ✅   | admin |
| PUT    | `/api/historiaClinica/:id` | Actualizar historial          | ✅   | admin |
| DELETE | `/api/historiaClinica/:id` | Eliminar historial            | ✅   | admin |

## 🔐 Autenticación

### JWT (JSON Web Tokens)

La API utiliza JWT para autenticación. El token debe incluirse en el header de las peticiones:

```bash
Authorization: Bearer <TOKEN>
```

**Estructura del token:**

```json
{
  "id": "66cfda46e58c1435000000001",
  "username": "leonel",
  "email": "leonel@example.com",
  "role": "user",
  "nombre": "Leonel",
  "apellido": "Amado",
  "iat": 1738272400,
  "exp": 1738358800
}
```

### Roles

- **user**: Usuario estándar (lectura)
- **admin**: Administrador (lectura y escritura)

## ✔️ Validaciones

### Contraseñas

Las contraseñas deben cumplir:

- ✅ Mínimo 8 caracteres
- ✅ Al menos un número (0-9)
- ✅ Al menos una mayúscula (A-Z)
- ✅ Al menos un carácter especial (!@#$%^&\*)

**Ejemplo válido:** `Secure123!`

### Rate Limiting

Los endpoints de autenticación están protegidos:

- **Límite:** 5 intentos por IP
- **Ventana:** 15 minutos

## 📝 Ejemplos de Uso

### 1. Flujo completo de autenticación

```bash
# 1. Registrar usuario
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

# 2. Hacer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "leonel@example.com",
    "password": "Secure123!"
  }'
# Respuesta: { "token": "eyJhbGci..." }
```

### 2. Crear una veterinaria (requiere admin)

```bash
curl -X POST http://localhost:3000/api/veterinaria/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Veterinaria Central",
    "direccion": "Av. Principal 500",
    "telefono": "555-0001",
    "email": "central@vet.com"
  }'
```

### 3. Crear historial clínico (requiere admin)

```bash
curl -X POST http://localhost:3000/api/historiaClinica/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "paciente": "Firulais",
    "dueñoId": 123,
    "edad": 4,
    "raza": "Labrador",
    "peso": 22.5,
    "motivoConsulta": "Control anual",
    "diagnostico": "Saludable",
    "tratamiento": "Ninguno",
    "fecha": "2024-01-15T10:00:00.000Z"
  }'
```

Ver más ejemplos en [CURLS.md](CURLS.md)

## 🧪 Testing

### Colecciones de Prueba

El proyecto incluye colecciones listas para importar en Postman o Thunder Client:

#### Thunder Client (VS Code)

1. Instala la extensión [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) en VS Code
2. Abre Thunder Client
3. Haz clic en "Import" (menú)
4. Selecciona el archivo [`thunder-collection.json`](thunder-collection.json)
5. Las variables `{{token}}`, `{{veterinariaId}}` y `{{historialId}}` se actualizarán automáticamente

**Flujo de prueba:**

1. Ejecuta "Registro de Usuario"
2. Ejecuta "Login de Usuario" (guarda el token automáticamente)
3. Usa cualquier endpoint con el token ya configurado

#### Postman

1. Abre [Postman](https://www.postman.com/downloads/)
2. Click en "Import" → "Upload Files"
3. Selecciona [`postman-collection.json`](postman-collection.json)
4. La colección incluye:
   - Variables de entorno pre-configuradas
   - Scripts de prueba automáticos
   - Guardado automático de tokens e IDs

**Variables incluidas:**

- `baseUrl`: `http://localhost:3000`
- `token`: Se actualiza automáticamente al hacer login
- `veterinariaId`: Se actualiza al crear una veterinaria
- `historialId`: Se actualiza al crear un historial

#### Tests Unitarios (próximamente)

```bash
# Ejecutar tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

## 🚢 Despliegue

### Docker (próximamente)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables de entorno en producción

Asegúrate de configurar:

- `NODE_ENV=production`
- `JWT_SECRET` con valor aleatorio seguro
- `MONGO_URI` con URI de MongoDB Atlas o servidor remoto

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 👤 Autor

**Leonel Amado**

- GitHub: [@LeonelAmado](https://github.com/LeonelAmado)
- Email: leonel@example.com

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📚 Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Mongoose](https://mongoosejs.com/)
- [Documentación de JWT](https://jwt.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Desarrollado con ❤️ para la gestión veterinaria**
