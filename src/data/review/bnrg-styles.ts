/** 复习题库 · 样式与主题（bnrg-styles）。Big Nerd Ranch Guide 第 21 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgStylesQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-st-1",
    chapter: "bnrg-styles",
    level: 1,
    question: "Style 和 Theme 的区别？",
    answer:
      "Style 作用于单个 View（如 TextAppearance、Button 样式）。Theme 作用于整个 Activity/应用窗口——定义 colorPrimary、colorAccent、默认 TextView 样式等，通过 Context 主题继承传递。",
    tags: ["Style", "Theme"],
  },
  {
    id: "bnrg-st-2",
    chapter: "bnrg-styles",
    level: 1,
    question: "Theme 中 `?attr/colorPrimary` 和 `@color/primary` 引用方式的区别？",
    answer:
      "?attr/ 引用当前 Theme 定义的属性值——换 Theme 时自动跟随。 @color/ 引用固定颜色资源——不随 Theme 变。Theme 相关色（主色、强调色）应用 ?attr/。",
    tags: ["attr", "Theme"],
  },
  {
    id: "bnrg-st-3",
    chapter: "bnrg-styles",
    level: 2,
    question: "styles.xml 里 parent 属性做什么？",
    answer:
      "继承父 Style 的所有属性，子 Style 只 override 差异项。如 `<style name=\"AppTitle\" parent=\"TextAppearance.MaterialComponents.Headline6\">` 只改 textColor 和 textSize。",
    tags: ["继承", "parent"],
  },
  {
    id: "bnrg-st-4",
    chapter: "bnrg-styles",
    level: 2,
    question: "DayNight Theme 如何实现深色模式？",
    answer:
      "使用 Theme.MaterialComponents.DayNight，系统在 values-night/themes.xml 提供深色配色。UiMode 切换时 Activity 重建并应用 night 资源。也可 AppCompatDelegate.setDefaultNightMode 手动切换。",
    tags: ["DayNight", "深色模式"],
  },
  {
    id: "bnrg-st-5",
    chapter: "bnrg-styles",
    level: 3,
    question: "MaterialButton 颜色没跟随 Theme 变，可能原因？",
    answer:
      "① 布局里硬编码 android:background 覆盖了 Material 默认 tint。② 没用 Theme.MaterialComponents 或其子主题。③ 自定义 style 没 parent Widget.MaterialComponents.Button。去掉硬编码 background，用 app:backgroundTint=\"?attr/colorPrimary\"。",
    tags: ["Material", "排错"],
  },
];

export default bnrgStylesQuestions;
