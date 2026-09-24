"use client";

import { useId, useState } from "react";

// These are teaching records, not observed weather or a live earthquake feed.
// The chapter's Python CSV/GeoJSON samples use exactly the same values.
const HEADER = ["DATE", "TMAX", "TMIN"];
const WEATHER_ROWS = [
  ["2021-01-01", "8", "2"],
  ["2021-01-03", "10", "4"],
  ["2021-01-02", "9", "1"],
  ["2021-01-04", "7", "0"],
];
export const WEATHER_CASES = {
  normal: [HEADER, ...WEATHER_ROWS],
  reordered: [
    ["TMIN", "DATE", "TMAX"],
    ...WEATHER_ROWS.map(([d, h, l]) => [l, d, h]),
  ],
  missing: [
    HEADER,
    ...WEATHER_ROWS.map((r) => (r[0] === "2021-01-02" ? [r[0], r[1], ""] : r)),
  ],
  bad: [
    HEADER,
    ...WEATHER_ROWS,
    ["2021-02-30", "8", "2"],
    ["2021-01-05", "warm", "2"],
    ["2021-01-06", "1", "3"],
    ["2021-01-07", "8"],
    ["2021-01-01", "9", "1"],
    ["9", "2021-01-08", "2"],
    ["2021-01-09", "NaN", "2"],
  ],
  header: [["DATE", "MAX", "TMIN"], ...WEATHER_ROWS],
  empty: [HEADER],
};
export type WeatherRecord = { date: string; high: number; low: number };

export function parseWeather(rows: string[][], sortDates = true) {
  const records: WeatherRecord[] = [];
  const errors: string[] = [];
  const header = rows[0] ?? [];
  if (
    new Set(header).size !== header.length ||
    HEADER.some((name) => !header.includes(name))
  ) {
    return {
      records,
      errors: ["表头错误：需要唯一的 DATE、TMAX、TMIN；不能猜列号。"],
    };
  }
  const [di, hi, li] = HEADER.map((name) => header.indexOf(name));
  const seen = new Set<string>();
  rows.slice(1).forEach((row, index) => {
    let reason = "";
    const date = row[di] ?? "";
    const time = new Date(`${date}T00:00:00Z`);
    const high = Number(row[hi]);
    const low = Number(row[li]);
    if (row.length !== header.length) reason = "列数不符";
    else if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(time.getTime()) ||
      time.toISOString().slice(0, 10) !== date
    )
      reason = "日期无效／值落错列";
    else if (!row[hi].trim() || !row[li].trim()) reason = "温度缺失";
    else if (!Number.isFinite(high) || !Number.isFinite(low))
      reason = "温度不是有限数";
    else if (high < low) reason = "最高温低于最低温";
    else if (seen.has(date)) reason = "同站同日重复";
    if (reason) errors.push(`记录 ${index + 2}：${reason}`);
    else {
      records.push({ date, high, low });
      seen.add(date);
    }
  });
  if (sortDates) records.sort((a, b) => a.date.localeCompare(b.date));
  return { records, errors };
}

function feature(
  id: string,
  name: string,
  mag: number | null,
  coordinates: number[],
) {
  return {
    type: "Feature",
    id,
    properties: { place: name, mag },
    geometry: { type: "Point", coordinates },
  };
}
const QUAKES = [
  feature("a", "阿拉斯加示意", 4.2, [-150, 60, 10]),
  feature("j", "日本示意", 5.5, [140, 36, 20]),
  feature("c", "智利示意", 3.1, [-72, -32, 15]),
];
export const QUAKE_CASES = {
  normal: QUAKES,
  swapped: QUAKES.map((f) => ({
    ...f,
    geometry: {
      ...f.geometry,
      coordinates: [
        f.geometry.coordinates[1],
        f.geometry.coordinates[0],
        f.geometry.coordinates[2],
      ],
    },
  })),
  missing: [
    ...QUAKES,
    feature("null", "缺震级", null, [10, 20, 0]),
    { type: "Feature", id: "geometry", properties: { mag: 2 }, geometry: null },
    feature("zero", "零震级", 0, [10, 20, 0]),
    feature("negative", "负震级", -0.5, [10, 20, 0]),
  ],
  empty: [],
};
export type Quake = {
  id: string;
  place: string;
  mag: number;
  lon: number;
  lat: number;
};
function object(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}
export function parseQuakes(features: unknown[], minimum = 0) {
  const records: Quake[] = [];
  const errors: string[] = [];
  let filtered = 0;
  features.forEach((raw, index) => {
    const f = object(raw),
      p = object(f.properties),
      g = object(f.geometry);
    const c = Array.isArray(g.coordinates) ? g.coordinates : [];
    const [lon, lat] = c;
    const mag = p.mag;
    let reason = "";
    if (f.type !== "Feature" || g.type !== "Point" || c.length < 2)
      reason = "不是有效 Point";
    else if (
      ![lon, lat, mag].every((n) => typeof n === "number" && Number.isFinite(n))
    )
      reason = "坐标或震级缺失／非有限数";
    else if (Math.abs(lon as number) > 180 || Math.abs(lat as number) > 90)
      reason = "经纬范围错误";
    else if ((mag as number) <= 0) reason = "震级有效但本图只画正震级";
    if (reason) errors.push(`要素 ${index + 1}：${reason}`);
    else if ((mag as number) < minimum) filtered += 1;
    else
      records.push({
        id: String(f.id ?? index),
        place: typeof p.place === "string" ? p.place : "未命名",
        mag: mag as number,
        lon: lon as number,
        lat: lat as number,
      });
  });
  return { records, errors, filtered };
}

