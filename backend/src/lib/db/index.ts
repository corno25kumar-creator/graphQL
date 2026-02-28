import mongoose from 'mongoose'
// to connect the mongo db 
import { setServers } from "node:dns/promises";
setServers(["8.8.8.8", "8.8.4.4"]); 
// Force Node to use Google DNS



export const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false)
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri, {
      autoCreate: true, // Auto create collection
      autoIndex: true, // Auto create index
    })
    console.log(`🤝 MongoDB Connected`)
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
  }
}