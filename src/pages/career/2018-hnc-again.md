---
from: 2018-10
#to: 2021-04
to: 2021-05
org: Hack&Craft
link: https://hackandcraft.com/
role:
  en: Lead Frontend Developer
  es: Desarrollador Líder Frontend

labels:
  - Typescript
  - Angular 7-11
  - React
  - Bash
  - C#
  - F#
  - SQL
  - Docker
  - Kubernetes
  - Azure
  - DevOps
  - Github Actions
  - en: Mentoring
    es: Tutoría
---

Development of multiple projects of between 3 and 12 months for big european brands like AkzoNobel and Schneider Electric. Most of the time wearing the Frontend Lead hat while sometimes being the only active developer for the project.

My responsibilities included to estimate and ensure the project was delivered successfully in the agreed time, implement and maintain internal tools of the company, run interviews, onboard and mentor other engineers and prototype new business opportunities.

<!-- end extract -->

For example the [Specification builder](https://youtu.be/DsagfgPj9cE), which is a tool to compose specification documents, the available options and content of the document defined by the client via an Excel spreadsheet which included rules to avoid the user selecting conflicting options. This comunication protocol was designed by me to make it easier for the client to customise their tool.

I shaped, design and implemented internal tools and packages to be reused across our projects:

- .NET Core package to contain recurrent utilities like authentication and database access
- UI Components Library in AngularJS, Angular 2+ and React
- Reusable CI configuration to compile our projects using Github Actions
- A deployment adaptable to all our projects that created Docker containers to be deployed into several Kubernetes clusters built in Bash

I'd particularly highlight the last one for two reasons: first before that point each project had it's own custom deployment system and that was getting increasingly complex to maintain. And second, I knew nothing regarding Kubernetes when I started this work and after a few weeks I created a customisable deployment system that guaranteed no downtime even when the application was updated several times a day.

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
