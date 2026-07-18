"use client";

import { CfpOfficialLab } from "./official-lab";

const elevatedCases = [
  { label: "Map", fields: [["inputs", "F<A> and A -> B"], ["result", "F<B>"]] },
  { label: "Apply", fields: [["inputs", "F<A -> B> and F<A>"], ["result", "F<B>; combines independent elevated inputs"]] },
  { label: "Bind", fields: [["inputs", "F<A> and A -> F<B>"], ["result", "F<B>; later computation depends on A"]] },
  { label: "Traverse", fields: [["inputs", "IEnumerable<F<A>>"], ["result", "F<IEnumerable<A>> with context-specific combination"]] },
] as const;

const lawCases = [
  { label: "functor", fields: [["law", "Identity and composition"], ["test", "Map id == id; composed maps agree"]] },
  { label: "applicative", fields: [["law", "Identity, homomorphism, interchange, composition"], ["test", "Apply preserves function/value structure"]] },
  { label: "monad", fields: [["law", "Left/right identity and associativity"], ["test", "Regrouping Bind does not change meaning"]] },
  { label: "effect", fields: [["law", "Equality includes context semantics"], ["test", "Compare values plus defined ordering/error behavior"]] },
] as const;

const decisionCases = [
  { label: "independent", fields: [["relationship", "Name and email validations do not depend on each other"], ["choice", "Apply to accumulate"]] },
  { label: "dependent", fields: [["relationship", "Load orders requires validated customer id"], ["choice", "Bind to short-circuit and pass value"]] },
  { label: "LINQ", fields: [["relationship", "Query syntax over Select/SelectMany"], ["choice", "Readable monadic chain when names/levels stay clear"]] },
  { label: "mixed effects", fields: [["relationship", "Task plus Either/Option"], ["choice", "Traverse/helper or explicit staging; do not flatten blindly"]] },
] as const;

export function CfpElevatedApplicationLab() { return <CfpOfficialLab cases={elevatedCases} caption="Map, Apply, Bind, and Traverse differ by where functions and values live and whether later work depends on earlier results." tone="cyan" />; }
export function CfpCompositionLawsLab() { return <CfpOfficialLab cases={lawCases} caption="Functor, applicative, and monad laws are refactoring contracts, not vocabulary badges." tone="amber" />; }
export function CfpBindApplyDecisionLab() { return <CfpOfficialLab cases={decisionCases} caption="Use Apply for independent elevated inputs, Bind for dependent steps, and explicit staging for mixed effects." tone="violet" />; }
