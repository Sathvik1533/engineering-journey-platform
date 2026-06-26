# PERDS: The Engineering Philosophy

**Philosophy · Execution · Review · Development · Standards**

---

## Overview

PERDS is the philosophical and operational framework that governs the entire Engineering Journey Platform. It represents the five core dimensions that transform consistent practice into lasting engineering capability.

---

## P — Philosophy

### The Five Engineering Laws

These laws hold at every stage — from buffer period through professional growth:

#### 1. Comfortable Implementation is the Only Gate
- Understanding without building is theoretical knowledge, not engineering capability
- Every concept must be proven through working code before advancing
- The benchmark: "Could I rebuild this from scratch in an interview without AI?"

#### 2. Every Technology Must Unlock Something
- No learning for learning's sake
- Each new tool, framework, or pattern must enable a capability you could not achieve before
- Clear answer required: "What can I now build that I couldn't build before?"

#### 3. Build Before Moving Forward
- Passive consumption (tutorials, videos, reading) produces recognition, not recall
- Active implementation produces muscle memory and genuine understanding
- Every week must produce committed, working code

#### 4. AI is a Reviewer, Not the Developer
**Stage-Based AI Usage Protocol:**
- **Stage 1 (Buffer):** AI explains concepts only. You write ALL code manually.
- **Stage 2 (Month 1-2):** AI explains and provides hints when stuck. You attempt independently first.
- **Stage 3 (Month 3-4):** AI reviews your code AFTER you've built it. You drive all decisions.
- **Stage 4 (Month 5+):** AI pair-programs where appropriate. You understand every line before accepting.
- **Stage 5 (Professional):** AI accelerates where you choose. Never for concepts tested in interviews.

#### 5. Consistency Over Intensity
- 3-4 focused hours daily beats 12-hour weekend marathons
- Engineering skill compounds through daily practice, not sporadic bursts
- The habit matters more than any single session
- Gaps longer than 3 days require catch-up sessions

---

## E — Execution

### Daily Structure

#### Regular College Day (3-4 hours)
```
Session 1 (90 min): Main track content
Break (15 min)
Session 2 (90 min): Implementation + practice
Session 3 (30-45 min): Review + commit + GitHub
```

#### Weekend (5-6 hours)
```
Morning (2-3 hours): Project work + mini builds
Afternoon (2-3 hours): DSA practice + integration work
Evening (1 hour): Weekly review + planning
```

#### Exam Week (1-2 hours maximum)
```
DSA maintenance (45 min): Never skip — momentum is expensive to rebuild
Light review (30 min): Re-read one past week's notes
GitHub streak (15 min): One small commit to maintain consistency
```

### Priority Rules During Conflicts

| Situation | Priority Order |
|-----------|----------------|
| Normal week | Main Track → DSA → Projects → GitHub → Communication |
| Exam week | College Academics → DSA maintenance → Light review |
| CRT active | CRT → DSA → Main Track → Projects |
| Placement season | Mock Interviews → DSA → Resume → Projects |

### The Non-Negotiables

✅ **Daily Practice:** Miss one day, catch up within 48 hours  
✅ **Exit Criteria:** Never advance without completing assessment  
✅ **Project Commits:** Every build must reach GitHub with meaningful commits  
✅ **Testing Habit:** From Month 3 onward, production code includes tests  
✅ **Documentation:** Every project has architecture README before considered complete

---

## R — Review

### Weekly Review Protocol

Every Sunday evening (30-45 minutes):

1. **Capability Assessment:**
   - What can I now build that I couldn't build 7 days ago?
   - Which exit criteria did I complete this week?
   - Are there any gaps requiring additional practice?

2. **Portfolio Check:**
   - How many meaningful commits this week?
   - Is any project in half-finished state requiring closure?
   - Are README files up to date?

3. **Communication Audit:**
   - Did I explain one technical concept clearly this week?
   - Are commit messages descriptive and professional?
   - Is LinkedIn/GitHub reflecting current capability?

4. **Next Week Planning:**
   - What are the 3 most important outcomes for next week?
   - Which exit criteria am I targeting?
   - Are there any known blockers to address proactively?

### Monthly Milestone Review

End of each month (60-90 minutes):

1. **Re-read the month overview** from the volume document
2. **Complete the month exit criteria** assessment
3. **Review every project** built during the month
4. **Update resume and LinkedIn** with new skills and projects
5. **Identify the hardest concept** mastered and document the breakthrough moment
6. **Plan the coming month** with specific capability targets

---

## D — Development

### The Build-First Principle

Every learning session follows this structure:

```
1. Read/Watch (15-20%): Understand the concept
2. Attempt (60-70%): Implement without looking at solutions
3. Review (10-15%): Compare approach with reference, identify gaps
4. Refine (5-10%): Improve implementation based on learning
```

### Project Quality Standards

#### Minimum Viable Project (Mini Builds)
- Solves one clear problem
- Working code committed to GitHub
- Basic README explaining what it does
- No placeholder TODOs in committed code

#### Portfolio-Quality Project
- Solves a real problem with complete feature set
- Comprehensive README with architecture section
- Test coverage (70%+ for backend, component tests for frontend)
- Live URL (deployed and accessible)
- CI/CD pipeline configured
- Professional commit history (not "final final v3")

### Learning Velocity Indicators

You are learning at the right pace when:
- ✅ You can explain yesterday's concept without reference
- ✅ You complete mini builds in one or two sessions, not one week
- ✅ You recognize patterns across different implementations
- ✅ You debug faster this week than last week
- ✅ You ask fewer clarifying questions because you predict the answers

