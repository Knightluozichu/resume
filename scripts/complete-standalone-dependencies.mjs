#!/usr/bin/env node
// Narrow, pinned packaging policy. No dependency installation or trace rewriting.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const PACKAGE = "node_modules/.pnpm/semver@6.3.1/node_modules/semver";
const ALIAS = "node_modules/.pnpm/node_modules/semver";
const LINK = "../semver@6.3.1/node_modules/semver";
const FILES = {
  LICENSE: "4ec3d4c66cd87f5c8d8ad911b10f99bf27cb00cdfcff82621956e379186b016b",
  "README.md":
    "c7d817091c6747e4f4fb7006bf60bd2040fd955ab7c37520f834c2af265876c6",
  "bin/semver.js":
    "a3ed56435cbd4b3f07a80c4a343edd86d787f89bf2cee0105bdf68cb653ba2a0",
  "package.json":
    "aa906c5bf8a2fa68683cae07d18553ae2538ed0d5a567911980b2ef25ee8b9ba",
  "range.bnf":
    "ed628fdaff64be366d07f6cc4559eae4de109826f743ea7f5e1588c370bca49a",
  "semver.js":
    "d89ed53251e85463bf4300ae9a3e258dc75eb73eb2820d524bd05f4451bed3d4",
};
// Deliberate lock-version policy, not a machine installation-metadata pin.
const LOCK_SHA =
  "6cf1c530e7499b2d4ab7ede71948e52e52537080b967f0e75aec9c02bedb6b0a";
const MODULES = "node_modules/.modules.yaml";
// Existing lock-managed dependency (vfile-matter -> yaml); never download/fallback.
const YAML_PACKAGE = "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml";
const SRI =
  "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==";
