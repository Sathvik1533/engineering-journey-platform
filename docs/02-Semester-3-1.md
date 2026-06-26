**PRINCIPAL ENGINEERING ROADMAP**

**MASTER EDITION**

**Volume 2 --- Semester 3-1 Engineering Journey**

─────────────────────────────────────────────

  ------------------- ----------------------------------------------
  **Field**           **Detail**

  Student             Kotagiri Sathwik

  Institution         MLR Institute of Technology, Hyderabad

  Semester            3rd Year, 1st Semester (3-1)

  Volume Period       6 July 2026 -- 5 December 2026

  Continues From      Volume 1 --- Executive Foundation

  Document Status     Frozen After Approval --- Volume 2 of 5
  ------------------- ----------------------------------------------

*Months 1--4. Full-stack foundations. From Python confidence to React +
TypeScript.*

**CHAPTER 1 --- VOLUME 2 OVERVIEW**

Volume 1 established the philosophy, the timeline, and the buffer
period. You have completed 11 days of deliberate Python and SQL
practice. You have committed over 70 programs to GitHub. You can write
functions, build packages, handle exceptions, use OOP, run async code,
and solve business SQL problems from scratch.

Volume 2 is where you become a full-stack developer. Over five months
--- 6 July through 5 December 2026 --- you will complete Python, master
SQL at a professional level, build complete frontend applications in
HTML, CSS, JavaScript, and React with TypeScript, and arrive at the
FastAPI boundary ready to build production backends from Day 1 of
Semester 3-2.

This volume covers four months of Semester 3-1 in full detail: weekly
objectives, daily missions for every phase, topic breakdowns, mini
builds, assessments, and exit criteria.

**What Volume 2 Produces**

  -------------------------- -------------------------------------------
  **Outcome**                **Details**

  Python: Professionally     Can write and organise any backend Python
  confident                  without reference

  SQL: Interview-ready       Window functions, query optimization,
                             business SQL --- all fluent

  HTML + CSS:                Semantic HTML, responsive CSS layouts ---
  Implementation-confident   built from scratch

  JavaScript: Core language  DOM, async/await, modules, API calls ---
  mastery                    comfortable implementation

  React + TypeScript:        Components, hooks, routing, state
  Production-capable         management, typed props

  Git + GitHub: Professional Branching, meaningful commits, PRs,
  workflow                   portfolio-ready repositories

  Daily engineering habit    Consistent 3--4 hour focused sessions every
                             single day
  -------------------------- -------------------------------------------

**Volume 2 Month Map**

  ------------ ------------------- ---------------------------------
  **Month**    **Dates**           **Core Focus**

  Month 1      6 Jul -- 2 Aug 2026 Python Completion + SQL Mastery

  Month 2      3 Aug -- 30 Aug     HTML + CSS + JS Foundation
               2026                

  Mid-1 Exams  31 Aug -- 5 Sep     Slow down --- revision + DSA only
               2026                

  Month 3      7 Sep -- 4 Oct 2026 JS Completion + React Begins +
                                   CRT Starts

  Month 4      5 Oct -- 1 Nov 2026 React + TypeScript

  Mid-2 Exams  2 Nov -- 7 Nov 2026 Slow down --- revision + DSA only

  Semester End 16 Nov -- 28 Nov    SEE Exams --- DSA maintenance
               2026                only

  Semester     30 Nov -- 5 Dec     Rest + light review
  Break        2026                
  ------------ ------------------- ---------------------------------

+-----------------------------------------------------------------+
| **🔒 Rule**                                                     |
|                                                                 |
| The AI Role Rule from Volume 1 remains in full effect           |
| throughout this volume.                                         |
|                                                                 |
| Month 1--2: AI explains concepts only. You write ALL code       |
| manually.                                                       |
|                                                                 |
| Month 3: AI provides hints when you are stuck. You attempt      |
| independently first.                                            |
|                                                                 |
| Month 4: AI reviews your code after you have built it. You      |
| drive all decisions.                                            |
+-----------------------------------------------------------------+

**CHAPTER 2 --- MONTH 1 PYTHON COMPLETION + SQL MASTERY 6 July -- 2
August 2026**

**Month 1 Objective**

Buffer period gave you Python fundamentals through OOP and async. Month
1 closes every remaining Python gap --- iterators, generators,
decorators, context managers, testing, and professional project
structure --- then elevates your SQL from interview-ready to
production-grade. By 2 August, Python is a closed chapter. You will
never need to revisit it as a learning topic again --- only apply it.

**Month 1 Weekly Breakdown**

  ---------- ---------------- ----------------------------------------
  **Week**   **Dates**        **Focus**

  Week 1     6 Jul -- 12 Jul  Python: Iterators, Generators,
                              Comprehensions, Functional Python

  Week 2     13 Jul -- 19 Jul Python: Decorators, Context Managers,
                              Testing with pytest

  Week 3     20 Jul -- 26 Jul SQL: Production SQL --- Transactions,
                              Constraints, Schema Design

  Week 4     27 Jul -- 2 Aug  Integration: Python + SQL + Mini Project
                              0
  ---------- ---------------- ----------------------------------------

**Month 1 --- Week 1 \| 6--12 July 2026**

**Python: Iterators, Generators, Comprehensions, Functional Python**

+-----------------------------------------------------------------+
| **🎯 WEEK 1 --- 6--12 July 2026**                               |
|                                                                 |
| **MISSION: Close the Python gap between \"writing programs\"    |
| and \"writing Pythonic software\"**                             |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

You can write Python. You cannot yet write Python the way production
engineers do. Generators replace memory-heavy list processing in backend
services. Decorators are how FastAPI defines routes, handles
authentication, and logs requests. Context managers handle database
connections. These are not advanced topics --- they are the normal tools
of every professional Python codebase you will read, maintain, and build
during placement and work.

**Topics and Subtopics**

**Day 12 (Monday 6 Jul) --- Iterators and Generators**

- Iterables vs iterators --- \_\_iter\_\_ and \_\_next\_\_ protocol

- Creating custom iterators with a class

- Generator functions --- yield keyword, lazy evaluation

- Generator expressions --- (x for x in \...) vs list comprehensions

- yield from --- delegating to sub-generators

- Infinite generators --- count(), cycle() from itertools

- When to choose generator over list --- memory implications

Real-World Connection: FastAPI streaming responses use generators. Large
dataset processing in analytics backends uses generators to avoid
loading 100k rows into memory at once. The SQLAlchemy ORM yields
database rows lazily using the same protocol.

**Day 13 (Tuesday 7 Jul) --- Advanced Comprehensions + Functional
Python**

- Nested list comprehensions --- flattening 2D data

- Dict comprehensions with conditional filtering

- Set comprehensions --- deduplication in one line

- map() and filter() --- when they read better than comprehensions

- functools: reduce(), partial(), lru_cache

- operator module --- itemgetter, attrgetter for sorting

- sorted() with complex keys --- sort list of dicts by multiple fields

Real-World Connection: lru_cache becomes your first caching layer in
FastAPI before Redis is introduced. sorted() with itemgetter is how you
order database results in memory for paginated API responses.

**Day 14 (Wednesday 8 Jul) --- Decorators**

- First-class functions --- functions as arguments and return values

- Closure --- the mechanism decorators rely on

- Simple decorator --- wrapping a function without arguments

- \@functools.wraps --- preserving the wrapped function\'s metadata

- Decorator with arguments --- the three-layer pattern

- Class-based decorators --- \_\_call\_\_ method

- Stacking decorators --- order of execution

- Real decorator patterns: timer, logger, retry, require_auth

