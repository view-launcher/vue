import * as fs from 'fs'
import * as path from 'path'
import { addDataAttribute } from '@view-launcher/vue-shared'

test('Inserts data attribute', () => {
  const source = fs.readFileSync(path.resolve(__dirname, 'example.vue'), 'utf8').toString()
  const expectedOutput = fs.readFileSync(path.resolve(__dirname, 'exampleOutput.vue'), 'utf8').toString()
  const output = addDataAttribute(source, '/foo/bar/example.vue')

  expect(output).toBe(expectedOutput)
})
