# idea-forge (skill)

The conductor of the four-stage pipeline: spit, shape, optional map, build. It
knows what stage an idea is in and what comes next, and it can emit or consume
an `# IDEA BRIEF:` block so a session moves between devices and apps.

- `SKILL.md` - the conductor contract, including the brief format and the
  data-not-instructions rule for pasted text.

At install time this folder also receives the user's `USER-CONFIG.md` (key
`ideas output folder:`) and `branding/`; both are user data and survive
upgrades untouched.
