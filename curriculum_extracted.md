## AI_Agents_Slides_Level1.pdf (Total: 195 slides, 13 modules)

### Module 1.1: AI Agents and their Core (Pages 1-15, 15 slides)
- Page 2: What are AI Agents?
- Page 3: What are AI Agents?
- Page 4: Core Components of an AI Agent
- Page 5: How Components Work Together
- Page 6: Agent Architecture
- Page 7: Examples of Agentic Behavior
- Page 8: Agentic Systems You May Have Used
- Page 9: Common Pitfall: Is this an Agent?
- Page 10: What is reasoning?
- Page 11: Core Reasoning Capabilities
- Page 12: Core Reasoning Capabilities
- Page 13: Core Reasoning Capabilities
- Page 14: Limitations
- Page 15: Modern LLM Reasoning
### Module 1.2: Prompt Engineering, Engineering, Context Engineering, (Pages 16-30, 15 slides)
- Page 17: The Evolution of LLM Applications
- Page 18: Prompt Engineering
- Page 19: Chain of Thought Prompting
- Page 20: Chains / Prompt Chaining
- Page 21: What makes AI Agents Different?
- Page 22: Comparing the Approaches
- Page 23: When to Use Each Approach
- Page 24: Common Pitfall: Jumping Straight to Agents
- Page 25: Example: Content Writing
- Page 26: Example: Content Writing
- Page 27: Example: Content Writing
- Page 28: Context Engineering for AI Agents
- Page 29: Context Engineering Example
- Page 30: Why Context Engineering Matters
### Module 1.3: Tackling Complex Tasks (Pages 31-45, 15 slides)
- Page 32: What is Task Decomposition?
- Page 33: Task Decomposition: Example
- Page 34: Static vs Dynamic Decomposition
- Page 35: Let’s Compare the Two
- Page 36: ● Once a task is decomposed into subtasks, we need to decide how to execute them.
- Page 37: 1. Sequential Execution
- Page 38: ● In Sequential Execution, subtasks are executed one after another in a fixed order,
- Page 39: When to Use
- Page 40: ● Multiple subtasks executed simultaneously without dependencies, then results are combined.
- Page 41: Parallel Execution
- Page 42: ● Tasks organized in multiple levels, where high-level tasks break into subtasks, combining
- Page 43: Hierarchical Execution
- Page 44: ● Clear Boundaries
- Page 45: ● Breaking "write an email" into 12 subtasks creates unnecessary
### Module 1.4: The Spectrum of Autonomy in AI (Pages 46-57, 12 slides)
- Page 47: Understanding Autonomy in AI Agents
- Page 48: “The question isn't agents vs.
- Page 49: The Agentic Spectrum
- Page 50: Agentic Workflows
- Page 51: Agentic Workflows: Visualization
- Page 52: Autonomous Agents
- Page 53: Autonomous Agents: Visualization
- Page 54: Choosing the Right Level of Autonomy
- Page 55: Case Study: Agentic Workflows
- Page 56: Claude Code
- Page 57: Graduated Autonomy
### Module 1.5: How AI Agents Use Tools (Pages 58-65, 8 slides)
- Page 59: ● Definition
- Page 60: ● Write Actions
- Page 61: ● Information Retrieval
- Page 62: Tool Calling Process
- Page 63: Tool Definition and Registration
- Page 64: Best Practices for Tool Use
- Page 65: Model Context Protocol (MCP)
### Module 1.6: Fundamentals of the Agentic Loop (Pages 66-74, 9 slides)
- Page 67: The Agentic Loop
- Page 68: The Agentic Loop
- Page 69: Phase 1: Perception
- Page 70: Phase 2: Reasoning
- Page 71: Phase 3: Action
- Page 72: Phase 4: Observation
- Page 73: Phase 5: Iteration
- Page 74: What Makes the Agentic Loop Powerful
### Module 1.7: Common Agentic Design Patterns (Pages 75-98, 24 slides)
- Page 76: ● What is ReAct?
- Page 77: The ReAct Workflow
- Page 78: ● Task Example
- Page 79: Example of ReAct
- Page 80: ● Improved Performance in Decision-Making Tasks
- Page 81: Limitations of ReAct
- Page 82: Agentic Design Patterns
- Page 83: ● What is Planning in Agentic Systems?
- Page 84: 84
- Page 85: 85
- Page 86: 86
- Page 87: 87
- Page 88: ● Map-Reduce Pattern
- Page 89: 89
- Page 90: ● Send API:
- Page 91: ● Multi-Agent Architectures
- Page 92: 92
- Page 93: ● Importance of Human-in-the-Loop
- Page 94: ● Agent pauses for human approval before executing specific tools.
- Page 95: ● Agent pauses to request additional details from humans.
- Page 96: ● Allows humans to review and edit previous checkpoints.
- Page 97: ● Human inspects and approves tool calls before execution.
- Page 98: 98
### Module 1.8: Short-Term and Long-Term Agent (Pages 99-110, 12 slides)
- Page 100: Without Memory, Agents…
- Page 101: With Memory, Agents can…
- Page 102: ● With Memory
- Page 103: Short-Term Memory
- Page 104: Short-Term Memory—What to Store
- Page 105: Long-term Memory
- Page 106: ● Semantic Memory: Facts and Knowledge
- Page 107: Long-Term Memory—Writing Strategies
- Page 108: Choose a hybrid approach
- Page 109: Long-Term Memory—Storage Options
- Page 110: ● Reading (Context Preparation):
### Module 1.9: Comparing Single-Agent and (Pages 111-130, 20 slides)
- Page 112: Agent Architectures
- Page 113: Single Agent Architectures
- Page 114: Single Agent Architectures: Pros and Cons
- Page 115: ● Definition
- Page 116: Multi-Agent Architectures: Pros and Cons
- Page 117: Comparison Between Architectures
- Page 118: Choosing Between Architectures
- Page 119: Summary
- Page 120: ● Three Main Architecture Patterns
- Page 121: ● How it Works
- Page 122: ● When to Use
- Page 123: ● Main orchestrator decomposes tasks and spawns specialized subagents (Explore,
- Page 124: Sequential Architecture
- Page 125: ● When to Use
- Page 126: ● Fixed Sequential Pipeline (Clarify → Plan → Research → Synthesize)
- Page 127: Network Architecture (Graph-based)
- Page 128: ● When to Use
- Page 129: ● Decentralized Handoff Network (Triage → Sales/Refund Agents)
- Page 130: Multi-agent systems are appealing but add coordination
### Module 1.10: Enhancing Agents with (Pages 131-141, 11 slides)
- Page 132: ● Definition
- Page 133: Simple Example
- Page 134: RAG: Ingestion Phase
- Page 135: RAG: Inference Phase
- Page 136: ● Need Access to Specific
- Page 137: RAG as a Node in Agentic Workflows
- Page 138: RAG as a Node in Agentic Workflows
- Page 139: ● Dynamic, agent-controlled retrieval based on reasoning
- Page 140: RAG as a Tool for Autonomous Agents
- Page 141: Common Pitfall: "RAG Solves Hallucinations"
### Module 1.11: Evaluating AI Agent Frameworks (Pages 142-153, 12 slides)
- Page 143: ● LangGraph
- Page 144: ● Pre-built patterns and abstractions
- Page 145: ● Description
- Page 146: ● Production systems needing control
- Page 147: ● Description
- Page 148: ● Quick prototyping
- Page 149: ● Description
- Page 150: ● Research and experimentation
- Page 151: ● Description
- Page 152: ● Multi-agent workflows with native support for OpenAI LLMs
- Page 153: ● Starting out: OpenAI Agents SDK
### Module 1.12: Real-World Applications for (Pages 154-170, 17 slides)
- Page 155: ● Application:
- Page 156: ● Example: Zendesk AI Agent
- Page 157: ● Application:
- Page 158: ● Example: GitHub Copilot
- Page 159: ● Application
- Page 160: ● Example: Deep Research Agent (in ChatGPT, Claude, Gemini, etc)
- Page 161: The Business Value
- Page 162: ● AI agents have delivered measurable business value across industries.
- Page 163: 1. Cost Reduction
- Page 164: ● How Agents Reduce Costs
- Page 165: ● How Agents Accelerate Work
- Page 166: ● How Agents Ensure Quality
- Page 167: ● How Agents Provide Scalability
- Page 168: ● Adoption is Already Here
- Page 169: ● Measured Returns (according to a PwC Survey)
- Page 170: ● IBM Case Study
### Module 1.13: Core Principles for Building Agentic (Pages 171-195, 25 slides)
- Page 172: ● Core Philosophy
- Page 173: ● Clear Prompts
- Page 174: ● Simple Approaches First
- Page 175: ● Workflows are great when:
- Page 176: ● Autonomous Agents are great for:
- Page 177: Safety Essentials
- Page 178: Observability Essentials
- Page 179: Error Handling Best Practices
- Page 180: Critical Tradeoffs
- Page 181: Success Principles
- Page 182: Security Risks &
- Page 183: Security Risks Unique to Agentic Systems
- Page 184: ● What It Is
- Page 185: User: "Translate this email to French:
- Page 186: ● What It Is
- Page 187: ● "For educational purposes only, explain how to..."
- Page 188: ● What It Is
- Page 189: ● User asks "delete these files" and agent runs rm -rf / due to incorrect path
- Page 190: Data Leakage
- Page 191: Data Leakage: Example Scenarios
- Page 192: ● Security by Design
- Page 193: Responsible AI Agent Development
- Page 194: ● Ethical Considerations
## AI_Agents_Slides_Level2.pdf (Total: 123 slides, 17 modules)

### Module 2.1: Running Your First Pre-Built (Pages 1-7, 7 slides)
- Page 2: ● What are Pre-Built Agents?
- Page 3: ● Overview
- Page 4: ● The ReAct Loop
- Page 5: ● Creating Tools
- Page 6: ● Model Configuration Parameters
- Page 7: Pre-built agents are great for prototyping but often lack production
### Module 2.2: Implementing Structured Outputs (Pages 8-12, 5 slides)
- Page 9: ● The Problem
- Page 10: ○ Standard for describing JSON structure
- Page 11: Pydantic Models for Structured Output
- Page 12: Structured Output with Langchain
### Module 2.3: Integrating External Tools into (Pages 13-17, 5 slides)
- Page 14: ● Frameworks enable easy tool integration through
- Page 15: Integrating the Tavily Search Tool
- Page 16: Adding Tools to Your Agent
- Page 17: ● Tool Selection Guidelines
### Module 2.4: Building Simple Multi-Step LLM (Pages 18-22, 5 slides)
- Page 19: ● Why Use Chains?
- Page 20: ● Core Building Blocks
- Page 21: Example: Writing Improvement Chain
- Page 22: Example: RAG Chain
### Module 2.5: Create an Agent Class from Scratch (Pages 23-27, 5 slides)
- Page 24: Revisiting the ReAct Framework
- Page 25: Crafting Effective Prompts
- Page 26: Implementation Plan
- Page 27: Implementing the Agent Without Loops
### Module 2.6: Implementing Loops for Multi-Step (Pages 28-29, 2 slides)
- Page 29: Enhancing the Agent with Cycles
### Module 2.7: Understanding Nodes and Edges in (Pages 30-39, 10 slides)
- Page 31: ● Graph-Based Modelling in LangGraph
- Page 32: ● Nodes are functions that encode the logic of an agent.
- Page 33: ● Nodes are added to the graph using the `add_node` method.
- Page 34: ● START Node
- Page 35: Edges in LangGraph
- Page 36: Types of Edges
- Page 37: Normal Edges
- Page 38: Conditional Edges
- Page 39: Conditional Entry Point
### Module 2.8: Defining and Managing State in (Pages 40-45, 6 slides)
- Page 41: ● What is State?
- Page 42: Example:
- Page 43: ● State Schema
- Page 44: Default Reducer: Updates
- Page 45: Annotated Reducer Example:
### Module 2.9: Debugging Agent Executions (Pages 46-55, 10 slides)
- Page 47: ● The Challenge: "What Went Wrong?"
- Page 48: ● LLM Interactions
- Page 49: Sample Pseudocode for Logging
- Page 50: ● Why Structured Logging?
- Page 51: Structured Logging in Code
- Page 52: ● What Platforms Provide
- Page 53: ● Start Logging Early
- Page 54: ● Log at Appropriate Levels
- Page 55: Introduction to LangSmith
### Module 2.10: Troubleshooting Common LLM API (Pages 56-68, 13 slides)
- Page 57: ● Authentication Errors (401, 403)
- Page 58: ● Missing or invalid API keys
- Page 59: Quick Validation and Detection
- Page 60: ● Common Types of Rate Limits when using LLMS
- Page 61: Mitigation: Exponential Backoff
- Page 62: Mitigation: Using Retry Libraries
- Page 63: ● Implement request queuing to smooth out bursts
- Page 64: ● Common Types of Availability Errors
- Page 65: ● Implement circuit breakers for repeated failures
- Page 66: Example: Fallback Strategy
- Page 67: Example: Monitor Service Status
- Page 68: ● Common Network Issues
### Module 2.11: Building a Chatbot Agent in (Pages 69-71, 3 slides)
- Page 70: Building a Chatbot Agent in LangGraph
- Page 71: Building a Chatbot Agent in LangGraph
### Module 2.12: Implementing Streaming Output (Pages 72-76, 5 slides)
- Page 73: ● What is Streaming?
- Page 74: Streaming in LangChain
- Page 75: ● Stream Modes
- Page 76: Streaming in LangGraph
### Module 2.13: Configuring Async and Sync (Pages 77-85, 9 slides)
- Page 78: ● Asynchronous Execution
- Page 79: ● LLM Applications are I/O-Bound
- Page 80: ● Consider an I/O-bound operation taking 2 seconds per request
- Page 81: ● Async Method Naming
- Page 82: ● The Challenge
- Page 83: Wrapping Sync Functions
- Page 84: Running Async from Sync (if needed!)
- Page 85: ● Use Async When
### Module 2.14: Creating Reusable Dynamic (Pages 86-94, 9 slides)
- Page 87: ● Benefits of Templates
- Page 88: ● Problems They Solve
- Page 89: ● Multi-user applications
- Page 90: ● Designed for single message interaction with LLMs
- Page 91: Prompt Template Example
- Page 92: ● Designed for multi-message interactions with LLMs
- Page 93: Chat Prompt Template Example
- Page 94: Prompt templates change frequently during development.
### Module 2.17: Implementing Input Validation (Pages 95-105, 11 slides)
- Page 96: ● Definition
- Page 97: ● Types of Guardrails
- Page 98: ● Format and structure (length, encoding, data types)
- Page 99: ● Rule-Based: Pattern matching, regex, length checks
- Page 100: ● LLM-as-Judge Pattern
- Page 101: ● Validation as Graph Nodes
- Page 102: ● Layer 1: Fast rule-based checks (regex, length, format)
- Page 103: ● Combine deterministic + probabilistic methods
- Page 104: ● Pattern matching for common injection phrases
- Page 105: Prompt Injection Defense
### Module 2.16: Writing Test Cases for Agent (Pages 106-114, 9 slides)
- Page 107: ● A test case specifies: given input → expected output
- Page 108: ● Traditional software
- Page 109: ● Deterministic testing
- Page 110: ● The Three Parts (Arrange-Act-Assert)
- Page 111: Example: Testing a Tool
- Page 112: ● Was any tool called by the agent?
- Page 113: ● Characteristics of Good Tests
- Page 114: ● Testing With Perfect Inputs Only
### Module 2.17: Measuring Agent Performance (Pages 115-123, 9 slides)
- Page 116: ● Quantify agent effectiveness
- Page 117: ● Latency: Response time
- Page 118: ● What to Measure
- Page 119: ● Token Tracking
- Page 120: ● Total requests: Overall volume
- Page 121: ● Accuracy: Percentage of correct answers
- Page 122: ● Production Metrics Framework Components
## AI_Agents_Slides_Level3.pdf (Total: 88 slides, 12 modules)

### Module 3.1: Implementing Conditional Edges (Pages 1-7, 7 slides)
- Page 2: ● What are Conditional Edges?
- Page 3: ● Three Core Components
- Page 4: Basic Structure
- Page 5: Creating Routing Functions
- Page 6: Common Patterns with Conditional Edges
- Page 7: ● Routing Function Design
### Module 3.2: Designing Custom Workflows (Pages 8-16, 9 slides)
- Page 9: ● Workflow Composition
- Page 10: ● When to Use
- Page 11: Linear Workflow Pattern: Example Code
- Page 12: ● When to Use
- Page 13: Cyclic Workflow Pattern: Example Code
- Page 14: ● When to Use
- Page 15: Branching: Example Code for Routing
- Page 16: ● Start with Workflow Map
### Module 3.3: Debugging Agents by Analyzing (Pages 17-19, 3 slides)
- Page 18: Agent behavior emerges from state transformations, so real-time visibility into
- Page 19: ● Different perspectives on execution:
### Module 3.4: Enabling Tool Interoperability with (Pages 20-32, 13 slides)
- Page 21: The Integration Problem
- Page 22: What is MCP?
- Page 23: From MxN to M+N Integrations
- Page 24: Core Components of MCP
- Page 25: MCP Architecture
- Page 26: What MCP Servers Expose
- Page 27: Example MCP Server
- Page 28: What MCP Clients Provide
- Page 29: Transport Mechanisms
- Page 30: The MCP Ecosystem
- Page 31: When to Use MCP
- Page 32: Common Pitfall: Confusing MCP with Direct Tool Calling
### Module 3.5: Building a Basic RAG System for (Pages 33-43, 11 slides)
- Page 34: Two Phase Architecture for Retrieval
- Page 35: Phase 1: Indexing Overview
- Page 36: ● Happens at runtime for each user query
- Page 37: Key RAG Components
- Page 38: ● Step 1: Loading
- Page 39: ● Step 3: Generate Embeddings
- Page 40: ● Step 1: Embed the Query
- Page 41: ● Step 3: Augment LLM Context
- Page 42: ● RAG with Nodes and Edges
- Page 43: ● Engineers often pick arbitrary chunk sizes (500 tokens, 1000 tokens) without
### Module 3.6: Constructing Plan-and-Execute (Pages 44-47, 4 slides)
- Page 45: ● Objective
- Page 46: ● Comparison with ReAct:
- Page 47: Plan-and-Execute
### Module 3.7: Implementing Deep Planning (Pages 48-57, 10 slides)
- Page 49: ● Agents You've Seen Till Now:
- Page 50: ● Detailed System Prompts
- Page 51: ● Shallow Agent Prompt
- Page 52: ● Tool Selection Logic: "When searching code: try function definitions first,
- Page 53: ● Purpose: Context engineering to maintain focus
- Page 54: ● Task decomposition: Break complex work into specialized
- Page 55: ● How File System is Used
- Page 56: Shallow Agents vs Deep Agents
- Page 57: Deep agents shine on complex, multi-step research or coding tasks.
### Module 3.8: Adding Human-in-the-Loop (Pages 58-63, 6 slides)
- Page 59: Human Oversight in Agentic Systems
- Page 60: Human Oversight in Agentic Systems
- Page 61: Approval
- Page 62: Edit Agent Actions
- Page 63: Wait for Input
### Module 3.9: Implementing the Reflection (Pages 64-67, 4 slides)
- Page 65: ● Objective
- Page 66: Reflection for a Report Writing Agentic System
- Page 67: ● Without Reflection:
### Module 3.10: Managing Conversation (Pages 68-72, 5 slides)
- Page 69: ● Allows thread level persistence for multi-turn conversations or interactions,
- Page 70: ● The Persistence Layer (Checkpointer)
- Page 71: ● Thread ID as Conversation Identifier
- Page 72: ● Load: Agent invoked with thread ID → retrieve latest state
### Module 3.11: Implementing Semantic Memory (Pages 73-80, 8 slides)
- Page 74: ● Core Concept
- Page 75: ● Storage Layer
- Page 76: ● Storage Workflow
- Page 77: ● Namespace Organization
- Page 78: ● Retrieval Phase
- Page 79: ● Design Decisions
- Page 80: Semantic memory grows forever, retrieval slows down, and ancient
### Module 3.12: Deploying Agents with FastAPI (Pages 81-88, 8 slides)
- Page 82: ● Local Development is Great For
- Page 83: ● FastAPI is a modern Python web framework ideal for AI applications.
- Page 84: ● App Instance: The FastAPI application object
- Page 85: ● The Pattern
- Page 86: ● Development vs Production
- Page 87: Basic Deployment Architecture
## AI_Agents_Slides_Level4.pdf (Total: 146 slides, 17 modules)

### Module 4.1: Building Robust Tools with (Pages 1-8, 8 slides)
- Page 2: ● Production tools require comprehensive validation, error handling,
- Page 3: ● Define explicit schemas for all tool parameters using type systems
- Page 4: ● Classify errors: validation errors, network errors, auth errors,
- Page 5: ● Implement retry logic for network and external service failures
- Page 6: ● Log tool invocations with relevant parameters (sanitize sensitive
- Page 7: ● Validate and sanitize all inputs to prevent injection attacks
- Page 8: ● Optimize for latency: minimize network calls, use caching
### Module 4.2: Building Multi-Agent (Pages 9-13, 5 slides)
- Page 10: ● Objective
- Page 11: ● Challenges with Single Agents
- Page 12: Benefits of Multi-Agent Collaboration
- Page 13: Multi-Agent System: Financial Analysis
### Module 4.3: Building Multi-Agent Swarm (Pages 14-24, 11 slides)
- Page 15: ● Decentralized Agent Collaboration
- Page 16: Swarm vs Supervisor Architecture
- Page 17: ● Handoff Mechanisms
- Page 18: ● Agents equipped with handoff tools to transfer control
- Page 19: ● Each agent has a specific domain of expertise
- Page 20: ● Forms a graph of interconnected specialists
- Page 21: ● Defining Agent Roles
- Page 22: 1. User query arrives at default agent
- Page 23: 1. Query: "I need a refund for order #12345, and can you help me find a
- Page 24: ● No bottleneck from central coordinator
### Module 4.4: Structuring Workflows with (Pages 25-31, 7 slides)
- Page 26: ● Definition
- Page 27: ● Core Idea
- Page 28: ● The State Contract Concept
- Page 29: ● From Simple to Complex
- Page 30: ● Integration Patterns
- Page 31: ● When to Use Subgraphs
### Module 4.5: Implementing Parallel Task (Pages 32-37, 6 slides)
- Page 33: ● Dynamic Paralellism
- Page 34: ● Router node returns list of Send objects, each dispatching to a
- Page 35: ● Use asyncio.gather() within a single node to run operations
- Page 36: ● ThreadPoolExecutor for I/O-bound, ProcessPoolExecutor for
- Page 37: ● Your approach will depend on your use case and there are multiple
### Module 4.6: Comparing Sequential and (Pages 38-44, 7 slides)
- Page 39: ● First Step: Use an LLM to analyze the query and determine if
- Page 40: Query Analysis For Strategy Selection
- Page 41: ● When to Use: Sub-queries depend on previous results
- Page 42: Sequential Execution Example
- Page 43: ● When to Use: Sub-queries are independent from each other
- Page 44: Parallel Execution
### Module 4.7: Developing Error Handling and (Pages 45-53, 9 slides)
- Page 46: ● Transient: Temporary network issues, rate limits (recoverable)
- Page 47: ● Detection → Decision → Action
- Page 48: Error Recovery Pathways
- Page 49: Workflow Level Fallback Strategy
- Page 50: Circuit Breakers
- Page 51: Circuit Breakers in Workflows
- Page 52: Managing Error States
- Page 53: Common Pitfall: Silent Error Swallowing
### Module 4.8: Using Time Travel for State (Pages 54-60, 7 slides)
- Page 55: What is Time Travel?
- Page 56: ● State History
- Page 57: ● Step 1: Run with Checkpointing Enabled
- Page 58: ● Step 3: Update State (Optional)
- Page 59: ● Interactive Debugging
- Page 60: Use Cases
### Module 4.9: Optimizing Prompts and Tool (Pages 61-71, 11 slides)
- Page 62: ● Prompts directly influence agent behavior
- Page 63: ● Avoid extremes: too specific (brittle) vs. too vague (ineffective)
- Page 64: ● Explicit Guidelines for Tool Selection
- Page 65: Prompt Optimization for Tool Selection
- Page 66: ● Understanding Reasoning Models
- Page 67: ● Standard Models
- Page 68: ● When to Use Few-Shot Examples
- Page 69: ● Recent research suggests that reasoning models (GPT-5, Claude
- Page 70: ● Prompt optimization is ongoing, not one-time
- Page 71: ● A common pattern: developer tweaks prompt, runs 2-3 test queries,
### Module 4.10: Managing Context Windows (Pages 72-83, 12 slides)
- Page 73: ● The maximum amount of text (in tokens) an LLM can
- Page 74: ● Hard limit: Exceeding it causes errors or automatic truncation
- Page 75: ● More information means more "distractions"
- Page 76: ● Customer has 40-turn conversation about returning a laptop
- Page 77: ● Five Main Strategies
- Page 78: ● How It Works
- Page 79: ● How It Works
- Page 80: ● How It Works
- Page 81: ● How It Works
- Page 82: ● How It Work:
- Page 83: Common Pitfall: Trusting the Large Context Window
### Module 4.11: Testing and Evaluating AI (Pages 84-97, 14 slides)
- Page 85: ● According to latest research:
- Page 86: ● Evaluation-Driven Development
- Page 87: ● Pre-Deployment Evaluation
- Page 88: ● Task Completion: Did agent achieve the goal?
- Page 89: ● Planning Effectiveness: Did agent explore appropriately?
- Page 90: ● Latency: Response time within acceptable bounds
- Page 91: Evaluation Methods for Agent Testing
- Page 92: ● Core Concept
- Page 93: ● Start small (10-20 cases), grow incrementally
- Page 94: ● Use specialized agent to evaluate another agent
- Page 95: ● Clear evaluation rubrics in system prompt
- Page 96: Agent-as-a-Judge Limitations
- Page 97: ● LLM-as-Judge Without Calibration
### Module 4.12: Fine-Tuning Agents with (Pages 98-105, 8 slides)
- Page 99: ● Feedback Signals to Collect
- Page 100: ● Review low-rated interactions with user comments
- Page 101: LLM-Assisted Improvement Generation
- Page 102: A/B Testing Workflow
- Page 103: ● Prompt clarity → Refine instructions/add examples
- Page 104: ● Distinguish prompt fixes (fast) vs. architecture changes (slow)
- Page 105: ● Version every change: Tag each prompt/config version in monitoring to
### Module 4.13: Designing APIs for Long-Running (Pages 106-113, 8 slides)
- Page 107: ● The Problem with Synchronous HTTP
- Page 108: ● Polling: Client periodically checks status endpoint
- Page 109: ● Submit Task → Get Task ID → Poll for Status
- Page 110: ● Server Side
- Page 111: ● What is a Webhook?
- Page 112: Persistent Connection with Server-Sent Events (SSE):
- Page 113: Design Considerations
### Module 4.14: Deploying Agents in Worker (Pages 114-119, 6 slides)
- Page 115: ● What is Worker Node Architecture?
- Page 116: ● The Problem with Running Agents in Web Requests
- Page 117: FastAPI + Worker Integration Sample
- Page 118: ● Worker Responsibilities
- Page 119: ● Celery: Uses Redis, RabbitMQ, or SQS; best for production systems and
### Module 4.15: Scaling Agents for Production (Pages 120-130, 11 slides)
- Page 121: ● Horizontal Scaling: Most components can be scaled horizontally since
- Page 122: ● Vertical Scaling (Scale Up)
- Page 123: ● The Nature of Agent Workloads
- Page 124: ● Statelessness: Workers store no data locally; they fetch context from a DB, act,
- Page 125: ● Mechanism: A reverse proxy that distributes incoming requests across a pool of
- Page 126: ● Mechanism: An asynchronous buffer where tasks wait until a worker is available
- Page 127: ● Hot Storage (Redis): Ephemeral context/history. Cluster mode required for horizontal
- Page 128: ● The Risk: LLM costs scale linearly; one runaway loop can drain budgets instantly.
- Page 129: Example: Scaled Architecture
- Page 130: ● Assume Failure: LLMs time out, tools break. Design for automatic retries.
### Module 4.16: Implementing Cost Optimization (Pages 131-140, 10 slides)
- Page 132: Understanding Cost Drivers in AI Agents
- Page 133: Cost Impact Factors
- Page 134: Strategy: Match Model Capability to Task Complexity
- Page 135: Strategy: Reuse Responses for Similar Queries
- Page 136: Cost-Benefit Analysis
- Page 137: Strategy: Reuse Responses for Similar Queries
- Page 138: Tool Result Reuse
- Page 139: Strategy: Minimize Token Usage Without Losing Quality
- Page 140: Semantic cache hit rates look great until you realize users are getting
### Module 4.17: Building Deep Agents for Complex (Pages 141-146, 6 slides)
- Page 142: ● Pattern 1: Functional Specialization
- Page 143: ● Used by Claude Code, LangGraph Deep Agents, and production
- Page 144: ● Orchestrator / Supervisor
- Page 145: Good Boundaries