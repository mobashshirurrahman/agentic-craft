import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('pdf_summary.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print('--- LEVEL 1 Module 1.1 slides (p.1-15) ---')
for s in d['AI_Agents_Slides_Level1.pdf']['slides'][:15]:
    print(f"P{s['page']}: {' | '.join(s['lines'][:3])}")

print('\n--- LEVEL 2 Module 2.1 (p.1-7) & 2.5 (p.23-27) ---')
for s in d['AI_Agents_Slides_Level2.pdf']['slides'][:7]:
    print(f"P{s['page']}: {' | '.join(s['lines'][:3])}")
for s in d['AI_Agents_Slides_Level2.pdf']['slides'][22:27]:
    print(f"P{s['page']}: {' | '.join(s['lines'][:3])}")

print('\n--- LEVEL 3 Module 3.1 & 3.4 (MCP) ---')
for s in d['AI_Agents_Slides_Level3.pdf']['slides'][:7]:
    print(f"P{s['page']}: {' | '.join(s['lines'][:3])}")
for s in d['AI_Agents_Slides_Level3.pdf']['slides'][19:27]:
    print(f"P{s['page']}: {' | '.join(s['lines'][:3])}")

print('\n--- LEVEL 4 Module 4.1 & 4.2 & 4.3 ---')
for s in d['AI_Agents_Slides_Level4.pdf']['slides'][:20]:
    print(f"P{s['page']}: {' | '.join(s['lines'][:3])}")
