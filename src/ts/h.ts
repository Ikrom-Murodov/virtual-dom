import {
  IHProps,
  IVNode,
  IVNodeProps,
  THChildren,
  TVNodeChildren,
  TVNodeTagName,
} from './interfaces';

/**
 * This function transform simple attributes for a virtual node.
 * @param {IHProps['simpleAttrs']} simpleAttributes - {href: 'path', 'data-type': 'div', ...}
 * @returns {IVNodeProps['simpleAttrs']}
 */
function transformSimpleAttrsForVNode(
  simpleAttributes: IHProps['simpleAttrs'],
): IVNodeProps['simpleAttrs'] {
  return new Map<string, string>(Object.entries(simpleAttributes || {}));
}

/**
 * This function transform classes for a virtual dom.
 * @param {IHProps['classes']} classes - Classes to be added to the html element.
 * @returns {IVNodeProps['classes']}
 */
function transformClassesForVNode(
  classes: IHProps['classes'],
): IVNodeProps['classes'] {
  return new Set<string>(classes || []);
}
