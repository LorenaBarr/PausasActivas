/back
├── src
│   ├── config
│   │   └── db.js                 ← Conexión a SQL Server
│   ├── controllers
│   │   ├── authController.js
│   │   ├── usuariosController.js
│   │   └── actividadesController.js
│   ├── middlewares
│   │   ├── authMiddleware.js     ← Verifica JWT
│   │   └── errorHandler.js       ← Manejo de errores
│   ├── routes
│   │   ├── auth.js
│   │   ├── usuarios.js
│   │   └── actividades.js
│   ├── services
│   │   ├── authService.js        ← Lógica del login/registro
│   │   ├── usuarioService.js
│   │   └── actividadService.js
│   ├── utils
│   │   └── jwt.js                ← Funciones para firmar/verificar tokens
│   └── index.js                  ← Inicia el servidor
├── .env
├── package.json
├── testConnection.js


| Carpeta        | Función                                                        |
| -------------- | -------------------------------------------------------------- |
| `config/`      | Configuración (DB, variables globales)                         |
| `controllers/` | Lógica que responde a cada ruta                                |
| `services/`    | Funciones que se conectan a la DB y hacen consultas SQL        |
| `routes/`      | Define las rutas y vincula los controladores                   |
| `middlewares/` | Autenticación, manejo de errores, validaciones                 |
| `utils/`       | Funciones auxiliares (ej. JWT, envío de correos, fechas, etc.) |
