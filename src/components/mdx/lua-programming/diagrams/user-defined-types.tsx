"use client";

import { LuaOfficialLab } from "./official-lab";

const userdataCases = [
  { label: "Allocate", fields: [["API", "lua_newuserdata"], ["Lua owns", "A fixed-size aligned memory block"], ["Native duty", "Initialize every field before exposing it"]] },
  { label: "Type", fields: [["API", "luaL_setmetatable / luaL_checkudata"], ["Lua owns", "Metatable identity attached to this userdata"], ["Native duty", "Reject look-alike values and wrong module versions"]] },
  { label: "Use", fields: [["API", "Checked pointer from stack index"], ["Lua owns", "Reachability and one uservalue in Lua 5.3"], ["Native duty", "Bounds, closed flag, and thread affinity"]] },
  { label: "Collect", fields: [["API", "__gc when the object becomes unreachable"], ["Lua owns", "Userdata storage lifetime"], ["Native duty", "Release external resource idempotently if one exists"]], alert: "Full userdata makes a Lua-owned memory block, not every pointer stored inside it. External handles still need an explicit ownership protocol." },
] as const;

const metatableCases = [
  { label: "Method", fields: [["Lua syntax", "object:resize(n)"], ["Dispatch", "__index finds a C closure"], ["C frame", "self is argument 1"]] },
  { label: "Read index", fields: [["Lua syntax", "object[i]"], ["Dispatch", "__index handles an integer key"], ["C frame", "self at 1, key at 2"]] },
  { label: "Write index", fields: [["Lua syntax", "object[i] = value"], ["Dispatch", "__newindex validates and stores"], ["C frame", "self, key, value at 1..3"]] },
  { label: "Length", fields: [["Lua syntax", "#object"], ["Dispatch", "__len returns logical element count"], ["C frame", "self at 1; one integer result"]], alert: "One __index handler often needs two namespaces: integer elements and string methods. Dispatch them deliberately and reject all other keys." },
] as const;

const pointerCases = [
  { label: "Inline full", fields: [["Representation", "Native fields live inside userdata storage"], ["Lifetime", "Exactly the userdata lifetime"], ["Use", "Small structs and flexible trailing arrays"]] },
  { label: "Owned pointer", fields: [["Representation", "Userdata stores a pointer plus state flags"], ["Lifetime", "__gc/close releases external allocation"], ["Use", "Opaque library handles with idempotent destruction"]] },
  { label: "Borrowed pointer", fields: [["Representation", "Userdata stores non-owning pointer and owner token"], ["Lifetime", "Must not outlive external owner"], ["Use", "Views with generation/closed validation"]] },
  { label: "Light userdata", fields: [["Representation", "A bare void pointer value"], ["Lifetime", "No per-object storage, GC ownership, or individual metatable"], ["Use", "Identity keys and host-managed opaque tokens"]], alert: "A pointer-shaped value does not establish lifetime. State whether it is inline, owned, borrowed, or only an identity token." },
] as const;

export function PilUserdataLifecycleLab() {
  return <LuaOfficialLab cases={userdataCases} caption="Full userdata moves from allocation through type attachment and checked use to collection." tone="cyan" />;
}

export function PilUserdataDispatchLab() {
  return <LuaOfficialLab cases={metatableCases} caption="Methods, indexed reads/writes, and length operations enter distinct metamethod stack frames." tone="violet" />;
}

export function PilPointerOwnershipLab() {
  return <LuaOfficialLab cases={pointerCases} caption="Inline storage, owned pointers, borrowed views, and light userdata encode different lifetimes." tone="rose" />;
}