Real-World Connection: \@app.get(\"/endpoint\") in FastAPI is a
decorator. \@login_required in Django is a decorator. Every production
Python web framework uses decorators to separate cross-cutting concerns
(auth, logging, rate limiting) from business logic. Understanding
decorators makes FastAPI feel completely natural.

**Day 15 (Thursday 9 Jul) --- Context Managers**

- The with statement --- what it does under the hood

- \_\_enter\_\_ and \_\_exit\_\_ protocol --- writing a class-based
  context manager

- \@contextmanager from contextlib --- generator-based context managers

- Nested context managers --- with A() as a, B() as b:

- Use cases: file handling, database connections, locks, timers

- suppress() from contextlib --- ignoring specific exceptions cleanly

Real-World Connection: Every database session in FastAPI uses a context
manager: async with db.begin(): \... Your connection pool, transaction
boundaries, and cleanup logic all depend on this protocol. Writing your
own teaches you exactly what SQLAlchemy does underneath.

**Day 16 (Friday 10 Jul) --- Testing with pytest**

- Why testing matters --- the bug you don\'t write vs the bug you fix at
  2am

- pytest basics --- test discovery, assert statements, running tests

- Test functions and test classes

- Fixtures --- setup/teardown with \@pytest.fixture

- Parametrize --- testing one function with many inputs

- Mocking --- unittest.mock, MagicMock, patch

- Testing exceptions --- pytest.raises()

- Coverage basics --- pytest-cov, reading coverage reports

Real-World Connection: Every production Python project runs pytest in
CI/CD before deploying. When you build FastAPI backends in Month 5, you
will write endpoint tests with pytest-asyncio. Starting testing habits
now means you write testable code from day one --- not after the fact.

**Days 17--18 (Weekend) --- Mini Build + Week Review**

**Week 1 Mini Build --- Data Pipeline CLI**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A CLI tool that processes a large dataset (CSV with 10,000+     |
| rows) using generators instead of loading all data into memory. |
|                                                                 |
| Required components:                                            |
|                                                                 |
| row_generator(filepath) --- yields one dict per CSV row lazily  |
|                                                                 |
| \@timer decorator --- measures and prints execution time of any |
| function                                                        |
|                                                                 |
| \@validate_columns(required_cols) --- decorator that checks CSV |
| has required columns before processing                          |
|                                                                 |
| DataProcessor class with context manager support                |
| (\_\_enter\_\_/\_\_exit\_\_) for safe file handling             |
|                                                                 |
| filter_rows(generator, predicate) --- lazy filtering using      |
| generator expressions                                           |
|                                                                 |
| aggregate_stats(generator) --- computes count, sum, average     |
| without storing all rows                                        |
|                                                                 |
| pytest test suite --- 8+ tests covering edge cases, empty       |
| files, missing columns                                          |
|                                                                 |
| Repository: python-advanced / week01-data-pipeline              |
|                                                                 |
| Commit rule: one commit per completed component, not one giant  |
| commit at the end.                                              |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Cover your screen. From memory in under 12 minutes:             |
|                                                                 |
| 1\. Write a generator function that reads a CSV line-by-line    |
| and yields filtered rows matching a condition.                  |
|                                                                 |
| 2\. Write a \@retry(max_attempts=3) decorator that retries a    |
| function on exception up to 3 times.                            |
|                                                                 |
| 3\. Write a context manager using \@contextmanager that logs    |
| \"entering\" and \"exiting\" around the block.                  |
|                                                                 |
| If all three are written correctly without reference --- Week 1 |
| is complete.                                                    |
+-----------------------------------------------------------------+

**Month 1 --- Week 2 \| 13--19 July 2026**

**Python Professional Practice: Packaging, Logging, Type System**

+-----------------------------------------------------------------+
| **🎯 WEEK 2 --- 13--19 July 2026**                              |
|                                                                 |
| **MISSION: Transform your Python from working scripts into      |
| professionally organized, type-safe, observable software**      |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

There is a gap between Python that runs and Python that survives
production. Logging makes systems observable --- without it, debugging a
deployed service means flying blind. The full type system makes
codebases maintainable when they grow beyond 500 lines. dataclasses and
Pydantic preview the exact pattern FastAPI uses for request/response
models. Abstract base classes are how you design extensible systems.
This week closes the final Python gap before SQL.

**Topics and Subtopics**

**Day 19 (Mon 13 Jul) --- Python Type System Deep Dive**

- Type hints for all common types: Optional, Union, List, Dict, Tuple,
  Set

- from \_\_future\_\_ import annotations --- postponed evaluation

- TypeVar and Generic --- writing type-safe container classes

- Protocol --- structural subtyping (duck typing with types)

- Literal types --- restricting to specific values

- TypedDict --- typed dictionaries

- mypy --- running static type checking, reading mypy output

Real-World Connection: FastAPI reads your type hints at runtime to
validate request bodies, generate OpenAPI documentation, and serialize
responses. Every type hint you write becomes part of the API contract.
mypy catches errors before they reach production.

**Day 20 (Tue 14 Jul) --- dataclasses and Pydantic**

- \@dataclass --- automatic \_\_init\_\_, \_\_repr\_\_, \_\_eq\_\_

- field() --- defaults, factories, metadata

- \@dataclass(frozen=True) --- immutable dataclasses

- Pydantic BaseModel --- defining typed models with validation

- Field() --- Pydantic validators, defaults, descriptions

- \@validator and \@field_validator --- custom validation logic

- model_dump() and model_validate() --- serialization / deserialization

- Nested Pydantic models

Real-World Connection: FastAPI request bodies ARE Pydantic models. Every
endpoint you write in Month 5 will use exactly these patterns: class
UserCreate(BaseModel): email: EmailStr, name: str, password: str.
Learning Pydantic now means FastAPI Month 5 requires zero extra learning
--- just application.

**Day 21 (Wed 15 Jul) --- Logging and Observability**

- Python logging module --- levels: DEBUG, INFO, WARNING, ERROR,
  CRITICAL

- Logger hierarchy --- root logger vs named loggers

- Handlers --- StreamHandler (console), FileHandler (file),
  RotatingFileHandler

- Formatters --- timestamp, level, module, message

- Configuration --- basicConfig vs dictConfig vs fileConfig

- Structured logging --- logging JSON for production systems

- \@log_call decorator --- automatic function entry/exit logging

Real-World Connection: Production FastAPI applications log every
request, every database query, every error. Without structured logging,
you cannot debug issues in deployed services. This is not optional ---
it is the difference between a hobbyist project and software that can be
maintained.

**Day 22 (Thu 16 Jul) --- Abstract Base Classes + Design Patterns**

- abc module --- ABC, abstractmethod, abstractproperty

- Why interfaces matter --- designing for replaceability

- Repository pattern --- abstract data access layer

- Strategy pattern --- swappable algorithms

- Factory pattern --- object creation abstraction

- Singleton --- when and when NOT to use it

Real-World Connection: Your FastAPI database layer will use the
Repository pattern: class UserRepository(ABC): \... --- one
implementation for PostgreSQL, one for testing. Swapping implementations
requires changing one line. This is how production applications achieve
testability.

**Days 23--24 (Weekend) --- Mini Build + Week Review**

**Week 2 Mini Build --- Library Management System (Production Python)**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A fully typed, tested, logged Python application --- not a      |
| script, a software system.                                      |
|                                                                 |
| Models (Pydantic):                                              |
|                                                                 |
| Book(BaseModel) --- isbn, title, author, year, available: bool  |
|                                                                 |
| Member(BaseModel) --- member_id, name, email, active_loans:     |
| list\[str\]                                                     |
|                                                                 |
| LoanRecord(BaseModel) --- loan_id, isbn, member_id, due_date,   |
| returned: bool                                                  |
|                                                                 |
| Repository pattern:                                             |
|                                                                 |
| BookRepository(ABC) --- abstract: add, find_by_isbn,            |
| find_available, update                                          |
|                                                                 |
| InMemoryBookRepository(BookRepository) --- dict-based           |
| implementation                                                  |
|                                                                 |
| MemberRepository(ABC) + InMemoryMemberRepository                |
|                                                                 |
| Service layer:                                                  |
|                                                                 |
| LibraryService --- uses repositories, enforces business rules,  |
| raises typed exceptions                                         |
|                                                                 |
| OverdueBooks --- generator-based report across all loans        |
|                                                                 |
| Decorators used: \@log_call, \@validate_input,                  |
| \@retry(max_attempts=2)                                         |
|                                                                 |
| Full logging: every borrow, return, and overdue event logged    |
| with timestamps                                                 |
|                                                                 |
| pytest suite: 15+ tests, fixtures for test data, mocked         |
| repository for service tests                                    |
|                                                                 |
| This is the direct ancestor of your FastAPI library API in      |
| Month 5.                                                        |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference, in under 15 minutes:                         |
|                                                                 |
| 1\. Write a Pydantic model for a Product with name, price (must |
| be \> 0), category, and stock_quantity.                         |
|                                                                 |
| 2\. Write an abstract ProductRepository with add, find_by_id,   |
| and list_by_category methods.                                   |
|                                                                 |
| 3\. Write a \@timed_log decorator that logs the function name   |
| and execution time.                                             |
|                                                                 |
| 4\. Write a pytest test that verifies ProductRepository.add()   |
| raises DuplicateProductError when the same ID is added twice.   |
|                                                                 |
| If all four completed correctly --- Week 2 is complete. Python  |
| is done as a learning topic.                                    |
+-----------------------------------------------------------------+

**Month 1 --- Week 3 \| 20--26 July 2026**

**SQL: Production-Grade --- Transactions, Stored Procedures, Schema
Mastery**

+-----------------------------------------------------------------+
| **🎯 WEEK 3 --- 20--26 July 2026**                              |
|                                                                 |
| **MISSION: Elevate SQL from query-writing to database           |
| engineering --- the gap between passing interviews and          |
| designing production systems**                                  |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

Buffer period SQL gave you query fluency. Production SQL requires more:
transactions prevent corrupted data, constraints enforce business rules
at the database level, schema design determines how fast your
application scales, and normalization decisions made today affect query
performance for years. This week completes the SQL layer permanently.

**Topics and Subtopics**

**Day 26 (Mon 20 Jul) --- Transactions and ACID**

- ACID properties --- Atomicity, Consistency, Isolation, Durability ---
  with real examples

- BEGIN / COMMIT / ROLLBACK --- manual transaction control

- Isolation levels --- READ UNCOMMITTED, READ COMMITTED, REPEATABLE
  READ, SERIALIZABLE

- Dirty reads, non-repeatable reads, phantom reads --- what each
  isolation level prevents

- SAVEPOINT --- partial rollback within a transaction

- Deadlock --- what causes it, how to detect it, how to prevent it

- Optimistic vs pessimistic locking --- SELECT FOR UPDATE

Real-World Connection: Every money transfer, every order placement,
every reservation system depends on transactions. When your FastAPI
backend processes a payment --- debit one account, credit another --- if
the credit fails after the debit succeeds, you have a financial
disaster. Transactions are what prevent that.

**Day 27 (Tue 21 Jul) --- Constraints and Referential Integrity**

- PRIMARY KEY --- composite keys, natural vs surrogate

- FOREIGN KEY --- ON DELETE CASCADE, RESTRICT, SET NULL --- when to use
  each

- UNIQUE --- single and composite unique constraints

- CHECK --- domain constraints enforced at the database level

- NOT NULL --- why nullable columns are dangerous

- DEFAULT values --- reducing application-layer boilerplate

- Deferrable constraints --- PostgreSQL-specific, useful for complex
  inserts

Real-World Connection: A constraint is a guarantee. Without CHECK (price
\> 0), application bugs can insert negative prices. Without ON DELETE
RESTRICT on orders, deleting a customer silently orphans their orders.
Constraints are your last line of defence against corrupted data.

**Day 28 (Wed 22 Jul) --- Advanced Indexing + Query Optimization**

- B-tree index internals --- how PostgreSQL traverses an index vs a
  sequential scan

- Partial indexes --- index only rows matching a WHERE condition

- Covering indexes --- include all columns a query needs to avoid heap
  lookups

- Composite index column order --- why (city, name) differs from (name,
  city)

- Index on expressions --- LOWER(email) for case-insensitive lookups

- EXPLAIN ANALYZE output --- actual vs estimated rows, cost, loops

- Common query anti-patterns --- functions in WHERE, implicit
  conversions, SELECT \*

Real-World Connection: A FastAPI endpoint that runs a slow query costs
money and users. Adding an index to an email column in a 1 million-row
users table can reduce a 500ms query to 2ms. This is not theoretical ---
it is the first thing you do when a production API endpoint is slow.

**Day 29 (Thu 23 Jul) --- Database Design and Normalization**

- First Normal Form (1NF) --- atomic values, no repeating groups

- Second Normal Form (2NF) --- full functional dependency on primary key

- Third Normal Form (3NF) --- no transitive dependencies

- When to denormalize --- read performance vs write integrity trade-off

- Entity-Relationship diagrams --- designing on paper before writing SQL

- Choosing data types --- INT vs BIGINT, VARCHAR vs TEXT, TIMESTAMP vs
  TIMESTAMPTZ

- UUID vs SERIAL for primary keys --- security and scalability
  implications

Real-World Connection: The schema you design for your Month 5 FastAPI
project will either support or fight against your queries. A poorly
normalized schema makes certain queries impossible without full table
scans. This session teaches you to design schemas that your queries
love.

**Days 30--31 (Weekend) --- Mini Build + Week Review**

**Week 3 Mini Build --- Hospital Management Database**

+-----------------------------------------------------------------+
| **Schema Design Challenge**                                     |
|                                                                 |
| Design and build a complete PostgreSQL schema from scratch ---  |
| no scaffolding provided.                                        |
|                                                                 |
| Entities to model (you design the columns, constraints, and     |
| relationships):                                                 |
|                                                                 |
| Patients --- with contact, insurance, and registration details  |
|                                                                 |
| Doctors --- with specialization, department, schedule           |
| availability                                                    |
|                                                                 |
| Appointments --- linking patients and doctors with time slots   |
|                                                                 |
| Medical Records --- diagnoses, prescriptions, linked to         |
| appointments                                                    |
|                                                                 |
| Billing --- invoices linked to appointments, payment tracking   |
|                                                                 |
| Requirements:                                                   |
|                                                                 |
| Full referential integrity --- no orphaned records possible     |
|                                                                 |
| At least 3 CHECK constraints enforcing business rules           |
|                                                                 |
| Composite index on (doctor_id, appointment_date) --- justify    |
| why                                                             |
|                                                                 |
| Partial index on appointments WHERE status = \'pending\' ---    |
| justify why                                                     |
|                                                                 |
| Queries to write (20 business problems):                        |
|                                                                 |
| Revenue per doctor this month \| Patients with overdue bills \| |
| Doctor schedule conflicts                                       |
|                                                                 |
| Top 5 diagnoses by frequency \| Average wait time between       |
| booking and appointment                                         |
|                                                                 |
| Patients who have seen more than 3 doctors \| Monthly patient   |
| registration trend (window function)                            |
|                                                                 |
| Unpaid invoices older than 30 days \| Doctors with zero         |
| appointments this week                                          |
|                                                                 |
| Patient medical history sorted chronologically (LAG for         |
| days-between-visits)                                            |
|                                                                 |
| \...and 10 more problems you design yourself based on real      |
| hospital operations                                             |
|                                                                 |
| Deliverable: hospital_schema.sql + hospital_queries.sql + ER    |
| diagram sketch (photo or ASCII)                                 |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference, in under 10 minutes:                         |
|                                                                 |
| 1\. Write a transaction that transfers \"appointment\" from     |
| doctor A to doctor B --- ensuring if any step fails, nothing    |
| changes.                                                        |
|                                                                 |
| 2\. Add a partial index to the appointments table for only      |
| pending appointments and explain why it is better than a full   |
| index.                                                          |
|                                                                 |
| 3\. Write a query using LAG() to show each patient\'s           |
| appointments with days elapsed since their previous visit.      |
|                                                                 |
| If all three completed correctly --- Week 3 is complete. SQL is |
| production-ready.                                               |
+-----------------------------------------------------------------+

**Month 1 --- Week 4 \| 27 July -- 2 August 2026**

**Integration Week: Python + SQL + Mini Project 0**

+-----------------------------------------------------------------+
| **🎯 WEEK 4 --- 27 July -- 2 August 2026**                      |
|                                                                 |
| **MISSION: Connect Python and SQL into a working data           |
| application --- the first integration milestone**               |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

Python and SQL are individually powerful. Combined, they produce the
backend logic of every real application. This week bridges the two using
psycopg2 (raw PostgreSQL driver) and basic SQLAlchemy Core --- exactly
the layer FastAPI uses underneath. Building a data application this week
creates the mental model that makes Month 5\'s FastAPI ORM layer
immediately comprehensible.

**Topics**

- psycopg2 --- connecting to PostgreSQL, executing queries,
  parameterized queries

- Connection pooling --- why it matters,
  psycopg2.pool.SimpleConnectionPool

- SQLAlchemy Core (not ORM) --- engine, connection, text(), execute()

- Result sets --- fetchone(), fetchall(), fetchmany(), iteration

- Error handling --- database exceptions: IntegrityError,
  OperationalError

- Environment-based configuration --- DB credentials from .env, never
  hardcoded

- Schema migration basics --- what migrations are, why Alembic exists
  (preview only)

**Mini Project 0 --- Student Grade Management System (CLI)**

+-----------------------------------------------------------------+
| **Project 0 Specification**                                     |
|                                                                 |
| A complete CLI application backed by a real PostgreSQL          |
| database.                                                       |
|                                                                 |
| What it does:                                                   |
|                                                                 |
| Add / update / delete students and their subject marks          |
|                                                                 |
| View report cards --- grades computed in Python from DB data    |
|                                                                 |
| Rank students by GPA --- uses window functions in the query     |
|                                                                 |
| Filter by grade band --- A, B, C, F with counts and averages    |
|                                                                 |
| Export CSV report --- using Python file handling from buffer    |
| period                                                          |
|                                                                 |
| Full audit log --- every change written to an audit_log table   |
| in the DB                                                       |
|                                                                 |
| Architecture:                                                   |
|                                                                 |
| models.py --- Pydantic models (Student, Subject, GradeRecord)   |
|                                                                 |
| db.py --- connection management with context manager            |
| (get_connection())                                              |
|                                                                 |
| repository.py --- StudentRepository and GradeRepository         |
| (abstract + concrete)                                           |
|                                                                 |
| service.py --- GradeService with business logic                 |
|                                                                 |
| cli.py --- argparse-based CLI interface                         |
|                                                                 |
| tests/ --- pytest suite testing service layer with mocked       |
| repository                                                      |
|                                                                 |
| This is Project 0. It uses everything from buffer period +      |
| Month 1 Weeks 1--3.                                             |
|                                                                 |
| Every design decision --- from column names to repository       |
| abstraction --- must be explainable.                            |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Month 1 Exit Criteria --- complete all before proceeding to     |
| Month 2:                                                        |
|                                                                 |
| 1\. Can you write a decorator from memory in under 4 minutes?   |
|                                                                 |
| 2\. Can you write a Pydantic model with validation from memory? |
|                                                                 |
| 3\. Can you write a pytest test with a fixture from memory?     |
|                                                                 |
| 4\. Can you design a normalized schema for a new domain in      |
| under 20 minutes?                                               |
|                                                                 |
| 5\. Can you write a window function query combining             |
| ROW_NUMBER + LAG + SUM OVER?                                    |
|                                                                 |
| 6\. Is Project 0 committed to GitHub with a professional        |
| README?                                                         |
|                                                                 |
| If every answer is yes --- Python and SQL are complete. Month 2 |
| begins.                                                         |
|                                                                 |
| If any answer is no --- spend additional days on the gap. Do    |
| not proceed until all six are solid.                            |
+-----------------------------------------------------------------+

**CHAPTER 3 --- MONTH 2 HTML + CSS + JAVASCRIPT FOUNDATION 3 August --
30 August 2026**

**Month 2 Objective**

You have 70% HTML comfort and 40--50% CSS confidence from prior
exploration. Month 2 does not re-teach --- it completes. Semantic HTML,
Flexbox, Grid, responsive design, and animation fundamentals are
established in the first two weeks. Then JavaScript begins: DOM
manipulation, events, async patterns, and the fetch API. By 30 August,
you will have built multiple complete static applications ready to be
dynamically powered in Month 3.

**Month 2 Weekly Breakdown**

  ---------- ---------------- ----------------------------------------
  **Week**   **Dates**        **Focus**

  Week 5     3 Aug -- 9 Aug   HTML Completion + CSS Flexbox + Grid
                              Mastery

  Week 6     10 Aug -- 16 Aug CSS Advanced + Responsive Design +
                              Animations

  Week 7     17 Aug -- 23 Aug JavaScript Foundations: DOM, Events,
                              Functions

  Week 8     24 Aug -- 30 Aug JavaScript: Async, Fetch API, Local
                              Storage --- Mini Project 1 begins
  ---------- ---------------- ----------------------------------------

**Month 2 --- Week 5 \| 3--9 August 2026**

**HTML Completion + CSS Flexbox + Grid Mastery**

+-----------------------------------------------------------------+
| **🎯 WEEK 5 --- 3--9 August 2026**                              |
|                                                                 |
| **MISSION: Close the HTML gap permanently. Make Flexbox and     |
| Grid feel mechanical.**                                         |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

You already understand basic HTML. Week 5 closes the semantic and
accessibility gaps --- the difference between HTML that works and HTML
that is correct. Then Flexbox and Grid are drilled until they require no
thinking. These are not separate concepts --- Flexbox is for
one-dimensional layouts (navbars, card rows), Grid is for
two-dimensional layouts (dashboards, page structure). Confusion between
them is the primary source of layout bugs.

**Topics and Subtopics**

**HTML Completion (Day 33 --- Mon 3 Aug)**

- Semantic HTML5 --- header, nav, main, article, section, aside, footer
  --- when to use each

- Forms --- input types: text, email, password, number, date, file,
  checkbox, radio, select

- Form attributes --- required, minlength, pattern, autocomplete,
  placeholder

- Accessibility basics --- alt text, aria-label, aria-describedby, role,
  tabindex

- Data attributes --- data-\* --- storing metadata in HTML elements

- Meta tags --- viewport, description, og: (Open Graph), charset

- HTML entities and special characters

- Figure, figcaption, details, summary, dialog, progress --- semantic
  utility elements

**CSS Flexbox Deep Dive (Day 34 --- Tue 4 Aug)**

- Flex container vs flex item --- understanding the axis model

- justify-content --- main axis alignment: flex-start, center,
  space-between, space-around, space-evenly

- align-items --- cross axis alignment: stretch, center, flex-start,
  flex-end, baseline

- flex-direction --- row, column, row-reverse, column-reverse

- flex-wrap --- nowrap, wrap, wrap-reverse

- gap --- spacing between flex children

- flex property shorthand --- flex-grow, flex-shrink, flex-basis

- align-self --- overriding container alignment per item

- order --- visual reordering without changing HTML

Practice: Build 10 different Flexbox layouts from a visual spec ---
navbar, card row, sidebar + content, footer, centered modal, horizontal
scroll, equal columns, holy grail layout (incomplete), tag cloud, login
form.

**CSS Grid Mastery (Day 35 --- Wed 5 Aug)**

- Grid container vs grid items --- rows and columns

- grid-template-columns / rows --- fr units, repeat(), minmax()

- grid-template-areas --- naming regions in ASCII art form

- grid-column / grid-row --- item placement with span

- auto-fill vs auto-fit --- responsive grids without media queries

- gap --- row-gap, column-gap, shorthand

- Implicit vs explicit grid --- grid-auto-rows, grid-auto-flow

- Overlapping grid items --- z-index in a grid context

Practice: Build 10 Grid layouts --- dashboard, magazine layout, image
gallery, 12-column grid system, card grid with featured item, calendar
grid, pricing table, product grid, admin sidebar + content, responsive
portfolio grid.

**CSS Positioning + Box Model Review (Day 36 --- Thu 6 Aug)**

- Box model --- content, padding, border, margin --- box-sizing:
  border-box

- position: static, relative, absolute, fixed, sticky --- when each is
  correct

- z-index and stacking contexts --- why z-index sometimes doesn\'t work

- overflow --- visible, hidden, scroll, auto

- display values --- block, inline, inline-block, none, contents

- CSS custom properties (variables) --- \--color-primary, var()

- calc() --- mixing units: width: calc(100% - 240px)

**Days 37--38 (Weekend) --- Mini Build + Layout Challenges**

**Week 5 Mini Build --- Developer Portfolio Layout (HTML + CSS Only)**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A complete, responsive portfolio page --- HTML and CSS only, no |
| JavaScript yet.                                                 |
|                                                                 |
| Required sections:                                              |
|                                                                 |
| Navigation bar --- fixed, collapses on mobile                   |
|                                                                 |
| Hero section --- full viewport height, centered content, CSS    |
| gradient background                                             |
|                                                                 |
| About section --- two-column Flexbox: photo + bio               |
|                                                                 |
| Skills section --- CSS Grid card layout, 4 columns on desktop,  |
| 2 on tablet, 1 on mobile                                        |
|                                                                 |
| Projects section --- Grid with a featured project spanning 2    |
| columns                                                         |
|                                                                 |
| Contact form --- semantic HTML5, all input types used, full     |
| accessibility attributes                                        |
|                                                                 |
| Footer --- Flexbox: links left, copyright right                 |
|                                                                 |
| Technical requirements:                                         |
|                                                                 |
| CSS custom properties for all colors and spacing                |
|                                                                 |
| No external CSS framework --- all styles written manually       |
|                                                                 |
| Responsive at 320px, 768px, and 1280px breakpoints              |
|                                                                 |
| Smooth scroll behaviour, hover transitions on all interactive   |
| elements                                                        |
|                                                                 |
| This portfolio will be updated progressively through Months 3   |
| and 4 as JavaScript and React are added.                        |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference, in under 15 minutes:                         |
|                                                                 |
| 1\. Build a three-column dashboard layout using CSS Grid where  |
| the sidebar is 240px, content is flexible, and the right panel  |
| is 320px.                                                       |
|                                                                 |
| 2\. Center a card both horizontally and vertically using        |
| Flexbox on the container.                                       |
|                                                                 |
| 3\. Write a responsive image gallery that shows 4 columns on    |
| desktop, 2 on tablet, 1 on mobile --- without JavaScript.       |
|                                                                 |
| If all three built correctly --- Week 5 is complete.            |
+-----------------------------------------------------------------+

**Month 2 --- Week 6 \| 10--16 August 2026**

**CSS Advanced: Responsive Design, Typography, Animations**

+-----------------------------------------------------------------+
| **🎯 WEEK 6 --- 10--16 August 2026**                            |
|                                                                 |
| **MISSION: Make your CSS production-quality --- responsive      |
| without media query chaos, animated without libraries**         |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**Responsive Design System (Day 40 --- Mon 10 Aug)**

- Mobile-first methodology --- why you write small screen first, then
  scale up

- Media query syntax --- min-width (mobile-first), breakpoint strategy

- Responsive units --- rem vs em vs px vs % vs vw/vh --- when each is
  correct

- clamp() --- fluid typography: font-size: clamp(1rem, 2.5vw, 2rem)

- aspect-ratio --- maintaining proportions responsively

- Container queries (modern) --- \@container --- brief introduction

- CSS Grid auto-fill + auto-fit --- grids that reflow without media
  queries

**Typography System (Day 41 --- Tue 11 Aug)**

- System font stack vs Google Fonts vs self-hosted

- Type scale --- modular scale using CSS custom properties

- Line height and letter spacing --- readability at different sizes

- font-feature-settings --- ligatures, tabular numbers

- text-overflow: ellipsis + white-space: nowrap --- truncating overflow
  text

- CSS text effects --- gradient text, stroke, shadow

**CSS Transitions and Animations (Day 42 --- Wed 12 Aug)**

- transition --- property, duration, timing-function, delay

- \@keyframes --- from/to and percentage-based animation

- animation shorthand --- name, duration, timing, delay, iteration,
  direction, fill-mode

- transform --- translate, scale, rotate, skew, matrix

- will-change --- performance hint for browsers

- Reduced motion --- \@media (prefers-reduced-motion) --- accessibility

- Practical animations: button hover, card lift, skeleton loading,
  spinner, progress bar

**CSS Architecture and Methodology (Day 43 --- Thu 13 Aug)**

- BEM naming --- .block\_\_element\--modifier --- why it prevents class
  collisions

- Utility-first concepts --- preview of Tailwind\'s philosophy

- CSS specificity --- the cascade, specificity weight, !important abuse

- :root variables --- building a complete design token system

- CSS selectors --- :nth-child, :not(), :is(), :where(), :has()

- Print styles --- \@media print --- making pages printable

**Days 44--45 (Weekend) --- Mini Build + Upgrade Portfolio**

**Week 6 Mini Build --- Animated Component Library**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A showcase page demonstrating 10 reusable CSS components ---    |
| all animated, all responsive.                                   |
|                                                                 |
| Required components (build each in its own .css file using BEM  |
| naming):                                                        |
|                                                                 |
| 1\. Button system --- primary, secondary, ghost, danger,        |
| loading state                                                   |
|                                                                 |
| 2\. Card component --- hover lift, image overlay, badge         |
|                                                                 |
| 3\. Navigation bar --- hamburger menu animation (CSS only)      |
|                                                                 |
| 4\. Modal dialog --- fade in/scale animation                    |
|                                                                 |
| 5\. Toast notification --- slide in from right, auto-dismiss    |
| animation                                                       |
|                                                                 |
| 6\. Loading skeleton --- pulse animation placeholder            |
|                                                                 |
| 7\. Progress bar --- animated fill with percentage              |
|                                                                 |
| 8\. Accordion --- CSS-only expand/collapse using :checked trick |
|                                                                 |
| 9\. Tabs --- CSS-only tab switching                             |
|                                                                 |
| 10\. Tooltip --- hover-triggered with arrow pointer             |
|                                                                 |
| Every component must work at 320px mobile width.                |
|                                                                 |
| Showcase page links to each component demo.                     |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference:                                              |
|                                                                 |
| 1\. Write a CSS animation for a card that lifts on hover with a |
| shadow --- transition + transform only.                         |
|                                                                 |
| 2\. Write a responsive grid that automatically creates as many  |
| columns as fit, each minimum 280px wide.                        |
|                                                                 |
| 3\. Write a BEM-named button component with primary, secondary, |
| and disabled states using CSS custom properties.                |
|                                                                 |
| If all three completed correctly --- Week 6 is complete.        |
+-----------------------------------------------------------------+

**Month 2 --- Week 7 \| 17--23 August 2026**

**JavaScript Foundations: The Language, the DOM, Events**

+-----------------------------------------------------------------+
| **🎯 WEEK 7 --- 17--23 August 2026**                            |
|                                                                 |
| **MISSION: Learn JavaScript as a proper language --- not as     |
| jQuery shortcuts or copy-pasted snippets**                      |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

JavaScript at 30--40% means you have used it to make things work, not to
understand why they work. React cannot be learned without understanding
JavaScript closures, event delegation, the prototype chain, and the
module system. This week rebuilds your JavaScript understanding from its
actual foundations so that React feels like a natural extension rather
than a black box.

**Topics and Subtopics**

**JavaScript Core Language (Day 47 --- Mon 17 Aug)**

- var vs let vs const --- hoisting, temporal dead zone, block scope

- Data types --- primitives vs objects, typeof, null vs undefined
  distinction

- Truthy/falsy --- the full list, short-circuit evaluation

- Equality --- == vs === --- why you always use ===

- Destructuring --- arrays: const \[a, b\] = arr, objects: const {name,
  age} = obj

- Spread and rest --- \...args in parameters, \...arr in calls

- Template literals --- multi-line strings, expression interpolation

- Optional chaining --- user?.address?.city --- safe property access

- Nullish coalescing --- value ?? default

- Logical assignment --- ??=, \|\|=, &&=

**Functions and Closures (Day 48 --- Tue 18 Aug)**

- Function declarations vs expressions vs arrow functions --- hoisting
  difference

- this keyword --- regular function vs arrow function behaviour

- Closures --- the mental model: function + its surrounding scope

- Immediately Invoked Function Expressions (IIFE) --- why they exist

- Higher-order functions --- map, filter, reduce, forEach, find, some,
  every

- Function composition --- building complex behaviour from simple
  functions

- Currying --- partial application pattern

Real-World Connection: React hooks (useState, useEffect, useCallback,
useMemo) are all closures. Understanding closures before React means
hooks feel logical rather than magical.

**DOM Manipulation (Day 49 --- Wed 19 Aug)**

- querySelector / querySelectorAll --- CSS selectors in JavaScript

- createElement, appendChild, insertBefore, removeChild --- building DOM
  dynamically

- innerHTML vs textContent --- security implications of innerHTML

- classList --- add, remove, toggle, contains, replace

- style --- setting inline styles programmatically

- dataset --- reading data-\* attributes

- Traversal --- parentElement, children, nextElementSibling, closest()

- DocumentFragment --- batching DOM insertions for performance

Practice: Build an interactive todo list, a dynamic table populated from
a JS array, and a live character counter --- all DOM manipulation, no
libraries.

**Events (Day 50 --- Thu 20 Aug)**

- addEventListener --- eventType, callback, options

- Event object --- target, currentTarget, type, preventDefault(),
  stopPropagation()

- Event bubbling and capturing --- the propagation model

- Event delegation --- one listener on the parent instead of N listeners
  on children

- Common events --- click, dblclick, keydown, keyup, input, change,
  submit, focus, blur, scroll, resize

- Custom events --- new CustomEvent(), dispatchEvent()

- Debounce and throttle --- controlling event frequency (write both from
  scratch)

Real-World Connection: React\'s synthetic event system is a delegation
layer over this exact model. onClick in React is not a DOM event
listener --- it is React\'s delegation system calling your handler.
Understanding native events makes React events transparent.

**Days 51--52 (Weekend) --- Mini Build: Interactive Quiz App (vanilla
JS)**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A multiple-choice quiz application --- pure HTML, CSS, and      |
| JavaScript, no frameworks.                                      |
|                                                                 |
| Required features:                                              |
|                                                                 |
| Questions loaded from a JS data structure (array of objects)    |
|                                                                 |
| Timer per question --- countdown using setInterval              |
|                                                                 |
| Progress bar showing % complete --- DOM manipulation            |
|                                                                 |
| Score tracking and running total                                |
|                                                                 |
| Answer feedback --- correct/wrong animation + explanation       |
|                                                                 |
| Results screen with pass/fail and percentage score              |
|                                                                 |
| Restart functionality --- full reset without page reload        |
|                                                                 |
| Technical requirements:                                         |
|                                                                 |
| Module pattern --- quiz logic separated from UI rendering       |
|                                                                 |
| Event delegation --- one click listener handles all answer      |
| buttons                                                         |
|                                                                 |
| No innerHTML for user content --- textContent only for security |
|                                                                 |
| Keyboard navigation --- arrow keys + Enter for accessibility    |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference, in under 15 minutes:                         |
|                                                                 |
| 1\. Write a debounce function from scratch.                     |
|                                                                 |
| 2\. Write an event-delegated click handler on a \<ul\> that     |
| identifies which \<li\> was clicked.                            |
|                                                                 |
| 3\. Explain in two sentences why a closure retains access to    |
| variables after its outer function has returned.                |
|                                                                 |
| If all three completed correctly --- Week 7 is complete.        |
+-----------------------------------------------------------------+

**Month 2 --- Week 8 \| 24--30 August 2026**

**JavaScript: Async Patterns, Fetch API, Modules**

+-----------------------------------------------------------------+
| **🎯 WEEK 8 --- 24--30 August 2026**                            |
|                                                                 |
| **MISSION: Make async JavaScript feel natural. Build the final  |
| vanilla JS project before React.**                              |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**Asynchronous JavaScript (Day 54 --- Mon 24 Aug)**

- The call stack, the event loop, the task queue --- how JS stays
  single-threaded

- Callbacks --- the original async pattern, callback hell

- Promises --- new Promise(), .then(), .catch(), .finally()

- Promise chaining --- returning promises in .then() for sequential
  async

- Promise.all() --- concurrent: wait for all to resolve

- Promise.race() --- first to resolve wins

- Promise.allSettled() --- wait for all, regardless of success or
  failure

- async/await --- syntactic sugar over promises

- try/catch with async/await --- error handling pattern

- Top-level await --- available in ES2022 modules

Real-World Connection: Every fetch call, every API call from React,
every database query from FastAPI uses this model. The async Python you
learned in Day 7 of buffer period operates on the same conceptual model
--- the event loop. JavaScript async unlocks React\'s data fetching
patterns.

**Fetch API and HTTP (Day 55 --- Tue 25 Aug)**

- fetch(url, options) --- returns a Promise\<Response\>

- Response object --- .json(), .text(), .ok, .status, .headers

- HTTP methods --- GET, POST, PUT, PATCH, DELETE

- Request headers --- Content-Type, Authorization, Accept

- POST with JSON body --- JSON.stringify(), Content-Type:
  application/json

- Error handling --- network error vs HTTP error --- why .ok matters

- CORS --- what it is, why it blocks requests, how FastAPI configures it

- AbortController --- cancelling in-flight requests

Practice: Build a complete CRUD interface against a public REST API
(JSONPlaceholder) --- list, view, create, update, delete --- all with
proper loading and error states.

**JavaScript Modules (Day 56 --- Wed 26 Aug)**

- ES Modules --- import, export, export default

- Named exports vs default exports --- when to use each

- Dynamic imports --- import() for code splitting (preview of React
  lazy)

- Module scope --- why modules do not pollute the global scope

- \<script type=\"module\"\> in HTML

- Circular dependencies --- how to detect and avoid

Real-World Connection: React is built entirely on ES modules. Every
import statement in a React component follows this exact pattern.
Understanding modules before React means you understand why import React
from \"react\" works the way it does.

**Browser Storage and State (Day 57 --- Thu 27 Aug)**

- localStorage and sessionStorage --- get, set, remove, clear, JSON
  serialization

- Cookies --- document.cookie, limitations vs localStorage

- IndexedDB --- brief introduction (async, large data storage)

- URL and History API --- window.location, history.pushState (preview of
  React Router)

- In-memory state management patterns --- the module-level state object
  pattern

**Days 58--59 (Weekend) --- Mini Project 1: Weather Dashboard**

+-----------------------------------------------------------------+
| **Mini Project 1 Specification**                                |
|                                                                 |
| A complete weather dashboard application --- vanilla HTML, CSS, |
| and JavaScript.                                                 |
|                                                                 |
| Required features:                                              |
|                                                                 |
| Search by city name --- fetches from OpenWeatherMap free API    |
|                                                                 |
| Current conditions --- temperature, humidity, wind speed,       |
| weather icon                                                    |
|                                                                 |
| 5-day forecast --- rendered from forecast API endpoint          |
|                                                                 |
| Search history --- stored in localStorage, clickable to         |
| re-fetch                                                        |
|                                                                 |
| Unit toggle --- Celsius / Fahrenheit --- no re-fetch, converts  |
| in JS                                                           |
|                                                                 |
| Loading states --- skeleton screen while data is fetching       |
|                                                                 |
| Error handling --- city not found, network error, API error --- |
| all handled gracefully                                          |
|                                                                 |
| Responsive layout --- Grid on desktop, single column on mobile  |
|                                                                 |
| Architecture:                                                   |
|                                                                 |
| api.js --- all fetch calls, error handling                      |
|                                                                 |
| storage.js --- localStorage abstraction                         |
|                                                                 |
| ui.js --- all DOM rendering functions                           |
|                                                                 |
| app.js --- orchestration, event listeners                       |
|                                                                 |
| styles/ --- BEM CSS, CSS custom properties, animations          |
|                                                                 |
| This project appears on your portfolio and resume.              |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Month 2 Exit Criteria --- complete all before MID-1 examination |
| period:                                                         |
|                                                                 |
| 1\. Can you write fetch() with POST, error handling, and        |
| loading state from memory?                                      |
|                                                                 |
| 2\. Can you explain event delegation and write it from scratch  |
| in 5 minutes?                                                   |
|                                                                 |
| 3\. Is the Weather Dashboard live on GitHub Pages with a clean  |
| README?                                                         |
|                                                                 |
| 4\. Is the Portfolio page committed with Flexbox + Grid         |
| layouts?                                                        |
|                                                                 |
| 5\. Can you write a CSS Grid layout for a dashboard in under 8  |
| minutes from scratch?                                           |
|                                                                 |
| If every answer is yes --- Month 2 is complete. MID-1 exams     |
| begin 31 August.                                                |
+-----------------------------------------------------------------+

**MID-1 EXAMINATION PERIOD 31 August -- 5 September 2026**

+-----------------------------------------------------------------+
| **Examination Period Rules**                                    |
|                                                                 |
| College academics take priority. Engineering roadmap goes into  |
| maintenance mode.                                               |
|                                                                 |
| Daily commitment during exam week (1--2 hours maximum):         |
|                                                                 |
| DSA / Java --- 45 minutes of problem-solving or revision (never |
| skip)                                                           |
|                                                                 |
| Light roadmap revision --- re-read one past week\'s notes (30   |
| minutes)                                                        |
|                                                                 |
| GitHub --- one small commit per day to maintain the streak      |
|                                                                 |
| What you do NOT do during exam week:                            |
|                                                                 |
| Start new topics                                                |
|                                                                 |
| Begin new mini builds                                           |
|                                                                 |
| Push yourself on CSS or JavaScript                              |
|                                                                 |
| Month 3 begins 7 September. Two days after exams end are for    |
| rest --- not roadmap.                                           |
+-----------------------------------------------------------------+

