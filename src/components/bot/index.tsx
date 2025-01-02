"use client"; // Mark this file as a Client Component

import { useEffect } from "react";

// Extend the Window interface to include chatwootSDK
declare global {
  interface Window {
    chatwootSDK: any;
  }
}

const ChatwootWidget = () => {
  useEffect(() => {
    const BASE_URL = "https://app.chatwoot.com";

    const script = document.createElement("script");
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      // @ts-ignore: Suppress TypeScript error for the `chatwootSDK` global object
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: "GpSVQkmqSDVBTYwjrVNX9FfZ",
          baseUrl: BASE_URL,
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render any visible UI
};

export default ChatwootWidget;
