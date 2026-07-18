import type { ReviewQuestion } from "./types";

export const pccLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "pcc-learning-map-1",
    chapter: "pcc-learning-map",
    level: 1,
    question: "第三版官方20章可以划分为哪五个学习阶段？",
    answer: "第1–4章是environment、values与lists；第5–11章是conditions、dictionaries、input/while、functions、classes、files/exceptions与pytest；第12–14章完成Alien Invasion；第15–17章完成generated/file/API data visualization；第18–20章完成Django model、accounts、style与deployment。分组只用于导航，每章仍保留独立入口。",
    tags: ["official-outline", "20-chapters", "learning-path"],
  },
  {
    id: "pcc-learning-map-2",
    chapter: "pcc-learning-map",
    level: 2,
    question: "为什么游戏、数据和Web项目各自都不能合并成一个泛化页面？",
    answer: "Alien Invasion分别建立ship/bullet lifecycle、fleet/collision/lives和score/restart/HUD；data项目分别处理generated seed、CSV/GeoJSON schema与HTTP/rate-limit；Django分别处理model/request/migration、forms/auth/owner、style/production release。合并会删除独立failure model和最小回退点。",
    tags: ["projects", "fidelity", "failure-model"],
  },
  {
    id: "pcc-learning-map-3",
    chapter: "pcc-learning-map",
    level: 3,
    question: "遇到API图表为空时，应沿哪条跨章依赖链回退？",
    answer: "第17章先区分transport、status、JSON、schema与valid empty，再检查normalization/rate-limit；异常与external boundary回第10章，nested dictionary shape回第6章，visual encoding/artifact回第15章。修复producer后重验record count、sort、labels与export。",
    tags: ["dependency", "API", "debugging"],
  },
  {
    id: "pcc-learning-map-4",
    chapter: "pcc-learning-map",
    level: 4,
    question: "一章何时可以从学习地图中标记为真正完成？",
    answer: "官方outline已覆盖，学习者能解释state和failure，完成可运行exercise，review可无提示回答，并保存test/build/artifact evidence。Pygame需lifecycle/collision证据，data需schema/count/artifact，Django需migration/security/static/health。页面浏览或质量分数本身只是一部分。",
    tags: ["evidence", "acceptance", "practice"],
  },
];
