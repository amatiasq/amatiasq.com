---
title: Pathfinding

links:
  live: https://repos.amatiasq.com/pathfinding/

image:
  src: pathfinding.png
  en: In map with purple obstacles a yellow path is highligthed to reach from point A to point B
  es: En un mapa con obstáculos violetas un camino amarillo se ilumina para llegar de punto A a punto B

labels:
  - Algorithm
  - Canvas
  - Webpack

pinned: true
iframe:
  style: |
    height: 650px;
---

Pathfinding (more specifically A\*) is an algorithm that finds a path between two points.

In this case an area is drawn with some obstacles in the way (in purple) and two white points are added. The algorithm quickly finds a viable (not necessarily the most efficient) path between both points and paints it yellow.

One of the most difficult aspects of this algorithm is we don't know if there's even a valid path between both points, if there is none we want to know it with the less computational cost possible.

This is a better visualization of Pathfinding with different algorithms: https://clementmihailescu.github.io/Pathfinding-Visualizer/

---

Pathfinding (más específicamente A\*) es un algoritmo que encuentra un cammino entre dos puntos.

En este caso se dibuja un 'area con obstáculos en el camino (en púrpura) y se añaden dos puntos blancos. El algoritmo cacula ráapidamente un camino viable (no necesariamente el más mejor) entre ambos puntos y lo pinta de amarillo.

Uno de los aspectos más complicados de este algoritmo es que no sabemos si quiera si hay un camino válido entre ambos puntos, en caso de que no sea posible conectarlos queremos saberlo con el menor coste computacional posible.

Aquí se puede visualizar mejor el Pathfinding con diferentes algoritmos: https://clementmihailescu.github.io/Pathfinding-Visualizer/
