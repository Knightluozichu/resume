"use client";

import { LuaOfficialLab } from "./official-lab";

const topologyCases = [
  { label: "Lua thread", fields: [["Private", "Execution stack and coroutine status"], ["Shared", "Global table, registry, heap, and GC with sibling threads"], ["Concurrency", "Cooperative; serialize access to the global state"]] },
  { label: "Main thread", fields: [["Private", "Its own execution stack"], ["Shared", "Owns the same global-state object graph"], ["Concurrency", "Can resume child threads when the API boundary is yieldable"]] },
  { label: "Lua state", fields: [["Private", "Heap, globals, registry, GC, allocator policy"], ["Shared", "Nothing Lua-managed with another independent state"], ["Concurrency", "May be assigned to one OS worker independently"]] },
  { label: "OS thread", fields: [["Private", "Native call stack and scheduler execution"], ["Shared", "Only explicitly synchronized host resources"], ["Concurrency", "Must never concurrently enter the same Lua global state"]], alert: "Lua thread, Lua state, and OS thread are three different axes. Name all three in concurrency designs." },
] as const;

const coroutineCases = [
  { label: "Create", fields: [["API", "lua_newthread"], ["Stack", "Pushes a thread object on the parent"], ["Root", "Store a registry reference before popping it"]] },
  { label: "Prepare", fields: [["API", "Push function and arguments on the child stack"], ["Stack", "Child owns its call frame"], ["Root", "C pointer alone does not keep the thread alive"]] },
  { label: "Resume", fields: [["API", "lua_resume in Lua 5.3"], ["Stack", "Results/yielded values remain on child stack"], ["Root", "Scheduler reads status and normalizes stack"]] },
  { label: "Release", fields: [["API", "luaL_unref after terminal cleanup"], ["Stack", "Clear results and host registrations"], ["Root", "Old reference and lua_State pointer are no longer used"]], alert: "lua_xmove transfers stack values only between threads that share one global state. It cannot bridge independent states." },
] as const;

const isolationCases = [
  { label: "Encode", fields: [["Message", "Versioned data-only envelope"], ["State A", "Validate types, depth, cycles, and byte limit"], ["Boundary", "No raw Lua pointers, closures, threads, or userdata"]] },
  { label: "Queue", fields: [["Message", "Host-owned bytes or immutable value tree"], ["State A/B", "No Lua API while holding an unsafe cross-worker lock"], ["Boundary", "Bounded capacity and cancellation ownership"]] },
  { label: "Decode", fields: [["Message", "Fresh Lua values in the receiver"], ["State B", "Validate schema/version and construct transactionally"], ["Boundary", "Receiver grants its own capabilities"]] },
  { label: "Libraries", fields: [["Message", "Code never implies ambient authority"], ["State B", "Open only required libraries/loaders"], ["Boundary", "package, io, os, debug, and C loaders remain policy decisions"]], alert: "State isolation is lost if the host passes unrestricted native capabilities through messages or opens all libraries by default." },
] as const;

export function PilThreadStateTopologyLab() {
  return <LuaOfficialLab cases={topologyCases} caption="Lua threads, the main thread, independent states, and OS threads have different sharing and concurrency scopes." tone="cyan" />;
}

export function PilCoroutineApiLab() {
  return <LuaOfficialLab cases={coroutineCases} caption="The C API creates, roots, resumes, drains, and releases a Lua coroutine explicitly." tone="violet" />;
}

export function PilStateIsolationLab() {
  return <LuaOfficialLab cases={isolationCases} caption="Independent states communicate through bounded messages and receive only on-demand library capabilities." tone="emerald" />;
}
