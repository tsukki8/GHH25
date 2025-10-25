## Purpose
Help AI coding agents be productive in this small Category-based JS project (GHH25).

## Quick summary (big picture)
- Tiny frontend/data-model repository that models product categories via a simple `Category` class (`Category.js`).
- Category instances are created and registered in `CategoryTree.js` using a `register()` helper and assembled into `rootCategories` (the app-level roots: `Women`, `Men`).
- `Main.js` currently empty — treat it as the application entry point if new wiring is needed.

## Files to inspect first
- `Category.js` — defines Category(id, name, parentId) with `children` and `addChild(child)` which sets `child.parentId = this.id` and pushes into `children`.
- `CategoryTree.js` — shows how categories are created and registered. Example pattern: `women.addChild(register(new Category(11, "Dresses and Skirts")));`
- `README.md` — project metadata (no run scripts).

## Conventions & patterns the agent should follow
- Mutability: Categories are plain mutable objects. Use the existing `addChild` method to maintain `parentId` and `children` invariants rather than setting fields directly.
- Registration: The codebase relies on a `register(category)` helper which stores instances in a `categories` map for quick lookup. Keep `register()` usage when adding new categories so lookups remain consistent.
- Root export: `CategoryTree.js` provides `rootCategories` (array of top-level nodes). If you add exports or change module style, keep backward-compatible names (`rootCategories`, `categories`, `register`) unless the change is part of a deliberate refactor.

## Typical edits examples (copy-ready)
- Add a new Women subcategory "Hats":
  women.addChild(register(new Category(17, "Hats")));
- Query by id using the in-memory map: `const c = categories[17];`

## Build / run / test notes
- There is no build/test automation in the repo (no package.json, no test framework). Files are plain JS modules.
- Use `node` to run or experiment from `Main.js`. Example (local dev): create a small runner in `Main.js` that imports `CategoryTree.js` and logs `rootCategories` and the `categories` map.

## Safe changes and minimal refactors
- Prefer small edits: add helper functions in `CategoryTree.js` or `Main.js` to avoid changing the data model.
- If adding exports for Node/CommonJS or ES modules, ensure both the existing consumers and new code can import — the project is small so document the change in this file.

## What not to change without confirmation
- Do not change how `addChild()` sets `parentId` or how `register()` populates `categories` without an explicit test or migration; many code patterns rely on those side effects.
- Avoid renaming `rootCategories`, `categories`, or `register` unless you update every usage and note the change in the repo.

## When you need more context
- Ask the maintainers for intended runtime environment (browser vs Node) before turning files into ES modules or adding bundler config.
- If you plan to add tests or CI, ask whether they want Node-based unit tests (Jest/Mocha) or a browser test harness.

## Example next tasks an agent can help with
- Add a simple `Main.js` runner that logs the category tree and demonstrates lookups.
- Add a tiny README section showing how to run `Main.js` with Node.

If anything above is unclear or you want more detailed instructions (for example, converting to modules or adding tests/CI), tell me the preferred target (Node or browser) and I'll update this file accordingly.
