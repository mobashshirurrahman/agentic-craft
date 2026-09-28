"use client";
import React from "react";
import {
  Server,
  Cpu,
  Layers,
  Code2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Hospital,
  AlertTriangle,
  Zap,
} from "lucide-react";
import WorkerQueueSimulator from "./WorkerQueueSimulator";
import Module4_14Quiz from "./Module4_14Quiz";

export default function Module4_14Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              Module 4.14 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500">~18 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deploying Agents in Worker Node Architectures
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In prototype tutorials, developers run <code className="font-mono text-indigo-600 dark:text-indigo-400">agent.run(prompt)</code> directly inside a Flask or FastAPI route. In production, this causes catastrophic failure: one user asks a complex 3-minute question, the web thread freezes, the connection pool fills up, and your entire application crashes for thousands of innocent users. The solution is <strong>Worker Node Architecture</strong>.
          </p>
        </div>
      </div>

      {/* Real-World Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Hospital className="w-5 h-5 text-indigo-500" />
          1. The Hospital Emergency Room Analogy
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Think of how a world-class hospital operates:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">1. Triage Reception (Web Tier)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The receptionist takes your insurance card, stamps your patient chart, and hands you a clipboard in <strong>30 seconds</strong>. They do <em>not</em> perform brain surgery at the front desk!
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">2. Patient Board (Message Queue)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your chart enters the digital queue (Redis). If 50 patients arrive at once due to a highway crash, the queue holds them safely without the building falling down.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">3. Specialized Surgeons (Worker Nodes)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Independent surgeon teams pull patients from the board one by one, take 2 hours in a dedicated operating room, and write results back to the hospital database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Architecture: Web vs Broker vs Worker */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" />
          2. The Decoupled 3-Tier Production Architecture
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {["Component", "Primary Responsibility", "Tech Stack Options", "Scaling Metric"].map((h) => (
                  <th key={h} className="p-3 font-mono font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Web Ingestion Tier", "Accept HTTP requests, validate auth, return 202 Accepted in <50ms", "FastAPI, Express.js, Next.js API Routes", "Scale on HTTP Request Rate (RPS)"],
                ["Message Broker", "Reliable FIFO queue, buffer bursty traffic, visibility timeouts", "Redis (Celery/RQ), RabbitMQ, AWS SQS", "Scale on Queue Depth & Memory"],
                ["Worker Node Fleet", "Pull jobs, execute multi-step LLM calls, run code sandboxes", "Celery, RQ (Redis Queue), Temporal, BullMQ", "Scale on Queue Latency & Worker CPU"],
                ["State / Result Store", "Store agent conversation checkpoints, intermediate steps, final outputs", "Redis (Hot), PostgreSQL (Warm), S3 (Artifacts)", "Scale on Database IOPS & Storage"],
              ].map(([comp, resp, tech, metric], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40">
                    {comp}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {resp}
                  </td>
                  <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">
                    {tech}
                  </td>
                  <td className="p-3 font-mono text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">
                    {metric}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Production Celery Worker Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          3. Production Celery Task Implementation (Python + Redis)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from celery import Celery
import redis, json, time
from my_agent import LangGraphResearchAgent

# Initialize Celery with Redis broker and result backend
celery_app = Celery(
    "agent_worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

redis_client = redis.Redis(host="localhost", port=6379, db=2)

@celery_app.task(
    bind=True,
    max_retries=3,
    default_retry_delay=10,  # Exponential backoff on transient LLM 429/500 errors
    time_limit=300,          # Hard task timeout: 5 minutes max
    soft_time_limit=270      # Graceful shutdown warning at 4.5 minutes
)
def execute_agent_job(self, task_id: str, user_prompt: str, user_id: str):
    try:
        # 1. Update State to RUNNING
        redis_client.set(f"task:{task_id}", json.dumps({
            "status": "RUNNING", "progress": 10, "current_step": "Initializing plan"
        }))
        
        # 2. Instantiate and run LangGraph Agent
        agent = LangGraphResearchAgent()
        
        def step_callback(step_name: str, step_pct: int):
            # Stream intermediate step progress to Redis
            redis_client.set(f"task:{task_id}", json.dumps({
                "status": "RUNNING", "progress": step_pct, "current_step": step_name
            }))
            
        final_result = agent.invoke(user_prompt, callback=step_callback)
        
        # 3. Store Final Result
        redis_client.set(f"task:{task_id}", json.dumps({
            "status": "COMPLETED", "progress": 100, "result": final_result
        }))
        return final_result
        
    except Exception as exc:
        # Retry on transient API errors with exponential backoff
        raise self.retry(exc=exc)`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            4. Interactive Studio: Worker Queue Simulator
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Watch FastAPI intake requests, enqueue them into Redis, and distribute jobs across independent worker processes. Test auto-scaling and worker crash recovery in real-time!
          </p>
        </div>
        <WorkerQueueSimulator />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-indigo-300 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-indigo-500" />
          💡 Interview Gold: The &ldquo;Why Decouple Web vs. Worker?&rdquo; Question
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Question:</strong> &ldquo;A junior engineer wrote an endpoint in FastAPI that awaits a 45-second LangGraph workflow before returning. Why is this forbidden in production?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-indigo-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Thread Pool Exhaustion:</strong> Web workers (Gunicorn / Uvicorn) have fixed worker concurrency (e.g. 4 workers with 10 threads = 40 concurrent slots). Just 41 concurrent long-running agent requests will freeze all incoming health checks and login endpoints.</p>
            <p>2. <strong>Load Balancer Timeouts:</strong> Cloudflare (100s), AWS ALB (60s default), and Kubernetes ingress drop synchronous idle connections automatically.</p>
            <p>3. <strong>Independent Auto-Scaling:</strong> Web tier scales on Request Count (CPU light, high throughput). Worker tier scales on <em>Queue Depth and Job Latency</em> (I/O heavy, long residency). Coupling them prevents cost-effective auto-scaling.</p>
            <p>4. <strong>Crash Resilience:</strong> If a Python worker node runs out of memory (OOM) during a huge document parse, only that isolated worker dies. The message queue requeues the job to another worker, and the web server never hiccups.</p>
          </div>
        </div>
      </section>

      {/* Mastery Quiz */}
      <section className="space-y-4">
        <Module4_14Quiz />
      </section>
    </div>
  );
}
