# A virtual DOM library.

##### This library uses webpack. I added my webpack config to the project. You can learn more [here](https://github.com/Ikrom-Murodov/Webpack-4).

### Installation

```
npm install virtual-dom-library
```

# Example

```ts
const currentVNode = h(
  'div',
  {
    classes: ['some-class'],

    events: {
      click: (event: Event): void => console.log('click'),
      mousedown: (event: Event): void => console.log('mouse down'),
    },

    simpleAttrs: { 'data-type': 'div' },

    styles: {
      border: '1px solid red',
      borderRadius: '5px',
      margin: '20px',
      padding: '15px',
    },
  },
  [
    'Some-Text-Node',
    h('span', null, 'Some child for span'),
    'Some new text node',
    h('hr', null, null),
  ],
);

const newVNode = h(
  'div',
  {
    classes: ['new-class'],
    events: { dblclick: (event: Event): void => console.log('dblclick') },
    simpleAttrs: { 'data-type': 'div', active: 'false' },
  },
  'New some child.',
);
mount(currentVNode, document.querySelector('#app') as HTMLElement);
patch(currentVNode, newVNode);
```

# Api

#### h - This function creates a virtual node than can then be inserted into a real dom through the mount function.

- @param {TVNodeTagName} tag - Html element name.
- @param {(IHProps|null)} props - Props for html element.
- @param {(THChildren|null)} children - Children for the html element.
- @returns {IVNode} A virtual node.

```ts
const virtualNode = h(
  'div',
  {
    classes: ['some-class'],

    events: {
      click: (event: Event): void => console.log('click'),
      mousedown: (event: Event): void => console.log('mouse down'),
    },

    simpleAttrs: { 'data-type': 'div' },

    styles: {
      border: '1px solid red',
      borderRadius: '5px',
      margin: '20px',
      padding: '15px',
    },
  },
  [
    'Some-Text-Node',
    h('span', null, 'Some child for span'),
    'Some new text node',
    h('hr', null, null),
  ],
);
```

#### mount - This function takes a virtual node and turns it into a real dom node and then inserts it into the html element.

- @param {IVNode} vNode - you can create virtual node with h function.
- @param { HTMLElement } container - Parent for the new html element.
- @returns {void} This function returns nothing.

```ts
const virtualNode = h(
  'div',
  {
    classes: ['some-class'],

    events: {
      click: (event: Event): void => console.log('click'),
      mousedown: (event: Event): void => console.log('mouse down'),
    },

    simpleAttrs: { 'data-type': 'div' },

    styles: {
      border: '1px solid red',
      borderRadius: '5px',
      margin: '20px',
      padding: '15px',
    },
  },
  [
    'Some-Text-Node',
    h('span', null, 'Some child for span'),
    'Some new text node',
    h('hr', null, null),
  ],
);

mount(virtualNode, document.querySelector('#app') as HTMLElement);
```

### patch - This function checks the difference between the new virtual node and the current.

- @param { IVNode } currentVNode - A virtual node that was added to the real DOM using
- the mount function.
- @param { IVNode } newVNode - New virtual node to change the previous one.
- @throws Throws an error if the current virtual node has not been added to
- the current DOM using the mount function.
- @returns { void } This function returns nothing.

```ts
const currentVNode = h(
  'div',
  {
    classes: ['some-class'],

    events: {
      click: (event: Event): void => console.log('click'),
      mousedown: (event: Event): void => console.log('mouse down'),
    },

    simpleAttrs: { 'data-type': 'div' },

    styles: {
      border: '1px solid red',
      borderRadius: '5px',
      margin: '20px',
      padding: '15px',
    },
  },
  [
    'Some-Text-Node',
    h('span', null, 'Some child for span'),
    'Some new text node',
    h('hr', null, null),
  ],
);

const newVNode = h(
  'div',
  {
    classes: ['new-class'],
    events: { dblclick: (event: Event): void => console.log('dblclick') },

    simpleAttrs: { 'data-type': 'div', active: 'false' },
  },

  'updated child',
);

mount(currentVNode, document.querySelector('#app') as HTMLElement);

patch(currentVNode, newVNode);
```

### createHtmlElementFromVNode - This function creates an html element from a virtual node.

- @param {IVNode} vNode - you can create virtual node with h function.
- @returns {HTMLElement}

```ts
const currentVNode = h(
  'div',
  {
    classes: ['some-class'],

    events: {
      click: (event: Event): void => console.log('click'),
      mousedown: (event: Event): void => console.log('mouse down'),
    },

    simpleAttrs: { 'data-type': 'div' },

    styles: {
      border: '1px solid red',
      borderRadius: '5px',
      margin: '20px',
      padding: '15px',
    },
  },
  [
    'Some-Text-Node',
    h('span', null, 'Some child for span'),
    'Some new text node',
    h('hr', null, null),
  ],
);

const element = createHtmlElementFromVNode();

console.log('Html element', element);
```
