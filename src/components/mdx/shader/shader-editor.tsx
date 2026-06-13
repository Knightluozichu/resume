"use client";

/**
 * <ShaderEditor>：CodeMirror 6 在线编辑片段着色器源码（HEL-27）。
 *
 * !!! 本文件 import CodeMirror 6（@codemirror/*，体积不小），只允许出现在 next/dynamic
 * 懒加载 chunk 内 —— 经 shader-editor-canvas.tsx，再由 shader-demo.tsx 在 editable=true
 * 时 dynamic(ssr:false) 引入。非 editable 的 ShaderDemo 永不触达本文件，CodeMirror 绝不
 * 进首屏 / 公共 layout / chapter 首屏 chunk（CLAUDE.md 硬规则 2/6）。
 *
 * 分包：editable 分支 → shader-editor-canvas（dynamic）→ 同时 import 本文件 + ShaderCanvas。
 * CodeMirror 仅被「editable 的 editor-canvas chunk」可达，故被 webpack 切进独立异步 chunk，
 * 只在读者遇到 editable demo 且 WebGL2 可用时按需加载（见 shader-demo.tsx 头注分包说明）。
 *
 * GLSL 高亮模式：CodeMirror 无官方 GLSL 包。GLSL 语法 ≈ C：花括号块、`//`/`/* *／` 注释、
 * float/int/void/if/for 等关键字、数字字面量、函数调用。故用 @codemirror/lang-cpp（C/C++
 * Lezer 语法）做近似高亮——关键字 / 注释 / 数字 / 字符串 / 函数名都能正确着色，足够教学。
 * vec2/sampler2D 等 GLSL 专有类型不会被识别为「类型」，但作为标识符正常显示，不影响阅读编辑。
 *
 * 主题：自定义暗色，与 DESIGN --code-bg(#0D1117) + shiki github-dark 协调（同一套 GitHub
 * Dark 语义色：关键字红、字符串浅蓝、数字蓝、函数紫、注释灰），让「读者在 shiki 代码块里看到的」
 * 与「在编辑器里改的」视觉一致。颜色取 token 或 github-dark 既有值，间距走 token。
 *
 * 错误行高亮：父级把编译失败的行号（1-based）传进 errorLines，本组件用 StateField +
 * Decoration.line 给对应行加 .cm-errorLine 背景 + 行号槽标记，并用 StateEffect 在每次
 * errorLines 变化时重算装饰。行号解析在父级（shader-editor-canvas）从 InfoLog 提取。
 *
 * a11y：CodeMirror 自带完整键盘可达（方向键 / Tab 缩进经 indentWithTab / 选区等）。
 */

import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import {
  HighlightStyle,
  bracketMatching,
  indentUnit,
  syntaxHighlighting,
} from "@codemirror/language";
import {
  EditorState,
  RangeSet,
  StateEffect,
  StateField,
  type Extension,
} from "@codemirror/state";
import {
  Decoration,
  EditorView,
  GutterMarker,
  type DecorationSet,
  drawSelection,
  gutterLineClass,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { useEffect, useRef } from "react";

// ============================ GitHub Dark 语义色（与 shiki github-dark / DESIGN 协调）============================
//
// 取自 shiki github-dark 同款语义色，使站点「shiki 渲染的代码块」与「CodeMirror 可编辑块」
// 配色一致。底色用 DESIGN token --code-bg(#0D1117)；前景 / 各 tag 色对齐 github-dark。
const GH = {
  bg: "#0d1117", // = --code-bg（DESIGN token）
  fg: "#e6edf3",
  keyword: "#ff7b72",
  string: "#a5d6ff",
  number: "#79c0ff",
  func: "#d2a8ff",
  variable: "#ffa657",
  type: "#79c0ff",
  comment: "#8b949e",
  operator: "#ff7b72",
  punctuation: "#c9d1d9",
  gutter: "#6e7681",
} as const;

const glslHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: GH.keyword },
  { tag: tags.controlKeyword, color: GH.keyword },
  { tag: tags.operatorKeyword, color: GH.keyword },
  { tag: tags.string, color: GH.string },
  { tag: tags.number, color: GH.number },
  { tag: tags.bool, color: GH.number },
  { tag: [tags.typeName, tags.standard(tags.typeName)], color: GH.type },
  { tag: tags.function(tags.variableName), color: GH.func },
  { tag: tags.function(tags.propertyName), color: GH.func },
  { tag: tags.variableName, color: GH.fg },
  { tag: tags.propertyName, color: GH.fg },
  { tag: tags.comment, color: GH.comment, fontStyle: "italic" },
  { tag: tags.operator, color: GH.operator },
  { tag: tags.punctuation, color: GH.punctuation },
  { tag: [tags.processingInstruction, tags.meta], color: GH.comment },
]);

// 编辑器外观主题：暗色，融进 DESIGN「交互 Demo 容器」（圆角 / 边框走 token 由外层提供）。
const editorTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: GH.bg,
      color: GH.fg,
      fontSize: "var(--text-xs)",
      borderRadius: "var(--radius-control)",
    },
    "&.cm-focused": { outline: "none" },
    ".cm-scroller": {
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
      lineHeight: "1.6",
    },
    ".cm-content": { caretColor: GH.fg, padding: "8px 0" },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: GH.fg },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: "var(--accent-glow)",
      },
    ".cm-gutters": {
      backgroundColor: GH.bg,
      color: GH.gutter,
      border: "none",
    },
    ".cm-activeLine": { backgroundColor: "#ffffff0a" },
    ".cm-activeLineGutter": { backgroundColor: "#ffffff0a", color: GH.fg },
    ".cm-lineNumbers .cm-gutterElement": { padding: "0 8px 0 12px" },
    // 错误行：语义红（--danger）小面积背景 + 左侧红条；行号槽对应行高亮。
    ".cm-errorLine": {
      backgroundColor: "color-mix(in srgb, var(--danger) 18%, transparent)",
      boxShadow: "inset 2px 0 0 0 var(--danger)",
    },
    ".cm-errorGutter": { color: "var(--danger)", fontWeight: "600" },
    ".cm-matchingBracket": {
      outline: "1px solid var(--accent-glow)",
      backgroundColor: "transparent",
    },
  },
  { dark: true },
);

