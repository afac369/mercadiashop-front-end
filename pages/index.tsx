// MercadIAshop - Tienda Online Profesional con diseño avanzado
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart } from 'lucide-react';

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
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">MercadIAshop</h1>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <div>
              <p className="text-sm">Carrito ({carrito.length})</p>
              <p className="text-md font-semibold">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Descubre nuestros productos exclusivos</h2>
          <p className="text-lg text-gray-600">La mejor tecnología y estilo a un solo clic. Calidad, confianza y atención personalizada 24/7.</p>
        </div>
      </section>

      {/* Productos */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-2xl border shadow hover:shadow-xl transition overflow-hidden flex flex-col">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-64 object-cover" />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-1">{producto.nombre}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{producto.descripcion}</p>
                <p className="text-indigo-600 font-bold text-lg mt-auto mb-3">${producto.precio}</p>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Checkout */}
      {carrito.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center md:hidden">
          <span className="font-bold text-gray-800">Total: ${total.toFixed(2)}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
            Ir al checkout
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-6 border-t mt-16">
        © {new Date().getFullYear()} MercadIAshop. Todos los derechos reservados.
      </footer>
    </div>
  );
}

