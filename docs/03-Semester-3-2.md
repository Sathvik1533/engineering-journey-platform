**PRINCIPAL ENGINEERING ROADMAP**

**MASTER EDITION**

**Volume 3 --- Semester 3-2 Engineering Journey**

FastAPI · PostgreSQL · SQLAlchemy · Auth · Docker · Deployment · AI
Integration

  --------------------- -------------------------------------------------
  **Field**             **Detail**

  Student               Kotagiri Sathwik

  Institution           MLR Institute of Technology, Hyderabad

  Semester              3rd Year, 2nd Semester (3-2)

  Volume Period         7 December 2026 -- May 2027

  Continues From        Volume 2 --- Semester 3-1 Engineering Journey

  Document Status       Frozen After Approval --- Volume 3 of 5
  --------------------- -------------------------------------------------

From full-stack developer to production backend engineer.

**Table of Contents**

**CHAPTER 1 --- VOLUME 3 OVERVIEW**

Volume 2 closed the frontend layer. You now build complete, responsive,
multi-page applications in React and TypeScript. You design reusable
components, manage application state with Context and useReducer, wire
up routing with React Router v6, type every interface and hook with
TypeScript strict mode, and deploy finished applications that appear on
your resume.

Volume 3 opens the backend. Over five months --- 7 December 2026 through
May 2027 --- you will transform from a full-stack developer who
understands the backend into a production backend engineer who builds
it. You will architect and implement complete API services in FastAPI,
design and migrate production PostgreSQL schemas with SQLAlchemy and
Alembic, implement JWT and OAuth authentication, handle file uploads and
background tasks, write comprehensive test suites with pytest,
containerize applications with Docker, deploy to cloud platforms with
CI/CD pipelines, and integrate LLM APIs, RAG pipelines, and agentic
workflows into production-grade systems.

By the end of Volume 3, you will be placement-ready. Your portfolio will
contain two major production-grade projects. You will be able to
architect full-stack systems, implement every layer from database to API
to frontend, explain every architectural decision in an interview, and
pass live coding assessments without AI assistance.

**What Volume 3 Produces**

  ------------------------ ----------------------------------------------
  **Outcome**              **Details**

  FastAPI:                 Designs, builds, and documents production APIs
  Production-capable       from scratch

  PostgreSQL + SQLAlchemy  Designs schemas, writes migrations, queries
                           efficiently

  Authentication +         JWT, OAuth2, role-based access --- implemented
  Authorization            from memory

  Testing: pytest suite    Unit, integration, and async tests --- 80%+
                           coverage

  Docker: Containerized    Dockerfiles, docker-compose, multi-service
  apps                     setups

  Cloud Deployment + CI/CD Live applications with automated test and
                           deploy pipelines

  Redis + Caching          Cache layer, session management, background
                           queues

  AI Integration: LLM APIs OpenAI + Anthropic APIs integrated into
                           FastAPI services

  RAG Pipelines            Document ingestion, embedding, retrieval ---
                           production-ready

  LangGraph Agentic AI     Multi-step agent workflows integrated into
                           backend systems

  Portfolio Projects       Two major projects, live, deployed, explained
                           in interviews

  Placement-Ready          Resume complete, interviews rehearsed,
                           technical tests passable
  ------------------------ ----------------------------------------------

**Volume 3 Month Map**

  ------------ --------------------- -------------------------------------
  **Month**    **Dates**             **Core Focus**

  Month 5      7 Dec -- 3 Jan 2027   FastAPI Deep Dive + Backend
                                     Architecture

  Month 6      4 Jan -- 30 Jan 2027  Full-Stack Integration + Production
                                     Project 1

  MID-1 (3-2)  1 Feb -- 6 Feb 2027   Slow down --- revision + DSA only

  Month 7      8 Feb -- 7 Mar 2027   AI Engineering: LLM APIs → RAG
                                     Pipelines

  Month 8      8 Mar -- 3 Apr 2027   LangGraph + Agentic AI + Production
                                     Project 2

  MID-2 (3-2)  5 Apr -- 10 Apr 2027  Slow down --- revision + DSA only

  SEE (3-2)    19 Apr -- 1 May 2027  Exams --- DSA + Mock Interviews only

  Placement    May 2027+             FULLY PREPARED --- Projects live.
  Season                             Resume ready.
  ------------ --------------------- -------------------------------------

+-----------------------------------------------------------------------+
| **🔒 Volume 3 AI Rule --- Stage 3 and Stage 4 in Effect**             |
|                                                                       |
| Month 5 (FastAPI): AI reviews your code AFTER you have written it.    |
| You build independently, then ask.                                    |
|                                                                       |
| Month 6 (Integration): AI pair-programs with you. You drive all       |
| technical decisions.                                                  |
|                                                                       |
| Month 7--8 (AI Engineering): AI accelerates development. You          |
| understand every line before accepting it.                            |
|                                                                       |
| The benchmark for any stage: Could I rebuild this from scratch in an  |
| interview without AI?                                                 |
|                                                                       |
| If the answer is no --- you are not ready to move on.                 |
+-----------------------------------------------------------------------+

**CHAPTER 2 --- MONTH 5 FASTAPI DEEP DIVE + BACKEND ARCHITECTURE 7
December 2026 -- 3 January 2027**

**Month 5 Objective**

Month 5 takes everything you built in Volume 2 and puts it to work on
the backend. FastAPI is the framework. SQLAlchemy is the ORM. Alembic
handles migrations. Pydantic validates every request and response.
PostgreSQL is the database. By 3 January 2027, you will independently
design, implement, test, and document a production-ready REST API ---
with authentication, database integration, proper error handling, and a
full pytest suite.

This month is the highest-leverage month of the entire roadmap. Every
skill you built over Volumes 1 and 2 converges here: Python OOP becomes
your service layer, Pydantic becomes your schema layer, async Python
becomes your route layer, SQL becomes your query layer, pytest becomes
your test suite. Nothing from the previous months is wasted.

**Month 5 Weekly Breakdown**

  ---------- ---------------- -------------------------------------------
  **Week**   **Dates**        **Focus**

  Week 17    7 Dec -- 13 Dec  FastAPI Foundations: Routes, Pydantic,
                              Responses, Docs

  Week 18    14 Dec -- 20 Dec Database Layer: SQLAlchemy + Alembic +
                              Async DB

  Week 19    21 Dec -- 27 Dec Authentication + Authorization: JWT +
                              OAuth2 + RBAC

  Week 20    28 Dec -- 3 Jan  Production Features: File Uploads,
             2027             Background Tasks, Redis, Testing
  ---------- ---------------- -------------------------------------------

**Month 5 --- Week 17 \| 7--13 December 2026**

**FastAPI Foundations: Routes, Pydantic, Request/Response, Docs**

+-----------------------------------------------------------------------+
| **WEEK 17 --- 7--13 December 2026**                                   |
|                                                                       |
| **MISSION: Write your first production-grade FastAPI application from |
| scratch. No tutorials running in background. No copy-paste. Every     |
| route you type, you understand.**                                     |
+-----------------------------------------------------------------------+

**Why This Week is Prioritized**

FastAPI is the framework where every Python, Pydantic, and async skill
you have built converges into deployable software. The first week must
establish the mental model completely: how a request enters, how it is
validated, how it is processed, and how a response exits. Every
subsequent week builds on this model. If the foundation is shaky,
everything on top is fragile.

**Day 108 (Mon 7 Dec) --- FastAPI Mental Model + First Routes**

- FastAPI installation: pip install fastapi uvicorn\[standard\] httpx

- ASGI vs WSGI --- why FastAPI is fundamentally different from Flask

- The request/response cycle in FastAPI --- request in, validation,
  handler, response out

- Path operations: \@app.get, \@app.post, \@app.put, \@app.patch,
  \@app.delete

- Path parameters: /users/{user_id} --- type annotation enforces
  validation

- Query parameters: /items?skip=0&limit=10 --- defaults, Optional,
  required

- Request body: Pydantic model --- automatic JSON parsing and validation

- Response model: response_model= --- controls what is sent back

- Status codes: status_code=201, using status from fastapi

- Automatic OpenAPI docs: /docs (Swagger), /redoc --- explore your API
  live

Real-World Connection: Every endpoint you write today is the same
pattern you will use for the next two months. GET /users/{id}, POST
/users, PUT /users/{id}, DELETE /users/{id} --- this is the CRUD
backbone of every production API you will build.

**Day 109 (Tue 8 Dec) --- Pydantic Models + Request Validation**

- BaseModel for request bodies --- field types, defaults, required vs
  optional

- Field() --- validators, min_length, max_length, gt, lt, regex pattern

- EmailStr, HttpUrl, UUID --- Pydantic\'s semantic types

- Nested models --- User contains Address contains City

- \@field_validator --- custom validation logic with informative error
  messages

- \@model_validator --- cross-field validation (password ==
  confirm_password)

- response_model_exclude, response_model_include --- controlling output
  fields

- Schema models: separate Create, Update, Response models per entity

- model_config --- controlling JSON serialization behavior

- ValidationError handling --- returning 422 responses with clear field
  errors

**Day 110 (Wed 9 Dec) --- Dependency Injection + APIRouter**

- Depends() --- the dependency injection system, why it matters

- Simple dependencies: get_db(), get_current_user(), verify_token()

- Dependency chains --- a dependency that calls another dependency

- Class-based dependencies --- when state matters

- APIRouter --- organizing routes into separate files by feature

- Router prefixes and tags --- /api/v1/users, OpenAPI tag grouping

- Including routers in app: app.include_router()

- Versioning strategy --- /api/v1/ vs /api/v2/

- Lifespan events: \@asynccontextmanager + startup/shutdown hooks

Real-World Connection: Dependency injection is how FastAPI handles
authentication everywhere without duplicating code. Every protected
endpoint will use Depends(get_current_user) --- and you will implement
that dependency in Week 19.

**Day 111 (Thu 10 Dec) --- Error Handling + Middleware + CORS**

- HTTPException --- raising 404, 403, 401, 409 with detail messages

- \@app.exception_handler --- custom handlers for HTTPException and
  general Exception

- Custom exception classes --- raising domain-specific errors

- Global error handling middleware --- catch-all for unexpected errors

- RequestValidationError --- customizing 422 validation error responses

