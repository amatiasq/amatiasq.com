# Filosofía del Proyecto

Este es el portfolio profesional de A. Matías Quezada. Es su carta de presentación profesional.

## Principios fundamentales

### Simplicidad y minimalismo
- El código debe ser simple y fácil de entender
- Menos es más: si se puede hacer con menos código, hazlo con menos
- Evitar abstracciones innecesarias
- No añadir features que no se han pedido

### HTML mínimo
- El HTML generado debe ser el mínimo posible
- Evitar wrappers y contenedores innecesarios
- Estructura semántica y limpia

### JavaScript mínimo
- Evitar JavaScript del lado del cliente siempre que sea posible
- Preferir CSS para animaciones e interacciones
- Si no es absolutamente necesario, no lo incluyas

### Rendimiento
- La página debe cargar lo más rápido posible
- Optimizar imágenes y assets
- Evitar dependencias pesadas

### Elegancia
- El diseño debe ser limpio y profesional
- Consistencia visual en toda la página
- Animaciones sutiles, no llamativas (esto es profesional, es serio)
- Las animaciones de texto son para texto, no para cajas o contenedores

## Internacionalización

La página es multilingüe (español e inglés, posiblemente catalán en el futuro). Usar siempre el componente `<Tr>` para textos que deben ser traducibles.

## Timeline de Career

El timeline de experiencia profesional tiene configuración en `src/components/organisms/CareerTimeline.astro`:

```javascript
const PIXELS_PER_YEAR = 60; // Ajustar para cambiar la distancia entre años
```

Las fechas de los trabajos son sagradas - no modificar fechas reales. Si se necesita ajustar visualización, usar campos separados.
