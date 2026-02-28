import gql from 'graphql-tag'


/* 
step : 3 (lib/schema.ts)

Query Kya Hai?
👉 Data ko read (dekhna) Matlab: User ka naam dekhna Messages fetch karna Product list lana

Mutation Kya Hai? 
👉 Data ko change karna Matlab: Naya user banana Message bhejna Password update karna Data delete karna

(GraphQL me):
Abhi koi real query nahi hai Abhi koi real mutation nahi hai Sirf structure ready hai 

🔥 Relation Apollo Se Apollo Server Apollo kya karta hai? Query receive karta hai Check karta hai schema me allowed hai ya nahi Resolver run karta hai Data return karta hai
*/
export const GlobalTypeDef = gql`
  # Scalar Definations
  scalar Date
  scalar JSON
  # Type Definations
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`