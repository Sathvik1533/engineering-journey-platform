**PRINCIPAL ENGINEERING ROADMAP**

**MASTER EDITION**

**Volume 4 --- Placement Season & Advanced Engineering**

*System Design · Interview Mastery · Advanced AI Engineering · Career
Execution*

  ----------------- -----------------------------------------------------
  **Field**         Detail

  **Student**       Kotagiri Sathwik

  **Institution**   MLR Institute of Technology, Hyderabad

  **Current Stage** Post-Graduation --- Placement Season

  **Volume Period** May 2027 -- Placement Offer

  **Continues       Volume 3 --- Semester 3-2 Engineering Journey
  From**            

  **Document        Frozen After Approval --- Volume 4 of 5
  Status**          
  ----------------- -----------------------------------------------------

*Projects deployed. Resume complete. Now you win the room.*

Table of Contents

CHAPTER 1 --- VOLUME 4 OVERVIEW

Volume 3 closed the engineering foundation. You now architect and deploy
full-stack AI-enabled applications. You have two portfolio projects live
at public URLs with CI/CD pipelines, test suites, and documentation. You
have implemented authentication, RAG pipelines, LangGraph agents, Docker
deployments, and every layer of a production backend from scratch.

Volume 4 is the conversion layer. Engineering skill does not
automatically produce job offers --- it must be presented, communicated,
and demonstrated under pressure. Volume 4 transforms your engineering
capability into placement currency: the ability to perform in every
format a competitive hiring process uses.

This volume covers five domains that Volume 3 deliberately left
untouched because they require a complete engineering foundation before
they become meaningful: system design, advanced competitive programming,
behavioral and communication preparation, placement season execution,
and advanced AI engineering topics that differentiate the top 10% of
candidates.

What Volume 4 Produces

  ----------------------- -----------------------------------------------
  **Outcome**             **Details**

  System Design Fluency   Designs scalable distributed systems under
                          interview conditions --- URL shortener,
                          Twitter, messaging, YouTube

  DSA: Competitive Level  Solves medium-hard LeetCode under timed
                          pressure --- trees, graphs, DP, sliding window,
                          two pointers

  Technical Interview     Performs live coding, system design, and
  Mastery                 architecture explanation without notes

  Behavioral              Delivers structured STAR answers, demonstrates
  Communication           engineering judgment, handles pressure
                          professionally

  Placement Execution     Navigates application, screening, technical
                          rounds, HR rounds, and offer negotiation with
                          confidence

  Advanced AI Engineering Implements production-grade AI observability,
                          fine-tuning concepts, multi-modal inputs, agent
                          evaluation

  Career Brand            GitHub, LinkedIn, portfolio, resume --- all
                          aligned and consistently communicating the same
                          engineering identity
  ----------------------- -----------------------------------------------

Volume 4 Structure

Volume 4 does not follow the semester calendar --- you have graduated by
this point. It follows the placement season timeline, which is governed
by company visit schedules, application deadlines, and interview rounds
rather than academic periods.

  ----------------- -------------------------- --------------------------
  **Phase**         **Duration**               **Focus**

  Phase A ---       Weeks 1--3                 System design
  Placement                                    fundamentals + DSA
  Foundation                                   acceleration + resume
                                               finalization

  Phase B ---       Weeks 4--6                 Live mock interviews +
  Interview                                    behavioral preparation +
  Sharpening                                   portfolio hardening

  Phase C ---       Weeks 7--12                Company applications +
  Active Placement                             real rounds + offer
                                               evaluation + negotiation

  Phase D ---       Ongoing alongside Phase C  Advanced AI topics + open
  Advanced                                     source + long-term career
  Engineering                                  positioning
  ----------------- -------------------------- --------------------------

+-----------------------------------------------------------------------+
| **🔒 Volume 4 AI Rule --- Stage 5 in Effect**                         |
|                                                                       |
| At this stage, AI is a professional tool --- not a crutch and not     |
| something to hide. Use it the way a senior engineer would: for        |
| boilerplate acceleration, documentation drafting, and exploring       |
| unfamiliar APIs. Never use it to answer a question you will be asked  |
| in an interview. The benchmark remains unchanged: Could I rebuild     |
| this from scratch in an interview without AI? If the answer is no --- |
| you are not ready.                                                    |
+-----------------------------------------------------------------------+

CHAPTER 2 --- PHASE A: PLACEMENT FOUNDATION Weeks 1--3 \| \~21 Days

Phase A runs for three weeks. The three tracks --- system design, DSA
acceleration, and placement preparation infrastructure --- run in
parallel daily. This is the last window before active applications
begin. Every hour here pays compound interest during the placement
season itself.

Phase A Weekly Structure

  ----------------- -------------------------- --------------------------
  **Week**          **System Design Focus**    **DSA Focus**

  Week 1            Distributed systems        Arrays, strings, sliding
                    fundamentals + URL         window, two pointers ---
                    Shortener design           20 problems

  Week 2            Twitter / social feed      Linked lists, stacks,
                    design + database scaling  queues, trees --- 20
                                               problems

  Week 3            File storage + messaging   Graphs, backtracking, DP
                    system design + review     foundations --- 20
                                               problems
  ----------------- -------------------------- --------------------------

Phase A --- Week 1 \| System Design Foundations

+:---------------------------------------------------------------------:+
| **WEEK 1 --- Placement Foundation Begins**                            |
|                                                                       |
| Days 1--7                                                             |
|                                                                       |
| **MISSION: Build the system design vocabulary and DSA stamina that    |
| interviews will test under time pressure.**                           |
+-----------------------------------------------------------------------+

**Why This Week is Prioritized**

Technical interviews at product-based companies have two failure modes:
the candidate cannot solve the coding problem, or the candidate solves
it but cannot discuss the system. System design is tested from the first
on-campus round at many companies. Starting here --- before applications
open --- means you arrive at your first interview having already
practised this format dozens of times.

**Day 1 --- Distributed Systems Mental Model**

Before designing systems, you need the vocabulary and the mental model.
These are the building blocks every system design interview assumes.

**Topics**

- Horizontal vs vertical scaling --- when each applies and what limits
  each

- CAP theorem --- Consistency, Availability, Partition Tolerance ---
  what you sacrifice when a network partition occurs

- Load balancers --- round-robin, least connections, consistent hashing
  --- where they sit in an architecture

- Caching layers --- CDN, application cache (Redis), database cache ---
  cache invalidation strategies

- Database scaling --- read replicas, sharding, partitioning strategies,
  when NoSQL becomes the right choice

- Message queues --- when synchronous communication breaks and why async
  decoupling fixes it

- Microservices vs monolith --- when to decompose and what operational
  cost decomposition carries

- API gateways --- routing, rate limiting, auth at the edge, single
  entry point for distributed services

- Stateless vs stateful services --- why stateless services scale
  horizontally without session affinity problems

- Data consistency models --- eventual consistency vs strong consistency
  --- examples from real systems

**Real-World Connection:** *Every system you built in Volumes 2 and 3 is
a single-machine system. These concepts explain what changes when
millions of users hit that system simultaneously. You have already
implemented Redis caching, background tasks, and database connections
--- now you learn the architectural decisions that govern when and how
those components are deployed at scale.*

**Practice: System Design Framework**

Learn and memorise a repeatable framework for every system design
interview. Use this structure every time.

1.  Clarify requirements --- functional (what must the system do) and
    non-functional (scale, latency, consistency)

2.  Estimate scale --- daily active users, requests per second, storage
    per year, bandwidth requirements

3.  Define the high-level API --- what endpoints exist, what do they
    accept and return

4.  Design the data model --- tables, relationships, indexes, access
    patterns

5.  Design the high-level architecture --- draw the diagram with all
    major components

6.  Deep-dive on critical components --- the interviewer will ask you to
    zoom in on one part

7.  Identify bottlenecks and resolve them --- what breaks at 10x scale,
    and what you would change

**Day 2 --- URL Shortener: Your First System Design**

The URL shortener is the canonical entry-level system design problem. It
is deceptively simple and tests every fundamental concept.

**Design Requirements --- Work Through These Yourself First**

- Functional: given a long URL, return a short URL; given a short URL,
  redirect to long URL; optionally: analytics (click count, referrer,
  geography)

- Non-functional: 100 million URLs created per day; reads are 100x more
  frequent than writes; redirect latency must be under 10ms

**Topics to Design Through**

- Encoding strategy --- base62 vs MD5 hash vs counter --- collision
  handling in each approach

- Database choice --- why a key-value store (Redis) wins over relational
  for pure redirect lookups

- Caching the redirect --- why 80% of requests hit the top 20% of URLs,
  and how to cache them at the edge

- Custom short URL --- how to handle user-requested vanity URLs and
  prevent collision with generated IDs

- Analytics without blocking the redirect --- write to a message queue,
  process asynchronously

- Expiry --- TTL on short URLs, cleanup strategy for expired entries

- Scaling to 100M writes/day --- single database write throughput
  ceiling, when to introduce a write buffer