You are learning too fast when:
- ⚠️ You advance without completing exit criteria
- ⚠️ You cannot rebuild yesterday's code without reference
- ⚠️ You rely on AI for concepts that should be muscle memory
- ⚠️ You cannot explain your own project architecture

---

## S — Standards

### Code Quality Standards

#### All Code (Any Language)
- Meaningful variable and function names (no `x`, `temp`, `data` without context)
- One function does one thing — if description needs "and", it's two functions
- Comments explain WHY, not WHAT (code explains what)
- No commented-out code in commits
- No hardcoded secrets, API keys, or environment-specific values

#### Python
- Type hints on function signatures
- Docstrings for public functions and classes
- PEP 8 compliance (enforced with `ruff` or `black`)
- pytest tests for business logic
- Virtual environment for every project

#### JavaScript/TypeScript
- TypeScript strict mode enabled (no `any` without justification)
- ESLint + Prettier configured and passing
- Async/await over raw promises
- PropTypes or TypeScript interfaces for React components
- Jest/Vitest tests for utilities and hooks

#### SQL
- Uppercase keywords (SELECT, FROM, WHERE)
- Meaningful table and column names
- Indexes on foreign keys and frequent filter columns
- No SELECT * in production code
- Migrations for every schema change (never manual ALTER)

### Git and GitHub Standards

#### Commit Messages
```
Good: "Add JWT authentication to user endpoints"
Good: "Resolve N+1 query in document retrieval loop"
Good: "Fix: handle empty array edge case in pagination"

Bad: "update"
Bad: "fixes"
Bad: "final version"
```

#### Branch Strategy
- `main` is always deployable
- Feature branches: `feature/add-authentication`
- Bug fix branches: `fix/pagination-edge-case`
- Never commit directly to `main` after Month 3

#### Pull Request Standard
- Title: Clear one-sentence summary
- Description: What, Why, How, Testing
- Self-review before requesting review from others
- All CI checks passing before merge

### Professional Communication Standards

#### Technical Writing
- One idea per paragraph
- Active voice preferred ("The function validates..." not "Validation is performed...")
- Assume the reader is technical but unfamiliar with your specific implementation
- Examples included for complex concepts

#### Code Review Comments
- Specific, not vague: "This loop creates an N+1 query" not "This might be slow"
- Constructive: Suggest an alternative, not just criticism
- Prioritized: Label as "blocking", "suggestion", or "nitpick"
- Respectful: Focus on code, not person

#### Interview Communication
- Structure answers: Situation → Task → Action → Result (STAR)
- Quantify outcomes where possible ("improved latency from 500ms to 50ms")
- Admit knowledge gaps honestly ("I haven't implemented this pattern, but based on X...")
- Ask clarifying questions before diving into solutions

---

## Assessment Framework

### Exit Criteria Philosophy

Exit criteria exist to prevent premature advancement. They are not arbitrary — they map to real interview questions, production requirements, and professional standards.

#### How to Use Exit Criteria
1. **Read the criteria** before starting the week/month
2. **Self-assess honestly** at the end — no shortcuts
3. **If any criterion fails**, spend additional days closing the gap
4. **Document the gap** in your engineering journal
5. **Re-assess** after targeted practice
6. **Advance only when ALL criteria pass**

#### Common Failure Patterns
- ❌ Marking something complete when it "mostly works"
- ❌ Advancing because the timeline says so, not because capability is proven
- ❌ Skipping the timed portion of coding assessments
- ❌ Self-assessing with notes when criteria says "without reference"

---

## Long-Term Sustainability

### Burnout Prevention

This is an 11-month intensive program. Burnout is a risk. These rules prevent it:

1. **One full rest day per week** (typically Sunday) — no roadmap work
2. **Sleep is non-negotiable** — 7+ hours minimum
3. **Exam weeks are light weeks** — academics take priority, roadmap maintenance only
4. **Progress is cumulative** — a bad day does not erase a good week
5. **The roadmap serves you** — adjust pacing if health, family, or well-being require it

### When to Pause

Pause the roadmap completely if:
- Sustained illness or injury requiring recovery
- Family emergency requiring full attention
- College academics in crisis (risk of failing a course)
- Mental health requiring professional support

Resume when the condition resolves. Capability is retained for 2-3 weeks. Momentum can be rebuilt.

---

## Philosophy in Practice

### Example: Buffer Period Day 5

**Without PERDS:**
- Watch 3 hours of Python OOP tutorials
- Feel productive
- Code nothing
- Advance to Day 6

**With PERDS:**
- Read OOP concepts (20 min)
- Implement a class-based program (90 min)
- Debug and refactor (30 min)
- Write tests (30 min)
- Commit with clear message (10 min)
- Self-assess exit criteria
- Advance only if pass

### Example: Month 3 React Week

**Without PERDS:**
- Copy component from tutorial
- It works
- Move to next topic
- Cannot rebuild from scratch in interview

**With PERDS:**
- Attempt component from scratch
- Get stuck on state management
- Read docs for specific gap
- Rebuild without looking
- Add to personal component library
- Explain architecture in README
- Pass exit criteria: rebuild in <15 min without reference

---

## Closing Philosophy

> **"The roadmap is a plan. The execution is yours."**

PERDS does not guarantee success — it provides the framework that makes success achievable through consistent, disciplined, honest execution.

The students who succeed are not the ones with the most time, the best resources, or the highest initial capability. They are the ones who:
- Show up daily
- Build before advancing
- Assess honestly
- Learn from every gap
- Communicate clearly
- Compound small wins over months

---

**Execute. Build. Review. Develop. Maintain Standards.**

*This is the engineering way.*
