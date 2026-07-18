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
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

type Matrix2 = [[number, number], [number, number]];

function multiply2(left: Matrix2, right: Matrix2): Matrix2 {
  return [
    [
      left[0][0] * right[0][0] + left[0][1] * right[1][0],
      left[0][0] * right[0][1] + left[0][1] * right[1][1],
    ],
    [
      left[1][0] * right[0][0] + left[1][1] * right[1][0],
      left[1][0] * right[0][1] + left[1][1] * right[1][1],
    ],
  ];
}

function matrixText(matrix: Matrix2) {
  return `[${matrix[0].join(",")}; ${matrix[1].join(",")}]`;
}

function transpose2(matrix: Matrix2): Matrix2 {
  return [[matrix[0][0], matrix[1][0]], [matrix[0][1], matrix[1][1]]];
}

export function CLRS4MatrixDimensionsLab() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  return (
    <Figure caption="An m×n matrix has m rows, n columns, and mn scalar entries; the order of dimensions is part of the type.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">rows m = {rows}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={rows} onChange={(event) => setRows(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">columns n = {columns}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={columns} onChange={(event) => setColumns(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="shape" value={`${rows}×${columns}`} /><Stat label="entries" value={(rows * columns).toString()} tone="success" /><Stat label="transpose shape" value={`${columns}×${rows}`} /></div>
    </Figure>
  );
}

export function CLRS4MatrixEntryLab() {
  const [row, setRow] = useState(2);
  const [column, setColumn] = useState(3);
  const value = 10 * row + column;
  return (
    <Figure caption="Entry aᵢⱼ identifies row i first and column j second; swapping indices addresses the transposed position.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">row i = {row}<input className="mt-2 w-full accent-current" type="range" min="1" max="4" value={row} onChange={(event) => setRow(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">column j = {column}<input className="mt-2 w-full accent-current" type="range" min="1" max="4" value={column} onChange={(event) => setColumn(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="aᵢⱼ" value={`a${row}${column}`} /><Stat label="stored value" value={value.toString()} tone="success" /><Stat label="transpose address" value={`a${column}${row}`} /></div>
    </Figure>
  );
}

export function CLRS4MatrixAdditionLab() {
  const [offset, setOffset] = useState(1);
  const left: Matrix2 = [[1, 2], [3, 4]];
  const right: Matrix2 = [[offset, 0], [0, offset]];
  const sum: Matrix2 = [[left[0][0] + right[0][0], left[0][1] + right[0][1]], [left[1][0] + right[1][0], left[1][1] + right[1][1]]];
  return (
    <Figure caption="Matrix addition is entrywise and requires equal shapes; scalar multiplication also acts independently on every entry.">
      <label className="text-sm font-semibold text-primary">diagonal offset = {offset}<input className="mt-2 w-full accent-current" type="range" min="-4" max="5" value={offset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={matrixText(left)} /><Stat label="B" value={matrixText(right)} /><Stat label="A+B" value={matrixText(sum)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ScalarMultiplicationLab() {
  const [scalar, setScalar] = useState(2);
  const matrix: Matrix2 = [[1, -2], [3, 4]];
  const scaled: Matrix2 = [[scalar * matrix[0][0], scalar * matrix[0][1]], [scalar * matrix[1][0], scalar * matrix[1][1]]];
  return (
    <Figure caption="Scalar multiplication preserves matrix shape and scales every row, column, determinant power, and linear transformation output consistently.">
      <label className="text-sm font-semibold text-primary">scalar α = {scalar}<input className="mt-2 w-full accent-current" type="range" min="-3" max="5" value={scalar} onChange={(event) => setScalar(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={matrixText(matrix)} /><Stat label="αA" value={matrixText(scaled)} tone="success" /><Stat label="shape" value="2×2" /></div>
    </Figure>
  );
}

export function CLRS4MatrixVectorLab() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(1);
  const matrix: Matrix2 = [[2, 1], [-1, 3]];
  const output = [2 * x + y, -x + 3 * y];
  return (
    <Figure caption="Matrix-vector multiplication forms one dot product per row, interpreting a matrix as a linear transformation.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x₁ = {x}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">x₂ = {y}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={matrixText(matrix)} /><Stat label="input" value={`(${x},${y})`} /><Stat label="Ax" value={`(${output.join(",")})`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MultiplicationShapeLab() {
  const [m, setM] = useState(2);
  const [innerLeft, setInnerLeft] = useState(3);
  const [innerRight, setInnerRight] = useState(3);
  const [p, setP] = useState(4);
  const valid = innerLeft === innerRight;
  return (
    <Figure caption="A(m×n)B(q×p) is defined only when n=q, and the result keeps the outer dimensions m×p.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><label className="text-sm font-semibold text-primary">m={m}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">n={innerLeft}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={innerLeft} onChange={(event) => setInnerLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">q={innerRight}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={innerRight} onChange={(event) => setInnerRight(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">p={p}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={p} onChange={(event) => setP(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left shape" value={`${m}×${innerLeft}`} /><Stat label="right shape" value={`${innerRight}×${p}`} /><Stat label="product" value={valid ? `${m}×${p}` : "undefined"} tone={valid ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4MatrixProductLab() {
  const [entry, setEntry] = useState<"00" | "01" | "10" | "11">("01");
  const left: Matrix2 = [[1, 2], [3, 4]];
  const right: Matrix2 = [[2, 0], [1, 3]];
  const product = multiply2(left, right);
  const row = Number(entry[0]) as 0 | 1;
  const column = Number(entry[1]) as 0 | 1;
  const terms = [left[row][0] * right[0][column], left[row][1] * right[1][column]];
  return (
    <Figure caption="Product entry cᵢⱼ is the dot product of row i from A and column j from B, summing over the shared dimension.">
      <label className="text-sm font-semibold text-primary">inspected entry<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={entry} onChange={(event) => setEntry(event.target.value as typeof entry)}><option value="00">c11</option><option value="01">c12</option><option value="10">c21</option><option value="11">c22</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="dot-product terms" value={terms.join(" + ")} /><Stat label="entry value" value={product[row][column].toString()} tone="success" /><Stat label="whole AB" value={matrixText(product)} /></div>
    </Figure>
  );
}

export function CLRS4TransposeLab() {
  const [swap, setSwap] = useState(false);
  const matrix: Matrix2 = [[1, 2], [3, 4]];
  const displayed = swap ? transpose2(matrix) : matrix;
  return (
    <Figure caption="Transpose swaps rows and columns, satisfies (Aᵀ)ᵀ=A, and reverses product order: (AB)ᵀ=BᵀAᵀ.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={swap} onChange={(event) => setSwap(event.target.checked)} />show transpose</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="operation" value={swap ? "Aᵀ" : "A"} /><Stat label="matrix" value={matrixText(displayed)} tone="success" /><Stat label="shape" value="2×2" /></div>
    </Figure>
  );
}

export function CLRS4ProductTransposeLab() {
  const left: Matrix2 = [[1, 2], [0, 1]];
  const right: Matrix2 = [[2, 1], [3, 4]];
  const productTranspose = transpose2(multiply2(left, right));
  const reversed = multiply2(transpose2(right), transpose2(left));
  const wrongOrder = multiply2(transpose2(left), transpose2(right));
  return (
    <Figure caption="Transposing a product reverses factor order; retaining the original order generally produces a different matrix.">
      <div className="grid gap-2 sm:grid-cols-3"><Stat label="(AB)ᵀ" value={matrixText(productTranspose)} tone="success" /><Stat label="BᵀAᵀ" value={matrixText(reversed)} tone="success" /><Stat label="AᵀBᵀ" value={matrixText(wrongOrder)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4IdentityLab() {
  const [side, setSide] = useState<"left" | "right">("left");
  const matrix: Matrix2 = [[2, -1], [3, 5]];
  const identity: Matrix2 = [[1, 0], [0, 1]];
  const product = side === "left" ? multiply2(identity, matrix) : multiply2(matrix, identity);
  return (
    <Figure caption="The identity matrix is the multiplicative neutral element on either compatible side, while the zero matrix is the additive neutral element.">
      <div className="flex border border-border">{(["left", "right"] as const).map((item) => <button key={item} type="button" className={`flex-1 p-2 text-sm font-semibold ${side === item ? "bg-accent text-background" : "text-primary"}`} onClick={() => setSide(item)}>{item === "left" ? "IA" : "AI"}</button>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={matrixText(matrix)} /><Stat label="product" value={matrixText(product)} tone="success" /><Stat label="unchanged" value={matrixText(product) === matrixText(matrix) ? "yes" : "no"} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4AssociativityLab() {
  const left: Matrix2 = [[1, 1], [0, 1]];
  const middle: Matrix2 = [[2, 0], [1, 3]];
  const right: Matrix2 = [[1, 2], [2, 1]];
  const first = multiply2(multiply2(left, middle), right);
  const second = multiply2(left, multiply2(middle, right));
  return (
    <Figure caption="Matrix multiplication is associative, allowing parenthesization changes that can dramatically alter arithmetic cost without changing the result.">
      <div className="grid grid-cols-2 gap-2"><Stat label="(AB)C" value={matrixText(first)} tone="success" /><Stat label="A(BC)" value={matrixText(second)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4NoncommutativityLab() {
  const left: Matrix2 = [[1, 1], [0, 1]];
  const right: Matrix2 = [[1, 0], [1, 1]];
  const leftRight = multiply2(left, right);
  const rightLeft = multiply2(right, left);
  return (
    <Figure caption="Matrix multiplication is generally not commutative: AB and BA may both exist yet encode different transformation order and values.">
      <div className="grid grid-cols-2 gap-2"><Stat label="AB" value={matrixText(leftRight)} tone="success" /><Stat label="BA" value={matrixText(rightLeft)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4DeterminantLab() {
  const [d, setD] = useState(4);
  const matrix: Matrix2 = [[2, 1], [3, d]];
  const determinant = 2 * d - 3;
  return (
    <Figure caption="For a 2×2 matrix, det(A)=ad−bc; a zero determinant signals dependent columns and no two-sided inverse.">
      <label className="text-sm font-semibold text-primary">bottom-right d = {d}<input className="mt-2 w-full accent-current" type="range" min="-3" max="6" value={d} onChange={(event) => setD(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={matrixText(matrix)} /><Stat label="det(A)" value={determinant.toString()} tone={determinant === 0 ? "danger" : "success"} /><Stat label="invertible" value={determinant === 0 ? "no" : "yes"} tone={determinant === 0 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4InverseLab() {
  const [d, setD] = useState(2);
  const determinant = d - 1;
  const invertible = determinant !== 0;
  const inverse = invertible ? `[${(d / determinant).toFixed(2)},${(-1 / determinant).toFixed(2)}; ${(-1 / determinant).toFixed(2)},${(1 / determinant).toFixed(2)}]` : "undefined";
  return (
    <Figure caption="A square matrix has a two-sided inverse exactly when it is nonsingular; solving systems should usually avoid explicitly forming the inverse.">
      <label className="text-sm font-semibold text-primary">A=[1,1;1,d], d = {d}<input className="mt-2 w-full accent-current" type="range" min="-2" max="5" value={d} onChange={(event) => setD(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="det(A)" value={determinant.toString()} /><Stat label="A⁻¹" value={inverse} tone={invertible ? "success" : "danger"} /><Stat label="AA⁻¹" value={invertible ? "I" : "not defined"} /></div>
    </Figure>
  );
}

export function CLRS4RankLab() {
  const [dependent, setDependent] = useState(false);
  const matrix: Matrix2 = dependent ? [[1, 2], [2, 4]] : [[1, 2], [2, 5]];
  const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  const rank = determinant !== 0 ? 2 : matrix.flat().some((value) => value !== 0) ? 1 : 0;
  return (
    <Figure caption="Rank is the dimension of the row or column space; full rank for a square matrix is equivalent to invertibility.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={dependent} onChange={(event) => setDependent(event.target.checked)} />make row 2 equal 2×row 1</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A" value={matrixText(matrix)} /><Stat label="rank" value={rank.toString()} tone={rank === 2 ? "success" : "warning"} /><Stat label="columns" value={rank === 2 ? "independent" : "dependent"} /></div>
    </Figure>
  );
}

export function CLRS4MatrixCertificateLab() {
  const [shapes, setShapes] = useState(true);
  const [properties, setProperties] = useState(false);
  const [numerics, setNumerics] = useState(true);
  const complete = shapes && properties && numerics;
  return (
    <Figure caption="A matrix certificate records shapes, operation order, algebraic premises, and numerical checks such as residuals or rank rather than only final entries.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={shapes} onChange={(event) => setShapes(event.target.checked)} />shapes</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={properties} onChange={(event) => setProperties(event.target.checked)} />properties</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={numerics} onChange={(event) => setNumerics(event.target.checked)} />residuals</label></div>
      <div className="mt-4"><Stat label="matrix argument" value={complete ? "auditable" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
