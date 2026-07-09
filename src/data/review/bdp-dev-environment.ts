import type { ReviewQuestion } from "./types";

export const bdpDevEnvironmentQuestions: ReviewQuestion[] = [
  {
    id: "bdp-dev-environment-01",
    chapter: "bdp-dev-environment",
    level: 1,
    question: "区块链开发环境的四大工具分层是什么？",
    answer: "四大分层为：语言与运行时（Node.js、Solidity 编译器 solc、TypeScript）、开发框架（Hardhat、Foundry）、本地链与钱包（Hardhat Node / Anvil、MetaMask）、测试网与区块浏览器（Sepolia 测试网、Etherscan）。",
    tags: ["开发环境", "工具栈", "分层"],
  },
  {
    id: "bdp-dev-environment-02",
    chapter: "bdp-dev-environment",
    level: 2,
    question: "Hardhat 与 Foundry 的主要区别是什么？如何选择？",
    answer: "Hardhat 基于 JavaScript/TypeScript，插件生态丰富，部署脚本灵活，适合前端栈团队；Foundry 基于 Solidity 写测试，编译与模糊测试速度极快，更贴近合约本身。需要快速模糊测试与贴近合约思维选 Foundry，需要与前端工具链深度集成选 Hardhat，两者也可并用。",
    tags: ["Hardhat", "Foundry", "框架对比"],
  },
  {
    id: "bdp-dev-environment-03",
    chapter: "bdp-dev-environment",
    level: 2,
    question: "本地链（Hardhat Node / Anvil）与公共测试网（Sepolia）各自的作用是什么？",
    answer: "本地链用于快速迭代：即时出块、可重置状态、可分叉主网、免 Gas，适合单元测试与联调；公共测试网用于接近真实环境的验证：真实共识、公开可见、外部用户与前端可接入，适合上线前的集成验证。两者互补，先本地后测试网。",
    tags: ["本地链", "测试网", "分叉", "验证流程"],
  },
  {
    id: "bdp-dev-environment-04",
    chapter: "bdp-dev-environment",
    level: 3,
    question: "为什么开发数据流要遵循「编写合约 → 框架编译 → 本地链调试 → 测试网验证 → 浏览器核查」的顺序？",
    answer: "这一顺序体现了从快速反馈到真实环境的逐层收敛：本地编译与本地链提供最快迭代反馈，捕捉语法与逻辑错误；测试网验证真实交互与外部接入；浏览器核查确保合约部署、源码验证与可读性。跳级会让早期错误暴露在更昂贵的环境，增加排查成本，因此严格按序执行。",
    tags: ["数据流", "开发流程", "分层验证"],
  },
];
