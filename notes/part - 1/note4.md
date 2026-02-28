1️⃣ Query ⭐
📌 What

Query ka use data fetch karne ke liye hota hai.

📌 Why

Client ko sirf wahi data chahiye hota hai jo wo screen pe show karega.

📌 Example
query {
  getUser(id: "1") {
    name
    email
  }
}
📌 Result

Sirf name aur email milega — extra data nahi.

2️⃣ Mutation ⭐
📌 What

Mutation ka use data create / update / delete karne ke liye hota hai.

📌 Why

Server ki state change karni ho tab mutation use hota hai.

📌 Example
mutation {
  createUser(name: "Chandan", email: "c@gmail.com") {
    id
    name
  }
}
3️⃣ Subscription
📌 What

Real-time updates ke liye use hota hai.

📌 Why

Chat apps, notifications, live stock price etc.

📌 Example
subscription {
  messageAdded {
    id
    content
  }
}

Ye mostly WebSocket pe chalta hai.

4️⃣ Field Selection ⭐
📌 What

Client decide karta hai kaunse fields chahiye.

📌 Why

Over-fetching avoid hota hai.

📌 Example
query {
  getUser(id: "1") {
    name
  }
}

Sirf name milega — pura object nahi.

5️⃣ Arguments ⭐
📌 What

Query/Mutation ko input dene ke liye.

📌 Why

Specific data fetch karne ke liye.

📌 Example
query {
  getUser(id: "10") {
    name
  }
}

Yaha id argument hai.

6️⃣ Variables ⭐
📌 What

Dynamic values bhejne ke liye use hota hai.

📌 Why

Hardcoded values avoid karne ke liye.

📌 Example
query GetUser($userId: ID!) {
  getUser(id: $userId) {
    name
  }
}

JSON me:

{
  "userId": "10"
}
7️⃣ Fragments
📌 What

Repeated fields ko reusable banane ke liye.

📌 Why

Code duplication avoid hota hai.

📌 Example
fragment userFields on User {
  id
  name
  email
}

query {
  getUser(id: "1") {
    ...userFields
  }
}
8️⃣ Aliases
📌 What

Same query ko multiple times different naam se call karna.

📌 Why

Same field different arguments ke saath fetch karna ho.

📌 Example
query {
  user1: getUser(id: "1") {
    name
  }
  user2: getUser(id: "2") {
    name
  }
}
9️⃣ Directives
📌 What

Query execution ko control karte hain.

📌 Common Directives

@include

@skip

📌 Example
query GetUser($withEmail: Boolean!) {
  getUser(id: "1") {
    name
    email @include(if: $withEmail)
  }
}
🔟 Resolvers ⭐
📌 What

Resolvers backend functions hote hain jo actual data return karte hain.

📌 Example (Node + Apollo)
const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id)
    }
  }
}
📌 Flow

Client Query → GraphQL Runtime → Resolver → Database → Response

🧠 Short Summary Table
Concept	Kaam
Query	Data fetch
Mutation	Data modify
Subscription	Real-time
Field Selection	Exact fields
Arguments	Input dena
Variables	Dynamic input
Fragments	Reuse fields
Aliases	Multiple calls
Directives	Conditional logic
Resolvers	Backend logic