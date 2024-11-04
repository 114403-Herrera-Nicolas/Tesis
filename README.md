# Tesis: Aplicación de Búsqueda de Cabañas

Este proyecto es parte de mi tesis en la Universidad Tecnologica Nacional y consiste en una aplicación web para buscar y reservar cabañas, conectada con Mercado Pago para gestionar los pagos. La aplicación está desarrollada usando **Spring Boot** para el backend y **Angular** para el frontend.

## Características

- **Búsqueda de Cabañas**: Filtra por ubicación, características, disponibilidad, y otros criterios.
- ![Captura de pantalla_4-11-2024_124629_localhost](https://github.com/user-attachments/assets/6f919d6e-69e4-4dd6-82ce-477364ca7375)
- **Ver detalles de una Cabaña**: ver descripccion, características, reseñas y disponibilidad.
![Captura de pantalla_4-11-2024_12478_localhost](https://github.com/user-attachments/assets/605b6dd9-247c-46ac-81a9-66c08126035c)

![Captura de pantalla_4-11-2024_124819_localhost](https://github.com/user-attachments/assets/2cfc9b3e-d585-4362-be2f-93b58f4fc476)
- **Reservas y Pagos**: Permite realizar reservas de cabañas y procesar pagos a través de Mercado Pago.
- ![Captura de pantalla_4-11-2024_124746_localhost](https://github.com/user-attachments/assets/6c38a4fe-ce1f-4134-b3d3-76a110f69b28)
- **Gestión de Usuarios**: Registro y autenticación de usuarios, con roles de usuario y administrador.
- **Notificaciones**: Confirmación de reservas y pagos.
- **Reportes de Reservas**: Visualización de reportes y estadísticas de reservas en gráficos.

## Tecnologías

- **Frontend**: Angular
- **Backend**: Spring Boot
- **Base de Datos**: PostgreSql
- **Pagos**: Integración con API de Mercado Pago
- **Control de Versiones**: Git/GitHub

## Estructura del Proyecto

- **frontend/**: Contiene el código de Angular para la interfaz de usuario.
- **backend/**: Contiene el código de Spring Boot para la API REST.



## Configuración del Entorno

### Prerrequisitos

- **Node.js** y **npm** (para el frontend en Angular)
- **Java 17** o superior (para Spring Boot)
- **PostgreSQL** (para la base de datos)
- **Cuenta de Mercado Pago** con credenciales de API

### Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tuusuario/tesis-cabanas.git
   cd tesis-cabanas
