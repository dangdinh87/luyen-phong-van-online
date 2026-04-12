## 2024-04-12 - Added Keyboard Accessibility to Interactive Div
**Learning:** Found an accordion element (`.qa-question`) operating entirely through `onClick` without standard interactive attributes (`role="button"`, `tabIndex`).
**Action:** Always ensure that structural elements (like `div` or `span`) that act as buttons have explicit ARIA roles (`role="button"`), keyboard focus capability (`tabIndex={0}`), corresponding keyboard event handlers (`onKeyDown` for Enter/Space), and clear focus indicators (`:focus-visible` to hide default styles and show accessible focus ring).
