import { TekoRenderer } from '@tekojs/ssr';

export function createBunTekoHandler(renderer: TekoRenderer) {
  return async () => {
    try {
      const html = await renderer.render('pages/home.teko', {
        user: { name: 'Teko', loggedIn: true },
        posts: ['Post 1', 'Post 2', 'Post 3']
      });
      return new Response(html, {
        headers: { 'content-type': 'text/html; charset=utf-8' }
      });
    } catch (error) {
      return new Response(
        error instanceof Error ? error.stack : 'Erro interno',
        { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } }
      );
    }
  };
}
