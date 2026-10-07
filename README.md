# RDAP coverage by TLD

Which top-level domains publish an [RDAP](https://datatracker.ietf.org/doc/html/rfc7480)
service, which do not, and the registry endpoint for each — generated from
IANA's own bootstrap registry.

| | |
|---|---|
| TLDs delegated | **1437** |
| Publish RDAP | **1203** (83.7%) |
| Publish none | **234** |
| Distinct registry endpoints | 379 |
| IANA bootstrap published | 2026-09-30 |

## Why this exists

IANA publishes [the bootstrap registry](https://data.iana.org/rdap/dns.json) that every RDAP client
reads to find the right server for a TLD. It is authoritative and it looks like
this:

```json
{"services":[[["com","net"],["https://rdap.verisign.com/com/v1/"]], ...]}
```

Answering "does `.io` publish RDAP, and where" from that means writing a
parser. This repo writes it once, and cross-references IANA's list of delegated
TLDs — which the bootstrap alone cannot give you, because it only lists TLDs
that *have* a service. That cross-reference is what produces the 234
below.

## Data

[`data/rdap-coverage.json`](data/rdap-coverage.json) — every delegated TLD with
its endpoint or `null`:

```json
{ "tld": "fr", "rdap": "https://rdap.nic.fr" }
{ "tld": "at", "rdap": null }
```

A searchable version of the same data is at
[dropperch.com/rdap-support-by-tld.html](https://dropperch.com/rdap-support-by-tld.html).

## The 234 TLDs with no RDAP service

No RDAP endpoint in IANA's bootstrap, so no client can discover a server for
them. Nearly all are country-code TLDs: ICANN requires RDAP of gTLD registries,
while ccTLDs set their own policy.

| `.ac` | `.gg` | `.mx` | `.xn--2scrj9c` |
| `.ae` | `.gh` | `.my` | `.xn--3hcrj9c` |
| `.af` | `.gi` | `.mz` | `.xn--45br5cyl` |
| `.ag` | `.gl` | `.nc` | `.xn--45brj9c` |
| `.al` | `.gm` | `.ne` | `.xn--4dbrk0ce` |
| `.am` | `.gn` | `.ni` | `.xn--54b7fta0cc` |
| `.ao` | `.gp` | `.np` | `.xn--80ao21a` |
| `.aq` | `.gq` | `.nr` | `.xn--90a3ac` |
| `.arpa` | `.gr` | `.nu` | `.xn--90ae` |
| `.at` | `.gt` | `.nz` | `.xn--90ais` |
| `.aw` | `.gu` | `.om` | `.xn--d1alf` |
| `.ax` | `.gw` | `.pa` | `.xn--e1a4c` |
| `.az` | `.hk` | `.pe` | `.xn--fiqs8s` |
| `.ba` | `.hm` | `.pf` | `.xn--fiqz9s` |
| `.bb` | `.hr` | `.ph` | `.xn--fpcrj9c3d` |
| `.bd` | `.hu` | `.pk` | `.xn--fzc2c9e2c` |
| `.be` | `.ie` | `.pr` | `.xn--gecrj9c` |
| `.bf` | `.il` | `.ps` | `.xn--h2breg3eve` |
| `.bg` | `.im` | `.pt` | `.xn--h2brj9c` |
| `.bi` | `.io` | `.py` | `.xn--h2brj9c8c` |
| `.bj` | `.iq` | `.qa` | `.xn--j1amh` |
| `.bn` | `.ir` | `.ro` | `.xn--j6w193g` |
| `.bo` | `.it` | `.rs` | `.xn--kprw13d` |
| `.bs` | `.je` | `.ru` | `.xn--l1acc` |
| `.bt` | `.jm` | `.sa` | `.xn--lgbbat1ad8j` |
| `.bv` | `.jo` | `.sb` | `.xn--mgb9awbf` |
| `.bw` | `.jp` | `.sc` | `.xn--mgba3a4f16a` |
| `.by` | `.kh` | `.se` | `.xn--mgbaam7a8h` |
| `.bz` | `.ki` | `.sh` | `.xn--mgbah1a3hjkrd` |
| `.cd` | `.km` | `.sj` | `.xn--mgbai9azgqp6j` |
| `.cf` | `.kn` | `.sk` | `.xn--mgbayh7gpa` |
| `.cg` | `.kp` | `.sl` | `.xn--mgbbh1a` |
| `.ch` | `.kw` | `.sm` | `.xn--mgbbh1a71e` |
| `.ci` | `.kz` | `.so` | `.xn--mgbc0a9azcg` |
| `.ck` | `.la` | `.st` | `.xn--mgberp4a5d4ar` |
| `.cl` | `.lc` | `.su` | `.xn--mgbgu82a` |
| `.cn` | `.li` | `.sv` | `.xn--mgbpl2fh` |
| `.co` | `.lk` | `.sx` | `.xn--mgbtx2b` |
| `.cu` | `.lr` | `.sy` | `.xn--mgbx4cd0ab` |
| `.cw` | `.ls` | `.sz` | `.xn--mix891f` |
| `.cy` | `.lt` | `.tc` | `.xn--node` |
| `.de` | `.lu` | `.td` | `.xn--ogbpf8fl` |
| `.dj` | `.lv` | `.tg` | `.xn--p1ai` |
| `.dk` | `.ma` | `.tj` | `.xn--pgbs0dh` |
| `.dm` | `.mc` | `.tk` | `.xn--q7ce6a` |
| `.do` | `.md` | `.tl` | `.xn--qxa6a` |
| `.dz` | `.me` | `.tm` | `.xn--qxam` |
| `.edu` | `.mh` | `.tn` | `.xn--rvc1e0am3e` |
| `.ee` | `.mil` | `.tr` | `.xn--s9brj9c` |
| `.eg` | `.mk` | `.tt` | `.xn--wgbh1c` |
| `.er` | `.mm` | `.ug` | `.xn--wgbl6a` |
| `.es` | `.mn` | `.us` | `.xn--xkc2al3hye2a` |
| `.et` | `.mo` | `.uy` | `.xn--xkc2dl3a5ee0h` |
| `.eu` | `.mp` | `.va` | `.xn--y9a3aq` |
| `.fk` | `.mq` | `.vc` | `.xn--ygbi2ammx` |
| `.ga` | `.mr` | `.ve` | `.za` |
| `.gb` | `.mt` | `.vn` | `.zw` |
| `.ge` | `.mv` | `.vu` |  |
| `.gf` | `.mw` | `.ws` |  |

## Registries serving the most TLDs

| Endpoint | TLDs |
|---|---|
| `rdap.identitydigital.services` | 450 |
| `rdap.centralnic.com` | 91 |
| `rdap.nominet.uk` | 81 |
| `pubapi.registry.google` | 46 |
| `rdap.gmoregistry.net` | 46 |
| `rdap.zdnsgtld.com` | 22 |
| `tld-rdap.verisign.com` | 16 |
| `rdap.registry.click` | 16 |
| `rdap.mobile-registry.com` | 12 |
| `rdap.publicinterestregistry.org` | 11 |
| `rdap.radix.host` | 11 |
| `rdap.teleinfo.cn` | 10 |

## Regenerating

```sh
node build.mjs            # fetch from IANA
node build.mjs --offline  # rebuild from the committed snapshot
```

A GitHub Action refreshes this weekly and commits only when IANA's data has
actually changed.

## Notes

- Internationalised TLDs appear in punycode, as they do in IANA's files and in
  DNS itself — `xn--p1ai` is `.рф`.
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
234 TLDs listed above, which is the honest reason this list is
published rather than buried.
