import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-gray-500 text-white shadow-md">
      <div className="text-xl font-bold">Shop Here</div>
      <ul className="flex pr-10 gap-20">
        <li className="flex items-center gap-2 hover:scale-105 duration-700">
          <Home className="h-5 w-5" />
          <Link to='/'>Home</Link>
        </li>
        <li className="flex items-center gap-2 hover:scale-105 duration-700">
          <ShoppingCart className="h-5 w-5" />
          <Link to='/cart'>Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
