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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🛍️ MercadIAshop</h1>
        <div className="text-right">
          <p className="text-sm">Carrito ({carrito.length})</p>
          <p className="font-bold">${total.toFixed(2)}</p>
        </div>
      </header>

      {/* Productos */}
      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Productos disponibles</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{producto.nombre}</h3>
                <p className="text-sm text-gray-600">{producto.descripcion}</p>
                <p className="mt-2 text-lg font-bold">${producto.precio}</p>
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

      {/* Checkout fijo (solo visible si hay productos) */}
      {carrito.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex justify-between items-center md:hidden">
          <span className="font-bold">Total: ${total.toFixed(2)}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Ir al checkout</button>
        </div>
      )}
    </div>
  );
}

