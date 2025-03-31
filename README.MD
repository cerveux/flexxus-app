# Articles API - Flexxus Backend Challenge

## Descripción

Esta API REST desarrollada con Node.js, TypeScript y MySQL permite gestionar un sistema de artículos con autenticación JWT. Implementa los requerimientos del desafío técnico de Flexxus, incluyendo CRUD de artículos y autenticación de usuarios.

## Características principales

- Autenticación JWT para operaciones protegidas
- CRUD completo de artículos de noticias
- Búsqueda de artículos
- Documentación Swagger/OpenAPI
- Dockerizado con PostgreSQL
- Pruebas de integración con Jest
- Validación de datos
- Seguridad básica implementada

## Requisitos

- Node.js v22.14.0
- Docker y Docker Compose
- MySQL (incluido en Docker)

## Endpoints disponibles

### Registro
- `POST /api/user` - Registro de nuevo usuario

### Autenticación
- `POST /api/auth/login` - Autenticación de usuario

### Artículos (requieren autenticación)
- `POST /api/article` - Crear nuevo artículo
- `GET /api/article` - Listar todos los artículos (cuenta con paginación y filtrado)
- `PUT /api/article/:id` - Actualizar artículo
- `DELETE /api/article/:id` - Realiza una baja lógica del artículo

## Instalación y configuración

### 1. Desarrollo local (sin Docker)

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno (crear archivo `.env`):
   ```
   PORT=3000
   SECRET=tu_secreto_jwt
   HOST_DATABASE=localhost
   NAME_DATABASE=flexxus_develop
   USER_DATABASE=your_user
   PASSWORD_DATABASE=your_db_password
   NODE_ENV=development
   ```
4. Configurar variables de entorno de test (crear archivo `.env.test`):
   ```
   HOST_DATABASE=localhost
   USER_DATABASE=your_user
   NAME_DATABASE=flexxus_test
   PASSWORD_DATABASE=your_db_password
   NODE_ENV=test
   ```
5. Iniciar base de datos MySQL local
6. Crear base de datos de desarrollo flexxus_develop
7. Crear base de datos de test flexxus_test
8. Ejecutar la aplicación:
   ```bash
   npm tests
   ```
9. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

### 2. Ejecución con Docker Compose

1. Asegurarse de tener Docker y Docker Compose instalados
2. Desde la raíz del proyecto ejecutar:
   ```bash
   docker compose up -d --build
   ```
3. La API estará disponible en `http://localhost:3000`

### Variables de entorno en Docker

Las siguientes variables están configuradas en el docker-compose.yml:

- `SECRET`: Secreto para JWT
- `PORT`: Puerto de la aplicación (3000)
- `HOST_DATABASE`: Host de la base de datos (db)
- `NAME_DATABASE`: Nombre de la base de datos (mindfactory)
- `USER_DATABASE`: Usuario de la base de datos (mindfactory)
- `PASSWORD_DATABASE`: Contraseña de la base de datos (mindfactory)
- `NODE_ENV`: Entorno de ejecución (production)


## Documentación de la API

La API incluye documentación Swagger/OpenAPI disponible en:

```
http://localhost:<PORT>/docs
```

## Consideraciones de seguridad

- Las rutas de artículos requieren autenticación JWT
- Las contraseñas se almacenan hasheadas con bcrypt
- Validación de datos en todos los endpoints
- Configuración segura de JWT

## Arquitectura

La aplicación sigue una arquitectura por capas:

1. **Capa de rutas**: Maneja las solicitudes HTTP
2. **Capa de controladores**: Gestiona la lógica de la API
3. **Capa de modelos**: Interactúa con la base de datos

## Mejoras futuras

- Sistema de roles y permisos
- Logging más detallado
- Loggeo de errores a la base de datos
- Rate limiting
- Sistema de caché

## Contacto

Diego Guzman  
[mailto:guzman.diego@outlook.com.ar](mailto:guzman.diego@outlook.com.ar)  
[LinkedIn](https://www.linkedin.com/in/diego-guzman-cerveux/)