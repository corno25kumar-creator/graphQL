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

export interface GraphContext {
  req: Request
}

const port = process.env.PORT || 3000
const graphqlPath = '/graphgql'
const env = process.env.NODE_ENV

const app = express()
const httpServer = http.createServer(app)


/*
step : 5
middleware initilization 


*/

function initilizeMiddleWare(appRef:typeof app){
appRef.use(cors())
appRef.use(express.urlencoded({limit: '2mb', extended: true}))
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

listen() async hota hai. Matlab: Ye background me server start karta hai

Lekin next line turant execute ho jaati hai
Code wait karega Jab tak server actually bind nahi ho jata port se Tab tak next line run nahi hogi
directly listen kar doge bina proper await ke:

Logs galat time pe aa sakte hain Health checks fail ho sakte hain Kubernetes / Docker sochega server ready hai (jabki nahi hai) Startup race condition ho sakti hai

*/
async function startServer() {
    console.log('server started')

    await apolloServer.start()

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
}
startServer()