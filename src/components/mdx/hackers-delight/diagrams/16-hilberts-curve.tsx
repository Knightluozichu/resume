"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

type Point = { x: number; y: number };

function rotate(scale: number, point: Point, rx: number, ry: number): Point {
  let { x, y } = point;
  if (ry === 0) {
    if (rx === 1) {
      x = scale - 1 - x;
      y = scale - 1 - y;
    }
    [x, y] = [y, x];
  }
  return { x, y };
}

function distanceToCoordinate(order: number, distance: number): Point {
  const side = 2 ** order;
  let point = { x: 0, y: 0 };
  let remaining = distance;
  for (let scale = 1; scale < side; scale *= 2) {
    const rx = (remaining >>> 1) & 1;
    const ry = (remaining ^ rx) & 1;
    point = rotate(scale, point, rx, ry);
    point.x += scale * rx;
    point.y += scale * ry;
    remaining = Math.floor(remaining / 4);
  }
  return point;
}

function coordinateToDistance(order: number, point: Point) {
  const side = 2 ** order;
  let { x, y } = point;
  let distance = 0;
  for (let scale = side / 2; scale >= 1; scale /= 2) {
    const rx = (x & scale) !== 0 ? 1 : 0;
    const ry = (y & scale) !== 0 ? 1 : 0;
    distance += scale * scale * ((3 * rx) ^ ry);
    ({ x, y } = rotate(scale, { x, y }, rx, ry));
  }
  return distance;
}

function hilbertPoints(order: number) {
  return Array.from({ length: 4 ** order }, (_, distance) => distanceToCoordinate(order, distance));
}

function mortonPoints(order: number) {
  return Array.from({ length: 4 ** order }, (_, distance) => {
    let x = 0;
    let y = 0;
    for (let bit = 0; bit < order; bit += 1) {
      x |= ((distance >>> (2 * bit)) & 1) << bit;
      y |= ((distance >>> (2 * bit + 1)) & 1) << bit;
    }
    return { x, y };
  });
}

function manhattan(left: Point, right: Point) {
  return Math.abs(left.x - right.x) + Math.abs(left.y - right.y);
}

