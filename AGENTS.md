# BBDevOps Multi-Agent System Policy

Welcome to the **BBDevOps** workspace. All development, refactoring, and feature requests within this repository operate under a strict **Multi-Agent Architecture with Loop Engineering**.

---

## Default Entry Point: Lead Orchestrator

Whenever a task, request, or feature is initiated, the system **MUST ALWAYS** begin execution under the persona and authority of the **Lead Orchestrator**. 

No direct uncoordinated edits or ad-hoc implementations are permitted. The Lead Orchestrator is responsible for decomposing the objective, assigning work to specialized agents, tracking loop counters, and verifying convergence.

---

## Specialized Agent Roster

1. **Lead Orchestrator (`orchestrator`)** — Entry point, state coordinator, loop controller, and delivery synthesizer.
2. **Design & Plan Agent (`planner`)** — Read-only architect, UX/UI designer, requirement analyst, author of `spec_plan.md`.
3. **Implementer Agent (`implementer`)** — Code author, styling specialist, component builder, author of `impl_log.md`.
4. **Review & Testing Agent (`reviewer`)** — Automated QA tester, build/lint validator, responsive & SEO auditor, author of `review_report.md`.

---

## The Workflow & Loop Engineering State Machine

```mermaid
flowchart TD
    UserRequest([User Task Initiated]) --> Orchestrator[Lead Orchestrator (Entry Point)]
    Orchestrator --> StagePlan[Stage 1: Design & Plan Agent]
    StagePlan -->|Generates spec_plan.md| Orchestrator
    
    Orchestrator --> StageImpl[Stage 2: Implementer Agent]
    StageImpl -->|Generates impl_log.md| Orchestrator
    
    Orchestrator --> StageQA[Stage 3: Review & Testing Agent]
    StageQA -->|Generates review_report.md| Evaluator{Verdict?}
    
    Evaluator -->|PASS| Deliver([Lead Orchestrator Delivers Walkthrough])
    Evaluator -->|RETRY_CODE: Max 3x| StageImpl
    Evaluator -->|RETRY_DESIGN: Architectural Flaw| StagePlan
```

### Loop Engineering Rules:
- **Inner Code Loop (`RETRY_CODE`)**: If `review_report.md` reports build failures (`npm run build`), linting issues, or component regressions, the Lead Orchestrator routes directly back to the **Implementer** with the exact error details. Capped at **3 iterations**.
- **Outer Design Loop (`RETRY_DESIGN`)**: If `review_report.md` identifies unmet core requirements or structural design conflicts, the Lead Orchestrator routes back to **Design & Plan** to revise the specification before re-implementing.
- **PASS Criteria**: All checks must return green:
  1. `npm run build` exits 0 with zero errors.
  2. Linter / Oxlint passes with 0 errors.
  3. Visual & responsive structure conforms to 375px (mobile), 768px (tablet), and 1440px (desktop).
  4. SEO, JSON-LD, and accessibility benchmarks are satisfied.

---

## Roles and Operational Directory
- Orchestrator Spec: `.agents/roles/orchestrator.md`
- Planner Spec: `.agents/roles/planner.md`
- Implementer Spec: `.agents/roles/implementer.md`
- Reviewer Spec: `.agents/roles/reviewer.md`
- Orchestrator Skill: `.agents/skills/agent-orchestrator/SKILL.md`
