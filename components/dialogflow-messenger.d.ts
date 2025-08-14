// types/dialogflow-messenger.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger
      "df-messenger": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        intent?: string;
        "chat-title"?: string;
        "agent-id"?: string;
        "language-code"?: string;
      };
    }
  }
}

export {};
