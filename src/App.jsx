import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { explorerPlugin } from "@graphiql/plugin-explorer";
import "@graphiql/plugin-explorer/dist/style.css";
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

var defaultQuery = `
  query ActivitiesInRevesDescribingCheese {
    activities(
      limit: 10
      where: {
        place: { address: { locality: { _eq: "Rèves" } } }
        description: { short: { markdown: { _regex: "Fromage" } } }
      }
    ) {
      name
      description {
        short {
          markdown
        }
      }
      place {
        name
        address {
          locality
        }
        center {
          type
          coordinates
        }
        within {
          name
        }
      }
      profiles {
        ...ProfileFields
      }
      categories {
        name
      }
    }
  }
`;

// Pass the explorer props here if you want
const explorer = explorerPlugin();

const App = () => (
  <GraphiQL
    fetcher={fetcher}
    defaultQuery={defaultQuery}
    plugins={[explorer]}
    externalFragments={`
  fragment ProfileFields on Profiles {
    key
    type
    link
  }
`}
  ></GraphiQL>
);

export default App;
