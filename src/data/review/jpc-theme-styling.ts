import type { ReviewQuestion } from "./types";

export const jpcThemeStylingQuestions: ReviewQuestion[] = [
  {
    id: "jpc-th-1",
    chapter: "jpc-theme-styling",
    level: 1,
    question: "MaterialTheme的三大支柱是什么？子组件如何消费主题Token？",
    answer: "三大支柱：①ColorScheme——颜色角色方案，定义primary/secondary/surface/error等颜色角色及on变体，lightColorScheme()/darkColorScheme()提供默认值。②Typography——文字样式，定义displayLarge~labelSmall等15种文字样式，含fontSize/fontWeight/lineHeight。③Shapes——形状，定义small/medium/large三种圆角，对应Button/Card/Sheet等组件。子组件通过MaterialTheme.colorScheme.primary、MaterialTheme.typography.bodyLarge、MaterialTheme.shapes.medium消费。这些属性本质是CompositionLocal.current的便捷访问器。也可用.copy()覆盖部分属性：MaterialTheme.typography.bodyLarge.copy(color=Color.Red)。",
    tags: ["MaterialTheme", "ColorScheme", "Typography", "Shapes"]
  },
  {
    id: "jpc-th-2",
    chapter: "jpc-theme-styling",
    level: 1,
    question: "颜色用「角色名」而非「色值名」有什么好处？",
    answer: "角色名（如primary/surface）vs色值名（如purple/white）的好处：①主题自适应——同一MaterialTheme.colorScheme.primary在亮色主题是紫色、暗色主题是浅紫色、动态取色是从壁纸提取的颜色，换主题时所有组件自动适配，不需修改组件代码。②语义清晰——primary表示主色、onPrimary表示主色上的前景色、surface表示表面色，开发者看到角色名就知道用途，看到Color(0xFF6200EE)不知道是主色还是次要色。③一致性保障——Material Design规范定义了每个角色的用途，用角色名强制遵循规范。④品牌定制——切换品牌色只需修改colorScheme中的primary值，所有使用primary的组件自动更新，适合白标应用。",
    tags: ["ColorScheme", "颜色角色", "主题适配"]
  },
  {
    id: "jpc-th-3",
    chapter: "jpc-theme-styling",
    level: 2,
    question: "如何实现深浅色主题切换和Android 12动态取色？",
    answer: "实现：@Composable fun AppTheme(darkTheme: Boolean = isSystemInDarkTheme(), dynamicColor: Boolean = true, content) { val context = LocalContext.current; val colorScheme = when { dynamicColor && Build.VERSION.SDK_INT >= S -> if(darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context); darkTheme -> DarkColors; else -> LightColors }; MaterialTheme(colorScheme, content) }。关键点：①isSystemInDarkTheme()读取系统暗色模式，系统切换时自动重组切换colorScheme。②Android 12+(S)支持Material You动态取色，dynamicLightColorScheme/dynamicDarkColorScheme从壁纸提取颜色。③降级策略——低于Android 12回退到自定义DarkColors/LightColors。④在Activity setContent中包裹AppTheme。⑤局部覆盖——某个子树可用不同MaterialTheme强制暗色。",
    tags: ["深浅色", "Dynamic Color", "主题切换"]
  },
  {
    id: "jpc-th-4",
    chapter: "jpc-theme-styling",
    level: 2,
    question: "CompositionLocal是什么？MaterialTheme如何通过它传递主题？",
    answer: "CompositionLocal是Compose的隐式依赖注入机制——通过CompositionLocalProvider提供值，子树通过LocalXxx.current读取，不需要逐层参数传递。MaterialTheme内部用CompositionLocalProvider提供三个CompositionLocal：LocalColorScheme、LocalTypography、LocalShapes。当MaterialTheme(colorScheme=..., typography=..., shapes=...)被调用时，将这些值注入Composition上下文。特点：①隐式传递——子树任何深度的Composable都能直接读取，不需逐层传参。②作用域——只有MaterialTheme子树中的Composable能读到该主题。③响应式——colorScheme变化时所有读取它的Composable自动重组。staticCompositionLocalOf用于不会变的值（不触发重组），compositionLocalOf用于会动态变化的值（触发重组）。",
    tags: ["CompositionLocal", "依赖注入", "主题传递"]
  }
];