**CHAPTER 4 --- MONTH 3 JS COMPLETION + REACT BEGINS + CRT STARTS 7
September -- 4 October 2026**

**Month 3 Objective**

Month 2 established JavaScript foundations. Month 3 completes the
language and begins React. This is the transition month: JavaScript
professional patterns in the first half, React fundamentals in the
second. CRT preparation also begins this month and runs as a parallel
track for the remainder of the semester.

By 4 October, you will have React running, components built, and JSX
feeling natural. The goal is comfortable implementation of core React
patterns --- not mastery of the full React ecosystem. Mastery arrives
naturally in Month 4 through project work.

**Month 3 Weekly Breakdown**

  ---------- ---------------- ----------------------------------------
  **Week**   **Dates**        **Focus**

  Week 9     7 Sep -- 13 Sep  JS: Object-Oriented JS, Prototype Chain,
                              Class Syntax

  Week 10    14 Sep -- 20 Sep JS: Error handling, regex, tooling
                              (Vite), Git professional workflow

  Week 11    21 Sep -- 27 Sep React: JSX, Components, Props, State
                              (useState)

  Week 12    28 Sep -- 4 Oct  React: useEffect, Conditional rendering,
                              Lists, Forms
  ---------- ---------------- ----------------------------------------

**Month 3 --- Week 9 \| 7--13 September 2026**

