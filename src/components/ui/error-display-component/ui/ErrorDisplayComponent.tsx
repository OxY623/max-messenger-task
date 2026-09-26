import { Alert, Button, Flex } from "antd";
import { type ReactNode } from "react";

interface Props {
  resetErrorBoundary: (...args: unknown[]) => void;
  getErrorMessage: (thrown: unknown) => string | undefined;
  children?: ReactNode;
  error: unknown
}

const ErrorDisplayComponent = ({
  resetErrorBoundary,
  getErrorMessage,
  error,
  children,
}: Props) => {
  return (
    <Flex justify="center" align="center">
      {!children ? (
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
      ) : (
        children
      )}
    </Flex>
  );
};

export default ErrorDisplayComponent;
