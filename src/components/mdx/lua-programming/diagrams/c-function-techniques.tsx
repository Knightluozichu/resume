"use client";

import { LuaOfficialLab } from "./official-lab";

const containerCases = [
  { label: "Read array", fields: [["API", "lua_rawlen plus lua_geti"], ["Stack effect", "Each element is pushed for validation"], ["Boundary", "Dense 1..n is a schema, not guaranteed by every table"]] },
  { label: "Write array", fields: [["API", "lua_createtable plus lua_seti"], ["Stack effect", "seti consumes the value"], ["Boundary", "Pre-size and cap output element count"]] },
  { label: "Read string", fields: [["API", "luaL_checklstring"], ["Stack effect", "No top change"], ["Boundary", "Use explicit length; embedded zero is valid"]] },
  { label: "Build string", fields: [["API", "luaL_Buffer operations"], ["Stack effect", "pushresult leaves one Lua string"], ["Boundary", "Limit growth and do not retain internal pointers"]], alert: "Lua tables and strings carry fewer native assumptions than C arrays and C strings. Validate density, length, and ownership at the boundary." },
] as const;

const registryCases = [
  { label: "Store", fields: [["Action", "Push an object and create a registry entry"], ["Identity", "Integer ref or collision-resistant private key"], ["Owner", "Host/module records the release obligation"]] },
  { label: "Lookup", fields: [["Action", "Push the referenced value back onto the stack"], ["Identity", "Validate expected type and generation"], ["Owner", "Temporary stack value does not transfer ownership"]] },
  { label: "Use", fields: [["Action", "Protected-call or inspect the value"], ["Identity", "Reference keeps the Lua object reachable"], ["Owner", "State/thread rules still apply"]] },
  { label: "Release", fields: [["Action", "luaL_unref or remove the private key"], ["Identity", "Old integer ref must not be reused by callers"], ["Owner", "Release once before state close or owner destruction"]], alert: "A registry reference is a GC root inside one Lua state. It is not a process-global handle and not valid after lua_close." },
] as const;

const stateCases = [
  { label: "C static", fields: [["Scope", "Process or shared-library instance"], ["Sharing", "Accidentally shared across Lua states/threads"], ["Use", "Only immutable data or explicitly synchronized process state"]] },
  { label: "Registry", fields: [["Scope", "One Lua global state"], ["Sharing", "All coroutines and modules can reach it through keys"], ["Use", "State-wide objects with namespaced identity"]] },
  { label: "Upvalue", fields: [["Scope", "One C closure"], ["Sharing", "Copied values are closure-local"], ["Use", "Configuration, handles, or private module context"]] },
  { label: "Shared table", fields: [["Scope", "A Lua table captured by several C closures"], ["Sharing", "Closures observe the same mutable fields"], ["Use", "Explicit module instance state"]], alert: "State placement determines isolation. Prefer Lua-owned state tied to the target lua_State over unscoped mutable C globals." },
] as const;

export function PilCContainerLab() {
  return <LuaOfficialLab cases={containerCases} caption="Array and string techniques translate Lua containers through explicit density, length, and stack contracts." tone="cyan" />;
}

export function PilRegistryLifecycleLab() {
  return <LuaOfficialLab cases={registryCases} caption="Registry values move through store, lookup, protected use, and explicit release inside one state." tone="amber" />;
}

export function PilCClosureStateLab() {
  return <LuaOfficialLab cases={stateCases} caption="C static data, registry entries, private upvalues, and shared upvalue tables have different isolation scopes." tone="violet" />;
}
