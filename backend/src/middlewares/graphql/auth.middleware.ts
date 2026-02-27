import { GraphQLError } from 'graphql'
import { Request } from 'express'

export const authMiddlewareGraph = (req: Request) => {
  const authHeader = req.headers?.authorization ?? ''
  if (!authHeader) {
    throw new GraphQLError('Authorization header is missing')
  }
  const authToken = authHeader.split(' ')[1]
  if (authToken !== process.env.AUTH_TOKEN) {
    throw new GraphQLError('Authorization failed')
  }
  return
}