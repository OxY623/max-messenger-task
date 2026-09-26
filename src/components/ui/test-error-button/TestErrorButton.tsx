import { Button, type ButtonProps } from "antd";
import { useState } from "react";

const TestErrorButton = (props: ButtonProps) => {
  const { children } = props;
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Test Error from render");
  }

  return (
    <Button
      {...props}
      type="primary"
      style={{ background: "red", color: "white", borderColor: "red" }}
      onClick={() => {
        setShouldThrow(true);
      }}
    >
      {children}
    </Button>
  );
};

export { TestErrorButton };
