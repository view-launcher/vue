import { Plugin } from 'rollup'
import { createFilter } from '@rollup/pluginutils'
import { addDataAttribute, PathMap } from '@view-launcher/vue-shared'
import { Options as ViewLauncherOptions, defaultOptions as ViewLauncherDefaultOptions } from 'view-launcher'

export type Options = {
  /**
   * The Vue-SFC files that should be transformed.
   * Default value: `/\.vue$/`
   */
  include: string | RegExp | (string | RegExp)[]

  /**
   * The Vue-SFC files that should not be transformed.
   * Default value: `/\.vue$/`
   */
  exclude: string | RegExp | (string | RegExp)[]

  /**
   * This option should be used if your are bundling modules inside a virtual-machine(Docker for example),
   * otherwise you can ignore this option.
   *
   * To open the view file in your editor, the path of the view file should be your host machine's one.
   * If you are bundling inside a virtual-machine, the file path will be the virtual-machine's one by default,
   * which is not correct. To fix it, you should specify a VM-to-Host path map.
   *
   * For example:
   * VM path:   `/var/www/project/src/components/Home.vue`
   * Host path: `/Users/xx/project/src/components/Home.vue`
   *
   * Then the value of `pathMap` should be ['/var/www/', '/Users/xx/']
   */
  pathMap?: PathMap

  /**
   * The script file to be used for importing ViewLauncher.
   * If you omit this option, only the transformation will be applied.
   */
  entry?: string
} & ViewLauncherOptions

export const defaultOptions: Options = {
  include: /\.vue$/,
  exclude: [],
  ...ViewLauncherDefaultOptions,
}

const MODULE_ID = 'virtual:viewLauncher'
const MODULE_ID_RESOLVED = '/virtual:viewLauncher'

const viewLauncherCode = `import { viewLauncher } from 'view-launcher'
import 'view-launcher/style.css'
viewLauncher({options})`

export default function ViewLauncherVuePlugin(userOptions: Partial<Options> = {}): Plugin {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.BUILD === 'production'
  const options: Options = {
    ...defaultOptions,
    ...userOptions,
  }

  const filter = createFilter(options.include, options.exclude)
  const entry = options.entry

  return {
    name: 'view-launcher-vue',

    resolveId(id) {
      return MODULE_ID === id ? MODULE_ID_RESOLVED : null
    },

    load(id) {
      if (id === MODULE_ID_RESOLVED) return viewLauncherCode.replace('{options}', JSON.stringify(options))
    },

    transform(code, id) {
      if (isProduction) {
        return null
      }

      if (entry && id === entry) {
        return `import '${MODULE_ID}'\n` + code
      }

      if (filter(id)) {
        return addDataAttribute(code, id, options?.pathMap)
      }

      return null
    },
  }
}
