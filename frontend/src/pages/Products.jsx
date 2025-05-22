import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useCartStore} from '../store/useCartStore';
import Navbar from '../components/Navbar';

const Products = () => {
  const [selectedAddons, setSelectedAddons] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Smartphone', price: 499, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265127/-original-imah4zp7fvqp8wev_bn1ubm.jpg', addons: [{ name: 'Screen Protector', price: 15 }, { name: 'Phone Case', price: 25 }] },
    { id: 2, name: 'Laptop', price: 899, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265242/FL2C-A-BB-00_kzpxtd.jpg', addons: [{ name: 'Laptop Sleeve', price: 20 }, { name: 'Wireless Mouse', price: 30 }] },
    { id: 3, name: 'Headphones', price: 149, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265291/bluetoothheadphones-2048px-0876_ch9bnv.jpg', addons: [{ name: 'Carrying Case', price: 15 }, { name: 'Extra Ear Cushions', price: 10 }] },
    { id: 4, name: 'Smartwatch', price: 199, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265406/LEI0440_Leica_IIIf_chrom_-_Sn._580566_1951-52-M39_Blitzsynchron_front_view-6531_hf-_knyzco.jpg', addons: [{ name: 'Extra Strap', price: 20 }] },
    { id: 5, name: 'Camera', price: 350, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265406/LEI0440_Leica_IIIf_chrom_-_Sn._580566_1951-52-M39_Blitzsynchron_front_view-6531_hf-_knyzco.jpg', addons: [{ name: 'Memory Card', price: 15 }, { name: 'Tripod', price: 30 }] },
    { id: 6, name: 'Bluetooth Speaker', price: 99, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265457/35059169.jpg.aspx_bhadch.jpg', addons: [{ name: 'Carrying Case', price: 10 }] },
    { id: 7, name: 'Tablet', price: 349, image: 'https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1746265584/ipad-card-40-ipad-202410_FMT_WHH_dgyxd0.jpg', addons: [{ name: 'Keyboard Cover', price: 25 }] },
   
];

  const handleAddonChange = (productId, addonName, isChecked) => {
    setSelectedAddons((prev) => {
      const updated = { ...prev };
      if (!updated[productId]) updated[productId] = {};
      if (isChecked) updated[productId][addonName] = true;
      else delete updated[productId][addonName];
      return updated;
    });
  };

  const calculateTotalPrice = (product) => {
    const addonTotal = Object.keys(selectedAddons[product.id] || {}).reduce((sum, name) => {
      const addon = product.addons.find((a) => a.name === name);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return product.price + addonTotal;
  };

  const handleAddToCart = (product) => {
    const selectedAddonDetails = Object.keys(selectedAddons[product.id] || {}).map((name) =>
      product.addons.find((a) => a.name === name)
    );
    const totalPrice = calculateTotalPrice(product);
    addToCart(product, selectedAddonDetails, totalPrice);  
    navigate('/cart'); 
  };
  

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-4 gap-5 m-5">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-50 object-fill rounded mb-4" />
            <h3 className="text-xl">{product.name}</h3>
            <p className="text-lg font-bold">${calculateTotalPrice(product).toFixed(2)}</p>
            <div className="mt-4">
              <ul>
                {product.addons.map((addon) => (
                  <li key={addon.name} className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      id={`${product.id}-${addon.name}`}
                      onChange={(e) =>
                        handleAddonChange(product.id, addon.name, e.target.checked)
                      }
                    />
                    <label htmlFor={`${product.id}-${addon.name}`} className="ml-2">
                      {addon.name} - ${addon.price}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-700 cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
