const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

document.addEventListener('DOMContentLoaded', function () {
  const $navbarBurgers = $$('.navbar-burger');

  $navbarBurgers.forEach($el =>
    $el.addEventListener('click', function () {
      // Get the target from the "data-target" attribute
      const $target = document.getElementById($el.dataset.target);

      // Toggle the class on both the "navbar-burger" and the "navbar-menu"
      $el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    }),
  );
});

$('.card').addEventListener('click', event => {
  $(event.target.dataset.target).classList.add('is-active');
  document.documentElement.classList.add('modal-open');
});

$('.modal-close').addEventListener('click', event => {
  $(event.target.dataset.target).classList.remove('is-active');
  document.documentElement.classList.remove('modal-open');
});

document.addEventListener('keypress', event => {
  if (event.key === 'Escape') {
    $('.modal.is-active').classList.remove('is-active');
    document.documentElement.classList.remove('modal-open');
  }
});
