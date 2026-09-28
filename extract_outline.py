import json
import re
import sys

with open('pdf_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

levels = [
    ("Level 1: Foundations & Architecture", "AI_Agents_Slides_Level1.pdf"),
    ("Level 2: Core Implementation & Workflows", "AI_Agents_Slides_Level2.pdf"),
    ("Level 3: Advanced Patterns & System Design", "AI_Agents_Slides_Level3.pdf"),
    ("Level 4: Production, Scaling & Optimization", "AI_Agents_Slides_Level4.pdf")
]

full_outline = []

for lvl_name, fname in levels:
    doc = data[fname]
    lvl_data = {
        "level_title": lvl_name,
        "filename": fname,
        "total_slides": doc['total_pages'],
        "modules": []
    }
    
    current_module = None
    for s in doc['slides']:
        lines = s['lines']
        text = " ".join(lines[:3])
        # Look for module pattern
        m = re.match(r'^(\d+\.\d+)\s*(.*)', lines[0] if lines else "")
        if not m and len(lines) > 1:
            m = re.match(r'^(\d+\.\d+)\s*(.*)', " ".join(lines[:2]))
            
        # Also handle page 95 in Level 2 which is labeled 2.17 but is 2.15
        if m:
            mod_num = m.group(1)
            # Full title from first few lines
            title_parts = []
            for l in lines:
                if any(kw in l.lower() for kw in ['agenda', 'slide', 'what you will learn']) or len(title_parts) >= 4:
                    break
                title_parts.append(l)
            full_title = " ".join(title_parts).strip()
            # Clean up number from title
            full_title = re.sub(r'^\d+\.\d+\s*', '', full_title)
            
            current_module = {
                "number": mod_num,
                "title": full_title,
                "start_page": s['page'],
                "end_page": s['page'],
                "slides": []
            }
            lvl_data["modules"].append(current_module)
        
        if current_module:
            current_module["end_page"] = s['page']
            current_module["slides"].append({
                "page": s['page'],
                "heading": lines[0] if lines else "",
                "bullets": lines[1:] if len(lines) > 1 else []
            })
            
    full_outline.append(lvl_data)

with open('full_course_outline.json', 'w', encoding='utf-8') as f:
    json.dump(full_outline, f, indent=2, ensure_ascii=False)

print("Full course outline written to full_course_outline.json")
