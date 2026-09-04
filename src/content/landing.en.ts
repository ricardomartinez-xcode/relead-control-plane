/**
 * RelNets marketing copy (English, primary locale).
 *
 * Structure is locale-keyed so an /es variant can be added later by adding
 * `landing.es.ts` with the same shape and registering it in `src/content/index.ts`.
 * All content here is static marketing copy — no customer or infrastructure data.
 */

export type LandingContent = typeof landingEn;

export const landingEn = {
  brand: {
    name: "RelNets",
    category: "Secure Infrastructure Workspace",
    promise: ["Connect", "Access", "Govern", "Operate"],
  },
  nav: [
    { label: "Product", to: "/product" as const },
    { label: "Solutions", to: "/solutions" as const },
    { label: "Security", to: "/security" as const },
    { label: "Pricing", to: "/pricing" as const },
    { label: "Docs", to: "/docs" as const },
  ],
  cta: {
    signIn: { label: "Sign in", href: "https://console.relnets.com/sign-in" },
    startFree: { label: "Start free", href: "https://console.relnets.com/sign-up" },
    demo: { label: "Book a technical demo", href: "https://console.relnets.com/demo" },
  },
  hero: {
    eyebrow: "Secure Infrastructure Workspace",
    title: "Connect infrastructure. Control access. Govern AI.",
    subtitle:
      "One secure workspace for people, machines and AI to access and operate private infrastructure — with individual identity, policy and a complete audit trail.",
    note: "Static prototype. CTA destinations are placeholders and are not live yet.",
  },
  problem: {
    title: "Stop stitching access together",
    lead: "Most teams end up operating private infrastructure through a stack that nobody fully owns.",
    items: [
      {
        title: "VPNs",
        body: "Network-level trust: once a client is on the network, reachability is broad and hard to reason about.",
      },
      {
        title: "Bastions and jump hosts",
        body: "Extra hosts to patch, monitor and keep exposed, usually with shared entry points.",
      },
      {
        title: "SSH credential stores",
        body: "Long-lived keys copied between laptops, runners and scripts, rarely rotated or attributable.",
      },
      {
        title: "AI credentials",
        body: "Agents and automations inherit human tokens, so their actions cannot be separated or constrained.",
      },
    ],
    outcome:
      "RelNets replaces that surface with identity-bound connectivity, policy-checked access and one audit trail across humans, machines and agents.",
  },
  layers: {
    title: "Five control layers",
    lead: "Each layer is independent, and each one is enforced before an action reaches your infrastructure.",
    items: [
      {
        name: "Connect",
        body: "Outbound-only agents register private hosts, clusters and edge nodes into a workspace. No inbound ports, no published services.",
        points: ["Outbound registration", "Private by default", "Hybrid and edge nodes"],
      },
      {
        name: "Access",
        body: "Every session is requested by an individual identity and evaluated against policy before a connection exists.",
        points: ["Deny by default", "Per-resource scope", "Short-lived sessions"],
      },
      {
        name: "Operate",
        body: "Run commands, workflows and maintenance tasks through a consistent surface instead of ad-hoc shells.",
        points: ["Session recording", "Structured runs", "Reproducible operations"],
      },
      {
        name: "Govern",
        body: "Approvals, change windows and role boundaries live with the resource, not in a side channel.",
        points: ["Approval workflows", "Role boundaries", "Exportable audit"],
      },
      {
        name: "Control AI",
        body: "Agents get their own identity, allowlisted tools and human approval gates for destructive operations.",
        points: ["Agent identity", "Tool allowlists", "Human-in-the-loop"],
        preview: true,
      },
    ],
  },
  audiences: {
    title: "Built for teams that operate real infrastructure",
    lead: "Same primitives, different operating models.",
    items: [
      {
        title: "Engineering & DevOps",
        body: "Give developers scoped access to private services and databases without distributing keys or opening networks.",
      },
      {
        title: "IT & MSPs",
        body: "Operate many customer estates from one workspace, with tenant separation and per-engagement audit.",
      },
      {
        title: "AI Infrastructure",
        body: "Let agents and pipelines act on infrastructure under explicit identity, allowlists and approval gates.",
        preview: true,
      },
      {
        title: "Edge & Hybrid",
        body: "Reach on-prem, colocation and edge nodes over outbound connections, including intermittent links.",
      },
    ],
  },
  security: {
    title: "Security principles",
    lead: "These are design constraints, not configuration options.",
    items: [
      {
        title: "Individual identity",
        body: "Every human, machine and agent authenticates as itself. No shared accounts, no anonymous sessions.",
      },
      {
        title: "Deny by default",
        body: "Nothing is reachable until a policy explicitly allows it for a specific identity and resource.",
      },
      {
        title: "Least privilege",
        body: "Grants are scoped to a resource and an action, not to a network segment or a whole host class.",
      },
      {
        title: "Short-lived and JIT access",
        body: "Credentials and sessions expire. Elevated access is requested, time-boxed and released.",
      },
      {
        title: "Auditability",
        body: "Who, what, where, when and under which policy — recorded for every session and exportable.",
      },
    ],
  },
  ai: {
    title: "AI and MCP governance",
    lead: "Agents are useful when they can act, and safe when acting is constrained. RelNets treats an agent as a first-class identity.",
    items: [
      {
        title: "Unique agent identities",
        body: "Each agent or assistant gets its own credential and policy set. It never borrows a person's session.",
      },
      {
        title: "Tool allowlists",
        body: "An agent sees only the MCP tools and resources its policy permits; everything else is not exposed.",
      },
      {
        title: "Human approval for destructive actions",
        body: "Deletes, restarts, credential changes and other high-impact calls pause for an authorized human.",
      },
      {
        title: "Audit trail",
        body: "Every agent call, argument set and decision is recorded next to human activity in the same log.",
      },
    ],
    flow: ["Agent request", "Identity check", "Tool allowlist", "Human approval", "Execute", "Audit record"],
  },
  platform: {
    title: "Developer platform",
    lead: "Everything the console does is available programmatically.",
    items: [
      { title: "CLI", body: "Open sessions, run commands and manage resources from a terminal or a CI job." },
      { title: "API", body: "Typed HTTP API for resources, policies, sessions and audit export." },
      { title: "MCP", body: "Expose governed tools to AI clients through the Model Context Protocol.", preview: true },
      { title: "Web Console", body: "Workspace, policy and audit review in the browser for day-to-day operations." },
      { title: "Automation", body: "Declarative workspace configuration suitable for review and version control." },
      { title: "Webhooks", body: "Emit session, approval and policy events into your own tooling." },
    ],
  },
  pricing: {
    title: "Pricing",
    lead: "Plan structure below is a pricing hypothesis for this preview. Tiers, limits and commercial terms are not final.",
    disclaimer: "Pricing hypothesis / preview — not a commercial offer.",
    tiers: [
      {
        name: "Developer",
        for: "Individuals and evaluation",
        points: ["Single user", "Personal resources", "Core connectivity and sessions"],
      },
      {
        name: "Team",
        for: "Small engineering teams",
        points: ["Shared workspace", "Role-based access", "Session history"],
      },
      {
        name: "Secure",
        for: "Teams with compliance needs",
        points: ["Approval workflows", "JIT elevation", "Audit export"],
        highlight: true,
      },
      {
        name: "Business",
        for: "Multi-team and MSP operations",
        points: ["Tenant separation", "SSO and directory sync", "Policy libraries"],
      },
      {
        name: "Enterprise",
        for: "Regulated and large estates",
        points: ["Custom residency", "Dedicated review", "Contractual controls"],
      },
    ],
  },
  trust: {
    title: "What RelNets does not do",
    lead: "The security posture is easiest to describe by what it removes.",
    items: [
      { title: "No exposed services", body: "Nothing is published to the public internet to make access work." },
      { title: "No shared credentials", body: "No team keys, no service passwords passed between people and scripts." },
      { title: "No access without policy", body: "An identity with no matching policy has no path to a resource." },
    ],
  },
  finalCta: {
    title: "Bring people, machines and AI into one governed workspace",
    body: "Start with a single resource and one policy, then expand across environments as the model proves itself.",
  },
  footer: {
    links: [
      { label: "Security", to: "/security" as const },
      { label: "Docs", to: "/docs" as const },
      { label: "Status", href: "https://console.relnets.com/status" },
      { label: "Privacy", to: "/legal/privacy" as const },
      { label: "Terms", to: "/legal/terms" as const },
      { label: "Contact", to: "/contact" as const },
    ],
    note: "RelNets marketing prototype. Content is static and illustrative; legal pages are drafts and not final.",
  },
};
