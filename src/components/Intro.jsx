import { useState } from "react";

export default function Intro({ onEnter }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">

      {/* Door Container */}
      <div
        onClick={handleClick}
        className="relative w-48 h-80 cursor-pointer border border-[#444] overflow-hidden"
      >

        {/* Left Door */}
        <div
          className={`absolute left-0 top-0 w-1/2 h-full bg-[#A3A380] transition-transform duration-1000 ${
            open ? "-translate-x-full" : ""
          }`}
        />

        {/* Right Door */}
        <div
          className={`absolute right-0 top-0 w-1/2 h-full bg-[#8F9070] transition-transform duration-1000 ${
            open ? "translate-x-full" : ""
          }`}
        />

        {/* Middle Line */}
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black z-10" />

        {/* ENTER TEXT */}
        <div className="absolute inset-0 flex items-center justify-center z-20 text-white tracking-[0.4em] text-sm">
          ENTER
        </div>

      </div>
    </div>
  );
}