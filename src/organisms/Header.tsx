import './Header.scss';

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <h1 className="Header__name"></h1>

        {/* <h3 className="Header__title">Senior Software Engineer</h3> */}
        <div className="Header__photo"></div>
      </div>
    </header>
  );
}
