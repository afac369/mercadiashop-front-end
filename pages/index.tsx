// MercadIAshop - Tienda Online Profesional
// Archivo: pages/index.tsx

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  tipo_producto: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<Producto[]>([]);

  useEffect(() => {
    async function cargarProductos() {
      const { data } = await supabase.from('productos').select('*');
      setProductos(data || []);
    }
    cargarProductos();
  }, []);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito([...carrito, producto]);
  };

  const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio.toString()), 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">MercadIAshop</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Carrito ({carrito.length})</p>
            <p className="text-lg font-bold text-green-600">${total.toFixed(2)}</p>
          </div>
        </div>
      </header>

      {/* Productos */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Productos disponibles</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white border rounded-xl shadow hover:shadow-md transition overflow-hidden">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{producto.nombre}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{producto.descripcion}</p>
                <p className="mt-2 text-blue-700 font-bold text-lg">${producto.precio}</p>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Checkout fijo */}
      {carrito.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center md:hidden">
          <span className="font-bold text-gray-800">Total: ${total.toFixed(2)}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
            Ir al checkout
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-6 border-t mt-10">
        © {new Date().getFullYear()} MercadIAshop. Todos los derechos reservados.
      </footer>
    </div>
  );
}

