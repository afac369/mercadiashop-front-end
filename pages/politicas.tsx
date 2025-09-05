import Head from "next/head";
import LayoutPro from "../components/LayoutPro";
import Link from "next/link";

export default function PoliticasPage() {
  return (
    <LayoutPro>
      <Head>
        <title>Políticas | MercadIAshop</title>
        <meta name="description" content="Conoce nuestras políticas de envío, devoluciones y privacidad." />
      </Head>

      <main className="container mx-auto p-4 max-w-3xl prose dark:prose-invert">
        <h1 className="text-3xl font-bold mb-6">Políticas de la Tienda</h1>

        <section id="envio">
          <h2>Política de Envíos</h2>
          <p>
            En MercadIAshop, trabajamos con un modelo de dropshipping para ofrecerte una amplia variedad de productos directamente desde nuestros proveedores asociados. Esto significa que tu pedido es enviado desde diferentes ubicaciones alrededor del mundo.
          </p>
          <h4>Tiempos de Procesamiento</h4>
          <p>
            Los pedidos se procesan en un plazo de 3 a 5 días hábiles. Una vez procesado, recibirás una notificación por email con la información de seguimiento.
          </p>
          <h4>Tiempos de Envío</h4>
          <p>
            Debido a la naturaleza del dropshipping, los tiempos de envío pueden variar. El tiempo estimado de entrega es de <strong>15 a 30 días hábiles</strong>. Agradecemos tu paciencia, ya que este modelo nos permite ofrecerte precios competitivos.
          </p>
        </section>

        <section id="devoluciones" className="mt-8">
          <h2>Política de Devoluciones y Reembolsos</h2>
          <p>
            Tu satisfacción es nuestra prioridad. Si no estás conforme con tu producto, tienes un plazo de 14 días desde la recepción para solicitar una devolución.
          </p>
          <h4>Condiciones para la Devolución</h4>
          <ul>
            <li>El producto debe estar sin usar y en las mismas condiciones en que lo recibiste.</li>
            <li>Debe estar en su embalaje original.</li>
            <li>Es necesario presentar el comprobante de compra.</li>
          </ul>
          <h4>Proceso de Devolución</h4>
          <p>
            Para iniciar una devolución, por favor contáctanos en <a href="mailto:contacto.mercadiashop@gmail.com">contacto.mercadiashop@gmail.com</a>. Te proporcionaremos las instrucciones detalladas. Ten en cuenta que los costos de envío de la devolución corren por cuenta del cliente.
          </p>
        </section>

        <section id="privacidad" className="mt-8">
          <h2>Política de Privacidad</h2>
          <p>
            Nos tomamos muy en serio tu privacidad. La información que recopilamos, como tu nombre, email y dirección, se utiliza exclusivamente para procesar tus pedidos y mejorar tu experiencia de compra. Nunca compartiremos tus datos con terceros sin tu consentimiento, excepto cuando sea necesario para la entrega de tu pedido (por ejemplo, con nuestros proveedores de envío).
          </p>
        </section>

        <div className="text-center mt-12">
          <Link href="/" className="btn-primary inline-block">Volver a página principal</Link>
        </div>
      </main>
    </LayoutPro>
  );
}
