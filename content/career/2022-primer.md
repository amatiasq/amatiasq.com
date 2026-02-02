---
from: 2022-08
to: 2023-08
org: PrimerLearning
link: https://www.youtube.com/c/PrimerLearning
role:
  en: Senior Software Engineer
  es: Ingeniero de Software Senior

tags:
  - Unity
  - C#
  - Bash
  - en: Mentoring
    es: Mentoría
  - en: Coaching
    es: Coaching
  - en: Self-directed
    es: Autodirigido
  - en: Autonomous working
    es: Autogestionado
  - en: Initiative
    es: Iniciativa
  - en: Remote work
    es: Trabajo remoto

bullets:
  - en: Developed a C# layer to simplify the usage of the Unity Timeline API.
    es: Desarrollé una capa en C# para simplificar considerablemente el uso de Unity Timeline API.
  - en: Designed the "Gnome" concept to maximize component reusability due to the intense timeline scrubbing required for video production.
    es: Diseñé el concepto de "Gnome" para maximizar la reutilización de componentes debido a la necesidad de navegación intensiva en la línea de tiempo para la producción de videos.
  - en: Created a Unity-based chart library to visualize and explain data extracted from simulations.
    es: Desarrollé una biblioteca de gráficos basada en Unity para visualizar y explicar datos extraídos de simulaciones.
  - en: Mentored and coached Justin on software development best practices.
    es: Mentoré y asesoré a Justin en buenas prácticas de desarrollo de software.
---

The [Primer Learning][1] YouTube channel required assistance in adapting the Unity Game Engine for video production.
Our collaboration involved identifying and addressing key challenges, followed by the design and development of tools to resolve these issues effectively.

Our final solution allowed for the programmatic definition of tween sequences.
It seamlessly integrated with Unity Timeline, enabling real-time video preview during production, with the ability to scrub backward and forward as needed.

Additionally, we introduced the concept of the "Gnome," a class that dynamically enabled and disabled GameObjects as the timeline was navigated. It also created GameObjects when necessary, optimizing resource utilization.

After our work, defining a scene became as straightforward as the following C# code example:

```csharp
class Scene1 : Sequence
{
  protected override IEnumerable<Tween> Define()
  {
    using var myBlob = new Gnome<Blob>("My blob");
    myBlob.SetScale(0);

    // This becomes a timeline clip
    yield return myBlob.ScaleTo(1);

    // Another timeline clip
    yield return myBlob.MoveTo(x: 10, y: 10);

    // Two tweens on the same clip
    yield return Parallel(
      myBlob.ScaleTo(0),
      myBlob.MoveTo(x: 0, y: 0)
    );

    // "using" instruction calls myBlob.Dispose() which disables the GameObject
  }
}
```

---

El canal de YouTube de [Primer Learning][1] requirió asistencia para adaptar el motor de juegos Unity a la producción de videos.
Nuestra colaboración implicó identificar y abordar desafíos clave, seguidos por el diseño y desarrollo de herramientas para resolver estos problemas de manera efectiva.

Nuestra solución final permitió la definición programática de secuencias de eventos. Se integró perfectamente con Unity Timeline, lo que permitió una vista previa en tiempo real del video durante la producción, con la capacidad de navegar hacia atrás y adelante según fuera necesario.

Además, introdujimos el concepto de "Gnome", una clase que habilitaba y deshabilitaba dinámicamente GameObjects a medida que se navegaba por la línea de tiempo. También creaba GameObjects cuando era necesario, optimizando la utilización de recursos.

Después de nuestro trabajo, definir una escena se volvió tan sencillo como el siguiente ejemplo de código en C#:


```csharp
class Scene1 : Sequence
{
  protected override IEnumerable<Tween> Define()
  {
    using var miBlob = new Gnome<Blob>("Mi blob");
    miBlob.SetScale(0);

    // Esto se convierte en un clip de timeline
    yield return miBlob.ScaleTo(1);

    // Otro clip de timeline
    yield return miBlob.MoveTo(x: 10, y: 10);

    // Dos tweens en el mismo clip
    yield return Parallel(
      miBlob.ScaleTo(0),
      miBlob.MoveTo(x: 0, y: 0)
    );

    // La instrucción "using" llama myBlob.Dispose() que desactiva el GameObject
  }
}
```

[1]: https://www.youtube.com/c/PrimerLearning