**JavaScript: Object-Oriented Patterns, Prototype Chain, Class Syntax**

+-----------------------------------------------------------------+
| **🎯 WEEK 9 --- 7--13 September 2026**                          |
|                                                                 |
| **MISSION: Understand JavaScript\'s object model completely --- |
| prototype chain, classes, and inheritance**                     |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**The Prototype Chain (Day 61 --- Mon 7 Sep)**

- Objects in JS --- {} literals, Object.create(), constructor functions

- \_\_proto\_\_ and Object.getPrototypeOf() --- the prototype chain
  traversal

- Prototype chain lookup --- how JS finds properties and methods

- Object.keys() vs for\...in --- own properties vs inherited properties

- hasOwnProperty() --- filtering inherited properties

- Object.assign() and object spread --- shallow copying

- Object.freeze() and Object.seal() --- immutability

**ES6 Classes (Day 62 --- Tue 9 Sep)**

- class syntax --- constructor, methods, static methods, static
  properties

- extends and super() --- class inheritance

- Private fields --- #field syntax (ES2022)

- Getters and setters --- get and set keywords in class bodies

- instanceof --- type checking in the prototype chain

- Mixins --- composing behaviour from multiple sources without full
  inheritance

Real-World Connection: React class components use this syntax.
Understanding it means you can read legacy React code, understand
lifecycle methods, and decide when a functional component is the right
choice.

