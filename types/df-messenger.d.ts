// types/df-messenger.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "df-messenger": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "chat-title"?: string;
        "agent-id"?: string;
        intent?: string;
        "language-code"?: string;
      };
    }
  }
}

export {};
