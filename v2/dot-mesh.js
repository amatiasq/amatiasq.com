const CONTAINER_SIZE = 60; // em
const ASSUMED_FONT_SIZE = 16; // px
const CONTAINER_WIDTH = CONTAINER_SIZE * ASSUMED_FONT_SIZE; // px



class GridWorklet {
  static inputProperties = workletProperties({
    color: [
      '--color-background',
      '--color-text',
      '--grid-color',
    ],
    numeric: [
      '--grid-size',
      '--grid-transparent-width',
      // '--grid-columns',
      // '--grid-width',
      // '--grid-height',
    ],
  });


  paint(ctx, { width: w, height: h }, props) {
    const {
      '--color-background': bg = 'black',
      '--color-text': fg = 'grey',
      '--grid-color': cg = fg,
      '--grid-columns': gc,
      '--grid-size': gs = 10,
      '--grid-width': gw = gc ? w / gc : gs,
      '--grid-height': gh = gc ? gw : gs,
      '--grid-transparent-width': gt = 0,
    } = GridWorklet.inputProperties.parse(props);

    console.log({ gt })

    if (gs < 1 || gw < 1 || gh < 1) return;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = cg;

    const drawer = this.init(props);
    const half = w / 2;
    const transparent = gt / 2;
    const opaque = half - transparent;

    for (let i = 0; i <= w; i += gw) {
      for (let j = 0; j <= h; j += gh) {
        if (gt) {
          const paintOnly = Math.abs(i - half) - transparent;
          ctx.globalAlpha = Math.max(0, paintOnly) / opaque;
        }

        drawer(ctx, i, j, i + gw, j + gh);
      }
    }
  }

  init(props) {
    return this.drawCell;
  }

  drawCell(ctx, x, y, x2, y2) {
    throw new Error('Not implemented');
  }
}

registerPaint('dotted-grid', class DottedGrid extends GridWorklet {
  static inputProperties = GridWorklet.inputProperties.extend({
    numeric: [
      '--grid-point-size',
    ]
  });

  init(props) {
    const {
      '--grid-point-size': diameter = 1,
    } = DottedGrid.inputProperties.parse(props);

    const radius = diameter / 2;

    return (ctx, x, y) => this.drawCell(ctx, x, y, radius);
  }

  drawCell(ctx, x, y, radius) {
    if (randBool()) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.stroke();
    }
  }
});

registerPaint('grid', class extends GridWorklet {
  drawCell(ctx, x, y, x2, y2) {
    // horizontal
    if (randBool()) {
      ctx.beginPath();
      ctx.moveTo(x, y2);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // vertical
    if (randBool()) {
      ctx.beginPath();
      ctx.moveTo(x2, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
});

registerPaint('diagonal-grid', class extends GridWorklet {
  drawCell(ctx, x, y, x2, y2) {
    if (randBool()) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x2, y);
      ctx.lineTo(x, y2);
      ctx.stroke();
    }
  }
});

function randBool() {
  return Math.random() < 0.5;
}

function workletProperties({ text = [], numeric = [], color = [] }) {
  const all = numeric.concat(color).concat(text);

  return Object.assign(all, {
    parse(input) {
      return Object.fromEntries(
        all.map(propName => [propName, parse(propName, input.get(propName))])
      );
    },

    extend({ text: childText = [], numeric: childNumeric = [], color: childColor = [] }) {
      return workletProperties({
        text: [...text, ...childText],
        numeric: [...numeric, ...childNumeric],
        color: [...color, ...childColor],
      });
    }
  });

  function parse(name, value) {
    const val = value?.toString().trim();
    if (!val) return undefined;
    if (!numeric.includes(name)) return val;
    const result = parseFloat(val);
    if (!isNaN(result)) return result;
  }
}
