# Work Custody
Lightweight Markdown-based custody structure for delegated agent work. Makes work authorized, evidence-bearing, resumable, and reviewable.

## File Purpose
| File | Purpose |
|------|---------|
| `WORK_ORDER.md` | Defines authorized scope, objective, and required verification for a task |
| `SEMANTIC_CONTRACT.md` | Defines success criteria and "done" state for the task |
| `PARKING_LOT.md` | Adjacent findings discovered during work that are out of scope |
| `UNKNOWNS.md` | Unresolved uncertainty, risks, or open questions from the work |
| `VERIFICATION.md` | Command-level evidence of testing, linting, and validation |
| `HANDOFF.md` | State to resume work if interrupted, or hand off to another agent/reviewer |
| `READINESS.md` | Checklist to determine if work is ready for human review |
| `DIFF_AUDIT.md` | (Code repos only) Audit of changed files against authorized scope |
| `RISK_REGISTER.md` | (Code repos only) Tracked risks from the work |

## Doctrine
All non-trivial delegated work must use this folder. Agents must read `WORK_ORDER.md` before acting, and update custody files as work progresses.