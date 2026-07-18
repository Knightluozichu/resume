"use client";

import { CtcOfficialLab } from "./official-lab";

const representationCases = [
  { label: "text", fields: [["choice", "UTF-16 string / Rune / bytes"], ["gate", "Encoding, grapheme, comparison policy"]] },
  { label: "instant", fields: [["choice", "DateTimeOffset / UTC"], ["gate", "Unambiguous timeline value"]] },
  { label: "local time", fields: [["choice", "DateOnly/TimeOnly + zone"], ["gate", "DST gap/overlap resolution"]] },
  { label: "duration", fields: [["choice", "TimeSpan / monotonic Stopwatch"], ["gate", "Wall clock must not measure elapsed time"]] },
] as const;

const formatCases = [
  { label: "display", fields: [["culture", "User culture"], ["round trip", "Localized and not stable wire format"]] },
  { label: "wire", fields: [["culture", "Invariant explicit format"], ["round trip", "Versioned parse contract"]] },
  { label: "number", fields: [["culture", "NumberStyles + provider"], ["round trip", "Range and separator policy"]] },
  { label: "date", fields: [["culture", "Exact ISO-like pattern"], ["round trip", "Offset/kind preserved explicitly"]] },
] as const;

const comparisonCases = [
  { label: "equality", fields: [["question", "Are these the same value?"], ["contract", "Equals and GetHashCode agree"]] },
  { label: "order", fields: [["question", "Which comes first?"], ["contract", "Comparer is transitive and total/partial as declared"]] },
  { label: "identity", fields: [["question", "Are these the same entity/reference?"], ["contract", "Do not substitute value equality accidentally"]] },
  { label: "key", fields: [["question", "Can collections retrieve it later?"], ["contract", "Key fields and comparer stay stable"]] },
] as const;

export function CtcRepresentationChoiceLab() { return <CtcOfficialLab cases={representationCases} caption="Text, instants, local times, and durations require different representations and boundary tests." tone="cyan" />; }
export function CtcFormatCultureLab() { return <CtcOfficialLab cases={formatCases} caption="Display formats follow user culture; wire formats require explicit invariant round-trip contracts." tone="amber" />; }
export function CtcEqualityOrderLab() { return <CtcOfficialLab cases={comparisonCases} caption="Equality, ordering, identity, and key stability are related but distinct contracts." tone="emerald" />; }
