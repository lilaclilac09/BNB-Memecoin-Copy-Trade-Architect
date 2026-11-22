# Acceptance audit — 2026-11-22

Checked PR #1 and the existing Vite monitor and configuration demo against [ACCEPTANCE.md](../ACCEPTANCE.md). The merged PR that added the acceptance workflow passes its own evidence check.

| # | Failing item | Source rule | Resolution |
|---|---|---|---|
| 1 | README did not state status or a next action | §5, `ship-visible-mvp.mdc` — “LIVE / BLOCKED / LOCAL ONLY + next human action” | Added LOCAL ONLY plus the demo launch command. |
| 2 | Vite root was empty because index.html did not load the existing React entry point | §2, `verification.mdc` — test the specific flow and point to artifacts | Loaded index.tsx; built and exercised the existing navigation locally. |
| 3 | ‘Status: Connected’, ‘Node Sync: Mainnet’, ‘Live’ and hard-coded monitor metrics implied a live trading system | §5, `ship-visible-mvp.mdc` — “Demo ≠ product” | Labeled the simulation, disconnected node and sample metrics without adding trading. |
| 4 | Existing monitor had no mobile still or interaction artifact | §4, `ui-step-screenshot.mdc` — 390×844 plus interaction proof | Supplied a 390×844 still and monitor/config navigation walkthrough. |

**Checks:** `npm run build` → `✓ built in 5.82s`; `npx --no-install tsc --noEmit` exited 0.

**Manual QA:** Chromium 390×844: confirmed simulation labels in monitor, navigated to Bot Config and back; the existing wide layout clips the configuration text at this viewport.

**Limitations:** No production deployment verified; no node, wallet or trade execution is connected. Gemini and CoinGecko were not verified; screenshots show the existing wide shell, not a responsive redesign.

**Status: LOCAL ONLY** — run `npm run dev` to try the configuration demo.
