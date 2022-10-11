const PRIMARY_COLOR_KEY = 'amatiasq.com|color-brand';

function changePrimaryColor(newColor) {
  if (!newColor) return;
  doc.style.setProperty('--color-brand', newColor);
  localStorage.setItem(PRIMARY_COLOR_KEY, newColor);
  primaryColorChanged(newColor);
}

function primaryColorChanged(
  newColor = getComputedStyle(doc).getPropertyValue('--color-brand')
) {
  const event = new CustomEvent('amq-brand-color-changed', {
    detail: newColor,
  });
  doc.dispatchEvent(event);
}

Object.assign(window, { primaryColorChanged });

// doc.addEventListener('amq-brand-color-changed', async (event) => {
//   const newColor = event.detail;

//   doc.style.setProperty('--external-link', getExternalLinkBackground(newColor));

//   const $picker = await $('#color-picker');
//   $picker.value = newColor.trim();
// });

changePrimaryColor(localStorage.getItem(PRIMARY_COLOR_KEY));

// doc.dispatchEvent(new Event('amq-brand-color-ready'));

const picker = await $('#color-picker');

picker.addEventListener('input', (e) => changePrimaryColor(e.target.value));