**Real-World Connection:** *You built URL handling in your FastAPI
backends. The redirect is a simple database lookup --- but at 10,000
requests per second, the naive implementation collapses. Every design
decision here maps directly to production engineering patterns you have
already implemented: Redis caching, async background tasks, database
indexing.*

**Day 3 --- Twitter / Social Feed System**

The Twitter-style system design tests feed generation, one of the
hardest problems in distributed systems: how do you deliver a
personalized, real-time feed to 300 million users within milliseconds?

**Topics to Design Through**

- Tweet storage --- what columns, what indexes, write volume estimation

- Feed generation: pull model vs push model vs hybrid --- when each
  works and when each breaks

- Celebrity problem --- a user with 100 million followers creates a
  write amplification crisis in push models

- Timeline cache --- storing pre-generated feeds in Redis, TTL,
  invalidation on new tweet

- Search --- full-text search on tweets, Elasticsearch, index latency vs
  query latency tradeoffs

- Media storage --- why tweets with images go to S3/object storage, not
  PostgreSQL

- Trending topics --- approximate counting with Count-Min Sketch,
  sliding window aggregates

- Notifications --- fan-out via message queue, push notifications via
  WebSockets or SSE

- Rate limiting --- per-user write limits to prevent abuse, token bucket
  algorithm

**Real-World Connection:** *You built the Blog Platform API in Month 6
with a posts feed and comments. The architectural pattern is identical
--- only the scale changes. The difference between your Blog API and
Twitter is not the code; it is the infrastructure decisions that
surround the same code.*

**Day 4 --- Database Scaling Deep Dive**

**Topics**

- Read replicas --- synchronous vs asynchronous replication, replication
  lag, directing reads to replica

- Database sharding --- range-based sharding, hash-based sharding,
  directory-based sharding, resharding pain

- Connection pooling at scale --- PgBouncer, connection limits, the C10K
  problem for databases

- Indexes at scale --- partial indexes, composite indexes, index bloat,
  VACUUM in PostgreSQL

- CQRS --- Command Query Responsibility Segregation --- separate write
  models from read models

- Event sourcing --- storing events, not state --- replay to reconstruct
  any historical state

- Database proxies --- AWS RDS Proxy, PlanetScale --- why they exist and
  what problems they solve

- When to choose NoSQL --- document stores for flexible schema,
  time-series for metrics, graph databases for relationships

**Real-World Connection:** *You designed the PostgreSQL schema for both
portfolio projects. The sharding and replication concepts here explain
what happens to that schema when your application scales beyond what one
database server can handle. Every interview about your projects will
include a follow-up: \"How would this scale to 10 million users?\" This
is your answer.*

**Day 5 --- File Storage System + CDN Design**

**Topics**

- Object storage fundamentals --- S3 model, bucket, key, version,
  presigned URLs

- Why files do not go in PostgreSQL --- TOAST overhead, backup
  complexity, storage costs

- CDN architecture --- edge nodes, origin pull, cache-control headers,
  cache invalidation

- Large file upload --- chunked upload, resumable upload, multipart
  upload protocol

- Image processing pipeline --- upload → process (resize, compress,
  watermark) → store → CDN

- Video streaming --- HLS segmentation, adaptive bitrate, manifest
  files, player buffering

- Document processing --- your AI Knowledge Hub upload pipeline scaled
  to millions of documents

**Real-World Connection:** *You implemented file upload in Month 5. This
day contextualises that implementation within a production file storage
architecture. Your interview answer for \"how does file upload work in
your project\" becomes a gateway to a full system design discussion
about S3, CDNs, and processing pipelines.*

**Days 6--7 --- DSA Sprint + Week 1 Review**

Weekend sessions. No new system design material. Pure implementation.

**DSA Problems --- 10 to Complete This Weekend**

- Two Sum --- hash map pattern, O(n) time

- Longest Substring Without Repeating Characters --- sliding window

- Container With Most Water --- two pointers

- Valid Anagram --- frequency count

- Group Anagrams --- hash map of sorted strings

- Product of Array Except Self --- prefix + suffix product, no division

- Maximum Subarray --- Kadane\'s algorithm, understand why it works

- Find Minimum in Rotated Sorted Array --- binary search on sorted-ish
  array

- Search in Rotated Sorted Array --- binary search variant

- 3Sum --- two-pointer after sort, handle duplicates carefully

For every problem: solve it first without looking at solutions. Time
yourself. Write the solution in a .py file with a docstring explaining
your approach. Commit to GitHub with the problem number and your
approach in the commit message.

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without notes, in under 12 minutes:                                   |
|                                                                       |
| 8.  Design a URL shortener that handles 10,000 redirects per second.  |
|     Draw the architecture with at least five named components and     |
|     explain the caching strategy.                                     |
|                                                                       |
| 9.  Explain the push vs pull model for social feed generation and     |
|     when each breaks.                                                 |
|                                                                       |
| 10. Solve Longest Substring Without Repeating Characters with O(n)    |
|     time and O(k) space --- k = alphabet size.                        |
|                                                                       |
| **All three completed correctly --- Week 1 is complete.**             |
+-----------------------------------------------------------------------+

Phase A --- Week 2 \| Messaging Systems + Tree and Graph DSA

+:---------------------------------------------------------------------:+
| **WEEK 2 --- System Design Depth**                                    |
|                                                                       |
| Days 8--14                                                            |
|                                                                       |
| **MISSION: Design systems that operate at WhatsApp and YouTube scale. |
| Solve tree and graph problems under timed conditions.**               |
+-----------------------------------------------------------------------+

**Day 8 --- Messaging System Design (WhatsApp)**

Messaging systems are one of the most common advanced system design
questions. They test real-time communication, message ordering, delivery
guarantees, and offline storage.

**Topics**

- WebSocket vs HTTP long-polling vs SSE --- when real-time requires a
  persistent connection

- Message delivery guarantees --- at-most-once, at-least-once,
  exactly-once --- what each costs

- Message ordering --- why total order is expensive, causal ordering as
  the practical alternative

- Read receipts --- the two-tick problem: how WhatsApp tracks delivered
  and read status

- End-to-end encryption --- key exchange, what the server stores vs what
  it cannot read

- Group messaging --- fan-out at send time vs pull-on-read, storage
  multiplier in group chats

- Offline message storage --- message queue per user, TTL, storage cap

- Presence indicators --- online/offline/last seen --- the polling vs
  WebSocket design decision

**Real-World Connection:** *You implemented SSE streaming for LangGraph
agents in Month 8. The SSE connection is the same protocol that powers
real-time messaging. The difference is persistence, ordering guarantees,
and delivery receipts --- design decisions that sit on top of the same
transport layer you already understand.*

**Day 9 --- Video Streaming System (YouTube)**

**Topics**

- Upload pipeline --- chunk, transcode to multiple resolutions, extract
  thumbnails, store in object storage

- Transcoding at scale --- why you need a message queue and worker pool,
  not synchronous processing

- HLS adaptive streaming --- manifest files, segment download, quality
  switching logic

- View count at scale --- why a direct database increment fails at
  YouTube scale, approximate counting

- Recommendation system (conceptual) --- collaborative filtering
  concept, how viewing history becomes a signal

- Comment system --- pagination, nested replies, vote ranking ---
  designing the query pattern

- Search --- full-text on titles/descriptions, metadata indexing,
  Elasticsearch for video search

**Real-World Connection:** *Your AI Knowledge Hub implemented document
upload, background processing, and embedding generation. The YouTube
upload pipeline is structurally identical: receive file, queue
processing job, process in background worker, update status, notify
user. The pattern is the same --- the processing step changes from
embedding generation to video transcoding.*

**Day 10 --- Rate Limiting + API Gateway Design**

**Topics**

- Rate limiting algorithms --- fixed window, sliding window, token
  bucket, leaky bucket --- implementation and tradeoffs

- Distributed rate limiting --- single Redis counter shared across
  multiple API server instances

- API gateway responsibilities --- authentication, routing, rate
  limiting, SSL termination, request transformation

- Circuit breaker pattern --- failing fast when a downstream service is
  unhealthy, exponential backoff

- Service discovery --- how microservices find each other, DNS-based vs
  registry-based

- Reverse proxy vs load balancer --- Nginx vs HAProxy --- when each is
  the right tool

**Real-World Connection:** *You implemented rate limiting with Redis in
Month 5. This day contextualises that implementation within a full API
gateway architecture. Your interview answer about rate limiting in your
project leads directly into a system design discussion about distributed
rate limiting at scale.*

**Days 11--12 --- Tree DSA Sprint**

**Binary Tree Problems --- 10 to Complete**

- Invert Binary Tree --- recursive and iterative

- Maximum Depth of Binary Tree --- DFS and BFS approaches

- Same Tree --- structural equality recursion

- Subtree of Another Tree --- string serialization or recursive
  comparison

- Lowest Common Ancestor of BST --- use BST property, do not traverse
  blindly

- Binary Tree Level Order Traversal --- BFS with queue, return levels as
  nested list

