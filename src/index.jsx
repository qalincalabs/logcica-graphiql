import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Auth-Token",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGFpbXMuand0Lmhhc3VyYS5pbyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInB1YmxpYyJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJwdWJsaWMifSwiZXhwIjoxNzY3MjIyMDAwLCJpYXQiOjE3MDQwNjM2MDB9.1xPRKJYZFc6YEX7jCD88ucv5GlJhOCmOtIxOyHaccl8"
);

const graphql = JSON.stringify({
  query: "{\n  activities(limit: 1) {\n    name\n  }\n}",
  variables: {},
});
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: graphql,
  redirect: "follow",
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Wake up API
fetch("https://crisp-ferret-7818.ddn.hasura.app/graphql", requestOptions).then(
  () => console.log("API awake")
);
