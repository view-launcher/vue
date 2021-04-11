import compiler from './compiler'

test('Work correctly with vue-loader', async () => {
  const output = await compiler('example.js')

  expect(output).toMatch(/data-tag-info/)
})
