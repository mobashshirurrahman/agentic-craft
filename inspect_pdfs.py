import json
import re
import sys

with open('pdf_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

out_lines = []

for fname, doc in data.items():
    out_lines.append(f"\n{'='*70}\nFILE: {fname} (Total: {doc['total_pages']} slides)\n{'='*70}\n")
    
    # We want to identify the exact modules/chapters and slides belonging to each module
    for s in doc['slides']:
        lines = s['lines']
        text = " ".join(lines)
        
        # Check if slide starts with module pattern like "1.1", "2.1", "3.1", "4.1" or "Level" or "Hands-on"
        # Often title slides have fewer lines and clear headers
        is_module_title = False
        first_line = lines[0] if lines else ""
        first_two = " ".join(lines[:3])
        
        # Match pattern like: 1.1 ..., 2.1 ..., 3.1 ..., 4.1 ...
        match = re.match(r'^(\d+\.\d+)\s*(.*)', first_line) or re.match(r'^(\d+\.\d+)\s*(.*)', first_two)
        if match:
            out_lines.append(f"\n>>> [MODULE/CHAPTER START] Page {s['page']}: {first_two}")
        else:
            # Let's check if it's a section header or slide title
            out_lines.append(f"  Page {s['page']:3d}: {first_line}")

with open('pdf_detailed_structure.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(out_lines))

print("Wrote pdf_detailed_structure.txt successfully.")
