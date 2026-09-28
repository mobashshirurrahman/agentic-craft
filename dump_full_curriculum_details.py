import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('full_course_outline.json', 'r', encoding='utf-8') as f:
    levels = json.load(f)

with open('curriculum_detailed_breakdown.txt', 'w', encoding='utf-8') as out:
    for lvl in levels:
        out.write(f"\n{'='*80}\n{lvl['level_title']} ({lvl['total_slides']} slides, {len(lvl['modules'])} modules)\n{'='*80}\n")
        for m in lvl['modules']:
            out.write(f"\n### Module {m['number']}: {m['title']} [Slides {m['start_page']}-{m['end_page']}]\n")
            for s in m['slides']:
                out.write(f"  Slide {s['page']}: {s['heading']}\n")
                for b in s['bullets'][:3]:
                    out.write(f"     * {b}\n")

print("Generated curriculum_detailed_breakdown.txt")
