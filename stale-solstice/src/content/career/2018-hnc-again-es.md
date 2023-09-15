---
---

Desarrollo de múltiples proyectos de entre 3 y 12 meses para grandes marcas europeas como AkzoNobel y Schneider Electric. La mayor parte del tiempo llevando el sombrero de Líder Frontend mientras que a veces era el único programador activo del proyecto.

Mis responsabilidades incluían estimar y asegurar que el proyecto era entregado con éxito en el tiempo acordado, implementar y mantener herramientas internas de la compañía, hacer entrevistas, asistir y entrenar a miembros del equipo y prototipar nuevas oportunidades de negocio.

<!-- end extract -->

Por ejemplo el [constructor de especificaciones](https://youtu.be/DsagfgPj9cE), el cuál es una herramienta para componer documentos de especificación técnica, las opciones disponibles y el contenido del documento es definido por el cliente vía una hoja de cálculo de Excel que incluye reglas para evitar que el usuario seleccione opciones que hagan conflicto. Este protocolo de comunicación fue diseñado por mi para facilitar que el cliente personalice la herramienta.

Di forma, diseñé e implementé herramientas y paquetes internos para reusar en nuestros proyectos:

- Un paquete de .NET Core que contenía utilidades recurrentes como autenticación y acceso a la base de datos
- Una librería de Componentes UI en AngularJS, Angular 2+ y React
- Una configuración de CI reusable para compilar nuestros proyectos con Github Actions
- Un sistema de despliegue para todos nuestros proyectos que creaba contenedores de Docker desplegados en varios clusters de Kubernetes hecho en Bash

Hago particular énfasis en esto último por dos motivos: primero, hasta ese momento cada proyecto tenía un sistema de despliegue diferente lo que se volvió cada vez más difícil de mantener. Y segundo, no sabía nada sobre Kubernetes cuando empecé este trabajo y tras un par de semanas había creado un sistema de despliegue configurable que garantizaba que la aplicación funcionara de forma permanente incluso cuando se actualizaba varias veces al día.
