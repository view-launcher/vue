import path from 'path'
import webpack from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'
import { VueLoaderPlugin } from 'vue-loader'

export default (fixture: string, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    mode: 'development',
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader', { loader: '@view-launcher/vue-loader', options }],
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  })

  const volume = new Volume()
  compiler.outputFileSystem = createFsFromVolume(volume) as any
  compiler.outputFileSystem.join = path.join.bind(path)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats?.hasErrors()) reject(new Error(stats?.toJson()?.errors?.toString()))

      const output = volume.readFileSync(path.resolve(__dirname, 'bundle.js')).toString()
      resolve(output)
    })
  })
}
