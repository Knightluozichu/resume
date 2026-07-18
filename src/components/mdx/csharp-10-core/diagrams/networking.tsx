"use client";

import { CtcOfficialLab } from "./official-lab";

const endpointCases = [
  { label: "DNS name", fields: [["identity", "Logical host label"], ["boundary", "May resolve to changing address set"]] },
  { label: "IP address", fields: [["identity", "IPv4 or IPv6 interface address"], ["boundary", "Scope and route still matter"]] },
  { label: "port", fields: [["identity", "Transport service number"], ["boundary", "Meaning belongs to TCP or UDP tuple"]] },
  { label: "URI", fields: [["identity", "Scheme + authority + path/query"], ["boundary", "Parse, normalize, and escape by component"]] },
] as const;

const httpCases = [
  { label: "client factory", fields: [["lifetime", "Reusable handler pool"], ["gate", "DNS refresh, policies, cookie isolation"]] },
  { label: "headers", fields: [["lifetime", "Complete before optional body"], ["gate", "Status and size before buffering"]] },
  { label: "stream body", fields: [["lifetime", "Response owns connection until disposed"], ["gate", "Limit, cancel, drain or close"]] },
  { label: "server request", fields: [["lifetime", "Host-scoped context and cancellation"], ["gate", "Validate route, headers, body, auth"]] },
] as const;

const protocolCases = [
  { label: "DNS", fields: [["contract", "Name to multiple time-varying records"], ["gate", "TTL, family, failure, rebinding policy"]] },
  { label: "SMTP", fields: [["contract", "Submit message to configured relay"], ["gate", "TLS, auth, retry, duplicate policy"]] },
  { label: "TCP client", fields: [["contract", "Ordered byte stream"], ["gate", "Connect deadline, frame limits, half-close"]] },
  { label: "TCP server", fields: [["contract", "Accept many independent streams"], ["gate", "Concurrency cap and graceful shutdown"]] },
] as const;

export function CtcEndpointIdentityLab() { return <CtcOfficialLab cases={endpointCases} caption="Names, addresses, ports, and URIs describe different identities and must not be collapsed into one string." tone="cyan" />; }
export function CtcHttpLifecycleLab() { return <CtcOfficialLab cases={httpCases} caption="HTTP reliability depends on reusable connection ownership, bounded streaming, cancellation, and request validation." tone="violet" />; }
export function CtcNetworkProtocolLab() { return <CtcOfficialLab cases={protocolCases} caption="DNS, SMTP, and TCP expose distinct resolution, delivery, framing, retry, and shutdown contracts." tone="amber" />; }