// ============================ 错误行装饰（StateField + StateEffect）============================
//
// 父级用 setErrorLines effect 派发当前错误行号（1-based）；StateField 据此重算 line 装饰。
// 行号超出文档范围时静默跳过（编辑后文档变短、旧错误行号失效，不崩）。
const setErrorLines = StateEffect.define<readonly number[]>();

const errorLineDecoration = Decoration.line({ class: "cm-errorLine" });

const errorLineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(deco, tr) {
    let next = deco.map(tr.changes);
    for (const effect of tr.effects) {
      if (effect.is(setErrorLines)) {
        const lineCount = tr.state.doc.lines;
        // 去重 + 升序：RangeSet 要求按 from 升序加入。
        const sorted = Array.from(new Set(effect.value)).sort((a, b) => a - b);
        const ranges = sorted
          .filter((lineNo) => lineNo >= 1 && lineNo <= lineCount)
          .map((lineNo) =>
            errorLineDecoration.range(tr.state.doc.line(lineNo).from),
          );
        next = Decoration.set(ranges, true);
      }
    }
    return next;
  },
  provide: (field) => EditorView.decorations.from(field),
});

/**
 * 错误行号槽标记：在「行号 gutter」对应错误行的行号上挂 .cm-errorGutter（染红行号本身），
 * 让错误既有整行背景 + 左红条，也有行号高亮。用 gutterLineClass（叠加到已有 lineNumbers
 * gutter 上，不另起一列）而非新建 gutter，避免行号列重复。
 */
class ErrorGutterMarker extends GutterMarker {
  override elementClass = "cm-errorGutter";
}
const errorGutterMarker = new ErrorGutterMarker();

const errorGutterHighlight = gutterLineClass.compute(
  [errorLineField],
  (state) => {
    const deco = state.field(errorLineField);
    const marks: ReturnType<typeof errorGutterMarker.range>[] = [];
    deco.between(0, state.doc.length, (from) => {
      marks.push(errorGutterMarker.range(from));
    });
    return RangeSet.of(marks, true);
  },
);

// ============================ 组件 ============================

export type ShaderEditorProps = {
  /** 编辑器初始内容（= 当前 frag 源码）。仅作初值，受控更新走 onChange → 父级再决定。 */
  value: string;
  /** 文档变化回调（每次按键即触发；防抖重编译在父级处理）。 */
  onChange: (value: string) => void;
  /**
   * 当前编译错误行号（1-based，可空）。父级从 InfoLog 解析后传入；
   * 变化时高亮对应行。空数组 = 无错误，清除高亮。
   */
  errorLines?: readonly number[];
  /**
   * 受控重置信号：父级点「重置」时改变此值（如递增计数器），
   * 本组件据此把编辑器内容覆盖回 resetTo。不参与日常编辑（编辑只读 onChange）。
   */
  resetSignal?: number;
  /** 重置时要恢复成的源码（= 初始 frag）。 */
  resetTo: string;
  /** 编辑器高度（px），与画布协调。默认 240。 */
  height?: number;
};

export function ShaderEditor({
  value,
  onChange,
  errorLines,
  resetSignal,
  resetTo,
  height = 240,
}: ShaderEditorProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  // 用 ref 持有最新 onChange，避免它进编辑器初始化 effect deps 导致编辑器重建（丢光标 / 历史）。
  // 在 effect 内同步（不在 render 期写 ref，满足 react-hooks/refs）。
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // —— 初始化编辑器（只建一次；value 仅作初值，后续编辑由 CM 自管内部状态）——
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const extensions: Extension[] = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      drawSelection(),
      bracketMatching(),
      indentUnit.of("  "),
      EditorState.tabSize.of(2),
      cpp(),
      syntaxHighlighting(glslHighlight),
      editorTheme,
      errorLineField,
      errorGutterHighlight,
      EditorView.lineWrapping,
      keymap.of([...defaultKeymap, ...historyKeymap]),
      updateListener,
    ];

    const view = new EditorView({
      state: EditorState.create({ doc: value, extensions }),
      parent: host,
    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // 只建一次：value 作初值，errorLines/resetSignal 经各自 effect 增量派发，不重建编辑器。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // —— 错误行变化 → 派发 setErrorLines effect（增量更新装饰，不重建编辑器）——
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setErrorLines.of(errorLines ?? []) });
  }, [errorLines]);

  // —— 重置：resetSignal 变化 → 把文档整体替换回 resetTo（保留编辑器实例 / 历史可继续）——
  // 初次挂载不触发（resetSignal 初值与首个 effect run 一致，仅在其后续变化时覆盖）。
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: resetTo },
    });
    // resetTo 是稳定的初始 frag；仅 resetSignal 变化驱动重置。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  return (
    <div
      ref={hostRef}
      className="overflow-hidden rounded-control border border-border bg-code text-left"
      style={{ height: `${height}px` }}
      // CodeMirror 自带 role/键盘语义；外层仅作容器。
    />
  );
}

export default ShaderEditor;
