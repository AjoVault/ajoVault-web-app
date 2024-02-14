import React, { useState, useEffect } from "react";
import Logo from "./logo";

const Navbar = () => {

    useEffect(() => {
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".NAVIGATION-MOBILE-OPEN");
        
        if (btn && menu) {
            const toggleMenu = () => {
                menu.classList.toggle("hidden");
            };
    
            btn.addEventListener("click", toggleMenu);
    
            return () => {
                btn.removeEventListener("click", toggleMenu);
            };
        }
    }, []);
    
    return (
        <div>
            <nav className="pl-7  lg:flex justify-between w-[100%] sm:block">
                <div className="w-18">
                    <Logo />
                </div>

                <section className="MOBILE-MENU flex justify-around lg:hidden md:block">
                    <div className="HAMBURGER-ICON space-y-2 mr-3 lg:hidden md:hidden">
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    </div>

                    <div>
                        <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center hidden min-h-[250px]">
                            <li><button className="font-semibold text-lg md:block">Contact Us</button></li>
                            <li><button className="primary-button ml-4 md:block">Get Started</button></li>
                        </ul>
                    </div>
                </section>

                <div className="flex ml-5 lg:block md:flex items-center hidden" name="menu">
                    <button className="font-semibold text-lg">Contact Us</button>
                    <button className="primary-button ml-4">Get Started</button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
