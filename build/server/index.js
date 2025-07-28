import { createRequestHandler } from "react-router";
const requestHandler = createRequestHandler(
  () => import("./assets/server-build-mG7xoyeO.js"),
  "production"
);
const app = async (request, context) => {
  return requestHandler(request, {
    VALUE_FROM_NETLIFY: "Hello from Netlify"
  });
};
const config = {
  path: "/*",
  preferStatic: true
};
export {
  config,
  app as default
};
