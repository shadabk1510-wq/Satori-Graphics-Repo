# Video 4 SFX step 1: every animation event of META_MAIN from the ae_sim model of build_meta.jsx.
# Usage: python3 mm_events.py model.json events.json
# Each event: [time in META_MAIN (s), scene id, layer name, property, start value, end value, key span (s)].
# Layer markers (word-by-word slams, tag text) come through as property "Marker", one event per marker.
import json, sys
d = json.load(open(sys.argv[1]))
comps = {c['name']: c for c in d['comps']}
main = comps['META_MAIN']
ev = []

def keyed(props, path=()):
    for p in props:
        q = path + (p['name'],)
        if p.get('keys'): yield q, p
        if p.get('kids'): yield from keyed(p['kids'], q)

def mag(v):
    if isinstance(v, (int, float)): return v
    if isinstance(v, list) and v and all(isinstance(x, (int, float)) for x in v): return v
    return None

def scan(comp, off, lo, hi, sid, depth=0):
    for L in comp['layers']:
        if not L.get('enabled', True) or L.get('guide'): continue
        a0 = off + L['start']; lin, lout = max(lo, off + L['in']), min(hi, off + L['out'])
        if lout <= lin: continue
        for path, p in keyed(L['props']):
            pn = '/'.join(path[-2:]); ks = p['keys']
            if path[-1] == 'Marker':
                for k in ks:
                    t = a0 + k['t']
                    if lin - 0.05 <= t <= lout: ev.append([round(t, 3), sid, L['name'], 'Marker', None, None, 0])
                continue
            for i in range(1, len(ks)):
                v0, v1 = mag(ks[i-1].get('v')), mag(ks[i].get('v'))
                if v0 == v1 and v0 is not None: continue
                t = a0 + ks[i-1]['t']
                if lin - 0.05 <= t <= lout:
                    ev.append([round(t, 3), sid, L['name'], pn, v0, v1, round(ks[i]['t'] - ks[i-1]['t'], 3)])
        src = (L.get('source') or {}).get('comp')
        if src and src in comps and depth < 6:
            scan(comps[src], a0, lin, lout, sid, depth + 1)

for L in main['layers']:
    src = (L.get('source') or {}).get('comp')
    if src and src.startswith('SAT '):
        scan(comps[src], L['start'], L['in'], L['out'], src.split()[1])
ev.sort(key=lambda e: e[0])
json.dump(ev, open(sys.argv[2], 'w'))
print(len(ev), 'events')
