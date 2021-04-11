import { rollup, RollupOptions } from 'rollup'
import VuePlugin from 'rollup-plugin-vue'
import ViewLauncherVuePlugin from '@view-launcher/rollup-plugin'

export default async (input: string, options = {}) => {
  const config: RollupOptions = {
    input,
    output: {
      format: 'esm',
    },
    plugins: [ViewLauncherVuePlugin(options), VuePlugin()],
    external: ['vue'],
  }

  const bundle = await rollup(config)

  const result = await bundle.generate({ format: 'esm' })

  return result.output[0].code
}
