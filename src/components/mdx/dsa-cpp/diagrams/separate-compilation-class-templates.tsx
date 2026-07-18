"use client";

import { useState } from "react";

type VisibilityFile = "MemoryCell.h" | "MemoryCell.cpp" | "TestMemoryCell.cpp";

const visibilityRows = {
  "MemoryCell.h": {
    sees: ["template declaration", "data member layout", "member signatures"],
    misses: ["member definitions", "concrete int/string code"],
    role: "shared declaration",
  },
  "MemoryCell.cpp": {
    sees: ["template declaration", "generic member definitions"],
    misses: ["requested concrete types", "consumer calls"],
    role: "definition translation unit",
  },
  "TestMemoryCell.cpp": {
    sees: ["template declaration", "int/string uses"],
    misses: ["member definitions", "generated member bodies"],
    role: "consumer translation unit",
  },
} as const;

export function DsaTemplateVisibilityMap() {
  const [file, setFile] = useState<VisibilityFile>("TestMemoryCell.cpp");
  const row = visibilityRows[file];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(visibilityRows) as VisibilityFile[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setFile(candidate)}
              className={
                "min-h-12 border px-1 text-[10px] font-semibold sm:text-xs " +
                (file === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[0.7fr_1fr_1fr]">
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            translation-unit role
            <div className="mt-1 font-mono text-accent">{row.role}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            visible here
            <div className="mt-2 space-y-1 font-mono text-success">
              {row.sees.map((item) => <div key={item}>+ {item}</div>)}
            </div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            absent here
            <div className="mt-2 space-y-1 font-mono text-warning">
              {row.misses.map((item) => <div key={item}>- {item}</div>)}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三个文件各自单独预处理与编译；“项目里存在定义”不等于实例化点能看见定义。
      </figcaption>
    </figure>
  );
}

type BuildStage = "compile-definition" | "compile-consumer" | "link";

const buildStages = {
  "compile-definition": {
    command: "c++ -c MemoryCell.cpp",
    result: "success",
    artifact: "MemoryCell.o: no concrete members",
    tone: "success",
  },
  "compile-consumer": {
    command: "c++ -c TestMemoryCell.cpp",
    result: "success",
    artifact: "TestMemoryCell.o: unresolved calls recorded",
    tone: "success",
  },
  link: {
    command: "c++ MemoryCell.o TestMemoryCell.o",
    result: "undefined reference",
    artifact: "missing MemoryCell<int/string> members",
    tone: "danger",
  },
} as const;

export function DsaTemplateBuildStageLab() {
  const [stage, setStage] = useState<BuildStage>("link");
  const active = buildStages[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["compile-definition", "compile-consumer", "link"] as BuildStage[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setStage(candidate)}
              className={
                "min-h-11 border px-1 text-[10px] font-semibold sm:text-xs " +
                (stage === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 border border-border bg-background p-3 font-mono text-xs text-primary">
          $ {active.command}
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className={"border p-3 text-xs " + (active.tone === "danger" ? "border-danger bg-danger/10 text-danger" : "border-success bg-success/10 text-success")}>
            {active.result}
          </div>
          <div className="border border-border bg-background p-3 font-mono text-xs text-secondary">
            {active.artifact}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        声明足够让两个源文件分别通过语法与类型检查，但只有链接器能确认具体成员符号是否真的生成。
      </figcaption>
    </figure>
  );
}

type PackagingModel = "include-definitions" | "explicit-instantiation";

const packagingModels = {
  "include-definitions": {
    visibility: "definition visible in every consumer",
    generatedBy: "each using translation unit",
    typeSet: "open: any valid Object",
    tradeoff: "more compile work; optimizer sees bodies",
  },
  "explicit-instantiation": {
    visibility: "definition private to MemoryCell.cpp",
    generatedBy: "one owner translation unit",
    typeSet: "closed: listed Object types only",
    tradeoff: "central codegen; library rebuild for new type",
  },
} as const;

export function DsaTemplatePackagingModelLab() {
  const [model, setModel] = useState<PackagingModel>("explicit-instantiation");
  const active = packagingModels[model];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(packagingModels) as PackagingModel[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setModel(candidate)}
              className={
                "min-h-12 border px-2 text-xs font-semibold " +
                (model === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            definition visibility
            <div className="mt-1 font-mono text-primary">{active.visibility}</div>
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            code generation owner
            <div className="mt-1 font-mono text-primary">{active.generatedBy}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            supported type set
            <div className="mt-1 font-mono text-success">{active.typeSet}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            engineering cost
            <div className="mt-1 font-mono text-warning">{active.tradeoff}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两种模型都能正确工作，但一个发布开放模板定义，另一个发布有限的已实例化类型集合。
      </figcaption>
    </figure>
  );
}

const candidateTypes = ["int", "std::string", "double"] as const;
type CandidateType = (typeof candidateTypes)[number];

export function DsaExplicitInstantiationMatrix() {
  const [enabled, setEnabled] = useState<Record<CandidateType, boolean>>({
    int: true,
    "std::string": true,
    double: false,
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {candidateTypes.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setEnabled((current) => ({ ...current, [candidate]: !current[candidate] }))}
              className={
                "min-h-11 border px-1 font-mono text-[10px] sm:text-xs " +
                (enabled[candidate]
                  ? "border-success bg-success/10 text-success"
                  : "border-border bg-background text-secondary")
              }
            >
              {enabled[candidate] ? "emitted " : "missing "}
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {candidateTypes.map((candidate) => (
            <div key={candidate} className="grid grid-cols-[1fr_auto] border border-border bg-background p-3 font-mono text-xs">
              <span className="min-w-0 break-all text-primary">MemoryCell&lt;{candidate}&gt;</span>
              <span className={enabled[candidate] ? "text-success" : "text-danger"}>
                {enabled[candidate] ? "linkable" : "undefined"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        显式实例化清单就是二进制支持范围；消费者增加新类型时，库的拥有者也必须生成对应符号。
      </figcaption>
    </figure>
  );
}

type DiagnosticSignal = "compile error" | "undefined reference" | "duplicate definition";

const diagnosticRows = {
  "compile error": {
    inspect: "template syntax, constraints, visible declarations",
    likely: "definition is visible but invalid for this Object",
  },
  "undefined reference": {
    inspect: "nm -C objects; instantiation owner; exact signatures",
    likely: "declaration visible, concrete member body never emitted",
  },
  "duplicate definition": {
    inspect: "specializations, non-inline helpers, explicit owners",
    likely: "more than one strong definition or ODR mismatch",
  },
} as const;

export function DsaTemplateDiagnosticLab() {
  const [signal, setSignal] = useState<DiagnosticSignal>("undefined reference");
  const active = diagnosticRows[signal];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={signal}
          onChange={(event) => setSignal(event.target.value as DiagnosticSignal)}
        >
          {(Object.keys(diagnosticRows) as DiagnosticSignal[]).map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            inspect first
            <div className="mt-1 font-mono text-accent">{active.inspect}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            likely contract failure
            <div className="mt-1 font-mono text-warning">{active.likely}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先按失败阶段分类，再检查可见性与符号归属；同一个“模板不能编译”描述可能对应完全不同的根因。
      </figcaption>
    </figure>
  );
}

export function DsaTemplateOwnershipFlow() {
  const [owner, setOwner] = useState<"consumer" | "library">("library");
  const stages = owner === "consumer"
    ? ["MemoryCell.h + .tpp", "consumer TU", "implicit instantiation", "consumer object"]
    : ["MemoryCell.cpp", "explicit list", "concrete instantiation", "library object"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["consumer", "library"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setOwner(candidate)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (owner === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate} owns codegen
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage} className="relative border border-border bg-background p-3 text-center font-mono text-[10px] text-primary sm:text-xs">
              <div className="mb-1 text-secondary">{index + 1}</div>
              {stage}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板代码生成必须有明确拥有者：要么每个消费者在定义可见时隐式生成，要么库翻译单元按清单集中生成。
      </figcaption>
    </figure>
  );
}
