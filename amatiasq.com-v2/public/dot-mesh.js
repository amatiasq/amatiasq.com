const numberProps = [
  '--points',
  '--points-x',
  '--points-y',
]

const allProps = [
  ...numberProps,
  '--color-background',
  '--color-text',
];

registerPaint('dot-mesh', class {
  static get inputProperties() {
    return [...allProps];
  }

  #parseProps(props) {
    return Object.fromEntries(allProps.map(x => {
      const val = props.get(x).toString()
      return [x, numberProps.includes(x) ? parse(val, props.get(x)) : val]
    }));

    function parse(val, name) {
      const result = parseInt(val, 10);
      return isNaN(result) ? undefined : result;
    }
  }

  paint(ctx, { width: w, height: h }, props) { //, [{ value: x }, { value: y }]) {
    const {
      '--color-background': bg = 'white',
      '--color-text': fg = 'black',
      '--points': points = 10,
      '--points-x': x = points,
      '--points-y': y = points,
    } = this.#parseProps(props);

    console.log({
      points, x, y
    })

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fg;

    const point = (x, y, radius = 2) => ctx.arc(x, y, radius, 0, 2 * Math.PI);

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        ctx.beginPath();
        point(
          i * (w / x),
          j * (h / y),
        )
        ctx.fill();
      }
    }
  }
});
