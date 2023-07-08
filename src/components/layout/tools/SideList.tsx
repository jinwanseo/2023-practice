import { RiBookReadFill } from "react-icons/ri";

function SideList() {
  return (
    <ul className="flex flex-col gap-3">
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-sky-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Documentation</h6>
        </div>
      </li>
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-teal-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Components</h6>
        </div>
      </li>
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-pink-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Templates</h6>
        </div>
      </li>
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-fuchsia-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Screencasts</h6>
        </div>
      </li>
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-blue-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Playground</h6>
        </div>
      </li>
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-purple-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Resources</h6>
        </div>
      </li>
      <li>
        <div className="flex flex-row gap-3.5 items-center hover:text-orange-400 cursor-pointer">
          <span className="rounded-md bg-slate-700 p-1">
            <RiBookReadFill className="text-xl" />
          </span>
          <h6 className=" text-sm">Community</h6>
        </div>
      </li>
    </ul>
  );
}

export default SideList;
