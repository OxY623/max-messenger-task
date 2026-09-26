import { Alert, Button, Flex } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Flex justify="center" align="center">
          <Alert
            title="Error"
            showIcon
            description={`Something went wrong:   ${getErrorMessage(error)}`}
            type="error"
            action={
              <div style={{ marginTop: "16px" }}>
                <Button type="primary" onClick={resetErrorBoundary}>
                  Try again
                </Button>{" "}
                <Button
                  type="default"
                  onClick={() => {
                    window?.history?.back();
                  }}
                >
                  Back
                </Button>
              </div>
            }
          />
        </Flex>
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
