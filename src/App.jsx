import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { explorerPlugin } from "@graphiql/plugin-explorer";
import "@graphiql/plugin-explorer/dist/style.css";

const fetcher = async (graphQLParams) => {
  const response = await fetch(
    "https://crisp-ferret-7818.ddn.hasura.app/graphql",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGFpbXMuand0Lmhhc3VyYS5pbyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInB1YmxpYyJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJwdWJsaWMifSwiZXhwIjoxNzY3MjIyMDAwLCJpYXQiOjE3MDQwNjM2MDB9.1xPRKJYZFc6YEX7jCD88ucv5GlJhOCmOtIxOyHaccl8",
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
    where: {place: {address: {locality: {_eq: "Rèves"}}}, description: {short: {markdown: {_regex: "Fromage"}}}}
    order_by: {name: Asc}
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
