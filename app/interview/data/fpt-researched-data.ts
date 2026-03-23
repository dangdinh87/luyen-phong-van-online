import type { QAItem } from '../interview-data'

export const FPT_RESEARCHED_DATA: QAItem[] = [
  // React Thực Chiến - Hooks & State Management Deep Dive
  {
    id: 935,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Khi nào nên dùng useCallback vs useMemo trong React? Cho ví dụ cụ thể từ dự án thực tế.",
    a: "useCallback giữ nguyên reference của function, dùng khi truyền callback cho child component để tránh re-render không cần thiết. useMemo giữ nguyên value của object/array sau mỗi render. Ví dụ: useCallback cho handleClick prop, useMemo cho filtered list trong component lớn."
  },
  {
    id: 936,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Giải thích lỗi 'missing dependency' trong useEffect. Tại sao phải thêm dependency array? Khi nào không cần?",
    a: "React cảnh báo nếu bạn dùng variable nhưng không khai báo trong dependency array - nó sẽ dùng stale closure. Không có dependency array = chạy mỗi lần render. Empty array = chạy 1 lần sau mount. Thêm variable vào array = chạy khi variable đó thay đổi."
  },
  {
    id: 937,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Làm sao xử lý race condition trong async useEffect? Ví dụ: user type vào search box rồi xóa hết, request cũ về trước request mới.",
    a: "Dùng cleanup function return trong useEffect để abort request cũ. Ví dụ: const controller = new AbortController(); fetch(url, {signal: controller.signal}); return () => controller.abort(). Hoặc dùng thư viện như tanstack-query handling caching tự động."
  },
  {
    id: 938,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Sự khác biệt giữa controlled vs uncontrolled component trong React form. Nên dùng cái nào?",
    a: "Controlled: value từ state, onChange cập nhật state - full control, dễ validate real-time. Uncontrolled: dùng ref để lấy value khi submit - simpler nhưng ít control. Thực tế: controlled tốt hơn cho form phức tạp, uncontrolled cho form simple."
  },
  {
    id: 939,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Prop drilling là gì? Làm sao giải quyết vấn đề này trong dự án lớn?",
    a: "Prop drilling: truyền props qua nhiều level component dù intermediate component không cần dùng. Giải pháp: dùng Context API cho global state, Redux/Zustand cho complex state, composition pattern để truyền JSX thay vì props."
  },

  // React Thực Chiến - Performance & Optimization
  {
    id: 940,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Tại sao list rendering cần key prop? Sử dụng index làm key có vấn đề gì?",
    a: "Key giúp React identify phần tử nào thay đổi/thêm/xóa. Dùng index làm key nguy hiểm khi list reorder vì index sẽ gán cho item mới, gây bug state/input bị nhầm. Phải dùng unique ID từ data."
  },
  {
    id: 941,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Lazy loading & code splitting trong React. Khi nào cần? Cách implement?",
    a: "Lazy loading dùng React.lazy() + Suspense để load component khi cần, giảm bundle size. Ví dụ: const Dashboard = lazy(() => import('./Dashboard')). Useful cho route components hoặc heavy modal. Trade-off: loading delay vs smaller initial bundle."
  },
  {
    id: 942,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Cách optimize infinite scroll list. Giải thích virtual scrolling concept.",
    a: "Virtual scrolling: chỉ render items visible trong viewport, xóa items ngoài viewport khỏi DOM. Dùng react-window hoặc react-virtual. Lợi ích: handle 10k items smooth, memory efficient. Trade-off: phức tạp hơn, khó styling."
  },
  {
    id: 943,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Explain React.memo() & memo() hook. Khi nào nên dùng?",
    a: "React.memo() bao component functional để skip re-render nếu props không đổi. Dùng memo khi: child component đắt, parent re-render thường xuyên, props stable. Cẩn thận: props so sánh shallow, nên paired với useCallback/useMemo."
  },

  // JS Tricky - Closures & Scope
  {
    id: 944,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Giải thích closure trong JavaScript. Viết code để minh họa closure problem trong loop.",
    a: "Closure: inner function access outer scope variables. Problem: var i trong loop - tất cả closure share i value, i=3 khi callback execute. Giải pháp: dùng let (block scope) hoặc IIFE. Quan trọng trong React: dependency array giống closure concept."
  },
  {
    id: 945,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "this binding trong JavaScript có bao nhiêu cách? Arrow function vs regular function?",
    a: "5 cách: default (global), implicit (object method), explicit (call/apply/bind), new (constructor), arrow (lexical). Arrow function không có this riêng, dùng outer this. Regular function có dynamic this. Trong React class component: phải bind method hoặc dùng arrow function."
  },
  {
    id: 946,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Hoisting trong JavaScript. var vs let vs const về hoisting?",
    a: "var hoisting: khai báo lên top nhưng undefined. let/const hoisting: TDZ (temporal dead zone) - không accessible trước khi khai báo. var scoped function level, let/const scoped block level. Best practice: dùng const mặc định, let khi cần reassign."
  },
  {
    id: 947,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Event bubbling vs event capturing. stopPropagation() vs preventDefault() khác gì?",
    a: "Bubbling: event propagate up (child -> parent). Capturing: down (parent -> child). stopPropagation() ngừng propagate event nhưng action vẫn execute. preventDefault() ngừng action mặc định (form submit, link navigation) nhưng propagate vẫn tiếp."
  },
  {
    id: 948,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Prototype inheritance trong JavaScript. Phân biệt constructor function vs class?",
    a: "Constructor function: function dùng new keyword. Class: syntactic sugar cho prototype, dễ đọc hơn. Cả 2 đều tạo instance + prototype chain. Class clear hơn, nhưng constructor function flexible hơn (functional programming pattern)."
  },

  // TypeScript Gotchas
  {
    id: 949,
    category: "FPT Software",
    subcategory: "TypeScript Gotchas",
    level: "intermediate",
    q: "Generic type trong TypeScript. Giải thích <T extends Base>?",
    a: "Generic: reusable type variable. <T extends Base> = T phải extends Base (inheritance/compatibility). Ví dụ: <T extends {name: string}> = T phải có property name. Useful cho API wrapper, utility functions, generic component props."
  },
  {
    id: 950,
    category: "FPT Software",
    subcategory: "TypeScript Gotchas",
    level: "intermediate",
    q: "Utility types trong TypeScript: Pick vs Omit vs Partial. Khi nào dùng?",
    a: "Pick<T, Keys>: lấy subset properties. Omit<T, Keys>: bỏ subset properties. Partial<T>: tất cả properties optional. Record<Keys, Value>: map keys to value type. Dùng khi cần derived types từ base type, giảm type duplication."
  },
  {
    id: 951,
    category: "FPT Software",
    subcategory: "TypeScript Gotchas",
    level: "intermediate",
    q: "Type vs Interface trong TypeScript. Khi nào dùng cái nào?",
    a: "Interface: object shape, extensible, reopenable. Type: bất kỳ data type (union, tuple, etc), không reopen. Trong React: dùng Interface cho component props, Type cho union/utility types. Modern TS: dùng Interface khi cần extend, Type khi cần union/generic."
  },
  {
    id: 952,
    category: "FPT Software",
    subcategory: "TypeScript Gotchas",
    level: "intermediate",
    q: "as const vs assertion types. Difference giữa string vs Literal type?",
    a: "as const: tất cả properties readonly, string/number/boolean trở literal type. string type: 'hello' | 'world' | any string. Literal: 'hello' chỉ. Useful: preventing mutation, type-safe string constants, narrowing type inference."
  },
  {
    id: 953,
    category: "FPT Software",
    subcategory: "TypeScript Gotchas",
    level: "intermediate",
    q: "Discriminated Union trong TypeScript. Cách implement type-safe reducer?",
    a: "Discriminated Union: union type có common field (discriminator) để type narrow. Ví dụ: type Action = {type: 'ADD'} | {type: 'DELETE'}. Pattern match trên action.type để get payload type. Safer than checking multiple properties, commonly dùng trong reducer, state machine."
  },

  // CSS Layout
  {
    id: 954,
    category: "FPT Software",
    subcategory: "CSS Layout",
    level: "intermediate",
    q: "Flexbox vs Grid. Khi nào dùng cái nào? Tại sao?",
    a: "Flexbox: 1 chiều (row/col), distribute items dọc theo axis. Grid: 2 chiều, explicit grid structure. Dùng Flexbox: navigation, list items, simple alignment. Grid: page layout, complex 2D structure. Combo: Grid cho main layout, Flexbox cho component."
  },
  {
    id: 955,
    category: "FPT Software",
    subcategory: "CSS Layout",
    level: "intermediate",
    q: "BFC (Block Formatting Context) là gì? Cách trigger BFC?",
    a: "BFC: independent layout block, không affect parent/sibling layout. Trigger: overflow: auto/hidden, display: flex/grid, position: absolute, float: left/right. Useful: collapse margin fix, clear float, contain float element."
  },
  {
    id: 956,
    category: "FPT Software",
    subcategory: "CSS Layout",
    level: "intermediate",
    q: "Margin collapsing trong CSS. Tại sao margin: 20px cộng với margin: 30px không bằng 50px?",
    a: "Vertical margin collapse: adjacent block-level elements, lớn hơn lấy. Horizontal margin tidak collapse. Trigger BFC để prevent collapse. Thực tế: dùng padding alternative hoặc flexbox (margin không collapse trong flex)."
  },
  {
    id: 957,
    category: "FPT Software",
    subcategory: "CSS Layout",
    level: "intermediate",
    q: "CSS Grid template areas. Làm sao layout dashboard responsive mà không thay đổi HTML?",
    a: "CSS Grid template-areas: semantic grid layout. Define named area, assign element = {grid-area: areaName}. Responsive: dùng @media để change grid-template-areas. Advantage: layout change chỉ CSS, HTML stay same, maintainable."
  },
  {
    id: 958,
    category: "FPT Software",
    subcategory: "CSS Layout",
    level: "intermediate",
    q: "Stacking context trong CSS. Tại sao z-index không work?",
    a: "Stacking context: element tạo local z-index hierarchy. Trigger: position + z-index, opacity < 1, transform, filter, etc. Problem: z-index compare chỉ trong same context. Solution: adjust stacking context parent hoặc reorder HTML."
  },

  // Node.js Thực Tế
  {
    id: 959,
    category: "FPT Software",
    subcategory: "Node.js Thực Tế",
    level: "intermediate",
    q: "Node.js single-threaded. Tại sao vẫn handle multiple request? Event loop explain.",
    a: "Node.js JS single-threaded, nhưng libuv threadpool handle I/O async. Event loop: call stack empty -> check microtask queue -> check callback queue. Non-blocking I/O: file read/HTTP request không block other request. CPU-heavy: cần worker threads."
  },
  {
    id: 960,
    category: "FPT Software",
    subcategory: "Node.js Thực Tế",
    level: "intermediate",
    q: "Callback vs Promise vs async/await. Cách handle error trong mỗi?",
    a: "Callback: nested callback hell, hard error handle. Promise: .catch() handle error. Async/await: try/catch, cleaner syntax. Khuyến cáo: dùng async/await, middleware error handler trong Express. Promise.all() vs Promise.allSettled() khi cần parallel requests."
  },
  {
    id: 961,
    category: "FPT Software",
    subcategory: "Node.js Thực Tế",
    level: "intermediate",
    q: "Middleware trong Express. Explain order, next() function, error handling middleware.",
    a: "Middleware: function receive (req, res, next). Order matter: request follow middleware chain. next() gọi middleware kế tiếp. Error handling: 4 parameter (err, req, res, next) phải ở cuối. Best practice: logger -> auth -> route handler -> error."
  },
  {
    id: 962,
    category: "FPT Software",
    subcategory: "Node.js Thực Tế",
    level: "intermediate",
    q: "Cách secure Node.js API. CORS, rate limiting, input validation?",
    a: "CORS: enable cross-origin request specific domain. Rate limiting: prevent brute force, dùng helmet + express-rate-limit. Input validation: sanitize user input, validate schema (joi/zod). Authentication: JWT token. Authorization: role-based access."
  },
  {
    id: 963,
    category: "FPT Software",
    subcategory: "Node.js Thực Tế",
    level: "intermediate",
    q: "Environment variable trong Node.js. Tại sao cần? .env file?",
    a: "Environment variable: config khác theo environment (dev/prod). .env file: local development secret. dotenv package load .env. Never commit .env, dùng .env.example. Production: environment variable từ hosting platform."
  },

  // Coding Live / Algorithm
  {
    id: 964,
    category: "FPT Software",
    subcategory: "Coding Live",
    level: "intermediate",
    q: "Implement debounce function. Giải thích use case trong React input search.",
    a: "Debounce: delay function execute until stop calling. Code: return function cancel previous timeout, set new timeout. Use case: search input (prevent API call mỗi keystroke), window resize. React: dùng useCallback + useRef để track timeout."
  },
  {
    id: 965,
    category: "FPT Software",
    subcategory: "Coding Live",
    level: "intermediate",
    q: "Implement throttle function. Khi nào cần throttle vs debounce?",
    a: "Throttle: execute function max once per interval. Debounce: delay until stop calling. Throttle: scroll event, mouse move (need frequent update). Debounce: search input, form validation (need final result). Combination: scroll lazy load = debounce + throttle."
  },
  {
    id: 966,
    category: "FPT Software",
    subcategory: "Coding Live",
    level: "intermediate",
    q: "FizzBuzz coding challenge. Viết code, optimize, handle edge case.",
    a: "Basic: loop 1-n, check divisible 3/5. Optimize: math modulo, string concatenation efficient. Edge: n=0, negative, large number performance. Real-world mapping: switch based on remainder, functional approach map/filter."
  },
  {
    id: 967,
    category: "FPT Software",
    subcategory: "Coding Live",
    level: "intermediate",
    q: "Implement simple LRU cache. Explain HashMap + LinkedList data structure.",
    a: "LRU: Least Recently Used evict. HashMap: O(1) access. LinkedList: maintain order. Put: check exist (remove + add), add new. Get: move to end. Size > capacity: remove head. Useful: API response caching, memoization, database query cache."
  },
  {
    id: 968,
    category: "FPT Software",
    subcategory: "Coding Live",
    level: "intermediate",
    q: "Flatten nested array (different depth). Recursive vs iterative approach?",
    a: "Recursive: simple code, call self nếu array. Iterative: stack-based, avoid stack overflow. Built-in: flat(Infinity). Performance: iterative better large array. Use case: tree structure traverse, config deep merge."
  },

  // Project Experience
  {
    id: 969,
    category: "FPT Software",
    subcategory: "Project Experience",
    level: "intermediate",
    q: "Giải thích project gần nhất. Tech stack, role, challenge gặp?",
    a: "Chuẩn bị: project type, timeline, team size, responsibility. Challenge: technical (performance, architecture), soft skill (deadline, communication). Solution: cách problem-solving, lesson learned. Quantify: impact (performance improve %, user growth), achievement."
  },
  {
    id: 970,
    category: "FPT Software",
    subcategory: "Project Experience",
    level: "intermediate",
    q: "Khi nào chọn React vs Vue vs Angular? Trade-off?",
    a: "React: large ecosystem, flexible, facebook backing. Vue: easy learn, performant, smaller bundle. Angular: full-featured, TypeScript native, steep learning. Trade-off: React ecosystem > learning curve, Vue simple > ecosystem. Project: React large app, Vue small-medium, Angular enterprise."
  },
  {
    id: 971,
    category: "FPT Software",
    subcategory: "Project Experience",
    level: "intermediate",
    q: "Cách collaborate với designer/backend. Version control, code review process?",
    a: "Design: tool (Figma), pixel-perfect implement vs responsive design balance. Backend: API contract (OpenAPI), mock endpoint early development. Git: feature branch, PR review, squash commit, semantic message. CI/CD: test before merge, auto deploy."
  },
  {
    id: 972,
    category: "FPT Software",
    subcategory: "Project Experience",
    level: "intermediate",
    q: "Refactoring legacy code. Approach, how avoid breaking existing feature?",
    a: "Strategy: add test first (coverage), small incremental change, code review frequently. Avoid: big bang rewrite. Tool: automated refactoring, linter, TypeScript migration. Communication: inform team, document change, rollback plan."
  },
  {
    id: 973,
    category: "FPT Software",
    subcategory: "Project Experience",
    level: "intermediate",
    q: "API design từ frontend perspective. RESTful vs GraphQL?",
    a: "RESTful: simple, cache-friendly, multiple endpoint. GraphQL: flexible query, single endpoint, over-fetching solution. Frontend: GraphQL reduce API call, bundle size trade-off. Choice: simple CRUD = REST, complex query pattern = GraphQL."
  },

  // Kiến Thức Tổng Hợp
  {
    id: 974,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "Module bundler: webpack vs Vite. Tại sao Vite nhanh hơn?",
    a: "Webpack: bundle everything, slow startup, ngay cả development. Vite: ES module native browser, serve unbundled code dev, esbuild fast. Trade-off: Vite newer (ecosystem smaller), webpack mature. Modern project: Vite better, legacy: webpack stable."
  },
  {
    id: 975,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "Testing strategy. Unit vs integration vs E2E. Pyramid?",
    a: "Test pyramid: unit (많이, fast), integration (중간), E2E (조금, slow). Jest: unit test. Testing library: component test. Cypress/Playwright: E2E. Strategy: mỗi layer đủ coverage, E2E critical path, unit fast feedback. TDD: test-driven development."
  },
  {
    id: 976,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "Security concern trong frontend. XSS, CSRF, Content Security Policy?",
    a: "XSS: inject script vào HTML, prevent = sanitize input, React auto-escape. CSRF: cross-site request, prevent = token validation. CSP: header restrict resource load, prevent inline script. HTTPS, SameSite cookie, environment variable secret."
  },
  {
    id: 977,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "Web performance metric. LCP, FID, CLS, TTFB explain.",
    a: "LCP: largest contentful paint (visual ready). FID: first input delay (interactivity). CLS: cumulative layout shift (stability). TTFB: time to first byte (server response). Optimize: image lazy load, code split, minify, cache, CDN, server optimization."
  },
  {
    id: 978,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "State management: Redux vs Zustand vs Context. Khi nào dùng?",
    a: "Redux: powerful, verbose, large app. Zustand: minimal, simple syntax. Context: simple local state, prevent prop drilling. Choice: small app = Context, medium = Zustand, large complex = Redux. Trend: Zustand + Context growing, Redux more legacy."
  },
  {
    id: 979,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "Browser rendering pipeline. Critical rendering path?",
    a: "Pipeline: HTML parse -> DOM tree, CSS parse -> CSSOM tree, combine -> render tree, layout -> paint -> composite. Critical path: CSS/JS block render. Optimize: defer JS, critical CSS inline, async script. DevTools: coverage identify unused code."
  },
  {
    id: 980,
    category: "FPT Software",
    subcategory: "Kiến Thức Tổng Hợp",
    level: "intermediate",
    q: "Microservices vs monolith frontend architecture. Federated module?",
    a: "Monolith: single frontend repo, scale hard, deploy all feature. Microservices frontend: separate team deploy. Federated module (webpack): share runtime dependency, independent deployment. Trade-off: complexity vs autonomy, useful large org."
  },

  // React Thực Chiến - Advanced Patterns
  {
    id: 981,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Custom Hook pattern. Viết custom hook để manage form state. Testing?",
    a: "Custom Hook: reusable logic extraction từ component. Hook: useForm(initial) return {values, handleChange, reset}. Testing: renderHook từ testing library, test hook behavior directly. Extract complexity từ component, improve testability, reusable logic."
  },
  {
    id: 982,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Error boundary trong React. Cách implement, use case?",
    a: "Error boundary: catch child component error, prevent white screen. Class component + componentDidCatch. Tidak catch: async error, event handler error, server-side rendering. Fallback UI: error message, retry button. Use case: critical component isolation."
  },
  {
    id: 983,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Compound component pattern. Tại sao hữu ích? Implement example?",
    a: "Compound: parent control internal state, child access qua context. Ví dụ: Tabs wrapper + Tab item, Dropdown + Item. Benefit: flexible API, easier maintain, prop explosion avoid. Pattern: React.cloneElement, context, controlled component."
  },
  {
    id: 984,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Render prop vs HOC pattern. Modern React dùng gì?",
    a: "Render prop: component receive function child render. HOC: function wrap component return new component. Modern: Hook better (no wrapper hell, direct logic composition). Render prop/HOC still useful (existing lib), but Hook cleaner."
  },
  {
    id: 985,
    category: "FPT Software",
    subcategory: "React Thực Chiến",
    level: "intermediate",
    q: "Suspense trong React. Fallback, error boundary, data fetching?",
    a: "Suspense: pause render, show fallback until component ready. Use: lazy component, data fetch (future). Combine: error boundary catch Suspense error. Limitation: data fetch need experimental feature. Framework: Next.js, Remix support server data loading."
  },

  // JS Tricky - Advanced
  {
    id: 986,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "WeakMap vs Map trong JavaScript. Memory leak impact?",
    a: "WeakMap: key object only, weak reference (GC if no other ref). Map: any key, strong reference. WeakMap: prevent memory leak khi store data associated object. Use case: private data, DOM node metadata, cache manager. Limitation: not enumerable."
  },
  {
    id: 987,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Symbol dalam JavaScript. Khi nào dùng? Built-in symbol?",
    a: "Symbol: primitive unique value. Use: private property, well-known symbol (Symbol.iterator). Built-in: Symbol.hasInstance, Symbol.toStringTag. Benefit: no name collision, intentional private (pseudo-private). Modern: rarely use, more educational."
  },
  {
    id: 988,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Proxy dan Reflect trong JavaScript. Intercepting operation?",
    a: "Proxy: intercept object operation (get, set, delete, etc). Reflect: meta-operation perform. Use: validation, logging, computed property, lazy init. Framework: Vue reactivity dùng Proxy. Limitation: performance cost, debugging harder."
  },
  {
    id: 989,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Microtask vs Macrotask dalam event loop. Promise.then priority?",
    a: "Microtask: Promise.then, async, queueMicrotask. Macrotask: setTimeout, setInterval, I/O. Priority: call stack -> microtask queue (all) -> macrotask (one) -> microtask. Promise always before setTimeout. Debugging: setTimeout inside Promise = after all promises execute."
  },
  {
    id: 990,
    category: "FPT Software",
    subcategory: "JS Tricky",
    level: "intermediate",
    q: "Array method efficiency. map vs forEach vs reduce performance?",
    a: "forEach: iterate, not return new array. map: return new array, allocate memory. reduce: accumulate value, flexible. Performance: forEach fast (no allocation), map slower (array allocation). Choose: iterate = forEach, transform = map, accumulate = reduce."
  }
]