- Validate Binary Search Tree --- min/max bounds approach, not
  inorder-then-check

- Kth Smallest Element in BST --- inorder traversal, count to k

- Construct Binary Tree from Preorder and Inorder --- recursion with
  index tracking

- Binary Tree Maximum Path Sum --- post-order recursion, track global
  maximum

For every tree problem: draw the tree on paper first. Trace your
algorithm by hand on a 3-node example before writing code. This catches
incorrect base cases before they waste debugging time.

**Days 13--14 --- Graph DSA Sprint**

**Graph Problems --- 10 to Complete**

- Number of Islands --- DFS flood-fill, mark visited in-place

- Clone Graph --- DFS with hash map for visited nodes

- Pacific Atlantic Water Flow --- BFS from both oceans inward

- Course Schedule --- topological sort, cycle detection with DFS colors

- Course Schedule II --- topological order, not just cycle detection

- Graph Valid Tree --- connected + no cycles, union-find or DFS

- Number of Connected Components in Undirected Graph --- union-find
  approach

- Word Ladder --- BFS on implicit graph, neighbor generation

- Alien Dictionary --- topological sort from pairwise character
  comparison

- Accounts Merge --- union-find on email addresses, group by account

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Without notes, in under 15 minutes:                                   |
|                                                                       |
| 11. Design a real-time messaging system for 50 million daily active   |
|     users. Include: connection handling, message storage, offline     |
|     delivery, and read receipts.                                      |
|                                                                       |
| 12. Implement Course Schedule (cycle detection in directed graph) --- |
|     working code, not pseudocode.                                     |
|                                                                       |
| 13. Explain the token bucket algorithm and how you would implement it |
|     in Redis with two commands.                                       |
|                                                                       |
| **All three --- Week 2 is complete.**                                 |
+-----------------------------------------------------------------------+

Phase A --- Week 3 \| Resume Hardening + Final Foundation Review

+:---------------------------------------------------------------------:+
| **WEEK 3 --- Foundation Complete**                                    |
|                                                                       |
| Days 15--21                                                           |
|                                                                       |
| **MISSION: Close every remaining gap in system design and DSA.        |
| Finalize the resume, GitHub, and LinkedIn to placement-ready          |
| standard.**                                                           |
+-----------------------------------------------------------------------+

**Day 15 --- Search System Design + Elasticsearch**

**Topics**

- Inverted index --- the data structure that powers every search engine

- TF-IDF ranking --- why \"the\" scores lower than \"quantum\" in a
  document corpus

- BM25 --- the practical replacement for TF-IDF, how modern search
  engines rank documents

- Elasticsearch basics --- index, document, shard, replica, mapping

- Hybrid search --- combining keyword (BM25) with semantic (vector)
  search, Reciprocal Rank Fusion

- Typeahead / autocomplete --- trie vs inverted index, prefix queries,
  edge n-grams

- Search result ranking --- personalisation signals, recency, user
  engagement, relevance

**Real-World Connection:** *Your AI Knowledge Hub already implements
semantic search with pgvector. This day adds the keyword search layer
and explains how production systems combine both. The hybrid search
implementation in your project becomes a system design talking point:
you can explain BM25 + vector similarity fusion from your own codebase.*

**Day 16 --- Notification System + Distributed Transactions**

**Notification System Design**

- Notification types --- push, email, SMS, in-app --- different delivery
  mechanisms for each

- User preference management --- per-channel, per-type opt-in/out, quiet
  hours

- Notification template service --- variable substitution, localization,
  version management

- Delivery guarantees --- at-least-once with idempotency key on the
  consumer side

- Notification history --- storing sent notifications, read/unread
  state, pagination

**Distributed Transactions**

- The problem: a payment deducts funds from Account A and credits
  Account B --- what if step 2 fails?

- Two-Phase Commit (2PC) --- coordinator, prepare phase, commit phase,
  the blocking problem

- SAGA pattern --- sequence of local transactions with compensating
  transactions for rollback

- Outbox pattern --- write event to a local table atomically with
  business data, separate process publishes to queue

**Day 17 --- DP Foundations + Advanced Array DSA**

**Dynamic Programming --- 10 Problems**

- Climbing Stairs --- recognize as Fibonacci, memoize top-down first,
  tabulate bottom-up second

- House Robber --- 1D DP, optimal substructure --- rob or skip this
  house

- House Robber II --- circular constraint, two passes

- Longest Palindromic Substring --- expand around center approach first,
  then DP table

- Palindromic Substrings --- count, not just find --- expand around
  center

- Decode Ways --- DP with two variables, watch the edge cases on \'0\'

- Coin Change --- classic unbounded knapsack, bottom-up

- Maximum Product Subarray --- track both max and min because negatives
  flip sign

- Word Break --- DP with set lookup, memoize which positions are
  reachable

- Longest Increasing Subsequence --- O(n²) DP first, then O(n log n)
  patience sorting

**Days 18--19 --- Resume and GitHub Finalization**

The resume and GitHub are not last-minute additions. They are
engineering artifacts. Treat this two-day block with the same discipline
as a project sprint.

**Resume Standards --- Every Item Must Clear These Bars**

- One page. No exceptions. If it does not fit one page, remove
  something.

- Every bullet follows the pattern: Action Verb + Technology +
  Quantified Outcome --- \"Built FastAPI authentication service handling
  50,000 daily active users\" beats \"Worked on authentication.\"

- Projects section is the centrepiece --- two projects with live URLs,
  stack listed, one-sentence problem statement, two-sentence technical
  approach

- Skills section is factual --- only technologies you can write
  production code in without AI. No \"familiar with.\" No \"exposure
  to.\"

- Education section is minimal --- college, degree, expected graduation,
  CGPA only if above 8.0

- No objective statement. No photograph. No references. No word count
  filler.

**GitHub Portfolio Standards**

- Profile README --- four sentences: who you are, what you build,
  current focus, contact link

- Pinned repositories --- exactly 6 pinned: Portfolio Project 1,
  Portfolio Project 2, and 4 of the strongest mini projects

- Every pinned repo has: a description, a live URL badge, a technology
  stack badge list, and a README with architecture section

- Commit history --- green squares every day or nearly every day ---
  gaps during exam periods are acceptable and expected

- No dead repositories --- private or delete anything unfinished that
  does not demonstrate engineering skill

**LinkedIn Standards**

- Headline: \"AI-Enabled Full Stack Engineer \| FastAPI · React ·
  LangGraph \| Open to SDE Roles\"

- About section: 3--4 sentences. What you build. What technologies you
  use. What you are looking for.

- Projects section --- both portfolio projects with descriptions,
  screenshots, and live links

- Skills section --- endorsed skills matching resume: Python, FastAPI,
  React, TypeScript, PostgreSQL, Docker, LangGraph, RAG

**Days 20--21 --- DSA Final Sprint + Phase A Review**

**10 Mixed Problems**

- Median of Two Sorted Arrays --- binary search, O(log(m+n))

- Jump Game II --- greedy, minimum jumps to reach end

- Merge Intervals --- sort by start, greedy merge

- Non-overlapping Intervals --- count minimum removals

- Meeting Rooms II --- interval scheduling, heap or sweep line

- Kth Largest Element in Array --- quickselect average O(n)

- Find Median from Data Stream --- two heaps, balance invariant

- Top K Frequent Elements --- bucket sort or heap

- Encode and Decode Strings --- any delimiter-free encoding scheme

- Longest Consecutive Sequence --- O(n) using hash set

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Phase A Exit Criteria --- all four must be satisfied:                 |
|                                                                       |
| 14. Can you complete a full system design for a given prompt (URL     |
|     shortener, Twitter, YouTube) in 45 minutes including:             |
|     requirements, scale estimation, API design, data model,           |
|     architecture diagram, and bottleneck identification?              |
|                                                                       |
| 15. Can you solve a medium-difficulty LeetCode problem in under 20    |
|     minutes under timed conditions without reference?                 |
|                                                                       |
| 16. Is your resume one page with quantified bullets, live project     |
|     URLs, and no filler content?                                      |
|                                                                       |
| 17. Are both GitHub projects showing live URLs, README architecture   |
|     sections, and technology stack badges?                            |
|                                                                       |
| **All four --- Phase A is complete. Phase B begins.**                 |
+-----------------------------------------------------------------------+

CHAPTER 3 --- PHASE B: INTERVIEW SHARPENING Weeks 4--6 \| \~21 Days

Phase B is the most underrated phase in any job search. Most candidates
spend all their preparation time on technical content and none on
delivery. This phase runs both in parallel. The technical content from
Phase A is maintained through daily practice. The delivery --- how you
communicate under pressure, how you structure an answer, how you handle
a question you do not immediately know --- is built here through
repetition.

