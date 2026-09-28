import json
import re

with open('full_course_outline.json', 'r', encoding='utf-8') as f:
    levels_data = json.load(f)

# Module metadata enhancements (description, estimated minutes, badges/tags)
# We can create rich tags based on module topics
def get_tags_for_module(num, title):
    t_lower = title.lower()
    tags = []
    if 'prompt' in t_lower: tags.append('Prompting')
    if 'tool' in t_lower or 'mcp' in t_lower: tags.append('Tools & MCP')
    if 'langgraph' in t_lower or 'node' in t_lower or 'edge' in t_lower: tags.append('LangGraph')
    if 'memory' in t_lower: tags.append('Memory')
    if 'rag' in t_lower: tags.append('RAG')
    if 'multi-agent' in t_lower or 'swarm' in t_lower or 'supervisor' in t_lower: tags.append('Multi-Agent')
    if 'pydantic' in t_lower or 'json' in t_lower or 'structured' in t_lower: tags.append('Structured Output')
    if 'loop' in t_lower or 'react' in t_lower: tags.append('Agentic Loop')
    if 'fastapi' in t_lower or 'deploy' in t_lower or 'api' in t_lower: tags.append('Production API')
    if 'evaluat' in t_lower or 'test' in t_lower or 'cost' in t_lower: tags.append('Evals & Cost')
    if 'plan' in t_lower: tags.append('Planning')
    if not tags: tags.append('Core Architecture')
    return tags[:3]

ts_code = [
    "// Strictly mapped to pdf_ref/ (552 slides across 4 levels and 59 modules)",
    "",
    "export interface SlideSummary {",
    "  page: number;",
    "  heading: string;",
    "  bullets: string[];",
    "}",
    "",
    "export interface CourseModule {",
    "  id: string; // e.g. 'module-1-1'",
    "  number: string; // e.g. '1.1'",
    "  title: string;",
    "  levelId: string; // e.g. 'level-1'",
    "  levelNumber: number;",
    "  startPage: number;",
    "  endPage: number;",
    "  slideCount: number;",
    "  estimatedMinutes: number;",
    "  tags: string[];",
    "  summary: string;",
    "  keyTopics: string[];",
    "  slides: SlideSummary[];",
    "}",
    "",
    "export interface CourseLevel {",
    "  id: string; // 'level-1'",
    "  levelNumber: number;",
    "  title: string;",
    "  subtitle: string;",
    "  description: string;",
    "  pdfSource: string;",
    "  totalSlides: number;",
    "  modulesCount: number;",
    "  color: {",
    "    primary: string;",
    "    border: string;",
    "    bg: string;",
    "    badge: string;",
    "    gradient: string;",
    "  };",
    "  modules: CourseModule[];",
    "}",
    "",
    "export const COURSE_LEVELS: CourseLevel[] = ["
]

level_colors = [
    {
        "primary": "text-emerald-400",
        "border": "border-emerald-500/30",
        "bg": "bg-emerald-500/10",
        "badge": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        "gradient": "from-emerald-500/20 via-teal-500/10 to-transparent"
    },
    {
        "primary": "text-sky-400",
        "border": "border-sky-500/30",
        "bg": "bg-sky-500/10",
        "badge": "bg-sky-500/20 text-sky-300 border-sky-500/30",
        "gradient": "from-sky-500/20 via-blue-500/10 to-transparent"
    },
    {
        "primary": "text-violet-400",
        "border": "border-violet-500/30",
        "bg": "bg-violet-500/10",
        "badge": "bg-violet-500/20 text-violet-300 border-violet-500/30",
        "gradient": "from-violet-500/20 via-purple-500/10 to-transparent"
    },
    {
        "primary": "text-amber-400",
        "border": "border-amber-500/30",
        "bg": "bg-amber-500/10",
        "badge": "bg-amber-500/20 text-amber-300 border-amber-500/30",
        "gradient": "from-amber-500/20 via-orange-500/10 to-transparent"
    }
]

level_subtitles = [
    "Foundations & Architecture",
    "Core Implementation & Workflows",
    "Advanced Patterns & System Design",
    "Production, Scaling & Optimization"
]