- Middleware: \@app.middleware(\'http\') --- logging, timing,
  correlation IDs

- CORSMiddleware --- configuring origins, methods, headers for frontend
  access

- TrustedHostMiddleware --- security in production

- GZipMiddleware --- compression for large responses

**Day 112 (Fri 11 Dec) --- Advanced Responses + Background Pattern
Preview**

- JSONResponse, HTMLResponse, FileResponse, StreamingResponse

- Response headers --- custom headers, content-type, cache-control

- Cookies --- setting and reading cookies

- Streaming responses --- when data is generated incrementally

- Custom OpenAPI schema --- metadata, servers, security schemes

- API versioning via headers vs URL path --- tradeoffs

- Rate limiting concept --- will implement with Redis in Week 20

**Days 113--114 (Weekend) --- Week 17 Mini Build**

+-----------------------------------------------------------------------+
| **Week 17 Mini Build --- Products API**                               |
|                                                                       |
| A fully documented REST API for product management. No database yet   |
| --- in-memory storage. Focus entirely on learning FastAPI patterns    |
| correctly.                                                            |
|                                                                       |
| **Endpoints**                                                         |
|                                                                       |
| GET /api/v1/products --- list all, with                               |
| ?category=&min_price=&max_price= query filters                        |
|                                                                       |
| GET /api/v1/products/{product_id} --- get one, 404 if not found       |
|                                                                       |
| POST /api/v1/products --- create with validation, returns 201         |
|                                                                       |
| PUT /api/v1/products/{product_id} --- full update                     |
|                                                                       |
| PATCH /api/v1/products/{product_id} --- partial update                |
|                                                                       |
| DELETE /api/v1/products/{product_id} --- soft delete (sets            |
| is_active=False)                                                      |
|                                                                       |
| GET /api/v1/products/categories --- distinct categories from          |
| in-memory store                                                       |
|                                                                       |
| **Pydantic Models (separate files)**                                  |
|                                                                       |
| ProductCreate(BaseModel) --- name, description, price (\> 0),         |
| category, stock_quantity (\>= 0)                                      |
|                                                                       |
| ProductUpdate(BaseModel) --- all fields Optional                      |
|                                                                       |
| ProductResponse(BaseModel) --- all fields + id, created_at, is_active |
|                                                                       |
| **Required**                                                          |
|                                                                       |
| APIRouter for products --- not all routes in main.py                  |
|                                                                       |
| Custom exception: ProductNotFoundError → mapped to 404                |
|                                                                       |
| Custom exception: DuplicateProductError → mapped to 409               |
|                                                                       |
| CORS configured for localhost:5173 (Vite dev server)                  |
|                                                                       |
| Request logging middleware --- logs method, path, status, response    |
| time                                                                  |
|                                                                       |
| Full OpenAPI documentation with descriptions on every endpoint        |
|                                                                       |
| Repository: fastapi-backend / week17-products-api                     |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference, in under 12 minutes:                               |
|                                                                       |
| 1\. Write a FastAPI route POST /orders with a Pydantic request model, |
| 201 response, and a custom                                            |
|                                                                       |
| OrderNotFoundError that maps to a 404 HTTPException.                  |
|                                                                       |
| 2\. Write a dependency get_pagination(skip: int = 0, limit: int = 20) |
| and apply it to a list endpoint.                                      |
|                                                                       |
| 3\. Explain the difference between response_model and JSONResponse in |
| one sentence each.                                                    |
|                                                                       |
| If all three completed correctly --- Week 17 is complete.             |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **📦 Deliverable**                                                    |
|                                                                       |
| Products API with all 7 endpoints --- committed to fastapi-backend/   |
|                                                                       |
| APIRouter structure --- not flat routes in main.py                    |
|                                                                       |
| Custom exception handlers --- not raw HTTPException everywhere        |
|                                                                       |
| Full OpenAPI documentation --- readable /docs with descriptions       |
|                                                                       |
| Middleware logging every request with timing                          |
+-----------------------------------------------------------------------+

**Month 5 --- Week 18 \| 14--20 December 2026**

**Database Layer: SQLAlchemy ORM + Alembic + Async Database Access**

+-----------------------------------------------------------------------+
| **WEEK 18 --- 14--20 December 2026**                                  |
|                                                                       |
| **MISSION: Connect FastAPI to PostgreSQL. Every endpoint now reads    |
| from and writes to a real database. This week is where backend        |
| engineering becomes real.**                                           |
+-----------------------------------------------------------------------+

**Why This Week is Prioritized**

In-memory storage is a toy. Production software persists data in a
database. This week installs the database layer permanently ---
SQLAlchemy as the ORM, Alembic for schema migrations, and async database
access patterns that handle real production traffic without blocking. By
the end of Week 18, your API endpoints will talk to PostgreSQL. That is
a production backend.

**Day 115 (Mon 14 Dec) --- SQLAlchemy ORM Foundations**

- SQLAlchemy 2.0 style --- declarative_base(), mapped_column(),
  Mapped\[\]

- Model definition --- class User(Base): \_\_tablename\_\_, columns,
  types

- Column types: String, Integer, Float, Boolean, DateTime, UUID, Text,
  Enum

- Relationships: relationship(), ForeignKey(), back_populates

- One-to-many: User has many Posts

- Many-to-many: Post has many Tags via association table

- One-to-one: User has one Profile

- Lazy vs eager loading: select, joined, subquery --- performance
  implications

- Timestamps: created_at, updated_at with default=datetime.utcnow

- Soft delete pattern: is_deleted column, filter on every query

**Day 116 (Tue 15 Dec) --- Alembic Migrations**

- Why migrations --- schema changes in production without data loss

- alembic init --- project setup, env.py, alembic.ini

- alembic revision \--autogenerate --- detecting model changes

- alembic upgrade head --- applying migrations

- alembic downgrade -1 --- reverting one migration

- Writing manual migrations --- when autogenerate is not enough

- Migration for adding columns, dropping columns, adding indexes

- Migration testing strategy --- always test upgrade and downgrade

- Deployment rule: migrations run before new code deploys

**Day 117 (Wed 16 Dec) --- Async SQLAlchemy + Session Management**

- async_engine, async_sessionmaker --- the async SQLAlchemy setup

- AsyncSession --- executing async queries

- await session.execute(select(User)) --- the 2.0 query style

- await session.get(User, user_id) --- fetch by primary key

- await session.add(), await session.commit(), await session.refresh()

- Session as dependency: get_db() yields AsyncSession, Depends(get_db)

- Transaction management --- when to commit vs rollback

- Connection pooling --- pool_size, max_overflow, pool_timeout

- N+1 query problem --- recognizing and solving with eager loading

**Day 118 (Thu 17 Dec) --- Repository Pattern with SQLAlchemy**

- Repository pattern applied: UserRepository, PostRepository

- Abstract base: class BaseRepository(ABC) with CRUD interface

- SQLAlchemy implementation: class SQLUserRepository(UserRepository)

- Service layer: UserService takes repository as constructor argument

- Testing benefit: swap SQLUserRepository for InMemoryUserRepository in
  tests

- Pagination: offset/limit queries, returning total count + page data

- Filtering: building dynamic WHERE clauses with SQLAlchemy expressions

- Ordering: order_by(), desc(), asc()

- select() with joinedload() --- loading related data in one query

**Day 119 (Fri 18 Dec) --- Integration: Products API + PostgreSQL**

- Migrate Week 17 Products API from in-memory dict to PostgreSQL

- Add SQLAlchemy Product model, create migration, run migration

- Replace in-memory operations with SQLAlchemy async session calls

- Seed script: populate 50 sample products with realistic data

- Add database-level indexes: category, price range queries become fast

- Test every endpoint against real PostgreSQL --- not just the happy
  path

**Days 120--121 (Weekend) --- Week 18 Mini Build**

+-----------------------------------------------------------------------+
| **Week 18 Mini Build --- Blog API with Full Database Layer**          |
|                                                                       |
| A blog API with users, posts, tags, and comments --- all stored in    |
| PostgreSQL.                                                           |
|                                                                       |
| **SQLAlchemy Models**                                                 |
|                                                                       |
| User: id (UUID), email (unique), username (unique), hashed_password,  |
| is_active, created_at                                                 |
|                                                                       |
| Post: id, title, slug (unique), content, author_id (FK),              |
| is_published, created_at, updated_at                                  |
|                                                                       |
| Tag: id, name (unique), slug                                          |
|                                                                       |
| PostTag: post_id, tag_id (many-to-many association)                   |
|                                                                       |
| Comment: id, post_id (FK), author_id (FK), content, created_at        |
|                                                                       |
| **Alembic**                                                           |
|                                                                       |
| Initial migration: all tables created                                 |
|                                                                       |
| Second migration: add view_count column to Post                       |
|                                                                       |
| Both upgrade and downgrade tested                                     |
|                                                                       |
| **Endpoints**                                                         |
|                                                                       |
| POST /users --- create user (password hashed with passlib before Week |
| 19)                                                                   |
|                                                                       |
| GET /posts --- paginated list, filter by tag, filter by author        |
|                                                                       |
| POST /posts --- create post, auto-generate slug from title            |
|                                                                       |
| GET /posts/{slug} --- get post by slug with author and tags           |
| eager-loaded                                                          |
|                                                                       |
| POST /posts/{post_id}/comments --- add comment                        |
|                                                                       |
| GET /posts/{post_id}/comments --- paginated comments                  |
|                                                                       |
| **Repository Structure**                                              |
|                                                                       |
| repositories/user_repo.py, post_repo.py, comment_repo.py              |
|                                                                       |
| services/post_service.py --- business logic, slug generation, tag     |
| attachment                                                            |
|                                                                       |
| Repository: fastapi-backend / week18-blog-api                         |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference, in under 15 minutes:                               |
|                                                                       |
| 1\. Write a SQLAlchemy 2.0 User model with id (UUID PK), email        |
| (unique), username, created_at.                                       |
|                                                                       |
| 2\. Write an async get_db() dependency that yields an AsyncSession.   |
|                                                                       |
| 3\. Write an async repository method get_user_by_email(email: str)    |
| -\> User \| None using                                                |
|                                                                       |
| select() and session.execute().                                       |
|                                                                       |
| 4\. Explain what Alembic does and what happens if you forget to run   |
| migrations before deploying.                                          |
|                                                                       |
| All four completed correctly --- Week 18 is complete.                 |
+-----------------------------------------------------------------------+

**Month 5 --- Week 19 \| 21--27 December 2026**

**Authentication + Authorization: JWT + OAuth2 + Role-Based Access
Control**

+-----------------------------------------------------------------------+
| **WEEK 19 --- 21--27 December 2026**                                  |
|                                                                       |
| **MISSION: Implement authentication from scratch. Not copy-paste from |
| tutorials. Write every token, every hash, every middleware yourself   |
| until you can explain it in an interview.**                           |
+-----------------------------------------------------------------------+

**Why This Week is Prioritized**

Authentication is the gate every production system stands behind. It is
tested in every technical interview and every code review. Candidates
who copy authentication from tutorials cannot explain it --- and they
cannot debug it when it breaks. This week builds authentication from
first principles so you can design it, explain it, and adapt it.

**Day 122 (Mon 21 Dec) --- Password Hashing + User Registration**

- Why passwords must never be stored in plaintext --- the breach
  scenario

- bcrypt algorithm --- cost factor, salt, why it is deliberately slow

- passlib with bcrypt: CryptContext, hash(), verify()

- User registration endpoint: validate email, check for duplicates, hash
  password, create user

- Timing attack prevention --- always verify hash even when user is not
  found

- Password strength validation --- minimum length, complexity
  requirements via Pydantic

- Email normalization --- lowercase before storing, avoid duplicate
  account tricks

**Day 123 (Tue 22 Dec) --- JWT: Access + Refresh Tokens**

- What a JWT is --- header.payload.signature structure, base64 encoding

- JWT claims: sub (subject), exp (expiry), iat (issued at), jti (token
  ID)

- python-jose: JWTError, jwt.encode(), jwt.decode()

- Access token: short-lived (15--60 minutes), carries user identity

- Refresh token: long-lived (7--30 days), stored in HttpOnly cookie

- Token rotation strategy --- refresh token used once, then rotated

- Refresh token revocation --- storing JTI in Redis or database

- Token blacklisting --- logout invalidates the token immediately

**Day 124 (Wed 23 Dec) --- FastAPI OAuth2 + Protected Routes**

- OAuth2PasswordBearer --- the FastAPI security scheme

- OAuth2PasswordRequestForm --- username + password form body

- Login endpoint: /auth/login --- verify credentials, return token pair

- get_current_user() dependency --- extracts and validates JWT from
  header

- get_current_active_user() --- checks is_active on top of JWT validity

- Protecting routes: Depends(get_current_user) on any endpoint

- Returning 401 Unauthorized vs 403 Forbidden --- when each is correct

- Token refresh endpoint: /auth/refresh --- validates refresh token,
  issues new access token

- Logout endpoint: /auth/logout --- blacklists the refresh token

**Day 125 (Thu 24 Dec) --- Role-Based Access Control (RBAC)**

- Role design: ADMIN, MODERATOR, USER --- stored on User model

- Permission check dependency: require_role(role: str) factory

- Resource ownership check: require_owner_or_admin(resource_user_id)

- Applying RBAC: DELETE /posts/{id} requires ADMIN or post owner

- Scopes in JWT --- embedding permissions in the token payload

- Admin endpoints: /admin/\* --- require_role(\'ADMIN\') on all

- Audit logging --- recording who did what, when, to which resource

**Day 126--127 (Weekend) --- Add Authentication to Blog API**

+-----------------------------------------------------------------------+
| **Week 19 Mini Build --- Blog API with Full Authentication**          |
|                                                                       |
| Extend the Week 18 Blog API with complete authentication and          |
| authorization.                                                        |
|                                                                       |
| **New Endpoints**                                                     |
|                                                                       |
| POST /auth/register --- full registration with validation and         |
| duplicate check                                                       |
|                                                                       |
| POST /auth/login --- returns access_token + sets refresh_token        |
| HttpOnly cookie                                                       |
|                                                                       |
| POST /auth/refresh --- issues new access token from refresh token     |
|                                                                       |
| POST /auth/logout --- blacklists refresh token                        |
|                                                                       |
| GET /auth/me --- returns current user profile (protected)             |
|                                                                       |
| **Protected Routes**                                                  |
|                                                                       |
| POST /posts --- requires authentication (any logged-in user)          |
|                                                                       |
| PUT /posts/{id} --- requires post owner OR admin                      |
|                                                                       |
| DELETE /posts/{id} --- requires post owner OR admin                   |
|                                                                       |
| POST /posts/{id}/comments --- requires authentication                 |
|                                                                       |
| GET /admin/users --- requires ADMIN role only                         |
|                                                                       |
| **Technical Requirements**                                            |
|                                                                       |
| Refresh tokens stored in HttpOnly cookies --- not localStorage        |
|                                                                       |
| Access tokens expire in 30 minutes, refresh tokens in 7 days          |
|                                                                       |
| Password reset flow: /auth/forgot-password → email token →            |
| /auth/reset-password                                                  |
|                                                                       |
| All auth operations produce audit log entries                         |
|                                                                       |
| Repository: fastapi-backend / week19-blog-auth                        |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference, in under 15 minutes:                               |
|                                                                       |
| 1\. Write a create_access_token(data: dict, expires_minutes: int)     |
| function using python-jose.                                           |
|                                                                       |
| 2\. Write a get_current_user() FastAPI dependency that decodes the    |
| JWT and returns the user.                                             |
|                                                                       |
| 3\. Write a require_role(\'ADMIN\') dependency that raises 403 if the |
| user is not an admin.                                                 |
|                                                                       |
| 4\. Explain: what happens when an access token expires and the client |
| needs a new one?                                                      |
|                                                                       |
| All four completed --- Week 19 is complete.                           |
+-----------------------------------------------------------------------+

**Month 5 --- Week 20 \| 28 December -- 3 January 2027**

**Production Features: File Uploads + Background Tasks + Redis +
pytest**

+-----------------------------------------------------------------------+
| **WEEK 20 --- 28 Dec 2026 -- 3 Jan 2027**                             |
|                                                                       |
| **MISSION: Add the production features that transform a working API   |
| into production software: file handling, async background tasks,      |
| Redis caching, and a complete pytest suite.**                         |
+-----------------------------------------------------------------------+

**Day 128 (Mon 28 Dec) --- File Uploads + Storage**

- UploadFile and File in FastAPI --- multipart/form-data

- Single and multiple file uploads

- File validation: MIME type, size limit, extension whitelist

- Saving uploaded files --- local storage for development

- Generating unique filenames --- UUID to prevent collisions

- Serving static files: StaticFiles mount

- Cloud storage concept: S3-compatible upload pattern (boto3 preview)

- Avatar upload endpoint: POST /users/me/avatar --- validates image,
  stores, updates user record

**Day 129 (Tue 29 Dec) --- Background Tasks**

- FastAPI BackgroundTasks --- running tasks after response is sent

- Use cases: sending email, generating report, processing image, writing
  logs

- background_tasks.add_task(function, \*args) --- adding tasks to the
  queue

- Multiple background tasks per request

- Limitations of BackgroundTasks --- same process, not fault-tolerant

- Celery concept --- when BackgroundTasks is not enough (high volume,
  retries)

- Email sending simulation: background task sends welcome email on
  registration

**Day 130 (Wed 30 Dec) --- Redis + Caching + Rate Limiting**

- Redis fundamentals: strings, hashes, lists, sets, sorted sets

- redis-py async client: aioredis / redis.asyncio

- Caching pattern: cache-aside --- check cache, miss → DB → populate
  cache

- Cache invalidation --- when to evict: time-based TTL vs event-based

- Caching expensive queries: GET /posts?tag= caches for 5 minutes

- Rate limiting with Redis: sliding window counter per user per endpoint

- Session storage: store refresh token blacklist in Redis sorted set

- Redis pub/sub concept --- for real-time features in Volume 4

**Day 131 (Thu 31 Dec) --- pytest for FastAPI: Comprehensive Test
Suite**

- pytest-asyncio --- testing async FastAPI endpoints

- TestClient vs AsyncClient (httpx) --- when to use each

- Test database --- SQLite for speed in tests, PostgreSQL for CI/CD

- Fixtures: async_client, db_session, test_user, auth_headers

- Testing authentication: login fixture returns auth headers for
  protected tests

- Factory pattern for test data --- creating realistic test objects

- Testing file uploads: BytesIO, multipart simulation

- Mocking external services: patch email sending, mock Redis

- Coverage: pytest-cov, 80%+ target --- reading coverage reports

**Days 132--134 (Weekend + New Year) --- Month 5 Capstone Project**

+-----------------------------------------------------------------------+
| **Month 5 Capstone: Complete Blog Platform API**                      |
|                                                                       |
| The Blog API from Weeks 18--19, extended with Week 20 production      |
| features, tested completely, and documented professionally.           |
|                                                                       |
| **All Endpoints (26 total)**                                          |
|                                                                       |
| AUTH: register, login, refresh, logout, me, forgot-password,          |
| reset-password                                                        |
|                                                                       |
| USERS: list (admin), get by id, update profile, upload avatar,        |
| deactivate (admin)                                                    |
|                                                                       |
| POSTS: list (paginated, filtered, searched), get by slug, create,     |
| update, delete, publish/unpublish                                     |
|                                                                       |
| TAGS: list, create (admin), add to post, remove from post             |
|                                                                       |
| COMMENTS: list per post, create, delete (owner or admin)              |
|                                                                       |
| ADMIN: user management, post moderation, system stats                 |
|                                                                       |
| **Production Features**                                               |
|                                                                       |
| File uploads: avatar images, validated by MIME type and size          |
|                                                                       |
| Background tasks: welcome email on register, notification on comment  |
|                                                                       |
| Redis caching: post list cached per filter combination, invalidated   |
| on write                                                              |
|                                                                       |
| Rate limiting: 100 req/minute per user, 20 req/minute for auth        |
| endpoints                                                             |
|                                                                       |
| **Test Suite (50+ tests)**                                            |
|                                                                       |
| Unit tests: all repository methods, all service methods               |
|                                                                       |
| Integration tests: all 26 endpoints --- happy path and error cases    |
|                                                                       |
| Auth tests: registration, login, token refresh, protected route       |
| access                                                                |
|                                                                       |
| Coverage target: 80%+ with pytest-cov                                 |
|                                                                       |
| **Documentation**                                                     |
|                                                                       |
| README with setup, environment variables, database setup, running     |
| tests                                                                 |
|                                                                       |
| OpenAPI schema complete --- every endpoint documented with examples   |
|                                                                       |
| Architecture diagram: request → middleware → route → dependency →     |
| service → repository → DB                                             |
|                                                                       |
| Repository: fastapi-backend / month5-blog-platform                    |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Month 5 Exit Criteria --- all must be true before Month 6 begins:     |
|                                                                       |
| 1\. Can you set up a FastAPI project from scratch --- router          |
| structure, database, auth --- in under 30 min?                        |
|                                                                       |
| 2\. Can you explain JWT authentication from token creation to         |
| protected route validation without notes?                             |
|                                                                       |
| 3\. Does the Blog Platform API have 80%+ test coverage?               |
|                                                                       |
| 4\. Can you implement a Redis cache-aside pattern from memory in      |
| under 10 minutes?                                                     |
|                                                                       |
| 5\. Is your Blog Platform API committed with a professional README?   |
|                                                                       |
| All complete --- Month 5 is done. Month 6 begins 4 January 2027.      |
+-----------------------------------------------------------------------+

**CHAPTER 3 --- MONTH 6 FULL-STACK INTEGRATION + PRODUCTION PROJECT 1 4
January -- 30 January 2027**

**Month 6 Objective**

Month 5 produced a production-grade backend. Month 6 connects it to a
professional frontend and deploys it to the real internet. You will
integrate your FastAPI backend with your React + TypeScript frontend
from Volume 2, implement Docker containerization, configure CI/CD
pipelines, and complete Portfolio Project 1 --- a full-stack application
with live URL, professional README, and complete feature set ready for
resume and interviews.

**Month 6 Weekly Breakdown**

  ---------- ------------------ ------------------------------------------
  **Week**   **Dates**          **Focus**

  Week 21    4 Jan -- 10 Jan    Docker + Linux Essentials + Environment
                                Management

  Week 22    11 Jan -- 17 Jan   Full-Stack Integration: React ↔ FastAPI

  Week 23    18 Jan -- 24 Jan   Deployment + CI/CD + Cloud Platform

  Week 24    25 Jan -- 30 Jan   Portfolio Project 1: Complete Full-Stack
                                Application
  ---------- ------------------ ------------------------------------------

**Month 6 --- Week 21 \| 4--10 January 2027**

**Docker + Linux Essentials + Production Environment Management**

+-----------------------------------------------------------------------+
| **WEEK 21 --- 4--10 January 2027**                                    |
|                                                                       |
| **MISSION: Containerize your application. Make it run identically on  |
| your machine, your teammate\'s machine, and a cloud server. This is   |
| what production engineering means.**                                  |
+-----------------------------------------------------------------------+

**Day 135 (Mon 4 Jan) --- Linux Essentials for Backend Engineers**

- File system: /, /home, /etc, /var/log, /tmp --- what lives where

- Essential commands: ls, cd, cat, grep, find, chmod, chown, ps, kill,
  top, df, du

- File permissions: rwxrwxrwx, chmod 755, chmod +x

- Environment variables: export, .bashrc, .env files

- Process management: systemd, journalctl, service status

- Network tools: curl, wget, netstat, ss, ping, nslookup

- SSH basics: ssh-keygen, ssh user@host, scp

- Package management: apt update, apt install --- installing production
  dependencies

Real-World Connection: Your deployed application lives on a Linux
server. When something goes wrong at 2am, you need to SSH in, grep the
logs, check the process status, and fix it. These commands are not
optional --- they are production debugging tools.

**Day 136 (Tue 5 Jan) --- Docker Fundamentals**

- Why Docker --- reproducible environments, eliminating \'works on my
  machine\'

- Images vs containers --- templates vs running instances

- Dockerfile: FROM, WORKDIR, COPY, RUN, ENV, EXPOSE, CMD

- docker build -t app-name . --- building an image

- docker run -p 8000:8000 app-name --- running a container

- docker ps, docker logs, docker exec -it --- managing running
  containers

- docker stop, docker rm, docker rmi --- cleanup

- .dockerignore --- excluding node_modules, \_\_pycache\_\_, .env

- Multi-stage builds --- smaller production images (build stage +
  runtime stage)

**Day 137 (Wed 6 Jan) --- Docker Compose: Multi-Service Setup**

- docker-compose.yml --- defining services, networks, volumes

- Services: app (FastAPI), db (PostgreSQL), cache (Redis), nginx
  (reverse proxy)

- depends_on and healthcheck --- ensuring services start in order

- Volumes: persisting PostgreSQL data across container restarts

- Environment variables from .env file into docker-compose

- docker compose up -d, docker compose down, docker compose logs

- Running Alembic migrations inside a container

- Development vs production compose files ---
  docker-compose.override.yml

**Day 138 (Thu 7 Jan) --- Environment Management + Secrets**

- 12-factor app: configuration from environment, not code

- Environment-specific settings: development, staging, production

- Pydantic Settings: BaseSettings --- reads from .env automatically

- Required vs optional settings --- fail fast if critical config is
  missing

- Secret management: never in code, never in git, always from
  environment

- Database URL pattern: postgresql+asyncpg://user:pass@host:port/db

- Logging configuration per environment --- DEBUG in dev, WARNING in
  production

- Health check endpoint: GET /health --- returns status, DB connection,
  Redis connection

**Days 139--141 (Weekend + Mon) --- Dockerize Blog Platform**

+-----------------------------------------------------------------------+
| **Week 21 Mini Build --- Dockerized Blog Platform**                   |
|                                                                       |
| Containerize the Month 5 Blog Platform API completely.                |
|                                                                       |
| **Files to Create**                                                   |
|                                                                       |
| Dockerfile --- multi-stage: builder (install deps) + runtime (slim    |
| image)                                                                |
|                                                                       |
| docker-compose.yml --- app + postgres + redis services                |
|                                                                       |
| docker-compose.dev.yml --- override for development (auto-reload,     |
| exposed ports)                                                        |
|                                                                       |
| .env.example --- all required environment variables documented        |
|                                                                       |
| scripts/start.sh --- runs migrations then starts uvicorn              |
|                                                                       |
| scripts/test.sh --- runs pytest inside container                      |
|                                                                       |
| **Health Check Endpoint**                                             |
|                                                                       |
| GET /health --- returns { status, database: ok/error, redis:          |
| ok/error, version }                                                   |
|                                                                       |
| **Verification**                                                      |
|                                                                       |
| docker compose up --- entire stack starts from scratch                |
|                                                                       |
| All 50+ tests pass inside the container: docker compose run app       |
| pytest                                                                |
|                                                                       |
| Database persists data across docker compose down / up cycles         |
|                                                                       |
| Repository: fastapi-backend / week21-docker                           |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference, in under 10 minutes:                               |
|                                                                       |
| 1\. Write a Dockerfile for a FastAPI application with a multi-stage   |
| build.                                                                |
|                                                                       |
| 2\. Write a docker-compose.yml with app, postgres, and redis          |
| services.                                                             |
|                                                                       |
| 3\. Explain what a Docker volume does and why the database service    |
| needs one.                                                            |
|                                                                       |
| All three completed --- Week 21 is complete.                          |
+-----------------------------------------------------------------------+

**Month 6 --- Week 22 \| 11--17 January 2027**

**Full-Stack Integration: Connecting React TypeScript Frontend to
FastAPI Backend**

+-----------------------------------------------------------------------+
| **WEEK 22 --- 11--17 January 2027**                                   |
|                                                                       |
| **MISSION: Build the bridge between frontend and backend. A           |
| full-stack application is not two separate projects --- it is one     |
| system. Make it behave like one.**                                    |
+-----------------------------------------------------------------------+

**Day 142 (Mon 11 Jan) --- API Client Layer in React**

- Axios vs native fetch --- why axios for production (interceptors,
  cancellation)

- API client setup: axios instance with baseURL, timeout, headers

- Request interceptor --- automatically attaches Authorization: Bearer
  {token}

- Response interceptor --- handles 401 by refreshing token, retrying
  request

- Typed API functions: getPost(id: number): Promise\<PostResponse\>

- Centralized error handling --- API errors become typed AppError
  objects

- React Query (TanStack Query) --- server state management for API calls

- useQuery: data fetching, caching, background refetch, loading/error
  states

- useMutation: POST/PUT/DELETE with optimistic updates and cache
  invalidation

**Day 143 (Tue 12 Jan) --- Authentication Flow in React**

- AuthContext with access token in memory (not localStorage)

- Refresh token in HttpOnly cookie --- cannot be accessed by JS

- Login flow: POST /auth/login → store access token in memory → set
  cookie

- Persistent auth: on page refresh, call /auth/refresh to get new access
  token

- Axios interceptor: if 401 → refresh → retry original request → if
  still 401 → logout

- Protected routes: React Router redirects to /login if not
  authenticated

- Token expiry in UI: countdown timer, auto-refresh before expiry

**Day 144 (Wed 13 Jan) --- CORS, Proxy, and Local Development Setup**

- Vite proxy: proxy /api to http://localhost:8000 --- eliminates CORS in
  development

- FastAPI CORS: CORSMiddleware configured for production domain only

- Environment variables in Vite: VITE_API_URL --- different for dev and
  prod

- Cookie handling with cross-origin requests: withCredentials: true in
  axios

- Development vs production: docker compose for local, separate domains
  in prod

- nginx as reverse proxy: route /api/\* to FastAPI, everything else to
  React build

**Day 145 (Thu 14 Jan) --- Forms, File Uploads, Real-Time Patterns**

- React Hook Form + Zod --- type-safe form validation matching backend
  Pydantic models

- File upload from React: FormData, multipart request, progress tracking

- Optimistic updates with React Query: show new comment immediately
  before API confirms

- Infinite scroll pagination: useInfiniteQuery --- load more posts on
  scroll

- Search with debouncing: useQuery + debounce hook --- one request per
  pause

- WebSocket concept: real-time notifications --- preview for Volume 4

**Days 146--148 (Weekend + Mon) --- Full-Stack Blog Integration**

+-----------------------------------------------------------------------+
| **Week 22 Mini Build --- Blog Frontend Connected to FastAPI**         |
|                                                                       |
| Connect the Blog Platform API (Weeks 18-20) to a React TypeScript     |
| frontend.                                                             |
|                                                                       |
| **Pages**                                                             |
|                                                                       |
| / --- Home: post list with search, filter by tag, infinite scroll     |
|                                                                       |
| /post/:slug --- Post detail: full content, comments, like button      |
|                                                                       |
| /write --- Create/edit post: rich text, tag selection, save draft,    |
| publish                                                               |
|                                                                       |
| /login, /register --- Auth pages with React Hook Form + Zod           |
| validation                                                            |
|                                                                       |
| /profile --- User profile, avatar upload, edit details                |
|                                                                       |
| /admin --- Admin dashboard: user list, post moderation (ADMIN role    |
| only)                                                                 |
|                                                                       |
| **Technical Requirements**                                            |
|                                                                       |
| React Query for all API calls --- no useEffect + useState for         |
| fetching                                                              |
|                                                                       |
| Axios with request/response interceptors for auth                     |
|                                                                       |
| Auth tokens in memory --- refresh in HttpOnly cookie                  |
|                                                                       |
| TypeScript strict --- all API response types defined                  |
|                                                                       |
| React Hook Form + Zod --- validation matches backend exactly          |
|                                                                       |
| nginx docker service: serves React build + proxies /api to FastAPI    |
|                                                                       |
| Repository: fullstack-blog / (monorepo with frontend/ and backend/)   |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference:                                                    |
|                                                                       |
| 1\. Write an Axios instance that auto-attaches a Bearer token and     |
| retries 401s with a token refresh.                                    |
|                                                                       |
| 2\. Write a React Query useQuery call that fetches paginated posts    |
| with a loading and error state.                                       |
|                                                                       |
| 3\. Explain why access tokens are kept in memory (not localStorage)   |
| in a security-conscious app.                                          |
|                                                                       |
| All three --- Week 22 is complete.                                    |
+-----------------------------------------------------------------------+

**Month 6 --- Week 23 \| 18--24 January 2027**

**Deployment + CI/CD + Cloud Platform**

+-----------------------------------------------------------------------+
| **WEEK 23 --- 18--24 January 2027**                                   |
|                                                                       |
| **MISSION: Deploy your application to the real internet. Make it      |
| automatically test and redeploy on every push. This is what           |
| production engineering looks like.**                                  |
+-----------------------------------------------------------------------+

**Day 149 (Mon 18 Jan) --- Cloud Platform + VPS Fundamentals**

- Cloud options: Railway, Render, Fly.io, DigitalOcean App Platform ---
  choose one for deployment

- VPS option: DigitalOcean Droplet --- manual setup for learning

- Server provisioning: create server, SSH access, install Docker

- Domain setup: DNS A record pointing to server IP

- SSL/TLS: Let\'s Encrypt + Certbot --- HTTPS in under 10 minutes

- nginx configuration: HTTPS termination, reverse proxy to FastAPI

- Managed PostgreSQL vs self-hosted --- tradeoffs for a student project

**Day 150 (Tue 19 Jan) --- GitHub Actions: CI/CD Pipeline**

- .github/workflows/ci.yml --- automatic test run on every push

- Jobs: lint (ruff + eslint), test (pytest + vitest), build (docker
  build)

- GitHub Secrets: storing DATABASE_URL, JWT_SECRET, API keys securely

- Environment matrix: test against Python 3.11 and 3.12

- Docker Hub or GitHub Container Registry: push built image

- CD job: SSH to server, pull new image, run migrations, restart
  container

- Notifications: Slack or email on failed pipeline

- Branch protection: require CI to pass before merge to main

**Day 151 (Wed 20 Jan) --- Logging + Monitoring + Observability**

- Structured logging in FastAPI: structlog or logging with JSON
  formatter

- Log levels in production: WARNING and above only --- DEBUG is
  expensive

- Request logging middleware: correlation ID per request for tracing

- Error tracking concept: Sentry integration --- automatic exception
  capture

- Health check endpoint: /health with database and Redis status

- Uptime monitoring: UptimeRobot free tier --- alerts on downtime

- Application metrics: request count, response time, error rate ---
  concepts

- Log aggregation: how production systems centralize logs (ELK concept)

**Day 152--154 (Thu--Weekend) --- Deploy Full-Stack Blog**

+-----------------------------------------------------------------------+
| **Week 23 Mini Build --- Full-Stack Blog: Live on the Internet**      |
|                                                                       |
| Deploy the complete Full-Stack Blog (Week 22) to a cloud platform.    |
|                                                                       |
| **Deployment Target**                                                 |
|                                                                       |
| Option A: Railway --- easiest, free tier available, Docker-native     |
|                                                                       |
| Option B: DigitalOcean Droplet + Docker --- more control, closer to   |
| real production                                                       |
|                                                                       |
| Option C: Render --- free tier, automatic deploys from GitHub         |
|                                                                       |
| **Required**                                                          |
|                                                                       |
| Backend: FastAPI running on cloud, accessible via HTTPS               |
|                                                                       |
| Database: Managed PostgreSQL or Dockerized PostgreSQL with persistent |
| volume                                                                |
|                                                                       |
| Redis: Managed Redis or Dockerized Redis                              |
|                                                                       |
| Frontend: React build served via nginx or deployed to Vercel/Netlify  |
|                                                                       |
| Environment: all secrets in platform environment variables, NOT in    |
| code                                                                  |
|                                                                       |
| Migrations: Alembic upgrade head runs automatically on deploy         |
|                                                                       |
| **CI/CD Pipeline**                                                    |
|                                                                       |
| On push to main: run tests → build Docker image → deploy to cloud     |
|                                                                       |
| On pull request: run tests only (no deploy)                           |
|                                                                       |
| All secrets stored in GitHub Secrets --- zero hardcoded values        |
|                                                                       |
| **Deliverable**                                                       |
|                                                                       |
| A live URL you can share. README with the live URL prominently        |
| displayed.                                                            |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| 1\. Is your Full-Stack Blog accessible at a public HTTPS URL?         |
|                                                                       |
| 2\. Does pushing to main automatically run tests and redeploy?        |
|                                                                       |
| 3\. Can you explain your CI/CD pipeline in 2 minutes to an            |
| interviewer?                                                          |
|                                                                       |
| 4\. Are zero secrets hardcoded in your repository?                    |
|                                                                       |
| All four --- Week 23 is complete.                                     |
+-----------------------------------------------------------------------+

**Month 6 --- Week 24 \| 25--30 January 2027**

**Portfolio Project 1: Complete Full-Stack Application for Resume**

+-----------------------------------------------------------------------+
| **WEEK 24 --- 25--30 January 2027**                                   |
|                                                                       |
| **MISSION: Portfolio Project 1 is complete. Polish it to production   |
| standard. Add it to your resume. Be able to walk through every        |
| architectural decision in 5 minutes.**                                |
+-----------------------------------------------------------------------+

Week 24 is not a new technical week. It is a polish and consolidation
week. The full-stack blog is built and deployed. This week elevates it
from a working application to a portfolio-ready project that stands up
to interview scrutiny.

**Polish Checklist --- Days 155--159**

- README: Project overview, live URL, tech stack, architecture diagram,
  setup instructions, screenshots

- Code quality: zero TODO comments, consistent naming, no dead code, no
  print() in production

- Error handling: every endpoint handles every failure mode gracefully

- Test coverage: 80%+ --- fill gaps, especially edge cases in auth

- Performance: add database indexes, verify N+1 queries are resolved

- Security review: SQL injection impossible (SQLAlchemy prevents it),
  XSS mitigated (React escapes), CSRF token on cookie auth

- Mobile responsiveness: test every page at 375px, 768px, 1280px

- OpenAPI docs: every endpoint has description and example

- Seed data: the live app has realistic content --- not empty or test
  data

- LinkedIn: update with Project 1 --- tech stack, live link, 2-sentence
  description

+-----------------------------------------------------------------------+
| **📋 Portfolio Project 1 Interview Preparation**                      |
|                                                                       |
| Prepare answers to these questions. Practice them out loud --- not in |
| your head.                                                            |
|                                                                       |
| 1\. Walk me through your project architecture.                        |
|                                                                       |
| 2\. How does authentication work in your system?                      |
|                                                                       |
| 3\. Why did you choose FastAPI over Django or Flask?                  |
|                                                                       |
| 4\. How does your frontend communicate with your backend?             |
|                                                                       |
| 5\. What would you do differently if you were starting over?          |
|                                                                       |
| 6\. How does your CI/CD pipeline work?                                |
|                                                                       |
| 7\. What is the hardest bug you fixed during this project?            |
|                                                                       |
| 8\. How did you handle authentication token refresh without logging   |
| the user out?                                                         |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Month 6 Exit Criteria --- all must be true before Month 7 begins:     |
|                                                                       |
| 1\. Is Portfolio Project 1 live at a public HTTPS URL?                |
|                                                                       |
| 2\. Is the GitHub repository professional --- clean README, no        |
| secrets, no dead branches?                                            |
|                                                                       |
| 3\. Is Project 1 on your resume with the live URL and tech stack?     |
|                                                                       |
| 4\. Can you explain the full architecture in 5 minutes without notes? |
|                                                                       |
| 5\. Does CI/CD run automatically on push to main?                     |
|                                                                       |
| 6\. Is test coverage 80%+ with pytest-cov?                            |
|                                                                       |
| All six complete --- Month 6 is done. MID-1 exams begin 1 February    |
| 2027.                                                                 |
+-----------------------------------------------------------------------+

**MID-1 EXAMINATION PERIOD (3-2) 1 February -- 6 February 2027**

+-----------------------------------------------------------------------+
| **Examination Period Rules**                                          |
|                                                                       |
| College academics take absolute priority. Roadmap pauses.             |
|                                                                       |
| Daily commitment (1--2 hours maximum):                                |
|                                                                       |
| • DSA / Java --- 45 minutes daily maintenance                         |
|                                                                       |
| • Light roadmap review --- re-read Week 20 or Week 21 notes           |
|                                                                       |
| • GitHub commit streak --- one small improvement per day              |
| (documentation, comments, tests)                                      |
|                                                                       |
| Resume update task --- do this during exam week:                      |
|                                                                       |
| • Confirm Portfolio Project 1 is accurately described on resume       |
|                                                                       |
| • Prepare 3-minute verbal summary of Project 1 architecture for       |
| upcoming placement season                                             |
+-----------------------------------------------------------------------+

**CHAPTER 4 --- MONTH 7 AI ENGINEERING: LLM APIs → RAG PIPELINES 8
February -- 7 March 2027**

**Month 7 Objective**

You are now a backend engineer. You build production FastAPI
applications, connect them to PostgreSQL, authenticate users,
containerize with Docker, and deploy with CI/CD. Month 7 adds the AI
layer. Not as a toy integration --- as production-ready AI features
built on the solid backend foundation you have established.

By 7 March 2027, you will integrate OpenAI and Anthropic APIs into
FastAPI, implement production prompt engineering patterns, build a
complete RAG pipeline with vector search, and understand every component
deeply enough to explain it, debug it, and extend it without AI writing
the code for you.

**Month 7 Weekly Breakdown**

  ---------- ------------------ ------------------------------------------
  **Week**   **Dates**          **Focus**

  Week 25    8 Feb -- 14 Feb    LLM APIs: OpenAI + Anthropic + Prompt
                                Engineering

  Week 26    15 Feb -- 21 Feb   Embeddings + Vector Databases + Semantic
                                Search

  Week 27    22 Feb -- 28 Feb   RAG Pipeline: Document Ingestion →
                                Retrieval → Generation

  Week 28    1 Mar -- 7 Mar     Production AI Features: Streaming,
                                Structured Outputs, Caching
  ---------- ------------------ ------------------------------------------

**Month 7 --- Week 25 \| 8--14 February 2027**

**LLM APIs: OpenAI + Anthropic + Production Prompt Engineering**

+-----------------------------------------------------------------------+
| **WEEK 25 --- 8--14 February 2027**                                   |
|                                                                       |
| **MISSION: Learn to call LLMs like a backend engineer --- not like    |
| someone following a tutorial. Every API call is typed, every response |
| is parsed, every error is handled.**                                  |
+-----------------------------------------------------------------------+

**Day 162 (Mon 8 Feb) --- OpenAI API in FastAPI**

- openai Python SDK --- AsyncOpenAI for FastAPI compatibility

- chat.completions.create --- the primary method

- Message roles: system, user, assistant --- how conversations are
  structured

- Model selection: gpt-4o, gpt-4o-mini --- capability vs cost tradeoffs

- Temperature, max_tokens, top_p --- what they actually control

- API key management: environment variable, never hardcoded, never
  committed

- Async client: await client.chat.completions.create() in async FastAPI
  routes

- Error handling: openai.APIError, openai.RateLimitError,
  openai.APITimeoutError

- Retry logic with backoff --- exponential retry on rate limit errors

- Cost awareness: tracking token usage, estimating cost per request

**Day 163 (Tue 9 Feb) --- Anthropic API**

- anthropic Python SDK --- AsyncAnthropic for FastAPI compatibility

- messages.create --- the Anthropic equivalent

- System prompt as separate parameter --- different structure from
  OpenAI

- Claude model selection: claude-sonnet-4-6, claude-haiku-4-5 ---
  capability vs speed

- Vision: passing images in messages --- base64 or URL

- Error handling: anthropic.APIError, anthropic.RateLimitError

- Provider abstraction: LLMProvider(ABC) --- OpenAI and Anthropic as
  implementations

- Switching providers with one config change --- no code changes in
  service layer

**Day 164 (Wed 10 Feb) --- Production Prompt Engineering**

- System prompts: role definition, output format specification,
  constraint setting

- Few-shot prompting: examples in the prompt improve consistency

- Chain-of-thought: \'Think step by step\' for complex reasoning

- Prompt templates: Jinja2 or Python f-strings with structured slot
  filling

- Output format control: \'Respond ONLY in JSON\', \'Use this exact
  schema\'

- Prompt versioning: storing prompts in database or config --- not
  hardcoded

- Evaluation: comparing prompt variants, measuring output quality

- Prompt injection defense: sanitizing user input before inserting into
  prompts

**Day 165 (Thu 11 Feb) --- Structured Outputs + Function Calling**

- JSON mode: forcing LLM to respond in valid JSON --- OpenAI and
  Anthropic

- Pydantic model as output schema: parse LLM JSON response into typed
  model

- OpenAI structured outputs (schema-constrained): guaranteed valid JSON

- Function calling / tool use: defining tools the LLM can call

- Tool definition: name, description, parameters as JSON Schema

- Parsing tool calls from response: handling tool_calls in message

- Executing tools and returning results: continuing the conversation

- Multi-turn tool calling: LLM calls multiple tools before final
  response

**Days 166--168 (Weekend + Mon) --- Week 25 Mini Build**

+-----------------------------------------------------------------------+
| **Week 25 Mini Build --- AI Features API**                            |
|                                                                       |
| Add AI endpoints to your existing FastAPI blog platform.              |
|                                                                       |
| **New Endpoints**                                                     |
|                                                                       |
| POST /ai/summarize --- summarizes a blog post in 3 sentences, returns |
| structured JSON                                                       |
|                                                                       |
| POST /ai/tag-suggest --- given post content, suggests 5 relevant tags |
| using function calling                                                |
|                                                                       |
| POST /ai/improve --- given a paragraph, returns improved version with |
| explanation                                                           |
|                                                                       |
| POST /ai/moderate --- checks comment content, returns { safe: bool,   |
| reason: str }                                                         |
|                                                                       |
| POST /ai/title-variants --- generates 5 alternative titles for a post |
|                                                                       |
| **Technical Requirements**                                            |
|                                                                       |
| LLMProvider abstract class --- OpenAI and Anthropic both implemented  |
|                                                                       |
| Provider selected from environment variable: LLM_PROVIDER=openai or   |
| anthropic                                                             |
|                                                                       |
| All LLM calls async --- never blocks the event loop                   |
|                                                                       |
| Pydantic models for every LLM response --- no untyped dict returns    |
|                                                                       |
| Redis cache: cache summarization results by post ID --- same content, |
| no re-call                                                            |
|                                                                       |
| Rate limit per user: 20 AI calls per hour                             |
|                                                                       |
| Usage logging: log model, tokens used, response time per call         |
|                                                                       |
| Repository: fastapi-backend / week25-ai-features                      |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference:                                                    |
|                                                                       |
| 1\. Write an async FastAPI endpoint that calls OpenAI                 |
| chat.completions and returns a Pydantic-typed response.               |
|                                                                       |
| 2\. Write a system prompt that extracts tags from an article and      |
| returns JSON with a list of exactly 5 tags.                           |
|                                                                       |
| 3\. Explain: what is function calling / tool use and when would you   |
| use it instead of JSON mode?                                          |
|                                                                       |
| All three --- Week 25 is complete.                                    |
+-----------------------------------------------------------------------+

**Month 7 --- Week 26 \| 15--21 February 2027**

**Embeddings + Vector Databases + Semantic Search**

+-----------------------------------------------------------------------+
| **WEEK 26 --- 15--21 February 2027**                                  |
|                                                                       |
| **MISSION: Understand the mathematics of meaning. Learn to turn text  |
| into vectors, store them, and retrieve the most similar ones. This is |
| the engine behind every RAG system.**                                 |
+-----------------------------------------------------------------------+

**Day 169 (Mon 15 Feb) --- Embeddings: Text as Vectors**

- What an embedding is --- a point in high-dimensional space
  representing meaning

- Why similar texts have similar vectors --- the geometry of meaning

- OpenAI Embeddings API: text-embedding-3-small, text-embedding-3-large

- Embedding dimensions: 1536 (small) --- what these numbers mean

- Cosine similarity --- measuring angle between vectors as semantic
  distance

- Dot product similarity --- when vectors are normalized

- Embedding cost awareness --- much cheaper than chat, but scales with
  volume

- Batch embedding: embedding 100 chunks in one API call

- Caching embeddings --- same text, same vector, no re-embedding

**Day 170 (Tue 16 Feb) --- Vector Databases: pgvector + Qdrant**

- Vector database purpose --- storing and querying high-dimensional
  vectors efficiently

- pgvector: PostgreSQL extension --- add vector column to existing
  tables

- pgvector setup: CREATE EXTENSION vector, embedding vector(1536)

- ANN index: CREATE INDEX \... USING ivfflat --- approximate nearest
  neighbor

- pgvector query: ORDER BY embedding \<-\> query_embedding LIMIT 5

- Qdrant: standalone vector DB --- when pgvector reaches its limits

- Qdrant collection creation, point upsert, search query via Python
  client

- Hybrid search: combine vector similarity with keyword filter

- When to use pgvector vs Qdrant --- volume, latency, infrastructure
  tradeoffs

**Day 171 (Wed 17 Feb) --- Chunking Strategy**

- Why chunking --- LLM context windows are finite, embeddings are
  per-chunk

- Fixed-size chunking: split every N characters --- simple, often
  suboptimal

- Sentence-level chunking: split on sentence boundaries

- Recursive character splitting: LangChain\'s default --- split by
  paragraph, sentence, word

- Semantic chunking: split where meaning changes --- more expensive,
  better results

- Chunk overlap: 10--20% overlap prevents information loss at boundaries

- Metadata preservation: store source, page, section alongside chunk
  embedding

- Optimal chunk size: 200--500 tokens for most use cases --- why smaller
  is often better

**Day 172 (Thu 18 Feb) --- Semantic Search Implementation**

- Full semantic search pipeline: query → embed query → vector search →
  return chunks

- Re-ranking: sort retrieved chunks by relevance before returning

- Hybrid search: BM25 keyword match + vector similarity, combined score

- Filtering: retrieve only chunks from specific document, date range,
  source

- Search API endpoint: POST /search with query, filters, top_k parameter

- Result formatting: return chunk text, source, score, metadata

- Relevance threshold: discard results below minimum similarity score

**Days 173--175 (Weekend + Mon) --- Week 26 Mini Build**

+-----------------------------------------------------------------------+
| **Week 26 Mini Build --- Semantic Search API**                        |
|                                                                       |
| Build a document semantic search service using pgvector and OpenAI    |
| embeddings.                                                           |
|                                                                       |
| **Features**                                                          |
|                                                                       |
| Document ingestion: POST /documents --- accepts PDF or plain text,    |
| chunks, embeds, stores                                                |
|                                                                       |
| Semantic search: POST /search --- returns top-5 most relevant chunks  |
| with scores                                                           |
|                                                                       |
| Hybrid search: POST /search?mode=hybrid --- combines keyword and      |
| vector search                                                         |
|                                                                       |
| Document management: GET /documents, DELETE /documents/{id} ---       |
| removes embeddings too                                                |
|                                                                       |
| **Technical Stack**                                                   |
|                                                                       |
| PostgreSQL + pgvector extension --- vector storage in existing DB     |
|                                                                       |
| OpenAI text-embedding-3-small --- 1536 dimensions                     |
|                                                                       |
| Chunking: recursive character splitting, 400 tokens, 80 token overlap |
|                                                                       |
| Metadata: each chunk stores document_id, chunk_index, source          |
| filename, page number                                                 |
|                                                                       |
| **Test Data**                                                         |
|                                                                       |
| Ingest 5 different PDF documents (use open-source textbooks or        |
| documentation)                                                        |
|                                                                       |
| Verify semantic search returns relevant chunks --- not just keyword   |
| matches                                                               |
|                                                                       |
| Repository: fastapi-backend / week26-semantic-search                  |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference:                                                    |
|                                                                       |
| 1\. Explain cosine similarity in one sentence and why it is used for  |
| semantic search.                                                      |
|                                                                       |
| 2\. Write a pgvector SQL query that finds the 5 most similar chunks   |
| to a given embedding vector.                                          |
|                                                                       |
| 3\. What is chunk overlap and why is 10-20% overlap typically used?   |
|                                                                       |
| All three --- Week 26 is complete.                                    |
+-----------------------------------------------------------------------+

**Month 7 --- Week 27 \| 22--28 February 2027**

**RAG Pipeline: Document Ingestion → Retrieval → Generation**

+-----------------------------------------------------------------------+
| **WEEK 27 --- 22--28 February 2027**                                  |
|                                                                       |
| **MISSION: Build a complete RAG pipeline from scratch --- not using   |
| LangChain as a black box, but understanding every component so you    |
| can debug, optimize, and explain it.**                                |
+-----------------------------------------------------------------------+

**Why RAG --- The Core Problem It Solves**

LLMs have a knowledge cutoff. They hallucinate. They cannot access your
private documents. RAG (Retrieval-Augmented Generation) solves all
three: retrieve the most relevant information from your knowledge base,
inject it into the prompt as context, and let the LLM generate an answer
grounded in that context. The retrieval is deterministic and auditable.
The generation is guided by real information. The result is accurate,
explainable, and trustworthy.

**Day 176 (Mon 22 Feb) --- RAG Architecture + Ingestion Pipeline**

- RAG components: Indexer (ingestion) + Retriever + Generator + Prompt
  Assembly

- Ingestion pipeline: load document → parse → clean → chunk → embed →
  store

- Document loaders: PDF (pypdf2), DOCX (python-docx), plain text,
  Markdown, web pages

- Text cleaning: removing headers, footers, page numbers, excess
  whitespace

- Metadata extraction: title, author, date, URL, section --- stored with
  each chunk

- Async ingestion: background task for large documents --- non-blocking
  endpoint

- Ingestion status tracking: document states --- pending, processing,
  indexed, failed

- Re-ingestion strategy: update embeddings when document changes

**Day 177 (Tue 23 Feb) --- Retrieval + Context Assembly**

- Retrieval step: embed query → vector search → top-k chunks → filter by
  threshold

- Context window budget: LLM has limited tokens --- decide how many
  chunks to include

- Context formatting: how to present retrieved chunks in the prompt

- Source attribution: include source metadata in retrieved context

- Query expansion: rephrasing the query to improve retrieval

- Multi-query retrieval: generate 3 query variants, retrieve for each,
  deduplicate

- Maximal Marginal Relevance (MMR): avoid redundant retrieved chunks

- Reranking with cross-encoder: more expensive but higher precision

**Day 178 (Wed 24 Feb) --- Generation + Citation + Evaluation**

- Prompt assembly: system prompt + retrieved context + user question

- Grounding instruction: \'Answer ONLY using the provided context. If
  not found, say so.\'

- Citation generation: ask LLM to cite sources by document name and
  section

- Hallucination detection heuristics: answer contains information not in
  context

- Confidence scoring: low confidence → return \'I don\'t know\' instead
  of hallucinating

- Streaming the generated answer: Server-Sent Events from FastAPI

- RAG evaluation metrics: faithfulness, relevance, groundedness ---
  manual + automated

**Day 179 (Thu 25 Feb) --- Conversational RAG + Memory**

- Multi-turn RAG: maintaining conversation history for follow-up
  questions

- Conversation history in Redis: store last 10 turns per session

- Query contextualization: rephrase follow-up question using
  conversation history

- \'What did you say about X?\' → rephrase to \'Explain X in the
  uploaded document\'

- Session management: conversation_id per user session, expires after
  inactivity

- Sliding window memory: keep last N turns when history exceeds context
  budget

**Days 180--182 (Weekend + Mon) --- Week 27 Mini Build**

+-----------------------------------------------------------------------+
| **Week 27 Mini Build --- Document Q&A RAG System**                    |
|                                                                       |
| A complete Retrieval-Augmented Generation API where users upload      |
| documents and ask questions.                                          |
|                                                                       |
| **Core Flow**                                                         |
|                                                                       |
| 1\. User uploads PDF → parsed, chunked, embedded, stored in pgvector  |
|                                                                       |
| 2\. User asks question → query embedded → top-5 chunks retrieved      |
|                                                                       |
| 3\. Context assembled → LLM generates grounded answer → returned with |
| citations                                                             |
|                                                                       |
| 4\. Follow-up question → conversation history + query rewriting →     |
| repeat                                                                |
|                                                                       |
| **Endpoints**                                                         |
|                                                                       |
| POST /rag/upload --- upload and index a PDF document (background      |
| task)                                                                 |
|                                                                       |
| GET /rag/documents --- list all indexed documents with status         |
|                                                                       |
| POST /rag/chat --- ask a question, returns { answer, sources,         |
| conversation_id }                                                     |
|                                                                       |
| POST /rag/chat/{conversation_id} --- continue a conversation          |
|                                                                       |
| DELETE /rag/documents/{id} --- remove document and its embeddings     |
|                                                                       |
| **Technical Requirements**                                            |
|                                                                       |
| Streaming response option: POST /rag/chat?stream=true returns         |
| Server-Sent Events                                                    |
|                                                                       |
| Conversation stored in Redis with 24-hour TTL                         |
|                                                                       |
| Faithfulness check: if LLM says \'I don\'t know\' because not in      |
| context --- that is correct                                           |
|                                                                       |
| Source citations in every answer: \[{document: str, chunk_index: int, |
| excerpt: str}\]                                                       |
|                                                                       |
| Repository: fastapi-backend / week27-rag-system                       |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference:                                                    |
|                                                                       |
| 1\. Draw the RAG pipeline on paper: every step from user question to  |
| generated answer.                                                     |
|                                                                       |
| 2\. Write the system prompt instruction that prevents hallucination   |
| in a RAG system.                                                      |
|                                                                       |
| 3\. Explain what \'query contextualization\' is in conversational RAG |
| and why it is needed.                                                 |
|                                                                       |
| All three --- Week 27 is complete.                                    |
+-----------------------------------------------------------------------+

**Month 7 --- Week 28 \| 1--7 March 2027**

**Production AI Features: Streaming + Caching + Logging + AI Safety**

+-----------------------------------------------------------------------+
| **WEEK 28 --- 1--7 March 2027**                                       |
|                                                                       |
| **MISSION: Harden your AI integrations for production. Real AI        |
| systems handle errors gracefully, stream responses efficiently, cache |
| intelligently, and log everything observable.**                       |
+-----------------------------------------------------------------------+

**Day 183 (Mon 1 Mar) --- Streaming Responses: Server-Sent Events**

- Why streaming --- LLMs generate tokens one by one, streaming shows
  progress

- FastAPI StreamingResponse with media_type=\'text/event-stream\'

- Async generator: yield \'data: {chunk}\\n\\n\' for each token chunk

- OpenAI streaming: for chunk in await
  client.chat.completions.create(stream=True)

- Anthropic streaming: async for event in client.messages.stream()

- Frontend SSE consumption: EventSource API, handling data events

- React: reading streaming response with fetch + ReadableStream

- Error handling in streams: how to send error events mid-stream

**Day 184 (Tue 2 Mar) --- AI Request Caching Strategy**

- Semantic cache: cache by embedding similarity of questions, not exact
  text

- Exact cache: same question → same answer from Redis (fast path)

- Cache key design: hash(model + system_prompt + user_message) →
  response

- TTL strategy: factual Q&A --- 24 hours; current events --- no cache

- Cache invalidation: when source documents update, invalidate related
  cached answers

- Cost savings: measuring actual API cost reduction from caching

- GPTCache concept --- semantic similarity caching with vector search

**Day 185 (Wed 3 Mar) --- AI Observability + Usage Tracking**

- Logging every LLM call: model, prompt_tokens, completion_tokens, cost,
  latency

- User-level usage tracking: total tokens per user per month

- Budget enforcement: reject requests when user exceeds monthly token
  budget

- LLMOps concept: tracking model performance over time --- is quality
  degrading?

- Prompt performance logging: which prompts produce better outputs

- Failure logging: rate limit errors, timeout errors, invalid response
  errors --- per model

**Day 186 (Thu 4 Mar) --- AI Safety + Input/Output Validation**

- Prompt injection: user input designed to override system instructions

- Injection defense: sanitize user input, structured prompts, input
  filtering

- Content moderation: OpenAI Moderation API --- flag harmful inputs
  before LLM call

- Output validation: Pydantic parsing of LLM JSON output with error
  fallback

- Sensitive data: strip PII from prompts before sending to external API

- PII detection: regex patterns for email, phone, national ID in user
  input

- Model output filtering: reject responses containing certain patterns

- Rate limiting by user: prevent AI API abuse, enforce fair use

**Days 187--189 (Weekend + Mon) --- Month 7 Assessment**

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Month 7 Exit Criteria --- all must be true before Month 8 begins:     |
|                                                                       |
| 1\. Can you implement a complete RAG pipeline from scratch in under 2 |
| hours?                                                                |
|                                                                       |
| 2\. Can you explain cosine similarity, chunking, and context assembly |
| to an interviewer?                                                    |
|                                                                       |
| 3\. Is the Week 27 RAG system live (even if on localhost) and         |
| demonstrable?                                                         |
|                                                                       |
| 4\. Can you write streaming SSE from FastAPI and consume it in React? |
|                                                                       |
| 5\. Can you explain prompt injection and how to defend against it?    |
|                                                                       |
| All five --- Month 7 is complete. Month 8 begins 8 March 2027.        |
+-----------------------------------------------------------------------+

**CHAPTER 5 --- MONTH 8 LANGGRAPH + AGENTIC AI + PRODUCTION PROJECT 2 8
March -- 3 April 2027**

**Month 8 Objective**

Month 7 gave you production-grade LLM integration and RAG pipelines.
Month 8 adds the final AI layer: agentic workflows. You will build
multi-step AI agents using LangGraph --- systems that plan, use tools,
iterate, and produce results that single LLM calls cannot. By 3 April,
Portfolio Project 2 will be complete, deployed, and ready for every
placement interview.

**Month 8 Weekly Breakdown**

  ---------- ------------------ ------------------------------------------
  **Week**   **Dates**          **Focus**

  Week 29    8 Mar -- 14 Mar    LangGraph Foundations: Nodes, Edges, State

  Week 30    15 Mar -- 21 Mar   Production Agents: Tools, Memory,
                                Human-in-the-Loop

  Week 31    22 Mar -- 28 Mar   Portfolio Project 2: AI-Enabled Full-Stack
                                System

  Week 32    29 Mar -- 3 Apr    Project Polish + Mock Interviews +
                                Placement Prep
  ---------- ------------------ ------------------------------------------

**Month 8 --- Week 29 \| 8--14 March 2027**

**LangGraph Foundations: Nodes, Edges, State, and Conditional Logic**

+-----------------------------------------------------------------------+
| **WEEK 29 --- 8--14 March 2027**                                      |
|                                                                       |
| **MISSION: Understand what makes an agent different from a single LLM |
| call. Build your first graph. Make it loop, branch, and produce       |
| results that a single call cannot.**                                  |
+-----------------------------------------------------------------------+

**Day 190 (Mon 8 Mar) --- Agentic Systems Mental Model**

- What is an agent --- a system that can observe, decide, act, and
  repeat

- Single LLM call vs agentic loop --- when you need an agent

- ReAct pattern: Reasoning + Acting --- think about what to do, then do
  it

- Tool use in agents: search, calculate, read file, call API, write code

- Why LangGraph --- graphs model the non-linear flow of agent reasoning

- State machine mental model: agent state transitions based on LLM
  decisions

- When NOT to use an agent --- simple tasks are better as direct LLM
  calls

- Risk of agentic systems: infinite loops, incorrect tool calls,
  compounding errors

**Day 191 (Tue 9 Mar) --- LangGraph: StateGraph, Nodes, and Edges**

- StateGraph --- the main LangGraph object

- State definition: TypedDict with all state fields the graph needs

- Node definition: Python function that receives state, returns state
  update

- Adding nodes: graph.add_node(\'node_name\', node_function)

- Adding edges: graph.add_edge(\'node_a\', \'node_b\') --- deterministic
  transitions

- Entry point: graph.set_entry_point(\'first_node\')

- END: the terminal node --- where the graph stops

- graph.compile() --- produces a runnable graph

- Sync invoke: graph.invoke({\'input\': \'user question\'})

- Async invoke: await graph.ainvoke({\'input\': \'user question\'}) for
  FastAPI

**Day 192 (Wed 10 Mar) --- Conditional Edges + Routing Logic**

- Conditional edges: branch to different nodes based on state

- add_conditional_edges(node, routing_function, {condition: node_name})

- Routing function: inspects state, returns a string that maps to next
  node

- Loop pattern: agent → tool → agent → tool → agent → END (when done)

- Termination conditions: max iterations counter, confidence threshold,
  explicit done signal

- Parallel branches: fork state to multiple nodes, join results

- Error handling in graphs: error node that handles failures gracefully

**Day 193 (Thu 11 Mar) --- LangGraph with Tool Calling**

- Defining tools as Python functions: \@tool decorator from LangChain

- Binding tools to LLM: llm.bind_tools(tools)

- ToolNode: built-in LangGraph node for executing tool calls

- Message list as state: accumulating conversation and tool results

- AIMessage with tool_calls: parsing what tools the LLM wants to call

- ToolMessage: result of a tool execution, fed back to LLM

- Tool error handling: catch exceptions in tool functions, return error
  message

- Tool selection: how the LLM decides which tool to call based on
  descriptions

**Days 194--196 (Weekend + Mon) --- Week 29 Mini Build**

+-----------------------------------------------------------------------+
| **Week 29 Mini Build --- Research Agent**                             |
|                                                                       |
| A LangGraph agent that answers research questions by searching,       |
| reading, and synthesizing.                                            |
|                                                                       |
| **Tools Available to the Agent**                                      |
|                                                                       |
| web_search(query: str) -\> str --- returns search result snippets     |
|                                                                       |
| fetch_page(url: str) -\> str --- fetches and extracts text from a     |
| webpage                                                               |
|                                                                       |
| calculate(expression: str) -\> float --- evaluates a math expression  |
| safely                                                                |
|                                                                       |
| save_note(key: str, content: str) --- saves a note to agent working   |
| memory                                                                |
|                                                                       |
| get_notes() -\> dict --- retrieves all saved notes                    |
|                                                                       |
| **Graph Structure**                                                   |
|                                                                       |
| plan_node → decides what research steps are needed                    |
|                                                                       |
| research_node → calls LLM with tools bound, executes tool calls       |
|                                                                       |
| evaluate_node → assesses if enough information has been gathered      |
|                                                                       |
| synthesize_node → generates final answer from gathered notes          |
|                                                                       |
| Conditional edge from evaluate_node: \'enough\' → synthesize,         |
| \'need_more\' → research                                              |
|                                                                       |
| **FastAPI Integration**                                               |
|                                                                       |
| POST /agent/research --- starts research task, returns task_id        |
|                                                                       |
| GET /agent/research/{task_id} --- streams progress via SSE            |
|                                                                       |
| GET /agent/research/{task_id}/result --- returns final answer when    |
| complete                                                              |
|                                                                       |
| Repository: ai-projects / week29-research-agent                       |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference:                                                    |
|                                                                       |
| 1\. Draw a LangGraph with 4 nodes including a conditional edge that   |
| loops back.                                                           |
|                                                                       |
| 2\. Write the state TypedDict and routing function for a simple agent |
| that loops until \'done\'.                                            |
|                                                                       |
| 3\. Explain the ReAct pattern in one paragraph.                       |
|                                                                       |
| All three --- Week 29 is complete.                                    |
+-----------------------------------------------------------------------+

**Month 8 --- Week 30 \| 15--21 March 2027**

**Production Agents: Memory, Human-in-the-Loop, Multi-Agent Patterns**

+-----------------------------------------------------------------------+
| **WEEK 30 --- 15--21 March 2027**                                     |
|                                                                       |
| **MISSION: Add the features that make agents production-worthy:       |
| persistent memory, human oversight, and multi-agent collaboration.**  |
+-----------------------------------------------------------------------+

**Day 197 (Mon 15 Mar) --- Agent Memory: Short-Term and Long-Term**

- Short-term memory: the message list in graph state --- cleared each
  run

- Long-term memory: persisting information across agent runs

- LangGraph MemorySaver: in-memory checkpointing of graph state

- PostgreSQL checkpointer: persisting graph state between runs
  (production)

- thread_id: identifying a conversation thread for state persistence

- User-specific memory: retrieve past interactions, preferences, learned
  facts

- Memory retrieval: embedding user facts, RAG to retrieve relevant
  memories

- Memory update: adding new facts without overwriting old ones

**Day 198 (Tue 16 Mar) --- Human-in-the-Loop Interrupts**

- Why HITL --- some agent actions need human approval before execution

- interrupt_before=\[\'node_name\'\] --- pausing graph before a
  dangerous action

- interrupt_after=\[\'node_name\'\] --- pausing to review output before
  continuing

- graph.stream() with interrupt: graph pauses, sends state to user for
  review

- Resuming: graph.invoke(None, config) --- continue from interrupt point

- Approval flow: agent proposes action → user approves/rejects → agent
  continues

- Timeout on interrupts: auto-reject if user doesn\'t respond in N
  minutes

**Day 199 (Wed 17 Mar) --- Multi-Agent Systems**

- When one agent is not enough --- specialized agents for specialized
  tasks

- Supervisor pattern: orchestrator LLM routes tasks to specialist agents

- Handoff: how one agent transfers control to another

- Specialized agents: ResearchAgent, WritingAgent, CodeAgent,
  ReviewAgent

- Shared state vs isolated state --- when agents share memory

- Communication protocol: how agents report results back to supervisor

- Failure propagation: what happens when a specialist agent fails

**Day 200 (Thu 18 Mar) --- Agent Evaluation + Production Hardening**

- Testing agents: deterministic assertions are hard --- use LLM as judge

- Tracing: LangSmith integration --- inspect every node, every LLM call

- Max iteration limits: always set a maximum --- infinite loop
  prevention

- Timeout: kill agent runs that exceed time budget

- Cost caps: estimate token cost per step, abort if estimated total
  exceeds budget

- Retry strategy: on tool failure, retry once before marking as failed

- Idempotency: re-running an agent with the same input should be safe

**Days 201--203 (Weekend + Mon) --- Week 30 Mini Build**

+-----------------------------------------------------------------------+
| **Week 30 Mini Build --- Content Generation Agent**                   |
|                                                                       |
| A multi-step agent that generates, reviews, and publishes blog post   |
| drafts.                                                               |
|                                                                       |
| **Agent Flow**                                                        |
|                                                                       |
| 1\. research_node: gathers information about the topic via web search |
|                                                                       |
| 2\. outline_node: LLM generates a structured outline                  |
|                                                                       |
| 3\. interrupt: pause here --- send outline to user for approval       |
|                                                                       |
| 4\. write_node: LLM writes the full post from approved outline        |
|                                                                       |
| 5\. review_node: second LLM pass checks quality, factual claims, SEO  |
|                                                                       |
| 6\. revise_node: (conditional) revise if review score \< 7/10         |
|                                                                       |
| 7\. publish_node: calls Blog Platform API to create the post          |
|                                                                       |
| **Integration**                                                       |
|                                                                       |
| Connected to Blog Platform API from Month 6                           |
|                                                                       |
| POST /agent/blog-post --- starts content generation, returns run_id   |
|                                                                       |
| GET /agent/blog-post/{run_id}/outline --- returns outline for user    |
| approval                                                              |
|                                                                       |
| POST /agent/blog-post/{run_id}/approve --- user approves outline,     |
| agent continues                                                       |
|                                                                       |
| GET /agent/blog-post/{run_id}/status --- returns current step and     |
| progress                                                              |
|                                                                       |
| Repository: ai-projects / week30-content-agent                        |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without reference:                                                    |
|                                                                       |
| 1\. How does interrupt_before work in LangGraph --- what happens to   |
| graph state when it pauses?                                           |
|                                                                       |
| 2\. What is the supervisor pattern in multi-agent systems?            |
|                                                                       |
| 3\. Why must every production agent have a max_iterations limit?      |
|                                                                       |
| All three --- Week 30 is complete.                                    |
+-----------------------------------------------------------------------+

**Month 8 --- Week 31 \| 22--28 March 2027**

**Portfolio Project 2: AI-Enabled Full-Stack Production System**

+-----------------------------------------------------------------------+
| **WEEK 31 --- 32 --- 22 March -- 3 April 2027**                       |
|                                                                       |
| **MISSION: Portfolio Project 2. This is your graduation project.      |
| Build the most complete, most impressive application of your entire   |
| roadmap. It goes directly onto your resume. It is what you demo in    |
| interviews.**                                                         |
+-----------------------------------------------------------------------+

**Month 8 Objective**

Portfolio Project 2 integrates everything: FastAPI backend, PostgreSQL +
pgvector, JWT authentication, Docker, CI/CD, React + TypeScript
frontend, LLM APIs, RAG pipeline, and LangGraph agents --- all working
together in a single coherent system that demonstrates full-stack AI
engineering capability.

+-----------------------------------------------------------------------+
| **Portfolio Project 2: AI Knowledge Hub**                             |
|                                                                       |
| A production full-stack AI-enabled knowledge management platform.     |
|                                                                       |
| This project demonstrates: full-stack development + AI integration +  |
| production engineering.                                               |
|                                                                       |
| **Core Concept**                                                      |
|                                                                       |
| Users upload documents (PDFs, text, markdown). The system indexes     |
| them with embeddings.                                                 |
|                                                                       |
| Users ask questions in natural language. The RAG system finds         |
| relevant context and answers.                                         |
|                                                                       |
| Users can trigger AI agents to research topics and generate           |
| structured summaries.                                                 |
|                                                                       |
| All interactions are tracked, cached, and visible in an analytics     |
| dashboard.                                                            |
|                                                                       |
| **Backend (FastAPI + PostgreSQL + pgvector + Redis)**                 |
|                                                                       |
| Auth: full JWT auth with register, login, refresh, roles (USER /      |
| ADMIN)                                                                |
|                                                                       |
| Documents: upload, index (background task), list, delete, re-index    |
|                                                                       |
| Q&A: conversational RAG endpoint with streaming, citations,           |
| conversation history                                                  |
|                                                                       |
| Search: semantic search across all user documents + full-text hybrid  |
| search                                                                |
|                                                                       |
| Agent: LangGraph research agent with HITL approval, status tracking,  |
| result storage                                                        |
|                                                                       |
| Analytics: per-user token usage, query history, document count, cost  |
| estimates                                                             |
|                                                                       |
| Admin: user management, usage caps, document moderation               |
|                                                                       |
| **Frontend (React + TypeScript)**                                     |
|                                                                       |
| Dashboard: document count, recent queries, usage chart, cost this     |
| month                                                                 |
|                                                                       |
| Document Library: upload with drag-and-drop, status indicator, manage |
| documents                                                             |
|                                                                       |
| Chat Interface: streaming Q&A with citations, conversation history    |
| panel                                                                 |
|                                                                       |
| Search Page: semantic search with results ranked by relevance score   |
|                                                                       |
| Agent Page: trigger research, view outline, approve, track progress,  |
| view result                                                           |
|                                                                       |
| Settings: profile, usage limits, API key management (if applicable)   |
|                                                                       |
| **Production Requirements**                                           |
|                                                                       |
| Docker Compose: app + postgres + pgvector + redis + nginx             |
|                                                                       |
| CI/CD: GitHub Actions --- test → build → deploy on push to main       |
|                                                                       |
| Deployed: live HTTPS URL on Railway, Render, or DigitalOcean          |
|                                                                       |
| Tests: 70%+ coverage on backend                                       |
|                                                                       |
| README: architecture diagram, live URL, setup guide, feature          |
| screenshots                                                           |
|                                                                       |
| **What Makes This Project Interview-Ready**                           |
|                                                                       |
| Every layer is present: auth, database, AI, frontend, Docker,         |
| deployment                                                            |
|                                                                       |
| Every decision is explainable: why pgvector, why Redis, why           |
| LangGraph, why streaming                                              |
|                                                                       |
| It solves a real problem: knowledge management and Q&A over documents |
|                                                                       |
| It is live: not localhost, a real URL that interviewers can visit     |
|                                                                       |
| Repository: ai-knowledge-hub / (monorepo with backend/ and frontend/) |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **📌 Week 31 Daily Plan**                                             |
|                                                                       |
| Day 204 (Mon 22 Mar): Project setup --- monorepo structure, Docker,   |
| CI skeleton                                                           |
|                                                                       |
| Day 205 (Tue 23 Mar): Backend auth + user management + database       |
| schema + migrations                                                   |
|                                                                       |
| Day 206 (Wed 24 Mar): Document upload + chunking + embedding pipeline |
| (background task)                                                     |
|                                                                       |
| Day 207 (Thu 25 Mar): RAG endpoint --- conversational Q&A with        |
| streaming + citations                                                 |
|                                                                       |
| Day 208 (Fri 26 Mar): Semantic search + hybrid search endpoint +      |
| pgvector indexes                                                      |
|                                                                       |
| Days 209-210 (Weekend): LangGraph research agent + HITL approval      |
| endpoint                                                              |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **📌 Week 32 Daily Plan (29 Mar -- 3 Apr)**                           |
|                                                                       |
| Day 211 (Mon 29 Mar): Frontend --- Dashboard + Document Library pages |
|                                                                       |
| Day 212 (Tue 30 Mar): Frontend --- Chat interface with SSE            |
| streaming + citations                                                 |
|                                                                       |
| Day 213 (Wed 31 Mar): Frontend --- Search page + Agent page +         |
| Settings                                                              |
|                                                                       |
| Day 214 (Thu 1 Apr): Full integration testing --- every feature       |
| end-to-end                                                            |
|                                                                       |
| Day 215 (Fri 2 Apr): Deploy to cloud --- CI/CD pipeline live          |
|                                                                       |
| Day 216 (Sat 3 Apr): README polish + screenshots + demo video +       |
| LinkedIn update                                                       |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Month 8 Exit Criteria --- Portfolio Project 2 must satisfy ALL of the |
| following:                                                            |
|                                                                       |
| 1\. Is the application live at a public HTTPS URL?                    |
|                                                                       |
| 2\. Does the CI/CD pipeline automatically deploy on push to main?     |
|                                                                       |
| 3\. Can you upload a document, ask a question, and receive a cited    |
| answer in under 30 seconds?                                           |
|                                                                       |
| 4\. Does the LangGraph agent complete a research task and require     |
| human approval before publishing?                                     |
|                                                                       |
| 5\. Is test coverage 70%+ on the backend?                             |
|                                                                       |
| 6\. Can you explain every architectural decision in 10 minutes        |
| without notes?                                                        |
|                                                                       |
| 7\. Is Project 2 on your resume with live URL and technology stack?   |
|                                                                       |
| All seven --- Month 8 and Volume 3 are complete.                      |
+-----------------------------------------------------------------------+

**MID-2 EXAMINATION PERIOD (3-2) 5 April -- 10 April 2027**

+-----------------------------------------------------------------------+
| **Examination Period Rules**                                          |
|                                                                       |
| College academics take absolute priority. Roadmap pauses completely.  |
|                                                                       |
| Daily commitment (1--2 hours maximum):                                |
|                                                                       |
| • DSA / Java --- 45 minutes daily maintenance                         |
|                                                                       |
| • Mock interview preparation: read Portfolio Project 2 architecture   |
| notes                                                                 |
|                                                                       |
| • GitHub commit streak: one documentation improvement or test per day |
|                                                                       |
| Do this during exam week:                                             |
|                                                                       |
| • Update resume with Portfolio Project 2                              |
|                                                                       |
| • Update LinkedIn: add AI engineering skills --- FastAPI, LangGraph,  |
| RAG, pgvector                                                         |
|                                                                       |
| • Prepare 5-minute demo script for Portfolio Project 2 --- practice   |
| it out loud                                                           |
+-----------------------------------------------------------------------+

**CHAPTER 6 --- SEMESTER END EXAMINATIONS + PLACEMENT PREPARATION 19
April -- May 2027**

**Semester End Examination Period \| 19 April -- 1 May 2027**

+-----------------------------------------------------------------------+
| **Semester End Exam Protocol**                                        |
|                                                                       |
| Semester final examinations. Engineering roadmap pauses.              |
|                                                                       |
| Daily commitment (45--60 minutes maximum):                            |
|                                                                       |
| • DSA / Java --- problem solving to maintain momentum                 |
|                                                                       |
| • Mock interview questions --- system design, behavioral, technical   |
|                                                                       |
| Do not start new roadmap topics. Placement season begins immediately  |
| after exams.                                                          |
|                                                                       |
| Every roadmap deliverable is already complete. Focus entirely on      |
| academics.                                                            |
+-----------------------------------------------------------------------+

**Placement Preparation Framework \| May 2027+**

Placement season begins with every major deliverable from Volume 3
complete: two portfolio projects deployed to production, a full test
suite, CI/CD pipelines, and the ability to explain every architectural
decision. What follows is the framework for converting that readiness
into offers.

**Technical Interview Readiness Checklist**

  --------------------- -------------------------------------------------
  **Area**              **You Must Be Able To**

  System Design         Design a URL shortener, Twitter, messaging app
                        --- draw the architecture

  FastAPI               Build a CRUD API from scratch in 30 minutes
                        during a live coding test

  Database              Write JOIN queries, window functions, explain
                        indexes --- in under 5 min

  Authentication        Explain JWT, implement auth endpoint from memory

  Docker                Write a Dockerfile and docker-compose.yml from
                        scratch

  Python                Write clean, Pythonic Python --- no reference
                        needed

  React + TypeScript    Build a typed React component and custom hook in
                        under 10 minutes

  AI Integration        Explain RAG, embeddings, and LangGraph agents
                        clearly

  DSA                   Solve medium LeetCode problems during live coding
                        --- arrays, trees, graphs, DP

  Portfolio Projects    Demo and explain both projects architecture in 5
                        minutes each
  --------------------- -------------------------------------------------

**Common Interview Questions --- Prepare Written Answers**

- Tell me about yourself and your engineering journey.

- Walk me through Portfolio Project 2 architecture.

- Why FastAPI over Flask or Django? When would you choose differently?

- Explain how JWT authentication works, end to end.

- What is RAG and when would you use it?

- How does your CI/CD pipeline work?

- What was the hardest engineering problem you solved in your projects?

- How do you approach debugging a production issue at 2am?

- What is the N+1 query problem and how do you fix it in SQLAlchemy?

- Explain the difference between async def and def in FastAPI.

**Portfolio Review Standards**

Every interviewer who visits your GitHub should find the following
within 60 seconds of landing on either project:

- A live URL in the repository description --- clickable, working,
  instant

- A README that explains what the project does in one sentence

- A technology stack badge list --- FastAPI, PostgreSQL, Docker, React,
  TypeScript, etc.

- An architecture diagram --- drawn, not just described

- Setup instructions that work --- another developer can run it in under
  10 minutes

- Screenshots or a demo GIF showing the application working

**CHAPTER 7 --- VOLUME 3 OUTCOMES**

**Engineering Capability Dashboard --- Post Volume 3**

  ------------------------ ----------------- -----------------------------
  **Area**                 **Post Volume 2** **Post Volume 3**

  Python --- All Layers    95%               95% --- Complete. Applies
                                             without thought.

  SQL --- Foundations +    95%               95% --- Permanent recall.
  Advanced                                   

  HTML + CSS + Responsive  85%               85% --- No new growth this
                                             volume.

  JavaScript Core          85%               85% --- No new growth this
                                             volume.

  React + TypeScript       75%               85% --- Production
                                             integration patterns.

  FastAPI --- All Layers   10%               90% --- Design and build from
                                             scratch.

  SQLAlchemy + Alembic     0%                85% --- ORM and migrations,
                                             fluent.

  Authentication           0%                90% --- Implements from
  (JWT/OAuth)                                memory.

  Docker + Compose         0%                80% --- Containerizes any
                                             application.

  CI/CD (GitHub Actions)   0%                75% --- Working pipelines,
                                             can extend.

  Redis --- Caching +      0%                75% --- Cache-aside, rate
  Sessions                                   limiting.

  pytest --- FastAPI       40%               85% --- 80%+ coverage on
  Testing                                    projects.

  Linux Essentials         0%                70% --- Production debugging
                                             capable.

  Deployment (Cloud)       0%                75% --- Live applications
                                             deployed.

  LLM APIs                 15%               85% --- Async, typed, cached,
  (OpenAI/Anthropic)                         safe.

  Embeddings + pgvector    0%                80% --- RAG retrieval layer.

  RAG Pipelines            0%                80% --- Full pipeline from
                                             scratch.

  LangGraph Agents         0%                75% --- Multi-step agents
                                             with tools.

  AI Safety +              0%                70% --- Production AI
  Observability                              hardening.

  Git + GitHub + Portfolio 85%               90% --- Portfolio-quality
                                             repositories.
  ------------------------ ----------------- -----------------------------

**Projects Completed in Volume 3**

  ---------------- ---------------------------- -------------------------
  **Project**      **Technologies**             **Placement Value**

  Month 5: Blog    FastAPI + SQLAlchemy +       Backend engineering proof
  Platform API     Alembic + JWT + Redis +      --- demonstrates every
                   pytest                       backend layer
                                                independently

  Month 6:         React TS + FastAPI +         Full-stack integration +
  Full-Stack Blog  Docker + CI/CD + Cloud       DevOps --- deployed,
                   Deployment                   live, shows end-to-end
                                                capability

  Month 7: RAG Q&A FastAPI + pgvector +         AI engineering capability
  System           OpenAI + Streaming +         --- most interviewers
                   Conversations                have not seen RAG
                                                implemented from scratch

  Portfolio        Complete stack + LangGraph   Graduation project ---
  Project 2: AI    agents + HITL + Analytics    demonstrates the entire
  Knowledge Hub                                 roadmap in one
                                                application
  ---------------- ---------------------------- -------------------------

**The Mental Shift Volume 3 Produces**

  ------------------------ ----------------------------------------------
  **Before Volume 3**      **After Volume 3**

  \"I can build            \"I architect and deploy full-stack systems.\"
  frontends.\"             

  \"I understand           \"I design production APIs with auth, caching,
  FastAPI.\"               and tests.\"

  \"I know what RAG is.\"  \"I implement RAG pipelines and explain every
                           component.\"

  \"AI writes my backend   \"I write backend code. AI accelerates where I
  code.\"                  choose.\"

  \"I have never deployed  \"I have two live production applications with
  anything.\"              CI/CD.\"

  \"I might pass a         \"I am ready to pass a placement assessment
  technical interview.\"   and demo my work.\"
  ------------------------ ----------------------------------------------

+-----------------------------------------------------------------------+
| **🎓 Volume 3 Complete**                                              |
|                                                                       |
| Volume 4 --- Semester 3-2: Placement Season + Advanced Engineering    |
| continues this roadmap.                                               |
|                                                                       |
| Portfolio complete. Applications deployed. Resume ready.              |
|                                                                       |
| Volume 4 focuses on: mock interviews, competitive DSA, system design, |
| placement season execution,                                           |
|                                                                       |
| and advanced engineering skills that separate the top 10% of          |
| candidates.                                                           |
+-----------------------------------------------------------------------+

**CHAPTER 8 --- HOW TO USE VOLUME 3**

**For Daily Execution**

Volume 3 answers the same four questions every day:

- What is my mission today?

- What topics and subtopics should I cover?

- What should I build?

- How do I know I am ready to move forward?

You should never open this document and wonder what to do next. Every
day is specified. Every week has an exit criterion. Every month has a
capstone. If you execute consistently, the roadmap produces exactly the
outcomes described.

**Daily Structure --- Semester 3-2**

  ------------------ --------------- -------------------------------------
  **Day Type**       **Study Hours** **Focus**

  Regular college    3--4 focused    Main track + implementation +
  day                hours           practice

  Weekend            5--6 hours      Project work + DSA + integration

  Exam week          1--2 hours      Light revision + DSA maintenance only

  CRT active periods 3--4 hours      CRT + DSA → then Main Track
  ------------------ --------------- -------------------------------------

**Priority Rules During Conflicts**

  ---------------------- ------------------------------------------------
  **Situation**          **Priority Order**

  Normal week            Main Track → DSA → Projects → GitHub →
                         Communication

  Exam week              College Academics → DSA maintenance → Light
                         review

  CRT active             CRT → DSA → Main Track → Projects

  Placement season       Mock Interviews → DSA → Resume → Projects → Main
                         Track
  ---------------------- ------------------------------------------------

**Revision Policy**

+-----------------------------------------------------------------------+
| **📌 Frozen Document Policy**                                         |
|                                                                       |
| Volume 3 is frozen. Revise ONLY if:                                   |
|                                                                       |
| 1\. Academic calendar changes significantly.                          |
|                                                                       |
| 2\. Career goals fundamentally change.                                |
|                                                                       |
| 3\. A major technology shift occurs in the market.                    |
|                                                                       |
| Otherwise --- EXECUTE, do not redesign. The value is in consistent    |
| execution, not optimizing the plan.                                   |
|                                                                       |
| Every week spent redesigning the roadmap is a week not spent          |
| building.                                                             |
+-----------------------------------------------------------------------+
