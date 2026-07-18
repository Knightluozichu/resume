"use client";

import { CtcOfficialLab } from "./official-lab";

const primitiveCases = [
  { label: "hash", fields: [["goal", "Content fingerprint"], ["gate", "No secrecy or keyed authenticity"]] },
  { label: "HMAC", fields: [["goal", "Keyed integrity and authenticity"], ["gate", "Shared secret and canonical bytes"]] },
  { label: "password KDF", fields: [["goal", "Slow offline-guess verification"], ["gate", "Random salt, cost, version, rehash"]] },
  { label: "AEAD", fields: [["goal", "Confidentiality plus integrity"], ["gate", "Unique nonce per key and verified tag"]] },
] as const;

const protectionCases = [
  { label: "CurrentUser", fields: [["scope", "Same Windows user profile"], ["gate", "Profile availability and backup"]] },
  { label: "LocalMachine", fields: [["scope", "Accounts on one Windows machine"], ["gate", "Add application authorization boundary"]] },
  { label: "data key", fields: [["scope", "Encrypt one object or partition"], ["gate", "Random generation and nonce policy"]] },
  { label: "key-encryption key", fields: [["scope", "KMS/HSM wraps data keys"], ["gate", "Key id, permissions, rotation, audit"]] },
] as const;

const asymmetricCases = [
  { label: "encrypt", fields: [["operation", "Public key protects a small secret"], ["gate", "OAEP policy and hybrid envelope"]] },
  { label: "decrypt", fields: [["operation", "Private key opens ciphertext"], ["gate", "Oracle-resistant errors and key access"]] },
  { label: "sign", fields: [["operation", "Private key signs canonical bytes"], ["gate", "Algorithm, context, key id, anti-replay"]] },
  { label: "verify", fields: [["operation", "Public key validates signature"], ["gate", "Trusted key source and policy before use"]] },
] as const;

export function CtcCryptoPrimitiveLab() { return <CtcOfficialLab cases={primitiveCases} caption="Hashing, HMAC, password derivation, and AEAD solve different security goals and are not interchangeable." tone="cyan" />; }
export function CtcKeyProtectionLab() { return <CtcOfficialLab cases={protectionCases} caption="Data protection and envelope encryption bind secret access to an explicit scope, key hierarchy, and rotation policy." tone="violet" />; }
export function CtcAsymmetricOperationLab() { return <CtcOfficialLab cases={asymmetricCases} caption="Public-key encryption and signatures reverse key roles but both require explicit algorithms, identities, and message formats." tone="amber" />; }
