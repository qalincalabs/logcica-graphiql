import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { graphql } from "graphql";

const fetcher = async (graphQLParams) => {
  const response = await fetch(
    "https://crisp-ferret-7818.ddn.hasura.app/graphql",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphQLParams),
      credentials: "same-origin",
    }
  );
  return response.json();
};

const App = () => <GraphiQL fetcher={fetcher}></GraphiQL>;

export default App;
