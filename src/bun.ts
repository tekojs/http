import type { Teko } from '@tekojs/core'
import type { BunStateResolver } from './types.js'

export function createBunRouteHandler(
  teko: Teko,
  view: string,
  getState?: BunStateResolver
) {
  return async function (request: Request): Promise<Response> {
    try {
      const state = getState ? await getState(request) : {}
      const html = await teko.render(view, state as Record<string, unknown>)

      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      })
    } catch (error) {
      return new Response(
        error instanceof Error ? (error.stack ?? error.message) : 'Internal Server Error',
        {
          status: 500,
          headers: {
            'content-type': 'text/plain; charset=utf-8',
          },
        }
      )
    }
  }
}