import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import 'express-async-errors'
import cors from 'cors'

import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import http from 'http'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'

import { resolvers, typeDefs } from './lib/graphql/schema.js'
import type { Request } from 'express'
import { connectDb } from './lib/db/index.js'
import path from "path"






/*
2️⃣ export interface GraphContext { req: Request }
GraphQL me context ek shared object hota hai jo har resolver ke liye accessible hota hai.
Is interface me hum sirf ek cheez define kar rahe hain: req.
req ka type Request hai,
yani jo bhi request client se aayegi, uski properties hum GraphQL resolvers me use kar sakte hain (jaise headers, cookies, authentication token etc.).
 */
export interface GraphContext {
  req: Request
}

const port = process.env.PORT || 3000
const graphqlPath = '/graphql'
const env = process.env.NODE_ENV

const app = express()
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

const httpServer = http.createServer(app)


/*
step : 5
middleware initilization 

middle ware : - Middleware = wo function jo request aur response ke beech me run hota hai.


*/

function initilizeMiddleWare(appRef:typeof app){

/*
CORS = Cross-Origin Resource Sharing
Agar frontend:3000 Aur backend: 4000 To browser block karega request.  cors() Ye allow karta hai cross-origin requests.
*/

appRef.use(cors())

/*

express.urlencoded() middleware is string ko JS object me convert kar deta hai cuz server ko directly usable JS object nahi milta..
limit: '2mb' = Max size of incoming form payload Agar user 2MB se bada data bheje → request reject
Reason: security, prevent DoS attacks
extended: true = Agar true → nested objects allow (complex JSON-like forms)

*/
appRef.use(express.urlencoded({limit: '2mb', extended: true}))

/*

Agar frontend se aaya: { "name": "Chandan" } To tum access kar sakte ho: req.body.name = chandan
Agar ye middleware nahi lagate → req.body undefined hota.

 */
appRef.use(express.json({limit:'2mb'}))
}
 

/*
step : 2 (lib/globalSchema)

apollo server initialization =====> "Apollo Server bana do, aur use bata do ki
1️⃣ data structure kya hai
2️⃣ data ka logic kya hai
3️⃣ server ka shutdown kaise handle karna hai"
*/
const apolloServer = new ApolloServer({

    // Kaunsi Query allowed hai Kaunsi Mutation allowed hai Kaunsa type exist karta hai
    typeDefs:typeDefs,

    //Query aaye to data kaise laana hai Database call kaise karna hai Response kya return karna hai
    resolvers : resolvers,

    //Server band karte waqt Ongoing requests properly close ho Memory leak na ho Graceful shutdown ho
    plugins :[ApolloServerPluginDrainHttpServer({httpServer})]
})




/* 
step : 1

listen() = async hota hai. Matlab: Ye background me server start karta hai Lekin next line turant execute ho jaati hai

startServer() = Code wait karega Jab tak server actually bind nahi ho jata port se Tab tak next line run nahi hogi
directly listen kar doge bina proper await ke:
Logs galat time pe aa sakte hain Kubernetes / Docker sochega server ready hai (jabki nahi hai) Startup race condition ho sakti hai

*/


// Async function hai kyunki andar await use ho raha hai. Server start hone ke liye kuch async operations complete hone zaroori hain.
async function startServer() {
    try {
          console.log('server started')
          // connect db
          await connectDb()

/*
Ye GraphQL engine ko initialize karta hai || Schema load karta hai || Resolvers ready karta hai || Internal setup complete karta hai
⚠️ Important: Agar tum await nahi lagate → middleware attach karte time error aa sakta hai. 
*/
    await apolloServer.start()

    /*

     */
    initilizeMiddleWare(app)

    app.get('/', (_, res) => res.send(`server is running `))

    app.use(
        graphqlPath,
        expressMiddleware(apolloServer, {
            context: async ({req}) => ({
                req, 
            } as GraphContext)
        })
    )

    await new Promise<void>((resolve) => httpServer.listen({port}, resolve))
    .then(()=> {
        console.log(`server is ready at http://localhost: ${port} ${graphqlPath}`)
    })
    } catch (error) {
        console.log(`error in start server () ${error}`)
    }
}
startServer()