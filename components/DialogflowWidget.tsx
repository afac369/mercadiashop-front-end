// components/DialogflowWidget.tsx
import Script from "next/script";

export default function DialogflowWidget() {
  const id = process.env.NEXT_PUBLIC_DIALOGFLOW_AGENT_ID; // pega aquí la ID (o usa env)
  if (!id) return null;

  return (
    <>
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
      />
      <df-messenger
        intent="WELCOME"
        chat-title="MercadIAshop"
        agent-id={id}
        language-code="es"
      />
    </>
  );
}
