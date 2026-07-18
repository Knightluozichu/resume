"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border bg-elevated p-4 sm:p-5">
      {children}
    </div>
  );
}

function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>{children}</Panel>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Stat({
  label,
  value,
  tone = "accent",
}: {
  label: string;
  value: string;
  tone?: "accent" | "warning" | "success" | "danger";
}) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return (
    <div className={`border p-3 text-center ${classes}`}>
      <div className="text-xs">{label}</div>
      <div className="mt-1 break-words font-mono text-sm">{value}</div>
    </div>
  );
}

function gcd(a: number, b: number) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

function extendedGcd(a: number, b: number) {
  let [oldR, r] = [a, b];
  let [oldS, s] = [1, 0];
  let [oldT, t] = [0, 1];
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }
  return { d: oldR, x: oldS, y: oldT };
}

function mod(value: number, modulus: number) {
  return ((value % modulus) + modulus) % modulus;
}

const BIGINT_ZERO = BigInt(0);
const BIGINT_ONE = BigInt(1);

function modPow(base: number, exponent: number, modulus: number) {
  let b = BigInt(mod(base, modulus));
  let e = BigInt(exponent);
  const m = BigInt(modulus);
  let result = BIGINT_ONE;
  while (e > BIGINT_ZERO) {
    if ((e & BIGINT_ONE) === BIGINT_ONE) result = (result * b) % m;
    b = (b * b) % m;
    e >>= BIGINT_ONE;
  }
  return Number(result);
}