const C = {
  accent: "var(--accent)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
};
const control =
  "min-h-11 min-w-0 rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const day = (date: string) =>
  new Date(`${date}T00:00:00Z`).getTime() / 86400000;
const start = day("2021-01-01");
const wx = (r: WeatherRecord) => 40 + (day(r.date) - start) * 87;
const wy = (temperature: number) => 178 - temperature * 12;
const mx = (lon: number) => 25 + ((lon + 180) / 360) * 280;
const my = (lat: number) => 45 + ((90 - lat) / 180) * 140;

export function PccDownloadingDataLab() {
  const id = useId();
  const [weatherCase, setWeatherCase] =
    useState<keyof typeof WEATHER_CASES>("normal");
  const [sorted, setSorted] = useState(true);
  const [quakeCase, setQuakeCase] =
    useState<keyof typeof QUAKE_CASES>("normal");
  const [minimum, setMinimum] = useState(0);
  const [selected, setSelected] = useState("a");
  const weather = parseWeather(WEATHER_CASES[weatherCase], sorted);
  const quakes = parseQuakes(QUAKE_CASES[quakeCase], minimum);
  const detail =
    quakes.records.find((q) => q.id === selected) ?? quakes.records[0];
  const points = (key: "high" | "low") =>
    weather.records.map((r) => `${wx(r)},${wy(r[key])}`).join(" ");
  const reset = () => {
    setWeatherCase("normal");
    setSorted(true);
    setQuakeCase("normal");
    setMinimum(0);
    setSelected("a");
  };
  return (
    <section
      aria-label="天气与地震数据实验"
      className="not-prose my-8 min-w-0 rounded-xl border border-border bg-elevated p-3 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-primary">
          记录先对齐，再落到图上
        </h3>
        <button
          type="button"
          className={`${control} w-auto px-4`}
          onClick={reset}
        >
          重置全部
        </button>
      </div>
      <p className="my-3 text-sm text-secondary">
        固定教学样本，不代表真实观测。所有状态本地计算，无网络、无动画；键盘可操作全部控件。
      </p>
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <section aria-labelledby={`${id}-weather`} className="min-w-0">
          <h4 id={`${id}-weather`} className="mb-3 font-semibold text-primary">
            天气：同一天的一对温度
          </h4>
          <label className="block text-sm text-secondary" htmlFor={`${id}-csv`}>
            CSV 数据情景
          </label>
          <select
            id={`${id}-csv`}
            className={`${control} w-full`}
            value={weatherCase}
            onChange={(e) =>
              setWeatherCase(e.target.value as keyof typeof WEATHER_CASES)
            }
          >
            <option value="normal">正常值，原始日期乱序</option>
            <option value="reordered">列重排，按名称读取</option>
            <option value="missing">1 月 2 日最低温缺失</option>
            <option value="bad">追加 7 条坏记录</option>
            <option value="header">错误表头 MAX</option>
            <option value="empty">只有表头，空结果</option>
          </select>
          <label className="my-2 flex min-h-11 cursor-pointer items-center gap-2 text-sm text-primary">
            <input
              type="checkbox"
              className="h-5 w-5 accent-accent"
              checked={sorted}
              onChange={(e) => setSorted(e.target.checked)}
            />
            按日期排序（关闭观察折返故障）
          </label>
          <svg
            viewBox="0 0 330 230"
            className="block w-full"
            role="img"
            aria-label={`天气摄氏温度图：${weather.records.length} 个完整日期。实线为最高温，虚线为最低温。缺日不连线、不填阴影。${sorted ? "已排序" : "原始顺序可能折返"}`}
          >
            <g fill={C.muted} fontSize={14}>
              {[0, 4, 8, 12].map((t) => (
                <g key={t}>
                  <line
                    x1={40}
                    x2={301}
                    y1={wy(t)}
                    y2={wy(t)}
                    stroke={C.border}
                  />
                  <text x={31} y={wy(t) + 5} textAnchor="end">
                    {t}
                  </text>
                </g>
              ))}
              <text x={8} y={19}>
                °C
              </text>
              {[1, 2, 3, 4].map((d) => (
                <text key={d} x={40 + (d - 1) * 87} y={200} textAnchor="middle">
                  0{d}
                </text>
              ))}
              <text x={170} y={223} textAnchor="middle">
                2021 年 1 月 · 日
              </text>
            </g>
            {sorted ? (
              weather.records.slice(1).map((r, i) => {
                const prev = weather.records[i];
                if (day(r.date) - day(prev.date) !== 1) return null;
                return (
                  <g key={r.date}>
                    <polygon
                      points={`${wx(prev)},${wy(prev.high)} ${wx(r)},${wy(r.high)} ${wx(r)},${wy(r.low)} ${wx(prev)},${wy(prev.low)}`}
                      fill={C.accent}
                      opacity={0.18}
                    />
                    <line
                      x1={wx(prev)}
                      y1={wy(prev.high)}
                      x2={wx(r)}
                      y2={wy(r.high)}
                      stroke={C.accent}
                      strokeWidth={2}
                    />
                    <line
                      x1={wx(prev)}
                      y1={wy(prev.low)}
                      x2={wx(r)}
                      y2={wy(r.low)}
                      stroke={C.text}
                      strokeWidth={2}
                      strokeDasharray="5 4"
                    />
                  </g>
                );
              })
            ) : (
              <g>
                <polyline
                  points={points("high")}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth={2}
                />
                <polyline
                  points={points("low")}
                  fill="none"
                  stroke={C.text}
                  strokeDasharray="5 4"
                  strokeWidth={2}
                />
              </g>
            )}
            {weather.records.map((r) => (
              <g key={r.date}>
                <circle cx={wx(r)} cy={wy(r.high)} r={4} fill={C.accent} />
                <circle cx={wx(r)} cy={wy(r.low)} r={4} fill={C.text} />
              </g>
            ))}
            {!weather.records.length && (
              <text
                x={170}
                y={108}
                fill={C.text}
                textAnchor="middle"
                fontSize={16}
              >
                没有可绘制的完整记录
              </text>
            )}
          </svg>
          <p className="text-sm text-secondary">
            实线：最高温；虚线：最低温。阴影是同日温差，不是不确定性。未排序时禁用阴影。
          </p>
          <p role="status" className="my-2 text-sm text-primary">
            接收 {weather.records.length} 条；诊断 {weather.errors.length} 条。
            {sorted ? "相邻日才连线。" : "注意 01→03→02→04 的折返。"}
          </p>
          <table className="w-full text-left text-sm text-primary">
            <caption className="sr-only">
              已解析的日期、最高温、最低温和温差，单位摄氏度
            </caption>
            <thead>
              <tr>
                <th scope="col">日期</th>
                <th scope="col">高</th>
                <th scope="col">低</th>
                <th scope="col">差</th>
              </tr>
            </thead>
            <tbody>
              {weather.records.map((r) => (
                <tr key={r.date}>
                  <th scope="row" className="py-1 font-normal">
                    {r.date.slice(5)}
                  </th>
                  <td>{r.high}</td>
                  <td>{r.low}</td>
                  <td>{r.high - r.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul
            className="mt-2 space-y-1 text-sm text-secondary"
            aria-label="天气诊断"
          >
            {weather.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby={`${id}-quakes`} className="min-w-0">
          <h4 id={`${id}-quakes`} className="mb-3 font-semibold text-primary">
            地震：经度横向，纬度纵向
          </h4>
          <label className="block text-sm text-secondary" htmlFor={`${id}-geo`}>
            GeoJSON 数据情景
          </label>
          <select
            id={`${id}-geo`}
            className={`${control} w-full`}
            value={quakeCase}
            onChange={(e) => {
              setQuakeCase(e.target.value as keyof typeof QUAKE_CASES);
              setSelected("a");
            }}
          >
            <option value="normal">3 个正常示意要素</option>
            <option value="swapped">故障：经纬交换</option>
            <option value="missing">追加缺值、零／负震级</option>
            <option value="empty">features 为空</option>
          </select>
          <label
            htmlFor={`${id}-minimum`}
            className="mt-2 block text-sm text-primary"
          >
            最低震级：{minimum.toFixed(1)}（6.0 时为空）
          </label>
          <input
            id={`${id}-minimum`}
            className="block min-h-11 w-full accent-accent"
            type="range"
            min={0}
            max={6}
            step={0.1}
            value={minimum}
            onChange={(e) => setMinimum(Number(e.target.value))}
          />
          <svg
            viewBox="0 0 330 230"
            className="block w-full"
            role="img"
            aria-label={`全球经纬坐标图，等距圆柱投影示意；显示 ${quakes.records.length} 个点；完整数据见下方可聚焦按钮。`}
          >
            <g stroke={C.border} fill="none">
              <rect x={25} y={45} width={280} height={140} />
              {[-120, -60, 0, 60, 120].map((lon) => (
                <line key={lon} x1={mx(lon)} x2={mx(lon)} y1={45} y2={185} />
              ))}
              {[-60, -30, 0, 30, 60].map((lat) => (
                <line key={lat} x1={25} x2={305} y1={my(lat)} y2={my(lat)} />
              ))}
            </g>
            <g fill={C.muted} fontSize={14}>
              <text x={25} y={29}>
                90°N
              </text>
              <text x={305} y={29} textAnchor="end">
                经度 →
              </text>
              <text x={25} y={205}>
                180°W
              </text>
              <text x={165} y={205} textAnchor="middle">
                0°
              </text>
              <text x={305} y={205} textAnchor="end">
                180°E
              </text>
              <text x={25} y={226}>
                90°S（底边）
              </text>
              <text x={305} y={226} textAnchor="end">
                赤道：中线
              </text>
            </g>
            {quakes.records.map((q) => (
              <circle
                key={q.id}
                cx={mx(q.lon)}
                cy={my(q.lat)}
                r={Math.sqrt(q.mag / 5.5) * 11}
                fill={C.accent}
                fillOpacity={0.5}
                stroke={q.id === detail?.id ? C.text : C.accent}
                strokeWidth={2}
              >
                <title>{`${q.place}：震级 ${q.mag}，经度 ${q.lon}，纬度 ${q.lat}`}</title>
              </circle>
            ))}
            {!quakes.records.length && (
              <text
                x={165}
                y={119}
                textAnchor="middle"
                fill={C.text}
                fontSize={16}
              >
                没有满足条件的点
              </text>
            )}
          </svg>
          <p className="text-sm text-secondary">
            经度 −180°～180°、纬度
            −90°～90°的线性映射；非等面积，无海岸线、无边界，不用于导航。圆面积随正震级增大，不表示释放能量。
          </p>
          <div
            className="my-2 flex flex-wrap gap-2"
            aria-label="悬浮或聚焦查看地震点"
          >
            {quakes.records.map((q) => (
              <button
                key={q.id}
                type="button"
                onMouseEnter={() => setSelected(q.id)}
                onFocus={() => setSelected(q.id)}
                onClick={() => setSelected(q.id)}
                aria-pressed={q.id === detail?.id}
                className={`${control} w-auto px-3`}
              >
                {q.place}
              </button>
            ))}
          </div>
          <p className="min-h-11 text-sm text-primary" aria-live="polite">
            {detail
              ? `${detail.place}｜震级 ${detail.mag}｜经度 ${detail.lon}°｜纬度 ${detail.lat}°`
              : "空结果：降低阈值、换回正常数据，或重置。"}
          </p>
          <p role="status" className="my-2 text-sm text-primary">
            显示 {quakes.records.length}；阈值过滤 {quakes.filtered}
            ；诊断／策略排除 {quakes.errors.length}。
          </p>
          <ul
            className="space-y-1 text-sm text-secondary"
            aria-label="地震诊断"
          >
            {quakes.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
