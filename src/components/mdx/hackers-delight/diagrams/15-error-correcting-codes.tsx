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
    <div className={`min-w-0 border p-3 text-center ${classes}`}>
      <div className="text-xs">{label}</div>
      <div className="mt-1 break-words font-mono text-sm">{value}</div>
    </div>
  );
}

function popcount(value: number) {
  let current = value >>> 0;
  let count = 0;
  while (current !== 0) {
    current &= current - 1;
    count += 1;
  }
  return count;
}

function hamming(left: number, right: number) {
  return popcount(left ^ right);
}

function encodeHamming74(data: number) {
  const d0 = data & 1;
  const d1 = (data >>> 1) & 1;
  const d2 = (data >>> 2) & 1;
  const d3 = (data >>> 3) & 1;
  const p1 = d0 ^ d1 ^ d3;
  const p2 = d0 ^ d2 ^ d3;
  const p4 = d1 ^ d2 ^ d3;
  return (
    p1 | (p2 << 1) | (d0 << 2) | (p4 << 3) | (d1 << 4) | (d2 << 5) | (d3 << 6)
  );
}

function syndrome74(word: number) {
  let syndrome = 0;
  for (let position = 1; position <= 7; position += 1) {
    if (((word >>> (position - 1)) & 1) !== 0) syndrome ^= position;
  }
  return syndrome;
}

function bitString(value: number, width: number) {
  return value.toString(2).padStart(width, "0");
}

function isParityPosition(position: number) {
  return position > 0 && (position & (position - 1)) === 0;
}

const BIGINT_ZERO = BigInt(0);
const BIGINT_ONE = BigInt(1);

function bitAt(word: bigint, position: number) {
  return Number((word >> BigInt(position - 1)) & BIGINT_ONE);
}

function flipAt(word: bigint, position: number) {
  return word ^ (BIGINT_ONE << BigInt(position - 1));
}

function popcountBig(word: bigint) {
  let current = word;
  let count = 0;
  while (current !== BIGINT_ZERO) {
    current &= current - BIGINT_ONE;
    count += 1;
  }
  return count;
}

function encodeSecded32(data: number) {
  let word = BIGINT_ZERO;
  let dataBit = 0;
  for (let position = 1; position <= 38; position += 1) {
    if (isParityPosition(position)) continue;
    if (((data >>> dataBit) & 1) !== 0)
      word |= BIGINT_ONE << BigInt(position - 1);
    dataBit += 1;
  }
  for (const parityPosition of [1, 2, 4, 8, 16, 32]) {
    let parity = 0;
    for (let position = 1; position <= 38; position += 1) {
      if ((position & parityPosition) !== 0) parity ^= bitAt(word, position);
    }
    if (parity !== 0) word |= BIGINT_ONE << BigInt(parityPosition - 1);
  }
  if ((popcountBig(word) & 1) !== 0) word |= BIGINT_ONE << BigInt(38);
  return word;
}

function secdedSyndrome(word: bigint) {
  let syndrome = 0;
  for (let position = 1; position <= 38; position += 1) {
    if (bitAt(word, position) !== 0) syndrome ^= position;
  }
  return syndrome;
}

function extractData32(word: bigint) {
  let data = 0;
  let dataBit = 0;
  for (let position = 1; position <= 38; position += 1) {
    if (isParityPosition(position)) continue;
    if (bitAt(word, position) !== 0) data = (data | (2 ** dataBit)) >>> 0;
    dataBit += 1;
  }
  return data >>> 0;
}

function decodeSecded32(received: bigint) {
  const syndrome = secdedSyndrome(received);
  const overall = popcountBig(received) & 1;
  let corrected = received;
  let status = "no error";
  if (overall === 1 && syndrome !== 0) {
    corrected = flipAt(received, syndrome);
    status = "single-bit corrected";
  } else if (overall === 1 && syndrome === 0) {
    corrected = flipAt(received, 39);
    status = "overall parity corrected";
  } else if (overall === 0 && syndrome !== 0) {
    status = "double-bit detected";
  }
  return {
    syndrome,
    overall,
    corrected,
    status,
    data: extractData32(corrected),
  };
}

