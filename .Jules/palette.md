## 2024-05-20 - Missing ARIA labels on Icon-Only Buttons
**Learning:** Found an accessibility pattern where icon-only buttons (like the hamburger menu button in the hero section) rely purely on `title` attributes instead of proper `aria-label`s. In addition, interactive toggle elements missed `aria-expanded` attributes which are crucial for screen reader users to understand the component's state.
**Action:** When adding or auditing icon-only buttons in the application, ensure `aria-label` is always set (using appropriate localization) and any stateful toggles implement the relevant ARIA attributes (e.g. `aria-expanded`).

## 2024-04-18 - Add `aria-pressed` for toggle states
**Learning:** We added `aria-pressed` attributes to toggle buttons (like Bookmark/Learned) and settings chips that behave as radio/toggle options in custom UI components. This explicitly conveys the `active`/`pressed` state of interactive elements for screen readers. It's a critical pattern to follow when substituting native inputs with custom-styled buttons.
**Action:** Always add `aria-pressed` or `aria-expanded` attributes on interactive toggle/radio elements (like custom settings chips and action toggles) to programmatically communicate their state.
