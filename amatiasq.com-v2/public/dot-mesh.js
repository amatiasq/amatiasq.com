const numberProps = [
  '--t',
  '--points',
  '--points-x',
  '--points-y',
]

const allProps = [
  ...numberProps,
  '--color-background',
  '--color-text',
];

const rand = (max, min = 0) => Math.random() * (max - min) + min;
const VELOCITY = 0.1;

registerPaint('dot-mesh', class {
  static get inputProperties() {
    return [...allProps];
  }

  #parseProps(props) {
    return Object.fromEntries(
      allProps.map(propName => [propName, parse(propName)])
    );

    function parse(name) {
      const val = props.get(name).toString().trim();
      if (!numberProps.includes(name)) return val;
      const result = parseFloat(val);
      if (!isNaN(result)) return result;
    }
  }

  paint(ctx, { width: w, height: h }, props) { //, [{ value: x }, { value: y }]) {
    const {
      '--t': t,
      '--color-background': bg = 'white',
      '--color-text': fg = 'black',
      '--points': points = 10,
    } = this.#parseProps(props);

    this.points ??= Array.from({ length: points }, () => ({
      x: rand(w),
      y: rand(h),
      vx: rand(VELOCITY, -VELOCITY),
      vy: rand(VELOCITY, -VELOCITY),
    }));

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fg;

    const circle = (x, y, radius = 2) => ctx.arc(x, y, radius, 0, 2 * Math.PI);

    // console.log(t)

    for (const point of this.points) {
      const x = (point.x + point.vx * t) % w;
      const y = (point.y + point.vy * t) % h;

      ctx.beginPath();
      circle(
        x < 0 ? x + w : x,
        y < 0 ? y + h : y
      );
      ctx.fill();
    }
  }
});
