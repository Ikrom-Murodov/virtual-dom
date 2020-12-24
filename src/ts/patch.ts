/* eslint-disable no-param-reassign */
import { IVNode } from './interfaces';

/**
 * This function removes events that are not in the new virtual node.
 *   And if the new virtual node has events that is in the current one,
 *   the function checks their handlers for equality and if their handlers
 *   are not equal, the function will overwrite the current handler with a new one.
 *
 * @param { IVNode } currentVNode - A virtual node that was added to the real DOM using
 *   the mount function.
 *
 * @param { IVNode } newVNode - New virtual node to change the previous one.
 *
 * @throws Throws an error if the current virtual node has not been added to
 *   the current DOM using the mount function
 *
 * @returns { void } This function returns nothing.
 */
function optimizationForEvents(currentVNode: IVNode, newVNode: IVNode): void {
  if (currentVNode.$el === undefined) {
    throw new Error(
      'First insert the virtual node into the dom using the mount function and then use this function',
    );
  }

  newVNode.$el = currentVNode.$el;

  currentVNode.props.events.forEach((currentEventHandler, eventName) => {
    const newEventHandler = newVNode.props.events.get(eventName);

    if (newEventHandler) {
      if (newEventHandler.toString() !== currentEventHandler.toString()) {
        newVNode.$el?.removeEventListener(eventName, currentEventHandler);
        newVNode.$el?.addEventListener(eventName, newEventHandler);
      }
    } else newVNode.$el?.removeEventListener(eventName, currentEventHandler);
  });

  newVNode.props.events.forEach((eventHandler, eventName) => {
    if (!currentVNode.props.events.has(eventName)) {
      newVNode.$el?.addEventListener(eventName, eventHandler);
    }
  });
}

/**
 * This function removes simple attributes that are not in the new virtual node.
 *   And if the new virtual node has simple attributes that is in the current one,
 *   the function checks their values for equality and if their values
 *   are not equal, the function will overwrite the current values with a new one.
 *
 * @param { IVNode } currentVNode - A virtual node that was added to the real DOM using
 *   the mount function.
 *
 * @param { IVNode } newVNode - New virtual node to change the previous one.
 *
 * @throws Throws an error if the current virtual node has not been added to
 *   the current DOM using the mount function
 *
 * @returns { void } This function returns nothing.
 */
function optimizationForSimpleAttributes(
  currentVNode: IVNode,
  newVNode: IVNode,
): void {
  if (currentVNode.$el === undefined) {
    throw new Error(
      'First insert the virtual node into the dom using the mount function and then use this function',
    );
  }

  newVNode.$el = currentVNode.$el;

  currentVNode.props.simpleAttrs.forEach((currentAttrValue, attrName) => {
    const newAttributeValue = newVNode.props.simpleAttrs.get(attrName);

    if (newAttributeValue) {
      if (newAttributeValue !== currentAttrValue) {
        newVNode.$el?.setAttribute(attrName, newAttributeValue);
      }
    } else newVNode.$el?.removeAttribute(attrName);
  });

  newVNode.props.simpleAttrs.forEach((attrValue, attrName) => {
    if (!currentVNode.props.simpleAttrs.has(attrName)) {
      newVNode.$el?.setAttribute(attrName, attrValue);
    }
  });
}
