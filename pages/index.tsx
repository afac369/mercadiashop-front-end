// MercadIAshop - Tienda Online
// Archivo: pages/index.tsx

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const { data } = await supabase.from('productos').select('*');
      setProductos(data || []);
    }
    cargarProductos();
  }, []);

  const agregarAlCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
  };

  const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">MercadIAshop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((producto: any) => (
          <div key={producto.id} className="border rounded p-4 shadow">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-semibold mt-2">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="text-lg font-bold mt-2">${producto.precio}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 border-t">
        <h2 className="text-xl font-bold">Carrito ({carrito.length}): ${total.toFixed(2)}</h2>
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
          Ir al checkout
        </button>
      </div>
    </main>
  );
}

// Archivo adicional obligatorio:

// pages/_app.tsx
// -----------------------------
// import '../styles/globals.css';
//
// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// Este archivo asegura que los estilos globales de Tailwind se apliquen correctamente y evita errores en el build de Vercel.