// r4 full copy census: 534444 ticks, including both complete NFT traversals.
// Fixed 650000 ceiling gives ~21.6% finite operation headroom, not fewer checks.
const MAX_VISITED = 650_000;
const MAX_ELAPSED_MS = 60_000;
const started = performance.now();
let visited = 0;
let phase = "arguments";
let phaseStartVisited = 0;
let phaseStarted = started;
const phases = [];
const check = (ok, message) => {
  if (!ok) throw new Error(message);
};
function resourceUsage() {
  return {
    visited,
    elapsedMs: performance.now() - started,
    phase,
    maxVisited: MAX_VISITED,
    maxElapsedMs: MAX_ELAPSED_MS,
    phases: [
      ...phases,
      {
        phase,
        ticks: visited - phaseStartVisited,
        elapsedMs: performance.now() - phaseStarted,
      },
    ],
  };
}
function enterPhase(next) {
  phases.push({
    phase,
    ticks: visited - phaseStartVisited,
    elapsedMs: performance.now() - phaseStarted,
  });
  phase = next;
  phaseStartVisited = visited;
  phaseStarted = performance.now();
}
function tick() {
  ++visited;
  const elapsedMs = performance.now() - started;
  const reasons = [];
  if (elapsedMs >= MAX_ELAPSED_MS) reasons.push("ELAPSED_LIMIT");
  if (visited > MAX_VISITED) reasons.push("OPERATION_LIMIT");
  if (reasons.length) {
    const error = new Error(
      `Resource bound exceeded: ${reasons.join(",")} visited=${visited}/${MAX_VISITED} elapsedMs=${elapsedMs.toFixed(3)}/${MAX_ELAPSED_MS} phase=${phase}`,
    );
    error.boundReasons = reasons;
    throw error;
  }
}
const hash = (data) => crypto.createHash("sha256").update(data).digest("hex");
const hashFile = (p) => {
  tick();
  check(fs.statSync(p).size <= 256 * 1024 * 1024, `Oversized file: ${p}`);
  return hash(fs.readFileSync(p));
};
const inside = (base, p) => p !== base && p.startsWith(base + path.sep);
const stat = (p) => {
  try {
    return fs.lstatSync(p);
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw e;
  }
};
function directories(base, relative, create = false) {
  if (relative === ".") return base;
  let p = base;
  for (const bit of relative.split("/").filter(Boolean)) {
    check(bit !== "." && bit !== "..", "Unsafe directory component");
    p = path.join(p, bit);
    if (!stat(p) && create) fs.mkdirSync(p); // exclusive: concurrent creation fails
    const s = stat(p);
    check(
      s?.isDirectory() && !s.isSymbolicLink(),
      `Non-directory/symlink ancestor: ${p}`,
    );
  }
  return p;
}
function regular(p, allowSourceHardlink = false) {
  const s = fs.lstatSync(p);
  check(
    s.isFile() && (allowSourceHardlink ? s.nlink >= 1 : s.nlink === 1),
    `Invalid/shared regular file: ${p}`,
  );
  return {
    kind: "file",
    size: s.size,
    sha256: hashFile(p),
    mode: s.mode & 0o777,
    nlink: s.nlink,
    dev: s.dev,
    ino: s.ino,
  };
}
function walk(base, visit, prefix = "") {
  tick();
  for (const name of fs.readdirSync(path.join(base, prefix)).sort()) {
    tick();
    const rel = prefix ? `${prefix}/${name}` : name;
    const p = path.join(base, rel),
      s = fs.lstatSync(p);
    visit(rel, p, s);
    if (s.isDirectory()) walk(base, visit, rel);
  }
}
function contentIdentity(record) {
  const { kind, size, sha256, mode } = record;
  return { kind, size, sha256, mode };
}
function sameContent(a, b) {
  return (
    JSON.stringify(contentIdentity(a)) === JSON.stringify(contentIdentity(b))
  );
}
function packageInventory(base, allowSourceHardlink = false) {
  directories(base, PACKAGE);
  const result = {},
    dirs = [];
  walk(path.join(base, PACKAGE), (rel, p, s) => {
    if (s.isDirectory()) {
      dirs.push(rel);
      return;
    }
    check(s.isFile(), `Package has non-file: ${rel}`);
    result[rel] = regular(p, allowSourceHardlink);
  });
  check(
    JSON.stringify(Object.keys(result).sort()) ===
      JSON.stringify(Object.keys(FILES).sort()),
    "Package must contain exactly six files",
  );
  check(JSON.stringify(dirs) === '["bin"]', "Unexpected package directory");
  for (const [rel, digest] of Object.entries(FILES))
    check(result[rel].sha256 === digest, `Package SHA mismatch: ${rel}`);
  const pkg = JSON.parse(
    fs.readFileSync(path.join(base, PACKAGE, "package.json"), "utf8"),
  );
  check(
    pkg.name === "semver" &&
      pkg.version === "6.3.1" &&
      pkg.main === "semver.js" &&
      pkg.bin.semver === "./bin/semver.js",
    "Package identity mismatch",
  );
  return result;
}
function sourceBinding(project) {
  const metadata = {};
  for (const rel of ["pnpm-lock.yaml", MODULES]) {
    directories(project, path.dirname(rel));
    metadata[rel] = regular(path.join(project, rel), true);
  }
  check(
    metadata["pnpm-lock.yaml"].sha256 === LOCK_SHA,
    "Lock identity mismatch",
  );
  // Use the project's existing trusted dependency, not ambient NODE_PATH/global packages.
  directories(project, YAML_PACKAGE);
  const parserPackageFile = path.join(project, YAML_PACKAGE, "package.json");
  const parserPackage = JSON.parse(fs.readFileSync(parserPackageFile, "utf8"));
  check(
    parserPackage.name === "yaml" && parserPackage.version === "2.9.0",
    "YAML parser identity mismatch",
  );
  const parserFiles = {};
  walk(path.join(project, YAML_PACKAGE), (rel, p, s) => {
    if (s.isDirectory()) return;
    parserFiles[rel] = regular(p, true);
  });
  const { parseDocument } = createRequire(import.meta.url)(
    path.join(project, YAML_PACKAGE, "dist/index.js"),
  );
  const text = fs.readFileSync(path.join(project, MODULES), "utf8");
  check(
    Buffer.byteLength(text) <= 4 * 1024 * 1024,
    "Oversized modules metadata",
  );
  check(hash(text) === metadata[MODULES].sha256, "INPUT_CHANGED: modules read");
  // YAML also parses JSON, with duplicate-key checks unlike JSON.parse. No merges/custom tags.
  const doc = parseDocument(text, {
    version: "1.2",
    schema: "core",
    uniqueKeys: true,
    strict: true,
    merge: false,
  });
  check(
    doc.errors.length === 0 && doc.warnings.length === 0,
    `Invalid modules YAML: ${[...doc.errors, ...doc.warnings].map((e) => e.message).join("; ")}`,
  );
  const modules = doc.toJS({ mapAsMap: true, maxAliasCount: 100 });
  const hoists = modules instanceof Map && modules.get("hoistedDependencies");
  const semver = hoists instanceof Map && hoists.get("semver@6.3.1");
  check(
    semver instanceof Map && semver.get("semver") === "private",
    "Hoist identity mismatch",
  );
  for (const [pkg, aliases] of hoists) {
    check(
      pkg === "semver@6.3.1" ||
        !(aliases instanceof Map && aliases.get("semver") === "private"),
      "Conflicting private semver hoist",
    );
  }
  check(
    fs.readFileSync(path.join(project, "pnpm-lock.yaml"), "utf8").includes(SRI),
    "Lock integrity declaration missing",
  );
  directories(project, path.dirname(ALIAS));
  const aliasStat = fs.lstatSync(path.join(project, ALIAS));
  check(
    aliasStat.nlink >= 1 &&
      aliasStat.isSymbolicLink() &&
      fs.readlinkSync(path.join(project, ALIAS)) === LINK,
    "Source alias mismatch",
  );
  const files = packageInventory(project, true);
  check(
    fs.realpathSync(path.join(project, ALIAS)) === path.join(project, PACKAGE),
    "Source alias resolves incorrectly",
  );
  return {
    metadata,
    hoist: { package: "semver@6.3.1", alias: "semver", visibility: "private" },
    parser: {
      name: "yaml",
      version: "2.9.0",
      path: YAML_PACKAGE,
      files: parserFiles,
    },
    alias: LINK,
    aliasIdentity: {
      dev: aliasStat.dev,
      ino: aliasStat.ino,
      nlink: aliasStat.nlink,
    },
    package: { name: "semver", version: "6.3.1", sri: SRI, files },
  };
}
function standaloneInventory(output, allowKnownMissing) {
  const entries = {},
    dangling = [];
  walk(output, (rel, p, s) => {
    if (s.isDirectory()) {
      entries[rel] = { kind: "directory" };
      return;
    }
    if (s.isFile()) {
      entries[rel] = regular(p);
      return;
    }
    check(
      s.isSymbolicLink() && s.nlink === 1,
      `Unsupported/shared output node: ${rel}`,
    );
    const target = fs.readlinkSync(p);
    check(
      inside(output, path.resolve(path.dirname(p), target)),
      `External link: ${rel}`,
    );
    let resolved = null;
    try {
      resolved = fs.realpathSync(p);
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
    if (resolved === null) {
      check(
        allowKnownMissing && rel === ALIAS && target === LINK,
        `Unknown dangling link: ${rel}`,
      );
      dangling.push(rel);
    } else check(inside(output, resolved), `Escaping resolved link: ${rel}`);
    entries[rel] = { kind: "symlink", target, resolved };
  });
  check(
    entries[ALIAS]?.kind === "symlink" && entries[ALIAS].target === LINK,
    "Output hoisted alias missing/changed",
  );
  return { entries, dangling };
}
function nftInventory(project) {
  const traces = {};
  // Keep raw and standalone trace bytes unchanged; never follow a directory symlink.
  walk(path.join(project, ".next"), (rel, p, s) => {
    if (!rel.endsWith(".nft.json")) return;
    check(s.isFile() && s.nlink === 1, `Non-regular NFT: ${rel}`);
    traces[rel] = regular(p);
    const doc = JSON.parse(fs.readFileSync(p, "utf8"));
    check(
      Array.isArray(doc.files) && doc.files.every((f) => typeof f === "string"),
      `Malformed NFT: ${rel}`,
    );
    for (const f of doc.files) {
      tick();
      const target = path.resolve(path.dirname(p), f);
      check(inside(project, target), `NFT lexical escape: ${rel}: ${f}`);
      // Existing real targets cannot escape. Missing standalone targets are checked by output closure.
      try {
        check(
          inside(project, fs.realpathSync(target)),
          `NFT resolved escape: ${rel}: ${f}`,
        );
      } catch (e) {
        check(
          e.code === "ENOENT" &&
            target === path.join(project, ".next/standalone", ALIAS),
          `Missing/invalid NFT target: ${rel}: ${f}: ${e.message}`,
        );
      }
    }
  });
  const root = path.join(project, ".next/next-server.js.nft.json");
  check(traces["next-server.js.nft.json"], "Root NFT missing");
  const files = JSON.parse(fs.readFileSync(root, "utf8")).files;
  check(
    files.some(
      (f) => path.resolve(path.dirname(root), f) === path.join(project, ALIAS),
    ),
    "Known alias absent from root NFT",
  );
  return traces;
}

let report = {
  schemaVersion: 1,
  status: "REJECTED",
  startedAt: new Date().toISOString(),
  rawNextClaim: "NOT_CERTIFIED_BY_PACKAGING",
  added: [],
  copyAttempts: [],
};
let manifestFd;
try {
  const args = process.argv.slice(2),
    options = {};
  check(
    args.length === 0 || args.length === 2 || args.length === 4,
    "Usage: node complete-standalone-dependencies.mjs [--project ABS_PROJECT] [--manifest ABS_PROJECT/.next/UNIQUE.json]",
  );
  for (let i = 0; i < args.length; i += 2) {
    check(
      ["--project", "--manifest"].includes(args[i]) &&
        !options[args[i]] &&
        args[i + 1],
      "Invalid/duplicate option",
    );
    options[args[i]] = args[i + 1];
  }
  const project = options["--project"] ?? fs.realpathSync(process.cwd());
  const manifest =
    options["--manifest"] ??
    path.join(
      project,
      ".next",
      `standalone-assembly-${crypto.randomUUID()}.json`,
    );
  check(
    project &&
      manifest &&
      path.isAbsolute(project) &&
      path.isAbsolute(manifest),
    "Absolute paths required",
  );
  check(
    fs.realpathSync(project) === project,
    "Project must be canonical (no symlink spelling)",
  );
  directories(project, ".next/standalone");
  check(
    path.dirname(manifest) === path.join(project, ".next") &&
      path.basename(manifest).endsWith(".json") &&
      !path.basename(manifest).endsWith(".nft.json"),
    "Manifest must be new .next/*.json, not NFT or standalone",
  );
  const output = path.join(project, ".next/standalone");
  manifestFd = fs.openSync(
    manifest,
    fs.constants.O_WRONLY |
      fs.constants.O_CREAT |
      fs.constants.O_EXCL |
      fs.constants.O_NOFOLLOW,
    0o600,
  );
  enterPhase("scriptIdentity");
  report = {
    ...report,
    project,
    output,
    manifest,
    scriptSha256: hashFile(fileURLToPath(import.meta.url)),
  };
  enterPhase("sourceBefore");
  report.sourceBefore = sourceBinding(project);
  enterPhase("rawNftBefore");
  report.rawNftBefore = nftInventory(project);
  enterPhase("standaloneBefore");
  report.before = standaloneInventory(output, true);
  report.rawNextIntegrity = report.before.dangling.length
    ? "KNOWN_DANGLING_LINK_PRESENT"
    : "COMPLETE_FOR_THIS_POLICY";
  const destination = path.join(output, PACKAGE);
  enterPhase("copyOrVerifyExisting");
  if (stat(destination)) {
    const present = packageInventory(output);
    for (const [rel, src] of Object.entries(
      report.sourceBefore.package.files,
    )) {
      check(
        sameContent(present[rel], src),
        `Existing package conflicts with source: ${rel}`,
      );
      check(
        present[rel].dev !== src.dev || present[rel].ino !== src.ino,
        `Existing package shares source inode: ${rel}`,
      );
    }
    report.action = "VERIFIED_NO_OP";
  } else {
    report.action = "COPY_BOUND_PACKAGE";
    // All validation above precedes any output mutation. No force/overwrite or symlink following.
    directories(output, path.dirname(PACKAGE), true);
    fs.mkdirSync(destination);
    for (const [rel, expected] of Object.entries(
      report.sourceBefore.package.files,
    )) {
      if (path.dirname(rel) !== ".")
        directories(destination, path.dirname(rel), true);
      const src = path.join(project, PACKAGE, rel),
        dst = path.join(destination, rel);
      check(
        JSON.stringify(regular(src, true)) === JSON.stringify(expected),
        `Source changed before copy: ${rel}`,
      );
      const attempt = {
        source: src,
        destination: dst,
        expectedSha256: expected.sha256,
        state: "ATTEMPTED",
      };
      report.copyAttempts.push(attempt);
      fs.copyFileSync(src, dst, fs.constants.COPYFILE_EXCL);
      attempt.state = "COPIED_NOT_YET_VERIFIED";
      fs.chmodSync(dst, expected.mode);
      const actual = regular(dst);
      check(sameContent(actual, expected), `Copy mismatch: ${rel}`);
      const a = fs.statSync(src),
        b = fs.statSync(dst);
      check(
        a.dev !== b.dev || a.ino !== b.ino,
        `Copy shares source inode: ${rel}`,
      );
      attempt.state = "VERIFIED_INDEPENDENT_COPY";
      report.added.push({
        path: `${PACKAGE}/${rel}`,
        source: src,
        ...actual,
        sourceIdentity: { dev: a.dev, ino: a.ino, nlink: a.nlink },
        destinationIdentity: { dev: b.dev, ino: b.ino, nlink: b.nlink },
      });
    }
  }
  enterPhase("sourceAfter");
  report.sourceAfter = sourceBinding(project);
  check(
    JSON.stringify(report.sourceBefore) === JSON.stringify(report.sourceAfter),
    "INPUT_CHANGED",
  );
  enterPhase("packageAfter");
  packageInventory(output);
  enterPhase("standaloneAfter");
  report.after = standaloneInventory(output, false);
  enterPhase("rawNftAfter");
  report.rawNftAfter = nftInventory(project);
  check(
    JSON.stringify(report.rawNftBefore) === JSON.stringify(report.rawNftAfter),
    "RAW_NFT_CHANGED",
  );
  enterPhase("compareOutput");
  for (const [rel, before] of Object.entries(report.before.entries)) {
    const after = report.after.entries[rel];
    // Only known link resolution may change from absent to its bound target.
    check(
      JSON.stringify({
        ...before,
        ...(rel === ALIAS ? { resolved: null } : {}),
      }) ===
        JSON.stringify({
          ...after,
          ...(rel === ALIAS ? { resolved: null } : {}),
        }),
      `Existing output changed: ${rel}`,
    );
  }
  const allowedNew = new Set([
    PACKAGE,
    ...Object.keys(FILES).map((f) => `${PACKAGE}/${f}`),
    `${PACKAGE}/bin`,
  ]);
  let parent = path.dirname(PACKAGE);
  while (parent !== ".") {
    allowedNew.add(parent);
    parent = path.dirname(parent);
  }
  for (const rel of Object.keys(report.after.entries))
    check(
      report.before.entries[rel] || allowedNew.has(rel),
      `Unexpected addition: ${rel}`,
    );
  enterPhase("complete");
  report.status = "ASSEMBLED_OUTPUT_VERIFIED";
} catch (e) {
  report.error = e.message;
  report.failureContext = {
    ...resourceUsage(),
    boundReasons: e.boundReasons ?? [],
  };
  report.failurePolicy =
    "No rollback/deletion: preserve partial writes and reject this artifact; never overwrite conflicts.";
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  report.resourceUsage = resourceUsage();
  const text = JSON.stringify(report, null, 2) + "\n";
  if (manifestFd !== undefined) {
    try {
      fs.writeFileSync(manifestFd, text);
      fs.fsyncSync(manifestFd);
    } finally {
      fs.closeSync(manifestFd);
    }
  }
  process.stdout.write(text);
}
