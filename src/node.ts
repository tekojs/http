import type { IncomingMessage, ServerResponse } from 'node:http';
import { TekoRenderer } from '@tekojs/ssr';

export function createNodeTekoHandler(renderer: TekoRenderer) {
  return async (_req: IncomingMessage, res: ServerResponse) => {
    try {
      const html = await renderer.render('pages/home.teko', {
        user: { name: 'Teko', loggedIn: true },
        posts: ['Post 1', 'Post 2', 'Post 3']
      });
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(error instanceof Error ? error.stack : 'Erro interno');
    }
  };
}
