function header() {
  return `
    <header>
      <h1>${this.tr('title')}</h1>
      <p>${this.tr('subtitle')}</p>
    </header>
  `;
}

exports.render = function (data) {
  // console.log(data.collections.post[0]);
  // console.log(Object.entries(this), args);

  return `
    ${header.call(this)}
    <ul>
      ${data.collections.post.map(x => `<li><a href="${x.url}">${x.data.title}</a></li>`).join('')}
    </ul>
  `;
};
