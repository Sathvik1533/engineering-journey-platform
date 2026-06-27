"""
Knowledge Engine — The document parser and graph builder.

Parses all markdown documents in the docs/ directory and produces:
  - Structured TopicObjects with full educational metadata
  - A dependency graph (nodes + edges) generated from prerequisites
  - DAG layout coordinates for the visual roadmap
  - AI context strings for each topic

This is the single source of truth for all topic content.
No educational content should exist in React components.
"""

import os
import re
import json
import logging
from typing import Dict, List, Optional, Any
from pathlib import Path

try:
    import frontmatter
except ImportError:
    frontmatter = None  # graceful fallback

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# Types
# ─────────────────────────────────────────────────────────────────────────────

TopicObject = Dict[str, Any]
GraphNode = Dict[str, Any]
GraphEdge = Dict[str, str]

# ─────────────────────────────────────────────────────────────────────────────
# Global in-memory cache (refreshed on startup)
# ─────────────────────────────────────────────────────────────────────────────

_topics_cache: Dict[str, TopicObject] = {}
_graph_nodes_cache: List[GraphNode] = []
_graph_edges_cache: List[GraphEdge] = []
_initialized = False


# ─────────────────────────────────────────────────────────────────────────────
# Markdown Section Extractor
# ─────────────────────────────────────────────────────────────────────────────

def _extract_sections(content: str) -> Dict[str, str]:
    """
    Split a markdown document body into sections by ## headings.
    Returns a dict: { "section title (lowercased)": "section body text" }
    """
    sections: Dict[str, str] = {}
    # Split on ## headings (but not ### or deeper)
    parts = re.split(r'^## (.+)$', content, flags=re.MULTILINE)
    # parts = [preamble, heading1, body1, heading2, body2, ...]
    if len(parts) > 1:
        # preamble before first heading goes into "overview"
        sections["_preamble"] = parts[0].strip()
        for i in range(1, len(parts) - 1, 2):
            heading = parts[i].strip().lower()
            body = parts[i + 1].strip() if i + 1 < len(parts) else ""
            sections[heading] = body
    else:
        sections["_preamble"] = content.strip()
    return sections


def _section_to_list(text: str) -> List[str]:
    """Convert a markdown bullet list section into a Python list of strings."""
    lines = []
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("- ") or line.startswith("* "):
            lines.append(line[2:].strip())
        elif line.startswith("+ "):
            lines.append(line[2:].strip())
        elif re.match(r'^\d+\.\s', line):
            lines.append(re.sub(r'^\d+\.\s', '', line).strip())
        elif line and not line.startswith("#"):
            # plain paragraph item — include as-is if not empty
            lines.append(line)
    return [l for l in lines if l]


def _clean_text(text: str) -> str:
    """Strip excessive whitespace and markdown artifacts for plain text fields."""
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)  # bold
    text = re.sub(r'\*(.+?)\*', r'\1', text)        # italic
    text = re.sub(r'`(.+?)`', r'\1', text)          # inline code
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


# ─────────────────────────────────────────────────────────────────────────────
# Fallback: Build topics from the embedded curriculum manifest
# This ensures the engine works even without frontmatter in every doc.
# ─────────────────────────────────────────────────────────────────────────────

