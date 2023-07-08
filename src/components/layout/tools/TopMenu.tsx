import { IoIosLogIn, IoLogoGithub } from "react-icons/io";

function TopMenu() {
  return (
    <div className="flex flex-row items-center text-sm">
      <nav>
        <ul className="flex flex-row gap-7 items-center">
          <li className="cursor-pointer hover:text-sky-400">Docs</li>
          <li className="cursor-pointer hover:text-sky-400">Components</li>
          <li className="cursor-pointer hover:text-sky-400">Bolg</li>
          <li className="cursor-pointer hover:text-sky-400">Showcase</li>
        </ul>
      </nav>
      <ul className="flex flex-row gap-7 pl-7 border-l-[1px] border-slate-50/10 ml-7 items-center text-2xl">
        <li>
          <IoIosLogIn className="hover:text-sky-400" />
        </li>
        <li>
          <IoLogoGithub className="hover:text-sky-400" />
        </li>
      </ul>
    </div>
  );
}

export default TopMenu;
