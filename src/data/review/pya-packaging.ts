import type { ReviewQuestion } from "./types";

/** 打包分发 复习题 */
export const pyaPackagingQuestions: ReviewQuestion[] = [
  {
    id: "pya-packaging-1",
    chapter: "pya-packaging",
    level: 1,
    question: "Python 项目推荐 src 布局还是 flat 布局？为什么？",
    answer: "推荐 src 布局。避免导入陷阱——flat 布局下 pytest 可能直接 import 本地源码而非安装版本。src 布局强制先安装再测试。",
    tags: ["src布局"],
  },
  {
    id: "pya-packaging-2",
    chapter: "pya-packaging",
    level: 2,
    question: "pyproject.toml 的 [build-system] 和 [project] 各定义什么？",
    answer: "[build-system] 定义构建工具（怎么构建），[project] 定义项目元数据（构建什么）。",
    tags: ["pyproject.toml"],
  },
  {
    id: "pya-packaging-3",
    chapter: "pya-packaging",
    level: 3,
    question: "如何将一个 Python 包发布到 PyPI？",
    answer: "写 pyproject.toml → python -m build 生成包 → twine check 验证 → twine upload --repository testpypi 测试 → twine upload 发布。",
    tags: ["PyPI", "发布流程"],
  },
  {
    id: "pya-packaging-4",
    chapter: "pya-packaging",
    level: 4,
    question: "请对比 venv、pip-tools、poetry 三种依赖管理方案。",
    answer: "venv+pip：最基础，requirements.txt 固定版本。pip-tools：pip-compile 生成精确 lock 文件。poetry：全功能项目管理，pyproject.toml+lock+build/publish 一站式。",
    tags: ["综合", "依赖管理"],
  },
];