**JavaScript Error Handling Patterns (Day 63 --- Wed 10 Sep)**

- Error types --- Error, TypeError, RangeError, ReferenceError,
  SyntaxError

- Custom error classes --- class NotFoundError extends Error

- try / catch / finally in async functions

- Unhandled promise rejections --- window.onunhandledrejection

- Error boundaries preview --- what React uses to catch component errors

- Centralized error handling patterns --- one error handler function

**Regular Expressions in JavaScript (Day 64 --- Thu 11 Sep)**

- Regex literal syntax --- /pattern/flags

- Character classes, quantifiers, anchors, groups

- test(), match(), matchAll(), replace(), replaceAll(), split()

- Named capture groups --- (?\<name\>\...)

- Lookahead and lookbehind

Practice: Email validation, URL extraction from text, credit card
masking, phone number formatting --- all without external libraries.

**Days 65--66 (Weekend) --- Mini Build: Kanban Board (vanilla JS OOP)**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A Kanban board application using class-based JavaScript ---     |
| before React introduces a better model.                         |
|                                                                 |
| Architecture (intentionally OOP-heavy so React\'s component     |
| model feels like an improvement):                               |
|                                                                 |
| Board class --- manages columns, renders itself                 |
|                                                                 |
| Column class --- manages cards within a column                  |
|                                                                 |
| Card class --- title, description, priority, due date, assignee |
|                                                                 |
| DragDropManager --- handles drag-and-drop between columns       |
|                                                                 |
| StorageManager --- persists board state to localStorage         |
|                                                                 |
| Features: Add/edit/delete cards, drag between columns, filter   |
| by priority, due date countdown.                                |
|                                                                 |
| Note: You will rebuild this exact app in React during Month 4.  |
|                                                                 |
| The contrast between vanilla OOP and React components is the    |
| lesson.                                                         |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference:                                              |
|                                                                 |
| 1\. Write a class Animal with name and speak() method, then a   |
| Dog class that extends it and overrides speak().                |
|                                                                 |
| 2\. Write a custom ValidationError class that extends Error     |
| with a field property.                                          |
|                                                                 |
| 3\. Write a regex that validates an Indian phone number (10     |
| digits, optionally prefixed with +91 or 0).                     |
|                                                                 |
| If all three completed correctly --- Week 9 is complete.        |
+-----------------------------------------------------------------+

**Month 3 --- Week 10 \| 14--20 September 2026**

**JavaScript Tooling: Vite, npm, ESLint, Git Professional Workflow**

+-----------------------------------------------------------------+
| **🎯 WEEK 10 --- 14--20 September 2026**                        |
|                                                                 |
| **MISSION: Set up a professional JavaScript development         |
| environment --- the scaffolding React lives inside**            |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**npm and Package Management (Day 68 --- Mon 14 Sep)**

- package.json --- scripts, dependencies, devDependencies, version
  pinning

- npm install, npm run, npx --- understanding what each does

- node_modules --- why it is gigabytes large and never committed

- package-lock.json --- reproducible installs

- Semantic versioning --- \^1.0.0, \~1.0.0, 1.0.0 --- what each means

- Evaluating packages --- weekly downloads, last updated, bundle size

**Vite --- Modern Build Tooling (Day 69 --- Tue 15 Sep)**

