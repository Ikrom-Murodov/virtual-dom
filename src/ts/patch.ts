/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { IVNode } from './interfaces';
import { createHtmlElementFromVNode, mount } from './mount';

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

/**
 * This function removes styles that are not in the new virtual node.
 *   And if the new virtual node has styles that is in the current one,
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
function optimizationForStyles(currentVNode: IVNode, newVNode: IVNode): void {
  if (currentVNode.$el === undefined) {
    throw new Error(
      'First insert the virtual node into the dom using the mount function and then use this function',
    );
  }

  newVNode.$el = currentVNode.$el;

  currentVNode.props.styles.forEach((value, property) => {
    if (property !== 'length' && property !== 'parentRule') {
      const newValue = newVNode.props.styles.get(property);

      if (newValue) {
        if (newValue !== value) {
          // eslint-disable-next-line
          // @ts-ignore
          currentVNode.$el.style[property] = newValue;
        }

        // eslint-disable-next-line
        // @ts-ignore
      } else currentVNode.$el.style[property] = '';
    }
  });

  newVNode.props.styles.forEach((value, property) => {
    if (!currentVNode.props.styles.has(property)) {
      if (property !== 'length' && property !== 'parentRule') {
        // eslint-disable-next-line
        // @ts-ignore
        currentVNode.$el!.style[property] = value;
      }
    }
  });
}

/**
 * This function removes classes that are not in the new virtual node.
 *   And if the new virtual node has classes that the current one has,
 *   the function will not change them.
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
function optimizationForClasses(currentVNode: IVNode, newVNode: IVNode): void {
  if (currentVNode.$el === undefined) {
    throw new Error(
      'First insert the virtual node into the dom using the mount function and then use this function',
    );
  }

  newVNode.$el = currentVNode.$el;

  currentVNode.props.classes.forEach((className) => {
    if (!newVNode.props.classes.has(className)) {
      newVNode.$el?.classList.remove(className);
    }
  });

  newVNode.props.classes.forEach((className) => {
    if (!currentVNode.props.classes.has(className)) {
      newVNode.$el?.classList.add(className);
    }
  });
}

/**
 * This function checks the difference between the new virtual node and the current.
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
export default function patch(currentVNode: IVNode, newVNode: IVNode): void {
  if (currentVNode.$el === undefined) {
    throw new Error(
      'First insert the virtual node into the dom using the mount function and then use this function',
    );
  }

  newVNode.$el = currentVNode.$el;

  const currentChildren = currentVNode.children;
  const newChildren = newVNode.children;

  if (typeof currentChildren === 'string' && typeof newChildren === 'string') {
    if (currentChildren !== newChildren) newVNode.$el.textContent = newChildren;
  } else if (Array.isArray(currentChildren) && Array.isArray(newChildren)) {
    [...currentVNode.$el.childNodes]
      .splice(newChildren.length)
      .forEach((child) => child.remove());

    newChildren.forEach((newChild, index) => {
      const currentChild = currentVNode.$el?.childNodes[index];

      if (currentChild) {
        if (newChild instanceof Text) {
          if (currentChild instanceof Text) {
            if (currentChild.textContent !== newChild.textContent) {
              currentChild.replaceWith(newChild);
            }
          } else currentChild.replaceWith(newChild);
        } else if (currentChild instanceof Text) {
          const newHtmlElement = createHtmlElementFromVNode(newChild);
          currentChild.replaceWith(newHtmlElement);
        } else patch(currentChildren[index] as IVNode, newChild);
      } else if (newChild instanceof Text) newVNode.$el?.append(newChild);
      else mount(newChild, newVNode.$el!);
    });
  } else if (
    Array.isArray(currentChildren) &&
    typeof newChildren === 'string'
  ) {
    newVNode.$el.textContent = newChildren;
  } else if (
    typeof currentChildren === 'string' &&
    Array.isArray(newChildren)
  ) {
    newVNode.$el.textContent = '';
    newChildren.forEach((child) => {
      if (child instanceof Text) newVNode.$el?.append(child);
      else mount(child, newVNode.$el!);
    });
  } else if (
    typeof currentChildren === 'object' &&
    Array.isArray(newChildren)
  ) {
    (currentChildren as IVNode).$el?.remove();
    newChildren.forEach((child) => {
      if (child instanceof Text) newVNode.$el?.append(child);
      else mount(child, newVNode.$el!);
    });
  } else if (
    Array.isArray(currentChildren) &&
    typeof newChildren === 'object'
  ) {
    currentVNode.$el.textContent = '';
    mount(newChildren as IVNode, currentVNode.$el!);
  } else if (
    typeof currentChildren === 'string' &&
    typeof newChildren === 'object'
  ) {
    currentVNode.$el.textContent = '';
    mount(newChildren as IVNode, currentVNode.$el);
  } else if (
    typeof currentChildren === 'object' &&
    typeof newChildren === 'string'
  ) {
    currentVNode.$el.textContent = newChildren;
  }

  optimizationForSimpleAttributes(currentVNode, newVNode);
  optimizationForClasses(currentVNode, newVNode);
  optimizationForEvents(currentVNode, newVNode);
  optimizationForStyles(currentVNode, newVNode);
}
