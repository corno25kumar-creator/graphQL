In sab cheezon ko hum **"GraphQL Building Blocks"** kehte hain. Jab aap Schema likhte hain, toh inhi blocks ka use karke aap batate hain ki aapka data kaisa dikhega.

Ise ek **Form Builder** ke nazariye se dekhiye:

---

### 1. Scalar Types (The Basics)

Ye GraphQL ke sabse basic data types hain (Jaise programming mein `string` ya `int` hote hain).

* **Definition:** Wo data jise aur chota nahi toda ja sakta (Leaf nodes).
* **Standard Scalars:** * `Int`: Poora number (e.g., `25`).
* `Float`: Decimal number (e.g., `49.99`).
* `String`: Text (e.g., `"Hello"`).
* `Boolean`: `true` ya `false`.
* `ID`: Ek unique identifier (Hota string hi hai, lekin cache ke liye use hota hai).



---

### 2. Object Types (The Structure)

Jab aap kai saare Scalars ko mila kar ek "Cheez" banate hain, toh use Object Type kehte hain.

* **Definition:** Ek group jo batata hai ki aapka data (jaise User ya Product) kin-kin fields se bana hai.
* **Schema Use:**

```graphql
type User {      # Ye Object Type hai
  id: ID
  name: String   # Ye Scalar hai
}

```

---

### 3. Custom Types

GraphQL aapko azadi deta hai ki aap apne khud ke types bana sakein.

* **Definition:** Developers jab apni zaroorat ke hisaab se koi type banate hain (Jaise `Date`, `JSON`, ya koi complex object).
* **Example:** Agar aapko date handle karni hai, toh aap ek custom scalar `Date` define kar sakte hain.

---

### 4. Enums (Enumeration Types)

Ye "Choices" dene ke liye hote hain.

* **Definition:** Ek aisa type jisme value sirf wahi ho sakti hai jo pehle se define ki gayi hai.
* **Practical Example:** Order Status (Sirf `PENDING`, `SHIPPED`, ya `DELIVERED` hi ho sakta hai).
* **Schema Use:**

```graphql
enum Status {
  PENDING
  SHIPPED
  DELIVERED
}

```

---

### 5. Input Types (For Mutations)

Jab aapko server par bahut saara data **bhejna** ho (jaise Sign-up form), toh aap Input type use karte hain.

* **Definition:** Ye Object type jaise hi hote hain, lekin inka use sirf **Mutations** mein arguments ke taur par hota hai.
* **Schema Use:**

```graphql
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

```

---

### 6. Non-Null Types (`!`)

Ye validation ke liye hota hai.

* **Definition:** Kisi bhi type ke aage agar `!` laga hai, iska matlab wo field **khaali (null) nahi ho sakti**. Server ko wo data dena hi padega.
* **Schema Use:** `name: String!` (Iska matlab name aana compulsory hai).

---

### Practical Schema Example (Sabko mila kar)

Ab dekhiye ye sab ek saath kaise dikhte hain:

```graphql
# 1. Enum
enum Role {
  ADMIN
  USER
}

# 2. Object Type
type User {
  id: ID!              # 6. Non-null Scalar
  username: String!    # 6. Non-null Scalar
  role: Role           # 4. Enum use
}

# 5. Input Type (Naya user banane ke liye)
input UserInput {
  username: String!
  role: Role!
}

type Mutation {
  register(input: UserInput): User  # Input type le raha hai, Object type de raha hai
}

```

---

### Comparison Table: Kyun aur Kahan use karein?

| Type | Kab Use Karein? | Example |
| --- | --- | --- |
| **Scalar** | Jab simple value chahiye. | `age: Int` |
| **Object** | Jab complex data dikhana ho. | `user: User` |
| **Enum** | Jab options fix ho. | `color: RED, BLUE` |
| **Input** | Jab data create/update karna ho. | `input: UserInput` |
| **Non-Null** | Jab wo field mandatory ho. | `id: ID!` |

---

### Iska Effect Kya Hota Hai?

1. **Strictness:** Agar aapne `Int!` mangwaya aur database ne `null` bhej diya, toh GraphQL error de dega. App crash nahi hogi, API handle kar legi.
2. **Clarity:** Frontend ko pata hota hai ki "Ye field toh pakka aayegi hi" (Non-null ki wajah se).
3. **Dropdowns:** Enums ki madad se frontend developer asani se dropdown menu bana sakta hai.

=============================================================================================
=============================================================================================
=============================================================================================


Bilkul! Ek real-world example lete hain: **"E-Learning Platform"** (jaise Udemy ya Coursera). Is ek schema mein humne woh saare components use kiye hain jo aapne upar seekhe hain.

---

### 🚀 The "All-in-One" E-Learning Schema

Is schema ko dhyan se dekhiye, maine har line ke saath comment kiya hai ki wahan kaunsa type use ho raha hai:

