import app from "../../src/server";

export const testApp = app;

interface Layer {
    name?: string;
    handle: {
      name?: string;
    };
  }
  // Function to remove a middleware by name
const disableMorgan = () => {
  testApp._router.stack = app._router.stack.filter(
    ( layer: Layer ) => !( layer.name === "logger" || layer.handle.name === "logger" )
  );
};

// Disable Morgan after importing the app
disableMorgan();