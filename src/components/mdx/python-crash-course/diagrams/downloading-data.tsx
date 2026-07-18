"use client";

import { useMemo, useState } from "react";

const csvCases = [
  { label: "valid row", headers: ["DATE", "TMAX", "TMIN", "NAME"], row: ["2024-07-01", "68", "52", "Sitka"], status: "parsed", detail: "date与temperatures均通过schema和type转换。" },
  { label: "missing TMIN", headers: ["DATE", "TMAX", "TMIN", "NAME"], row: ["2024-07-02", "70", "", "Sitka"], status: "skip + report", detail: "空string不能int()；保留row number并按missing policy跳过。" },
  { label: "columns reordered", headers: ["NAME", "TMIN", "DATE", "TMAX"], row: ["Sitka", "55", "2024-07-03", "72"], status: "header lookup", detail: "通过headers.index(name)定位，避免硬编码column index读错。" },
];

export function PccCsvSchemaLab() {
  const [selected, setSelected] = useState(0);
  const item = csvCases[selected];
  const required = ["DATE", "TMAX", "TMIN"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border">
          {csvCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 px-2 text-xs sm:text-sm ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{entry.label}</button>)}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm"><thead><tr>{item.headers.map((header, index) => <th key={header} className={`border p-2 ${required.includes(header) ? "border-cyan-500/50 bg-cyan-500/10" : "border-border bg-bg"}`}>{index}: {header}</th>)}</tr></thead><tbody><tr>{item.row.map((value, index) => <td key={`${index}-${value}`} className={`border p-2 ${value === "" ? "border-rose-500/50 bg-rose-500/10 text-rose-500" : "border-border bg-bg text-primary"}`}>{value || "<missing>"}</td>)}</tr></tbody></table>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_2fr]"><strong className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">result: {item.status}</strong><p className="border border-border bg-bg p-3 text-sm leading-6 text-primary">{item.detail}</p></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换CSV场景，追踪headers、row values、type conversion与missing-data policy。</figcaption>
    </figure>
  );
}

const weatherSets = {
  Sitka: { highs: [61, 64, 63, 66, 68, 67, 70], lows: [48, 50, 51, 52, 53, 52, 55], color: "rgb(6 182 212)" },
  "Death Valley": { highs: [108, 111, 112, 115, 113, 116, 114], lows: [78, 80, 82, 84, 81, 85, 83], color: "rgb(244 63 94)" },
};

export function PccWeatherSeriesLab() {
  const [station, setStation] = useState<keyof typeof weatherSets>("Sitka");
  const [shade, setShade] = useState(true);
  const data = weatherSets[station];
  const all = [...data.highs, ...data.lows];
  const min = Math.min(...all) - 5; const max = Math.max(...all) + 5;
  const x = (index: number) => 28 + index * 54;
  const y = (value: number) => 178 - ((value - min) / (max - min)) * 148;
  const highs = data.highs.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const lows = data.lows.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const area = `${highs} ${[...data.lows].reverse().map((value, reverseIndex) => `${x(data.lows.length - 1 - reverseIndex)},${y(value)}`).join(" ")}`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-primary">station<select value={station} onChange={(event) => setStation(event.target.value as keyof typeof weatherSets)} className="ml-3 min-h-11 border border-border bg-bg px-3">{Object.keys(weatherSets).map((name) => <option key={name}>{name}</option>)}</select></label>
          <label className="flex min-h-11 items-center gap-2 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={shade} onChange={(event) => setShade(event.target.checked)} /> shade high-low range</label>
        </div>
        <div className="mt-4 overflow-x-auto border border-border bg-bg p-3">
          <svg viewBox="0 0 380 210" role="img" aria-label={`${station} high and low temperatures`} className="h-auto min-w-[360px]">
            <line x1="28" y1="178" x2="364" y2="178" stroke="currentColor" className="text-secondary" />
            {shade && <polygon points={area} fill={data.color} opacity="0.12" />}
            <polyline points={highs} fill="none" stroke={data.color} strokeWidth="3" />
            <polyline points={lows} fill="none" stroke="rgb(99 102 241)" strokeWidth="3" />
            {data.highs.map((value, index) => <circle key={`h-${index}`} cx={x(index)} cy={y(value)} r="3" fill={data.color}><title>day {index + 1} high {value}</title></circle>)}
            {data.lows.map((value, index) => <circle key={`l-${index}`} cx={x(index)} cy={y(value)} r="3" fill="rgb(99 102 241)"><title>day {index + 1} low {value}</title></circle>)}
          </svg>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">两条series必须共享同一dates序列；fill_between只在配对记录上着色。切换station时axis domain随完整high/low范围重算。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较两座station的high/low时间序列，并切换daily range shading。</figcaption>
    </figure>
  );
}

const quakeFeatures = [
  { title: "M 6.2 - Pacific Ridge", mag: 6.2, lon: -145, lat: 18 },
  { title: "M 4.7 - Andes", mag: 4.7, lon: -72, lat: -24 },
  { title: "M 5.5 - Japan Trench", mag: 5.5, lon: 143, lat: 37 },
  { title: "M 3.8 - Mediterranean", mag: 3.8, lon: 22, lat: 36 },
];

export function PccGeoJsonMapLab() {
  const [selected, setSelected] = useState(0);
  const [encodeMagnitude, setEncodeMagnitude] = useState(true);
  const feature = quakeFeatures[selected];
  const mapX = (lon: number) => ((lon + 180) / 360) * 100;
  const mapY = (lat: number) => ((90 - lat) / 180) * 100;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex min-h-11 items-center gap-2 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={encodeMagnitude} onChange={(event) => setEncodeMagnitude(event.target.checked)} /> encode magnitude with size and color</label>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[2/1] overflow-hidden border border-border bg-bg" style={{ backgroundImage: "linear-gradient(to right, color-mix(in srgb, currentColor 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, currentColor 10%, transparent) 1px, transparent 1px)", backgroundSize: "12.5% 25%" }}>
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-border" />
            {quakeFeatures.map((quake, index) => <button key={quake.title} type="button" title={quake.title} onClick={() => setSelected(index)} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border ${selected === index ? "border-primary ring-2 ring-primary/30" : "border-amber-500"}`} style={{ left: `${mapX(quake.lon)}%`, top: `${mapY(quake.lat)}%`, width: encodeMagnitude ? `${quake.mag * 5}px` : "20px", height: encodeMagnitude ? `${quake.mag * 5}px` : "20px", backgroundColor: encodeMagnitude ? `hsl(${50 - quake.mag * 4} 85% 55% / 0.65)` : "rgb(6 182 212 / 0.65)" }} aria-label={quake.title} />)}
          </div>
          <div className="border border-border bg-bg p-3 text-sm leading-7 text-primary"><strong>{feature.title}</strong><br />properties.mag: {feature.mag}<br />geometry.coordinates[0]: {feature.lon}<br />geometry.coordinates[1]: {feature.lat}<br /><span className="text-xs text-secondary">hover text来自properties.title</span></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">点击地震feature，核对properties、longitude/latitude顺序与magnitude视觉编码。</figcaption>
    </figure>
  );
}
