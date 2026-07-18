"use client";

import { CtcOfficialLab } from "./official-lab";

const domCases = [
  { label: "load", fields: [["input", "Text, stream, reader, URI"], ["gate", "Parser settings, base URI, line info"]] },
  { label: "construct", fields: [["input", "XElement/XAttribute content"], ["gate", "Functional construction and deep clone"]] },
  { label: "query", fields: [["input", "Axes and LINQ operators"], ["gate", "Namespace-aware names and deferred enumeration"]] },
  { label: "save", fields: [["input", "Writer, stream, file"], ["gate", "Declaration, encoding, formatting"]] },
] as const;

const mutationCases = [
  { label: "value", fields: [["operation", "Read/cast/set simple content"], ["risk", "Missing, mixed content, parse failure"]] },
  { label: "child", fields: [["operation", "Add/remove/replace nodes"], ["risk", "Live enumeration and parent ownership"]] },
  { label: "attribute", fields: [["operation", "Set/remove attributes"], ["risk", "No duplicate expanded names"]] },
  { label: "clone", fields: [["operation", "Insert node with existing parent"], ["risk", "LINQ to XML deep-clones content"]] },
] as const;

const namespaceCases = [
  { label: "expanded name", fields: [["identity", "Namespace URI + local name"], ["evidence", "Prefix does not define identity"]] },
  { label: "default", fields: [["identity", "Applies to elements, not unprefixed attributes"], ["evidence", "Queries use XNamespace"]] },
  { label: "annotation", fields: [["identity", "Out-of-band object attached to node"], ["evidence", "Not serialized automatically"]] },
  { label: "stream", fields: [["identity", "Yield subtrees from XmlReader"], ["evidence", "Bounded memory and reader lifetime"]] },
] as const;

export function CtcXDomLifecycleLab() { return <CtcOfficialLab cases={domCases} caption="LINQ to XML moves through parser, functional construction, namespace-aware queries, and controlled serialization." tone="cyan" />; }
export function CtcXDomMutationLab() { return <CtcOfficialLab cases={mutationCases} caption="Value reads, child/attribute updates, and cloning have distinct missing, ownership, and live-enumeration behavior." tone="amber" />; }
export function CtcXmlNamespaceStreamLab() { return <CtcOfficialLab cases={namespaceCases} caption="Expanded names, default namespaces, annotations, and streaming projections require explicit identity and lifetime rules." tone="violet" />; }
