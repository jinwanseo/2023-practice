import Logo from "./tools/Logo";
import TopMenu from "./tools/TopMenu";

function Header() {
  return (
    <header
      className="
      sticky top-0 backdrop-blur 
      shadow shadow-slate-50/20 text-slate-50
      flex flex-row justify-center
      w-full 
    "
    >
      <div
        className="container
      h-14 
      flex flex-row justify-between align-center 
      px-10 
      "
      >
        {/* 로고 */}
        <Logo />
        {/* 메뉴 */}
        <TopMenu />
      </div>
    </header>
  );
}

export default Header;