Phase B Structure

  ----------------- -------------------------- --------------------------
  **Week**          **Primary Focus**          **Daily Practice**

  Week 4            Mock technical             DSA (2 problems/day) +
                    interviews + behavioral    system design review (1
                    framework                  problem/day)

  Week 5            Full mock interviews (90   DSA (2 problems/day) +
                    min each) + answer         project explanation drills
                    refinement                 

  Week 6            Company-specific           DSA (2 problems/day) +
                    preparation + final        communication polishing
                    portfolio review           
  ----------------- -------------------------- --------------------------

Phase B --- Week 4 \| Communication Framework + First Mock Interviews

+:---------------------------------------------------------------------:+
| **WEEK 4 --- Delivery Begins**                                        |
|                                                                       |
| Days 22--28                                                           |
|                                                                       |
| **MISSION: Build the communication framework that makes your          |
| engineering skill visible in an interview room.**                     |
+-----------------------------------------------------------------------+

**The STAR Framework for Technical Stories**

Behavioral interviews at product-based companies are not soft questions.
They test engineering judgment: how you handle ambiguity, technical
disagreements, scope creep, and failure. A strong behavioral answer uses
the STAR structure: Situation, Task, Action, Result.

**STAR Structure Applied to Engineering**

- Situation --- Set context in two sentences. What was the project? What
  was the constraint? \"I was building the RAG pipeline for the AI
  Knowledge Hub project during Month 7.\"

- Task --- What was specifically your responsibility? \"I needed to
  implement document chunking that preserved semantic coherence across
  chunk boundaries.\"

- Action --- This is where you spend most of the answer. What specific
  decisions did you make and why? What alternatives did you consider and
  reject? \"I evaluated three chunking strategies: fixed-size chunks
  lost context at boundaries, sentence-based chunking produced
  inconsistent sizes, so I implemented a recursive character text
  splitter with overlap to preserve context between chunks.\"

- Result --- Quantify where possible. \"Retrieval quality improved from
  62% to 84% answer relevance on a 20-question test set.\"

**15 Behavioral Questions to Prepare Written Answers For**

18. Tell me about yourself and your engineering journey.

19. Describe a technical challenge you solved during your projects. What
    made it hard?

20. Tell me about a time you had to make a decision without complete
    information.

21. Describe a situation where you had to learn something quickly and
    apply it immediately.

22. Tell me about a project you are most proud of. What would you do
    differently?

23. Describe a time when your approach turned out to be wrong. What did
    you do?

24. How do you decide when code is good enough to ship?

25. Tell me about a time you had to debug a difficult production issue.

26. Describe how you would explain your most complex project to a
    non-technical person.

27. What is the most important thing you have learned about software
    engineering from building your projects?

28. How do you handle technical debt? Give an example from your own
    work.

29. Tell me about a time you improved the performance of something you
    built.

30. How do you approach testing? Give an example.

31. What engineering decision in your portfolio projects would you
    change if you started over today?

32. Where do you want to be in three years, and why is this role the
    right step?

Write a full STAR answer for each question above. Not notes --- full
sentences, timed delivery. Record yourself and listen back for filler
words, unclear structure, and answers that run over three minutes.

**Technical Communication Drills**

**Project Explanation Drill --- 5-Minute Demo**

You must be able to explain each portfolio project in under 5 minutes to
a senior engineer. Structure: one sentence what it does, one sentence
the problem it solves, three sentences on the architecture, one sentence
on the hardest implementation challenge.

