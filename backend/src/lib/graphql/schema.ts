
//Production me use hota hai multiple resolver files merge karne ke liye.
import {merge} from 'lodash'

import { GlobalTypeDef } from './globalSchema.js'

/*
step : 4 (index.ts step : 2)

👌Ye GraphQL ka main configuration layer hai.🫎 Iska kaam hai: Saare schema files collect karna Saare resolvers collect karna Apollo ko dena
 */


// Matlab: 👉 GlobalTypeDef ko ek array me daal diya 👉 Taaki future me aur schemas add kar sako
export const typeDefs = [GlobalTypeDef]


// Resolver actual function hota hai jo data laata hai.
export const resolvers = {
    Query: {},
    Mutation: {}
}


/*
🏗 Full Architecture Flow

globalSchema → structure define karta hai
schema index file → sab schemas combine karta hai
resolver file → data logic define karta hai
index.ts → Apollo ko sab deta hai
*/ 