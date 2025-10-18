import { ApiMiddleware } from "motia";

export const responseMiddleware: ApiMiddleware = async (req, ctx, next) => {
    const data = await next()

    const response = {
        status: data.status,
        data: data.body,
        timestamp: new Date().toISOString(),
        message: "Request processed successfully!"
    }
    // console.log(response)

    return { body: response, status: data.status };
}