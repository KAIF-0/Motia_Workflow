import { ApiMiddleware } from "motia"
import { ZodError } from "zod"

export const errorMiddleware: ApiMiddleware = async (req, ctx, next) => {
    try {
        return await next()
    } catch (error: any) {
        if (error instanceof ZodError) {
            ctx.logger.error('Validation error', { errors: error.errors })
            return {
                status: 400, body: {
                    status: 400,
                    data: null,
                    timestamp: new Date().toISOString(),
                    errorMessage: error.errors || "Validation Error!"
                }
            }
        }

        ctx.logger.error('Unexpected error', { error: error.message })
        return {
            status: 500, body: {
                status: 500,
                data: null,
                timestamp: new Date().toISOString(),
                errorMessage: error.message || 'Internal server error'
            }
        }
    }
}