import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('full_course_outline.json', 'r', encoding='utf-8') as f:
    levels = json.load(f)

for lvl in levels:
    print(f"\n=======================================================")
    print(f"{lvl['level_title']} ({lvl['total_slides']} slides, {len(lvl['modules'])} modules)")
    print(f"=======================================================")
    for m in lvl['modules']:
        # clean title
        t = m['title'].replace('\n', ' ')
        print(f"  [{m['number']}] {t} (p.{m['start_page']}-p.{m['end_page']}, {len(m['slides'])} slides)")
