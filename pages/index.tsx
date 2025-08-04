// MercadIAshop - Tienda Online Profesional con diseño avanzado y atractivo
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, BadgeCheck, Truck, ShieldCheck } from 'lucide-react';
import Head from 'next/head';

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
      <Head>
        <title>MercadIAshop | Tienda Online</title>
        <meta
          name="description"
          content="Tienda online con lo mejor en tecnología y estilo. Atención 24/7, productos ilimitados."
        />
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">MercadIAshop</h1>
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6" />
            <div>
              <p className="text-sm">Carrito ({carrito.length})</p>
              <p className="text-md font-semibold">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-100 to-blue-100 py-16 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-extrabold mb-6 text-gray-800 leading-tight">
              Descubre lo mejor en tecnología
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Calidad, estilo y atención personalizada 24/7. Compra inteligente, rápida y sin límites.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-green-700">
                <BadgeCheck className="w-5 h-5" /> Garantía segura
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <Truck className="w-5 h-5" /> Envíos rápidos
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <ShieldCheck className="w-5 h-5" /> Protección al comprador
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/500x400?text=Imagen+Hero"
              alt="Shopping Illustration"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Productos */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-10 text-center text-gray-800">Nuestros productos</h3>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-2xl border shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-60 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-lg font-bold mb-1 text-gray-800">{producto.nombre}</h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{producto.descripcion}</p>
                <p className="text-indigo-700 font-bold text-lg mt-auto mb-3">${producto.precio}</p>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sobre Nosotros */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">¿Quiénes somos?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            En MercadIAshop somos un equipo apasionado por la tecnología y la experiencia del usuario.
            Nos especializamos en ofrecer productos de calidad con un enfoque en servicio, innovación y confianza.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-50 py-16 border-t">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 text-indigo-800">Recibe nuestras ofertas</h3>
          <p className="text-gray-600 mb-6">
            Sé el primero en enterarte de promociones exclusivas y lanzamientos especiales.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-4 py-3 rounded border w-full md:w-auto flex-grow"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded"
              onClick={(e) => e.preventDefault()}
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

      {/* Checkout Móvil */}
      {carrito.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center md:hidden">
          <span className="font-bold text-gray-800">Total: ${total.toFixed(2)}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
            Ir al checkout
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-8 border-t mt-16">
        © {new Date().getFullYear()} MercadIAshop. Todos los derechos reservados.
      </footer>
    </div>
  );
}