- What build tools solve --- bundling, transpilation, hot module
  replacement

- Vite setup --- npm create vite@latest --- React + JavaScript template

- Vite project structure --- index.html, src/, public/, vite.config.js

- HMR --- hot module replacement in development

- npm run build --- production bundle, dist/ folder

- Environment variables in Vite --- import.meta.env

**ESLint and Code Quality (Day 70 --- Wed 16 Sep)**

- ESLint setup --- eslint \--init, recommended config

- Common rules --- no-unused-vars, no-console, eqeqeq, prefer-const

- Prettier --- automatic code formatting, .prettierrc

- Pre-commit hooks with Husky --- running ESLint before every commit

- editor integration --- VS Code ESLint + Prettier extensions

**Git Professional Workflow (Day 71 --- Thu 17 Sep)**

- Branching strategy --- main, develop, feature/\*, fix/\*

- git checkout -b, git merge, git rebase --- when to use each

- Merge conflicts --- how to read conflict markers, resolve, and commit

- git stash --- saving work without committing

- git log \--oneline \--graph --- visualizing history

- git reset vs git revert --- the safe and unsafe ways to undo

- GitHub Pull Requests --- opening a PR, writing a description,
  self-reviewing

- GitHub Actions basics --- what CI/CD is, a simple hello-world workflow

- .gitignore patterns --- node_modules/, dist/, .env, \*.log

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference:                                              |
|                                                                 |
| 1\. Create a new Vite + React project, install a dependency,    |
| and run it in development mode.                                 |
|                                                                 |
| 2\. Create a feature branch, make a commit, and merge it into   |
| main via a GitHub PR.                                           |
|                                                                 |
| 3\. Explain the difference between git rebase and git merge in  |
| one sentence.                                                   |
|                                                                 |
| All three completed in under 20 minutes --- Week 10 is          |
| complete.                                                       |
+-----------------------------------------------------------------+

**Month 3 --- Week 11 \| 21--27 September 2026**

**React: JSX, Components, Props, State (useState)**

+-----------------------------------------------------------------+
| **🎯 WEEK 11 --- 21--27 September 2026**                        |
|                                                                 |
| **MISSION: Learn React by building --- not by reading. Write    |
| your first 20 components before reading a single tutorial.**    |
+-----------------------------------------------------------------+

**Why This Week is Prioritized**

React feels hard when it is learned from documentation before building.
It becomes intuitive when you build first and the documentation explains
what you already experienced. This week follows the Build-First
principle: write components, hit problems, then understand the solution.

**Topics and Subtopics**

**JSX and the React Mental Model (Day 74 --- Mon 21 Sep)**

- JSX --- not HTML, not a string --- a function call in disguise

- React.createElement() --- what JSX compiles to

- Why JSX: className, htmlFor, camelCase events --- the differences from
  HTML

- Expressions in JSX --- {variable}, {expression}, {functionCall()}

- Fragments --- \<\> \</\> --- avoiding unnecessary div wrappers

- Conditional rendering --- ternary, &&, early return patterns

- Self-closing tags --- required in JSX: \<input /\>, \<img /\>

**Components and Props (Day 75 --- Tue 22 Sep)**

- Functional components --- const MyComponent = () =\>
  \<div\>\...\</div\>

- Props --- passing data from parent to child

- Destructuring props --- const { name, age } = props

- Default props --- defaultProps or default parameter values

- children prop --- composing components with slots

- Prop types --- basic shape, when they matter

- Component composition vs inheritance --- why React favours composition

Practice: Build 10 isolated components --- Button, Card, Badge, Avatar,
Input, Modal, Dropdown, Spinner, Alert, Navbar --- all props-driven, no
state yet.

**useState --- Managing Component State (Day 76 --- Wed 23 Sep)**

- useState hook --- const \[value, setValue\] = useState(initialValue)

- Why state causes re-render --- React\'s reconciliation model

- State update rules --- never mutate state directly

- Functional updates --- setValue(prev =\> prev + 1) --- when it matters

- Multiple state variables vs single state object --- trade-offs

- Lifting state up --- sharing state between sibling components

- Controlled components --- input value driven by state

Practice: Counter with undo, toggle dark mode, form with live
validation, shopping cart with quantity control, multi-step wizard ---
all with useState only.

**Event Handling in React (Day 77 --- Thu 24 Sep)**

- onClick, onChange, onSubmit, onKeyDown --- React synthetic events

- Event handler functions vs inline functions --- performance trade-offs

- Preventing default form submission --- e.preventDefault()

- Passing arguments to event handlers --- arrow function wrapper pattern

- Event bubbling in React --- same model as DOM but through React\'s
  delegation

**Days 78--80 (Weekend + Mon) --- Mini Build: React Component Library**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| A Storybook-style showcase of 15 React components --- all       |
| state-driven, all interactive.                                  |
|                                                                 |
| Components required:                                            |
|                                                                 |
| Button (5 variants, 3 sizes, loading state, disabled state)     |
|                                                                 |
| Input (text, email, password, with error message, with prefix   |
| icon)                                                           |
|                                                                 |
| Checkbox and Radio group                                        |
|                                                                 |
| Select dropdown (custom, not native)                            |
|                                                                 |
| Modal (open/close state, backdrop click to close)               |
|                                                                 |
| Toast notification system (queue-based, auto-dismiss)           |
|                                                                 |
| Tabs (with active state)                                        |
|                                                                 |
| Accordion (multiple open or single open mode)                   |
|                                                                 |
| DataTable (sortable columns, row selection)                     |
|                                                                 |
| Pagination (page number display, next/prev)                     |
|                                                                 |
| SearchBar (with debounce, clear button)                         |
|                                                                 |
| TagInput (add/remove tags)                                      |
|                                                                 |
| StarRating (interactive hover + click)                          |
|                                                                 |
| ProgressSteps (wizard progress indicator)                       |
|                                                                 |
| ColorPicker (basic --- 6 presets + custom hex)                  |
|                                                                 |
| Every component documented with props table in README.          |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference, in under 12 minutes:                         |
|                                                                 |
| 1\. Write a React component that accepts a list of items as     |
| props and renders them as a filterable list.                    |
|                                                                 |
| 2\. Write a controlled form component with name and email       |
| fields, validation, and a submit handler.                       |
|                                                                 |
| 3\. Implement a counter component where the count cannot go     |
| below zero.                                                     |
|                                                                 |
| All three written and working --- Week 11 is complete.          |
+-----------------------------------------------------------------+

**Month 3 --- Week 12 \| 28 September -- 4 October 2026**

**React: useEffect, Data Fetching, Lists, Conditional Rendering**

+-----------------------------------------------------------------+
| **🎯 WEEK 12 --- 28 Sep -- 4 Oct 2026**                         |
|                                                                 |
| **MISSION: Make React components dynamic --- connected to data, |
| conditionally rendered, and side-effect aware**                 |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**useEffect --- Managing Side Effects (Day 81 --- Mon 28 Sep)**

- What a side effect is --- anything that reaches outside the component

- useEffect(callback, \[deps\]) --- the dependency array is not optional

- Run on mount only --- useEffect(() =\> {}, \[\])

- Run on every render --- useEffect(() =\> {}) --- when is this correct?
  Rarely.

- Run on specific state change --- useEffect(() =\> {}, \[userId\])

- Cleanup --- return () =\> { \... } --- cancelling timers,
  subscriptions, fetch

- StrictMode double-invocation --- why effects run twice in development

- Common mistakes --- stale closure, missing dependencies, infinite
  loops

Real-World Connection: Every API call from a React component uses
useEffect. Every WebSocket subscription uses useEffect with cleanup.
Every timer uses useEffect with cleanup. This is the most misunderstood
hook --- understanding it at the conceptual level prevents 80% of React
bugs.

**Data Fetching Patterns in React (Day 82 --- Tue 29 Sep)**

- Fetch inside useEffect --- the standard pattern

- Loading / error / data state --- three-state model

- AbortController in useEffect --- cleaning up pending requests

- Custom hook pattern --- useFetch(url) --- extracting fetch logic

- Race condition --- why stale fetch results need cleanup

- Optimistic UI --- updating UI before server confirms (preview pattern)

Practice: User profile card that fetches from API, paginated post list,
search with debounced fetch, real-time data that polls every 5 seconds
with cleanup.

**Lists and Keys (Day 83 --- Wed 30 Sep)**

- .map() to render lists --- the JSX array pattern

- key prop --- why React requires it, why index is almost always wrong

- Stable keys --- using database IDs, UUIDs, or content hashes

- Rendering complex list items --- components inside .map()

- Empty states --- rendering placeholder when list is empty

- Virtualization concept --- why rendering 10,000 items needs a
  different approach

**Forms in React (Day 84 --- Thu 1 Oct)**

- Controlled vs uncontrolled inputs --- the React way vs the DOM way

- Managing form state --- single object vs individual state variables

- onChange for all input types --- text, checkbox, radio, select,
  textarea

- Form submission --- onSubmit, e.preventDefault()

- Validation --- synchronous field validation, error messages per field

- Multi-step forms --- step state, progress indicator

- File inputs in React --- handling FileList

**Days 85--87 (Weekend + Mon) --- Mini Project 2: React Weather
Dashboard**

+-----------------------------------------------------------------+
| **Mini Project 2 Specification**                                |
|                                                                 |
| Rebuild the vanilla JS Weather Dashboard from Month 2 --- now   |
| in React.                                                       |
|                                                                 |
| Architecture:                                                   |
|                                                                 |
| components/ --- WeatherCard, ForecastList, SearchBar,           |
| UnitToggle, HistoryList                                         |
|                                                                 |
| hooks/ --- useWeather(city), useLocalStorage(key, initialValue) |
|                                                                 |
| services/ --- weatherApi.js --- all fetch calls centralized     |
|                                                                 |
| App.jsx --- top-level state, orchestration                      |
|                                                                 |
| Required features (same as vanilla but implemented the React    |
| way):                                                           |
|                                                                 |
| Search with debounced fetch (custom hook)                       |
|                                                                 |
| Loading skeleton (conditional rendering)                        |
|                                                                 |
| Error handling (error state per component)                      |
|                                                                 |
| Unit toggle (lifted state)                                      |
|                                                                 |
| Search history (useLocalStorage custom hook)                    |
|                                                                 |
| 5-day forecast (mapped list with keys)                          |
|                                                                 |
| Compare your vanilla JS implementation with the React version.  |
| Note the differences.                                           |
|                                                                 |
| Both are on your portfolio. The contrast demonstrates growth.   |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Month 3 Exit Criteria:                                          |
|                                                                 |
| 1\. Can you explain the useEffect dependency array correctly in |
| under 60 seconds?                                               |
|                                                                 |
| 2\. Can you write a useFetch custom hook from memory?           |
|                                                                 |
| 3\. Is the React Weather Dashboard live on GitHub Pages?        |
|                                                                 |
| 4\. Are 15+ React components committed to your component        |
| library?                                                        |
|                                                                 |
| All complete --- Month 3 is done. Month 4 begins 5 October.     |
+-----------------------------------------------------------------+

