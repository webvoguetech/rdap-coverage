/**
 * Turn IANA's RDAP bootstrap into a readable dataset and a README table.
 *
 *   node build.mjs            # fetch from IANA, regenerate everything
 *   node build.mjs --offline  # rebuild from the committed snapshot
 *
 * WHAT THIS IS FOR
 *
 * IANA publishes the bootstrap registry that every RDAP client reads to find
 * the right server for a TLD. It is authoritative, it is updated regularly,
 * and it is a 70 KB array of arrays that nobody can skim:
 *
 *   {"services":[[["com","net"],["https://rdap.verisign.com/com/v1/"]], ...]}
 *
 * Answering "does .io publish RDAP, and where" from that file means writing a
 * parser. This repo writes the parser once.
 *
 * WHY THE SECOND FILE MATTERS
 *
 * The bootstrap only lists TLDs that HAVE an RDAP service, so it cannot tell
 * you what is missing. Cross-referencing IANA's list of delegated TLDs is what
 * turns "here are 1,203 endpoints" into "234 TLDs publish nothing" -- which is
 * the more useful half for anyone deciding whether RDAP can replace WHOIS in
 * their tooling.
 *
 * OFFLINE BY DEFAULT ON FAILURE
 *
 * Both files are fetched and the snapshot is rewritten on success. If IANA is
 * unreachable the build falls back to the committed snapshot rather than
 * failing, and the output always carries IANA's own publication date, so a
 * stale dataset is visibly stale rather than quietly wrong.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const OFFLINE = process.argv.includes('--offline')
const BOOTSTRAP_URL = 'https://data.iana.org/rdap/dns.json'
const TLD_LIST_URL = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt'
const SNAPSHOT = 'data/iana-snapshot.json'

async function load() {
  if (!OFFLINE) {
    try {
      const [bootstrap, tldList] = await Promise.all([
        fetch(BOOTSTRAP_URL, { signal: AbortSignal.timeout(20_000) }).then((r) => {
          if (!r.ok) throw new Error(`bootstrap HTTP ${r.status}`)
          return r.json()
        }),
        fetch(TLD_LIST_URL, { signal: AbortSignal.timeout(20_000) }).then((r) => {
          if (!r.ok) throw new Error(`TLD list HTTP ${r.status}`)
          return r.text()
        }),
      ])
      const snap = { bootstrap, tldList, fetched: new Date().toISOString() }
      writeFileSync(SNAPSHOT, JSON.stringify(snap), 'utf8')
      console.log('fetched from IANA; snapshot updated')
      return snap
    } catch (err) {
      console.log(`IANA unreachable (${err.message}) — using snapshot`)
    }
  }
  if (!existsSync(SNAPSHOT)) throw new Error(`no snapshot at ${SNAPSHOT} and fetch failed`)
  return JSON.parse(readFileSync(SNAPSHOT, 'utf8'))
}

const snap = await load()

/**
 * One row per TLD. A service can cover hundreds of TLDs, and a TLD can list
 * several URLs (https and http); the first https entry is the one a client
 * actually uses.
 */
const byTld = new Map()
for (const [tlds, urls] of snap.bootstrap.services || []) {
  const pick = (urls || []).find((u) => u.startsWith('https://')) || (urls || [])[0] || ''
  for (const t of tlds || []) byTld.set(String(t).toLowerCase(), pick.replace(/\/+$/, ''))
}

const all = snap.tldList
  .split('\n')
  .map((l) => l.trim().toLowerCase())
  .filter((l) => l && !l.startsWith('#'))

const rows = all.map((tld) => ({ tld, rdap: byTld.get(tld) || null }))
const withRdap = rows.filter((r) => r.rdap)
const without = rows.filter((r) => !r.rdap)
const pct = ((withRdap.length / all.length) * 100).toFixed(1)
const published = String(snap.bootstrap.publication || '').slice(0, 10)

writeFileSync(
  'data/rdap-coverage.json',
  JSON.stringify(
    {
      source: BOOTSTRAP_URL,
      iana_publication: published,
      generated: new Date().toISOString().slice(0, 10),
      totals: { delegated: all.length, with_rdap: withRdap.length, without_rdap: without.length },
      tlds: rows,
    },
    null,
    2,
  ) + '\n',
  'utf8',
)

