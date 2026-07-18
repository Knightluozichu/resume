"use client";

import { CtcOfficialLab } from "./official-lab";

const xmlCases = [
  { label: "read", fields: [["state", "Current node token"], ["gate", "Depth, node type, empty element"]] },
  { label: "subtree", fields: [["state", "Bounded child reader"], ["gate", "Parent reader positioning/lifetime"]] },
  { label: "write", fields: [["state", "Open element/attribute stack"], ["gate", "Well-formed order and escaping"]] },
  { label: "bridge", fields: [["state", "Reader + XNode for selected subtree"], ["gate", "Mix streaming and DOM intentionally"]] },
] as const;

const jsonCases = [
  { label: "Utf8Reader", fields: [["model", "Forward ref-struct token reader"], ["lifetime", "Input buffer/state must remain valid"]] },
  { label: "Utf8Writer", fields: [["model", "Forward UTF-8 generator"], ["lifetime", "Caller owns buffer/stream and flush"]] },
  { label: "JsonDocument", fields: [["model", "Read-only indexed DOM"], ["lifetime", "Dispose document before pooled memory reuse"]] },
  { label: "JsonNode", fields: [["model", "Mutable object/array/value DOM"], ["lifetime", "Tree ownership and mutation"]] },
] as const;

const choiceCases = [
  { label: "typed", fields: [["need", "Known schema and domain model"], ["choice", "JsonSerializer with options/source generation"]] },
  { label: "stream", fields: [["need", "Huge or incremental payload"], ["choice", "Utf8 reader/writer"]] },
  { label: "inspect", fields: [["need", "Read arbitrary subset"], ["choice", "JsonDocument"]] },
  { label: "edit", fields: [["need", "Patch/build dynamic JSON"], ["choice", "JsonNode"]] },
] as const;

export function CtcXmlStreamStateLab() { return <CtcOfficialLab cases={xmlCases} caption="XmlReader and XmlWriter are forward state machines whose position and ownership must be explicit." tone="cyan" />; }
export function CtcJsonModelLab() { return <CtcOfficialLab cases={jsonCases} caption="System.Text.Json offers streaming and DOM models with distinct buffer, disposal, and mutation lifetimes." tone="violet" />; }
export function CtcJsonChoiceLab() { return <CtcOfficialLab cases={choiceCases} caption="Choose typed serialization, streaming, read-only inspection, or mutable DOM from schema and payload needs." tone="amber" />; }
