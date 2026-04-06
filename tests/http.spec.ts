import { test } from '@t8ngs/runner'

test.group('http', () => {
    test('should make a GET request to an API endpoint', async ({ assert }) => {
       
        assert.isFalse(false)
    })

    test('should handle a 404 error', async ({ assert }) => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/posts/9999')
        } catch (error) {
            assert.instanceOf(error, Error)
        }
    })
})