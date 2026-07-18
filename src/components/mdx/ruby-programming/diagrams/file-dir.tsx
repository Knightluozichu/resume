"use client";

import { RubyOfficialLab } from "./official-lab";

const fileCases = [
  { label: "Rename", fields: [["API", "File.rename"], ["Use", "Move/atomic replace on supported same filesystem"], ["Boundary", "Cross-device, destination overwrite, platform semantics"]] },
  { label: "Copy", fields: [["API", "FileUtils.cp / IO.copy_stream"], ["Use", "Duplicate contents"], ["Boundary", "Metadata, permissions, symlinks, partial failure"]] },
  { label: "Delete", fields: [["API", "File.delete / unlink"], ["Use", "Remove directory entry"], ["Boundary", "Missing, permissions, open handles, symlink target"]] },
  { label: "Atomic write", fields: [["Flow", "Temp in same dir -> flush/fsync -> rename"], ["Use", "Replace complete file"], ["Boundary", "Mode/owner, directory durability, cleanup"]] },
] as const;

const dirCases = [
  { label: "Read", fields: [["API", "Dir.each_child / entries"], ["Shape", "Names relative to directory"], ["Boundary", "Order is not a sorting guarantee"]] },
  { label: "Create", fields: [["API", "Dir.mkdir / FileUtils.mkdir_p"], ["Boundary", "Mode, parents, existing path, umask"], ["Rule", "Validate owner/root"]] },
  { label: "Remove", fields: [["API", "Dir.rmdir / FileUtils.rm_r"], ["Boundary", "Empty-only versus recursive"], ["Risk", "Never recurse on untrusted/unchecked root"]] },
  { label: "Attributes", fields: [["API", "File.stat/lstat, file?, directory?, symlink?"], ["Evidence", "Snapshot that can change immediately"], ["Rule", "Prefer operating and handling errors over check-then-act"]] },
] as const;

const libraryCases = [
  { label: "Path", fields: [["API", "File.join, expand_path, basename, dirname, extname"], ["Use", "Structured path manipulation"], ["Boundary", "Canonical root and symlink policy"]] },
  { label: "Find", fields: [["API", "Find.find"], ["Use", "Recursive traversal with prune"], ["Boundary", "Cycles, permissions, depth, file count"]] },
  { label: "Tempfile", fields: [["API", "Tempfile.create/new"], ["Use", "Unique restrictive temporary file"], ["Boundary", "Close/unlink, same-filesystem atomic replace"]] },
  { label: "FileUtils", fields: [["API", "cp, mv, mkdir_p, rm_r"], ["Use", "Higher-level filesystem operations"], ["Boundary", "Still requires trust root, conflict and failure policy"]], alert: "Path normalization alone cannot defeat symlink races; sensitive operations need directory-handle/sandbox or platform-specific secure APIs." },
] as const;

export function RubyFileOperationsLab() {
  return <RubyOfficialLab cases={fileCases} caption="Rename, copy, delete, and atomic replacement differ in metadata, filesystem, overwrite, and crash guarantees." tone="cyan" />;
}

export function RubyDirectoryOperationsLab() {
  return <RubyOfficialLab cases={dirCases} caption="Directory traversal, creation, removal, and attribute snapshots require explicit roots, order, recursion, and race policies." tone="violet" />;
}

export function RubyFilesystemLibrariesLab() {
  return <RubyOfficialLab cases={libraryCases} caption="Path helpers, Find, Tempfile, and FileUtils simplify mechanics but do not choose trust, resource, or durability policy." tone="amber" />;
}
