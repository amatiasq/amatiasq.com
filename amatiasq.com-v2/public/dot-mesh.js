function log(x) {
  console.log(x);
  return x;
}

class GridWorklet {
  static get inputProperties() {
    return log(workletProperties({
      color: [
        '--color-background',
        '--color-text',
        '--grid-color',
      ],
      numeric: [
        '--grid-size',
        // '--grid-columns',
        // '--grid-width',
        // '--grid-height',
      ],
    }));
  }

  paint(ctx, { width: w, height: h }, props) {
    const {
      '--color-background': bg = 'black',
      '--color-text': fg = 'grey',
      '--grid-color': cg = fg,
      '--grid-columns': gc,
      '--grid-size': gs = 10,
      '--grid-width': gw = gc ? w / gc : gs,
      '--grid-height': gh = gc ? gw : gs,
    } = GridWorklet.inputProperties.parse(props);

    if (gs < 1 || gw < 1 || gh < 1) return;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = cg;

    const drawer = this.init(props);

    for (let i = 0; i <= w; i += gw) {
      for (let j = 0; j <= h; j += gh) {
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
  static get inputProperties() {
    return log(GridWorklet.inputProperties.extend({
      numeric: [
        '--grid-point-size',
      ]
    }));
  }

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
    console.log(name, value)
    const val = value?.toString().trim();
    if (!val) return undefined;
    if (!numeric.includes(name)) return val;
    const result = parseFloat(val);
    if (!isNaN(result)) return result;
  }

}

// function drawDigit(context, value, x, y, height) {
//   if (value === 1) {
//     drawOne(context, x, y, height);
//   } else if (value === 0) {
//     drawZero(context, x, y, height);
//   }
// }

// function drawOne(context, x, y, height) {
//   const width = height / 2;
//   const startX = x + width / 2;

//   context.beginPath();
//   context.moveTo(startX, y);
//   context.lineTo(startX, y + height);
//   context.stroke();
// }

// function drawZero(context, x, y, height) {
//   const width = height / 2;
//   const centerX = x + width / 2;
//   const centerY = y + height / 2;
//   const radius = width / 2;

//   context.beginPath();
//   context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//   context.stroke();
// }

// function drawFancyOne(context, x, y, height) {
//   const width = height / 2;
//   const baseX = x + width / 2;
//   const topY = y + height * 0.2;

//   // Draw the slanting part of '1'
//   context.beginPath();
//   context.moveTo(baseX - width * 0.2, topY);
//   context.lineTo(baseX, y);
//   context.lineTo(baseX, y + height);
//   context.stroke();

//   // Draw the base of '1'
//   context.beginPath();
//   context.moveTo(baseX - width * 0.2, y + height);
//   context.lineTo(baseX + width * 0.2, y + height);
//   context.stroke();
// }

// function drawFancyZero(context, x, y, height) {
//   const width = height / 2;
//   const centerX = x + width / 2;
//   const centerY = y + height / 2;
//   const radius = width / 2;

//   // Outer circle
//   context.beginPath();
//   context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//   context.stroke();

//   // Inner circle for the '0' to give a donut shape
//   context.beginPath();
//   context.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
//   context.stroke();
// }

// // Example usage
// function drawFancyDigit(context, value, x, y, height) {
//   if (value === 1) {
//     drawFancyOne(context, x, y, height);
//   } else if (value === 0) {
//     drawFancyZero(context, x, y, height);
//   }
// }