export function CLRS4DivisibilityLab() {
  const [n, setN] = useState(36);
  const divisors = Array.from({ length: n }, (_, index) => index + 1).filter(
    (value) => n % value === 0,
  );
  const prime = divisors.length === 2;
  return (
    <Figure caption="Divisibility organizes integers into factors, primes, gcds, and residue classes; algorithms operate on compact binary inputs rather than enumerating all integers.">
      <label className="text-sm font-semibold text-primary">
        integer n = {n}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="2"
          max="80"
          value={n}
          onChange={(event) => setN(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="divisors" value={divisors.join(",")} />
        <Stat label="count" value={divisors.length.toString()} />
        <Stat
          label="prime"
          value={prime ? "yes" : "no"}
          tone={prime ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}

function euclidTrace(a: number, b: number) {
  const rows: string[] = [];
  let x = a;
  let y = b;
  while (y !== 0) {
    rows.push(`${x} = ${Math.floor(x / y)}·${y} + ${x % y}`);
    [x, y] = [y, x % y];
  }
  return { rows, result: x };
}

export function CLRS4EuclidLab() {
  const [a, setA] = useState(252);
  const [b, setB] = useState(105);
  const trace = euclidTrace(a, b);
  return (
    <Figure caption="Euclid repeatedly replaces (a,b) by (b,a mod b); the gcd is invariant and the remainder shrinks rapidly.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          a = {a}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="300"
            value={a}
            onChange={(event) => setA(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          b = {b}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="200"
            value={b}
            onChange={(event) => setB(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 space-y-2">
        {trace.rows.map((row) => (
          <div
            key={row}
            className="border border-border p-2 text-center font-mono text-xs text-secondary"
          >
            {row}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Stat label="gcd(a,b)" value={trace.result.toString()} tone="success" />
      </div>
    </Figure>
  );
}

export function CLRS4BezoutLab() {
  const [a, setA] = useState(99);
  const [b, setB] = useState(78);
  const result = extendedGcd(a, b);
  return (
    <Figure caption="Extended Euclid propagates coefficients backward and returns a Bézout identity ax+by=gcd(a,b).">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          a = {a}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="150"
            value={a}
            onChange={(event) => setA(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          b = {b}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="120"
            value={b}
            onChange={(event) => setB(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="x" value={result.x.toString()} />
        <Stat label="y" value={result.y.toString()} />
        <Stat
          label="ax+by"
          value={(a * result.x + b * result.y).toString()}
          tone="success"
        />
      </div>
    </Figure>
  );
}

export function CLRS4CongruenceLab() {
  const [value, setValue] = useState(-17);
  const [modulus, setModulus] = useState(7);
  return (
    <Figure caption="A residue class contains all integers with the same canonical remainder; normalization is needed because language remainder operators may return negative values.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          integer a = {value}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="-30"
            max="30"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          modulus n = {modulus}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="15"
            value={modulus}
            onChange={(event) => setModulus(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat
          label="language remainder"
          value={(value % modulus).toString()}
          tone="warning"
        />
        <Stat
          label="canonical residue"
          value={mod(value, modulus).toString()}
          tone="success"
        />
      </div>
    </Figure>
  );
}

export function CLRS4ModularInverseLab() {
  const [a, setA] = useState(17);
  const [n, setN] = useState(43);
  const result = extendedGcd(a, n);
  const invertible = result.d === 1;
  const inverse = invertible ? mod(result.x, n) : null;
  return (
    <Figure caption="a has a multiplicative inverse modulo n exactly when gcd(a,n)=1; the Bézout coefficient of a supplies that inverse.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          a = {a}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="50"
            value={a}
            onChange={(event) => setA(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          n = {n}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="60"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="gcd(a,n)" value={result.d.toString()} />
        <Stat
          label="inverse"
          value={inverse === null ? "none" : inverse.toString()}
          tone={invertible ? "success" : "danger"}
        />
        <Stat
          label="a·a⁻¹ mod n"
          value={
            inverse === null ? "undefined" : mod(a * inverse, n).toString()
          }
          tone={invertible ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}

export function CLRS4ModularEquationLab() {
  const [a, setA] = useState(14);
  const [b, setB] = useState(30);
  const n = 100;
  const solutions = Array.from({ length: n }, (_, x) => x).filter(
    (x) => mod(a * x, n) === mod(b, n),
  );
  const d = gcd(a, n);
  return (
    <Figure caption="The congruence ax≡b mod n has solutions iff gcd(a,n) divides b; when it does, exactly d residue solutions appear modulo n.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          a = {a}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="30"
            value={a}
            onChange={(event) => setA(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          b = {b}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="60"
            value={b}
            onChange={(event) => setB(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="d=gcd(a,100)" value={d.toString()} />
        <Stat
          label="d divides b"
          value={b % d === 0 ? "yes" : "no"}
          tone={b % d === 0 ? "success" : "danger"}
        />
        <Stat
          label="solutions mod 100"
          value={solutions.length === 0 ? "none" : solutions.join(",")}
          tone={solutions.length > 0 ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}

export function CLRS4CRTLab() {
  const [r3, setR3] = useState(2);
  const [r5, setR5] = useState(3);
  const [r7, setR7] = useState(2);
  const solution =
    Array.from({ length: 105 }, (_, x) => x).find(
      (x) => x % 3 === r3 && x % 5 === r5 && x % 7 === r7,
    ) ?? 0;
  return (
    <Figure caption="For pairwise-coprime moduli 3, 5, and 7, one residue triple reconstructs exactly one class modulo their product 105.">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-semibold text-primary">
          x mod 3 = {r3}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="2"
            value={r3}
            onChange={(event) => setR3(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          x mod 5 = {r5}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="4"
            value={r5}
            onChange={(event) => setR5(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          x mod 7 = {r7}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="6"
            value={r7}
            onChange={(event) => setR7(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat
          label="reconstructed x"
          value={solution.toString()}
          tone="success"
        />
        <Stat label="unique modulus" value="105" />
      </div>
    </Figure>
  );
}

export function CLRS4RepeatedSquaringLab() {
  const [exponent, setExponent] = useState(13);
  const modulus = 97;
  const bits = exponent.toString(2);
  const powers = bits.split("").map((bit, index) => `bit ${index}: ${bit}`);
  return (
    <Figure caption="Square-and-multiply scans the binary exponent, doing one square per bit and one extra multiply for every set bit.">
      <label className="text-sm font-semibold text-primary">
        compute 5ᵉ mod 97, e = {exponent}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="63"
          value={exponent}
          onChange={(event) => setExponent(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        {powers.map((entry) => (
          <div
            key={entry}
            className="border border-accent p-2 font-mono text-xs text-accent"
          >
            {entry}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat label="binary exponent" value={bits} />
        <Stat
          label="5ᵉ mod 97"
          value={modPow(5, exponent, modulus).toString()}
          tone="success"
        />
      </div>
    </Figure>
  );
}

export function CLRS4ElementOrderLab() {
  const [element, setElement] = useState(3);
  const modulus = 7;
  let order = 1;
  while (order <= modulus && modPow(element, order, modulus) !== 1) order += 1;
  const powers = Array.from(
    { length: Math.min(order, modulus - 1) },
    (_, index) => modPow(element, index + 1, modulus),
  );
  return (
    <Figure caption="The order of an element is the first positive exponent returning to the identity; in a finite group it divides the group size.">
      <label className="text-sm font-semibold text-primary">
        element a in Z₇* = {element}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="1"
          max="6"
          value={element}
          onChange={(event) => setElement(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat label="powers mod 7" value={powers.join(" → ")} />
        <Stat label="order(a)" value={order.toString()} tone="success" />
      </div>
    </Figure>
  );
}

export function CLRS4RSALab() {
  const [message, setMessage] = useState(65);
  const n = 61 * 53;
  const e = 17;
  const d = 2753;
  const ciphertext = modPow(message, e, n);
  const plaintext = modPow(ciphertext, d, n);
  return (
    <Figure caption="The textbook RSA arithmetic maps m to mᵉ mod n and back with exponent d satisfying ed≡1 mod φ(n); real encryption additionally needs standardized padding.">
      <label className="text-sm font-semibold text-primary">
        message representative m = {message}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="2"
          max="200"
          value={message}
          onChange={(event) => setMessage(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat label="public (n,e)" value="(3233,17)" />
        <Stat label="private d" value={d.toString()} tone="warning" />
        <Stat label="ciphertext" value={ciphertext.toString()} />
        <Stat
          label="decrypted"
          value={plaintext.toString()}
          tone={plaintext === message ? "success" : "danger"}
        />
      </div>
    </Figure>
  );
}

export function CLRS4RSAKeyLab() {
  const [e, setE] = useState(17);
  const phi = 3120;
  const result = extendedGcd(e, phi);
  const valid = result.d === 1;
  return (
    <Figure caption="RSA key generation requires e to be invertible modulo φ(n) or λ(n); extended Euclid then derives the private exponent.">
      <label className="text-sm font-semibold text-primary">
        public exponent e = {e}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="2"
          max="40"
          value={e}
          onChange={(event) => setE(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="gcd(e,3120)" value={result.d.toString()} />
        <Stat
          label="valid exponent"
          value={valid ? "yes" : "no"}
          tone={valid ? "success" : "danger"}
        />
        <Stat
          label="inverse d mod 3120"
          value={valid ? mod(result.x, phi).toString() : "none"}
          tone={valid ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}

export function CLRS4FermatPitfallLab() {
  const [base, setBase] = useState(2);
  const n = 561;
  const residue = modPow(base, n - 1, n);
  return (
    <Figure caption="The Carmichael number 561 passes Fermat congruences for every coprime base, showing why Fermat testing alone is not a primality certificate.">
      <label className="text-sm font-semibold text-primary">
        test base a = {base}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="2"
          max="20"
          value={base}
          onChange={(event) => setBase(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="gcd(a,561)" value={gcd(base, n).toString()} />
        <Stat
          label="a⁵⁶⁰ mod 561"
          value={residue.toString()}
          tone={residue === 1 ? "warning" : "danger"}
        />
        <Stat label="truth" value="561 = 3·11·17" tone="danger" />
      </div>
    </Figure>
  );
}

function millerRabinTrace(n: number, base: number) {
  let d = n - 1;
  let s = 0;
  while (d % 2 === 0) {
    d /= 2;
    s += 1;
  }
  const values = [modPow(base, d, n)];
  for (let i = 1; i < s; i += 1)
    values.push(mod(values[values.length - 1] ** 2, n));
  const passes = values[0] === 1 || values.some((value) => value === n - 1);
  return { d, s, values, passes };
}

export function CLRS4MillerRabinLab() {
  const [n, setN] = useState(561);
  const [base, setBase] = useState(2);
  const trace = millerRabinTrace(n, Math.min(base, n - 1));
  return (
    <Figure caption="Miller–Rabin factors n−1=2ˢd and inspects the repeated-squaring chain for a nontrivial square root pattern or a missing −1.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          odd candidate n
          <select
            className="mt-2 w-full border border-border bg-background p-2 text-primary"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          >
            <option value="97">97 prime</option>
            <option value="341">341 composite</option>
            <option value="561">561 composite</option>
            <option value="1105">1105 composite</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-primary">
          base a = {base}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="20"
            value={base}
            onChange={(event) => setBase(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="n−1=2ˢd" value={`s=${trace.s}, d=${trace.d}`} />
        <Stat
          label="squaring chain"
          value={trace.values.join(" → ")}
          tone="warning"
        />
        <Stat
          label="base verdict"
          value={trace.passes ? "non-witness" : "composite witness"}
          tone={trace.passes ? "warning" : "success"}
        />
      </div>
    </Figure>
  );
}

export function CLRS4NumberTheoryCertificateLab() {
  const [issue, setIssue] = useState<
    "valid" | "normalize" | "inverse" | "overflow" | "crypto"
  >("valid");
  const checks = {
    "residues use canonical normalization": issue !== "normalize",
    "inverse existence is checked by gcd": issue !== "inverse",
    "modular products avoid overflow": issue !== "overflow",
    "cryptographic primitives use standards": issue !== "crypto",
  };
  return (
    <Figure caption="A number-theory certificate checks domain assumptions, canonical residues, gcd conditions, overflow-safe modular arithmetic, and cryptographic protocol boundaries.">
      <label className="text-sm font-semibold text-primary">
        audit scenario
        <select
          className="mt-2 w-full border border-border bg-background p-2 text-primary"
          value={issue}
          onChange={(event) => setIssue(event.target.value as typeof issue)}
        >
          <option value="valid">validated arithmetic</option>
          <option value="normalize">negative remainder leaked</option>
          <option value="inverse">inverse assumed without gcd</option>
          <option value="overflow">product overflows before mod</option>
          <option value="crypto">textbook RSA deployed directly</option>
        </select>
      </label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(checks).map(([name, ok]) => (
          <div
            key={name}
            className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}
          >
            {name}
            <div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div>
          </div>
        ))}
      </div>
    </Figure>
  );
}
