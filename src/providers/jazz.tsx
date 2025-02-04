"use client";

import { JazzProvider, useDemoAuth, DemoAuthBasicUI } from "jazz-react";

function JazzAndAuth({ children }: { children: React.ReactNode }) {
  const [auth, authState] = useDemoAuth();

  return (
    <>
      <JazzProvider
        auth={auth}
        // replace `you@example.com` with your email as a temporary API key
        peer="wss://cloud.jazz.tools/?jon.fischerboy@gmail.com"
      >
        {children}
      </JazzProvider>
      <DemoAuthBasicUI appName="Circular" state={authState} />
    </>
  );
}

export { JazzAndAuth };
