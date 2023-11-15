export const tagName = 'hamburger-button';

export const template = `
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>

  <style>
    :host {
      cursor: pointer;
  
      --_color: var(--color, black);
      --_width: var(--width, 2em);
      --_thickness: var(--thickness, 3px);
      --_spacing: var(--spacing, 7px);
      --_opacity: var(--opacity, 0.5);
  
      --translation-x: calc(var(--_thickness) + var(--_spacing));
    }
  
    .bar {
      width: var(--_width);
      height: var(--_thickness);
      background-color: var(--_color);
      margin: var(--_spacing) 0;
      opacity: var(--_opacity);
  
      will-change: transform, opacity;
      transition: 0.4s;
      transition-property: transform, opacity;
    }
  
    :host(:hover) .bar {
      opacity: 1;
    }
  
    :host([active]) .bar:first-of-type {
      transform: translate(0, var(--translation-x)) rotate(45deg);
    }
  
    :host([active]) .bar:nth-child(2) {
      opacity: 0;
    }
  
    :host([active]) .bar:last-of-type {
      transform: translate(0, calc(var(--translation-x) * -1)) rotate(-45deg);
    }
  </style>
`;

export class HamburgerButton extends HTMLElement {
  #shadowRoot;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'open' });
    this.#shadowRoot.innerHTML = template;
  
    this.bars = this.shadowRoot.querySelectorAll(".bar");
    this.toggle = this.toggle.bind(this);
  }

  connectedCallback() {
    this.addEventListener("click", this.toggle);
  }
  disconnectedCallback() {
    this.addEventListener("click", this.toggle);
  }

  toggle() {
    this.toggleAttribute("active");

    const event = new CustomEvent('toggle', {
      detail: {
        active: this.hasAttribute("active")
      }
    });

    this.dispatchEvent(event);
  }
}

customElements.define('hamburger-button', HamburgerButton);