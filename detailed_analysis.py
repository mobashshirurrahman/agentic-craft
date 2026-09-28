import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
output_md = []
with open('pdf_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for fname in sorted(data.keys()):
    doc = data[fname]
    print(f"\n=================================================================")
    print(f"ANALYZING: {fname}")
    print(f"=================================================================")
    slides = data[fname]['slides']
    
    current_module = None
    module_slides = {}
    
    for s in slides:
        text = " ".join(s['lines'])
        # Match pattern: e.g. "1.1 ", "1.2 ", "2.15 ", "3.1 ", "4.1 "
        m = re.search(r'(\d+\.\d+)\s+([A-Za-z0-9\s,\-–—\(\)\/]+)', text)
        first_few = " ".join(s['lines'][:2])
        m_start = re.match(r'^(\d+\.\d+)\s*(.*)', first_few)
        
        if m_start:
            num = m_start.group(1)
            title = m_start.group(2)
            # Check next lines if title wraps
            if len(s['lines']) > 1 and len(title) < 20:
                title += " " + " ".join(s['lines'][1:3])
            current_module = f"{num}: {title.strip()}"
            if current_module not in module_slides:
                module_slides[current_module] = []
        elif current_module:
            module_slides[current_module].append(s)
            
    print(f"Total detected modules in {fname}: {len(module_slides)}")
    output_md.append(f"## {fname} (Total: {doc['total_pages']} slides, {len(module_slides)} modules)\n")
    for mod, s_list in module_slides.items():
        slide_count = len(s_list) + 1
        start_p = s_list[0]['page'] - 1 if s_list else 'N/A'
        end_p = s_list[-1]['page'] if s_list else start_p
        line_str = f"### Module {mod} (Pages {start_p}-{end_p}, {slide_count} slides)"
        print(line_str)
        output_md.append(line_str)
        # Show all slide titles inside
        for sl in s_list:
            if sl['lines']:
                title_line = sl['lines'][0].replace('\n', ' ')
                output_md.append(f"- Page {sl['page']}: {title_line}")

with open('curriculum_extracted.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(output_md))
