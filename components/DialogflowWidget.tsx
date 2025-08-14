import Script from "next/script";

export default function DialogflowWidget() {
  const id = process.env.NEXT_PUBLIC_DIALOGFLOW_AGENT_ID;
  if (!id) {
    if (typeof window !== "undefined") console.warn("DF: falta NEXT_PUBLIC_DIALOGFLOW_AGENT_ID");
    return null;
  }

  return (
    <>
      <Script
        id="df-bootstrap"
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
        onLoad={() => console.log("DF: bootstrap cargado")}
        onError={(e) => console.error("DF: error cargando bootstrap", e)}
      />
      {/* @ts-ignore */}
      <df-messenger
        intent="WELCOME"
        chat-title="MercadIAshop"
        agent-id={id}
        language-code="es"
      />
    </>
  );
}
