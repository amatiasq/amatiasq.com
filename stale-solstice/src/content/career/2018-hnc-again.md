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
  - Github
  - Github Actions
  - en: Mentoring
    es: Tutoría
---

Development of multiple projects of between 3 and 12 months for big European brands like AkzoNobel and Schneider Electric. Most of the time wearing the Frontend Lead hat while sometimes being the only active developer for the project.

My responsibilities included estimating and ensuring the project was delivered successfully in the agreed time, implementing and maintaining internal tools of the company, running interviews, onboarding and mentoring other engineers and prototyping new business opportunities.

<!-- end extract -->

For example the [Specification builder](https://youtu.be/DsagfgPj9cE), which is a tool to compose specification documents, the available options and content of the document defined by the client via an Excel spreadsheet which included rules to avoid the user selecting conflicting options. This communication protocol was designed by me to make it easier for the client to customize their tool.

I shaped, designed and implemented internal tools and packages to be reused across our projects:

- .NET Core package to contain recurrent utilities like authentication and database access
- UI Components Library in AngularJS, Angular 2+ and React
- Reusable CI configuration to compile our projects using Github Actions
- A deployment adaptable to all our projects that created Docker containers to be deployed into several Kubernetes clusters built in Bash

I'd particularly highlight the last one for two reasons: first, before that point, each project had its custom deployment system and that was getting increasingly complex to maintain. And second, I knew nothing about Kubernetes when I started this work and after a few weeks, I created a customizable deployment system that guaranteed no downtime even when the application was updated several times a day.