**CHAPTER 5 --- MONTH 4 REACT + TYPESCRIPT 5 October -- 1 November
2026**

**Month 4 Objective**

Month 3 established React fundamentals. Month 4 completes the React
layer and adds TypeScript. By 1 November, you will build complete
multi-page React applications with routing, global state management, and
full TypeScript typing. The combination of React + TypeScript is the
industry standard for production frontend. This month\'s project will go
directly onto your resume.

**Month 4 Weekly Breakdown**

  ---------- ---------------- ----------------------------------------
  **Week**   **Dates**        **Focus**

  Week 13    5 Oct -- 11 Oct  React Advanced: useContext, useReducer,
                              Custom Hooks

  Week 14    12 Oct -- 18 Oct React Router v6 + TypeScript
                              Introduction

  Week 15    19 Oct -- 25 Oct TypeScript with React --- Full Typing of
                              Components and Hooks

  Week 16    26 Oct -- 1 Nov  Mini Project 3: Full-Stack-Ready React
                              App (TypeScript)
  ---------- ---------------- ----------------------------------------

**Month 4 --- Week 13 \| 5--11 October 2026**

**React Advanced: useContext, useReducer, Custom Hooks, Performance**

+-----------------------------------------------------------------+
| **🎯 WEEK 13 --- 5--11 October 2026**                           |
|                                                                 |
| **MISSION: Move beyond basic React --- manage application-level |
| state and optimise rendering**                                  |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**useContext --- Avoiding Prop Drilling (Day 88 --- Mon 5 Oct)**

- The prop drilling problem --- passing data through 4+ levels of
  components

- React.createContext() --- creating a context object

- Context.Provider --- wrapping the component tree

- useContext() --- consuming the context value

- Context with state --- combining createContext + useState

- Multiple contexts --- ThemeContext, AuthContext, CartContext

- Context vs prop passing --- when context is not the answer

Practice: Build a theme system (dark/light) using Context. Build a user
authentication context that makes user data available everywhere without
prop drilling.

**useReducer --- Predictable State Management (Day 89 --- Tue 6 Oct)**

- useReducer(reducer, initialState) --- state + dispatch pattern

- Reducer function --- (state, action) =\> newState

