/* eslint-disable @typescript-eslint/indent */
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
  simpleAttributes: IHProps['simpleAttrs'] = {},
): IVNodeProps['simpleAttrs'] {
  return new Map<string, string>(Object.entries(simpleAttributes));
}

/**
 * This function transform classes for a virtual dom.
 * @param {IHProps['classes']} classes - Classes to be added to the html element.
 * @returns {IVNodeProps['classes']}
 */
function transformClassesForVNode(
  classes: IHProps['classes'] = [],
): IVNodeProps['classes'] {
  return new Set<string>(classes);
}

/**
 * This function transform events for a virtual dom.
 * @param {IHProps['events']} events - Events to be added to the html element.
 * @returns {IVNodeProps['events']}
 */
function transformEventsForVNode(
  events: IHProps['events'] = {},
): IVNodeProps['events'] {
  const transformEvents = new Map<
    keyof GlobalEventHandlersEventMap,
    EventListener
  >();

  const keys = Object.keys(events) as Array<keyof GlobalEventHandlersEventMap>;
  keys.forEach((key) => transformEvents.set(key, events[key] as EventListener));
  return transformEvents;
}

/**
 * This function transform styles for a virtual dom.
 * @param {IHProps['styles']} styles - Styles to be added to the html element.
 * @returns {IVNodeProps['styles']}
 */
function transformStylesForVNode(
  styles: IHProps['styles'] = {},
): IVNodeProps['styles'] {
  const transformStyles = new Map<keyof CSSStyleDeclaration, string>();
  const keys = Object.keys(styles) as Array<keyof CSSStyleDeclaration>;

  keys.forEach((key) => {
    if (typeof styles[key] === 'string') {
      transformStyles.set(key, styles[key] as string);
    }
  });

  return transformStyles;
}
