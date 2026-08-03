# Security

## Reporting a vulnerability

Please report security concerns privately to [joe@joebrown.io](mailto:joe@joebrown.io)
instead of opening a public issue. Include the affected URL, reproduction steps,
and potential impact. Do not include credentials, customer data, or other
third-party secrets.

## Security model

This is a static-first public website with no authentication, database, contact
form backend, or runtime content-management system. Engineering notes are local,
build-time content, and Markdown rendering does not allow raw HTML.

The Content Security Policy permits inline framework scripts and styles because
per-request nonces would require dynamic rendering in Next.js. That is an
intentional tradeoff for the current static architecture. Reassess the policy
before adding user-generated content, third-party scripts, server actions, or a
runtime content source.

All variables prefixed with `NEXT_PUBLIC_` are browser-visible and must contain
public configuration only. Secrets must never be committed or placed in those
variables.
