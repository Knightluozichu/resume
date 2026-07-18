"use client";

import { LuaOfficialLab } from "./official-lab";

const requireCases = [
  { label: "Cache hit", fields: [["State", "package.loaded[name] is truthy"], ["Action", "Return the cached export"], ["Boundary", "The loader is not run again"]] },
  { label: "First load", fields: [["State", "No cached export"], ["Action", "Find a loader, execute it, cache its result"], ["Boundary", "Top-level side effects happen during this call"]] },
  { label: "Nil return", fields: [["State", "Loader returns nil and did not set package.loaded"], ["Action", "require uses a truthy completion marker"], ["Boundary", "A useful module should explicitly return its export table"]] },
  { label: "Reload", fields: [["State", "Caller clears package.loaded[name]"], ["Action", "A later require may create a new export identity"], ["Boundary", "Existing references still point to the old object"]], alert: "require caches by the exact module-name string. Different names that resolve to the same file can create distinct module instances." },
] as const;

const searchCases = [
  { label: "preload", fields: [["Source", "package.preload[name]"], ["Result", "An already-registered loader"], ["Use", "Embedded or bundled modules"]] },
  { label: "Lua path", fields: [["Source", "package.path templates"], ["Result", "A text/binary-compatible Lua loader for a matching file"], ["Use", "Pure Lua modules; dots usually become directory separators"]] },
  { label: "C path", fields: [["Source", "package.cpath and native symbol conventions"], ["Result", "A native loader"], ["Use", "Trusted ABI-compatible libraries"]] },
  { label: "Custom", fields: [["Source", "An appended package.searchers entry"], ["Result", "Loader plus search data, or a diagnostic string"], ["Use", "Versioned virtual stores or signed bundles"]], alert: "A searcher locates and returns a loader; it should not silently execute the module or swallow diagnostics. Search order is authority order." },
] as const;

const packageCases = [
  { label: "Module table", fields: [["Layout", "local M = {}; function M.run() ... end; return M"], ["Visibility", "Only fields on M are exported"], ["Risk", "Returning mutable internals leaks write capability"]] },
  { label: "Local alias", fields: [["Layout", "local json = require(\"pkg.json\")"], ["Visibility", "The alias is lexical and renameable"], ["Risk", "Renaming the local does not change cache identity"]] },
  { label: "Submodule", fields: [["Layout", "pkg/init.lua and pkg/feature.lua by configured templates"], ["Visibility", "require(\"pkg\") does not automatically load pkg.feature"], ["Risk", "Implicit side-effect imports make dependencies unclear"]] },
  { label: "Dependency graph", fields: [["Layout", "Each module explicitly requires direct dependencies"], ["Visibility", "Private helpers stay local"], ["Risk", "Cycles can expose partially initialized exports"]], alert: "A package is a naming and file-layout convention, not an automatic object hierarchy. Parent and child modules must define explicit loading and export policy." },
] as const;

export function PilRequireStateLab() {
  return <LuaOfficialLab cases={requireCases} caption="require maps an exact module name through search and one-time initialization into a cached export identity." tone="cyan" />;
}

export function PilModuleSearchLab() {
  return <LuaOfficialLab cases={searchCases} caption="Ordered searchers consult preload, Lua paths, C paths, or custom stores and return loaders with diagnostics." tone="violet" />;
}

export function PilPackageLayoutLab() {
  return <LuaOfficialLab cases={packageCases} caption="Module tables, lexical aliases, submodule files, and direct dependency edges form an explicit package contract." tone="emerald" />;
}
