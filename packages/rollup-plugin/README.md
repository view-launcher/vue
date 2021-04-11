# @view-launcher/rollup-plugin-vue [![npm](https://img.shields.io/npm/v/@view-launcher/rollup-plugin-vue.svg)](https://npmjs.com/package/@view-launcher/rollup-plugin-vue)

Rollup/Vite plugin [ViewLauncher](https://github.com/view-launcher/view-launcher) for Vue.js SFC.

Must be used along with [rollup-plugin-vue](https://github.com/vuejs/rollup-plugin-vue) for Rollup, or [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue) for Vite. 

## Usage
### Installation
```shell
npm i @view-launcher/rollup-plugin-vue -D
```

### Example for Rollup

`rollup.config.js`
```js
import path from 'path'
import VuePlugin from 'rollup-plugin-vue'
import ViewLauncherVuePlugin from '@view-launcher/rollup-plugin-vue'

const entryFile = path.resolve(__dirname, 'src/main.js')
const viewLauncherOptions = { 
  entry: entryFile,
  theme: 'light' 
}

export default {
  input: entryFile,
  output: {
    file: `./dist/main.js`,
    format: 'esm',
  },
  plugins: [
    ViewLauncherVuePlugin(viewLauncherOptions),
    VuePlugin()
  ],
  external: ['vue'],
}
```
***Be sure*** that place this plugin after `rollup-plugin-vue`.


### Example for Vite
This plugin is compatible with Vite, just importing the same package is totally fine.

`vite.config.js`
```js
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import ViewLauncherVuePlugin from '@view-launcher/rollup-plugin-vue'

export default defineConfig(({ mode }) => {
  // load the .env file
  // you may want to create one like `.env.development.local`
  const env = loadEnv(mode, __dirname)

  return {
    plugins: [
      ViewLauncherVuePlugin({
        entry: path.resolve(__dirname, 'src/main.js'),
        theme: 'light',
        editor: env.VITE_EDITOR || 'vscode',
      }),
      vue(),
    ],
  }
})
```

You may have noticed that in this example, the value of `editor` option was determined by the .env file, if it couldn't find any, fallback to `vscode`.  
Prevent hard-coding the `editor` value is a best practice when you're working with multiple team members.

***Be sure*** that place this plugin after `@vitejs/plugin-vue`. 

## Options
```ts
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
```

See more about the `ViewLauncherOptions` [at here](https://github.com/view-launcher/view-launcher#%EF%B8%8F-options).  
Also, you can find the full demo [at here](https://github.com/view-launcher/view-launcher/tree/master/playground).
