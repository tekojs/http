import type { Teko } from '@tekojs/core'
import type { Request, Response, NextFunction } from 'express'
import type { ExpressStateResolver } from './types.js'

export function createExpressTekoRenderer(teko: Teko) {
  return async function render(view: string, state: Record<string, unknown> = {}) {
    return teko.render(view, state)
  }
}

export function createExpressViewEngine(teko: Teko) {
  return async function (
    filePath: string,
    options: Record<string, unknown>,
    callback: (err: Error | null, html?: string) => void
  ) {
    try {
      const html = await teko.renderFile(filePath, options)
      callback(null, html)
    } catch (error) {
      callback(error as Error)
    }
  }
}

export function createExpressRouteHandler(
  teko: Teko,
  view: string,
  getState?: ExpressStateResolver
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const state = getState ? await getState(req, res) : {}
      const html = await teko.render(view, state as Record<string, unknown>)
      res.type('html').send(html)
    } catch (error) {
      next(error)
    }
  }
}