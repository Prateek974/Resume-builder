import React from 'react';
const Navbar = () => {
    return(
        <header className="border-b p-4 bg-white-500 shadow-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold text-indigo-600">
          SmartResume AI
        </div>
        <ul className="flex space-x-6 text-gray-600 font-medium">
          <li><a href="/" className="hover:text-indigo-600">Home</a></li>
          <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
          <li><a href="/pricing" className="hover:text-indigo-600">Blog</a></li>
          <li><a href="/pricing" className="hover:text-indigo-600">Features</a></li>
          <li><a href="/pricing" className="hover:text-indigo-600">Pricing</a></li>
        </ul>
      </nav>
    </header>

    );
};
 export default Navbar;