import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "Python实现与工具链", input: "需求与输入", action: "原书从CPython、Jython、IronPython与PyPy说明实现差异", evidence: "Python实现与工具链的测试与迁移记录", invariant: "原书从CPython、Jython、IronPython与PyPy说明实现差异；现代项目仍要记录解释器实现、版本、ABI和平台，不能把Python语言与某个运行时完全等同。" },
  { label: "可复现安装", input: "Python实现与工具链", action: "系统包、源码编译和Windows工具链会改变头文件、动态库与扩展构建结果", evidence: "可复现安装的测试与迁移记录", invariant: "系统包、源码编译和Windows工具链会改变头文件、动态库与扩展构建结果；当前实践应使用受支持解释器和隔离环境，并在干净机器验证创建与安装。" },
  { label: "交互提示符", input: "可复现安装", action: "提示符适合探索对象、验证表达式和缩小故障，但会话历史不是可复现程序", evidence: "交互提示符的测试与迁移记录", invariant: "提示符适合探索对象、验证表达式和缩小故障，但会话历史不是可复现程序；有效实验要转成脚本、测试或文档示例。" },
  { label: "包管理迁移", input: "交互提示符", action: "原书的setuptools与EasyInstall建立依赖安装意识", evidence: "包管理迁移的测试与迁移记录", invariant: "原书的setuptools与EasyInstall建立依赖安装意识；现代项目用pip、venv和pyproject声明构建边界，旧命令只作为迁移背景。" },
  { label: "编辑器与IDE", input: "包管理迁移", action: "编辑器、调试器、格式与静态检查共同构成反馈环", evidence: "编辑器与IDE的测试与迁移记录", invariant: "编辑器、调试器、格式与静态检查共同构成反馈环；工具选择可以变化，但项目配置应进版本库，并能从命令行复现同一检查。" },
];
export function PyaGettingStartedModelLab(){return <PythonAdvancedOfficialLab title="搭建专业开发环境：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaGettingStartedBoundaryLab(){return <PythonAdvancedOfficialLab title="搭建专业开发环境：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaGettingStartedEvidenceLab(){return <PythonAdvancedOfficialLab title="搭建专业开发环境：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