function choose(n: number, k: number) {
  if (k < 0 || k > n) return 0;
  let result = 1;
  for (let index = 1; index <= k; index += 1)
    result = (result * (n - index + 1)) / index;
  return result;
}

function hammingBallVolume(n: number, radius: number) {
  let volume = 0;
  for (let errors = 0; errors <= radius; errors += 1)
    volume += choose(n, errors);
  return volume;
}

export function HD15CodeSpaceLab() {
  const [received, setReceived] = useState(0b001);
  const codewords = [0b000, 0b111];
  const distances = codewords.map((word) => hamming(received, word));
  const nearest = distances[0] <= distances[1] ? codewords[0] : codewords[1];
  return (
    <Figure caption="Error correction spaces valid codewords apart; a received word inside one unique decoding sphere snaps to its nearest codeword.">
      <label className="text-sm font-semibold text-primary">
        received 3-bit word = {bitString(received, 3)}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="7"
          value={received}
          onChange={(event) => setReceived(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat label="codeword 000 distance" value={distances[0].toString()} />
        <Stat label="codeword 111 distance" value={distances[1].toString()} />
        <Stat
          label="nearest"
          value={bitString(nearest, 3)}
          tone={distances[0] === distances[1] ? "warning" : "success"}
        />
        <Stat
          label="unique"
          value={distances[0] === distances[1] ? "no" : "yes"}
        />
      </div>
    </Figure>
  );
}

export function HD15RepetitionLab() {
  const [original, setOriginal] = useState(1);
  const [errorBit, setErrorBit] = useState(1);
  const sent = original === 0 ? 0 : 0b111;
  const received = sent ^ (1 << errorBit);
  const decoded = popcount(received) >= 2 ? 1 : 0;
  return (
    <Figure caption="The threefold repetition code has minimum distance three and corrects one flipped bit by majority vote, at a high redundancy cost.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          information bit = {original}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="1"
            value={original}
            onChange={(event) => setOriginal(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          flip position = {errorBit}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="2"
            value={errorBit}
            onChange={(event) => setErrorBit(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat label="sent" value={bitString(sent, 3)} />
        <Stat label="received" value={bitString(received, 3)} />
        <Stat
          label="majority result"
          value={decoded.toString()}
          tone={decoded === original ? "success" : "danger"}
        />
        <Stat label="rate" value="1/3" />
      </div>
    </Figure>
  );
}

export function HD15Hamming74LayoutLab() {
  const [data, setData] = useState(0b1011);
  const encoded = encodeHamming74(data);
  return (
    <Figure caption="Hamming(7,4) puts parity bits at power-of-two positions and data in the remaining positions; each position carries a unique binary label.">
      <label className="text-sm font-semibold text-primary">
        4-bit data = {bitString(data, 4)}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="15"
          value={data}
          onChange={(event) => setData(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }, (_, index) => index + 1).map((position) => (
          <div
            key={position}
            className={`border p-2 text-center ${isParityPosition(position) ? "border-warning text-warning" : "border-accent text-accent"}`}
          >
            <div className="text-xs">
              {isParityPosition(position) ? `p${position}` : "data"}
            </div>
            <div className="mt-1 font-mono">
              {(encoded >>> (position - 1)) & 1}
            </div>
            <div className="mt-1 text-[10px] text-secondary">
              {position.toString(2).padStart(3, "0")}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Stat
          label="encoded positions 7…1"
          value={bitString(encoded, 7)}
          tone="success"
        />
      </div>
    </Figure>
  );
}

export function HD15ParityCoverageLab() {
  const [parityPosition, setParityPosition] = useState(1);
  const options = [1, 2, 4];
  const selected = options[parityPosition];
  const covered = Array.from({ length: 7 }, (_, index) => index + 1).filter(
    (position) => (position & selected) !== 0,
  );
  return (
    <Figure caption="Parity check p_j covers exactly positions whose binary label contains that parity bit; the failed checks reconstruct the error position.">
      <label className="text-sm font-semibold text-primary">
        parity selector
        <select
          className="mt-2 block w-full border border-border bg-background p-2"
          value={parityPosition}
          onChange={(event) => setParityPosition(Number(event.target.value))}
        >
          {options.map((value, index) => (
            <option key={value} value={index}>
              p{value}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="selected check" value={`p${selected}`} />
        <Stat
          label="covered positions"
          value={covered.join(", ")}
          tone="success"
        />
        <Stat label="label bit" value={Math.log2(selected).toString()} />
      </div>
    </Figure>
  );
}

export function HD15SyndromeLab() {
  const [data, setData] = useState(0b1011);
  const [errorPosition, setErrorPosition] = useState(5);
  const sent = encodeHamming74(data);
  const received = sent ^ (1 << (errorPosition - 1));
  const syndrome = syndrome74(received);
  const corrected = received ^ (syndrome === 0 ? 0 : 1 << (syndrome - 1));
  return (
    <Figure caption="For one error, the Hamming syndrome equals the binary label of the flipped position, so correction is one indexed XOR.">
      <label className="text-sm font-semibold text-primary">
        data = {bitString(data, 4)}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="15"
          value={data}
          onChange={(event) => setData(Number(event.target.value))}
        />
      </label>
      <label className="mt-4 block text-sm font-semibold text-primary">
        flip position = {errorPosition}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="1"
          max="7"
          value={errorPosition}
          onChange={(event) => setErrorPosition(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat label="sent" value={bitString(sent, 7)} />
        <Stat label="received" value={bitString(received, 7)} />
        <Stat
          label="syndrome"
          value={`${syndrome} / ${bitString(syndrome, 3)}`}
        />
        <Stat
          label="corrected"
          value={bitString(corrected, 7)}
          tone={corrected === sent ? "success" : "danger"}
        />
      </div>
    </Figure>
  );
}

export function HD15ExtendedDecisionLab() {
  const [syndrome, setSyndrome] = useState(5);
  const [overallOdd, setOverallOdd] = useState(true);
  let status = "no error";
  if (overallOdd && syndrome !== 0) status = "single-bit error: correct";
  else if (overallOdd && syndrome === 0) status = "overall parity bit error";
  else if (!overallOdd && syndrome !== 0)
    status = "double-bit error: detect only";
  return (
    <Figure caption="Extended Hamming SEC-DED combines the Hamming syndrome with overall parity to separate no error, one error, and two errors.">
      <label className="text-sm font-semibold text-primary">
        Hamming syndrome = {syndrome}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="7"
          value={syndrome}
          onChange={(event) => setSyndrome(Number(event.target.value))}
        />
      </label>
      <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
        <input
          type="checkbox"
          checked={overallOdd}
          onChange={(event) => setOverallOdd(event.target.checked)}
        />
        overall parity is odd
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="syndrome zero" value={syndrome === 0 ? "yes" : "no"} />
        <Stat label="overall parity" value={overallOdd ? "odd" : "even"} />
        <Stat
          label="classification"
          value={status}
          tone={status.includes("double") ? "warning" : "success"}
        />
      </div>
    </Figure>
  );
}

export function HD15SECDED32LayoutLab() {
  const [informationBits, setInformationBits] = useState(32);
  let hammingChecks = 0;
  while (2 ** hammingChecks < informationBits + hammingChecks + 1)
    hammingChecks += 1;
  const total = informationBits + hammingChecks + 1;
  return (
    <Figure caption="For 32 information bits, six Hamming checks identify 38 candidate positions and one overall parity bit raises distance to four: 39 bits total.">
      <label className="text-sm font-semibold text-primary">
        information bits k = {informationBits}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="1"
          max="64"
          value={informationBits}
          onChange={(event) => setInformationBits(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat label="data bits" value={informationBits.toString()} />
        <Stat label="Hamming checks" value={hammingChecks.toString()} />
        <Stat label="overall parity" value="1" />
        <Stat
          label="total bits"
          value={total.toString()}
          tone={informationBits === 32 && total === 39 ? "success" : "accent"}
        />
      </div>
    </Figure>
  );
}

export function HD15SECDED32FaultLab() {
  const [seed, setSeed] = useState(17);
  const [mode, setMode] = useState("single");
  const [firstPosition, setFirstPosition] = useState(13);
  const [secondPosition, setSecondPosition] = useState(27);
  const data = Math.imul(seed, 0x9e3779b1) >>> 0;
  const sent = encodeSecded32(data);
  let received = sent;
  if (mode === "single" || mode === "double")
    received = flipAt(received, firstPosition);
  if (mode === "double") {
    const distinctSecond =
      secondPosition === firstPosition
        ? (secondPosition % 39) + 1
        : secondPosition;
    received = flipAt(received, distinctSecond);
  }
  const result = decodeSecded32(received);
  return (
    <Figure caption="The 39-bit SEC-DED path injects zero, one, or two faults across data and check bits, then classifies with six-bit syndrome plus overall parity.">
      <label className="text-sm font-semibold text-primary">
        data seed = {seed}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="255"
          value={seed}
          onChange={(event) => setSeed(Number(event.target.value))}
        />
      </label>
      <label className="mt-4 block text-sm font-semibold text-primary">
        fault mode
        <select
          className="mt-2 block w-full border border-border bg-background p-2"
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        >
          <option value="none">none</option>
          <option value="single">single</option>
          <option value="double">double</option>
        </select>
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          first position = {firstPosition}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="39"
            value={firstPosition}
            onChange={(event) => setFirstPosition(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          second position = {secondPosition}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="39"
            value={secondPosition}
            onChange={(event) => setSecondPosition(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat
          label="data"
          value={`0x${data.toString(16).toUpperCase().padStart(8, "0")}`}
        />
        <Stat label="syndrome" value={result.syndrome.toString()} />
        <Stat
          label="overall parity"
          value={result.overall === 0 ? "even" : "odd"}
        />
        <Stat
          label="decoder status"
          value={result.status}
          tone={
            mode === "double"
              ? "warning"
              : result.data === data
                ? "success"
                : "danger"
          }
        />
      </div>
    </Figure>
  );
}

export function HD15DistanceCapabilityLab() {
  const [minimumDistance, setMinimumDistance] = useState(4);
  const detect = minimumDistance - 1;
  const correct = Math.floor((minimumDistance - 1) / 2);
  return (
    <Figure caption="Minimum code distance d guarantees detection of up to d−1 flips or correction of up to floor((d−1)/2) unknown flips.">
      <label className="text-sm font-semibold text-primary">
        minimum distance d = {minimumDistance}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="2"
          max="10"
          value={minimumDistance}
          onChange={(event) => setMinimumDistance(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="detect guaranteed" value={`${detect} errors`} />
        <Stat
          label="correct guaranteed"
          value={`${correct} errors`}
          tone="success"
        />
        <Stat label="sphere radius" value={correct.toString()} />
      </div>
    </Figure>
  );
}

export function HD15HammingBoundLab() {
  const [radius, setRadius] = useState(1);
  const n = 7;
  const k = 4;
  const volume = hammingBallVolume(n, radius);
  const occupied = 2 ** k * volume;
  return (
    <Figure caption="Hamming spheres around valid codewords must not overlap; Hamming(7,4) with radius one exactly fills all 128 seven-bit words.">
      <label className="text-sm font-semibold text-primary">
        decoding radius t = {radius}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="3"
          value={radius}
          onChange={(event) => setRadius(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Stat label="codewords" value={(2 ** k).toString()} />
        <Stat label="ball volume" value={volume.toString()} />
        <Stat
          label="occupied words"
          value={occupied.toString()}
          tone={occupied <= 2 ** n ? "success" : "warning"}
        />
        <Stat label="ambient words" value={(2 ** n).toString()} />
      </div>
    </Figure>
  );
}

export function HD15ErasureBudgetLab() {
  const [distance, setDistance] = useState(4);
  const [errors, setErrors] = useState(1);
  const [erasures, setErasures] = useState(1);
  const within = 2 * errors + erasures < distance;
  return (
    <Figure caption="Known erasure locations cost one distance unit each, while unknown error locations cost two; unique decoding requires 2t+e below d.">
      <label className="text-sm font-semibold text-primary">
        minimum distance d = {distance}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="2"
          max="10"
          value={distance}
          onChange={(event) => setDistance(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          unknown errors t = {errors}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="4"
            value={errors}
            onChange={(event) => setErrors(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          known erasures e = {erasures}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="6"
            value={erasures}
            onChange={(event) => setErasures(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="2t + e" value={(2 * errors + erasures).toString()} />
        <Stat label="distance d" value={distance.toString()} />
        <Stat
          label="unique decoding"
          value={within ? "guaranteed" : "not guaranteed"}
          tone={within ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}

export function HD15InterleavingLab() {
  const [depth, setDepth] = useState(4);
  const [burst, setBurst] = useState(8);
  const distribution = Array.from(
    { length: burst },
    (_, index) => (index % depth) + 1,
  );
  const perWord = Math.ceil(burst / depth);
  return (
    <Figure caption="Interleaving scatters a physical burst across several codewords, trading latency and buffering for fewer errors per decoder block.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">
          interleave depth = {depth}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="8"
            value={depth}
            onChange={(event) => setDepth(Number(event.target.value))}
          />
        </label>
        <label className="text-sm font-semibold text-primary">
          burst bits = {burst}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="24"
            value={burst}
            onChange={(event) => setBurst(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="word sequence" value={distribution.join(" → ")} />
        <Stat label="worst errors per word" value={perWord.toString()} />
        <Stat label="latency blocks" value={depth.toString()} />
      </div>
    </Figure>
  );
}

export function HD15CorrectionContractLab() {
  const [faultModel, setFaultModel] = useState(true);
  const [uncorrectableStatus, setUncorrectableStatus] = useState(true);
  const [scrub, setScrub] = useState(false);
  const complete = faultModel && uncorrectableStatus && scrub;
  return (
    <Figure caption="An ECC subsystem needs a bounded fault model, explicit uncorrectable status, corrected-data writeback or scrubbing, and telemetry.">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={faultModel}
            onChange={(event) => setFaultModel(event.target.checked)}
          />
          fault model
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={uncorrectableStatus}
            onChange={(event) => setUncorrectableStatus(event.target.checked)}
          />
          uncorrectable status
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={scrub}
            onChange={(event) => setScrub(event.target.checked)}
          />
          scrub / writeback
        </label>
      </div>
      <div className="mt-4">
        <Stat
          label="ECC contract"
          value={complete ? "complete" : "incomplete"}
          tone={complete ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}

export function HD15ECCCertificateLab() {
  const [allSingle, setAllSingle] = useState(true);
  const [allDouble, setAllDouble] = useState(false);
  const [clean, setClean] = useState(true);
  const complete = allSingle && allDouble && clean;
  return (
    <Figure caption="A SEC-DED implementation is certified by clean-codeword identity, exhaustive single-bit correction, and exhaustive double-bit detection without correction.">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={clean}
            onChange={(event) => setClean(event.target.checked)}
          />
          clean identity
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={allSingle}
            onChange={(event) => setAllSingle(event.target.checked)}
          />
          all single faults
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-primary">
          <input
            type="checkbox"
            checked={allDouble}
            onChange={(event) => setAllDouble(event.target.checked)}
          />
          all double pairs
        </label>
      </div>
      <div className="mt-4">
        <Stat
          label="SEC-DED certificate"
          value={complete ? "complete" : "incomplete"}
          tone={complete ? "success" : "warning"}
        />
      </div>
    </Figure>
  );
}
