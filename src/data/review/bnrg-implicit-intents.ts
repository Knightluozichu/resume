/** 复习题库 · 隐式intent（bnrg-implicit-intents）。Big Nerd Ranch Guide 第 15 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgImplicitIntentsQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "bnrg-ii-1",
    chapter: "bnrg-implicit-intents",
    level: 1,
    question:
      "显式 intent 和隐式 intent 的核心区别是什么？各自适用于什么场景？",
    answer:
      "显式 intent 直接指定目标组件类名（如 `DetailActivity::class.java`），用于 App 内部页面跳转。隐式 intent 只描述「要做什么」（action + data + category），不指定谁来处理，用于跨 App 调用——打开网页、分享文字、发邮件、拨号等。",
    tags: ["显式intent", "隐式intent"],
  },
  {
    id: "bnrg-ii-2",
    chapter: "bnrg-implicit-intents",
    level: 1,
    question:
      "隐式 intent 匹配的三要素是什么？在 AndroidManifest 的 intent-filter 里分别对应哪些标签？",
    answer:
      "三要素：action（做什么）→ `<action>` 标签；category（什么场景）→ `<category>` 标签；data（操作什么数据，含 URI 和 MIME 类型）→ `<data>` 标签。系统遍历所有已安装 App 的 intent-filter，三要素全部匹配才算命中。",
    tags: ["intent-filter", "匹配规则"],
  },

  // ── L2 理解 ──
  {
    id: "bnrg-ii-3",
    chapter: "bnrg-implicit-intents",
    level: 2,
    question:
      "`Intent.createChooser(intent, \"分享到\")` 和直接 `startActivity(intent)` 有什么区别？分享功能应该用哪个？",
    answer:
      "直接 `startActivity(intent)` 在用户之前选过「始终用某 App」时会静默调起默认 App，不再弹选择列表。`createChooser` 强制弹出系统分享菜单，展示所有能处理该 intent 的 App 供用户选择。分享、打开链接等需要用户显式选择的场景，一律用 `createChooser`。",
    tags: ["createChooser", "分享"],
  },
  {
    id: "bnrg-ii-4",
    chapter: "bnrg-implicit-intents",
    level: 2,
    question:
      "为什么发出隐式 intent 前要用 `intent.resolveActivity(packageManager) != null` 检查？不检查会怎样？",
    answer:
      "`resolveActivity` 向系统查询有没有 App 能处理这个 intent。返回 `null` 说明没有任何已安装 App 的 intent-filter 能匹配（比如模拟器没装邮件客户端）。此时直接 `startActivity` 会抛出 `ActivityNotFoundException` 导致崩溃。前置检查可以让 App 给出 Toast 提示而非崩溃。",
    tags: ["resolveActivity", "安全"],
  },
  {
    id: "bnrg-ii-5",
    chapter: "bnrg-implicit-intents",
    level: 2,
    question:
      "`ACTION_SEND` 和 `ACTION_SENDTO` 有什么区别？发邮件应该用哪个？",
    answer:
      "`ACTION_SEND` 是通用分享动作，配合 MIME 类型（如 `text/plain`）会列出所有能处理该类型数据的 App（微信、短信、邮件等）。`ACTION_SENDTO` 专门用于调起邮件/短信 App，配合 `mailto:` 或 `smsto:` URI，不会弹出无关 App。发邮件应优先用 `ACTION_SENDTO` + `Uri.parse(\"mailto:\")`。",
    tags: ["ACTION_SEND", "ACTION_SENDTO", "邮件"],
  },

  // ── L3 应用 ──
  {
    id: "bnrg-ii-6",
    chapter: "bnrg-implicit-intents",
    level: 3,
    question:
      "你的 App 在 Manifest 里声明了以下 intent-filter，但从微信分享文字到你的 App 时，你的 App 不会出现在选项里。找出问题并给出修复后的完整 intent-filter。\n\n```xml\n<activity android:name=\".ImportActivity\">\n    <intent-filter>\n        <action android:name=\"android.intent.action.SEND\" />\n        <data android:mimeType=\"text/plain\" />\n    </intent-filter>\n</activity>\n```",
    answer:
      "缺少两处：① `<category android:name=\"android.intent.category.DEFAULT\" />` —— 隐式 intent 默认携带该 category，filter 里没有则匹配失败；② Android 12+ 需显式声明 `android:exported=\"true\"`。\n\n修复后：\n```xml\n<activity android:name=\".ImportActivity\" android:exported=\"true\">\n    <intent-filter>\n        <action android:name=\"android.intent.action.SEND\" />\n        <category android:name=\"android.intent.category.DEFAULT\" />\n        <data android:mimeType=\"text/plain\" />\n    </intent-filter>\n</activity>\n```",
    tags: ["intent-filter", "排错", "CATEGORY_DEFAULT"],
  },
];

export default bnrgImplicitIntentsQuestions;
