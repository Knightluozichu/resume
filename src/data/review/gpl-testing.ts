import type { ReviewQuestion } from "./types";

/** 测试 复习题 */
export const gplTestingQuestions: ReviewQuestion[] = [
  {
    id: "gpl-testing-1",
    chapter: "gpl-testing",
    level: 1,
    question: "Go testing 包如何写单元测试？命名规则？",
    answer: "命名规则：测试文件 _test.go 结尾，测试函数 Test 开头（func TestXxx(t*testing.T)）。运行：go test ./... 所有测试，-v 详细，-run TestXxx 指定。基本写法：func TestAdd(t*testing.T){got:=Add(1,2);if got!=3{t.Errorf(\"Add(1,2)=%d,want 3\",got)}}。失败用 t.Error（继续）或 t.Fatal（立即停止）。t.Skip 跳过。t.Parallel 并行。",
    tags: ["testing","单元测试","Test","_test.go"],
  },
  {
    id: "gpl-testing-2",
    chapter: "gpl-testing",
    level: 2,
    question: "什么是表驱动测试？为什么 Go 推荐这种方式？",
    answer: "表驱动测试将测试用例组织为结构体切片循环执行：tests:=[]struct{a,b,want int}{{1,2,3},{0,0,0},...};for _,tt:=range tests{got:=Add(tt.a,tt.b);if got!=tt.want{t.Errorf(...)}}。Go 推荐因为：1.Go 没有断言库（刻意设计）用原生 if+t.Errorf 代替。2.新增用例只加一行数据不改逻辑。3.数据和逻辑分离清晰。4.配合 t.Run 为每个用例命名（子测试）。",
    tags: ["表驱动测试","t.Run","子测试","Go测试"],
  },
  {
    id: "gpl-testing-3",
    chapter: "gpl-testing",
    level: 3,
    question: "如何写基准测试？如何分析结果？",
    answer: "基准测试函数 Benchmark 开头：func BenchmarkAdd(b*testing.B){for i:=0;i<b.N;i++{Add(1,2)}}。运行 go test -bench=. -benchmem。b.N 由框架自动调整从 1 开始每次约 1.2 倍直到测量稳定。输出：BenchmarkAdd-8 1000000000 0.3 ns/op 0 B/op 0 allocs/op（8 核 10 亿次每次 0.3ns 0 字节 0 分配）。分析：ns/op 越小越快，B/op allocs/op 越少 GC 压力越小。b.ResetTimer 排除初始化。",
    tags: ["Benchmark","基准测试","b.N","benchmem"],
  },
  {
    id: "gpl-testing-4",
    chapter: "gpl-testing",
    level: 4,
    question: "如何用 httptest 测试 HTTP 处理器？如何 mock 依赖？",
    answer: "httptest：req:=httptest.NewRequest(\"GET\",\"/users/1\",nil);w:=httptest.NewRecorder();handler.ServeHTTP(w,req);resp:=w.Result();断言 StatusCode 和 body。Mock 依赖：1.定义接口 type Store interface{GetUser(id int)(*User,error)}。2.实现 mock type mockStore struct{};func(m*mockStore)GetUser(id int)(*User,error){return&User{ID:id},nil}。3.注入 mock：handler:=NewUserHandler(mockStore{})。Go 不需 mock 框架因接口隐式实现手写 mock 结构体即可。",
    tags: ["httptest","mock","接口","HTTP测试"],
  }
];
