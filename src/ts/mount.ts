/* eslint-disable @typescript-eslint/no-use-before-define */
import { IVNode } from './interfaces';

/**
 * This function takes a virtual node and turns it into a real dom
 *   node and then inserts it into the html element.
 *
 * @param {IVNode} vNode - you can create virtual node with h function.
 * @param { HTMLElement } container - Parent for the new html element.
 * @returns {void} This function returns nothing.
 */
export function mount(vNode: IVNode, container: HTMLElement): void {
  const htmlElement = createHtmlElementFromVNode(vNode);
  container.append(htmlElement);
  // eslint-disable-next-line
  vNode.$el = htmlElement;
}

/**
 *  This function creates an html element from a virtual node.
 * @param {IVNode} vNode - you can create virtual node with h function.
 * @returns {HTMLElement}
 */
export default function createHtmlElementFromVNode(vNode: IVNode): HTMLElement {
  const el = document.createElement(vNode.tag);

  // Adding events to the html element.
  vNode.props.events.forEach((eventHandler, eventName) => {
    el.addEventListener(eventName, eventHandler);
  });

  // Adding styles to the html element.
  vNode.props.styles.forEach((value, property) => {
    if (property !== 'length' && property !== 'parentRule') {
      // eslint-disable-next-line
      // @ts-ignore
      el.style[property] = value;
    }
  });

  // Adding simple attributes to the html element.
  vNode.props.simpleAttrs.forEach((attrValue, attrName) => {
    el.setAttribute(attrName, attrValue);
  });

  // Adding classes the the html element
  vNode.props.classes.forEach((className) => el.classList.add(className));

  // Adding children to the html element.
  if (typeof vNode.children === 'string') el.textContent = vNode.children;
  else if (Array.isArray(vNode.children)) {
    // This logic will be implemented later
  } else {
    // This logic will be implemented later
  }

  return el;
}