function CurveSvg({ points, highlight = [], color = "text-accent" }: { points: Point[]; highlight?: number[]; color?: string }) {
  const side = Math.max(...points.flatMap((point) => [point.x, point.y])) + 1;
  const coordinate = (value: number) => side === 1 ? 50 : 5 + value * 90 / (side - 1);
  const polyline = points.map((point) => `${coordinate(point.x)},${100 - coordinate(point.y)}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={`aspect-square w-full ${color}`} role="img" aria-label="Space-filling curve on a square grid">
      {Array.from({ length: side }, (_, index) => coordinate(index)).map((position) => <g key={position} className="text-border"><line x1={position} y1="5" x2={position} y2="95" stroke="currentColor" strokeWidth="0.35" /><line x1="5" y1={100 - position} x2="95" y2={100 - position} stroke="currentColor" strokeWidth="0.35" /></g>)}
      <polyline points={polyline} fill="none" stroke="currentColor" strokeWidth={side > 16 ? 0.45 : 1.1} strokeLinejoin="round" strokeLinecap="round" />
      {highlight.map((index) => {
        const point = points[index];
        if (!point) return null;
        return <circle key={index} cx={coordinate(point.x)} cy={100 - coordinate(point.y)} r={side > 16 ? 1.4 : 2.2} className="fill-warning text-warning" stroke="currentColor" strokeWidth="0.5" />;
      })}
    </svg>
  );
}

function distanceTrace(order: number, distance: number) {
  const rows: Array<{ scale: number; quadrant: number; rx: number; ry: number; point: Point }> = [];
  const side = 2 ** order;
  let point = { x: 0, y: 0 };
  let remaining = distance;
  for (let scale = 1; scale < side; scale *= 2) {
    const quadrant = remaining & 3;
    const rx = (remaining >>> 1) & 1;
    const ry = (remaining ^ rx) & 1;
    point = rotate(scale, point, rx, ry);
    point = { x: point.x + scale * rx, y: point.y + scale * ry };
    rows.push({ scale, quadrant, rx, ry, point: { ...point } });
    remaining = Math.floor(remaining / 4);
  }
  return rows;
}

export function HD16RecursiveCurveLab() {
  const [order, setOrder] = useState(3);
  const points = hilbertPoints(order);
  return (
    <Figure caption="Each Hilbert order replaces one path segment with four rotated or reflected copies, visiting every 2^n by 2^n grid point once.">
      <label className="text-sm font-semibold text-primary">curve order n = {order}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={order} onChange={(event) => setOrder(Number(event.target.value))} /></label>
      <div className="mx-auto mt-4 max-w-xl"><CurveSvg points={points} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="side" value={(2 ** order).toString()} /><Stat label="points" value={points.length.toString()} tone="success" /><Stat label="segments" value={(points.length - 1).toString()} /></div>
    </Figure>
  );
}

export function HD16QuadrantOrientationLab() {
  const [order, setOrder] = useState(3);
  const points = hilbertPoints(order);
  const group = 4 ** (order - 1);
  const entries = [0, group, group * 2, group * 3].map((distance) => points[distance]);
  const exits = [group - 1, group * 2 - 1, group * 3 - 1, group * 4 - 1].map((distance) => points[distance]);
  return (
    <Figure caption="The four recursive subcurves use different orientations so each quadrant exit is grid-adjacent to the next quadrant entry.">
      <label className="text-sm font-semibold text-primary">order = {order}<input className="mt-2 w-full accent-current" type="range" min="2" max="5" value={order} onChange={(event) => setOrder(Number(event.target.value))} /></label>
      <div className="mx-auto mt-4 max-w-lg"><CurveSvg points={points} highlight={[0, group, group * 2, group * 3]} /></div>
      <div className="mt-4 grid grid-cols-4 gap-2">{entries.map((entry, index) => <Stat key={index} label={`quadrant ${index} entry→exit`} value={`(${entry.x},${entry.y})→(${exits[index].x},${exits[index].y})`} tone="success" />)}</div>
    </Figure>
  );
}

export function HD16DistanceToCoordinateLab() {
  const [distance, setDistance] = useState(52);
  const order = 3;
  const points = hilbertPoints(order);
  const point = points[distance];
  return (
    <Figure caption="Coordinates from distance map a 2n-bit Hilbert index to two n-bit coordinates while preserving consecutive grid adjacency.">
      <label className="text-sm font-semibold text-primary">distance s = {distance}<input className="mt-2 w-full accent-current" type="range" min="0" max={points.length - 1} value={distance} onChange={(event) => setDistance(Number(event.target.value))} /></label>
      <div className="mx-auto mt-4 max-w-lg"><CurveSvg points={points} highlight={[distance]} /></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="s binary" value={distance.toString(2).padStart(2 * order, "0")} /><Stat label="x" value={point.x.toString()} /><Stat label="y" value={point.y.toString()} /><Stat label="coordinate" value={`(${point.x}, ${point.y})`} tone="success" /></div>
    </Figure>
  );
}

export function HD16DistanceTraceLab() {
  const [distance, setDistance] = useState(52);
  const trace = distanceTrace(3, distance);
  return (
    <Figure caption="A non-recursive distance decoder consumes base-4 index digits, rotates the accumulated subcurve, and adds the selected quadrant offset.">
      <label className="text-sm font-semibold text-primary">distance = {distance}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={distance} onChange={(event) => setDistance(Number(event.target.value))} /></label>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[34rem] border-collapse text-sm"><thead><tr className="text-secondary"><th className="border-b border-border p-2 text-left">scale</th><th className="border-b border-border p-2 text-left">base-4 digit</th><th className="border-b border-border p-2 text-left">rx / ry</th><th className="border-b border-border p-2 text-left">partial coordinate</th></tr></thead><tbody>{trace.map((row) => <tr key={row.scale}><td className="border-b border-border/60 p-2 font-mono">{row.scale}</td><td className="border-b border-border/60 p-2 font-mono">{row.quadrant}</td><td className="border-b border-border/60 p-2 font-mono">{row.rx} / {row.ry}</td><td className="border-b border-border/60 p-2 font-mono text-accent">({row.point.x}, {row.point.y})</td></tr>)}</tbody></table></div>
    </Figure>
  );
}

export function HD16CoordinateToDistanceLab() {
  const [x, setX] = useState(4);
  const [y, setY] = useState(3);
  const order = 3;
  const points = hilbertPoints(order);
  const distance = coordinateToDistance(order, { x, y });
  return (
    <Figure caption="Distance from coordinates scans coordinate bits from high to low, emits a quadrant digit, and updates the orientation for the next level.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {x}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y = {y}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mx-auto mt-4 max-w-lg"><CurveSvg points={points} highlight={[distance]} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="coordinate" value={`(${x}, ${y})`} /><Stat label="distance binary" value={distance.toString(2).padStart(6, "0")} /><Stat label="distance" value={distance.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD16RoundTripLab() {
  const [order, setOrder] = useState(4);
  const [offset, setOffset] = useState(173);
  const count = 4 ** order;
  const distance = offset % count;
  const point = distanceToCoordinate(order, distance);
  const recovered = coordinateToDistance(order, point);
  return (
    <Figure caption="Distance-to-coordinate and coordinate-to-distance must be exact inverses over every point in the finite Hilbert grid.">
      <label className="text-sm font-semibold text-primary">order = {order}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={order} onChange={(event) => { const nextOrder = Number(event.target.value); setOrder(nextOrder); setOffset((old) => old % (4 ** nextOrder)); }} /></label>
      <label className="mt-4 block text-sm font-semibold text-primary">distance = {distance}<input className="mt-2 w-full accent-current" type="range" min="0" max={count - 1} value={distance} onChange={(event) => setOffset(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="s" value={distance.toString()} /><Stat label="coordinate" value={`(${point.x}, ${point.y})`} /><Stat label="inverse s" value={recovered.toString()} /><Stat label="round-trip" value={recovered === distance ? "pass" : "fail"} tone={recovered === distance ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD16IncrementCoordinateLab() {
  const [distance, setDistance] = useState(52);
  const order = 4;
  const count = 4 ** order;
  const currentDistance = Math.min(distance, count - 2);
  const current = distanceToCoordinate(order, currentDistance);
  const next = distanceToCoordinate(order, currentDistance + 1);
  return (
    <Figure caption="Incrementing coordinates moves exactly one grid unit along x or y; a direct state machine can derive this delta without materializing the distance.">
      <label className="text-sm font-semibold text-primary">distance = {currentDistance}<input className="mt-2 w-full accent-current" type="range" min="0" max={count - 2} value={currentDistance} onChange={(event) => setDistance(Number(event.target.value))} /></label>
      <div className="mx-auto mt-4 max-w-lg"><CurveSvg points={hilbertPoints(order)} highlight={[currentDistance, currentDistance + 1]} /></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="current" value={`(${current.x}, ${current.y})`} /><Stat label="next" value={`(${next.x}, ${next.y})`} /><Stat label="delta" value={`(${next.x - current.x}, ${next.y - current.y})`} tone="success" /><Stat label="Manhattan step" value={manhattan(current, next).toString()} /></div>
    </Figure>
  );
}

export function HD16NonRecursiveCostLab() {
  const [order, setOrder] = useState(8);
  const points = 4 ** order;
  return (
    <Figure caption="Table-driven or bitwise non-recursive mapping processes one level per coordinate bit: O(n) work and O(1) auxiliary storage for one point.">
      <label className="text-sm font-semibold text-primary">order n = {order}<input className="mt-2 w-full accent-current" type="range" min="1" max="15" value={order} onChange={(event) => setOrder(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="grid side" value={(2 ** order).toLocaleString()} /><Stat label="points" value={points.toLocaleString()} /><Stat label="mapping iterations" value={order.toString()} tone="success" /><Stat label="recursive stack" value="not required" /></div>
    </Figure>
  );
}

export function HD16OtherCurvesLab() {
  const order = 4;
  const hilbert = hilbertPoints(order);
  const morton = mortonPoints(order);
  const hilbertMax = Math.max(...hilbert.slice(1).map((point, index) => manhattan(hilbert[index], point)));
  const mortonMax = Math.max(...morton.slice(1).map((point, index) => manhattan(morton[index], point)));
  return (
    <Figure caption="Hilbert and Morton/Z-order both recursively index a square, but Morton interleaves coordinate bits and can make long jumps between consecutive indices.">
      <div className="grid gap-6 sm:grid-cols-2"><div><div className="mb-2 text-center text-sm font-semibold text-primary">Hilbert</div><CurveSvg points={hilbert} /></div><div><div className="mb-2 text-center text-sm font-semibold text-primary">Morton / Z-order</div><CurveSvg points={morton} color="text-warning" /></div></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="Hilbert max consecutive step" value={hilbertMax.toString()} tone="success" /><Stat label="Morton max consecutive step" value={mortonMax.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function HD16LocalityLab() {
  const [gap, setGap] = useState(16);
  const order = 5;
  const points = hilbertPoints(order);
  let hilbertAverage = 0;
  let rowAverage = 0;
  let samples = 0;
  const side = 2 ** order;
  for (let start = 0; start + gap < points.length; start += Math.max(1, gap)) {
    hilbertAverage += manhattan(points[start], points[start + gap]);
    const rowA = { x: start % side, y: Math.floor(start / side) };
    const rowBIndex = start + gap;
    const rowB = { x: rowBIndex % side, y: Math.floor(rowBIndex / side) };
    rowAverage += manhattan(rowA, rowB);
    samples += 1;
  }
  hilbertAverage /= samples;
  rowAverage /= samples;
  return (
    <Figure caption="Locality is workload-dependent: Hilbert guarantees unit consecutive steps, while larger index gaps require measurement against row-major or other layouts.">
      <label className="text-sm font-semibold text-primary">index gap = {gap}<input className="mt-2 w-full accent-current" type="range" min="1" max="128" value={gap} onChange={(event) => setGap(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Hilbert average Manhattan" value={hilbertAverage.toFixed(2)} /><Stat label="row-major average" value={rowAverage.toFixed(2)} /><Stat label="lower for this sample" value={hilbertAverage <= rowAverage ? "Hilbert" : "row-major"} tone="success" /></div>
    </Figure>
  );
}

export function HD16RangeQueryLab() {
  const [origin, setOrigin] = useState(4);
  const [size, setSize] = useState(4);
  const order = 4;
  const side = 2 ** order;
  const x0 = origin % (side - size + 1);
  const y0 = Math.floor(origin / 3) % (side - size + 1);
  const distances: number[] = [];
  for (let y = y0; y < y0 + size; y += 1) {
    for (let x = x0; x < x0 + size; x += 1) distances.push(coordinateToDistance(order, { x, y }));
  }
  distances.sort((left, right) => left - right);
  let runs = distances.length === 0 ? 0 : 1;
  for (let index = 1; index < distances.length; index += 1) if (distances[index] !== distances[index - 1] + 1) runs += 1;
  return (
    <Figure caption="A rectangular spatial query becomes several one-dimensional Hilbert intervals; fewer runs can improve index scans, but no ordering makes every rectangle contiguous.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">window origin seed = {origin}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={origin} onChange={(event) => setOrigin(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">square size = {size}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="window" value={`(${x0},${y0}) size ${size}`} /><Stat label="points" value={distances.length.toString()} /><Stat label="Hilbert intervals" value={runs.toString()} tone="success" /><Stat label="distance span" value={`${distances[0]}…${distances.at(-1)}`} /></div>
    </Figure>
  );
}

export function HD16ApplicationContractLab() {
  const [powerOfTwo, setPowerOfTwo] = useState(true);
  const [roundTrip, setRoundTrip] = useState(true);
  const [benchmark, setBenchmark] = useState(false);
  const complete = powerOfTwo && roundTrip && benchmark;
  return (
    <Figure caption="A Hilbert-index application needs bounded power-of-two coordinates, exact inverse tests, and workload-specific locality benchmarks.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={powerOfTwo} onChange={(event) => setPowerOfTwo(event.target.checked)} />bounded grid</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={roundTrip} onChange={(event) => setRoundTrip(event.target.checked)} />inverse verified</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={benchmark} onChange={(event) => setBenchmark(event.target.checked)} />locality benchmark</label></div>
      <div className="mt-4"><Stat label="application contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD16HilbertCertificateLab() {
  const [coverage, setCoverage] = useState(true);
  const [adjacency, setAdjacency] = useState(true);
  const [inverse, setInverse] = useState(false);
  const complete = coverage && adjacency && inverse;
  return (
    <Figure caption="A finite Hilbert mapping is certified by unique full-grid coverage, unit Manhattan steps, and exact distance-coordinate round trips.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={coverage} onChange={(event) => setCoverage(event.target.checked)} />unique coverage</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={adjacency} onChange={(event) => setAdjacency(event.target.checked)} />unit adjacency</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={inverse} onChange={(event) => setInverse(event.target.checked)} />two-way inverse</label></div>
      <div className="mt-4"><Stat label="Hilbert certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
