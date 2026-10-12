# Video 4 SFX step 4: write the self-contained MM_SFX_project.jsx (template + the cue list inlined).
# Usage: python3 make_sfx_script.py [cues.jsx=tools/mm_sfx_cues.jsx] [out=MM_SFX_project.jsx]
# One file on purpose: no #include, so it runs even when AE copies the script somewhere else.
import os, re, sys
here = os.path.dirname(os.path.abspath(__file__))
cues = open(sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, 'mm_sfx_cues.jsx')).read()
arr = cues[cues.index('= [', cues.index('var ')) + 2:cues.rindex(']') + 1]
rows = [l.strip() for l in arr.split('\n') if l.strip().startswith('[') and l.strip() != '[']
body = '[\n' + '\n'.join('        ' + r for r in rows) + '\n    ]'
tpl = open(os.path.join(here, 'MM_SFX_project.template.jsx')).read()
out = tpl.replace('/*@@CUES@@*/', body)
assert all(ord(c) < 128 for c in out), 'non-ASCII in the script'
dst = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, '..', 'MM_SFX_project.jsx')
open(dst, 'w', newline='\r\n').write(out)
print(len(rows), 'cues ->', os.path.abspath(dst))
