# RDAP coverage by TLD

Which top-level domains publish an [RDAP](https://datatracker.ietf.org/doc/html/rfc7480)
service, which do not, and the registry endpoint for each — generated from
IANA's own bootstrap registry.

| | |
|---|---|
| TLDs delegated | **1435** |
| Publish RDAP | **1203** (83.8%) |
| Publish none | **232** |
| Distinct registry endpoints | 379 |
| IANA bootstrap published | 2026-11-20 |

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
that *have* a service. That cross-reference is what produces the 232
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

## The 232 TLDs with no RDAP service

No RDAP endpoint in IANA's bootstrap, so no client can discover a server for
them. Nearly all are country-code TLDs: ICANN requires RDAP of gTLD registries,
while ccTLDs set their own policy.

| `.ac` | `.gf` | `.mv` | `.ws` |
| `.ae` | `.gg` | `.mw` | `.xn--2scrj9c` |
| `.af` | `.gh` | `.mx` | `.xn--3hcrj9c` |
| `.ag` | `.gi` | `.my` | `.xn--45br5cyl` |
| `.al` | `.gl` | `.mz` | `.xn--45brj9c` |
| `.am` | `.gm` | `.nc` | `.xn--4dbrk0ce` |
| `.ao` | `.gn` | `.ne` | `.xn--54b7fta0cc` |
| `.aq` | `.gp` | `.ni` | `.xn--80ao21a` |
| `.arpa` | `.gq` | `.np` | `.xn--90a3ac` |
| `.at` | `.gr` | `.nr` | `.xn--90ae` |
| `.aw` | `.gt` | `.nu` | `.xn--90ais` |
| `.ax` | `.gu` | `.nz` | `.xn--d1alf` |
| `.az` | `.gw` | `.om` | `.xn--e1a4c` |
| `.ba` | `.hk` | `.pa` | `.xn--fiqs8s` |
| `.bb` | `.hm` | `.pe` | `.xn--fiqz9s` |
| `.bd` | `.hr` | `.pf` | `.xn--fpcrj9c3d` |
| `.be` | `.hu` | `.ph` | `.xn--fzc2c9e2c` |
| `.bf` | `.ie` | `.pk` | `.xn--gecrj9c` |
| `.bg` | `.il` | `.ps` | `.xn--h2breg3eve` |
| `.bi` | `.im` | `.pt` | `.xn--h2brj9c` |
| `.bj` | `.io` | `.py` | `.xn--h2brj9c8c` |
| `.bn` | `.iq` | `.qa` | `.xn--j1amh` |
| `.bo` | `.ir` | `.ro` | `.xn--j6w193g` |
| `.bs` | `.it` | `.rs` | `.xn--kprw13d` |
| `.bt` | `.je` | `.ru` | `.xn--l1acc` |
| `.bv` | `.jm` | `.sa` | `.xn--lgbbat1ad8j` |
| `.bw` | `.jo` | `.sb` | `.xn--mgb9awbf` |
| `.by` | `.jp` | `.se` | `.xn--mgba3a4f16a` |
| `.bz` | `.kh` | `.sh` | `.xn--mgbaam7a8h` |
| `.cd` | `.ki` | `.sj` | `.xn--mgbah1a3hjkrd` |
| `.cf` | `.km` | `.sk` | `.xn--mgbai9azgqp6j` |
| `.cg` | `.kn` | `.sl` | `.xn--mgbayh7gpa` |
| `.ch` | `.kp` | `.sm` | `.xn--mgbbh1a` |
| `.ci` | `.kw` | `.so` | `.xn--mgbbh1a71e` |
| `.ck` | `.kz` | `.st` | `.xn--mgbc0a9azcg` |
| `.cl` | `.la` | `.su` | `.xn--mgberp4a5d4ar` |
| `.cn` | `.lc` | `.sv` | `.xn--mgbgu82a` |
| `.co` | `.li` | `.sx` | `.xn--mgbpl2fh` |
| `.cu` | `.lk` | `.sy` | `.xn--mgbtx2b` |
| `.cw` | `.lr` | `.sz` | `.xn--mgbx4cd0ab` |
| `.cy` | `.ls` | `.tc` | `.xn--mix891f` |
| `.de` | `.lt` | `.td` | `.xn--node` |
| `.dj` | `.lu` | `.tg` | `.xn--ogbpf8fl` |
| `.dk` | `.lv` | `.tj` | `.xn--p1ai` |
| `.dm` | `.ma` | `.tk` | `.xn--pgbs0dh` |
| `.do` | `.mc` | `.tl` | `.xn--q7ce6a` |
| `.dz` | `.md` | `.tm` | `.xn--qxa6a` |
| `.edu` | `.me` | `.tn` | `.xn--qxam` |
| `.ee` | `.mh` | `.tr` | `.xn--rvc1e0am3e` |
| `.eg` | `.mil` | `.tt` | `.xn--s9brj9c` |
| `.er` | `.mk` | `.ug` | `.xn--wgbh1c` |
| `.es` | `.mm` | `.us` | `.xn--wgbl6a` |
| `.et` | `.mn` | `.uy` | `.xn--xkc2al3hye2a` |
| `.eu` | `.mo` | `.va` | `.xn--xkc2dl3a5ee0h` |
| `.fk` | `.mp` | `.vc` | `.xn--y9a3aq` |
| `.ga` | `.mq` | `.ve` | `.xn--ygbi2ammx` |
| `.gb` | `.mr` | `.vn` | `.za` |
| `.ge` | `.mt` | `.vu` | `.zw` |

## Registries serving the most TLDs

| Endpoint | TLDs |
|---|---|
| `rdap.identitydigital.services` | 451 |
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
| `rdap.teleinfo.cn` | 9 |

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
232 TLDs listed above, which is the honest reason this list is
published rather than buried.
