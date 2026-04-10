## 2024-05-10 - Add missing htmlFor and id in forms
**Learning:** Found multiple form inputs in `ContributeForm` that did not have an explicit `id` and whose corresponding `label`s were missing the `htmlFor` attribute.
**Action:** Always ensure that every form input component has an explicit `id` attribute matching the `htmlFor` on its label.
