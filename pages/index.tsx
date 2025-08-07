import Head from 'next/head';
import Image from 'next/image';
import { ShoppingCart, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>MercadlAshop</title>
      </Head>

      {/* Fondo + Overlay */}
      <div className="relative min-h-screen text-white">
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-[-1]"></div>

        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-2]"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* Contenido principal */}
        <div className="relative z-10">

          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 shadow-md bg-black bg-opacity-40 backdrop-blur">
            <h1 className="text-2xl font-bold">MercadlAshop</h1>
            <div className="flex items-center gap-4">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm">$0.00</span>
            </div>
          </header>

          {/* Hero */}
          <section className="max-w-5xl mx-auto px-4 py-12 text-center md:text-left grid md:grid-cols-2 gap-8 items-center">
           <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Descubre lo mejor en tecnología</h2>
            <p className="text-lg mb-6">
            Calidad, estilo y atención personalizada 24/7. Compra inteligente, rápida y sin límites.
            </p>
            <button className="bg-white text-orange-500 font-semibold px-6 py-2 rounded hover:bg-orange-100 transition">
            Ver productos
            </button>
           </div>
             <div className="flex justify-center">
              <Image
               src="/hero-img.png"
               alt="Hero"
               width={500}
               height={350}
               priority
               className="rounded shadow-lg"
             />
           </div>
          </section>


          {/* Beneficios */}
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
              <div>
                <ShieldCheck className="mx-auto text-orange-400 w-8 h-8" />
                <h3 className="font-bold mt-2">Garantía segura</h3>
              </div>
              <div>
                <Truck className="mx-auto text-orange-400 w-8 h-8" />
                <h3 className="font-bold mt-2">Envíos rápidos</h3>
              </div>
              <div>
                <BadgeCheck className="mx-auto text-orange-400 w-8 h-8" />
                <h3 className="font-bold mt-2">Protección al comprador</h3>
              </div>
            </div>
          </section>

          {/* Placeholder Productos */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Productos destacados</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded shadow hover:shadow-lg transition">
                    <div className="w-full h-40 bg-gray-200 bg-opacity-30 rounded mb-4"></div>
                    <h3 className="font-semibold text-lg text-white">Producto {i}</h3>
                    <p className="text-sm text-gray-200">$99.99</p>
                    <button className="mt-2 text-orange-300 hover:underline">Ver más</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-black bg-opacity-40 backdrop-blur py-8 text-center text-white">
            <p>&copy; {new Date().getFullYear()} MercadlAshop. Todos los derechos reservados.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
