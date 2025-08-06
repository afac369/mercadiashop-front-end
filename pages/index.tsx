// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';
import { ShoppingCart, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>MercadlAshop</title>
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-800">MercadlAshop</h1>
        <div className="flex items-center gap-4">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-sm">$0.00</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-orange-100 text-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Descubre lo mejor en tecnología</h2>
            <p className="text-lg mb-6">
              Calidad, estilo y atención personalizada 24/7. Compra inteligente, rápida y sin límites.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition">
              Ver productos
            </button>
          </div>
          <div className="hidden md:block">
            <Image
              src="/hero-img.png"
              alt="Hero"
              width={600}
              height={400}
              className="rounded"
            />
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <ShieldCheck className="mx-auto text-orange-500 w-8 h-8" />
            <h3 className="font-bold mt-2">Garantía segura</h3>
          </div>
          <div>
            <Truck className="mx-auto text-orange-500 w-8 h-8" />
            <h3 className="font-bold mt-2">Envíos rápidos</h3>
          </div>
          <div>
            <BadgeCheck className="mx-auto text-orange-500 w-8 h-8" />
            <h3 className="font-bold mt-2">Protección al comprador</h3>
          </div>
        </div>
      </section>

      {/* Placeholder Productos */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Productos destacados</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                <h3 className="font-semibold text-lg">Producto {i}</h3>
                <p className="text-sm text-gray-600">$99.99</p>
                <button className="mt-2 text-orange-500 hover:underline">Ver más</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} MercadlAshop. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
<div className="relative">
  <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
  {/* todo el contenido aquí */}
</div>
