# escape_jsx.py: rewrite non-ASCII characters in .jsx files as \uXXXX (ExtendScript reads files in the system code page).
# Usage: python3 escape_jsx.py file.jsx [more.jsx ...]   (edits in place, prints the files it changed)
import re,sys
for p in sys.argv[1:]:
    s=open(p,encoding='utf-8').read(); s2=re.sub(r'[^\x00-\x7F]',lambda m:'\\u%04X'%ord(m.group(0)),s)
    if s2!=s: open(p,'w').write(s2); print('escaped',p)
