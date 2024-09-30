import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

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
