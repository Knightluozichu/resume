import type { ReviewQuestion } from "./types";

/** 包与模块 复习题 */
export const gplPackagesQuestions: ReviewQuestion[] = [
  {
    id: "gpl-packages-1",
    chapter: "gpl-packages",
    level: 1,
    question: "Go 的包和模块有什么区别？",
    answer: "包（package）：代码组织单元一个目录一个包。大写字母开头导出（public）小写未导出（private）。模块（module）：go.mod 定义的版本管理单元包含一组相关包。一个模块是仓库根目录有 go.mod 声明模块路径和依赖。import 路径=模块路径+子目录路径。如 import \"github.com/user/project/internal/util\"中 github.com/user/project 是模块路径 internal/util 是子目录。",
    tags: ["package","module","go.mod","import"],
  },
  {
    id: "gpl-packages-2",
    chapter: "gpl-packages",
    level: 2,
    question: "Go 的可见性规则？internal 包有什么特殊？",
    answer: "可见性：大写=导出（其他包可访问）小写=未导出（仅包内）。包括函数类型变量常量结构体字段接口方法。internal 包特殊规则：路径含 internal 的包只能被 internal 父目录下的包导入。如 a/b/internal/c 只能被 a/b/...下导入不能被 a/ 或其他模块导入。提供包级别访问控制——internal 是模块私有实现不对外暴露。",
    tags: ["可见性","导出","internal","访问控制"],
  },
  {
    id: "gpl-packages-3",
    chapter: "gpl-packages",
    level: 3,
    question: "go module 的版本管理机制？语义化版本如何工作？",
    answer: "go.mod 声明模块路径和依赖：module github.com/user/project;go 1.21;require github.com/lib v1.2.3。版本 vMAJOR.MINOR.PATCH。MAJOR=不兼容 API（v2+路径加 /v2）；MINOR=向后兼容新功能；PATCH=向后兼容 bug 修复。go get@v1.2.3 指定版本。go mod tidy 自动管理依赖。go.sum 记录哈希校验防篡改。GOPROXY 从代理下载依赖。v2+模块 import 路径必须含 /v2。",
    tags: ["go module","go.mod","语义化版本","go.sum","GOPROXY"],
  },
  {
    id: "gpl-packages-4",
    chapter: "gpl-packages",
    level: 4,
    question: "如何设计 Go 项目包结构？internal 和 cmd 目录如何使用？",
    answer: "标准结构：project/{go.mod,cmd/server/main.go,cmd/cli/main.go,internal/{app,domain,service,repository},pkg/utils,api/}。原则：1.cmd 只做入口（flag 解析+调 internal/app）。2.internal 放所有业务逻辑外部不可依赖。3.pkg 放可复用公共库（可选）。4.按领域分包非按技术分层。5.避免循环依赖（Go 不允许需用接口解耦）。6.内部包通过接口暴露给 cmd 注入具体实现（依赖注入）。",
    tags: ["包结构","internal","cmd","项目布局"],
  }
];
