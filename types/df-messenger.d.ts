declare namespace JSX {
  interface IntrinsicElements {
    'df-messenger': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      'agent-id': string;
      'chat-title'?: string;
      'intent'?: string;
      'language-code'?: string;
    };
  }
}
