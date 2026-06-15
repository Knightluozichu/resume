/** 复习题库 · Android开发初体验（bnrg-first-app）。Big Nerd Ranch Guide 第 1 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgFirstAppQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "bnrg-fa-1",
    chapter: "bnrg-first-app",
    level: 1,
    question: "Android 应用的 `app/` 目录下有三个核心子目录：`manifests/`、`java/`、`res/`。它们分别放什么？",
    answer:
      "`manifests/` 放 `AndroidManifest.xml`——应用的「身份证」，声明组件和权限。`java/` 放 Kotlin/Java 源代码。`res/` 放资源文件——`res/layout/` 是布局 XML，`res/values/` 是字符串和颜色常量，`res/drawable/` 是图片。",
    tags: ["项目结构"],
  },
  {
    id: "bnrg-fa-2",
    chapter: "bnrg-first-app",
    level: 1,
    question: "Gradle 在构建 APK 的过程中做了哪四件事？按顺序说出。",
    answer:
      "编译（Kotlin → Java 字节码 → DEX 格式）→ 打包（DEX + 资源 + 清单 → 未签名 APK）→ 签名（Debug 或 Release 签名）→ 安装（通过 adb 推送到设备）。",
    tags: ["Gradle", "构建"],
  },
  {
    id: "bnrg-fa-3",
    chapter: "bnrg-first-app",
    level: 1,
    question: "`setContentView(R.layout.activity_main)` 这行代码在干什么？`R.layout.activity_main` 是从哪来的？",
    answer:
      "`setContentView` 把 `activity_main.xml` 布局文件加载进来，转成屏幕上可见的按钮和文字。`R.layout.activity_main` 是 Gradle 自动生成的 `R` 类里的一个整数 ID——你把 `activity_main.xml` 放进 `res/layout/`，Gradle 就在 `R` 类里给它分配一个唯一编号。",
    tags: ["Activity", "setContentView", "R"],
  },
  {
    id: "bnrg-fa-4",
    chapter: "bnrg-first-app",
    level: 1,
    question: "APK 文件本质上是什么？里面装了哪些东西？",
    answer:
      "APK 本质上是一个 zip 压缩包。里面装着：编译好的 .dex 字节码文件（你的代码）、res 目录下的所有资源文件、AndroidManifest.xml 清单、以及签名信息。可以右键 APK → 用解压工具打开看里面内容。",
    tags: ["APK"],
  },

  // ── L2 理解 ──
  {
    id: "bnrg-fa-5",
    chapter: "bnrg-first-app",
    level: 2,
    question: "为什么 Android 把代码（`java/`）和资源（`res/`）分开放在不同目录下，而不是混在一起？",
    answer:
      "① 职责分离——代码管逻辑、XML 管布局，各写各的不打架；② 资源可以按设备配置自动切换（比如 `res/values-zh/` 在中文系统下自动加载中文字符串，代码不用改）；③ R 类把资源统一编号，代码通过 ID 引用而非硬编码文件名，重构资源位置时代码不受影响。",
    tags: ["资源分离", "R"],
  },
  {
    id: "bnrg-fa-6",
    chapter: "bnrg-first-app",
    level: 2,
    question: "`app/build.gradle` 里的 `minSdk`、`targetSdk` 和 `compileSdk` 三个参数各管什么？为什么要有三个而不是一个？",
    answer:
      "`compileSdk`：编译时用的 SDK 版本——决定了你代码里能调用哪些 API。`minSdk`：应用能跑的最低 Android 版本——低于此版本的设备无法安装。`targetSdk`：你测试和适配过的目标版本——即使设备运行更高版本，系统也会按 targetSdk 的兼容行为来对待你的应用。三个分开是因为编译时、最低支持、适配目标这三件事是不同的决策维度。",
    tags: ["SDK版本", "build.gradle"],
  },
  {
    id: "bnrg-fa-7",
    chapter: "bnrg-first-app",
    level: 2,
    question: "为什么 Android 应用需要数字签名才能安装？Debug 签名的 APK 能发到应用商店吗？",
    answer:
      "签名是为了标识应用作者身份——系统通过签名判断更新包是否来自同一作者，防止恶意替换。Debug 签名只能用在本机调试——它是 Android SDK 工具自动生成的一个通用证书，所有用同一个 SDK 的人 debug 签名都一样，不安全也不唯一。发布到 Google Play 必须用你自己的 release 签名（通过 keytool 生成，自己保管密钥文件）。",
    tags: ["签名", "APK"],
  },

  // ── L3 应用 ──
  {
    id: "bnrg-fa-8",
    chapter: "bnrg-first-app",
    level: 3,
    question:
      "代码里 `R.layout.activity_main` 飘红，提示 `Unresolved reference: R`。但你的 `activity_main.xml` 确实在 `res/layout/` 里。列出至少三种可能导致 R 文件生成失败的原因。",
    answer:
      "① 资源 XML 文件有语法错误——比如某个标签没闭合、属性名拼错。② XML 文件里有 `@+id/` 引用了不存在的资源。③ 资源文件名不符合命名规则（只能用小写字母、数字、下划线，不能有大写字母或连字符）。④ 虽然没有在 res/xml 里放错格式文件，但如果某 PNG 图片其实不是 PNG（比如把 JPG 后缀改成 PNG），aapt 打包也会报错。检查 Build Output 面板看具体错误。",
    tags: ["R", "排错"],
  },
  {
    id: "bnrg-fa-9",
    chapter: "bnrg-first-app",
    level: 3,
    question:
      '你把 `android:text` 改成了「你好，Android！」，重新运行，App 直接闪退。Logcat 里写 `android.content.res.Resources$NotFoundException`。最可能的原因是什么？怎么修？',
    answer:
      '最可能的原因是 `strings.xml` 里缺失了这个字符串资源，而你在 XML 里写了 `@string/hello` 引用但那个 key 不存在。也可能你直接在 `android:text` 里写了硬编码的中文，而 XML 编码出问题。修法：① 去 `res/values/strings.xml` 确认 `<string name=\"hello\">` 存在；② 或者直接在 `android:text` 硬编码文字（不推荐，因为不利于多语言）。',
    tags: ["资源", "崩溃", "排错"],
  },
];

export default bnrgFirstAppQuestions;
