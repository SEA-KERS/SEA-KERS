import type { Project } from "../types";

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
