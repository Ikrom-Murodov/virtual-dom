import { IVNode } from './interfaces';

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
