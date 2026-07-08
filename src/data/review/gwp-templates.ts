import type { ReviewQuestion } from "./types";

/** 模板渲染 复习题 */
export const gwpTemplatesQuestions: ReviewQuestion[] = [
  {
    id: "gwp-templates-1",
    chapter: "gwp-templates",
    level: 1,
    question: "html/template 的工作流程分哪两步？为什么 Parse 只做一次而 Execute 可以多次？",
    answer: "两步：Parse（解析模板字符串为 AST 语法树）和 Execute（遍历 AST 注入数据并输出）。Parse 只做一次因为词法/语法分析有开销，编译为 AST 后可复用。Execute 可多次调用，传入不同数据——适合应用启动时 Parse 一次，每个请求 Execute 渲染。用 template.Must 包装 Parse 确保启动时暴露模板语法错误。",
    tags: ["Parse", "Execute", "基础"],
  },
  {
    id: "gwp-templates-2",
    level: 2,
    chapter: "gwp-templates",
    question: "html/template 的\"上下文感知转义\"是什么？它与 text/template 的核心区别在哪里？",
    answer: "上下文感知转义指模板引擎根据 {{.}} 出现的位置（HTML 文本、属性、JavaScript、URL）自动选择不同转义策略。例如 < 在 HTML 文本中变 &lt;，在 JS 中变 \\u003c，在 URL 中变 %3C。html/template 有此特性防止 XSS；text/template 语法相同但不做任何转义——用户输入的 <script> 会被原样输出导致 XSS。核心区别就是安全转义：渲染 HTML 必须用 html/template，text/template 只用于生成代码/配置等非 HTML 场景。",
    tags: ["上下文转义", "XSS", "html vs text"],
  },
  {
    id: "gwp-templates-3",
    level: 3,
    chapter: "gwp-templates",
    question: "写一个模板，用 {{range}} 遍历用户列表，每个用户显示名称和邮箱，管理员额外显示徽章。给出模板和 Go 渲染代码。",
    answer: "模板：\n{{range .Users}}\n  <div>\n    <h2>{{.Name}}</h2>\n    <p>{{.Email}}</p>\n    {{if .Admin}}<span class=\"badge\">Admin</span>{{end}}\n  </div>\n{{end}}\n\nGo 代码：\nvar tmpl = template.Must(template.New(\"users\").Parse(tmplStr))\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  data := struct {\n    Users []User\n  }{Users: []User{{\"Alice\", \"a@b.com\", true}, {\"Bob\", \"b@c.com\", false}}}\n  tmpl.Execute(w, data)\n}。关键点：range 遍历切片、if 条件渲染、struct 作为数据源（字段须导出）、template.Must 处理解析错误。",
    tags: ["range", "if", "模板语法", "实践"],
  },
  {
    id: "gwp-templates-4",
    level: 4,
    chapter: "gwp-templates",
    question: "设计一个布局模板系统：layout.html 包含 header/main/footer，不同页面复用布局但 main 区域内容不同。如何用 template 组合实现？",
    answer: "用 {{define}} 定义命名模板，{{template \"name\" .}} 引用。layout.html 定义 layout（含 header/footer）并引用 content：{{define \"layout\"}}<html>...<main>{{template \"content\" .}}</main>...</html>{{end}}。各页面模板定义自己的 content：article.html: {{define \"content\"}}<article>...</article>{{end}}。Go 代码用 ParseFiles 加载所有模板，ExecuteTemplate 指定根模板：var tmpl = template.Must(template.ParseFiles(\"layout.html\", \"article.html\")); tmpl.ExecuteTemplate(w, \"layout\", data)。关键点：一个模板文件可定义多个命名模板、layout 引用 content 实现插槽模式、不同页面只需替换 content 定义、数据通过 . 传递给所有子模板。这是 Go 模板的继承/组合模式——虽无真正的继承，但通过命名模板引用达到复用效果。",
    tags: ["布局", "模板组合", "define", "综合"],
  },
];
