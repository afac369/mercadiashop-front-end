import Script from "next/script";

export default function DialogflowWidget() {
  const id = process.env.NEXT_PUBLIC_DIALOGFLOW_AGENT_ID;
<<<<<<< HEAD
  if (!id) return null; // ocultar si no hay agent id
=======
  if (!id) {
    if (typeof window !== "undefined") console.warn("DF: falta NEXT_PUBLIC_DIALOGFLOW_AGENT_ID");
    return null;
  }
>>>>>>> feat/ui-pro-extras

  return (
    <>
      <Script
<<<<<<< HEAD
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
      />
=======
        id="df-bootstrap"
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
        onLoad={() => console.log("DF: bootstrap cargado")}
        onError={(e) => console.error("DF: error cargando bootstrap", e)}
      />
      {/* @ts-ignore */}
>>>>>>> feat/ui-pro-extras
      <df-messenger
        intent="WELCOME"
        chat-title="MercadIAshop"
        agent-id={id}
        language-code="es"
      />
    </>
  );
}
