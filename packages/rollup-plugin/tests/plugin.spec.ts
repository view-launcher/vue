import path from 'path'
import compiler from './compiler'

test('Work correctly with vue-loader', async () => {
  const input = path.resolve(__dirname, 'example.js')
  const output = await compiler(input)

  expect(output).toMatch(/data-tag-info/)
})
