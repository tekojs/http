import { assert } from '@t8ngs/assert'
import { configure, processCLIArgs, run } from '@t8ngs/runner'

processCLIArgs(process.argv.splice(2))
configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [assert()],
})

run()