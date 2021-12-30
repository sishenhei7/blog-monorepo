import path from 'path'

export const resolve = (p: string) => path.resolve(__dirname, p)

export const resolveCwd = (p: string) => path.resolve(process.cwd(), p)

export const isProd = process.env.NODE_ENV === 'production'
