"use client";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "../../public/icons/HamBurger";
import Close from "../../public/icons/Close";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (href) => pathName === href;

  return (
    <div className="flex items-center justify-between h-24 px-4 text-slate-500  gap-x-96 border-b-4 md:px-20">
      <div>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className="md:w-24 md:h-24 "
        />
      </div>
      <div className="hidden md:flex flex-grow justify-between">
        <ul className="flex justify-between gap-x-16">
          <li className="hover:text-black hover:font-bold">
            <Link href="/">Tickets</Link>
          </li>
          <li className="hover:text-black hover:font-bold">
            <Link href="/">New Ticket</Link>
          </li>
          <li className="hover:text-black hover:font-bold">
            <Link href="/">Reports</Link>
          </li>
        </ul>
      </div>
      <div className="hidden md:block">
        <Link href="/" className="hover:text-black hover:font-bold">
          Login
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <Close className="w-6 h-6" />
          ) : (
            <Hamburger className="w-6 h-6" />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center">
            <li
              className={`py-2 ${
                isActive("/Tickets") ? "text-black font-bold" : ""
              }`}
            >
              <Link
                href="/Tickets"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                Tickets
              </Link>
            </li>
            <li
              className={`py-2 ${
                isActive("/NewTicket") ? "text-black font-bold" : ""
              }`}
            >
              <Link
                href="/NewTicket"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                New Ticket
              </Link>
            </li>
            <li
              className={`py-2 ${
                isActive("/Reports") ? "text-black font-bold" : ""
              }`}
            >
              <Link
                href="/Reports"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                Reports
              </Link>
            </li>
            <li className="py-2">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
