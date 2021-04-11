import { parse } from '@vue/compiler-sfc'
import { camelCase, upperFirst } from 'lodash'
import { ElementNode, NodeTypes } from '@vue/compiler-core'

export type PathMap = [string, string]

export function addDataAttribute(source: string, resourcePath: string, pathMap?: PathMap): string {
  const templateNode = parse(source).descriptor.template?.ast

  if (!templateNode) {
    return source
  }

  let insertedStrLength = 0

  visitElementNodes(
    templateNode,
    (node) => {
      const startLocation = node.loc.start
      const insertPosition = insertedStrLength + startLocation.offset + node.tag.length + 1
      const isComponent = isPascalCase(node.tag)

      const tagInfo = {
        line: startLocation.line,
        column: startLocation.column,
        view: pathMap ? resourcePath.replace(pathMap[0], pathMap[1]) : resourcePath,
        ...(isComponent ? { component: node.tag } : {}),
      }
      const dataAttribute = ` data-tag-info="${escapeHtml(JSON.stringify(tagInfo))}" `
      insertedStrLength += dataAttribute.length
      source = insertStrAt(source, insertPosition, dataAttribute)
    },
    ['template']
  )

  return source
}

function escapeHtml(text: string) {
  const characterEntitiesMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }

  return text.replace(/[&<>"']/g, function (character) {
    return characterEntitiesMap[character as keyof typeof characterEntitiesMap]
  })
}

function insertStrAt(str: string, position: number, insertedStr: string) {
  const offset = position < 0 ? str.length + position : position
  return str.substring(0, offset) + insertedStr + str.substring(offset)
}

function visitElementNodes(
  node: ElementNode,
  callback: (elementNode: ElementNode) => void,
  excludeTags: string[]
): void {
  if (!excludeTags.includes(node.tag)) {
    callback(node)
  }

  if (!('children' in node)) {
    return
  }

  for (const childNode of node.children) {
    if (childNode.type !== NodeTypes.ELEMENT) {
      continue
    }

    visitElementNodes(childNode, callback, excludeTags)
  }
}

function isPascalCase(str: string): boolean {
  return upperFirst(camelCase(str)) === str
}
