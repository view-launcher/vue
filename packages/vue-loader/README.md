# @view-launcher/vue-loader
Webpack loader for Vue.js SFC. Must be used along with [vue-loader](https://github.com/vuejs/vue-loader). 

## Usage
### Installation
```shell
npm i @view-launcher/vue-loader -D
```

### Example `webpack.config.js`
```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {/* ... */}
          },
          {
            loader: '@view-launcher/vue-loader',
          }
        ]
      }
    ]
  }
};
```

Be sure that you put this loader after `vue-loader`. 
