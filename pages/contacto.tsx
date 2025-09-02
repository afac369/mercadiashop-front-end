import Head from "next/head";
import LayoutPro from "../components/LayoutPro";

export default function ContactoPage() {
  return (
    <LayoutPro>
      <Head>
        <title>Contacto | MercadIAshop</title>
        <meta name="description" content="Ponte en contacto con el equipo de MercadIAshop." />
      </Head>

      <main className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                <input type="text" id="name" name="name" className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
                <textarea id="message" name="message" rows={5} className="w-full rounded-xl border px-3 py-2"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">Enviar Mensaje</button>
              <p className="text-xs text-center opacity-70">Este formulario es una demostración. La lógica de envío no está implementada.</p>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Otras formas de contactar</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email de Soporte</h3>
                <p className="opacity-80">¿Preguntas sobre tu pedido? Escríbenos.</p>
                <a href="mailto:mercadia.web@gmail.com" className="text-emerald-500 hover:underline">mercadia.web@gmail.com</a>
              </div>
              <div>
                <h3 className="font-semibold">Horario de Atención</h3>
                <p className="opacity-80">Lunes a Viernes<br/>9:00 AM - 6:00 PM (CLT)</p>
              </div>
              <div>
                <h3 className="font-semibold">Preguntas Frecuentes</h3>
                <p className="opacity-80">Puede que tu duda ya esté resuelta en nuestra página de soporte.</p>
                <a href="/soporte" className="text-emerald-500 hover:underline">Ir a Soporte</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutPro>
  );
}
