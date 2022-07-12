import React from 'react';

export interface IconProps {
  title: string;
}

export function GithubIcon({ title }: IconProps) {
  return (
    <svg
      aria-hidden
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <title>{title}</title>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function PlayIcon({ title }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden
      aria-label={title}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-13.678 6.365c-.207-.146-.318-.378-.318-.614 0-.603.684-.962 1.182-.612l3.505 2.235c.199.141.318.369.318.613 0 .245-.119.473-.318.614l-3.511 2.257c-.5.353-1.182-.012-1.182-.613 0-.235.111-.467.318-.613l2.641-1.645zm9.678 3.873c0 .414-.336.75-.75.75h-3.5c-.413 0-.75-.336-.75-.75s.337-.75.75-.75h3.5c.414 0 .75.336.75.75z"
        fillRule="nonzero"
      />
    </svg>
    // <svg
    //   aria-hidden
    //   aria-label={title}
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    // >
    //   <title>{title}</title>
    //   <path d="M3 22v-20l18 10-18 10z" />
    // </svg>
  );
}

export function VideoIcon({ title }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <title>{title}</title>
      <path d="M24 23h-24v-21h24v21zm-20-1v-4h-3v4h3zm15 0v-19h-14v19h14zm4 0v-4h-3v4h3zm-6-9.5l-9 5v-10l9 5zm3 .5v4h3v-4h-3zm-16 4v-4h-3v4h3zm5-1.2l5.941-3.3-5.941-3.3v6.6zm11-7.8v4h3v-4h-3zm-16 4v-4h-3v4h3zm16-9v4h3v-4h-3zm-16 4v-4h-3v4h3z" />
    </svg>
  );
}

export function FlaskIcon({ title }: IconProps) {
  return (
    <svg aria-hidden aria-label={title} xmlns="http://www.w3.org/2000/svg">
      width="24" height="24" viewBox="0 0 24 24"
      <title>{title}</title>
      <path d="M20.759 20.498l-3.743-7.856c-1.041-2.186-2.016-4.581-2.016-7.007v-2.635h-2c0 3.391-.083 5.188 2.21 10.502l3.743 7.854c.143.302-.068.644-.377.644h-1.246l-4.88-10h-2.984c1.795-4.183 1.528-5.963 1.534-9h-2v2.635c0 2.426-.975 4.82-2.016 7.006l-3.743 7.856c-.165.348-.241.708-.241 1.058 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-13.259 1.502c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm2.5-4c-.553 0-1-.447-1-1 0-.553.447-1 1-1 .552 0 1 .447 1 1 0 .553-.448 1-1 1zm3 3c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-5-20c0-.552.448-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1h-6c-.552 0-1-.448-1-1z" />
    </svg>
  );
}

export function SlidesIcon({ title }: IconProps) {
  return (
    <svg aria-hidden aria-label={title} xmlns="http://www.w3.org/2000/svg">
      width="24" height="24" viewBox="0 0 24 24"
      <title>{title}</title>
      <path d="M7.496 20h2.633l-3.42 4h-2.627l3.414-4zm9.504-14h-8v1h8v-1zm-6 18h2v-4h-2v4zm2.855-4l3.42 4h2.627l-3.414-4h-2.633zm.145-8h-5v1h5v-1zm3-2h-8v1h8v-1zm0-2h-8v1h8v-1zm6-5h-1v8c0 1.625-5 7-7 7h-13v-15h-1v-3h22v3zm-3 0h-16v13h10.682c2.077 0 1.318-4 1.318-4s4 .825 4-1.229v-7.771zm-12 3h-1v1h1v-1zm0 2h-1v1h1v-1zm0 2h-1v1h1v-1zm0 2h-1v1h1v-1z" />
    </svg>
  );
}
