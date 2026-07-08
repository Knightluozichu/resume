import type { ReviewQuestion } from "./types";

/** 测试与打包 复习题 */
export const giaTestingPackagingQuestions: ReviewQuestion[] = [
  {
    id: "gia-testing-packaging-1",
    chapter: "gia-testing-packaging",
    level: 1,
    question: "Go 测试文件必须满足什么命名规则才能被 go test 发现？",
    answer: "测试文件名必须以 _test.go 结尾，且与被测代码在同一包目录下。测试函数签名必须是 func TestXxx(t *testing.T)，其中 Xxx 是首字母大写的任意标识符。函数不接受 *testing.T 参数或不以 Test 开头都不会被当作测试运行。",
    tags: ["testing", "命名规则", "go test"],
  },
  {
    id: "gia-testing-packaging-2",
    level: 2,
    chapter: "gia-testing-packaging",
    question: "go.mod 中的 module 路径与 internal 目录各自起什么作用？",
    answer: "module 路径是整个模块的导入根路径（如 github.com/user/project），模块内所有包的导入路径都以它为前缀。internal 目录是 Go 的特殊可见性约束：internal 下的包只能被以 internal 父目录为根的子树内的包导入，防止跨模块滥用内部实现。两者配合实现清晰的包边界与封装。",
    tags: ["go.mod", "internal", "封装"],
  },
  {
    id: "gia-testing-packaging-3",
    level: 3,
    chapter: "gia-testing-packaging",
    question: "写一个表驱动测试，对 Add(a, b int) int 函数测试多组输入，并在失败时报告用例索引。",
    answer: "func TestAdd(t *testing.T) {\n  cases := []struct{ a, b, want int }{\n    {1, 2, 3},\n    {0, 0, 0},\n    {-1, 1, 0},\n    {100, 200, 300},\n  }\n  for i, c := range cases {\n    got := Add(c.a, c.b)\n    if got != c.want {\n      t.Errorf(\"case %d: Add(%d, %d) = %d, want %d\", i, c.a, c.b, got, c.want)\n    }\n  }\n}。关键点是用切片组织多组数据、用 range 遍历、失败信息含索引和输入值，方便定位。",
    tags: ["table-driven", "testing", "实践"],
  },
  {
    id: "gia-testing-packaging-4",
    level: 4,
    chapter: "gia-testing-packaging",
    question: "团队项目结构包含 cmd/、internal/、pkg/ 三层，请说明各层职责，以及如何用 go test 只跑 internal/ 下的包并生成覆盖率报告。",
    answer: "cmd/ 放可执行入口的 main 包，每个子目录一个二进制；internal/ 放仅供本模块使用的内部实现，受可见性约束保护；pkg/ 放可被外部模块导入的公共库代码（社区约定，非语言强制）。只测 internal 并生成覆盖率：go test -coverprofile=cover.out ./internal/...，再用 go tool cover -html=cover.out 查看报告。注意 -coverprofile 需指定输出文件，./internal/... 递归匹配该目录下所有包。覆盖率应作为参考而非唯一指标，重点测试边界和核心逻辑。",
    tags: ["项目结构", "覆盖率", "综合"],
  },
];
