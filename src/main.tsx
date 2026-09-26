import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import App from "./App.tsx";
import { ErrorDisplayComponent } from "./components/ui/error-display-component";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorDisplayComponent
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          getErrorMessage={getErrorMessage}
        />
      )}
      onError={(error, info) => {
        console.error("Unhandled error:", error, "Component info:", info);
      }}
    >
      <App />
      {/* <TestErrorButton>TestError</TestErrorButton> */}
    </ErrorBoundary>
  </StrictMode>,
);
