type TVNodeTagName = keyof HTMLElementTagNameMap;
type TVNodeChildren = Array<IVNode | Text> | string | IVNode;
type THChildren = Array<IVNode | string> | string | IVNode;

interface IVNodeProps {
  events: Map<keyof GlobalEventHandlersEventMap, EventListener>;
  styles: Map<keyof CSSStyleDeclaration, string>;
  simpleAttrs: Map<string, string>;
  classes: Set<string>;
}

interface IVNode {
  tag: TVNodeTagName;
  props: IVNodeProps;
  children: TVNodeChildren;
  $el?: HTMLElement;
}

interface IHProps {
  events?: { [K in keyof GlobalEventHandlersEventMap]?: EventListener };
  styles: { [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] };
  simpleAttrs?: { [key: string]: string };
  classes?: string[];
}
