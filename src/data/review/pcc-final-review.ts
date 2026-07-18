import type { ReviewQuestion } from "./types";

export const pccFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "pcc-final-review-1",
    chapter: "pcc-final-review",
    level: 1,
    question: "第1–11章怎样构成三个项目共同的program contract stack？",
    answer: "第1章固定interpreter，第2–4章建立values/collections，第5–7章建立conditions/dictionaries/state loops，第8–9章建立function/class ownership，第10章建立file/exception/JSON boundary，第11章提供pytest regression。三个项目都消费这些contracts，只是state lifetime和外部边界不同。",
    tags: ["contracts", "foundations", "integration"],
  },
  {
    id: "pcc-final-review-2",
    chapter: "pcc-final-review",
    level: 2,
    question: "Alien Invasion、Data Visualization与Learning Log最关键的证据分别是什么？",
    answer: "Alien Invasion保存FPS、Group counts和before/event/after transitions；Data保存source、raw/accepted/skipped、range/seed/schema和PNG/HTML artifact；Learning Log保存migrations、form/CSRF tests、two-user owner matrix、static/Gunicorn/health/logs。共同的tests不能替代项目专属证据。",
    tags: ["game", "data", "web"],
  },
  {
    id: "pcc-final-review-3",
    chapter: "pcc-final-review",
    level: 3,
    question: "Alice能编辑Bob的Entry时，producer-to-consumer链应如何修复和验证？",
    answer: "producer是URL entry_id，contract必须把lookup限定为topic__owner=request.user，consumer是bound ModelForm update。修复后用Alice/Bob fixtures直接猜id并POST，预期404且Bob record before/after不变；同时复查list、detail和new-entry parent都scope owner。",
    tags: ["authorization", "ownership", "security"],
  },
  {
    id: "pcc-final-review-4",
    chapter: "pcc-final-review",
    level: 4,
    question: "一个20章capstone何时达到可交付标准？",
    answer: "同一commit具备自动behavior tests、boundary/failure scenarios、identity/ownership matrix、chart/build/runtime artifacts与operations evidence；clean build可重现，migration/static/process/health通过，logs可定位且有rollback。happy path演示、质量分数或平台绿色状态都不能单独证明完成。",
    tags: ["capstone", "release", "evidence"],
  },
];
