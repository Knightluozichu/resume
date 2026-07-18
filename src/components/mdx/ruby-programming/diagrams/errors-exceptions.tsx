"use client";

import { RubyOfficialLab } from "./official-lab";

const failureCases = [
  { label: "Expected", fields: [["Example", "Search finds no item"], ["Signal", "nil/empty/result value"], ["Caller", "Normal branch"]] },
  { label: "Invalid input", fields: [["Example", "Malformed integer"], ["Signal", "ArgumentError or domain error"], ["Caller", "Fix request, do not blindly retry"]] },
  { label: "Transient", fields: [["Example", "Temporary network timeout"], ["Signal", "Specific I/O exception"], ["Caller", "Bounded retry if operation is safe"]] },
  { label: "Invariant", fields: [["Example", "Impossible internal state"], ["Signal", "Dedicated error with context"], ["Caller", "Abort boundary, alert, preserve evidence"]] },
] as const;

const lifecycleCases = [
  { label: "begin", fields: [["Role", "Run the protected operation"], ["Success", "Continue to else"], ["Failure", "Select a matching rescue"]] },
  { label: "rescue", fields: [["Role", "Handle named exception classes"], ["Result", "May recover or re-raise"], ["Rule", "Keep protected region narrow"]] },
  { label: "else", fields: [["Role", "Run only when begin succeeded"], ["Advantage", "Its errors are not caught by sibling rescue"], ["Use", "Post-success processing"]] },
  { label: "ensure", fields: [["Role", "Run on success, failure, and control exit"], ["Use", "Release resources/restore state"], ["Risk", "A new error can mask the original"]] },
] as const;

const recoveryCases = [
  { label: "raise", fields: [["Input", "Exception class/message/cause"], ["Effect", "Unwind until a matching rescue"], ["Use", "Report an unfulfilled contract"]] },
  { label: "re-raise", fields: [["Code", "raise inside rescue"], ["Effect", "Preserve current exception/backtrace"], ["Use", "Add logging then delegate"]] },
  { label: "retry", fields: [["Effect", "Restart the rescued begin body"], ["Need", "Attempt/deadline/backoff and idempotency"], ["Risk", "Infinite duplicate side effects"]] },
  { label: "modifier", fields: [["Code", "value rescue fallback"], ["Scope", "Very broad/compact expression handling"], ["Risk", "Hides source and class of failure"]], alert: "Recovery must be narrower than the failure it handles and must not erase the original cause." },
] as const;

export function RubyFailureTaxonomyLab() {
  return <RubyOfficialLab cases={failureCases} caption="Expected absence, invalid input, transient failure, and invariant violation require different signals and caller actions." tone="cyan" />;
}

export function RubyExceptionLifecycleLab() {
  return <RubyOfficialLab cases={lifecycleCases} caption="begin, rescue, else, and ensure divide operation, recovery, success-only work, and unconditional cleanup." tone="violet" />;
}

export function RubyExceptionRecoveryLab() {
  return <RubyOfficialLab cases={recoveryCases} caption="raise, re-raise, retry, and rescue modifiers preserve very different amounts of evidence and control." tone="amber" />;
}
