# RDAP coverage by TLD

Which top-level domains publish an [RDAP](https://datatracker.ietf.org/doc/html/rfc7480)
service, which do not, and the registry endpoint for each — generated from
IANA's own bootstrap registry.

| | |
|---|---|
| TLDs delegated | **1437** |
| Publish RDAP | **1204** (83.8%) |
| Publish none | **233** |
| Distinct registry endpoints | 379 |
| IANA bootstrap published | 2026-10-22 |

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
that *have* a service. That cross-reference is what produces the 233
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

## The 233 TLDs with no RDAP service

No RDAP endpoint in IANA's bootstrap, so no client can discover a server for
them. Nearly all are country-code TLDs: ICANN requires RDAP of gTLD registries,
while ccTLDs set their own policy.

| `.ac` | `.gg` | `.mx` | `.xn--3hcrj9c` |
| `.ae` | `.gh` | `.my` | `.xn--45br5cyl` |
| `.af` | `.gi` | `.mz` | `.xn--45brj9c` |
| `.ag` | `.gl` | `.nc` | `.xn--4dbrk0ce` |
| `.al` | `.gm` | `.ne` | `.xn--54b7fta0cc` |
| `.am` | `.gn` | `.ni` | `.xn--80ao21a` |
| `.ao` | `.gp` | `.np` | `.xn--90a3ac` |
| `.aq` | `.gq` | `.nr` | `.xn--90ae` |
| `.arpa` | `.gr` | `.nu` | `.xn--90ais` |
| `.at` | `.gt` | `.nz` | `.xn--d1alf` |
| `.aw` | `.gu` | `.om` | `.xn--e1a4c` |
| `.ax` | `.gw` | `.pa` | `.xn--fiqs8s` |
| `.az` | `.hk` | `.pe` | `.xn--fiqz9s` |
| `.ba` | `.hm` | `.pf` | `.xn--fpcrj9c3d` |
| `.bb` | `.hr` | `.ph` | `.xn--fzc2c9e2c` |
| `.bd` | `.hu` | `.pk` | `.xn--gecrj9c` |
| `.be` | `.ie` | `.pr` | `.xn--h2breg3eve` |
| `.bf` | `.il` | `.ps` | `.xn--h2brj9c` |
| `.bg` | `.im` | `.pt` | `.xn--h2brj9c8c` |
| `.bi` | `.io` | `.py` | `.xn--j1amh` |
| `.bj` | `.iq` | `.qa` | `.xn--j6w193g` |
| `.bn` | `.ir` | `.ro` | `.xn--kprw13d` |
| `.bo` | `.it` | `.rs` | `.xn--l1acc` |
| `.bs` | `.je` | `.ru` | `.xn--lgbbat1ad8j` |
| `.bt` | `.jm` | `.sa` | `.xn--mgb9awbf` |
| `.bv` | `.jo` | `.sb` | `.xn--mgba3a4f16a` |
| `.bw` | `.jp` | `.se` | `.xn--mgbaam7a8h` |
| `.by` | `.kh` | `.sh` | `.xn--mgbah1a3hjkrd` |
| `.bz` | `.ki` | `.sj` | `.xn--mgbai9azgqp6j` |
| `.cd` | `.km` | `.sk` | `.xn--mgbayh7gpa` |
| `.cf` | `.kn` | `.sl` | `.xn--mgbbh1a` |
| `.cg` | `.kp` | `.sm` | `.xn--mgbbh1a71e` |
| `.ch` | `.kw` | `.so` | `.xn--mgbc0a9azcg` |
| `.ci` | `.kz` | `.st` | `.xn--mgberp4a5d4ar` |
| `.ck` | `.la` | `.su` | `.xn--mgbgu82a` |
| `.cl` | `.lc` | `.sv` | `.xn--mgbpl2fh` |
| `.cn` | `.li` | `.sx` | `.xn--mgbtx2b` |
| `.co` | `.lk` | `.sy` | `.xn--mgbx4cd0ab` |
| `.cu` | `.lr` | `.sz` | `.xn--mix891f` |
| `.cw` | `.ls` | `.tc` | `.xn--node` |
| `.cy` | `.lt` | `.td` | `.xn--ogbpf8fl` |
| `.de` | `.lu` | `.tg` | `.xn--p1ai` |
| `.dj` | `.lv` | `.tj` | `.xn--pgbs0dh` |
| `.dk` | `.ma` | `.tk` | `.xn--q7ce6a` |
| `.dm` | `.mc` | `.tl` | `.xn--qxa6a` |
| `.do` | `.md` | `.tm` | `.xn--qxam` |
| `.dz` | `.me` | `.tn` | `.xn--rvc1e0am3e` |
| `.edu` | `.mh` | `.tr` | `.xn--s9brj9c` |
| `.ee` | `.mil` | `.tt` | `.xn--wgbh1c` |
| `.eg` | `.mk` | `.ug` | `.xn--wgbl6a` |
| `.er` | `.mm` | `.us` | `.xn--xkc2al3hye2a` |
| `.es` | `.mn` | `.uy` | `.xn--xkc2dl3a5ee0h` |
| `.et` | `.mo` | `.va` | `.xn--y9a3aq` |
| `.eu` | `.mp` | `.vc` | `.xn--ygbi2ammx` |
| `.fk` | `.mq` | `.ve` | `.za` |
| `.ga` | `.mr` | `.vn` | `.zw` |
| `.gb` | `.mt` | `.vu` |  |
| `.ge` | `.mv` | `.ws` |  |
| `.gf` | `.mw` | `.xn--2scrj9c` |  |

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
233 TLDs listed above, which is the honest reason this list is
published rather than buried.