/** Four columns keeps 234 entries to about sixty lines of readable table. */
function columns(list, n) {
  const perCol = Math.ceil(list.length / n)
  const out = []
  for (let i = 0; i < perCol; i++) {
    const cells = []
    for (let c = 0; c < n; c++) {
      const item = list[c * perCol + i]
      cells.push(item ? '`.' + item + '`' : '')
    }
    out.push('| ' + cells.join(' | ') + ' |')
  }
  return out.join('\n')
}

/** The registries serving the most TLDs — useful for anyone caching by host. */
const byHost = new Map()
for (const r of withRdap) {
  let host = ''
  try {
    host = new URL(r.rdap).host
  } catch {
    continue
  }
  byHost.set(host, (byHost.get(host) || 0) + 1)
}
const topHosts = [...byHost]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([h, n]) => `| \`${h}\` | ${n} |`)
  .join('\n')

const readme = `# RDAP coverage by TLD

Which top-level domains publish an [RDAP](https://datatracker.ietf.org/doc/html/rfc7480)
service, which do not, and the registry endpoint for each — generated from
IANA's own bootstrap registry.

| | |
|---|---|
| TLDs delegated | **${all.length}** |
| Publish RDAP | **${withRdap.length}** (${pct}%) |
| Publish none | **${without.length}** |
| Distinct registry endpoints | ${byHost.size} |
| IANA bootstrap published | ${published} |

## Why this exists

IANA publishes [the bootstrap registry](${BOOTSTRAP_URL}) that every RDAP client
reads to find the right server for a TLD. It is authoritative and it looks like
this:

\`\`\`json
{"services":[[["com","net"],["https://rdap.verisign.com/com/v1/"]], ...]}
\`\`\`

Answering "does \`.io\` publish RDAP, and where" from that means writing a
parser. This repo writes it once, and cross-references IANA's list of delegated
TLDs — which the bootstrap alone cannot give you, because it only lists TLDs
that *have* a service. That cross-reference is what produces the ${without.length}
below.

## Data

[\`data/rdap-coverage.json\`](data/rdap-coverage.json) — every delegated TLD with
its endpoint or \`null\`:

\`\`\`json
{ "tld": "fr", "rdap": "https://rdap.nic.fr" }
{ "tld": "at", "rdap": null }
\`\`\`

A searchable version of the same data is at
[dropperch.com/rdap-support-by-tld.html](https://dropperch.com/rdap-support-by-tld.html).

## The ${without.length} TLDs with no RDAP service

No RDAP endpoint in IANA's bootstrap, so no client can discover a server for
them. Nearly all are country-code TLDs: ICANN requires RDAP of gTLD registries,
while ccTLDs set their own policy.

${columns(
  without.map((r) => r.tld),
  4,
)}

## Registries serving the most TLDs

| Endpoint | TLDs |
|---|---|
${topHosts}

## Regenerating

\`\`\`sh
node build.mjs            # fetch from IANA
node build.mjs --offline  # rebuild from the committed snapshot
\`\`\`

A GitHub Action refreshes this weekly and commits only when IANA's data has
actually changed.

## Notes

- Internationalised TLDs appear in punycode, as they do in IANA's files and in
  DNS itself — \`xn--p1ai\` is \`.рф\`.
- A TLD listed here publishes an RDAP *service*. It says nothing about which
  fields that service returns; registries differ considerably on what they
  disclose.
- Where a registry publishes no RDAP, some still run legacy WHOIS. WHOIS has no
  required response format, so parsing it across registries is a pile of
  per-registry special cases rather than a solved problem.

## Licence

The build script is MIT. The underlying data is IANA's and is redistributed
here unmodified in substance; IANA's registries are public.

---

Maintained alongside [DropPerch](https://dropperch.com), which monitors domain
expiry by reading registries over RDAP. It cannot accurately monitor the
${without.length} TLDs listed above, which is the honest reason this list is
published rather than buried.
`

writeFileSync('README.md', readme, 'utf8')

console.log(`${withRdap.length}/${all.length} TLDs with RDAP (${pct}%)`)
console.log(`wrote data/rdap-coverage.json and README.md`)
