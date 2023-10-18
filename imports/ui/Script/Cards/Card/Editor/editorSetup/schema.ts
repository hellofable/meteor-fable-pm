import { Schema, NodeSpec, MarkSpec, DOMOutputSpec } from "prosemirror-model"

const pDOM: DOMOutputSpec = ["p", 0], brDOM: DOMOutputSpec = ["br"]

/// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
  /// NodeSpec The top level document node.
  doc: {
    content: "block+"
  } as NodeSpec,

  /// A plain paragraph textblock. Represented in the DOM
  /// as a `<p>` element.
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM() { return pDOM }
  } as NodeSpec,




  /// The text node.
  text: {
    group: "inline"
  } as NodeSpec,



  /// A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM() { return brDOM }
  } as NodeSpec
}

const emDOM: DOMOutputSpec = ["em", 0]
const strongDOM: DOMOutputSpec = ["strong", 0]
const underlineDOM: DOMOutputSpec = ["u", 0]

/// [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {



  em: {
    spanning: false,
    parseDOM: [
      { tag: "i" }, { tag: "em" },
    ],
    toDOM() { return emDOM }
  } as MarkSpec,


  strong: {
    spanning: false,
    parseDOM: [
      { tag: "strong" },
    ],
    toDOM() { return strongDOM }
  } as MarkSpec,

  underline: {
    spanning: false,
    parseDOM: [
      { tag: "u" },
    ],
    toDOM() { return underlineDOM }
  } as MarkSpec

}

export const schema = new Schema({ nodes, marks })
