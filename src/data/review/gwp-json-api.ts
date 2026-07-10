import type { ReviewQuestion } from "./types";

/** JSON API 复习题 */
export const gwpJsonApiQuestions: ReviewQuestion[] = [
  {
    id: "gwp-json-api-1",
    chapter: "gwp-json-api",
    level: 1,
    question: `struct tag \`json:\"email,omitempty\"\` 和 \`json:\"-\"\` 的区别是什么？各自适用什么场景？`,
    answer: `json:\"email,omitempty\"：字段正常序列化为 JSON 键 email，但值为零值（空字符串/0/nil/false）时省略该键。适用可选字段——有值输出，无值不出现。json:\"-\"：字段完全排除——既不序列化也不反序列化。适用敏感字段（密码）或内部字段（临时计算值）。注意 json:\"-,\" （带逗号）表示字段名真的叫 -，不是排除。`,
    tags: ["struct tag", "omitempty", "基础"],
  },
  {
    id: "gwp-json-api-2",
    level: 2,
    chapter: "gwp-json-api",
    question: `json.NewEncoder(w).Encode(v) 和 json.Marshal(v) + w.Write(data) 有什么区别？哪个更适合 HTTP 响应？`,
    answer: `json.Marshal 先将整个 JSON 编码到 []byte 内存，再 w.Write 写出——两次内存操作，有一次额外分配。json.NewEncoder(w).Encode(v) 直接流式写入 io.Writer，无需中间 []byte——减少一次内存分配，且 Encode 自动追加换行符。HTTP 响应场景用 Encoder 更高效——ResponseWriter 实现了 io.Writer，直接编码写入避免中间缓冲。同理请求解码用 json.NewDecoder(r.Body).Decode(&v) 比先 io.ReadAll 再 Unmarshal 更高效。`,
    tags: ["Encoder", "Marshal", "性能"],
  },
  {
    id: "gwp-json-api-3",
    level: 3,
    chapter: "gwp-json-api",
    question: `设计一个统一的 API 错误响应格式，能区分验证错误（多字段）和其他错误，给出 JSON 结构和 Go 实现。`,
    answer: `JSON 结构：{\"error\":{\"code\":\"VALIDATION_ERROR\",\"message\":\"...\",\"details\":[{\"field\":\"name\",\"message\":\"required\"}]}}。Go 实现：\ntype FieldError struct { Field, Message string }\ntype APIError struct {\n  Code string \`json:\"code\"\`\n  Message string \`json:\"message\"\`\n  Details []FieldError \`json:\"details,omitempty\"\`\n}\nfunc writeError(w http.ResponseWriter, status int, e APIError) {\n  w.Header().Set(\"Content-Type\", \"application/json\")\n  w.WriteHeader(status)\n  json.NewEncoder(w).Encode(map[string]APIError{\"error\": e})\n}。验证错误用 422 + details 列表，其他错误省略 details。omitempty 确保非验证错误不输出空数组。`,
    tags: ["错误响应", "RESTful", "实践"],
  },
  {
    id: "gwp-json-api-4",
    level: 4,
    chapter: "gwp-json-api",
    question: `一个 RESTful API 中 User 资源在输入（创建）和输出（响应）时需要不同字段（输入含密码，输出不含），如何设计 struct 避免泄露敏感信息？`,
    answer: `方案1（推荐）：为输入和输出定义不同 struct——CreateUserInput struct 含 Password 字段，UserResponse struct 不含 Password（或用 json:\"-\"）。Handler 接收 Input、查询数据库后映射到 Response 返回。好处：类型安全，编译时保证不泄露。方案2：单个 User struct，Password 字段加 json:\"-\"。但创建时需要从 JSON 解析密码——json:\"-\" 也阻止反序列化。解决方案2变体：用两个 tag 但 Go json 不支持读写分离，所以仍需两个 struct。方案3：map[string]any 动态构造响应，手动选择字段——灵活但无类型安全。最佳实践：输入和输出分离 struct，清晰且安全。如果 struct 字段多可嵌入公共部分（type UserBase struct{ ID, Name }），输入嵌入并加 Password，输出只嵌入公共部分。`,
    tags: ["安全", "struct设计", "输入输出分离", "综合"],
  },
];
