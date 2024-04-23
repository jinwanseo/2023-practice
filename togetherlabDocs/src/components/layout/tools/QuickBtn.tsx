import React from "react";
import { IoSearch } from "react-icons/io5";
import { PiCommand } from "react-icons/pi";

function QuickBtn() {
  return (
    <button className="flex flex-row justify-between items-center p-2 border-[1px] border-slate-50/10 rounded-md bg-slate-700/50">
      <div className="flex flex-row gap-3 items-center">
        <IoSearch />
        <h6 className=" text-sm">Quick search...</h6>
      </div>
      <div className="flex flex-row items-center">
        <PiCommand />
        <span className="uppercase text-sm">k</span>
      </div>
    </button>
  );
}

export default QuickBtn;
