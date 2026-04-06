import type { Teko } from '@tekojs/core'
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express'

export interface TekoRouteState {
  [key: string]: unknown
}

export type ExpressStateResolver =
  | ((request: ExpressRequest, response: ExpressResponse) => unknown)
  | ((request: ExpressRequest, response: ExpressResponse) => Promise<unknown>)

export type BunStateResolver =
  | ((request: globalThis.Request) => unknown)
  | ((request: globalThis.Request) => Promise<unknown>)


export interface TekoHttpOptions {
  teko: Teko
}