level_descriptions = [
    "Master the core cognitive architecture, reasoning loops, memory systems, and tool paradigms behind modern autonomous AI agents.",
    "Get hands-on building real-world Python agents, LangGraph state machines, Pydantic schemas, streaming outputs, and debugging workflows.",
    "Implement production-grade patterns: Model Context Protocol (MCP), deep planning, conditional branching, human-in-the-loop, and FastAPI microservices.",
    "Scale multi-agent systems to production: Supervisor and Swarm patterns, time-travel debugging, parallel execution, cost optimization, and resilience."
]

for idx, lvl in enumerate(levels_data):
    lvl_num = idx + 1
    lvl_id = f"level-{lvl_num}"
    color = level_colors[idx]
    
    ts_code.append("  {")
    ts_code.append(f"    id: '{lvl_id}',")
    ts_code.append(f"    levelNumber: {lvl_num},")
    ts_code.append(f"    title: 'Level {lvl_num}: {level_subtitles[idx]}',")
    ts_code.append(f"    subtitle: '{level_subtitles[idx]}',")
    ts_code.append(f"    description: {json.dumps(level_descriptions[idx])},")
    ts_code.append(f"    pdfSource: '{lvl['filename']}',")
    ts_code.append(f"    totalSlides: {lvl['total_slides']},")
    ts_code.append(f"    modulesCount: {len(lvl['modules'])},")
    ts_code.append(f"    color: {json.dumps(color, indent=6)},")
    ts_code.append("    modules: [")
    
    for m in lvl['modules']:
        mod_num = m['number']
        # normalize module slug: e.g. 1.1 -> module-1-1
        slug = f"module-{mod_num.replace('.', '-')}"
        clean_title = m['title'].replace('\n', ' ').strip()
        tags = get_tags_for_module(mod_num, clean_title)
        slide_count = len(m['slides'])
        est_min = max(10, slide_count * 3)
        
        # summary from first slide
        first_bullets = m['slides'][0]['bullets'] if m['slides'] and m['slides'][0]['bullets'] else []
        summary = first_bullets[0] if first_bullets else f"Comprehensive study of {clean_title}."
        
        # Key topics
        key_topics = [s['heading'] for s in m['slides'] if s['heading'] and s['heading'] != clean_title][:5]
        
        # Slides list (compact)
        slides_compact = []
        for s in m['slides']:
            slides_compact.append({
                "page": s['page'],
                "heading": s['heading'],
                "bullets": s['bullets'][:3]
            })
            
        ts_code.append("      {")
        ts_code.append(f"        id: '{slug}',")
        ts_code.append(f"        number: '{mod_num}',")
        ts_code.append(f"        title: {json.dumps(clean_title)},")
        ts_code.append(f"        levelId: '{lvl_id}',")
        ts_code.append(f"        levelNumber: {lvl_num},")
        ts_code.append(f"        startPage: {m['start_page']},")
        ts_code.append(f"        endPage: {m['end_page']},")
        ts_code.append(f"        slideCount: {slide_count},")
        ts_code.append(f"        estimatedMinutes: {est_min},")
        ts_code.append(f"        tags: {json.dumps(tags)},")
        ts_code.append(f"        summary: {json.dumps(summary)},")
        ts_code.append(f"        keyTopics: {json.dumps(key_topics)},")
        ts_code.append(f"        slides: {json.dumps(slides_compact)}")
        ts_code.append("      },")
        
    ts_code.append("    ]")
    ts_code.append("  },")

ts_code.append("];")
ts_code.append("")
ts_code.append("// Helper lookup functions")
ts_code.append("export function getAllModules(): CourseModule[] {")
ts_code.append("  return COURSE_LEVELS.flatMap(l => l.modules);")
ts_code.append("}")
ts_code.append("")
ts_code.append("export function getModuleById(id: string): CourseModule | undefined {")
ts_code.append("  return getAllModules().find(m => m.id === id);")
ts_code.append("}")
ts_code.append("")
ts_code.append("export function getLevelById(id: string): CourseLevel | undefined {")
ts_code.append("  return COURSE_LEVELS.find(l => l.id === id);")
ts_code.append("}")

with open('curriculum_data_generated.ts', 'w', encoding='utf-8') as f:
    f.write("\n".join(ts_code))

print("curriculum_data_generated.ts successfully created!")