- Record yourself explaining Portfolio Project 1. Watch it back.
  Identify hesitations, vague phrases (\"basically,\" \"kind of\"), and
  moments where you could not explain a technical decision.

- Record yourself explaining Portfolio Project 2. Same evaluation
  criteria.

- Practice until both explanations are clean, confident, and contain no
  filler words.

**Live Coding Communication Protocol**

During a live coding interview, silence is failure. Interviewers assess
your thought process, not just your solution. Use this protocol every
time.

33. Read the problem aloud and confirm you understand it. State any
    assumptions.

34. Clarify input constraints --- can the array be empty? Can n be
    negative? What are the bounds?

35. Think out loud about the brute force first. State its time and space
    complexity.

36. State your optimal approach and explain why it is better before
    writing a single line of code.

37. Write the function signature first with type hints.

38. Implement while narrating --- \"I am using a hash map here because I
    need O(1) lookup for\...\"

39. Test with the example case, then with an edge case you identified
    earlier.

40. State the final time and space complexity and explain the reasoning.

**Days 22--24 --- First Mock Interview Block**

Run three full mock interviews over these three days. Each mock
interview follows the same format as a real technical screening round.

**Mock Interview Format (60 minutes)**

- 5 minutes --- behavioral question (one question, full STAR answer)

- 30 minutes --- coding problem (medium difficulty, LeetCode format,
  explain throughout)

- 20 minutes --- system design question (use Phase A framework)

- 5 minutes --- \"Do you have any questions?\" --- always have two
  prepared

Who to run mock interviews with: a classmate studying for placement,
your DSA mentor, or a senior student who has already gone through
placements. If none are available, record yourself and evaluate using
the criteria above.

**Days 25--28 --- Advanced DSA + Mock Interview Continuation**

**Heap and Priority Queue Problems**

- Find Median from Data Stream --- two heaps --- already practised, now
  timed under 15 minutes

- Task Scheduler --- frequency counting, greedy idle time calculation

- K Closest Points to Origin --- min heap or quickselect

- Kth Largest Element in Stream --- min heap of size k

- Merge K Sorted Lists --- min heap merge

**Interval Problems**

- Insert Interval --- merge into sorted list

- Meeting Rooms (I and II) --- sort by start, heap for end times

- Employee Free Time --- merge across multiple employee schedules

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Week 4 Exit Criteria:                                                 |
|                                                                       |
| 41. Have you written STAR answers for all 15 behavioral questions?    |
|                                                                       |
| 42. Have you completed three full mock interviews with post-interview |
|     review?                                                           |
|                                                                       |
| 43. Can you explain both portfolio projects in under 5 minutes        |
|     without notes?                                                    |
|                                                                       |
| 44. Are you solving medium LeetCode in under 20 minutes consistently? |
|                                                                       |
| **All four --- Week 4 is complete.**                                  |
+-----------------------------------------------------------------------+

Phase B --- Week 5 \| Full Mock Interviews + Company Research Protocol

+:---------------------------------------------------------------------:+
| **WEEK 5 --- Interview Simulation**                                   |
|                                                                       |
| Days 29--35                                                           |
|                                                                       |
| **MISSION: Three full 90-minute mock interviews. Identify and         |
| eliminate every remaining weakness before real rounds begin.**        |
+-----------------------------------------------------------------------+

**Why 90-Minute Mocks Matter**

Most candidates practise individual skills in isolation --- coding
problems, or behavioral questions, or system design. But in a real
interview, you do all three in sequence. Mental fatigue after 45 minutes
of coding affects your system design communication. 90-minute mocks
build the stamina and the transitions between formats that shorter
practice cannot develop.

**Full Mock Interview Format (90 minutes)**

- 10 minutes --- Introduction + behavioral question (STAR format, 3
  minutes for answer)

- 35 minutes --- Live coding (one medium-hard problem, communicate
  throughout, one hint permitted)

- 35 minutes --- System design (full problem with all seven framework
  steps)

- 10 minutes --- Follow-up discussion + \"any questions?\" + debrief

**Post-Mock Review Checklist**

- Coding problem: Did you communicate your approach before writing? Did
  you test with edge cases? Did you state the complexity at the end?

- System design: Did you estimate scale before drawing the architecture?
  Did you identify the bottleneck and propose a solution?

- Behavioral: Was the STAR structure clear? Was the answer under 3
  minutes? Did you quantify the outcome?

- Transitions: How was your composure when switching between formats?
  Did you ask clarifying questions?

**Company Research Protocol**

Before applying to any company, spend 45 minutes on structured research.
This investment pays off in every phone screen and every HR round.

**What to Research for Every Target Company**

- Technology stack --- what languages, frameworks, and databases they
  use. Your skills map against their stack.

- Engineering blog --- most product companies publish technical posts.
  Read the last three. Reference one in your interview.

- Recent product launches --- what they shipped in the last six months.
  Shows interest and prepares you for \"why us?\"

- Company size and stage --- startup vs growth vs enterprise changes
  what \"senior engineer\" means and what work looks like

- Interview format --- Glassdoor, LeetCode discussions, and LinkedIn
  alumni can tell you what rounds to expect

- Values and culture --- one sentence you can reference authentically
  when asked why this company specifically

**Target Company Tier Classification**

Classify target companies before applications open so you can sequence
your applications strategically.

  ----------------------- -----------------------------------------------
  **Tier**                **Companies and Approach**

  Tier A --- Dream        Top product companies, global tech firms ---
  Targets                 apply after Phase B is complete, maximum
                          preparation

  Tier B --- Primary      Strong product companies, well-funded startups
  Targets                 --- your main application volume

  Tier C --- Practice     Service companies, smaller startups --- apply
  Targets                 early for interview experience, lower stakes
  ----------------------- -----------------------------------------------

Apply to Tier C companies first, in Week 6 of Phase B. Real interviews
at lower-stakes companies are better practice than mock interviews.
Lessons learned there directly improve your Tier A performance.

**Advanced DSA --- Tries and Bit Manipulation**

**Trie Problems**

- Implement Trie --- build the data structure from scratch

- Add and Search Word --- DFS with wildcard \'.\' matching

- Word Search II --- trie + DFS on board, prune branches

- Design Search Autocomplete System --- trie + frequency ranking

**Bit Manipulation**

- Number of 1 Bits --- Brian Kernighan algorithm: n &= n-1 until zero

- Counting Bits --- DP with bit trick: bits\[i\] = bits\[i \>\> 1\] + (i
  & 1)

- Reverse Bits --- XOR swap approach

- Missing Number --- XOR all indices and values, missing one remains

- Sum of Two Integers --- add without + operator, simulate carry with
  bit ops

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Week 5 Exit Criteria:                                                 |
|                                                                       |
| 45. Three full 90-minute mock interviews completed with written       |
|     post-interview reviews.                                           |
|                                                                       |
| 46. Every weakness identified in Week 4 review has been practised and |
|     improved.                                                         |
|                                                                       |
| 47. Company research completed for at least 10 target companies       |
|     across all three tiers.                                           |
|                                                                       |
| 48. Trie implementation written from scratch in under 20 minutes      |
|     without reference.                                                |
|                                                                       |
| **All four --- Week 5 is complete.**                                  |
+-----------------------------------------------------------------------+

Phase B --- Week 6 \| Final Preparation + Tier C Applications Open

+:---------------------------------------------------------------------:+
| **WEEK 6 --- Final Calibration**                                      |
|                                                                       |
| Days 36--42                                                           |
|                                                                       |
| **MISSION: Close every remaining gap. Begin first applications.       |
| Transform mock performance into real interview performance.**         |
+-----------------------------------------------------------------------+

**Aptitude and CRT Preparation**

Many campus placement processes include aptitude rounds before the
technical interview: quantitative reasoning, logical reasoning, verbal
ability, and coding challenges under automated assessment conditions.

**Quantitative Aptitude --- Key Topics**

- Percentage, profit/loss, simple and compound interest --- formulae by
  memory

- Time, speed, and distance --- relative speed problems, trains, boats

- Time and work --- work done in fractions per day, combined rates

- Permutations and combinations --- arrange vs choose, with and without
  repetition

- Probability --- basic events, conditional probability, Bayes theorem
  (conceptual)

- Number theory --- HCF, LCM, divisibility rules, modular arithmetic

- Data interpretation --- tables, bar charts, pie charts --- read
  quickly, calculate accurately

**Logical Reasoning --- Key Patterns**

- Syllogisms --- Venn diagram approach, all/some/no relationships

- Blood relations --- draw the family tree, do not try to hold in memory

- Seating arrangements --- circular and linear, note constraints before
  placing

- Coding-decoding --- look for the cipher pattern before answering

- Series completion --- number series, letter series, pattern
  recognition

**Verbal Ability --- Key Focus Areas**

- Reading comprehension --- read the questions before the passage to
  target relevant information

- Sentence correction --- subject-verb agreement, pronoun reference,
  parallelism

- Vocabulary --- contextual meaning, not memorized definitions

- Para-jumbles --- find the opening sentence first (never starts with a
  pronoun), then build the chain

**Technical Interview Rapid Review**

This is not a revision of Volume 3 content. This is a rapid activation
of already-known material under interview conditions. Pick the ten
questions you are least confident about and practice them under timed
conditions.

**Core Technical Questions --- Must Answer Fluently**

- Explain async def in FastAPI. When would you use def instead?

- What is the N+1 query problem? How do you detect and fix it in
  SQLAlchemy?

- Explain JWT authentication end-to-end, including token refresh and
  revocation.

- What is the difference between a Dockerfile and a docker-compose.yml?

- Explain what pgvector stores and how similarity search works.

- What is RAG? Walk me through your implementation.

- How does LangGraph differ from a simple chain? When would you choose
  it?

- What is eventual consistency? Where does it appear in your
  architecture?

- How does your CI/CD pipeline work? What triggers a deployment?

- Explain the Repository pattern. Why did you use it in your projects?

- What is a Python generator? Give an example from your codebase.

- How does Redis work in your application? What would break if Redis
  went down?

- Why is bcrypt used for password hashing instead of SHA-256?

- What is a Pydantic model? How does FastAPI use it?

- Walk me through what happens when a user makes a request to your API
  --- from HTTP request to database and back.

**First Applications --- Tier C Opens**

- Apply to five Tier C companies this week using your finalized resume.

- Track every application in a spreadsheet: company, date applied, role,
  tier, status, notes from each round.

- Treat every Tier C interview as a paid mock interview. Debrief after
  every round. Update your preparation based on what surprised you.

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Phase B Exit Criteria --- all five must be satisfied:                 |
|                                                                       |
| 49. Five or more full mock interviews completed with written          |
|     post-interview reviews.                                           |
|                                                                       |
| 50. All 15 behavioral questions have polished STAR answers ---        |
|     practised out loud, not just written.                             |
|                                                                       |
| 51. Aptitude topics reviewed --- comfortable with quantitative        |
|     reasoning and logical reasoning under time pressure.              |
|                                                                       |
| 52. All 15 technical questions answerable fluently without notes.     |
|                                                                       |
| 53. First Tier C applications submitted with tracking spreadsheet in  |
|     place.                                                            |
|                                                                       |
| **All five --- Phase B is complete. Phase C begins.**                 |
+-----------------------------------------------------------------------+

CHAPTER 4 --- PHASE C: ACTIVE PLACEMENT Weeks 7--12 \| \~6 Weeks

Phase C is the execution phase. Applications are live. Real interviews
are happening. The roadmap preparation --- all of Volumes 1 through 4
--- has been building toward this period. The goal in Phase C is not to
learn new things; it is to perform everything you already know under
real conditions and continuously improve based on feedback from each
round.

Phase C Weekly Rhythm

  ----------------- -------------------------- --------------------------
  **Track**         **Weekly Commitment**      **Purpose**

  Applications      5--10 new applications per Maintain pipeline across
                    week                       all three tiers

  Active Rounds     All scheduled interviews   Convert applications to
                    have priority over all     offers
                    other tasks                

  DSA Maintenance   2 problems per day --- do  Stay sharp for any round
                    not let this skill decay   at any time

  Post-Round Review Written debrief within 24  Compound learning from
                    hours of every round       every interview

  Communication     Daily emails, follow-ups,  Professional relationship
                    status updates to          management
                    companies                  
  ----------------- -------------------------- --------------------------

The Application Funnel

Placement season is a funnel. Expect the following conversion rates and
plan your pipeline accordingly.

  -------------- ------------------- ------------------- -------------------
  **Stage**      **Expected Rate**   **Action Required** **Volume Needed**

  Applications   100%                Tailor resume and   50--100
  sent                               cover to each tier  applications total

  Response /     20--40%             Research company,   15--30 responses
  screening call                     prepare two         
                                     questions           

  Technical      50--70% of screened Coding + system     10--20 technical
  round 1                            design, full        rounds
                                     preparation         

  Offer          20--40% of          Negotiation         2--5 offers
                 technical           preparation in      
                                     advance             
  -------------- ------------------- ------------------- -------------------

A smaller pipeline means fewer chances to learn and fewer offers to
choose from. Maintain volume. Applications to Tier B and Tier A
companies should begin by Week 8.

Interview Day Protocol

**The Night Before**

- Review both project architectures --- read your own README for each
  project

- Prepare two company-specific questions to ask at the end

- Set two alarms. Lay out your environment --- working laptop, stable
  internet, water, notebook

- Do not study new material. Light review only. Sleep is a performance
  variable.

**Interview Morning**

- One DSA warm-up problem --- easy level, to get your thinking active
  without burning energy

- Join the call 2 minutes early --- not 10 minutes, not on time

- Test audio and video before the interview, not during

**During the Interview**

- Listen completely before responding --- do not start answering while
  the interviewer is still speaking

- If you do not understand a question: \"Could you clarify what you mean
  by X?\" is a correct and professional response

- If you are stuck on a coding problem: narrate your thinking, not your
  silence. \"I am considering an approach with a hash map but I need to
  think through the edge case where\...\" is far better than silence.

- After solving: always check for edge cases out loud --- empty input,
  single element, maximum constraints

**Post-Interview (within 24 hours)**

- Write the debrief: what questions were asked, how you answered, what
  you would change

- If you do not know the answer to a question that was asked --- look it
  up and add it to your rapid review list

- Send a brief follow-up email thanking the interviewer if you have
  their contact --- one sentence, professional

Handling Specific Difficult Situations

**When You Cannot Solve the Coding Problem**

This will happen. How you handle it is what the interviewer is actually
testing.

- Do not go silent. Continue narrating your thinking even when you are
  stuck.

- State the brute force solution even if it is O(n²) or O(2\^n). Partial
  credit exists. Silence has none.

- Ask the interviewer: \"Is it acceptable if I implement the brute force
  first and then optimise?\" Most will say yes.

- If genuinely blocked, ask for a hint. \"I know there is an optimal
  approach here and I believe it involves binary search or a hash map
  --- am I in the right direction?\" is a legitimate question.

**When You Do Not Know the Answer to a Technical Question**

- Never bluff. Senior interviewers detect it immediately and it destroys
  credibility.

- \"I have not implemented that specific pattern, but based on what I
  know about X, I would approach it by\...\" demonstrates reasoning
  under uncertainty.

- \"That is a gap in my current knowledge --- could you walk me through
  the concept? I learn quickly and want to understand it.\" is a
  legitimate answer at a junior level.

**When Asked About Weaknesses**

- Pick a real weakness that is not load-bearing for the role.

- Explain what you have done to address it.

- \"I have been working on improving my system design speed --- I have
  been practising timed design sessions for the past three weeks and
  have seen improvement\" is an honest, growth-oriented answer.

Offer Evaluation Framework

When offers arrive, evaluate them systematically. The first offer is not
automatically the best offer and is not automatically the worst. Give
yourself 48 to 72 hours before accepting or declining any offer.

**Evaluation Dimensions**

- Technical growth --- what will you learn in this role? Will you be
  challenged or comfortable from week one?

- Engineering culture --- do they have code reviews? CI/CD pipelines? Do
  they use the technologies you built with?

- Team and management --- who will you work with directly? What is their
  engineering background?

- Compensation --- base salary, variable component, stock (if any),
  benefits --- compare the total package

- Location and logistics --- remote, hybrid, or in-office? Commute and
  cost-of-living implications

- Company trajectory --- growing, stable, or declining? How does this
  affect your next career step?

**Negotiation --- What You Must Know**

- Every offer is negotiable. The act of negotiating does not cost you
  the offer at legitimate companies.

- Never give a number first. \"I am flexible and focused on finding the
  right fit --- what is the range budgeted for this role?\"

- If you have a competing offer: \"I have another offer for X and I
  value this opportunity --- is there flexibility to bring the
  compensation closer to that level?\"

- Negotiate in writing (email) for junior roles --- creates a clear
  record and gives you time to think

- Non-salary items are also negotiable: start date, signing bonus, role
  title, remote days

+-----------------------------------------------------------------------+
| **✅ Assessment --- Exit Criteria**                                   |
|                                                                       |
| Phase C Completion Criteria:                                          |
|                                                                       |
| 54. Application tracking spreadsheet shows at least 30 applications   |
|     sent.                                                             |
|                                                                       |
| 55. At least one offer received.                                      |
|                                                                       |
| 56. Every round (regardless of outcome) has a written post-interview  |
|     debrief on file.                                                  |
|                                                                       |
| 57. DSA daily practice maintained throughout --- no two-week gaps.    |
|                                                                       |
| *Phase C does not have a fixed end date. It ends when you sign an     |
| offer that meets your evaluation criteria.*                           |
+-----------------------------------------------------------------------+

CHAPTER 5 --- PHASE D: ADVANCED AI ENGINEERING (Runs Alongside Phase C)

Phase D runs in parallel with Phase C. It does not replace interview
preparation --- it extends your engineering capability in the hours that
are not consumed by active placement. The topics in this phase represent
the advanced layer of AI engineering that differentiates senior AI
engineers from developers who have followed tutorials.

The investment here is not for your current placement round --- it is
for the technical conversations that arise during interviews, for the
depth you demonstrate when asked about your AI projects, and for the
engineering capability you carry into your first role.

+-----------------------------------------------------------------------+
| **📅 Phase D Scheduling Rule**                                        |
|                                                                       |
| Phase D topics are studied on days without active interview           |
| preparation or live rounds. Typical schedule: 60--90 minutes on       |
| weekday evenings after DSA practice; 2--3 hours on weekends when no   |
| mock interviews are scheduled. Never sacrifice interview preparation  |
| for Phase D. This phase improves your ceiling; Phase C converts that  |
| ceiling into an offer.                                                |
+-----------------------------------------------------------------------+

Phase D --- Module 1: AI Observability and Production Hardening

**Why This Module Matters**

Most engineers who have built AI applications have never instrumentated
them. They know if the application works in development; they do not
know how it performs in production with real users, real edge cases, and
real failure modes. AI observability is one of the most in-demand skills
in AI engineering because very few engineers have done it.

**LangSmith: Trace Every LLM Interaction**

- Connecting LangSmith to your existing LangGraph agents ---
  LANGCHAIN_TRACING_V2 environment variable

- Trace anatomy --- inputs, outputs, token usage, latency, model version
  --- all visible per run

- Dataset creation --- collecting representative inputs from production
  for offline evaluation

- Evaluation runs --- running a dataset against your chain and measuring
  output quality systematically

- LLM-as-judge --- using a second LLM call to score outputs: relevance,
  faithfulness, completeness

- Feedback collection --- capturing thumbs up/down from users, linking
  to trace ID for offline analysis

**Production AI Monitoring Metrics**

- Token cost per request --- log this per endpoint. Unmonitored LLM
  costs compound rapidly.

- Latency percentiles --- P50, P95, P99 latency. P99 is where your
  worst-case user experience lives.

- Retrieval quality proxy --- for RAG systems: does the retrieved
  context actually contain the answer?

- Hallucination rate --- factual claims in responses that are not
  supported by retrieved context

- Conversation abandonment rate --- users who start a conversation and
  do not complete it signal quality issues

**AI Safety Engineering**

- Prompt injection --- user input that hijacks the system prompt, real
  attacks and defenses

- Input sanitisation for LLM pipelines --- what to strip, what to warn,
  what to reject

- Output validation --- parsing structured outputs, handling malformed
  JSON, graceful degradation

- Rate limiting per user for LLM endpoints --- cost caps prevent runaway
  bills from a single user

- PII detection before sending data to external LLM APIs --- names,
  emails, phone numbers in user documents

**Real-World Connection:** *Your AI Knowledge Hub already implements LLM
API calls, RAG retrieval, and LangGraph agents. This module adds the
observability layer on top of what you have already built. Integrating
LangSmith into your existing project takes two hours and immediately
makes your portfolio demo significantly more impressive --- you can show
traces, token costs, and evaluation scores.*

Phase D --- Module 2: Advanced RAG Patterns

**Beyond Basic RAG**

Basic RAG --- embed a document, search for similar chunks, inject into
prompt --- is what every tutorial covers. The candidates who stand out
in AI engineering interviews know what breaks in basic RAG and how to
fix it.

**RAG Failure Modes and Their Solutions**

- Retrieval misses --- the relevant chunk exists but is not retrieved.
  Causes: poor chunking, semantic gap between query and chunk language.
  Solutions: query rewriting, HyDE (Hypothetical Document Embeddings),
  multi-query retrieval.

- Context window overflow --- retrieved chunks exceed model context
  limit. Solutions: re-ranking to select the best k chunks rather than
  all k, map-reduce patterns for very long documents.

- Lost in the middle --- LLMs attend to the beginning and end of
  context, ignoring the middle. Solution: rank retrieved chunks and
  place the highest-scoring ones at the beginning and end of the context
  window.

- Outdated information --- retrieved chunks contain stale data.
  Solution: metadata filtering by date, TTL on embeddings, incremental
  re-indexing pipeline.

- Hallucination on out-of-context queries --- the model answers
  questions not covered by the retrieved context by hallucinating.
  Solution: confidence threshold on retrieval score, explicit \"I do not
  have enough information\" fallback path.

**Advanced Retrieval Techniques**

- Hybrid search --- BM25 (keyword) + vector (semantic) combined with
  Reciprocal Rank Fusion

- Re-ranking --- a second model pass (Cohere Rerank, BGE reranker) that
  scores retrieved chunks for true relevance to the query

- Parent document retrieval --- embed small chunks for precision,
  retrieve large parent chunks for context

- Multi-vector retrieval --- embed document summaries AND individual
  chunks; query hits summaries, retrieves full docs

- Contextual compression --- extract only the relevant sentences from a
  retrieved chunk rather than injecting the whole thing

- Self-RAG --- the model itself decides when to retrieve and what to
  retrieve, rather than always retrieving

**Real-World Connection:** *Your AI Knowledge Hub implements basic RAG
with pgvector. Adding hybrid search (BM25 + vector) and a re-ranking
step to your existing implementation is a one-week project that upgrades
the application from tutorial-level to production-level. This becomes a
strong interview talking point: you can describe what broke in the basic
implementation and what you did to fix it.*

Phase D --- Module 3: Structured Outputs and Function Calling at Depth

**Structured Outputs --- Beyond Basic JSON**

- Pydantic + OpenAI structured outputs --- the model generates JSON that
  validates against your schema

- Strict mode vs non-strict --- strict mode guarantees schema adherence,
  non-strict mode is faster but may deviate

- Nested structured outputs --- objects within objects, discriminated
  unions, optional fields

- Streaming structured outputs --- receiving partial JSON tokens and
  assembling the object incrementally

- Fallback handling --- what your code does when the model returns a
  structurally valid but semantically wrong object

**Function Calling --- Production Patterns**

- Parallel function calling --- the model decides to call multiple tools
  simultaneously, you execute them concurrently

- Tool result injection --- feeding tool results back into the
  conversation correctly

- Dynamic tool registration --- building tool lists at runtime based on
  user permissions or context

- Tool call caching --- memoizing expensive tool calls within a session

- Error propagation from tools --- the model recovers from tool errors
  gracefully with the right prompting

Phase D --- Module 4: Embeddings Engineering

**Embedding Model Selection**

- Embedding dimensions --- 768 vs 1536 vs 3072 --- the tradeoff between
  quality and storage cost

- Domain-specific embeddings --- general-purpose (text-embedding-3) vs
  specialised (code embeddings, multilingual)

- Local embeddings --- running sentence-transformers locally, zero data
  egress, lower latency, no API cost

- Embedding benchmarks --- MTEB leaderboard, how to interpret retrieval,
  clustering, and classification scores

**Efficient Embedding Storage**

- pgvector index types --- HNSW vs IVFFlat --- HNSW for production
  (faster query, slightly larger index)

- Quantization --- reducing float32 to int8 embeddings, 4x storage
  reduction with small quality tradeoff

- Batch embedding generation --- embedding 10,000 documents at once,
  handling API rate limits correctly

- Incremental embedding updates --- only re-embed changed documents, not
  the entire corpus

Phase D --- Module 5: Multi-Modal AI Integration

**Images in LLM Pipelines**

- GPT-4o and Claude vision --- sending base64-encoded images or URLs in
  the messages array

- Image analysis pipeline --- extract text from images, describe
  diagrams, classify visual content

- OCR vs LLM vision --- when traditional OCR (Tesseract) beats a vision
  model call on cost and latency

- Multi-modal RAG --- indexing documents that contain both text and
  images, retrieving relevant images alongside text

**Audio and Speech**

- Whisper transcription --- transcribing audio to text, handling noise
  and accents

- Voice agent architecture --- speech-to-text → LLM → text-to-speech
  pipeline, latency constraints

- Real-time transcription --- streaming audio input, partial transcript
  handling

**Real-World Connection:** *Multi-modal is the fastest-growing area of
production AI engineering. Adding image analysis to your AI Knowledge
Hub --- allowing users to upload PDFs with diagrams and have the system
extract meaning from both text and images --- is a one-sprint extension
that significantly differentiates your portfolio from candidates who
only worked with text.*

Phase D --- Module 6: AI Engineering Interview Questions

These questions appear specifically in AI-engineering-focused roles.
Prepare written answers for each.

**System Design --- AI Flavour**

- Design a document Q&A system that handles 1 million documents and
  10,000 queries per second.

- How would you detect and prevent prompt injection in a public-facing
  LLM application?

- Design an AI agent that can autonomously research a topic and produce
  a structured report --- what fails at scale?

- How do you ensure consistency between the outputs of two LLM calls in
  the same workflow?

- A RAG system is producing hallucinated answers 15% of the time. What
  is your diagnostic and remediation plan?

**Technical Deep-Dives**

- Explain cosine similarity vs dot product for vector search. When does
  the choice matter?

- What is HNSW and why is it preferred over brute-force similarity
  search at production scale?

- Explain the difference between temperature and top-p sampling. When
  would you reduce each?

- What is the context window and why does its size affect RAG chunking
  strategy?

- How does chain-of-thought prompting affect output quality? What is its
  cost?

- What is function calling and how does it differ from a ReAct agent?

- Explain token cost estimation for a RAG pipeline. What are the main
  cost drivers?

CHAPTER 6 --- PLACEMENT READINESS SCORECARD

Use this scorecard at the end of Phase A and again at the end of Phase B
to identify remaining gaps before active placement begins. Every item
must be answered honestly. Marking something as ready when it is not
delays the problem rather than solving it.

Technical Readiness

  ----------------------- -----------------------------------------------
  **Competency**          **Ready Criteria**

  Python --- full stack   Can write async FastAPI routes, Pydantic
                          models, SQLAlchemy queries, and pytest tests
                          from scratch without reference in under 20
                          minutes

  SQL --- interview level Solves multi-table business queries with window
                          functions in under 8 minutes

  React + TypeScript      Builds a typed component with custom hooks and
                          API integration in under 15 minutes

  FastAPI --- production  Designs and implements a CRUD API with auth,
                          testing, and pagination from memory

  Docker + CI/CD          Writes a Dockerfile, docker-compose.yml, and
                          GitHub Actions workflow from memory

  DSA --- medium level    Solves LeetCode medium problems consistently in
                          under 20 minutes under timed conditions

  System Design           Completes a full system design (URL shortener,
                          Twitter, YouTube) in 45 minutes with all
                          framework steps

  AI Engineering          Explains RAG, embeddings, LangGraph, and
                          pgvector clearly and from personal
                          implementation experience
  ----------------------- -----------------------------------------------

Communication Readiness

  ----------------------- -----------------------------------------------
  **Competency**          **Ready Criteria**

  Self-introduction       Under 90 seconds, covers engineering journey,
                          current skill level, and what you are building
                          --- no filler words

  Project explanation     Both portfolio projects explained in under 5
                          minutes each --- architecture, problem solved,
                          hardest challenge

  Behavioral questions    All 15 questions answered with STAR structure,
                          under 3 minutes each, quantified outcomes where
                          possible

  Technical explanation   Can explain any architecture decision from
                          either project to a non-technical person and to
                          a senior engineer --- same information,
                          different language

  Handling pressure       Does not go silent when stuck. Narrates
                          thinking. Asks clarifying questions
                          professionally.
  ----------------------- -----------------------------------------------

Portfolio Readiness

  ----------------------- -----------------------------------------------
  **Asset**               **Ready Criteria**

  Resume                  One page, quantified bullets, both projects
                          with live URLs, only real skills listed

  GitHub                  Six pinned repos with READMEs and architecture
                          sections, green commit history, no dead
                          projects

  Portfolio Project 1     Live URL, CI/CD pipeline running, test suite,
                          architecture README, screenshots

  Portfolio Project 2     Live URL, CI/CD pipeline running, AI features
                          demonstrable, 70%+ test coverage, architecture
                          README

  LinkedIn                Complete profile, AI skills listed, both
                          projects in projects section, clear headline

  Application tracker     Spreadsheet with all applications, rounds,
                          feedback, and status for every company
  ----------------------- -----------------------------------------------

Engineering Capability Dashboard --- Post Volume 4

  --------------- ------------------- ------------------- -------------------
  **Area**        **Post Vol 3**      **Post Vol 4**      **Growth**

  System Design   30%                 80%                 Designs scalable
                                                          distributed systems
                                                          in 45 minutes

  DSA ---         55%                 80%                 Solves medium
  Competitive                                             problems reliably
                                                          under pressure

  Behavioral      20%                 85%                 STAR answers,
  Communication                                           polished delivery,
                                                          handles pressure

  AI              30%                 75%                 LangSmith tracing,
  Observability                                           evaluation runs,
                                                          cost monitoring

  Advanced RAG    70%                 85%                 Hybrid search,
                                                          re-ranking,
                                                          production
                                                          hardening

  Embeddings      65%                 80%                 Model selection,
  Engineering                                             HNSW indexes,
                                                          quantization

  Multi-Modal AI  10%                 60%                 Image + audio
                                                          pipelines
                                                          integrated into
                                                          FastAPI

  Placement       0%                  90%                 Application
  Execution                                               pipeline, interview
                                                          protocol,
                                                          negotiation

  Career Brand    70%                 90%                 Aligned resume,
                                                          GitHub, LinkedIn,
                                                          portfolio
  --------------- ------------------- ------------------- -------------------

CHAPTER 7 --- RISK ANALYSIS

Every risk identified here has already been observed in the career
trajectories of candidates with similar backgrounds. This is not
pessimism --- it is engineering. Identifying failure modes in advance is
how you prevent them.

  ----------------------- -----------------------------------------------
  **Risk**                **Mitigation**

  DSA decay during        Non-negotiable rule: two problems per day
  project-heavy periods   regardless of other commitments. Decay is
                          irreversible in the short term --- maintaining
                          momentum is cheaper than recovering it.

  Over-preparation for    Time-box Tier C preparation. One
  lower-tier interviews   company-specific research session of 45
                          minutes. Do not spend three days preparing for
                          a company you are using as practice.

  Offer pressure causing  Evaluate every offer against your written
  poor decisions          criteria before responding. Never accept on the
                          phone. 48 hours is standard and professional.

  Interview fatigue       Schedule interviews with at least 24 hours
  compounding errors      between rounds where possible. Sleep is part of
                          performance preparation, not optional recovery.

  AI-dependent portfolio  The benchmark is unchanged: could you rebuild
  explanations            this from scratch in an interview without AI?
                          If not, you cannot explain it authentically and
                          an experienced interviewer will notice.

  Phase D displacing      Phase D is scheduled in non-interview
  Phase C preparation     preparation hours only. If two tracks conflict
                          on a given day, Phase C wins. Always.

  Accepting the first     The first offer triggers the deadline for other
  offer out of anxiety    companies. Use it as leverage. A 48-hour
                          response window is standard. Use the full
                          window.

  Skipping post-round     The debrief is not optional paperwork. It is
  debriefs                how you compound learning across interviews.
                          Candidates who do not debrief repeat the same
                          errors in subsequent rounds.
  ----------------------- -----------------------------------------------

CHAPTER 8 --- VOLUME 4 SELF-AUDIT

This is a brutally honest evaluation of Volume 4, conducted to the same
standard as an engineering design review.

Is this roadmap realistic?

Yes --- for a candidate who has genuinely completed Volumes 1 through 3
to the exit criteria. The system design and DSA content in Phase A is
well-scoped for three weeks if the candidate enters with 60 problems
already solved and the two portfolio projects as talking points. The
risk is not the content volume; it is the parallel execution of Phase C
and Phase D, which requires genuine discipline in scheduling.

Is anything unnecessary?

The aptitude section in Week 6 is the most likely to be skipped because
it feels less technical. It should not be skipped. CRT and aptitude
rounds eliminate technically competent candidates at the screening
stage. The Phase D modules on multi-modal AI are genuinely optional ---
the core placement outcome does not depend on them. They are included
because they represent the direction the market is moving and because
adding one multi-modal feature to the AI Knowledge Hub is a one-week
effort that significantly differentiates the portfolio.

What is missing?

Three things are deliberately lightweight in this volume: competitive
programming beyond medium difficulty (out of scope for the stated
placement targets), distributed systems implementation (the roadmap
teaches design, not Kubernetes operations), and networking and security
engineering at depth (important for infrastructure roles, not SDE
roles). These are left to Volume 5 or to post-placement growth.

Where are you most likely to fail?

- DSA consistency: two problems per day is easy to maintain when
  motivation is high and brutally difficult to maintain during an
  eight-week placement cycle when you have live rounds and application
  management consuming your attention. Build the habit before the
  pressure arrives.

- Behavioral preparation: most technical candidates underinvest here
  because it feels less rigorous. The STAR framework feels simple.
  Executing it under pressure, in two minutes, with a quantified
  outcome, without filler words, is not simple. It requires practice.

- Post-round debriefs: the most common failure pattern is candidates who
  go through 10 interviews, make the same error in round 5 and round 9
  because they never wrote down what went wrong in round 5. The debrief
  is a non-negotiable habit.

Scores

  ----------------------- -----------------------------------------------
  **Dimension**           **Score / 10**

  Market Alignment        9 / 10 --- Placement-focused content maps
                          directly to current SDE hiring patterns in the
                          Indian tech market

  Placement Readiness     9 / 10 --- The funnel, mock interview
                          structure, and offer evaluation framework are
                          practical and actionable

  Internship Readiness    8 / 10 --- Volume 4 is placement-focused;
                          internship preparation would have been stronger
                          in Volume 3

  AI Engineering          8 / 10 --- Phase D advances the candidate
  Readiness               significantly; multi-modal and fine-tuning are
                          covered at concept depth

  Long-Term Career Growth 8 / 10 --- System design and communication
                          skills compound over years; the observability
                          and evaluation modules build the right habits

  Burnout Risk            6 / 10 --- Active placement is inherently
                          high-stress. The parallel Phase C + Phase D
                          structure requires careful scheduling

  Overall Effectiveness   9 / 10 --- A candidate who executes this volume
                          after completing Volumes 1--3 to exit criteria
                          will be well-prepared for competitive placement
  ----------------------- -----------------------------------------------

+-----------------------------------------------------------------------+
| **📌 The Honest Statement**                                           |
|                                                                       |
| This volume can be executed well or executed badly. The difference is |
| not the content --- it is the behavioral discipline: the post-round   |
| debrief filed every time, the two DSA problems done every day, the    |
| behavioral answers practised out loud rather than read silently. The  |
| roadmap is a plan. The execution is yours.                            |
+-----------------------------------------------------------------------+

CHAPTER 9 --- HOW TO USE VOLUME 4

Daily Structure --- Placement Season

  ----------------- -------------------------- --------------------------
  **Time Block**    **Activity**               **Duration**

  Morning           DSA --- two problems,      60--75 minutes
                    timed, with post-problem   
                    writeup                    

  Morning           System design review OR    45--60 minutes
                    Phase D module             
                    (alternating)              

  Active hours      Interview rounds (if       As required
                    scheduled) --- take        
                    priority over all other    
                    blocks                     

  Active hours      Applications, company      30--45 minutes
                    research, follow-up emails 

  Afternoon         Mock interview (3x per     90 minutes
                    week minimum)              

  Evening           Post-interview debrief OR  30--45 minutes
                    behavioral answer          
                    refinement                 

  Evening           Phase D study (on          60--90 minutes
                    non-interview days)        
  ----------------- -------------------------- --------------------------

Priority Rules During Phase C

  ----------------------- -----------------------------------------------
  **Situation**           **Priority Order**

  Live interview round    Interview prep → Interview → Debrief → DSA
  scheduled today         (abbreviated)

  No interviews scheduled DSA → System design or Phase D → Applications →
                          Mock interview or behavioral

  High-pressure week      Interviews → DSA maintenance (1 problem only) →
  (multiple rounds)       Rest

  Offer received          Evaluation (48 hours) → Notify other companies
                          → Negotiate or accept
  ----------------------- -----------------------------------------------

Revision Policy

+-----------------------------------------------------------------------+
| **📌 Frozen Document Policy**                                         |
|                                                                       |
| Volume 4 is frozen. Revise ONLY if:                                   |
|                                                                       |
| - Market conditions change significantly --- new assessment formats,  |
|   technology shifts                                                   |
|                                                                       |
| - Career targets change fundamentally --- pivot to a different type   |
|   of role or company tier                                             |
|                                                                       |
| Otherwise --- EXECUTE, do not redesign. Every week spent refining the |
| plan is a week not spent executing it. The gap between a good plan    |
| executed and a perfect plan designed is always won by execution.      |
+-----------------------------------------------------------------------+

CHAPTER 10 --- VOLUME 4 OUTCOMES + TRANSITION TO VOLUME 5

What You Can Say After Volume 4

  ----------------------- -----------------------------------------------
  **Before Volume 4**     **After Volume 4**

  \"I built two           \"I can design, build, deploy, explain, and
  production AI           defend these systems under interview
  projects.\"             pressure.\"

  \"I know system design  \"I can design a Twitter clone or a YouTube
  concepts.\"             system in 45 minutes with scale estimates,
                          tradeoffs, and a bottleneck resolution.\"

  \"I have been           \"I solve medium LeetCode problems under timed
  practising DSA.\"       conditions and communicate my approach
                          throughout.\"

  \"I am not sure how to  \"I have a protocol for every interview format
  handle interviews.\"    --- coding, system design, behavioral --- and I
                          follow it under pressure.\"

  \"I need to work on my  \"I deliver structured STAR answers in under
  communication.\"        three minutes with quantified outcomes.\"

  \"I have two            \"I have a managed pipeline of 30+
  applications            applications, post-round debriefs for every
  submitted.\"            interview, and an offer evaluation framework.\"
  ----------------------- -----------------------------------------------

Transition to Volume 5

Volume 5 --- the final volume --- covers the engineering journey after
placement: onboarding into your first professional role, growing from
junior engineer to someone who operates independently, building the
habits that compound over a career, contributing to open source, and
developing the engineering identity that sustains long-term growth in
the field.

Volume 5 is deliberately not written until placement is secured. Writing
career growth content before the career begins produces theory without
context. The candidate who reads Volume 5 will have worked
professionally, made real mistakes in production code, navigated team
dynamics, and read actual codebases at scale. Those experiences make
Volume 5 actionable in a way that is impossible to achieve before them.

What to expect in Volume 5: onboarding excellence, professional code
review habits, how to grow visibility within a team, open source
contribution strategy, the senior engineer skills that differentiate the
top 10% within a company (system ownership, technical writing,
mentoring), and long-term career architecture --- specialising vs
generalising, when to move companies, how to build a technical
reputation that outlasts any single employer.

+-----------------------------------------------------------------------+
| **🎓 Volume 4 Complete**                                              |
|                                                                       |
| **Volume 5 --- Professional Engineering Growth** continues this       |
| roadmap after placement.                                              |
|                                                                       |
| Onboarding excellence. Professional growth. Open source. Senior       |
| engineering. Long-term career architecture.                           |
|                                                                       |
| *When you read Volume 5, you will have earned it.*                    |
+-----------------------------------------------------------------------+

*Kotagiri Sathwik \| MLR Institute of Technology \| Volume 4 of 5*
