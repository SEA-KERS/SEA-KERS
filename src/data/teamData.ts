import type { Project, TeamMember, WinRecord } from "../types";

// Data store for SEA_KERS / Builders Collective Website
// Showcasing Wins (20+), Projects, and Team (12 Members: 8 Core Team, 4 Team Members)

export const WINS_DATA: readonly WinRecord[] = [
  {
    id: "win-01",
    title: "1st Place: DePIN Infrastructure",
    hackathon: "Solana Breakpoint Hackathon 2025",
    location: "Lisbon, Portugal",
    track: "ecell",
    award: "WINNERS",
    date: "Jan 2025",
    projectRef: "neon-mesh",
    tagline:
      "Sub-second DePIN edge compute orchestration layer for 10,000+ IoT nodes.",
    techStack: ["Solana", "Rust", "DePIN", "gRPC"],
    description:
      "Built Neon Mesh, a distributed edge-compute orchestration layer capable of routing sub-second telemetry across 10,000+ IoT nodes.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-02",
    title: "Grand Prize: ZK-Privacy Shield",
    hackathon: "ETHIndia 2024",
    location: "Bengaluru, India",
    track: "IISc",
    award: "GRAND PRIZE",
    date: "Dec 2024",
    projectRef: "zk-pulse",
    tagline:
      "Zero-knowledge identity verification protocol with biometric zero-leakage.",
    techStack: ["Circom", "Solidity", "SnarkJS", "Ethereum"],
    description:
      "Created zero-knowledge identity proof verification for decentralized identity without revealing sensitive biometric data.",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-03",
    title: "Best Agentic AI Architecture",
    hackathon: "Global AI Safety Hackathon 2024",
    location: "San Francisco, USA",
    track: "IEEE",
    award: "WINNERS",
    date: "Nov 2024",
    projectRef: "kodex-sentinel",
    tagline:
      "Real-time AI smart contract auditor & consensus vulnerability scanner.",
    techStack: ["Python", "PyTorch", "LangGraph", "FastAPI"],
    description:
      "Developed multi-agent consensus verification preventing model hallucination in smart contract automated code generation.",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-04",
    title: "Best Interoperability Protocol",
    hackathon: "Cosmos Interop Hack 2024",
    location: "Berlin, Germany",
    track: "MSME",
    award: "BEST TEAM",
    date: "Oct 2024",
    projectRef: "hyper-bridge",
    tagline:
      "Zero-latency cross-chain packet relay engine with threshold multi-sig.",
    techStack: ["Cosmos SDK", "IBC", "Go", "Tendermint"],
    description:
      "Zero-latency cross-chain packet relay engine connecting EVM and Cosmos SDK chains with threshold signature validation.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-05",
    title: "1st Place: High-Frequency DeFi",
    hackathon: "HackMIT 2024",
    location: "Cambridge, USA",
    track: "HAL",
    award: "WINNERS",
    date: "Sep 2024",
    projectRef: "vector-trade",
    tagline:
      "Vectorized SIMD order matching engine running directly on WebAssembly.",
    techStack: ["C++", "WebAssembly", "TypeScript", "Solana"],
    description:
      "Sub-millisecond order matching engine executing on-chain limit orders using vectorized CPU operations.",
    images: [
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-06",
    title: "Best Developer Tooling",
    hackathon: "Chainlink Constellation 2024",
    location: "Global Virtual",
    track: "IEEE",
    award: "RUNNER UP",
    date: "Aug 2024",
    projectRef: "oracle-sentinel",
    tagline:
      "Real-time oracle anomaly detector for price manipulation vectors.",
    techStack: ["Chainlink CCIP", "Solidity", "Next.js"],
    description:
      "Real-time anomaly detector monitoring price oracle feeds for latency spikes and flash loan manipulation vectors.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-07",
    title: "1st Place: On-Chain Gaming Engine",
    hackathon: "Autonomous Worlds Hackathon",
    location: "Istanbul, Turkey",
    track: "ecell",
    award: "WINNERS",
    date: "Jul 2024",
    projectRef: "ecs-realm",
    tagline: "On-chain Entity-Component-System spatial physics engine.",
    techStack: ["MUD Framework", "Solidity", "Three.js"],
    description:
      "Entity-Component-System engine executing complex spatial physics completely on Ethereum L2 state contracts.",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "win-08",
    title: "Grand Winner: Edge AI Vision",
    hackathon: "NVIDIA Jetson Innovation Challenge",
    location: "Tokyo, Japan",
    track: "HAL",
    award: "GRAND PRIZE",
    date: "Jun 2024",
    projectRef: "edge-vision-ai",
    tagline:
      "Autonomous drone navigation AI optimized for Jetson CUDA microprocessors.",
    techStack: ["TensorRT", "CUDA", "C++", "OpenCV"],
    description:
      "Ultra-fast thermal detection algorithm running on low-power Jetson Orin microprocessors for drone autonomous flight.",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export const PROJECTS_DATA: readonly Project[] = [
  {
    id: "neon-mesh",
    title: "NEON_MESH PROTOCOL",
    tagline:
      "Sub-second DePIN edge compute orchestration layer for IoT node clusters.",
    category: "DePIN Infrastructure",
    description:
      "A high-throughput DePIN orchestration layer designed to synchronize compute across 10,000+ edge nodes with sub-second latency. Built for zero-downtime micro-agent execution.",
    techStack: ["Solana", "Rust", "gRPC", "DePIN"],
    stars: 1420,
    forks: 310,
    githubUrl: undefined,
    demoUrl: undefined,
    badge: "GLOBAL WINNER",
    featured: true,
    metrics: { nodes: "12.4K+", latency: "14ms", uptime: "99.99%" },
  },
  {
    id: "kodex-sentinel",
    title: "KODEX_SENTINEL",
    tagline:
      "Real-time AI smart contract auditor & consensus vulnerability scanner.",
    category: "AI & Security",
    description:
      "Real-time AI security auditor that scans smart contracts for vulnerabilities during compilation using custom fine-tuned transformer models.",
    techStack: ["Python", "PyTorch", "LLM", "AST Parsing"],
    stars: 980,
    forks: 185,
    githubUrl: undefined,
    demoUrl: undefined,
    badge: "1st PLACE AI",
    featured: true,
    metrics: { audits: "8,500+", accuracy: "99.2%", speed: "1.2s" },
  },
  {
    id: "zk-pulse",
    title: "ZK_PULSE SHIELD",
    tagline:
      "Zero-Knowledge identity verification protocol with biometric zero-leakage.",
    category: "ZK & Privacy",
    description:
      "Cryptographic protocol enabling private biometric verification on EVM networks without revealing raw hash data or PII metadata.",
    techStack: ["Circom", "SnarkJS", "Solidity", "React"],
    stars: 870,
    forks: 142,
    githubUrl: undefined,
    demoUrl: undefined,
    badge: "GRAND PRIZE",
    featured: true,
    metrics: { proofs: "150K+", circuitTime: "320ms", gasUsed: "42K" },
  },
  {
    id: "hyper-bridge",
    title: "HYPER_RELAY INTEROP",
    tagline:
      "Zero-latency cross-chain packet relay engine with threshold multi-sig.",
    category: "Cross-Chain",
    description:
      "Decentralized relayer engine facilitating instant state transfers between Tendermint, Cosmos SDK, and EVM subnets.",
    techStack: ["Cosmos SDK", "IBC", "Go", "EVM"],
    stars: 640,
    forks: 92,
    githubUrl: undefined,
    demoUrl: undefined,
    badge: "TOP TRACK WINNER",
    featured: false,
    metrics: { totalVolume: "$45M+", txs: "1.2M", finality: "< 1s" },
  },
  {
    id: "vector-trade",
    title: "VECTOR_TRADE HFT",
    tagline:
      "Vectorized SIMD order matching engine running directly on WebAssembly.",
    category: "FinTech & Systems",
    description:
      "Ultra low-latency matching engine leveraging AVX-512 SIMD instructions compiled to WebAssembly for decentralized liquidity pools.",
    techStack: ["C++20", "WebAssembly", "TypeScript", "Solana"],
    stars: 520,
    forks: 88,
    githubUrl: undefined,
    demoUrl: undefined,
    badge: "1st PLACE MIT",
    featured: false,
    metrics: { tps: "250K", latency: "0.8ms", memory: "12MB" },
  },
  {
    id: "edge-vision-ai",
    title: "EDGE_VISION CORE",
    tagline:
      "Autonomous drone navigation AI optimized for NVIDIA Jetson microprocessors.",
    category: "Robotics & Edge AI",
    description:
      "Real-time spatial object tracking model compressed for embedded CUDA GPUs, enabling high-speed obstacle avoidance in GPS-denied arenas.",
    techStack: ["TensorRT", "CUDA", "C++", "ROS2"],
    stars: 790,
    forks: 160,
    githubUrl: undefined,
    demoUrl: undefined,
    badge: "GRAND WINNER",
    featured: false,
    metrics: { fps: "120 FPS", power: "15W", precision: "98.7%" },
  },
];

// CORE TEAM (8 Members)
export const CORE_TEAM_DATA: readonly TeamMember[] = [
  {
    id: "arjun-s",
    name: "ARJUN_S",
    role: "PROTOCOL ARCHITECT",
    handle: "@arjun_builds",
    specialization: "DePIN & Distributed Systems",
    winsCount: 8,
    bio: "Lead builder on Neon Mesh. Obsessed with distributed consensus, memory models, and kernel-level networking.",
    skills: ["Rust", "Solana", "gRPC", "C++"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "meera-v",
    name: "MEERA_V",
    role: "ZK RESEARCHER",
    handle: "@meera_zk",
    specialization: "Zero-Knowledge Cryptography",
    winsCount: 7,
    bio: "Designing succinct cryptographic proof systems and custom arithmetic circuits. ETHIndia Grand Winner.",
    skills: ["Circom", "SnarkJS", "Halo2", "Solidity"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "rohan-k",
    name: "ROHAN_K",
    role: "INFRA LEAD",
    handle: "@rohan_infra",
    specialization: "Cross-Chain & Systems",
    winsCount: 6,
    bio: "Building zero-downtime relayer nodes, high-throughput RPC indexers, and custom database plugins.",
    skills: ["Go", "Cosmos SDK", "ClickHouse", "Docker"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "zayn-x",
    name: "ZAYN_X",
    role: "AI ENGINEER",
    handle: "@zayn_ai",
    specialization: "Agentic AI & Security",
    winsCount: 6,
    bio: "Train multi-agent LLM systems and static analysis parsers. Grand Winner at Global AI Safety Hack.",
    skills: ["Python", "PyTorch", "CUDA", "LangGraph"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ananya-r",
    name: "ANANYA_R",
    role: "SMART CONTRACT AUDITOR",
    handle: "@ananya_sec",
    specialization: "EVM Invariants & Formal Verification",
    winsCount: 5,
    bio: "Specialist in smart contract security audits, reentrancy invariant testing, and bytecode analysis.",
    skills: ["Solidity", "Foundry", "Echidna", "Yul"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dev-p",
    name: "DEV_P",
    role: "HARDWARE LEAD",
    handle: "@dev_robotics",
    specialization: "ROS2 & Autonomous Systems",
    winsCount: 4,
    bio: "Hacking embedded hardware, Jetson microcontrollers, and autonomous swarm robotics protocols.",
    skills: ["C++", "ROS2", "LiDAR", "CUDA"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "kabir-m",
    name: "KABIR_M",
    role: "DEFI QUANT BUILDER",
    handle: "@kabir_quant",
    specialization: "High Frequency Trading & WASM",
    winsCount: 4,
    bio: "Architecting sub-millisecond order matching engines and SIMD math wrappers in WebAssembly.",
    skills: ["C++20", "WebAssembly", "Rust", "Solana"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "tara-s",
    name: "TARA_S",
    role: "FRONTEND & UI ARCHITECT",
    handle: "@tara_design",
    specialization: "Technical Brutalism & Systems UI",
    winsCount: 4,
    bio: "Crafting zero-lag industrial design systems and reactive dashboards for high-throughput protocols.",
    skills: ["React", "TypeScript", "Tailwind", "Three.js"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
];

// TEAM MEMBERS (4 Members)
export const TEAM_MEMBERS_DATA: readonly TeamMember[] = [
  {
    id: "vikram-n",
    name: "VIKRAM_N",
    role: "BACKEND ENGINEER",
    handle: "@vikram_dev",
    specialization: "gRPC & High-Scale Microservices",
    winsCount: 3,
    bio: "Building microservices, telemetry streaming endpoints, and state indexing pipelines.",
    skills: ["Go", "gRPC", "PostgreSQL", "Redis"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "riya-k",
    name: "RIYA_K",
    role: "ZK CIRCUIT DEVELOPER",
    handle: "@riya_zk",
    specialization: "SnarkJS & Identity Proofs",
    winsCount: 3,
    bio: "Focusing on polynomial commitment schemes and client-side zero-knowledge proof generation.",
    skills: ["Circom", "SnarkJS", "JavaScript", "Rust"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "siddharth-b",
    name: "SIDDHARTH_B",
    role: "SMART CONTRACT DEV",
    handle: "@sid_sol",
    specialization: "Anchor & Solana Programs",
    winsCount: 2,
    bio: "Developing custom Solana on-chain state transition rules and Anchor framework contracts.",
    skills: ["Rust", "Anchor", "Solana CLI", "TypeScript"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "neha-g",
    name: "NEHA_G",
    role: "DATA ENGINE RESEARCHER",
    handle: "@neha_data",
    specialization: "ClickHouse & SIMD Indexing",
    winsCount: 2,
    bio: "Optimizing database queries and log ingestion benchmarks for EVM historical state storage.",
    skills: ["Python", "SQL", "ClickHouse", "Docker"],
    github: undefined,
    twitter: undefined,
    linkedin: undefined,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
];

export const TEAM_DATA: readonly TeamMember[] = [
  ...CORE_TEAM_DATA,
  ...TEAM_MEMBERS_DATA,
];
