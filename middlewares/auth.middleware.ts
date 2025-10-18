import { ApiMiddleware } from "motia"

export const authMiddleware: ApiMiddleware = async (req, ctx, next) => {
  if (!req.headers.authorization) {
    return { status: 401, body: { error: 'Unauthorized' } }
  }
  return next()
}