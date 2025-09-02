import Head from "next/head";
import LayoutPro from "../components/LayoutPro";

const faqs = [
  {
    question: "¿Cuánto tiempo tardará en llegar mi pedido?",
    answer: "Trabajamos con proveedores de todo el mundo para ofrecerte los mejores precios. Por ello, nuestros tiempos de envío estimados son de 15 a 30 días hábiles. Te agradecemos la paciencia, ¡valdrá la pena!"
  },
  {
    question: "¿Cómo puedo hacer seguimiento de mi pedido?",
    answer: "Una vez que tu pedido sea procesado y enviado (usualmente en 3-5 días hábiles), recibirás un correo electrónico con un número de seguimiento. Puedes usar ese número en el sitio web del transportista para ver el estado de tu envío."
  },
  {
    question: "¿Por qué mi pedido llegó en varios paquetes?",
    answer: "Como operamos con un modelo de dropshipping, tus productos pueden ser enviados desde diferentes proveedores. Si pediste varios artículos, es posible que lleguen en paquetes separados y en momentos distintos."
  },
  {
    question: "¿Qué hago si mi producto llega dañado?",
    answer: "Lamentamos mucho si esto ocurre. Por favor, contáctanos de inmediato a través de nuestro correo <a href='mailto:mercadia.web@gmail.com' class='text-emerald-500'>mercadia.web@gmail.com</a> con fotos del producto dañado y tu número de orden. Nos encargaremos de solucionarlo lo antes posible."
  },
  {
    question: "¿Puedo cancelar mi pedido?",
    answer: "Puedes solicitar una cancelación si tu pedido aún no ha sido procesado por nuestro proveedor. Generalmente, esto ocurre en las primeras 24 horas. Contáctanos lo más rápido posible para que podamos verificar el estado."
  }
];

export default function SoportePage() {
  return (
    <LayoutPro>
      <Head>
        <title>Soporte y Preguntas Frecuentes | MercadIAshop</title>
        <meta name="description" content="Encuentra respuestas a tus dudas sobre pedidos, envíos y más." />
      </Head>

      <main className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Centro de Soporte</h1>
        <p className="opacity-80 mb-8">Respuestas a las dudas más comunes de nuestros clientes.</p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-black/10 p-4">
              <h2 className="font-semibold text-lg">{faq.question}</h2>
              <p className="mt-2 opacity-90" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold">¿No encontraste tu respuesta?</h2>
          <p className="mt-2 opacity-80">Nuestro equipo está listo para ayudarte.</p>
          <a href="/contacto" className="btn-primary mt-4 inline-block">Contáctanos</a>
        </div>
      </main>
    </LayoutPro>
  );
}