CURRICULUM_MANIFEST: List[Dict[str, Any]] = [
    # ── Vol 1: Buffer Period (11 days) ───────────────────────────────────────
    {
        "id": "phase-0", "title": "Phase 0: Python Core", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": [], "unlocks": ["week-1", "week-2"],
        "effort": "11 Days", "language": "python",
        "mission": "Anchor Python fundamentals. Rebuild the habit of writing code without assistance.",
        "why": "You have learned these concepts, but concepts fade without implementation. Before building on your foundation, you need to verify the foundation exists.",
        "relevance": "Every conditional you write becomes validation logic in FastAPI endpoints. The login validator is the beginning of authentication. These are simplified versions of production backend code.",
        "concepts": ["Variables & Data Types", "Operators & Logic", "Input/Output & f-strings", "Conditional Statements", "Loops: for, while, break, continue"],
        "subtopics": ["int, float, str, bool, None", "Truthy/falsy values", "Short-circuit evaluation", "Nested conditions"],
        "examples": "Temperature converter, Grade calculator, Simple calculator with division-by-zero handling",
        "practice": ["Write a function that returns only even numbers from a list", "Build a grade calculator with 5 grade boundaries", "Implement a prime checker without using any libraries"],
        "mini_build": "CLI Calculator with robust input validation. The program must loop until the user types 'exit'. Use functions — do not write everything in one block.",
        "assessment": "Cover your screen. On paper, write: (1) A function that takes a list of numbers and returns only the even ones. (2) A grade calculator function with 5 grade boundaries. If you can write both from memory — Phase 0 is complete.",
        "exit_criteria": ["Can write Python programs from scratch without AI assistance", "Can implement control flow and functions from memory", "CLI Calculator committed to GitHub"],
        "capability_gained": "Logical structure composition, variable scoping, and foundational OOP",
        "future_connections": "Unlocks FastAPI backend routing and Pydantic data validation",
        "related_projects": ["CLI Calculator", "CLI RPG Battle Simulator"],
        "resources": [{"name": "Python 3 Official Tutorial", "url": "https://docs.python.org/3/tutorial/"}, {"name": "Automate the Boring Stuff", "url": "https://automatetheboringstuff.com"}],
        "interview_questions": ["What is the difference between a list and a tuple in Python?", "Explain short-circuit evaluation", "What does it mean for a value to be falsy in Python?"],
        "reflection_prompts": ["What was the hardest program to write from memory?", "Which concept required the most re-reading?"],
        "revision_strategy": "Re-attempt the CLI Calculator from scratch in 30 minutes without any reference materials.",
        "code_template": "# Day 1 Python Foundations\n# Write all programs from scratch — no AI assistance\n\ndef temperature_converter(celsius):\n    \"\"\"Convert Celsius to Fahrenheit and Kelvin\"\"\"\n    # TODO: implement this\n    pass\n\ndef grade_calculator(marks):\n    \"\"\"Return letter grade for given marks (0-100)\"\"\"\n    # TODO: implement this\n    pass\n\n# Test your implementations\nprint(temperature_converter(100))\nprint(grade_calculator(85))\n"
    },
    {
        "id": "week-1", "title": "Week 1: Syntax & Loops", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-0"], "unlocks": ["week-2"],
        "effort": "6 Hours", "language": "python",
        "mission": "Rebuild core coding speed and syntax fluency without automatic code completions.",
        "why": "Python syntax fluency is the baseline for everything. Without it, every subsequent topic requires double the cognitive load.",
        "relevance": "Every conditional becomes FastAPI validation. Every loop becomes a data pipeline. These are not exercises — they are the core patterns of production code.",
        "concepts": ["Variables and data types", "Operators: arithmetic, comparison, logical", "Conditional statements: if/elif/else", "Loops: for and while", "Functions: definition, parameters, return values"],
        "subtopics": ["Scoping: local vs global", "Default parameters", "Multiple return values", "Nested loops", "break and continue"],
        "examples": "Temperature converter, Even/odd checker, Digit sum calculator",
        "practice": ["Write a temperature converter (Celsius → Fahrenheit and Kelvin)", "Build an even/odd checker with a prime check", "Implement a digit sum calculator", "Write a number reversal function without string tricks", "Build a vowel counter"],
        "mini_build": "CLI Calculator: Takes two numbers and an operator. Handles division by zero. Loops until user types 'exit'. Uses separate functions for each operation.",
        "assessment": "Write from memory in under 10 minutes: A function that takes a list of numbers and returns only the prime ones.",
        "exit_criteria": ["Can implement all five program types from memory", "Functions are properly separated (no single-block scripts)", "Code runs without SyntaxError on first attempt"],
        "capability_gained": "Basic logical structures and function composition",
        "future_connections": "Unlocks Week 2 data structures and OOP",
        "related_projects": ["Library Catalog CLI Search", "Recursive Factorial Solver"],
        "resources": [{"name": "Python 3.12 Control Flow Docs", "url": "https://docs.python.org/3/tutorial/controlflow.html"}, {"name": "Real Python: Python Basics", "url": "https://realpython.com/python-basics/"}],
        "interview_questions": ["Explain the difference between pass, break, and continue", "What happens when you call a function with the wrong number of arguments?", "Can you explain variable scope in Python?"],
        "reflection_prompts": ["Which loop pattern did you find most natural?", "How would you refactor a nested if-else into a cleaner structure?"],
        "revision_strategy": "Re-write the CLI Calculator in 20 minutes without any reference.",
        "code_template": "# Week 1: Python Syntax & Loops\n# No AI assistance. Write everything from scratch.\n\ndef is_prime(n):\n    \"\"\"Return True if n is a prime number\"\"\"\n    # TODO: implement without using any libraries\n    pass\n\ndef filter_primes(numbers):\n    \"\"\"Return only prime numbers from the list\"\"\"\n    # TODO: use is_prime above\n    pass\n\ndef cli_calculator():\n    \"\"\"Interactive calculator. Loops until user types 'exit'\"\"\"\n    # TODO: handle +, -, *, / and division by zero\n    pass\n\n# Test\nprint(filter_primes([2, 3, 4, 5, 10, 13, 17, 20]))\n"
    },
    {
        "id": "week-2", "title": "Week 2: Data Structures & OOP", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-1"], "unlocks": ["phase-1", "phase-2"],
        "effort": "10 Hours", "language": "python",
        "mission": "Master Python's built-in data structures and build your first multi-class object-oriented system.",
        "why": "Lists, dicts, and sets are how all backend data flows. OOP is how you organize every system you build from Month 2 onward.",
        "relevance": "Pydantic models in FastAPI are Python classes. SQLAlchemy ORM is pure OOP. Every data transformation you write uses these structures.",
        "concepts": ["Lists: indexing, slicing, methods", "Dictionaries: creation, access, iteration", "Sets: deduplication, intersection, union", "Tuples: immutability and use cases", "OOP: classes, constructors, methods, inheritance"],
        "subtopics": ["List comprehensions", "Dict comprehensions", "Nested data structures", "Encapsulation with __init__", "Inheritance and super()", "Async/await basics"],
        "examples": "Student gradebook class, Bank account system, Inventory manager with OOP",
        "practice": ["Build a Student class with grade management methods", "Implement a BankAccount with deposit/withdraw/balance", "Create an Inventory system with multiple product types using inheritance"],
        "mini_build": "OOP RPG Monster Battler: Multiple monster classes (Warrior, Mage, Archer) with inheritance, health points, attack/defense methods, and a battle loop.",
        "assessment": "From memory in under 45 minutes: Build a multi-class Library system with Book, Member, and Library classes. Library must support add_book, register_member, checkout_book, and return_book.",
        "exit_criteria": ["Can design and implement a multi-class system from memory", "Understands inheritance and when to use it", "OOP project committed to GitHub with README"],
        "capability_gained": "Multi-class OOP architecture and async cooperative multitasking",
        "future_connections": "Prerequisite for Phase 1 SQL databases and FastAPI Pydantic models",
        "related_projects": ["OOP RPG Monster Battler", "Async API Crawler"],
        "resources": [{"name": "Python OOP Tutorial", "url": "https://realpython.com/python3-object-oriented-programming/"}, {"name": "Python Data Structures Docs", "url": "https://docs.python.org/3/tutorial/datastructures.html"}],
        "interview_questions": ["Explain the four pillars of OOP with Python examples", "What is the difference between a class method and an instance method?", "When would you use a set instead of a list?"],
        "reflection_prompts": ["What was the hardest part of designing the class hierarchy?", "How did inheritance reduce code duplication?"],
        "revision_strategy": "Re-implement the BankAccount class from scratch in 15 minutes.",
        "code_template": "# Week 2: Data Structures & OOP\n\nclass Monster:\n    \"\"\"Base monster class\"\"\"\n    def __init__(self, name: str, hp: int, attack: int):\n        # TODO: implement\n        pass\n\n    def take_damage(self, damage: int) -> bool:\n        \"\"\"Returns True if monster is still alive\"\"\"\n        # TODO: implement\n        pass\n\n    def deal_damage(self) -> int:\n        \"\"\"Returns damage dealt\"\"\"\n        # TODO: implement\n        pass\n\nclass Warrior(Monster):\n    \"\"\"High HP, high attack, no special abilities\"\"\"\n    # TODO: implement with super()\n    pass\n\nclass Mage(Monster):\n    \"\"\"Low HP, double attack on even rounds\"\"\"\n    # TODO: implement\n    pass\n\ndef battle(m1: Monster, m2: Monster):\n    \"\"\"Run a battle loop, print each round\"\"\"\n    # TODO: implement\n    pass\n\n# Test\nbattle(Warrior('Thor', hp=100, attack=20), Mage('Gandalf', hp=60, attack=35))\n"
    },
    # ── Phase 1: SQL ──────────────────────────────────────────────────────────
    {
        "id": "phase-1", "title": "Phase 1: SQL Strengthening", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-2"], "unlocks": ["week-3"],
        "effort": "20-25 Hours", "language": "sql",
        "mission": "Transition from local program memory to relational persistent storage.",
        "why": "Every production application stores data. SQL is the language of data. Without SQL mastery, your backend cannot persist anything.",
        "relevance": "Every FastAPI endpoint you build will query a database. Every dashboard you build will aggregate data. SQL is the foundation.",
        "concepts": ["Relational model: tables, columns, rows", "Primary and foreign keys", "SQL: SELECT, INSERT, UPDATE, DELETE", "JOIN types: INNER, LEFT, RIGHT, FULL", "Aggregation: GROUP BY, HAVING, COUNT, SUM, AVG"],
        "subtopics": ["Schema normalization (1NF, 2NF, 3NF)", "Subqueries and CTEs", "Indexes and EXPLAIN ANALYZE", "Window functions: ROW_NUMBER, RANK, LEAD, LAG", "ACID transactions", "Constraints: NOT NULL, UNIQUE, CHECK, FK"],
        "examples": "University enrollment schema, E-commerce normalized database",
        "practice": ["Design a 5-table e-commerce schema from scratch", "Write a query returning the top 5 students by grade using window functions", "Implement a transaction that transfers money between accounts"],
        "mini_build": "Hospital Management Database: Complete schema with patients, doctors, appointments, and prescriptions. Includes complex analytical queries.",
        "assessment": "From memory in under 15 minutes: Write the SQL to find the top 3 customers by total spend using a window function (not GROUP BY + ORDER BY).",
        "exit_criteria": ["Can design normalized schemas from scratch", "Can write complex JOIN queries without reference", "Can explain EXPLAIN ANALYZE output"],
        "capability_gained": "Relational database schema normalization and analytical query design",
        "future_connections": "Required for FastAPI SQLAlchemy ORM mappings and database integrations",
        "related_projects": ["Normalized E-Commerce Schema", "Student Score Auditor"],
        "resources": [{"name": "PostgreSQL Official Docs", "url": "https://www.postgresql.org/docs/"}, {"name": "SQLZoo", "url": "https://sqlzoo.net/"}, {"name": "Mode SQL Tutorial", "url": "https://mode.com/sql-tutorial/"}],
        "interview_questions": ["What is the difference between WHERE and HAVING?", "Explain the difference between INNER JOIN and LEFT JOIN", "What is database normalization and why does it matter?"],
        "reflection_prompts": ["When would you denormalize for performance?", "What index strategy would you use for a slow query?"],
        "revision_strategy": "Re-write the Hospital schema ERD from memory on paper.",
        "code_template": "-- Phase 1: SQL Strengthening\n-- Write all queries without reference\n\n-- Create a normalized students table\nCREATE TABLE students (\n    -- TODO: add columns with constraints\n);\n\n-- Query: Top 3 students by average grade using window functions\nSELECT\n    -- TODO: write window function query\nFROM students\n    -- TODO: add joins\nWHERE\n    -- TODO: add filters\n;\n"
    },
    {
        "id": "week-3", "title": "Week 3: SQL Queries & Joins", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-1"], "unlocks": ["week-4"],
        "effort": "8 Hours", "language": "sql",
        "mission": "Master multi-table queries and relational schema design from scratch.",
        "why": "Joins are how real-world data connects. Every production database has multiple related tables.",
        "relevance": "SQLAlchemy ORM generates JOIN queries automatically from your class relationships. Understanding SQL makes debugging ORM queries natural.",
        "concepts": ["Primary & foreign key constraints", "INNER JOIN, LEFT JOIN, RIGHT JOIN", "Self-joins for hierarchical data", "Subqueries in WHERE and FROM clauses", "UNION and UNION ALL"],
        "subtopics": ["Multi-table query design", "Query optimization basics", "ERD reading and creation", "Normalization up to 3NF"],
        "examples": "University enrollment queries, Product catalog with categories",
        "practice": ["Write a query joining 3 tables with aggregate functions", "Design an ERD for a library system", "Implement a self-join for an employee hierarchy"],
        "mini_build": "University Enrollment Database: Schema + 10 analytical queries covering all join types.",
        "assessment": "From memory: Write a query returning all students who have never enrolled in a course (using LEFT JOIN and IS NULL).",
        "exit_criteria": ["Can write all JOIN types without reference", "Can design a 5-table schema from requirements", "Subqueries feel natural"],
        "capability_gained": "Multi-table analytical query writing",
        "future_connections": "Unlocks Week 4 advanced windowing and FastAPI ORM",
        "related_projects": ["University Enrollment Database"],
        "resources": [{"name": "SQLZoo JOIN tutorial", "url": "https://sqlzoo.net/wiki/The_JOIN_operation"}, {"name": "Use The Index, Luke", "url": "https://use-the-index-luke.com"}],
        "interview_questions": ["What is the difference between a subquery and a CTE?", "Explain when you would use a self-join", "What does EXPLAIN show you?"],
        "reflection_prompts": ["Which join type was hardest to visualize?", "How did you approach designing the schema from requirements?"],
        "revision_strategy": "Write the university enrollment schema from memory.",
        "code_template": "-- Week 3: SQL Queries & Joins\n\n-- Sample schema (given)\nCREATE TABLE students (id INT PRIMARY KEY, name TEXT, year INT);\nCREATE TABLE courses (id INT PRIMARY KEY, title TEXT, credits INT);\nCREATE TABLE enrollments (student_id INT REFERENCES students(id), course_id INT REFERENCES courses(id), grade DECIMAL(3,1));\n\n-- TODO: Query 1 — Find all students with their course count\n\n\n-- TODO: Query 2 — Find students who have NEVER enrolled in any course\n\n\n-- TODO: Query 3 — Find the top 3 courses by average grade\n\n"
    },
    {
        "id": "week-4", "title": "Week 4: Window Functions & Transactions", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-3"], "unlocks": ["phase-5"],
        "effort": "12 Hours", "language": "sql",
        "mission": "Master advanced SQL: window functions, ACID transactions, and index optimization.",
        "why": "Window functions are how you do analytics without losing row context. Transactions are how you guarantee data integrity.",
        "relevance": "Every analytics query in a real dashboard uses window functions. SQLAlchemy transaction management maps directly to what you learn here.",
        "concepts": ["ROW_NUMBER(), RANK(), DENSE_RANK()", "LEAD() and LAG() for time-series analysis", "PARTITION BY and ORDER BY in windows", "ACID: Atomicity, Consistency, Isolation, Durability", "BEGIN / COMMIT / ROLLBACK"],
        "subtopics": ["Running totals with SUM() OVER", "Percentile calculations with PERCENT_RANK", "Index types: B-tree, Hash, GiST", "EXPLAIN ANALYZE output interpretation", "Deadlocks and how to avoid them"],
        "examples": "Monthly revenue running total, Rank employees by department salary",
        "practice": ["Write a running total query for daily sales data", "Implement a transaction that atomically transfers funds", "Analyze a slow query using EXPLAIN ANALYZE and add the right index"],
        "mini_build": "Student Score Auditor: Complete analytics system with ranking, percentiles, and trend analysis using window functions.",
        "assessment": "From memory in under 15 minutes: Write a query ranking customers by total spend within each region using window functions.",
        "exit_criteria": ["Can write any window function from memory", "Understands when ROLLBACK is triggered", "Can read EXPLAIN ANALYZE output"],
        "capability_gained": "Optimized analytical joins and indexing",
        "future_connections": "Unlocks Phase 5 FastAPI REST services and SQLAlchemy ORM",
        "related_projects": ["Student Score Auditor Metrics Schema"],
        "resources": [{"name": "PostgreSQL Window Functions", "url": "https://www.postgresql.org/docs/current/tutorial-window.html"}, {"name": "Use The Index, Luke: Indexes", "url": "https://use-the-index-luke.com/sql/anatomy"}],
        "interview_questions": ["Explain the difference between RANK() and DENSE_RANK()", "What makes a transaction ACID-compliant?", "When would you add an index and when would it hurt performance?"],
        "reflection_prompts": ["What was the most complex window function you wrote?", "How does isolation level affect concurrent transactions?"],
        "revision_strategy": "Re-write the top 3 customers per region query from memory.",
        "code_template": "-- Week 4: Window Functions & Transactions\n\n-- Sample data\nCREATE TABLE sales (id INT, region TEXT, customer TEXT, amount DECIMAL, sale_date DATE);\n\n-- TODO: Rank customers by total spend within each region\nSELECT\n    -- TODO: use PARTITION BY region\nFROM sales\n;\n\n-- TODO: Running total of sales per day\nSELECT\n    sale_date,\n    amount,\n    -- TODO: SUM() OVER running total\nFROM sales\nORDER BY sale_date;\n\n-- TODO: Transfer funds transaction\nBEGIN;\n    -- TODO: UPDATE sender balance\n    -- TODO: UPDATE receiver balance\n    -- TODO: INSERT into transactions log\nCOMMIT;\n"
    },
    # ── Phase 2: Frontend ──────────────────────────────────────────────────────
    {
        "id": "phase-2", "title": "Phase 2: Frontend Basics", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-2"], "unlocks": ["week-5"],
        "effort": "15 Hours", "language": "html",
        "mission": "Build semantic browser layout systems and manage DOM script triggers.",
        "why": "Full-stack engineering requires both sides of the stack. Without frontend skills, you cannot ship complete products.",
        "relevance": "React is built on HTML, CSS, and JavaScript. Understanding the fundamentals makes React patterns immediately obvious.",
        "concepts": ["Semantic HTML5 elements", "CSS Grid and Flexbox", "CSS Custom Properties (variables)", "JavaScript DOM manipulation", "Fetch API and async/await"],
        "subtopics": ["Box model and specificity", "Responsive design with media queries", "Event listeners and event delegation", "Promises vs async/await", "JSON parsing and serialization"],
        "examples": "Developer Portfolio Landing Page, Multi-column article catalog",
        "practice": ["Build a responsive two-column layout without a framework", "Implement a DOM-based todo list with local storage", "Fetch data from an API and render it dynamically"],
        "mini_build": "Developer Portfolio Landing Page: Fully responsive, semantic HTML5, CSS Grid, animated nav, and a contact form with validation.",
        "assessment": "From memory: Build a responsive card grid that fetches data from a public API and renders it with error handling.",
        "exit_criteria": ["Can build any layout with CSS Grid/Flexbox without reference", "Can write Fetch + async/await without reference", "Portfolio page deployed and live"],
        "capability_gained": "Browser interfaces and responsive web layout grids",
        "future_connections": "Prerequisite for Phase 3 React components",
        "related_projects": ["Responsive Developer Portfolio", "Animated Component Library"],
        "resources": [{"name": "MDN HTML Reference", "url": "https://developer.mozilla.org/en-US/docs/Web/HTML"}, {"name": "CSS Grid Garden", "url": "https://cssgridgarden.com/"}, {"name": "Flexbox Froggy", "url": "https://flexboxfroggy.com/"}],
        "interview_questions": ["What is the difference between Flexbox and Grid?", "Explain the CSS Box Model", "What happens when you call fetch() — walk me through the Promise chain"],
        "reflection_prompts": ["Which CSS layout challenge took the most iterations?", "How did you handle asynchronous errors in your Fetch calls?"],
        "revision_strategy": "Rebuild the responsive portfolio layout from scratch in 45 minutes.",
        "code_template": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Portfolio</title>\n    <style>\n        /* TODO: CSS Grid layout */\n        /* TODO: CSS custom properties */\n        /* TODO: responsive breakpoints */\n    </style>\n</head>\n<body>\n    <!-- TODO: Semantic HTML structure -->\n    <script>\n        // TODO: Fetch API data and render cards\n        // TODO: Handle errors gracefully\n        async function fetchProjects() {\n\n        }\n        fetchProjects();\n    </script>\n</body>\n</html>\n"
    },
    {
        "id": "week-5", "title": "Week 5: HTML & CSS Grids", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-2"], "unlocks": ["week-6"],
        "effort": "6 Hours", "language": "html",
        "mission": "Master semantic HTML5 containers, CSS custom variables, Grid, and Flexbox alignments.",
        "why": "Every frontend application is HTML + CSS at its core. React just generates HTML. Without this foundation, React code is cargo cult.",
        "relevance": "React renders to HTML. TypeScript types the CSS. Understanding the fundamentals makes debugging React layout issues trivial.",
        "concepts": ["HTML5 semantic elements: header, nav, main, article, section, footer", "CSS Grid: grid-template-columns, grid-template-rows, grid-area", "CSS Flexbox: justify-content, align-items, flex-wrap", "CSS Custom Properties: --variable-name", "Media queries for responsive design"],
        "subtopics": ["Box sizing: content-box vs border-box", "CSS specificity and cascade", "Positioning: static, relative, absolute, fixed, sticky", "CSS transitions and animations"],
        "examples": "Multi-column article layout, Responsive navigation bar",
        "practice": ["Build a 3-column card grid that collapses to 1 column on mobile", "Implement a sticky navbar with flex layout", "Create a CSS-only animated loading spinner"],
        "mini_build": "Developer Portfolio Layout (HTML + CSS Only): Full page with nav, hero, skills grid, project cards, and contact section. No JavaScript. No frameworks.",
        "assessment": "From memory: Build a responsive 3-column card grid using CSS Grid that collapses to single column below 768px.",
        "exit_criteria": ["CSS Grid layouts feel natural", "Responsive design with media queries is automatic", "No need for Bootstrap or Tailwind — you write the CSS yourself"],
        "capability_gained": "Responsive styling layouts",
        "future_connections": "Unlocks Week 6 JavaScript DOM interactions",
        "related_projects": ["Multi-column Article Catalog", "Developer Portfolio"],
        "resources": [{"name": "MDN CSS Grid Guide", "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"}, {"name": "CSS Tricks Flexbox Guide", "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"}],
        "interview_questions": ["What is the difference between display:grid and display:flex?", "How does CSS specificity work?", "What does position:sticky do?"],
        "reflection_prompts": ["Which layout was hardest to implement without frameworks?", "How would you approach a layout you've never seen before?"],
        "revision_strategy": "Re-build the 3-column grid layout from memory in 20 minutes.",
        "code_template": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <style>\n        :root {\n            /* TODO: define CSS custom properties */\n        }\n\n        /* TODO: 3-column grid layout */\n        .card-grid {\n\n        }\n\n        /* TODO: responsive — collapse to 1 column on mobile */\n        @media (max-width: 768px) {\n\n        }\n    </style>\n</head>\n<body>\n    <!-- TODO: semantic HTML structure -->\n    <main>\n        <div class=\"card-grid\">\n            <!-- TODO: 6 project cards -->\n        </div>\n    </main>\n</body>\n</html>\n"
    },
    {
        "id": "week-6", "title": "Week 6: DOM & Async JavaScript", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-5"], "unlocks": ["phase-3"],
        "effort": "10 Hours", "language": "javascript",
        "mission": "Master JavaScript DOM manipulation, event handling, and the Fetch API with async/await.",
        "why": "Before React existed, the web ran on vanilla JavaScript. Understanding DOM APIs makes every React hook feel obvious — you'll know what React is abstracting.",
        "relevance": "React event handlers, useEffect fetch calls, and state updates are all abstractions over these exact patterns. Master the foundation, frameworks become tools.",
        "concepts": ["DOM: querySelector, querySelectorAll, getElementById", "Event listeners: addEventListener, removeEventListener", "Event delegation pattern", "Fetch API: fetch(), .then(), async/await", "Error handling: try/catch with async functions"],
        "subtopics": ["DOM tree traversal: parentElement, children, nextSibling", "Creating and inserting DOM nodes", "Template literals for HTML generation", "localStorage and sessionStorage", "JSON.parse() and JSON.stringify()"],
        "examples": "Dynamic todo list with DOM, Weather dashboard using public API",
        "practice": ["Build a DOM-based todo list with add/delete/filter", "Fetch data from a public API and render cards dynamically", "Implement a search filter on a list using DOM"],
        "mini_build": "Animated Component Library: 5 reusable DOM components — modal, tabs, accordion, tooltip, and auto-complete — all without any framework.",
        "assessment": "From memory: Build a search-filterable list that fetches data from https://jsonplaceholder.typicode.com/users and filters in real-time on keyup.",
        "exit_criteria": ["Can write DOM manipulation code without reference", "async/await feels natural for all API calls", "Error handling is never an afterthought"],
        "capability_gained": "Responsive interface layouts and asynchronous DOM scripting",
        "future_connections": "Unlocks Phase 3 React elements and components",
        "related_projects": ["Animated Component Library", "Weather Dashboard"],
        "resources": [{"name": "MDN DOM Introduction", "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"}, {"name": "JavaScript.info Async/Await", "url": "https://javascript.info/async-await"}],
        "interview_questions": ["Explain event bubbling and how to stop it", "What is the difference between synchronous and asynchronous JavaScript?", "When would you use event delegation instead of direct listeners?"],
        "reflection_prompts": ["How did event delegation simplify your component code?", "What was the hardest async flow to reason about?"],
        "revision_strategy": "Re-implement the search-filterable list from memory in 20 minutes.",
        "code_template": "// Week 6: DOM & Async JavaScript\n// Build a real-time search filter using DOM + Fetch API\n\nconst API_URL = 'https://jsonplaceholder.typicode.com/users';\n\nasync function fetchUsers() {\n    // TODO: fetch users, handle errors\n}\n\nfunction renderUsers(users) {\n    // TODO: create DOM elements for each user\n    // TODO: append to #user-list container\n}\n\nfunction filterUsers(users, query) {\n    // TODO: filter by name or email\n}\n\n// TODO: Wire up the search input with an 'input' event listener\n// TODO: Initialize the page\ndocument.addEventListener('DOMContentLoaded', async () => {\n    const users = await fetchUsers();\n    renderUsers(users);\n});\n"
    },
    # ── Phase 3: React ────────────────────────────────────────────────────────
    {
        "id": "phase-3", "title": "Phase 3: React Basics", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-6"], "unlocks": ["week-7"],
        "effort": "20 Hours", "language": "typescript",
        "mission": "Build component-based UI systems using React and TypeScript.",
        "why": "React is the dominant frontend framework for production applications. TypeScript prevents entire categories of bugs at scale.",
        "relevance": "Your capstone projects will all use React + TypeScript. Every AI interface, dashboard, and data visualization you build goes through React.",
        "concepts": ["JSX: components as functions", "Props: passing data down the tree", "State: useState hook", "Effects: useEffect for data fetching and subscriptions", "TypeScript interfaces and types"],
        "subtopics": ["Component composition", "Conditional rendering", "List rendering with keys", "Event handling in React", "Controlled vs uncontrolled inputs"],
        "examples": "Task tracker component, Counter with typed state",
        "practice": ["Build a typed counter component with increment/decrement/reset", "Create a product list that fetches and renders API data", "Implement a form with validation using controlled inputs"],
        "mini_build": "Task Stage Planner: Kanban-style board with drag-and-drop, TypeScript-typed state, and persistent localStorage.",
        "assessment": "From memory in under 60 minutes: Build a movie search component that fetches from OMDb API and renders typed results with loading and error states.",
        "exit_criteria": ["Can build any React component from memory", "TypeScript interfaces are written first before implementation", "useState and useEffect patterns are automatic"],
        "capability_gained": "Component state management and typed UI development",
        "future_connections": "Unlocks Phase 4 React advanced patterns and Context API",
        "related_projects": ["Task Stage Planner", "Movie Search App"],
        "resources": [{"name": "React Official Docs", "url": "https://react.dev/"}, {"name": "TypeScript React Cheatsheet", "url": "https://react-typescript-cheatsheet.netlify.app/"}],
        "interview_questions": ["What is the difference between state and props?", "When should you use useEffect?", "Explain the concept of controlled components"],
        "reflection_prompts": ["When did you first feel React state management click?", "What TypeScript error saved you from a bug?"],
        "revision_strategy": "Re-build the typed counter component from scratch in 15 minutes.",
        "code_template": "// Phase 3: React Basics\nimport { useState, useEffect } from 'react';\n\ninterface Task {\n    id: number;\n    title: string;\n    completed: boolean;\n    // TODO: add more fields\n}\n\nfunction TaskList() {\n    const [tasks, setTasks] = useState<Task[]>([]);\n    const [loading, setLoading] = useState(true);\n    const [error, setError] = useState<string | null>(null);\n\n    useEffect(() => {\n        // TODO: fetch tasks from API\n        // TODO: handle loading and error states\n    }, []);\n\n    const toggleTask = (id: number) => {\n        // TODO: update task completion status\n    };\n\n    if (loading) return <div>Loading...</div>;\n    if (error) return <div>Error: {error}</div>;\n\n    return (\n        <ul>\n            {tasks.map(task => (\n                // TODO: render each task with toggle\n                <li key={task.id}>{task.title}</li>\n            ))}\n        </ul>\n    );\n}\n\nexport default TaskList;\n"
    },
    {
        "id": "week-7", "title": "Week 7: React Elements & State", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-3"], "unlocks": ["week-8"],
        "effort": "8 Hours", "language": "typescript",
        "mission": "Build React functional components with typed props and local state.",
        "why": "Components are the atoms of every React UI. Getting them right — with proper types and clean state — is the discipline that separates junior from senior React developers.",
        "relevance": "Every dashboard, AI interface, and data visualization you build will be composed of components you define here.",
        "concepts": ["Functional components with TypeScript", "Props interfaces: defining and consuming", "useState with generic types", "Conditional rendering patterns", "Fragment and key props"],
        "subtopics": ["Component file structure conventions", "Prop drilling and when to avoid it", "Children prop and composition", "Default prop values", "Type narrowing in JSX"],
        "examples": "Typed counter, Status badge component, User card",
        "practice": ["Build a typed Button component with variant prop (primary/secondary/danger)", "Create a StatusBadge that renders different colors based on status", "Implement a DataCard that accepts any typed data and renders it"],
        "mini_build": "Component Design System: 8 reusable typed components — Button, Badge, Card, Input, Modal, Spinner, Alert, and Tooltip.",
        "assessment": "From memory: Build a SearchBar component that accepts onSearch: (query: string) => void and debounces input by 300ms.",
        "exit_criteria": ["Every component has a TypeScript interface for its props", "useState is always typed", "Conditional rendering is clean (no nested ternaries)"],
        "capability_gained": "Typed component architecture",
        "future_connections": "Unlocks Week 8 hooks and TypeScript advanced patterns",
        "related_projects": ["Component Design System"],
        "resources": [{"name": "React TypeScript Props", "url": "https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/"}, {"name": "React Patterns", "url": "https://reactpatterns.com/"}],
        "interview_questions": ["What is a controlled component?", "How do you type a React component's props with TypeScript?", "Explain when you would use React.Fragment"],
        "reflection_prompts": ["Which component pattern clicked the most?", "When did TypeScript prevent a bug you would have shipped?"],
        "revision_strategy": "Re-build the SearchBar component with debounce from scratch.",
        "code_template": "// Week 7: React Components & TypeScript Props\nimport { useState, useCallback } from 'react';\n\n// TODO: Define the SearchBar props interface\ninterface SearchBarProps {\n    // onSearch: ...\n    // placeholder?: ...\n    // debounceMs?: ...\n}\n\nfunction SearchBar({ onSearch, placeholder = 'Search...', debounceMs = 300 }: SearchBarProps) {\n    const [query, setQuery] = useState('');\n\n    // TODO: Implement debounced search\n    // Hint: use useCallback and setTimeout\n\n    return (\n        <input\n            type=\"search\"\n            value={query}\n            onChange={/* TODO */}\n            placeholder={placeholder}\n        />\n    );\n}\n\nexport default SearchBar;\n"
    },
    {
        "id": "week-8", "title": "Week 8: Hooks & TypeScript", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-7"], "unlocks": ["phase-4"],
        "effort": "12 Hours", "language": "typescript",
        "mission": "Master React hooks and TypeScript advanced patterns for production-quality component design.",
        "why": "Custom hooks are how you extract and reuse stateful logic. TypeScript generics are how you write components that work for any data type.",
        "relevance": "Every real React codebase uses custom hooks for API calls, form handling, and local state. TypeScript strict mode is the industry standard.",
        "concepts": ["useReducer for complex state", "useContext for shared state", "Custom hooks: extracting stateful logic", "TypeScript generics: <T>", "TypeScript utility types: Partial, Pick, Omit, Record"],
        "subtopics": ["useMemo and useCallback for performance", "useRef for DOM access and persistent values", "TypeScript discriminated unions", "Error boundaries", "Strict mode implications"],
        "examples": "useFetch custom hook, useLocalStorage hook, useDebounce hook",
        "practice": ["Build useFetch<T> custom hook with loading, error, and data states", "Implement useLocalStorage<T> that syncs state with localStorage", "Create useDebounce<T> that delays value updates"],
        "mini_build": "Hook Library: 5 production-quality custom hooks with TypeScript generics and full test coverage.",
        "assessment": "From memory: Implement a useFetch<T>(url: string) hook that returns { data: T | null, loading: boolean, error: string | null }.",
        "exit_criteria": ["Can write any custom hook from memory", "TypeScript generics feel natural", "useReducer is chosen over useState for complex state"],
        "capability_gained": "Advanced React patterns and TypeScript generics",
        "future_connections": "Unlocks Phase 4 React Router and Context architecture",
        "related_projects": ["Hook Library", "Custom Forms Engine"],
        "resources": [{"name": "React Custom Hooks Docs", "url": "https://react.dev/learn/reusing-logic-with-custom-hooks"}, {"name": "TypeScript Handbook: Generics", "url": "https://www.typescriptlang.org/docs/handbook/2/generics.html"}],
        "interview_questions": ["When do you use useReducer instead of useState?", "Explain TypeScript generics with a real example", "What is a custom hook and when should you create one?"],
        "reflection_prompts": ["Which custom hook has been the most useful so far?", "When did TypeScript generics first feel natural?"],
        "revision_strategy": "Re-implement useFetch from memory in 15 minutes.",
        "code_template": "// Week 8: Custom Hooks & TypeScript Generics\nimport { useState, useEffect } from 'react';\n\n// TODO: Implement useFetch with TypeScript generics\nfunction useFetch<T>(url: string) {\n    // TODO: state for data, loading, error\n    // TODO: useEffect to fetch on url change\n    // TODO: cleanup abort controller\n\n    return { data: null as T | null, loading: true, error: null as string | null };\n}\n\n// TODO: Implement useLocalStorage with generics\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n    // TODO: initialize from localStorage\n    // TODO: sync to localStorage on change\n\n    return [initialValue, (_v: T) => {}] as const;\n}\n\n// TODO: Implement useDebounce\nfunction useDebounce<T>(value: T, delay: number): T {\n    // TODO: delay value updates by `delay` ms\n    return value;\n}\n\nexport { useFetch, useLocalStorage, useDebounce };\n"
    },
    # ── Phase 4: React Complex ─────────────────────────────────────────────────
    {
        "id": "phase-4", "title": "Phase 4: React Complex", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-8"], "unlocks": ["week-9"],
        "effort": "20 Hours", "language": "typescript",
        "mission": "Build complete React applications with routing, global state, and production architecture.",
        "why": "Real applications have multiple pages, shared state, and complex data flows. This is where you move from components to applications.",
        "relevance": "Your capstone project is a full React application. Every pattern you learn here will be used directly in the Kanban UI and the AI Engineering dashboard.",
        "concepts": ["React Router v6: BrowserRouter, Route, Link, useParams", "Context API: createContext, useContext, Provider pattern", "useReducer with dispatch pattern", "Code splitting with React.lazy and Suspense", "React Query or SWR for server state"],
        "subtopics": ["Nested routes and layouts", "Protected routes with authentication", "URL params and search params", "Context composition pattern", "Error boundaries with routes"],
        "examples": "Multi-page task manager, Auth-protected dashboard",
        "practice": ["Build a 3-page React Router app with shared navigation", "Implement a global theme context with toggle", "Create a protected route component that redirects unauthenticated users"],
        "mini_build": "Kanban Task Board: Full React app with routing, Context API for state, drag-and-drop between columns, TypeScript throughout, and deployed to Vercel.",
        "assessment": "From memory in under 180 minutes: Build a Kanban UI with three columns (Todo, In Progress, Done), Context API for state, and React Router for task detail pages.",
        "exit_criteria": ["Can build multi-page React apps without reference", "Context API state management is fluent", "Routing with params and protected routes works"],
        "capability_gained": "Full React application architecture",
        "future_connections": "Unlocks Phase 5 FastAPI backend integration",
        "related_projects": ["Kanban Task Board", "E-commerce Product Catalog"],
        "resources": [{"name": "React Router v6 Docs", "url": "https://reactrouter.com/en/main"}, {"name": "React Context Docs", "url": "https://react.dev/learn/passing-data-deeply-with-context"}],
        "interview_questions": ["Explain the Context API and when to use it over prop drilling", "What is the difference between a controlled and uncontrolled form?", "How does React Router v6 differ from v5?"],
        "reflection_prompts": ["When did you first feel your React app had a proper architecture?", "How did you decide what to put in Context vs local state?"],
        "revision_strategy": "Re-build the 3-page router app with Context from memory in 60 minutes.",
        "code_template": "// Phase 4: React Router & Context\nimport { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';\nimport { createContext, useContext, useReducer } from 'react';\n\n// TODO: Define Task type\ninterface Task {\n    id: string;\n    title: string;\n    status: 'todo' | 'in-progress' | 'done';\n}\n\n// TODO: Create TaskContext with useReducer\nconst TaskContext = createContext<any>(null);\n\n// TODO: Implement TaskProvider\nfunction TaskProvider({ children }: { children: React.ReactNode }) {\n    // TODO: useReducer for task state\n    return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;\n}\n\n// TODO: Build the router structure\nfunction App() {\n    return (\n        <BrowserRouter>\n            <TaskProvider>\n                <Routes>\n                    {/* TODO: add routes */}\n                </Routes>\n            </TaskProvider>\n        </BrowserRouter>\n    );\n}\n\nexport default App;\n"
    },
    {
        "id": "week-9", "title": "Week 9: Router & Context", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-4"], "unlocks": ["week-10"],
        "effort": "10 Hours", "language": "typescript",
        "mission": "Master React Router v6 and Context API for building multi-page applications with shared state.",
        "why": "Every real application has multiple pages and needs shared state. Router and Context are the foundational architecture of React apps.",
        "relevance": "The AI Engineering Platform, your capstone project, uses exactly these patterns for navigation and global state management.",
        "concepts": ["BrowserRouter, Routes, Route, Link", "useNavigate, useParams, useLocation", "Nested routes with Outlet", "Context with TypeScript generics", "useReducer dispatch pattern for complex state"],
        "subtopics": ["Route params and search params", "Programmatic navigation", "Layout routes", "Context performance optimization with useMemo", "Action types with discriminated unions"],
        "examples": "Blog with post detail pages, Auth-protected dashboard routes",
        "practice": ["Build a 4-page app with nested routes and shared navigation", "Implement a theme context with TypeScript", "Create a cart context with useReducer for an e-commerce app"],
        "mini_build": "Multi-page Portfolio App: React Router v6, shared navigation, dark/light theme Context, and animated route transitions.",
        "assessment": "From memory: Build a shopping cart context with useReducer that supports add, remove, and update quantity actions.",
        "exit_criteria": ["Multi-page routing is automatic", "Context API with useReducer feels natural", "TypeScript types the entire state shape"],
        "capability_gained": "Multi-page React application architecture",
        "future_connections": "Unlocks Week 10 capstone UI and full-stack integration",
        "related_projects": ["Multi-page Portfolio App"],
        "resources": [{"name": "React Router v6 Tutorial", "url": "https://reactrouter.com/en/main/start/tutorial"}, {"name": "React useReducer Docs", "url": "https://react.dev/reference/react/useReducer"}],
        "interview_questions": ["Explain the difference between useNavigate and Link", "How do you handle 404 pages in React Router v6?", "When would you split Context into multiple providers?"],
        "reflection_prompts": ["How did you decide your route structure?", "What would break in your app if Context was removed?"],
        "revision_strategy": "Re-implement the cart reducer with all three actions from memory.",
        "code_template": "// Week 9: Router & Context\nimport { createContext, useContext, useReducer } from 'react';\n\ninterface CartItem {\n    id: string;\n    title: string;\n    price: number;\n    quantity: number;\n}\n\ntype CartAction =\n    | { type: 'ADD_ITEM'; item: CartItem }\n    | { type: 'REMOVE_ITEM'; id: string }\n    | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }\n    | { type: 'CLEAR_CART' };\n\nfunction cartReducer(state: CartItem[], action: CartAction): CartItem[] {\n    switch (action.type) {\n        case 'ADD_ITEM':\n            // TODO: add or increment existing item\n            return state;\n        case 'REMOVE_ITEM':\n            // TODO: remove by id\n            return state;\n        case 'UPDATE_QUANTITY':\n            // TODO: update quantity by id\n            return state;\n        case 'CLEAR_CART':\n            return [];\n        default:\n            return state;\n    }\n}\n\nexport function CartProvider({ children }: { children: React.ReactNode }) {\n    const [cart, dispatch] = useReducer(cartReducer, []);\n    return (\n        <CartContext.Provider value={{ cart, dispatch }}>\n            {children}\n        </CartContext.Provider>\n    );\n}\n\nconst CartContext = createContext<{ cart: CartItem[]; dispatch: React.Dispatch<CartAction> } | null>(null);\nexport const useCart = () => useContext(CartContext)!;\n"
    },
    {
        "id": "week-10", "title": "Week 10: Capstone UI", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-9"], "unlocks": ["phase-6"],
        "effort": "15 Hours", "language": "typescript",
        "mission": "Build and deploy a production-quality React + TypeScript Kanban UI as the frontend capstone.",
        "why": "Building something real that you can show is worth more than all the practice exercises combined.",
        "relevance": "This is the project that goes on your resume. It demonstrates React, TypeScript, state management, routing, and API integration in one application.",
        "concepts": ["Full React app architecture", "API integration with custom hooks", "Drag and drop with native HTML5 API", "Optimistic UI updates", "Deployment to Vercel/Netlify"],
        "subtopics": ["Component library design", "Loading and error states at scale", "Form validation patterns", "Accessibility basics: ARIA labels, keyboard nav", "Performance: React.memo, useMemo"],
        "examples": "Trello-clone architecture, Linear-style task management",
        "practice": ["Implement drag-and-drop between columns using HTML5 API", "Build optimistic UI updates for task status changes", "Add keyboard navigation to the task board"],
        "mini_build": "Kanban Task Board (deployed): Three columns (Todo, In Progress, Done), drag-and-drop, Task detail modal, TypeScript throughout, deployed and live.",
        "assessment": "From memory in under 180 minutes: Build the complete Kanban board with all features. Deploy to Vercel.",
        "exit_criteria": ["Kanban app is live and deployed", "All TypeScript is in strict mode with zero errors", "Application is on your resume"],
        "capability_gained": "Full React application deployment",
        "future_connections": "Unlocks Phase 6 Full-Stack integration with FastAPI backend",
        "related_projects": ["Kanban Task Board (Live)"],
        "resources": [{"name": "HTML5 Drag and Drop API", "url": "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API"}, {"name": "Vercel Deployment", "url": "https://vercel.com/docs"}],
        "interview_questions": ["Explain React.memo and when to use it", "How would you implement optimistic updates?", "What accessibility considerations did you add?"],
        "reflection_prompts": ["What was the most technically challenging part of the Kanban?", "What would you build differently with more time?"],
        "revision_strategy": "Explain every component decision in your Kanban app to a peer.",
        "code_template": "// Week 10: Kanban Board — Complete Implementation\nimport { useState, useCallback } from 'react';\n\ntype Status = 'todo' | 'in-progress' | 'done';\n\ninterface Task {\n    id: string;\n    title: string;\n    description: string;\n    status: Status;\n    priority: 'low' | 'medium' | 'high';\n    createdAt: Date;\n}\n\n// TODO: Implement KanbanBoard component\n// - Three columns\n// - Drag and drop between columns\n// - Add task modal\n// - Task card with priority badge\n// - Filter by priority\n\nexport function KanbanBoard() {\n    const [tasks, setTasks] = useState<Task[]>([]);\n\n    const moveTask = useCallback((taskId: string, newStatus: Status) => {\n        // TODO: implement\n    }, []);\n\n    return (\n        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>\n            {/* TODO: render three columns */}\n        </div>\n    );\n}\n"
    },
    # ── Phase 5: FastAPI ───────────────────────────────────────────────────────
    {
        "id": "phase-5", "title": "Phase 5: FastAPI APIs", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-4"], "unlocks": ["week-11"],
        "effort": "25 Hours", "language": "python",
        "mission": "Design, build, and document production REST APIs using FastAPI and SQLAlchemy.",
        "why": "FastAPI is how Python runs in production. Every AI backend, data API, and web service you build will use these patterns.",
        "relevance": "The Engineering Journey Platform backend you are running right now is a FastAPI application. You are learning the stack you are actively using.",
        "concepts": ["FastAPI: routers, path operations, dependency injection", "Pydantic: request/response schemas, validation", "SQLAlchemy 2.0: ORM models, sessions, queries", "Alembic: database migrations", "pytest: endpoint testing with TestClient"],
        "subtopics": ["Async route handlers", "Background tasks", "File uploads", "CORS configuration", "OpenAPI/Swagger auto-documentation"],
        "examples": "Task REST API, User management with CRUD",
        "practice": ["Build a complete CRUD REST API for a Task model", "Add Pydantic validation for all request/response schemas", "Write tests for every endpoint using TestClient"],
        "mini_build": "Task REST API: Full CRUD with FastAPI, SQLAlchemy, Pydantic, Alembic migrations, and pytest test suite.",
        "assessment": "From memory: Build a /users endpoint with GET (list), POST (create), GET {id}, PUT {id}, DELETE {id} — with Pydantic schemas and SQLAlchemy model.",
        "exit_criteria": ["Can build any CRUD API from memory", "Pydantic schemas are always separate from DB models", "All endpoints have test coverage"],
        "capability_gained": "Production REST API design and async web request handling",
        "future_connections": "Unlocks Phase 6 Full-Stack integration and AI API backends",
        "related_projects": ["Task REST API", "Blog API with Auth"],
        "resources": [{"name": "FastAPI Official Docs", "url": "https://fastapi.tiangolo.com/"}, {"name": "SQLAlchemy 2.0 Docs", "url": "https://docs.sqlalchemy.org/en/20/"}],
        "interview_questions": ["What is dependency injection in FastAPI?", "Explain the difference between a Pydantic model and a SQLAlchemy model", "How does FastAPI handle async route handlers?"],
        "reflection_prompts": ["What made your API design different from your first draft?", "What would you add to your API with more time?"],
        "revision_strategy": "Re-build the Task CRUD API from memory in 45 minutes.",
        "code_template": "# Phase 5: FastAPI REST API\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom sqlalchemy.orm import Session\nfrom pydantic import BaseModel\nfrom typing import List, Optional\n\n# TODO: Define SQLAlchemy Task model\n\n# TODO: Define Pydantic schemas\nclass TaskCreate(BaseModel):\n    title: str\n    description: Optional[str] = None\n    # TODO: add more fields\n\nclass TaskResponse(TaskCreate):\n    id: int\n    # TODO: add status and timestamps\n\napp = FastAPI()\n\n@app.get('/tasks', response_model=List[TaskResponse])\ndef list_tasks(db: Session = Depends(get_db)):\n    # TODO: query all tasks\n    pass\n\n@app.post('/tasks', response_model=TaskResponse, status_code=201)\ndef create_task(task: TaskCreate, db: Session = Depends(get_db)):\n    # TODO: create and commit task\n    pass\n\n@app.get('/tasks/{task_id}', response_model=TaskResponse)\ndef get_task(task_id: int, db: Session = Depends(get_db)):\n    # TODO: query by id, raise 404 if not found\n    pass\n"
    },
    {
        "id": "week-11", "title": "Week 11: Routers & Deps", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-5"], "unlocks": ["week-12"],
        "effort": "8 Hours", "language": "python",
        "mission": "Build a modular FastAPI application with APIRouter, dependency injection, and Pydantic validation.",
        "why": "Monolithic FastAPI apps become unmaintainable. Routers and dependency injection are how production FastAPI codebases are organized.",
        "relevance": "This exact pattern — separate routers, dependency injection for DB sessions — is what the Engineering Journey Platform backend uses. You are reading and understanding your own running system.",
        "concepts": ["APIRouter with prefix and tags", "Depends() for dependency injection", "Database session as a dependency (get_db pattern)", "Pydantic model validation: field validators, model validators", "HTTP status codes and error responses"],
        "subtopics": ["Router organization by feature (not by HTTP method)", "Multiple dependencies with Depends()", "Query parameters vs path parameters", "Request and response body typing", "Background tasks with BackgroundTasks"],
        "examples": "Users router + Tasks router in one FastAPI app",
        "practice": ["Refactor a monolithic FastAPI app into routers", "Add a get_db dependency and inject it into all route handlers", "Write a Pydantic validator that ensures email format"],
        "mini_build": "Modular Blog API: posts/ and users/ routers, get_db dependency injection, Pydantic validation, and Alembic migration.",
        "assessment": "From memory: Build a FastAPI router for /items with dependency injection for the DB session and Pydantic schemas.",
        "exit_criteria": ["Every API feature lives in its own router file", "DB session is always injected via Depends(get_db)", "Pydantic schemas have validators for all user inputs"],
        "capability_gained": "Modular FastAPI application architecture",
        "future_connections": "Unlocks Week 12 SQLAlchemy ORM and authentication",
        "related_projects": ["Modular Blog API"],
        "resources": [{"name": "FastAPI Router Docs", "url": "https://fastapi.tiangolo.com/tutorial/bigger-applications/"}, {"name": "FastAPI Dependencies", "url": "https://fastapi.tiangolo.com/tutorial/dependencies/"}],
        "interview_questions": ["How does FastAPI's dependency injection work?", "What is the purpose of APIRouter?", "How do you handle validation errors in FastAPI?"],
        "reflection_prompts": ["How did router separation make your codebase easier to navigate?", "What would break if you removed dependency injection?"],
        "revision_strategy": "Write the /items router with Depends(get_db) from memory.",
        "code_template": "# Week 11: FastAPI Routers & Dependency Injection\nfrom fastapi import APIRouter, Depends, HTTPException, status\nfrom sqlalchemy.orm import Session\nfrom pydantic import BaseModel, field_validator\nfrom typing import List\n\nrouter = APIRouter(prefix='/items', tags=['Items'])\n\n# TODO: Import get_db from database module\n# from app.database import get_db\n\nclass ItemCreate(BaseModel):\n    name: str\n    price: float\n    quantity: int\n\n    @field_validator('price')\n    @classmethod\n    def price_must_be_positive(cls, v: float) -> float:\n        # TODO: validate price > 0\n        return v\n\nclass ItemResponse(ItemCreate):\n    id: int\n\n@router.get('/', response_model=List[ItemResponse])\ndef list_items(db: Session = Depends(lambda: None)):  # TODO: use get_db\n    # TODO: query all items\n    pass\n\n@router.post('/', response_model=ItemResponse, status_code=status.HTTP_201_CREATED)\ndef create_item(item: ItemCreate, db: Session = Depends(lambda: None)):\n    # TODO: create and commit\n    pass\n\n@router.delete('/{item_id}', status_code=status.HTTP_204_NO_CONTENT)\ndef delete_item(item_id: int, db: Session = Depends(lambda: None)):\n    # TODO: find and delete\n    pass\n"
    },
    {
        "id": "week-12", "title": "Week 12: SQLAlchemy ORM", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-11"], "unlocks": ["phase-6"],
        "effort": "12 Hours", "language": "python",
        "mission": "Master SQLAlchemy 2.0 ORM for production database design with relationships, migrations, and efficient queries.",
        "why": "SQLAlchemy is the industry-standard ORM for Python production backends. Every FastAPI + database project you build will use it.",
        "relevance": "The Engineering Journey Platform backend uses SQLAlchemy 2.0 with Alembic migrations. You can read and understand your own running system.",
        "concepts": ["SQLAlchemy 2.0 Mapped models with type annotations", "Relationships: one-to-many, many-to-many", "Session: add, commit, refresh, delete", "Alembic migrations: revision, upgrade, downgrade", "Efficient queries: select(), scalars(), joinedload()"],
        "subtopics": ["Lazy vs eager loading", "N+1 query problem and solutions", "Database connection pool", "Async SQLAlchemy with async sessions", "Alembic autogenerate"],
        "examples": "User with Posts (one-to-many), Post with Tags (many-to-many)",
        "practice": ["Define User and Post models with a one-to-many relationship", "Write an Alembic migration for adding a tags table", "Query all posts with their authors in one query (no N+1)"],
        "mini_build": "Blog API with SQLAlchemy: Users, Posts, Tags with full relationships, Alembic migrations, and eager loading.",
        "assessment": "From memory: Define User and Post SQLAlchemy 2.0 models with a one-to-many relationship and write a query that returns all posts with their user loaded in one query.",
        "exit_criteria": ["SQLAlchemy 2.0 model definition is automatic", "Alembic migrations are always created before schema changes", "N+1 queries are identified and resolved"],
        "capability_gained": "Production ORM design with migrations",
        "future_connections": "Unlocks Phase 6 Full-Stack integration and authentication",
        "related_projects": ["Blog API with SQLAlchemy"],
        "resources": [{"name": "SQLAlchemy 2.0 ORM Tutorial", "url": "https://docs.sqlalchemy.org/en/20/orm/quickstart.html"}, {"name": "Alembic Tutorial", "url": "https://alembic.sqlalchemy.org/en/latest/tutorial.html"}],
        "interview_questions": ["What is the N+1 query problem and how do you fix it?", "Explain lazy loading vs eager loading in an ORM", "What does Alembic do and why is it necessary?"],
        "reflection_prompts": ["When did you first catch a lazy loading bug?", "How did Alembic change your approach to schema changes?"],
        "revision_strategy": "Write the User-Post relationship model from memory.",
        "code_template": "# Week 12: SQLAlchemy 2.0 ORM\nfrom sqlalchemy import String, Integer, ForeignKey, select\nfrom sqlalchemy.orm import Mapped, mapped_column, relationship, Session\nfrom app.models.base import Base\nfrom typing import List\n\nclass User(Base):\n    __tablename__ = 'users'\n\n    id: Mapped[int] = mapped_column(Integer, primary_key=True)\n    username: Mapped[str] = mapped_column(String(50), unique=True)\n    email: Mapped[str] = mapped_column(String(100), unique=True)\n    # TODO: add posts relationship\n    posts: Mapped[List['Post']] = relationship(back_populates='author', lazy='selectin')\n\nclass Post(Base):\n    __tablename__ = 'posts'\n\n    id: Mapped[int] = mapped_column(Integer, primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n    content: Mapped[str] = mapped_column(String)\n    # TODO: add foreign key and relationship back to User\n    author_id: Mapped[int] = mapped_column(ForeignKey('users.id'))\n    author: Mapped['User'] = relationship(back_populates='posts')\n\n# TODO: Write a query that returns all posts with authors in one query\ndef get_all_posts_with_authors(db: Session) -> List[Post]:\n    # Hint: use selectin loading or joinedload\n    pass\n"
    },
    # ── Phase 6: Full-Stack + AI ──────────────────────────────────────────────
    {
        "id": "phase-6", "title": "Phase 6: Full-Stack & AI", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-10", "week-12"], "unlocks": ["week-13", "week-14", "week-15"],
        "effort": "40 Hours", "language": "python",
        "mission": "Build and deploy complete full-stack AI applications connecting React frontend to FastAPI backend with LLM integration.",
        "why": "The separation between frontend and backend closes here. Full-stack capability is what makes you independently hireable.",
        "relevance": "Your portfolio projects are full-stack. Your interviews are full-stack. This is the integration layer that makes everything real.",
        "concepts": ["CORS configuration for full-stack development", "Environment variables for secrets management", "LLM API integration: OpenAI, Anthropic, Groq", "RAG: chunking, embeddings, vector search, retrieval", "LangGraph: stateful agent workflows"],
        "subtopics": ["JWT authentication for full-stack", "Docker and docker-compose for local dev", "CI/CD with GitHub Actions", "Vector databases: FAISS, Chroma, Pinecone", "Structured LLM outputs with Pydantic"],
        "examples": "AI-powered document Q&A, Agentic code review system",
        "practice": ["Integrate an OpenAI API call into a FastAPI endpoint", "Build a simple RAG pipeline for a PDF document", "Create a LangGraph workflow with two connected nodes"],
        "mini_build": "AI Engineering Platform: React + FastAPI + LLM APIs + RAG pipeline. Complete, deployed, and on your resume.",
        "assessment": "Can you explain every component of your AI application to a technical interviewer?",
        "exit_criteria": ["Full-stack app deployed and live", "RAG pipeline processes documents", "LangGraph agent completes a multi-step workflow"],
        "capability_gained": "Full-stack AI engineering and deployment",
        "future_connections": "Unlocks Phase 7 Placement Preparation and System Design",
        "related_projects": ["AI Document Q&A System", "Engineering Journey Platform"],
        "resources": [{"name": "LangChain Docs", "url": "https://docs.langchain.com/"}, {"name": "LangGraph Docs", "url": "https://langchain-ai.github.io/langgraph/"}, {"name": "FastAPI Full Stack", "url": "https://fastapi.tiangolo.com/tutorial/"}],
        "interview_questions": ["Explain how RAG works at a technical level", "What is the difference between LangChain and LangGraph?", "How do you handle LLM API rate limits in production?"],
        "reflection_prompts": ["What was the most surprising thing about building an AI application?", "How would you improve your RAG pipeline's retrieval accuracy?"],
        "revision_strategy": "Draw the architecture of your AI application from memory and explain each component.",
        "code_template": "# Phase 6: Full-Stack AI Integration\nimport httpx\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ChatRequest(BaseModel):\n    message: str\n    context: str = ''\n\nclass ChatResponse(BaseModel):\n    response: str\n    tokens_used: int\n\n@app.post('/chat', response_model=ChatResponse)\nasync def chat(request: ChatRequest):\n    # TODO: build system prompt with engineering context\n    # TODO: call LLM API (Groq/OpenAI)\n    # TODO: parse response\n    # TODO: return structured response\n    pass\n\n# RAG pipeline\nclass RAGPipeline:\n    def __init__(self):\n        # TODO: initialize embedding model\n        # TODO: initialize vector store\n        pass\n\n    def index_document(self, text: str, metadata: dict):\n        # TODO: chunk text\n        # TODO: create embeddings\n        # TODO: store in vector store\n        pass\n\n    def retrieve(self, query: str, k: int = 5) -> list[str]:\n        # TODO: embed query\n        # TODO: similarity search\n        # TODO: return top k chunks\n        return []\n"
    },
    {
        "id": "week-13", "title": "Week 13: Full-Stack Integration", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-6"], "unlocks": ["phase-7"],
        "effort": "15 Hours", "language": "typescript",
        "mission": "Wire the React frontend to the FastAPI backend end-to-end with authentication and deployment.",
        "why": "Building each side separately is practice. Connecting them is engineering.",
        "relevance": "Every project on your resume must be a complete, deployed, full-stack application.",
        "concepts": ["CORS: enabling cross-origin requests", "JWT authentication flow: login → token → protected routes", "React authenticated API calls with interceptors", "Docker Compose for local full-stack development", "Deployment: frontend on Vercel, backend on Railway/Fly.io"],
        "subtopics": ["Refresh token pattern", "Axios interceptors for auth headers", "Environment variables in React (VITE_) and FastAPI", "Docker multi-stage builds", "GitHub Actions for CI/CD"],
        "examples": "Full-stack blog with JWT auth, Deployed task manager",
        "practice": ["Implement JWT login in FastAPI + token storage in React", "Set up docker-compose with FastAPI + PostgreSQL", "Deploy frontend to Vercel and backend to Railway"],
        "mini_build": "Full-Stack Blog: React + FastAPI + PostgreSQL + JWT auth + Docker Compose. Fully deployed.",
        "assessment": "Your full-stack blog is live with a real domain. A recruiter can access it.",
        "exit_criteria": ["Full-stack application is deployed and accessible", "JWT authentication works end-to-end", "Docker Compose runs locally with one command"],
        "capability_gained": "Full-stack deployment and authentication",
        "future_connections": "Unlocks Phase 7 AI integration and placement preparation",
        "related_projects": ["Full-Stack Blog", "Deployed Task Manager"],
        "resources": [{"name": "FastAPI JWT Auth", "url": "https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/"}, {"name": "Docker Compose Docs", "url": "https://docs.docker.com/compose/"}],
        "interview_questions": ["Explain the JWT authentication flow end-to-end", "How do you handle CORS in production?", "What is the difference between authentication and authorization?"],
        "reflection_prompts": ["What surprised you about connecting frontend to backend?", "What would you change about your API design?"],
        "revision_strategy": "Explain the full authentication flow from login to protected API call.",
        "code_template": "// Week 13: Full-Stack Integration\n// JWT Authentication in React\n\ninterface AuthTokens {\n    access_token: string;\n    token_type: string;\n}\n\ninterface LoginCredentials {\n    username: string;\n    password: string;\n}\n\nasync function login(credentials: LoginCredentials): Promise<AuthTokens> {\n    // TODO: POST to /auth/token\n    // TODO: store tokens in localStorage\n    // TODO: return tokens\n    throw new Error('Not implemented');\n}\n\nasync function authenticatedFetch(url: string, options: RequestInit = {}) {\n    // TODO: get token from localStorage\n    // TODO: add Authorization header\n    // TODO: refresh on 401\n    return fetch(url, options);\n}\n\nasync function logout() {\n    // TODO: clear tokens\n    // TODO: redirect to login\n}\n"
    },
    {
        "id": "week-14", "title": "Week 14: LLM APIs & RAG", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-6"], "unlocks": ["phase-7"],
        "effort": "15 Hours", "language": "python",
        "mission": "Integrate LLM APIs into production FastAPI backends and build a RAG pipeline for document-grounded AI responses.",
        "why": "LLM APIs are how you add intelligence to applications. RAG is how you make AI answers accurate and grounded in your own knowledge.",
        "relevance": "The AI Mentor in this platform uses exactly this pattern: Groq LLM API + structured context from your Engineering State.",
        "concepts": ["OpenAI / Groq API: chat completions, system prompts", "Structured outputs with response_format JSON", "RAG: text chunking, embeddings, similarity search, retrieval", "LangChain: document loaders, text splitters, embedding models", "Vector databases: FAISS local, Chroma persistent"],
        "subtopics": ["Token counting and cost estimation", "Prompt engineering: system / user / assistant roles", "Embedding models: text-embedding-3-small, sentence-transformers", "Cosine similarity for retrieval", "Hybrid search: dense + sparse"],
        "examples": "Document Q&A chatbot, Code explanation endpoint",
        "practice": ["Build a FastAPI endpoint that answers questions using a system prompt and context", "Implement a chunker that splits text into overlapping 500-token chunks", "Create a similarity search function using sentence-transformers"],
        "mini_build": "Document Q&A API: Upload a PDF → chunk → embed → store → query → answer with citations.",
        "assessment": "From memory: Explain the complete RAG pipeline from document ingestion to final response, including where errors occur.",
        "exit_criteria": ["Can integrate any LLM API with structured outputs", "RAG pipeline processes and retrieves from real documents", "Understands token costs and latency tradeoffs"],
        "capability_gained": "LLM API integration and RAG pipeline architecture",
        "future_connections": "Unlocks Phase 7 LangGraph agentic workflows",
        "related_projects": ["Document Q&A API", "AI Engineering Platform"],
        "resources": [{"name": "Groq API Docs", "url": "https://console.groq.com/docs"}, {"name": "LangChain RAG Docs", "url": "https://python.langchain.com/docs/tutorials/rag/"}, {"name": "Sentence Transformers", "url": "https://www.sbert.net/"}],
        "interview_questions": ["Explain how RAG works technically", "What is the difference between an embedding model and a language model?", "How do you handle LLM hallucinations in production?"],
        "reflection_prompts": ["What was the most surprising thing about retrieval accuracy?", "When did structured outputs change your approach?"],
        "revision_strategy": "Draw the RAG pipeline architecture from memory and label every component.",
        "code_template": "# Week 14: LLM APIs & RAG\nimport httpx\nfrom typing import List\n\nasync def call_llm(system_prompt: str, user_message: str, context: str = '') -> str:\n    \"\"\"Call Groq LLM API with structured context\"\"\"\n    # TODO: build messages array\n    # TODO: POST to Groq API\n    # TODO: return response content\n    return ''\n\nclass SimpleRAG:\n    def __init__(self):\n        self.chunks: List[dict] = []\n        # In production: use sentence-transformers for embeddings\n        # For now: implement simple keyword matching\n\n    def add_document(self, text: str, source: str):\n        \"\"\"Chunk and store a document\"\"\"\n        # TODO: split text into 500-char overlapping chunks\n        # TODO: store with source metadata\n        pass\n\n    def retrieve(self, query: str, top_k: int = 3) -> List[str]:\n        \"\"\"Find most relevant chunks for a query\"\"\"\n        # TODO: simple keyword overlap scoring\n        # Production: use cosine similarity on embeddings\n        return []\n\n    async def answer(self, question: str) -> str:\n        \"\"\"Retrieve context and answer question\"\"\"\n        context = '\\n'.join(self.retrieve(question))\n        return await call_llm(\n            system_prompt='You are a helpful assistant. Answer only from the provided context.',\n            user_message=question,\n            context=context\n        )\n"
    },
    {
        "id": "week-15", "title": "Week 15: Agentic LangGraph", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-6"], "unlocks": ["phase-7"],
        "effort": "15 Hours", "language": "python",
        "mission": "Build multi-step agentic AI workflows using LangGraph for tasks that require planning, tool use, and iteration.",
        "why": "Single LLM calls are chatbots. LangGraph workflows are AI agents that can plan, use tools, and loop until they succeed.",
        "relevance": "The AI Mentor in this platform is designed as a LangGraph agent: it reads state, generates a plan, and proposes actions back to the system.",
        "concepts": ["LangGraph: StateGraph, nodes, edges, conditional routing", "Agent patterns: ReAct, Plan-and-Execute", "Tool use: function calling with LLMs", "State management across agent steps", "Human-in-the-loop patterns"],
        "subtopics": ["Graph compilation and execution", "Streaming intermediate steps", "Error handling in agent loops", "Memory patterns: in-context, external store", "Multi-agent coordination"],
        "examples": "Code review agent, Research assistant with web search tool",
        "practice": ["Build a LangGraph with 3 nodes: plan → execute → verify", "Implement a tool-using agent that can calculate and explain", "Create a human-in-the-loop checkpoint"],
        "mini_build": "Code Review Agent: Given a Python function, the agent reviews it, identifies issues, suggests fixes, and verifies the fix compiles.",
        "assessment": "From memory: Explain the LangGraph execution model — how nodes, edges, and state work together.",
        "exit_criteria": ["Can design any agent workflow as a LangGraph", "Tool calling with structured outputs works reliably", "Agent loops have proper termination conditions"],
        "capability_gained": "Agentic AI workflow design",
        "future_connections": "Unlocks Phase 7 placement preparation and advanced AI engineering",
        "related_projects": ["Code Review Agent", "Research Assistant"],
        "resources": [{"name": "LangGraph Docs", "url": "https://langchain-ai.github.io/langgraph/"}, {"name": "LangGraph Academy", "url": "https://academy.langchain.com/courses/intro-to-langgraph"}],
        "interview_questions": ["What is the difference between LangChain and LangGraph?", "Explain the ReAct agent pattern", "How do you prevent infinite loops in agent workflows?"],
        "reflection_prompts": ["What was the hardest part of designing the agent state?", "How would you add memory to your agent across conversations?"],
        "revision_strategy": "Draw your LangGraph workflow as a directed graph on paper and label every edge condition.",
        "code_template": "# Week 15: LangGraph Agentic Workflows\nfrom langgraph.graph import StateGraph, END\nfrom typing import TypedDict, List\n\n# Define agent state\nclass ReviewState(TypedDict):\n    code: str          # Input code to review\n    issues: List[str]  # Identified issues\n    fixes: List[str]   # Suggested fixes\n    verdict: str       # 'approved' | 'needs_changes'\n\n# Node: Analyze code for issues\ndef analyze_node(state: ReviewState) -> ReviewState:\n    # TODO: call LLM to identify issues\n    # TODO: update state['issues']\n    return state\n\n# Node: Generate fixes\ndef fix_node(state: ReviewState) -> ReviewState:\n    # TODO: call LLM to generate fixes for each issue\n    # TODO: update state['fixes']\n    return state\n\n# Node: Verify fixes\ndef verify_node(state: ReviewState) -> ReviewState:\n    # TODO: call LLM to verify fixes resolve the issues\n    # TODO: set state['verdict']\n    return state\n\n# Conditional edge: route based on verdict\ndef should_continue(state: ReviewState) -> str:\n    if state['verdict'] == 'approved':\n        return 'end'\n    return 'fix'  # Loop back if not approved\n\n# Build the graph\ngraph = StateGraph(ReviewState)\ngraph.add_node('analyze', analyze_node)\ngraph.add_node('fix', fix_node)\ngraph.add_node('verify', verify_node)\n\ngraph.set_entry_point('analyze')\ngraph.add_edge('analyze', 'fix')\ngraph.add_edge('fix', 'verify')\ngraph.add_conditional_edges('verify', should_continue, {'end': END, 'fix': 'fix'})\n\nagent = graph.compile()\n"
    },
    # ── Phase 7: Placement ────────────────────────────────────────────────────
    {
        "id": "phase-7", "title": "Phase 7: Placement Season", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-13", "week-14", "week-15"], "unlocks": ["week-16", "week-17", "week-18"],
        "effort": "60+ Hours", "language": "python",
        "mission": "Convert engineering capability into placement outcomes through system design mastery, DSA fluency, and mock interview preparation.",
        "why": "Engineering skill doesn't convert to a job offer automatically. Placement requires a specific set of communication and demonstration skills.",
        "relevance": "This is the phase that determines your first salary. Every hour here compounds into a better offer.",
        "concepts": ["System design: scalability, reliability, CAP theorem", "DSA: arrays, trees, graphs, DP patterns", "Behavioral interviews: STAR method", "Technical communication: think-aloud protocol", "Resume and portfolio review"],
        "subtopics": ["Load balancers, CDNs, caching", "Database sharding and replication", "LeetCode: sliding window, two pointers, DFS/BFS", "Time and space complexity analysis", "Offer negotiation"],
        "examples": "Design Twitter, Design URL shortener, Two Sum patterns",
        "practice": ["Solve 3 LeetCode problems per day (Easy + Medium focus)", "Design one system from scratch per week", "Complete one mock interview per week"],
        "mini_build": "Interview Preparation Portfolio: System design documents, DSA pattern cheatsheet, and mock interview recordings.",
        "assessment": "Can you design a system end-to-end and explain every decision? Can you solve a Medium LeetCode in under 30 minutes?",
        "exit_criteria": ["Can solve Easy LeetCode in under 15 minutes", "Can design any basic system in under 45 minutes", "Has completed 3 full mock interviews"],
        "capability_gained": "Interview-ready engineering communication and problem-solving",
        "future_connections": "Unlocks career and professional growth",
        "related_projects": ["Interview Prep Portfolio", "System Design Documents"],
        "resources": [{"name": "NeetCode 150", "url": "https://neetcode.io/"}, {"name": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer"}, {"name": "Pramp Mock Interviews", "url": "https://www.pramp.com/"}],
        "interview_questions": ["Design a URL shortener for 100M users", "What is the difference between horizontal and vertical scaling?", "Explain the CAP theorem with a real example"],
        "reflection_prompts": ["What mock interview feedback surprised you the most?", "Which DSA pattern took the longest to internalize?"],
        "revision_strategy": "Do a timed system design session — 45 minutes, no reference.",
        "code_template": "# Phase 7: DSA Practice\n# Solve these from memory — no AI, no reference\n\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    \"\"\"Find two indices that sum to target. O(n) time.\"\"\"\n    # TODO: hash map approach\n    pass\n\ndef max_sliding_window(nums: list[int], k: int) -> list[int]:\n    \"\"\"Max value in each window of size k. O(n) time.\"\"\"\n    # TODO: deque approach\n    pass\n\ndef number_of_islands(grid: list[list[str]]) -> int:\n    \"\"\"Count islands in a 2D grid. O(m*n) time.\"\"\"\n    # TODO: DFS approach\n    pass\n\n# Test\nprint(two_sum([2, 7, 11, 15], 9))      # [0, 1]\nprint(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # [3,3,5,5,6,7]\nprint(number_of_islands([['1','1','0'],['0','1','0'],['0','0','1']]))  # 2\n"
    },
    {
        "id": "week-16", "title": "Week 16: System Design", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-7"], "unlocks": ["phase-8"],
        "effort": "15 Hours", "language": "python",
        "mission": "Master system design fundamentals to design scalable, reliable distributed systems in interviews.",
        "why": "System design is the primary differentiator between junior and senior offers. Companies pay significantly more for engineers who can design at scale.",
        "relevance": "Every application you build will eventually need to scale. Understanding these patterns makes you a better engineer right now.",
        "concepts": ["Scalability: horizontal vs vertical", "Load balancers: round-robin, least connections", "Caching: Redis, CDN, cache invalidation strategies", "Database: replication, sharding, read replicas", "Message queues: Kafka, RabbitMQ for async processing"],
        "subtopics": ["CAP theorem: Consistency, Availability, Partition Tolerance", "API gateway patterns", "Rate limiting algorithms: token bucket, leaky bucket", "Content Delivery Networks", "Monitoring: metrics, logs, traces"],
        "examples": "Design URL shortener, Design Twitter timeline",
        "practice": ["Design a URL shortener from scratch (whiteboard)", "Design a notification system for 10M users", "Analyze the trade-offs of 3 different caching strategies"],
        "mini_build": "System Design Document: Three complete designs with architecture diagrams, capacity estimates, and trade-off analysis.",
        "assessment": "45-minute timed session: Design Instagram Stories with capacity planning, component selection, and failure modes.",
        "exit_criteria": ["Can structure any system design answer in under 5 minutes", "Always discusses trade-offs, not just solutions", "Capacity planning calculations are quick and accurate"],
        "capability_gained": "Distributed systems design and technical communication",
        "future_connections": "Unlocks Week 17 DSA sprint and placement execution",
        "related_projects": ["System Design Document Portfolio"],
        "resources": [{"name": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer"}, {"name": "ByteByteGo Blog", "url": "https://blog.bytebytego.com/"}, {"name": "Designing Data-Intensive Applications", "url": "https://dataintensive.net/"}],
        "interview_questions": ["Design a rate limiter for 1M req/sec", "Explain the difference between SQL and NoSQL trade-offs", "How would you design a notification system?"],
        "reflection_prompts": ["Which design challenge was hardest to make trade-offs on?", "What would you do differently on your first system design?"],
        "revision_strategy": "Design the URL shortener from memory, including capacity numbers.",
        "code_template": "# Week 16: System Design — Rate Limiter Implementation\n# Implementing the Token Bucket algorithm\n\nimport time\nfrom threading import Lock\n\nclass TokenBucketRateLimiter:\n    \"\"\"Token Bucket rate limiter — allows burst traffic\"\"\"\n\n    def __init__(self, rate: int, capacity: int):\n        \"\"\"\n        rate: tokens added per second\n        capacity: maximum tokens (burst limit)\n        \"\"\"\n        self.rate = rate\n        self.capacity = capacity\n        self.tokens = capacity\n        self.last_refill = time.monotonic()\n        self.lock = Lock()\n\n    def _refill(self):\n        \"\"\"Add tokens based on elapsed time\"\"\"\n        # TODO: calculate elapsed time\n        # TODO: add rate * elapsed tokens\n        # TODO: cap at capacity\n        pass\n\n    def allow(self) -> bool:\n        \"\"\"Return True if request should be allowed\"\"\"\n        with self.lock:\n            # TODO: refill first\n            # TODO: check if token available\n            # TODO: consume token if yes\n            return False\n\n# Test\nlimiter = TokenBucketRateLimiter(rate=10, capacity=20)\nresults = [limiter.allow() for _ in range(25)]\nprint(f'Allowed: {sum(results)}/25')  # Should be 20 initially\n"
    },
    {
        "id": "week-17", "title": "Week 17: LeetCode Sprint", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-7"], "unlocks": ["phase-8"],
        "effort": "20 Hours", "language": "python",
        "mission": "Build DSA problem-solving speed and pattern recognition for technical interviews.",
        "why": "DSA is tested in every technical interview. Pattern recognition — not memorization — is what lets you solve new problems under pressure.",
        "relevance": "Every company you apply to will have a coding assessment. This week determines whether you pass it.",
        "concepts": ["Arrays & Hashing: HashMap O(1) lookups", "Two Pointers: sorted arrays, linked lists", "Sliding Window: substring, subarray problems", "Binary Search: sorted arrays, answer range", "Tree DFS/BFS: recursive and iterative"],
        "subtopics": ["Stack and Queue patterns", "Dynamic programming: memoization, tabulation", "Backtracking: generate all combinations", "Graph algorithms: topological sort, Dijkstra", "Bit manipulation basics"],
        "examples": "Two Sum (hash map), Longest Substring Without Repeats (sliding window), Binary Search Rotated Array",
        "practice": ["Solve NeetCode 150: Array + Hashing section (9 problems)", "Solve NeetCode 150: Two Pointers section (5 problems)", "Solve NeetCode 150: Sliding Window section (6 problems)", "Solve NeetCode 150: Binary Search section (7 problems)"],
        "mini_build": "DSA Pattern Cheatsheet: Personal reference document with code templates for each pattern.",
        "assessment": "Solve 3 random Medium LeetCode problems in under 90 minutes total, unseen problems.",
        "exit_criteria": ["All Easy LeetCode problems in target list solved", "Median time per Easy: under 15 minutes", "Median time per Medium: under 30 minutes"],
        "capability_gained": "DSA pattern recognition and interview problem-solving speed",
        "future_connections": "Unlocks Week 18 mock interviews and placement execution",
        "related_projects": ["DSA Pattern Cheatsheet"],
        "resources": [{"name": "NeetCode 150", "url": "https://neetcode.io/practice"}, {"name": "LeetCode", "url": "https://leetcode.com/"}, {"name": "Blind 75", "url": "https://neetcode.io/roadmap"}],
        "interview_questions": ["What is the time complexity of your solution?", "Can you optimize the space complexity?", "What edge cases did you consider?"],
        "reflection_prompts": ["Which pattern took the longest to recognize automatically?", "What is your systematic approach when you see a new problem?"],
        "revision_strategy": "Solve the 5 hardest problems you've solved, timed, without any notes.",
        "code_template": "# Week 17: DSA Patterns\n# Practice all patterns — no AI, no solutions lookup\n\n# Pattern 1: Sliding Window\ndef length_of_longest_substring(s: str) -> int:\n    \"\"\"LeetCode 3 — O(n) time, O(min(m,n)) space\"\"\"\n    # TODO: sliding window with character set\n    pass\n\n# Pattern 2: Two Pointers\ndef container_with_most_water(height: list[int]) -> int:\n    \"\"\"LeetCode 11 — O(n) time, O(1) space\"\"\"\n    # TODO: two pointers from both ends\n    pass\n\n# Pattern 3: Binary Search\ndef search_rotated_array(nums: list[int], target: int) -> int:\n    \"\"\"LeetCode 33 — O(log n) time\"\"\"\n    # TODO: modified binary search\n    pass\n\n# Pattern 4: Tree DFS\ndef max_depth(root) -> int:\n    \"\"\"LeetCode 104 — O(n) time\"\"\"\n    # TODO: recursive DFS\n    pass\n\n# Test\nprint(length_of_longest_substring('abcabcbb'))  # 3\nprint(container_with_most_water([1,8,6,2,5,4,8,3,7]))  # 49\nprint(search_rotated_array([4,5,6,7,0,1,2], 0))  # 4\n"
    },
    {
        "id": "week-18", "title": "Week 18: Mock Interviews & Funnel", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-7"], "unlocks": ["phase-8"],
        "effort": "15 Hours", "language": "python",
        "mission": "Execute mock interviews, refine communication under pressure, and start the placement application funnel.",
        "why": "All the preparation only converts when you can perform under pressure. Mock interviews build the specific skill of thinking out loud while solving.",
        "relevance": "The placement offer is the goal of the entire roadmap. This week determines whether you get one.",
        "concepts": ["Think-aloud protocol: narrate your reasoning while coding", "STAR method for behavioral questions", "Application funnel management: Tier A, B, C targeting", "Resume and portfolio final review", "Salary negotiation basics"],
        "subtopics": ["Whiteboard problem-solving structure", "Handling confusion gracefully", "Asking clarifying questions first", "Cover letter personalization", "LinkedIn optimization"],
        "examples": "Mock coding interview recording, System design whiteboard session",
        "practice": ["Complete 3 mock coding interviews on Pramp", "Record yourself solving a Medium LeetCode problem", "Apply to 20 companies in Tier B and C categories"],
        "mini_build": "Placement Execution Dashboard: Application tracker, interview calendar, and daily activity log.",
        "assessment": "Complete 3 mock interviews with external reviewers and incorporate all feedback.",
        "exit_criteria": ["3 mock interviews completed with feedback incorporated", "20+ applications submitted", "Resume reviewed by at least one professional"],
        "capability_gained": "Interview performance under pressure",
        "future_connections": "Unlocks Phase 8 Professional Growth",
        "related_projects": ["Placement Execution Dashboard"],
        "resources": [{"name": "Pramp", "url": "https://www.pramp.com/"}, {"name": "Interviewing.io", "url": "https://interviewing.io/"}, {"name": "Levels.fyi", "url": "https://www.levels.fyi/"}],
        "interview_questions": ["Tell me about yourself (1 minute version)", "Describe a challenging technical problem you solved", "Why this company?"],
        "reflection_prompts": ["What feedback from mock interviews surprised you most?", "What would you do differently if starting placement preparation over?"],
        "revision_strategy": "Complete one more mock interview focusing on your weakest area.",
        "code_template": "# Week 18: Interview Practice\n# Think out loud as you solve — narrate every decision\n\ndef solve_problem(input_data):\n    \"\"\"\n    Step 1: Clarify the problem\n    - What are the constraints? (size, values, edge cases)\n    - What should I return? (index, value, boolean)\n    - What edge cases matter? (empty, single element, duplicates)\n\n    Step 2: Think through approaches\n    - Brute force: O(?) time, O(?) space\n    - Optimal: O(?) time, O(?) space\n    - Why is the optimal better?\n\n    Step 3: Code the solution\n    Step 4: Test with examples\n    Step 5: Analyze complexity\n    \"\"\"\n    pass\n\n# Practice: Two Sum (say everything out loud as you solve)\ndef two_sum_interview(nums: list[int], target: int) -> list[int]:\n    # TODO: solve while narrating your reasoning\n    pass\n"
    },
    # ── Phase 8: Career ────────────────────────────────────────────────────────
    {
        "id": "phase-8", "title": "Phase 8: Career Engine", "type": "phase",
        "track": "python-fullstack",
        "prerequisites": ["week-16", "week-17", "week-18"], "unlocks": ["week-19", "week-20"],
        "effort": "Ongoing", "language": "python",
        "mission": "Build a compounding engineering career through professional onboarding, team engineering, and long-term capability development.",
        "why": "The goal was never just placement. The goal is a career that compounds. What you do in the first 90 days determines your reputation for the next 2 years.",
        "relevance": "Volume 5 covers everything in this phase. You have earned access to it.",
        "concepts": ["Professional onboarding: 30/60/90 day plan", "Codebase navigation in large production systems", "Code review: giving and receiving feedback", "Technical documentation: ADRs, RFCs", "Open source contribution strategy"],
        "subtopics": ["Reading unfamiliar codebases", "Asking good questions in PRs", "Time management in a professional environment", "Building relationships with senior engineers", "Career laddering and promotion criteria"],
        "examples": "First PR to a production codebase, First code review on a colleague's PR",
        "practice": ["Complete your 30-day onboarding plan by day 30", "Submit your first PR within the first week", "Complete one open source contribution in the first month"],
        "mini_build": "Professional Portfolio Update: Resume, LinkedIn, GitHub, and case studies updated to reflect professional engineering experience.",
        "assessment": "Can you explain your professional impact in measurable terms after 90 days?",
        "exit_criteria": ["Productive contributor within 30 days", "First open source contribution merged", "Engineering reputation established within the team"],
        "capability_gained": "Professional engineering growth and compounding career architecture",
        "future_connections": "Ongoing — this phase never ends",
        "related_projects": ["Open Source Contributions", "Technical Documentation Portfolio"],
        "resources": [{"name": "Volume 5 Professional Growth", "url": "docs/05-Professional-Growth.md"}, {"name": "The Pragmatic Programmer", "url": "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"}, {"name": "Staff Engineer Book", "url": "https://staffeng.com/book"}],
        "interview_questions": ["How do you approach a codebase you've never seen before?", "Describe your process for giving code review feedback", "What does a 30/60/90 day onboarding plan look like for you?"],
        "reflection_prompts": ["What is your biggest professional growth area right now?", "How has your engineering identity evolved from Month 1?"],
        "revision_strategy": "Review all 8 phases. What do you know now that you wish you'd known on Day 1?",
        "code_template": "# Phase 8: Professional Engineering\n# No template — this is real work now.\n# Your task is to read and understand real production code,\n# not practice exercises.\n\n# When reading a new codebase, answer these questions:\n# 1. What is the entry point? (main.py, app.py, index.ts?)\n# 2. How is the project structured? (MVC, feature-based, layer-based?)\n# 3. How does data flow? (request → router → service → db → response)\n# 4. How is authentication handled?\n# 5. How are tests organized and run?\n# 6. What is the deployment process?\n\n# First PR checklist:\n# - Does it solve the stated problem?\n# - Does it have tests?\n# - Does it have documentation?\n# - Does it follow the project's coding style?\n# - Is the commit message descriptive?\n# - Has it been self-reviewed?\nprint('You have completed the Engineering Journey.')\nprint('Now build things that matter.')\n"
    },
    {
        "id": "week-19", "title": "Week 19: Onboarding Excellence", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["phase-8"], "unlocks": ["week-20"],
        "effort": "Ongoing", "language": "python",
        "mission": "Execute a structured 90-day onboarding plan to ramp up faster than any peer at the same level.",
        "why": "The first 90 days determine your reputation for the next 2 years. Engineers who onboard well get the best projects.",
        "relevance": "You built the technical skills. Now you build the professional ones.",
        "concepts": ["30/60/90 day planning", "Codebase archaeology: reading unfamiliar code", "Asking the right questions (not the obvious ones)", "Building relationships with senior engineers", "Understanding the product domain quickly"],
        "subtopics": ["Git history as documentation", "Comment-driven code navigation", "Stakeholder communication", "Prioritizing learning vs delivering", "Shadow sessions with senior engineers"],
        "examples": "First week discovery log, 30-day learning plan",
        "practice": ["Write a 30/60/90 day plan before your first day", "Read the git history of the main module on day 1", "Identify 3 senior engineers to shadow in the first week"],
        "mini_build": "Onboarding Documentation: Your first-week discoveries, key system explanations, and knowledge gaps documented for the next new hire.",
        "assessment": "By day 30, you should have shipped at least one small improvement to production.",
        "exit_criteria": ["First PR merged within week 1", "Codebase architecture understood by week 2", "First solo feature completed by week 4"],
        "capability_gained": "Professional engineering onboarding",
        "future_connections": "Unlocks Week 20 team engineering and collaboration",
        "related_projects": ["Onboarding Documentation"],
        "resources": [{"name": "Volume 5 Chapter 2: Team Engineering", "url": "docs/05-Professional-Growth.md"}],
        "interview_questions": ["How would you approach a new codebase you've never seen?", "Describe your first week at a new job"],
        "reflection_prompts": ["What did you learn about the team culture in week 1?", "What would you add to the onboarding documentation?"],
        "revision_strategy": "Update your onboarding documentation with everything you know now vs. day 1.",
        "code_template": "# Week 19: Onboarding — Codebase Navigation\n\n# Day 1 script: explore the codebase systematically\nimport subprocess\nimport os\n\ndef explore_repo():\n    \"\"\"Systematic first look at a new codebase\"\"\"\n\n    # 1. Understand the project structure\n    print('=== Project Structure ===')\n    # TODO: list top-level directories\n\n    # 2. Find the entry point\n    print('=== Entry Points ===')\n    # TODO: look for main.py, app.py, index.ts, etc.\n\n    # 3. Check recent git activity\n    print('=== Recent Changes ===')\n    # TODO: git log --oneline -20\n\n    # 4. Find the largest files (most complex)\n    print('=== Complex Files ===')\n    # TODO: find files > 200 lines\n\n    # 5. Identify test patterns\n    print('=== Test Structure ===')\n    # TODO: find test directories and run the test suite\n\nexplore_repo()\n"
    },
    {
        "id": "week-20", "title": "Week 20: Team Engineering", "type": "week",
        "track": "python-fullstack",
        "prerequisites": ["week-19"], "unlocks": [],
        "effort": "Ongoing", "language": "python",
        "mission": "Master the engineering skills that matter in teams: code review, documentation, collaboration, and open source.",
        "why": "Individual coding ability is table stakes. Team engineering is what makes you valuable at scale.",
        "relevance": "Every senior engineer you admire built their reputation through excellent team engineering — not just excellent code.",
        "concepts": ["Code review: author responsibilities, reviewer responsibilities", "Technical documentation: ADRs, RFCs, runbooks", "Pull request culture: small PRs, clear descriptions", "Open source: finding issues, contributing safely", "Engineering communication: writing clearly for technical audiences"],
        "subtopics": ["Giving feedback that is specific and actionable", "Receiving feedback gracefully", "Documentation that doesn't go stale", "Commit message conventions", "Building an engineering reputation through GitHub"],
        "examples": "First OSS PR, Technical design document, Code review with detailed feedback",
        "practice": ["Review 3 open source PRs in projects you use", "Write an ADR (Architecture Decision Record) for a decision you made", "Submit your first open source contribution"],
        "mini_build": "Open Source Contribution: At least one merged PR in a real project (not toy repo).",
        "assessment": "You have shipped a feature, written documentation for it, and had your code reviewed by a senior engineer.",
        "exit_criteria": ["At least one open source PR merged", "ADR written for a real architectural decision", "Code review given and received gracefully"],
        "capability_gained": "Team engineering and professional collaboration",
        "future_connections": "The journey continues — this is now your career",
        "related_projects": ["Open Source Contributions", "Team Technical Documentation"],
        "resources": [{"name": "How to Write a Git Commit Message", "url": "https://cbea.ms/git-commit/"}, {"name": "Conventional Commits", "url": "https://www.conventionalcommits.org/"}, {"name": "How to Contribute to Open Source", "url": "https://opensource.guide/how-to-contribute/"}],
        "interview_questions": ["Describe your code review philosophy", "How do you write documentation that people actually read?", "What open source contributions have you made?"],
        "reflection_prompts": ["What would you change about your team's code review process?", "How has your writing clarity changed since Week 1?"],
        "revision_strategy": "Re-read your Week 1 code. What would you do differently now?",
        "code_template": "# Week 20: Team Engineering — Code Review Checklist\n\n# As Author:\nauthor_checklist = [\n    'PR description explains WHY, not just WHAT',\n    'PR is small enough to review in under 30 minutes',\n    'All tests pass',\n    'Documentation updated if behavior changed',\n    'No debug prints or commented-out code',\n    'Self-reviewed before requesting review',\n    'Related issues linked',\n]\n\n# As Reviewer:\nreviewer_checklist = [\n    'Does it solve the stated problem?',\n    'Are there edge cases not handled?',\n    'Is the approach the right one (not just A correct one)?',\n    'Are variable names clear without comments?',\n    'Is there a simpler way to achieve the same result?',\n    'Is the error handling correct?',\n    'Does it have sufficient test coverage?',\n]\n\n# Feedback quality check:\ndef is_good_feedback(comment: str) -> bool:\n    \"\"\"Good feedback is specific, actionable, and kind\"\"\"\n    # TODO: check if comment has a specific suggestion\n    # TODO: check if it explains WHY not just WHAT\n    # TODO: check if it offers an alternative\n    return True\n\nprint('Engineering journey complete. Build things that matter.')\n"
    },
]


def _build_from_manifest() -> Dict[str, TopicObject]:
    """Build the topic cache from the embedded manifest."""
    topics: Dict[str, TopicObject] = {}
    for entry in CURRICULUM_MANIFEST:
        topic_id = entry["id"]
        # Synthesize the AI context string
        ai_context = (
            f"Topic: {entry['title']}\n"
            f"Mission: {entry['mission']}\n"
            f"Why: {entry['why']}\n"
            f"Engineering Relevance: {entry['relevance']}\n"
            f"Concepts: {', '.join(entry.get('concepts', []))}\n"
            f"Capability Gained: {entry.get('capability_gained', '')}\n"
            f"Future Connections: {entry.get('future_connections', '')}\n"
            f"Prerequisites: {', '.join(entry.get('prerequisites', []))}\n"
            f"Unlocks: {', '.join(entry.get('unlocks', []))}\n"
            f"Effort: {entry.get('effort', '')}\n"
            f"Assessment: {entry.get('assessment', '')}\n"
        )
        topics[topic_id] = {**entry, "ai_context": ai_context}
    return topics


# ─────────────────────────────────────────────────────────────────────────────
# DAG Layout Engine
# ─────────────────────────────────────────────────────────────────────────────

def _topological_layers(topics: Dict[str, TopicObject]) -> Dict[str, int]:
    """
    Assign each topic a layer number based on its longest prerequisite path.
    Layer 0 = no prerequisites (root nodes).
    """
    layers: Dict[str, int] = {}
    
    def get_layer(tid: str, visited: set) -> int:
        if tid in layers:
            return layers[tid]
        if tid in visited:
            # Cycle detected — treat as layer 0
            return 0
        visited.add(tid)
        topic = topics.get(tid)
        if not topic or not topic.get("prerequisites"):
            layers[tid] = 0
            return 0
        prereq_layers = [get_layer(p, visited) for p in topic["prerequisites"] if p in topics]
        layer = (max(prereq_layers) + 1) if prereq_layers else 0
        layers[tid] = layer
        return layer

    for tid in topics:
        get_layer(tid, set())
    
    return layers


def _compute_layout(topics: Dict[str, TopicObject]) -> tuple[List[GraphNode], List[GraphEdge]]:
    """
    Compute (x, y) coordinates using layered DAG layout.
    Returns (nodes, edges).
    """
    layers = _topological_layers(topics)
    
    # Group topics by layer
    layer_groups: Dict[int, List[str]] = {}
    for tid, layer in layers.items():
        layer_groups.setdefault(layer, []).append(tid)
    
    # Sort each layer: phases first, then weeks
    for layer in layer_groups:
        layer_groups[layer].sort(key=lambda t: (
            0 if topics[t]["type"] == "phase" else 1,
            t
        ))

    # Assign coordinates
    CANVAS_CENTER_X = 500
    VERTICAL_STEP = 130
    HORIZONTAL_STEP = 190
    PHASE_HEIGHT = 50
    WEEK_HEIGHT = 44
    PHASE_WIDTH = 200
    WEEK_WIDTH = 165

    nodes: List[GraphNode] = []

    for layer_num in sorted(layer_groups.keys()):
        tids = layer_groups[layer_num]
        count = len(tids)
        total_width = count * HORIZONTAL_STEP
        start_x = CANVAS_CENTER_X - total_width / 2

        for i, tid in enumerate(tids):
            topic = topics[tid]
            is_phase = topic["type"] == "phase"
            w = PHASE_WIDTH if is_phase else WEEK_WIDTH
            h = PHASE_HEIGHT if is_phase else WEEK_HEIGHT

            # Center each node within its column slot
            x = start_x + i * HORIZONTAL_STEP + (HORIZONTAL_STEP - w) / 2
            y = layer_num * VERTICAL_STEP + 40

            nodes.append({
                "id": tid,
                "label": topic["title"],
                "type": topic["type"],
                "track": topic.get("track", "python-fullstack"),
                "status_gate": topic.get("status_gate", None),
                "x": int(x),
                "y": int(y),
                "width": w,
                "height": h,
                "prerequisites": topic.get("prerequisites", []),
                "unlocks": topic.get("unlocks", []),
                "effort": topic.get("effort", ""),
                "language": topic.get("language", "python"),
                "relevance": topic.get("relevance", ""),
                "capability": topic.get("capability_gained", ""),
                "projects": ", ".join(topic.get("related_projects", [])) if isinstance(topic.get("related_projects"), list) else topic.get("related_projects", ""),
            })

    # Build edges from prerequisites
    edges: List[GraphEdge] = []
    for tid, topic in topics.items():
        for prereq in topic.get("prerequisites", []):
            if prereq in topics:
                edges.append({"from": prereq, "to": tid})

    return nodes, edges


# ─────────────────────────────────────────────────────────────────────────────
# Public API
# ─────────────────────────────────────────────────────────────────────────────

def initialize(docs_path: Optional[str] = None):
    """
    Load and parse all knowledge sources.
    Call once at application startup.
    """
    global _topics_cache, _graph_nodes_cache, _graph_edges_cache, _initialized

    logger.info("Knowledge Engine: Initializing...")

    # Build from manifest (guaranteed baseline)
    _topics_cache = _build_from_manifest()

    # If docs_path provided, try to augment from markdown files
    if docs_path and os.path.isdir(docs_path):
        _augment_from_docs(docs_path)

    # Compute graph layout from topic dependency graph
    _graph_nodes_cache, _graph_edges_cache = _compute_layout(_topics_cache)

    _initialized = True
    logger.info(f"Knowledge Engine: Loaded {len(_topics_cache)} topics, {len(_graph_nodes_cache)} nodes, {len(_graph_edges_cache)} edges.")


def _augment_from_docs(docs_path: str):
    """Try to augment topics from markdown files with frontmatter."""
    global _topics_cache

    if frontmatter is None:
        logger.warning("Knowledge Engine: python-frontmatter not available — skipping doc augmentation.")
        return

    for md_file in Path(docs_path).glob("*.md"):
        try:
            post = frontmatter.load(str(md_file))
            fm = post.metadata
            tid = fm.get("id")
            if not tid or tid not in _topics_cache:
                continue  # Only augment known topics
            
            sections = _extract_sections(post.content)
            
            # Override manifest fields with doc content where present
            updates = {}
            if "mission" in sections:
                updates["mission"] = _clean_text(sections["mission"])
            if "why" in sections:
                updates["why"] = _clean_text(sections["why"])
            if "concepts" in sections:
                updates["concepts"] = _section_to_list(sections["concepts"])
            if "practice" in sections:
                updates["practice"] = _section_to_list(sections["practice"])
            if "mini build" in sections:
                updates["mini_build"] = sections["mini build"]
            if "assessment" in sections:
                updates["assessment"] = sections["assessment"]
            if "exit criteria" in sections:
                updates["exit_criteria"] = _section_to_list(sections["exit criteria"])
            if "resources" in sections:
                updates["resources"] = _section_to_list(sections["resources"])
            
            if updates:
                _topics_cache[tid].update(updates)
                logger.debug(f"Knowledge Engine: Augmented topic {tid} from {md_file.name}")

        except Exception as e:
            logger.warning(f"Knowledge Engine: Could not parse {md_file}: {e}")


def get_all_topics() -> Dict[str, TopicObject]:
    """Return all parsed topic objects."""
    if not _initialized:
        initialize()
    return _topics_cache


def get_topic(topic_id: str) -> Optional[TopicObject]:
    """Return a single topic object by ID."""
    if not _initialized:
        initialize()
    return _topics_cache.get(topic_id)


def get_graph() -> dict:
    """Return the complete dependency graph with layout coordinates."""
    if not _initialized:
        initialize()
    return {
        "nodes": _graph_nodes_cache,
        "edges": _graph_edges_cache,
        "total_topics": len(_topics_cache),
    }


def get_prerequisites_met(topic_id: str, completed_topics: List[str]) -> bool:
    """Check if all prerequisites for a topic are in completed_topics."""
    if not _initialized:
        initialize()
    topic = _topics_cache.get(topic_id)
    if not topic:
        return False
    return all(p in completed_topics for p in topic.get("prerequisites", []))


def get_unlockable_topics(completed_topics: List[str]) -> List[str]:
    """Return topic IDs that are newly unlockable given completed_topics."""
    if not _initialized:
        initialize()
    result = []
    for tid, topic in _topics_cache.items():
        if tid in completed_topics:
            continue
        prereqs = topic.get("prerequisites", [])
        if all(p in completed_topics for p in prereqs):
            result.append(tid)
    return result


def get_ai_context_for_topic(topic_id: str) -> str:
    """
    Return a rich AI context string for a topic,
    suitable for injection into the AI system prompt.
    """
    topic = get_topic(topic_id)
    if not topic:
        return f"Topic '{topic_id}' not found in Knowledge Engine."
    return topic.get("ai_context", "")


def format_recommendation_context(next_task_id: str, completed_topics: List[str]) -> dict:
    """
    Build rich recommendation context from the knowledge graph,
    explaining WHY the recommendation is being made.
    """
    topic = get_topic(next_task_id)
    if not topic:
        return {}

    prereqs_met = [p for p in topic.get("prerequisites", []) if p in completed_topics]
    unlocks = topic.get("unlocks", [])
    unlock_titles = [
        get_topic(u)["title"] if get_topic(u) else u
        for u in unlocks
    ]

    justification_parts = [
        f"**{topic['title']}** is your next recommended topic.",
        f"**Why now**: {topic.get('why', '')}",
    ]
    if prereqs_met:
        prereq_titles = [get_topic(p)["title"] if get_topic(p) else p for p in prereqs_met]
        justification_parts.append(f"**Prerequisites met**: {', '.join(prereq_titles)}")
    if unlock_titles:
        justification_parts.append(f"**This unlocks**: {', '.join(unlock_titles)}")
    justification_parts.append(f"**Estimated effort**: {topic.get('effort', 'Unknown')}")
    justification_parts.append(f"**Capability gained**: {topic.get('capability_gained', '')}")

    return {
        "taskId": next_task_id,
        "title": topic["title"],
        "justification": "\n\n".join(justification_parts),
        "capabilityImproved": topic.get("capability_gained", ""),
        "milestoneUnlocked": f"Unlocks: {', '.join(unlock_titles)}" if unlock_titles else "Next phase",
        "effort": topic.get("effort", ""),
        "missionStatement": topic.get("mission", ""),
        "engineeringRelevance": topic.get("relevance", ""),
    }