- Action objects --- { type: \"INCREMENT\", payload: 1 }

- When useReducer over useState --- complex state with multiple
  sub-values, next state depends on action type

- useContext + useReducer --- the lightweight Redux pattern

- Immer preview --- why immutable updates are verbose

Practice: Build a shopping cart using useReducer: ADD_ITEM, REMOVE_ITEM,
UPDATE_QUANTITY, CLEAR_CART, APPLY_COUPON actions.

**Custom Hooks --- Reusable Logic (Day 90 --- Wed 7 Oct)**

- Rules of hooks --- only call at top level, only in React functions

- Custom hook naming convention --- always starts with use

- Extracting stateful logic into reusable hooks

- useLocalStorage(key, initialValue) --- full implementation

- useDebounce(value, delay) --- debounced value

- useMediaQuery(query) --- responsive logic in JS

- useOnClickOutside(ref, handler) --- close modals on outside click

- usePrevious(value) --- tracking the previous render\'s value

Practice: Build a custom hook library --- 8+ hooks --- all tested
manually in a showcase app.

**React Performance (Day 91 --- Thu 8 Oct)**

- When React re-renders --- state change, parent re-render, context
  change

- React.memo --- preventing re-render if props haven\'t changed

- useCallback --- stable function references across renders

- useMemo --- expensive computation caching

- React DevTools Profiler --- measuring render time, finding bottlenecks

- Key prop in lists --- why wrong keys cause re-renders of the wrong
  items

- Code splitting --- React.lazy + Suspense for route-level splitting

Real-World Connection: A React app that re-renders 40 components on
every keystroke feels sluggish. React.memo and useCallback are the
primary tools for fixing it --- but premature optimization is also a
trap. This session teaches when to optimize, not just how.

**Days 92--93 (Weekend) --- Mini Build: Global State App**

+-----------------------------------------------------------------+
| **Build Specification**                                         |
|                                                                 |
| An e-commerce product listing with full global state            |
| management.                                                     |
|                                                                 |
| State managed via Context + useReducer:                         |
|                                                                 |
| CartContext --- items, quantities, totals, ADD_ITEM,            |
| REMOVE_ITEM, CLEAR                                              |
|                                                                 |
| AuthContext --- user, isAuthenticated, LOGIN, LOGOUT            |
|                                                                 |
| ThemeContext --- theme, TOGGLE_THEME                            |
|                                                                 |
| Components:                                                     |
|                                                                 |
| ProductGrid --- fetches from FakeStore API, lazy-loads images   |
|                                                                 |
| ProductCard --- React.memo wrapped, shows add-to-cart button    |
|                                                                 |
| CartDrawer --- slides in from right, full cart management       |
|                                                                 |
| Header --- shows cart count badge, user avatar, theme toggle    |
|                                                                 |
| FilterPanel --- filter by category, price range (computed from  |
| state)                                                          |
|                                                                 |
| Custom hooks used: useCart(), useAuth(), useTheme(),            |
| useFetch(), useDebounce()                                       |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference:                                              |
|                                                                 |
| 1\. Write a custom useWindowSize hook that returns { width,     |
| height } and updates on resize.                                 |
|                                                                 |
| 2\. Implement a CartContext with useContext + useReducer        |
| supporting add and remove actions.                              |
|                                                                 |
| 3\. Explain when to use useCallback vs useMemo --- one sentence |
| each.                                                           |
|                                                                 |
| All completed correctly --- Week 13 is complete.                |
+-----------------------------------------------------------------+

**Month 4 --- Week 14 \| 12--18 October 2026**

**React Router v6 + TypeScript Introduction**

+-----------------------------------------------------------------+
| **🎯 WEEK 14 --- 12--18 October 2026**                          |
|                                                                 |
| **MISSION: Build multi-page React applications with routing,    |
| then add TypeScript as the type layer**                         |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**React Router v6 (Day 95 --- Mon 12 Oct)**

- Why client-side routing --- SPAs vs multi-page apps

- BrowserRouter, Routes, Route --- the v6 setup

- Link and NavLink --- navigation without page reload

- useNavigate --- programmatic navigation

- useParams --- reading URL parameters: /users/:id

- useSearchParams --- query string management: ?page=2&sort=name

- Nested routes --- layouts that persist across child routes

- Outlet --- rendering child routes inside a parent layout

- Protected routes --- redirect to login if not authenticated

- 404 page --- catch-all route

Practice: Convert the Weather Dashboard to a multi-page app --- / home,
/search, /history, /settings --- all with back button support and
shareable URLs.

**TypeScript Fundamentals (Day 96 --- Tue 13 Oct)**

- What TypeScript adds --- compile-time type checking over JavaScript

- Basic types --- string, number, boolean, null, undefined, never,
  unknown, any

- Type inference --- TypeScript guesses types without annotations

- Explicit annotations --- const name: string = \"Sathwik\"

- Object types and interfaces --- interface User { name: string; age:
  number }

- Type aliases --- type ID = string \| number

- Union types --- string \| number, TypeA \| TypeB

- Intersection types --- TypeA & TypeB

- Literal types --- type Direction = \"north\" \| \"south\" \| \"east\"
  \| \"west\"

- Optional properties --- { name: string; age?: number }

**TypeScript Arrays, Generics, Utility Types (Day 97 --- Wed 14 Oct)**

- Typed arrays --- string\[\], Array\<string\>

- Tuple types --- \[string, number\] --- fixed-length typed arrays

- Generics --- function identity\<T\>(arg: T): T

- Generic constraints --- T extends { id: number }

- Built-in utility types --- Partial\<T\>, Required\<T\>, Readonly\<T\>,
  Pick\<T, K\>, Omit\<T, K\>, Record\<K, V\>

- keyof --- extracting the keys of a type

- typeof --- getting the type of a value

- Enum --- when to use, when to prefer union types

**TypeScript Functions and Async (Day 98 --- Thu 15 Oct)**

- Function type annotations --- parameters and return types

- Optional and default parameters in TypeScript

- Overloaded functions

- Promise\<T\> --- typing async functions

- Type narrowing --- typeof, instanceof, in, custom type guards

- Discriminated unions --- { type: \"success\", data: T } \| { type:
  \"error\", message: string }

Real-World Connection: FastAPI sends JSON responses. TypeScript types on
the frontend mirror the Pydantic models on the backend. When you build
full-stack in Month 5--6, your TypeScript types and Python models become
two sides of the same contract. Errors at the type level mean no bugs at
runtime.

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference:                                              |
|                                                                 |
| 1\. Write a TypeScript generic function fetchData\<T\>(url:     |
| string): Promise\<T\> with error handling.                      |
|                                                                 |
| 2\. Create a discriminated union type for an API response:      |
| success with data, or error with a message.                     |
|                                                                 |
| 3\. Add a protected route to a React Router setup that          |
| redirects to /login if isAuthenticated is false.                |
|                                                                 |
| All completed --- Week 14 is complete.                          |
+-----------------------------------------------------------------+

**Month 4 --- Week 15 \| 19--25 October 2026**

**TypeScript with React --- Full Typing of Components, Hooks, and
Context**

+-----------------------------------------------------------------+
| **🎯 WEEK 15 --- 19--25 October 2026**                          |
|                                                                 |
| **MISSION: Type every React pattern correctly --- props, state, |
| events, context, and custom hooks**                             |
+-----------------------------------------------------------------+

**Topics and Subtopics**

**Typing React Components (Day 101 --- Mon 19 Oct)**

- FC\<Props\> vs explicit return type --- which is preferred and why

- Typing props interfaces --- required, optional, callback types

- children prop type --- React.ReactNode vs React.ReactElement

- Event types --- React.MouseEvent\<HTMLButtonElement\>,
  React.ChangeEvent\<HTMLInputElement\>

- Ref types --- React.RefObject\<HTMLInputElement\>, useRef\<T\>

- forwardRef --- typed forwarded refs

**Typing Hooks and Context (Day 102 --- Tue 20 Oct)**

- useState\<T\> --- explicit typing when initial value is ambiguous

- useReducer --- typing actions as discriminated unions

- createContext\<T\> --- typed context with default value

- Custom hook return types --- returning tuples vs objects

- useRef\<T \| null\> --- when the ref might not exist yet

**TypeScript Configuration and Tooling (Day 103 --- Wed 21 Oct)**

- tsconfig.json --- strict mode (always on), target, module, paths

- Type declaration files --- .d.ts, \@types/\* packages

- Vite + TypeScript --- configuration differences

- Type-only imports --- import type { User } from \"./types\"

- Path aliases --- @/ mapping to src/ for cleaner imports

**API Integration Patterns with TypeScript (Day 104 --- Thu 22 Oct)**

- Defining API response types

- Type-safe fetch wrapper --- typed generic fetch function

- Zod --- runtime schema validation (preview) --- matching Pydantic on
  the frontend

- Error response types --- discriminated union for success/failure

- Environment variables typed --- ImportMetaEnv interface

**Days 105--106 (Weekend) --- Upgrade all existing projects to
TypeScript**

+-----------------------------------------------------------------+
| **TypeScript Migration Task**                                   |
|                                                                 |
| Convert your React Weather Dashboard (Month 3, Mini Project 2)  |
| fully to TypeScript.                                            |
|                                                                 |
| Steps:                                                          |
|                                                                 |
| Rename all .jsx files to .tsx                                   |
|                                                                 |
| Add TypeScript interfaces for all API response types from       |
| OpenWeatherMap                                                  |
|                                                                 |
| Type all props for every component                              |
|                                                                 |
| Type all custom hooks return types                              |
|                                                                 |
| Type all event handlers                                         |
|                                                                 |
| Fix every TypeScript error until tsc \--noEmit passes with zero |
| errors                                                          |
|                                                                 |
| This migration exercise teaches TypeScript more effectively     |
| than any tutorial.                                              |
|                                                                 |
| Migrating existing code forces you to understand every type     |
| decision, not just copy patterns.                               |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Without reference:                                              |
|                                                                 |
| 1\. Write a typed React component that accepts a list of User   |
| objects and a callback onSelect(user: User): void.              |
|                                                                 |
| 2\. Type a useReducer with a CartState and CartAction           |
| discriminated union.                                            |
|                                                                 |
| 3\. Write a generic useFetch\<T\>(url: string) custom hook with |
| loading, error, and data typed correctly.                       |
|                                                                 |
| All completed --- Week 15 is complete.                          |
+-----------------------------------------------------------------+

**Month 4 --- Week 16 \| 26 October -- 1 November 2026**

**Mini Project 3 --- Full React + TypeScript Application**

+-----------------------------------------------------------------+
| **🎯 WEEK 16 --- 26 Oct -- 1 Nov 2026**                         |
|                                                                 |
| **MISSION: Build a production-worthy React + TypeScript         |
| application. This goes on your resume.**                        |
+-----------------------------------------------------------------+

**Mini Project 3: Expense Tracker Pro (React + TypeScript)**

+-----------------------------------------------------------------+
| **Project 3 Specification**                                     |
|                                                                 |
| A complete personal expense tracking application in React +     |
| TypeScript.                                                     |
|                                                                 |
| Features:                                                       |
|                                                                 |
| Transaction management --- add income/expense, edit, delete,    |
| categorize                                                      |
|                                                                 |
| Dashboard --- monthly summary, spending by category (bar chart  |
| using recharts)                                                 |
|                                                                 |
| Recurring transactions --- set daily/weekly/monthly recurring   |
| entries                                                         |
|                                                                 |
| Budget goals --- set budget per category, progress bar towards  |
| limit                                                           |
|                                                                 |
| Filters --- date range, category, transaction type, search by   |
| description                                                     |
|                                                                 |
| Export --- download filtered transactions as CSV                |
|                                                                 |
| Multi-page --- React Router: /dashboard, /transactions,         |
| /budgets, /settings                                             |
|                                                                 |
| Dark/light mode --- persisted in localStorage                   |
|                                                                 |
| Technical standards:                                            |
|                                                                 |
| TypeScript strict mode --- zero any, zero ts-ignore             |
|                                                                 |
| All API calls (localStorage operations) through a typed service |
| layer                                                           |
|                                                                 |
| Context + useReducer for global state                           |
|                                                                 |
| Custom hooks: useTransactions(), useBudgets(), useCategories()  |
|                                                                 |
| ESLint + Prettier configured, zero lint warnings                |
|                                                                 |
| Mobile responsive --- works on 320px                            |
|                                                                 |
| Deployed on Vercel or GitHub Pages                              |
|                                                                 |
| README must include: setup instructions, architecture overview, |
| feature screenshots.                                            |
|                                                                 |
| This is Portfolio Project 1. It demonstrates React + TypeScript |
| proficiency to recruiters.                                      |
+-----------------------------------------------------------------+

+-----------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                             |
|                                                                 |
| Month 4 Exit Criteria --- complete all before MID-2 examination |
| period:                                                         |
|                                                                 |
| 1\. Is Mini Project 3 live and accessible via a public URL?     |
|                                                                 |
| 2\. Does tsc \--noEmit pass with zero errors on the project?    |
|                                                                 |
| 3\. Can you explain the architecture of Project 3 (state        |
| management, routing, component hierarchy) in under 3 minutes?   |
|                                                                 |
| 4\. Can you write a typed React component from scratch in under |
| 10 minutes?                                                     |
|                                                                 |
| 5\. Can you write a custom TypeScript hook from scratch in      |
| under 8 minutes?                                                |
|                                                                 |
| All complete --- Month 4 is done. MID-2 exams begin 2 November. |
+-----------------------------------------------------------------+

**MID-2 EXAMINATION PERIOD 2 November -- 7 November 2026**

+-----------------------------------------------------------------+
| **Examination Period Rules**                                    |
|                                                                 |
| Same protocol as MID-1. College academics take absolute         |
| priority.                                                       |
|                                                                 |
| Daily commitment (1--2 hours maximum):                          |
|                                                                 |
| DSA / Java --- 45 minutes daily maintenance                     |
|                                                                 |
| Light roadmap review --- re-read one past week\'s notes         |
|                                                                 |
| GitHub commit streak --- one small improvement per day          |
|                                                                 |
| Resume update task --- do this during exam week:                |
|                                                                 |
| Add Mini Projects 1, 2, and 3 to your resume with bullet points |
|                                                                 |
| Update LinkedIn with your three projects and skills added this  |
| semester                                                        |
|                                                                 |
| Each project description: what it does, what technologies it    |
| uses, what you built                                            |
+-----------------------------------------------------------------+

**SEMESTER END EXAMINATIONS 16 November -- 28 November 2026**

+-----------------------------------------------------------------+
| **Semester End Exam Protocol**                                  |
|                                                                 |
| These are the semester final examinations. Engineering roadmap  |
| pauses completely.                                              |
|                                                                 |
| Daily commitment (45--60 minutes maximum):                      |
|                                                                 |
| DSA / Java only --- problem solving or Java revision to         |
| maintain momentum                                               |
|                                                                 |
| No new roadmap topics, no new builds                            |
|                                                                 |
| Plan for Semester 3-2 review on your last exam day:             |
|                                                                 |
| Read Volume 3 (FastAPI Deep Dive) over the semester break to    |
| mentally prepare                                                |
|                                                                 |
| Review all completed projects --- be ready to explain every     |
| architectural decision                                          |
+-----------------------------------------------------------------+

**SEMESTER BREAK 30 November -- 5 December 2026**

+-----------------------------------------------------------------+
| **Semester Break Plan**                                         |
|                                                                 |
| You have earned this rest. Use it correctly.                    |
|                                                                 |
| Rest period (30 Nov -- 2 Dec): No roadmap. Genuine rest.        |
|                                                                 |
| Light review (3 Dec -- 5 Dec):                                  |
|                                                                 |
| Read Volume 3 overview --- FastAPI, SQLAlchemy, authentication  |
| architecture                                                    |
|                                                                 |
| Review your Python decorator, Pydantic, and async notes from    |
| Month 1                                                         |
|                                                                 |
| Confirm development environment --- psycopg2, SQLAlchemy,       |
| Alembic, FastAPI all installed                                  |
|                                                                 |
| 7 December: Semester 3-2 begins. FastAPI Deep Dive. Volume 3    |
| takes over.                                                     |
+-----------------------------------------------------------------+

**CHAPTER 6 --- VOLUME 2 OUTCOMES**

**Engineering Capability Dashboard --- Post Volume 2**

  ---------------------- -------------------------------------------
  **Area**               **Post Volume 2 Level**

  Python ---             95% --- Complete. Never a learning topic
  Fundamentals           again.

  Python --- OOP +       90% --- Professional implementation
  Decorators             confidence

  Python --- Async +     85% --- Production-quality code from Day 1
  Testing                of Volume 3

  SQL --- Foundations    95% --- Permanent recall, interview-ready
                         in under 5 minutes

  SQL --- Advanced       90% --- Writes complex analytics queries
  (Window Functions)     independently

  SQL --- Schema         85% --- Designs normalized schemas with
  Design + Transactions  full integrity

  HTML --- Semantic +    90% --- Writes correct, accessible HTML
  Accessibility          instinctively

  CSS --- Flexbox + Grid 90% --- Lays out any design in under 20
                         minutes

  CSS --- Responsive +   80% --- Production-ready responsive design
  Animation              

  JavaScript --- Core    85% --- No reference needed for core
  Language               patterns

  JavaScript --- DOM +   85% --- Builds interactive UIs from scratch
  Events                 

  JavaScript --- Async + 85% --- Data fetching with full error
  Fetch                  handling

  React --- Components + 80% --- Comfortable implementation of all
  Hooks                  core patterns

  React --- Routing +    75% --- Multi-page apps with global state
  Context                

  TypeScript --- React   70% --- All components and hooks typed
  Integration            correctly

  Git + GitHub           85% --- Professional branching, meaningful
                         commits, PRs
  ---------------------- -------------------------------------------

**Projects Completed in Volume 2**

  ---------------------- -------------------------------------------
  **Project**            **Technologies + What It Demonstrates**

  Mini Project 0:        Python + psycopg2 + PostgreSQL. Full OOP +
  Student Grade          repository pattern + testing.
  Management CLI         

  Mini Project 1:        HTML + CSS + JS + Fetch API. On portfolio.
  Weather Dashboard      Demonstrates vanilla JS mastery.
  (Vanilla)              

  Mini Project 2: React  React + custom hooks + useEffect. Same app,
  Weather Dashboard      better architecture.

  Mini Project 3:        React + TypeScript + Router + Context +
  Expense Tracker Pro    recharts. Live on Vercel. Resume Project 1.
  ---------------------- -------------------------------------------

**What Volume 3 Unlocks**

Volume 2 closes the frontend and Python layers. Volume 3 --- Semester
3-2 Month 5 --- opens FastAPI. The Python skills from Month 1 become the
backend language. The Pydantic knowledge from Week 2 becomes the
request/response validation layer. The async knowledge from buffer
period becomes the async route definition pattern. The SQL skills from
Weeks 3--4 become the database query layer.

Volume 3 begins 7 December 2026 with FastAPI installation and the first
endpoint. Nothing from Volume 2 is wasted. Everything connects.

**The Mental Shift Volume 2 Produces**

  ------------------------ -----------------------------------------
  **Before Volume 2**      **After Volume 2**

  \"I can write Python.\"  \"I design Python software
                           architectures.\"

  \"I know SQL.\"          \"I design database schemas and optimize
                           queries.\"

  \"I can make a           \"I build responsive applications with
  webpage.\"               design systems.\"

  \"I\'ve used React.\"    \"I build production-quality React +
                           TypeScript applications.\"

  \"I commit when I        \"I commit every meaningful change with a
  finish.\"                clear message.\"

  \"AI helps me build.\"   \"I build. AI reviews what I built.\"
  ------------------------ -----------------------------------------

**🎓 Volume 2 Complete**

*Volume 3 --- Semester 3-2: FastAPI Deep Dive + Backend Architecture
continues this roadmap.*

Month 5 through Month 6 \| FastAPI \| SQLAlchemy \| Alembic \| JWT Auth
\| Full-Stack Integration
