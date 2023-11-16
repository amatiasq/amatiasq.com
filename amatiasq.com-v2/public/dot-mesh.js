class DotMeshPainter {
  // someday when the browser supports it
  // static get inputArguments() {
  //   return [
  //     0, // x
  //     0, // y
  //   ];
  // }

  static get inputProperties() {
    return [
      '--color-background',
      '--color-text',
      '--points-x',
      '--points-y',
    ];
  }

  paint(ctx, geom, props) { //, [{ value: x }, { value: y }]) {
    const x = parseInt(props.get('--points-x').toString(), 10);
    const y = parseInt(props.get('--points-y').toString(), 10);

    ctx.fillStyle = props.get('--color-background');
    ctx.fillRect(0, 0, geom.width, geom.height);
    ctx.fillStyle = props.get('--color-text')

    function point(x, y, radius = 2) {
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
    }

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        ctx.beginPath();
        console.log({ i, j, x, y, width: geom.width, height: geom.height })
        point(
          i * (geom.width / x),
          j * (geom.height / y),
        )
        ctx.fill();
      }
    }
  }
}

registerPaint('dot-mesh', DotMeshPainter);