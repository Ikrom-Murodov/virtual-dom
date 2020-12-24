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

/**
 * This function transform children for a virtual dom.
 * @param {THChildren} children - Children to be added to the html element.
 * @returns {TVNodeChildren}
 */
function transformChildrenForVNode(children: THChildren): TVNodeChildren {
  let transformChildren: TVNodeChildren;

  if (Array.isArray(children)) {
    transformChildren = children.map((child) => {
      if (typeof child === 'string') return document.createTextNode(child);
      return child;
    });
  } else if (typeof children === 'string') transformChildren = children;
  else if (children !== null) transformChildren = children;
  else transformChildren = '';

  return transformChildren;
}

/**
 * This function creates a virtual node than can then be inserted into a real dom
 *   through the mount function.
 *
 * @param {TVNodeTagName} tag - Html element name.
 * @param {(IHProps|null)}  props - Props for html element.
 * @param {(THChildren|null)} children - Children for the html element.
 * @returns {IVNode} A virtual node.
 */
export default function h(
  tag: TVNodeTagName,
  props: IHProps | null,
  children: THChildren | null,
): IVNode {
  const simpleAttrs = transformSimpleAttrsForVNode(props?.simpleAttrs);
  const classes = transformClassesForVNode(props?.classes);
  const events = transformEventsForVNode(props?.events);
  const styles = transformStylesForVNode(props?.styles);
  const tChildren = transformChildrenForVNode(children || '');

  return {
    tag,
    props: {
      simpleAttrs,
      classes,
      events,
      styles,
    },
    children: tChildren,
  };
}
