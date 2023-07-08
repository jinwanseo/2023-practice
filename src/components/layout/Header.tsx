import Logo from "./tools/Logo";
import TopMenu from "./tools/TopMenu";

function Header() {
  return (
    <header
      className="
     col-start-1
     col-end-13
     row-start-1
     row-end-1
    sticky top-0 backdrop-blur 
    w-full h-14 
    flex flex-row justify-between align-center 
    px-10 
    shadow shadow-slate-50/20 text-slate-50"
    >
      {/* 로고 */}
      <Logo />
      {/* 메뉴 */}
      <TopMenu />
    </header>
  );
}

export default Header;
