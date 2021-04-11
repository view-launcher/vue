import { addDataAttribute } from '@view-launcher/vue-shared'

type LoaderContext = {
  resourcePath: string
  mode: 'production' | 'development' | 'none'
  getOptions(): {
    pathMap?: [string, string]
  }
}

export default function loader(this: LoaderContext, source: string) {
  if (this.mode === 'production') {
    return source
  }

  return addDataAttribute(source, this.resourcePath, this.getOptions().pathMap)
}
