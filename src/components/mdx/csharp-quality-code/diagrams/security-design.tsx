"use client";

import { useState } from "react";

const primitiveCases = [
  { label: "numeric bound", threat: "overflow changes authorization/size/price", primitive: "bounded type + checked arithmetic", key: "none", proves: "value remains in domain range", fails: "unchecked wrap or oversized allocation" },
  { label: "MD5", threat: "attacker creates collision", primitive: "do not use for security decisions", key: "none", proves: "at most a legacy/non-adversarial fingerprint", fails: "authenticity, signature or tamper resistance" },
  { label: "SHA-256", threat: "accidental corruption", primitive: "cryptographic digest with trusted expected value", key: "none", proves: "bytes match a separately trusted digest", fails: "attacker can replace file and digest together" },
  { label: "HMAC", threat: "untrusted party modifies data", primitive: "HMAC with managed secret key", key: "shared secret", proves: "integrity/authenticity to key holders", fails: "non-repudiation or safe key distribution" },
  { label: "hybrid AEAD", threat: "file disclosure and modification", primitive: "AEAD data key + KMS/public-key wrapping", key: "random data key + managed wrapping key", proves: "confidentiality and integrity", fails: "nonce reuse, weak key storage or lost metadata" },
];

export function CqcSecurityPrimitiveLab() {
  const [selected, setSelected] = useState(2);
  const item = primitiveCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{primitiveCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["threat", item.threat], ["primitive", item.primitive], ["key material", item.key], ["proves", item.proves]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">does not solve: {item.fails}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从threat和security property选择checked value、digest、HMAC或hybrid authenticated encryption。</figcaption></figure>;
}

const channelCases = [
  { label: "TLS default", asset: "data in transit", control: "HttpClient/SslStream with OS protocol policy", validation: "hostname + chain + expiry/revocation policy", secret: "private keys in platform/KMS store", failure: "fail closed; do not accept any certificate" },
  { label: "pinning", asset: "high-risk endpoint identity", control: "managed certificate/public-key pin policy", validation: "backup pins and rotation plan", secret: "no client secret required for public pin", failure: "bad rotation can cause outage" },
  { label: "SecureString", asset: "legacy Windows API credential input", control: "only when downstream API consumes it directly", validation: "avoid converting to long-lived string", secret: "dispose after smallest scope", failure: "not recommended for new modern .NET design" },
  { label: "secret store", asset: "service credential/key", control: "OS keychain, cloud secret manager or KMS", validation: "identity-based access + rotation", secret: "retrieve late, cache briefly, never log", failure: "availability and stale rotation need policy" },
  { label: "custom crypto", asset: "any protected data", control: "reject bespoke algorithm/protocol", validation: "use reviewed library and standard mode", secret: "managed by platform service", failure: "composition, nonce and side-channel bugs" },
];

export function CqcTransportSecretLab() {
  const [selected, setSelected] = useState(0);
  const item = channelCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{channelCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["asset", item.asset], ["control", item.control], ["validation", item.validation], ["secret lifecycle", item.secret]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">failure boundary: {item.failure}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较TLS validation、pinning、legacy SecureString、secret manager与custom crypto风险。</figcaption></figure>;
}

const trustCases = [
  { label: "strong name", identity: "assembly name/version/culture/public key identity", trust: "none by itself", permission: "does not sandbox runtime behavior", deployment: "legacy .NET Framework/GAC compatibility only", evidence: "binding identity tests" },
  { label: "package signing", identity: "publisher/package provenance", trust: "certificate/feed policy", permission: "still inspect and constrain installed code", deployment: "signed artifact + verified source", evidence: "signature, transparency/provenance and SBOM" },
  { label: "service identity", identity: "managed workload/user principal", trust: "issuer/audience/credential policy", permission: "role with only required actions/resources", deployment: "separate identities per environment/workload", evidence: "allow and deny authorization tests" },
  { label: "filesystem", identity: "process/container account", trust: "OS authentication", permission: "read/write only required paths", deployment: "read-only root and dedicated data volume", evidence: "attempt forbidden path and capability" },
  { label: "network", identity: "workload + endpoint identity", trust: "mTLS/token/DNS-certificate policy", permission: "explicit egress/ingress allowlist", deployment: "segment and deny by default", evidence: "blocked unexpected destination" },
];

export function CqcTrustPermissionLab() {
  const [selected, setSelected] = useState(2);
  const item = trustCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{trustCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["identity", item.identity], ["trust signal", item.trust], ["permission", item.permission], ["deployment", item.deployment]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">evidence: {item.evidence}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">区分artifact identity、publisher trust、workload identity与runtime least-privilege permission。</figcaption></figure>;
}