```graphql
# 1. ENUM: Fixed options for Course Level
enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  EXPERT
}

# 2. SCALAR: Humne ek Custom Scalar define kiya (Backend logic required)
scalar Date

# 3. OBJECT TYPE: Course ki puri detail
type Course {
  id: ID!               # Non-Null ID
  title: String!        # Non-Null String
  description: String
  price: Float!         # Scalar: Float
  level: CourseLevel!   # Enum ka use
  createdAt: Date       # Custom Scalar ka use
  instructor: User!     # Object Type ka Relation
}

# 3. OBJECT TYPE: User ki detail
type User {
  id: ID!
  username: String!
  email: String!
  enrolledCourses: [Course] # List of Objects
}

# 4. INPUT TYPE: Naya course banane ke liye (Mutation mein use hota hai)
input CreateCourseInput {
  title: String!
  description: String
  price: Float!
  level: CourseLevel = BEGINNER # Default value set kar di
  instructorId: ID!
}

# 5. QUERY: Data mangwane ke liye
type Query {
  getCourse(id: ID!): Course      # Single object fetch karna
  allCourses(limit: Int): [Course] # List fetch karna
}

# 6. MUTATION: Data create/update karne ke liye
type Mutation {
  # Input Type ka use yahan ho raha hai
  createNewCourse(input: CreateCourseInput!): Course 
  
  # Simple arguments ke saath mutation
  deleteCourse(id: ID!): Boolean
}

```

---

### 🔍 Is Schema ka "Breakdown" aur Relation:

1. **Scalar Types:** `String`, `Float`, `ID`, aur `Boolean` ka use har jagah basic data store karne ke liye ho raha hai.
2. **Object Types (`Course`, `User`):** Ye hamare "Main Heroes" hain. `Course` ke andar `User` (instructor) hai, jo dikhata hai ki Objects ek dusre se kaise jude hain.
3. **Enums (`CourseLevel`):** Ye pakka karta hai ki koi galti se level mein "Pro-Max" na likh de; sirf wahi 3 options valid honge.
4. **Input Types (`CreateCourseInput`):** Jab frontend se naya course save karna hoga, toh hum 5 alag arguments bhejne ke bajaye ek single "Input Object" bhejenge. Ye code ko saaf (clean) rakhta hai.
5. **Non-Null (`!`):** Aapne notice kiya hoga `id: ID!`. Iska matlab hai ki agar database se bina ID ke data aaya, toh GraphQL use invalid maan lega.

---

### 💡 Iska Practical Effect kya hoga?

Jab aap **Frontend** par code likhenge, toh aapko ye fayde milenge:

* **Validation:** Agar aap `price` mein "Free" (String) bhejenge, toh Mutation fail ho jayegi kyunki schema mein `Float` maanga gaya hai.
* **Introspection:** Agar aap kisi tool (jaise Apollo Sandbox) mein `allCourses` type karenge, toh wo apne aap bata dega ki iske andar `title`, `price`, aur `level` available hain.
* **Predictability:** Frontend ko pehle se pata hai ki `enrolledCourses` hamesha ek **Array** hi dega, kabhi `null` ya `string` nahi dega.


=============================================================================================
=============================================================================================
=============================================================================================

GraphQL mein **Lists** ka matlab hota hai "Multiple Items" ya "Arrays". Jab aapko ek single item ke bajaye bahut saara data ek saath chahiye hota hai (jaise ki ek user ke saare posts, ya saare products ki list), tab hum Lists ka use karte hain.

Ise Schema mein **Square Brackets `[]**` se dikhaya jata hai.

---

### 1. Lists ko Schema mein kaise likhte hain?

Lists ke do main components hote hain:

* **Syntax:** `[Type]` (Example: `[String]`, `[Int]`, `[User]`)
* **Meaning:** Iska matlab hai ki ye field ya toh `null` hogi, ya fir uske andar us Type ki ek list hogi.

---

### 2. Lists ke Operations (Sabse important concepts)

GraphQL mein List ke saath `!` (Non-null) ka khel bahut important hai. Iske 4 patterns hote hain jo aapko samajhne chahiye:

| Syntax | Matlab (Description) | Example |
| --- | --- | --- |
| `[String]` | List bhi null ho sakti hai, aur uske andar ke items bhi null ho sakte hain. | `null` ya `["A", null, "B"]` |
| `[String!]` | List null ho sakti hai, lekin uske andar ka har item String hona chahiye (null nahi). | `null` ya `["A", "B", "C"]` |
| `[String]!` | List ka hona zaroorat hai (khali array `[]` chalega), lekin items null ho sakte hain. | `[]` ya `[null, "A"]` |
| **`[String!]!`** | **Sabse Safe:** Na toh list null ho sakti hai, na hi uske andar ka koi item null ho sakta hai. | `["A", "B"]` ya `[]` |

---

### 3. Practical Example: Blog App

Maan lijiye hum ek Blog system bana rahe hain jisme ek User ke paas bahut saare Posts hain:

```graphql
type Post {
  id: ID!
  title: String!
}

type User {
  id: ID!
  username: String!
  # List Operation: Ek user ke pas kai posts ho sakte hain
  myPosts: [Post!]! 
}

type Query {
  # Ek sath saare users ki list mangne ke liye
  allUsers: [User!]! 
}

```

---

### 4. Iska "Effect" aur "Use Case" kya hai?

1. **Multiple Data Fetching:** Aapko `/get-post-1`, `/get-post-2` alag se karne ki zaroorat nahi. Aap ek hi baar mein `myPosts` mangwa lete ho.
2. **Validation:** Agar aapne `[Post!]!` likha hai aur database se kisi post ki detail khali (`null`) aayi, toh GraphQL use frontend tak nahi jaane dega aur wahi error pakad lega.
3. **Frontend Mapping:** Frontend (React) mein aap asani se is list par `.map()` chala kar UI dikha sakte ho:
```javascript
data.allUsers.map(user => (
  <p key={user.id}>{user.username}</p>
))

```



### Summary:

* **`[]`** ka matlab hai "Collection of items".
* **`!`** brackets ke **andar** matlab "Item empty nahi hoga".
* **`!`** brackets ke **bahar** matlab "Puri list empty (null) nahi hogi".
