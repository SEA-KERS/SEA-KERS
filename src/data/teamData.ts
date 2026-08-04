import type { Project, TeamMember, WinRecord } from "../types";

// Data store for SEA_KERS / Builders Collective Website
// Showcasing Wins (20+), Projects, and Team (12 Members: 8 Core Team, 4 Team Members)

export const WINS_DATA: readonly WinRecord[] = [
  {
    "id": "win-01",
    "title": "Moondream Vision & Voice LLM",
    "hackathon": "E-Cell x BMSIT Code Red 2.0",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "moondream-voice",
    "tagline": "On-device local LLM for realtime vision and voice assistant.",
    "techStack": [
      "Moondream LLM",
      "Whisper Turbo",
      "Kokoro TTS",
      "Python"
    ],
    "description": "Built an on-device local LLM running locally for realtime vision + realtime voice assistant using Moondream LLM, Whisper Turbo STT, and Kokoro TTS.",
    "images": [
      "/images/wins/win-01/img-1.jpg",
      "/images/wins/win-01/img-2.jpg",
      "/images/wins/win-01/img-3.jpg",
      "/images/wins/win-01/img-4.jpg",
      "/images/wins/win-01/img-5.jpg",
      "/images/wins/win-01/img-6.jpg"
    ]
  },
  {
    "id": "win-02",
    "title": "Wearable AI Second Brain",
    "hackathon": "Google Developer Group Kristu Hackverse",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "GRAND PRIZE",
    "date": "2025",
    "projectRef": "second-brain",
    "tagline": "Wearable AI for continuous summarization and situational awareness.",
    "techStack": [
      "Embedded AI",
      "LLM",
      "Voice Analytics",
      "Python"
    ],
    "description": "Created a wearable AI second brain for continuous summarization, meeting notes generation, and real-time situational awareness.",
    "images": [
      "/images/wins/win-02/img-1.jpg",
      "/images/wins/win-02/img-2.jpg",
      "/images/wins/win-02/img-3.jpg",
      "/images/wins/win-02/img-4.jpg",
      "/images/wins/win-02/img-5.jpg",
      "/images/wins/win-02/img-6.jpg"
    ]
  },
  {
    "id": "win-03",
    "title": "Autonomous Vision Navigation",
    "hackathon": "IEEE X PES Confluence",
    "location": "Bengaluru, India",
    "track": "IEEE",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "autonomous-nav",
    "tagline": "On-device depth estimation model with vLLM navigation.",
    "techStack": [
      "vLLM",
      "Depth Estimation",
      "PyTorch",
      "ROS"
    ],
    "description": "Developed autonomous navigation system with an on-device depth estimation model integrated with vLLM based path planning.",
    "images": [
      "/images/wins/win-03/img-1.jpeg",
      "/images/wins/win-03/img-2.jpeg",
      "/images/wins/win-03/img-3.jpeg",
      "/images/wins/win-03/img-4.jpeg",
      "/images/wins/win-03/img-5.jpeg",
      "/images/wins/win-03/img-6.jpeg"
    ]
  },
  {
    "id": "win-04",
    "title": "DBOTT Healthcare Voice Assistant",
    "hackathon": "IVIS Lab X SIMBA GPT",
    "location": "Bengaluru, India",
    "track": "IISc",
    "award": "1ST PLACE",
    "date": "2025",
    "projectRef": "dbott-health",
    "tagline": "AI-based voice assistant for advanced patient management system.",
    "techStack": [
      "Voice AI",
      "FastAPI",
      "LLM",
      "HealthTech"
    ],
    "description": "Built DBOTT, an AI-powered voice assistant tailored for advanced patient management and clinical workflow automation.",
    "images": [
      "/images/wins/win-04/img-1.jpeg",
      "/images/wins/win-04/img-2.jpeg",
      "/images/wins/win-04/img-3.jpg",
      "/images/wins/win-04/img-4.jpg",
      "/images/wins/win-04/img-5.jpg",
      "/images/wins/win-04/img-6.jpg",
      "/images/wins/win-04/img-7.jpg"
    ]
  },
  {
    "id": "win-05",
    "title": "ROBERTT",
    "hackathon": "Hackverse Mumbai",
    "location": "Mumbai, India",
    "track": "ecell",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "robertt",
    "tagline": "Modular robotics intelligence and autonomous control platform.",
    "techStack": [
      "Robotics",
      "C++",
      "Embedded Systems",
      "Python"
    ],
    "description": "Engineered ROBERTT, a modular robotics & intelligence platform designed for adaptive control and edge decision-making.",
    "images": [
      "/images/wins/win-05/img-1.jpg",
      "/images/wins/win-05/img-2.jpg",
      "/images/wins/win-05/img-3.jpg",
      "/images/wins/win-05/img-4.jpeg",
      "/images/wins/win-05/img-5.jpeg",
      "/images/wins/win-05/img-6.jpg"
    ]
  },
  {
    "id": "win-06",
    "title": "Darshan Glasses",
    "hackathon": "IIC X Geenovate Foundation Hackathon",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "1ST PLACE",
    "date": "2025",
    "projectRef": "darshan-glasses",
    "tagline": "Smart assistive computer vision eyewear for visually impaired.",
    "techStack": [
      "Computer Vision",
      "Embedded Hardware",
      "Edge AI",
      "OpenCV"
    ],
    "description": "Built Darshan Glasses, smart assistive eyewear utilizing edge computer vision to provide real-time spatial guidance for visually impaired individuals.",
    "images": [
      "/images/wins/win-06/img-1.jpg",
      "/images/wins/win-06/img-2.jpg",
      "/images/wins/win-06/img-3.jpg",
      "/images/wins/win-06/img-4.jpeg",
      "/images/wins/win-06/img-5.jpeg",
      "/images/wins/win-06/img-6.jpg"
    ]
  },
  {
    "id": "win-07",
    "title": "Investigative AI",
    "hackathon": "Karnataka State Police X Presidency Namma Suraksha Hackathon",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "GRAND PRIZE",
    "date": "2025",
    "projectRef": "investigative-ai",
    "tagline": "Smart crime investigation & telemetry analysis platform.",
    "techStack": [
      "Data Analytics",
      "AI",
      "Python",
      "FastAPI"
    ],
    "description": "Created Investigative AI, an advanced crime intelligence and telemetry analysis system for public safety agencies.",
    "images": [
      "/images/wins/win-07/img-1.jpeg",
      "/images/wins/win-07/img-2.jpg",
      "/images/wins/win-07/img-3.jpg",
      "/images/wins/win-07/img-4.jpg",
      "/images/wins/win-07/img-5.jpg",
      "/images/wins/win-07/img-6.jpg",
      "/images/wins/win-07/img-7.jpg",
      "/images/wins/win-07/img-8.jpg"
    ]
  },
  {
    "id": "win-08",
    "title": "EO/IR Sensor Classification System",
    "hackathon": "HAL Aerothon 2025",
    "location": "Bengaluru, India",
    "track": "HAL",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "eo-ir-classifier",
    "tagline": "Video image classification & target identification system.",
    "techStack": [
      "PyTorch",
      "YOLO",
      "Sensor Fusion",
      "C++"
    ],
    "description": "Developed an electro-optical and infrared (EO/IR) sensor video image classification system for real-time aerial target identification.",
    "images": [
      "/images/wins/win-08/img-1.jpg",
      "/images/wins/win-08/img-2.jpg",
      "/images/wins/win-08/img-3.jpg",
      "/images/wins/win-08/img-4.jpg",
      "/images/wins/win-08/img-5.jpg",
      "/images/wins/win-08/img-6.jpg"
    ]
  },
  {
    "id": "win-09",
    "title": "DocCall Pre-Consultation Agent",
    "hackathon": "IIT BBS X Jazzee GenAI Hackathon",
    "location": "Bhubaneswar, India",
    "track": "ecell",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "doc-call-agent",
    "tagline": "Automated conversational calling agent for clinical intake.",
    "techStack": [
      "Voice AI",
      "Twilio",
      "LangChain",
      "Python"
    ],
    "description": "Engineered an automated AI calling agent for doctors to conduct pre-consultation patient intake and triage automatically.",
    "images": [
      "/images/wins/win-09/img-1.jpg",
      "/images/wins/win-09/img-2.jpg",
      "/images/wins/win-09/img-3.jpg",
      "/images/wins/win-09/img-4.jpg",
      "/images/wins/win-09/img-5.jpg",
      "/images/wins/win-09/img-6.jpg"
    ]
  },
  {
    "id": "win-10",
    "title": "GAJA",
    "hackathon": "Geeks for Geeks CBC Hackathon 1.0",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "1ST PLACE",
    "date": "2025",
    "projectRef": "gaja-uav",
    "tagline": "Heavy-duty autonomous UAV payload & navigation system.",
    "techStack": [
      "PX4",
      "ArduPilot",
      "Embedded C++",
      "Robotics"
    ],
    "description": "Designed GAJA, a heavy-duty autonomous UAV system with custom flight dynamics and payload release telemetry.",
    "images": [
      "/images/wins/win-10/img-1.jpg",
      "/images/wins/win-10/img-2.jpg",
      "/images/wins/win-10/img-3.jpg",
      "/images/wins/win-10/img-4.jpg",
      "/images/wins/win-10/img-5.jpg",
      "/images/wins/win-10/img-6.jpg"
    ]
  },
  {
    "id": "win-11",
    "title": "GAJA",
    "hackathon": "IEEE RVCE SPS Hackathon",
    "location": "Bengaluru, India",
    "track": "IEEE",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "gaja-signal",
    "tagline": "Signal processing & telemetry relay for autonomous drones.",
    "techStack": [
      "DSP",
      "MATLAB",
      "Python",
      "Wireless Telemetry"
    ],
    "description": "Developed advanced signal processing algorithms for GAJA UAV flight stability and low-latency RF control.",
    "images": [
      "/images/wins/win-11/img-1.jpg",
      "/images/wins/win-11/img-2.jpg",
      "/images/wins/win-11/img-3.jpg",
      "/images/wins/win-11/img-4.jpg",
      "/images/wins/win-11/img-5.jpg",
      "/images/wins/win-11/img-6.jpg"
    ]
  },
  {
    "id": "win-12",
    "title": "Darshan Glasses",
    "hackathon": "Tamil Nadu State Innovation Hackathon",
    "location": "Tamil Nadu, India",
    "track": "ecell",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "darshan-tn",
    "tagline": "Portable computer vision assistive system for rural mobility.",
    "techStack": [
      "Raspberry Pi",
      "TensorFlow Lite",
      "OpenCV"
    ],
    "description": "Deployed a lightweight version of Darshan Glasses optimized for low-power edge vision processing.",
    "images": []
  },
  {
    "id": "win-13",
    "title": "SalesCall AI Agent",
    "hackathon": "BTI Ignite Foundation Hackfinity Hackathon",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "1ST PLACE",
    "date": "2025",
    "projectRef": "sales-call-ai",
    "tagline": "Automated sales agent with seamless CRM lead handover.",
    "techStack": [
      "Voice AI",
      "WebRTC",
      "Node.js",
      "PostgreSQL"
    ],
    "description": "Built an autonomous AI calling agent for outbound sales qualifying, scheduling, and automatic CRM handoff.",
    "images": [
      "/images/wins/win-13/img-1.png",
      "/images/wins/win-13/img-2.jpg",
      "/images/wins/win-13/img-3.jpg",
      "/images/wins/win-13/img-4.png",
      "/images/wins/win-13/img-5.jpg",
      "/images/wins/win-13/img-6.jpg"
    ]
  },
  {
    "id": "win-14",
    "title": "VAANI",
    "hackathon": "IISc X TATA Steel MSME 4.0 Hackathon",
    "location": "Bengaluru, India",
    "track": "IISc",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "vaani-industrial",
    "tagline": "Voice-driven telemetry & machine diagnostics for MSMEs.",
    "techStack": [
      "Speech Recognition",
      "Industrial IoT",
      "Python"
    ],
    "description": "Created VAANI, a voice-controlled machine diagnostics & operational monitoring agent for industrial MSME shopfloors.",
    "images": [
      "/images/wins/win-14/img-1.png",
      "/images/wins/win-14/img-2.png",
      "/images/wins/win-14/img-3.png"
    ]
  },
  {
    "id": "win-15",
    "title": "GAJA",
    "hackathon": "MSME 5.0 Hackathon",
    "location": "India",
    "track": "MSME",
    "award": "GRAND PRIZE",
    "date": "2025",
    "projectRef": "gaja-msme",
    "tagline": "Autonomous aerial inspection & logistics for manufacturing units.",
    "techStack": [
      "Drone Tech",
      "Edge Compute",
      "IoT"
    ],
    "description": "Adapted GAJA UAV platform for MSME facility inspection and local automated payload logistics.",
    "images": []
  },
  {
    "id": "win-16",
    "title": "Airavatha",
    "hackathon": "Ai Brewery Vibe Coding Hackathon",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "WINNERS",
    "date": "2025",
    "projectRef": "airavatha-ai",
    "tagline": "High-velocity LLM pipeline code generation framework.",
    "techStack": [
      "LLM",
      "Python",
      "TypeScript",
      "Vite"
    ],
    "description": "Created Airavatha, a high-speed code synthesis and pipeline execution framework for rapid prototyping.",
    "images": [
      "/images/wins/win-16/img-1.webp",
      "/images/wins/win-16/img-2.jpg",
      "/images/wins/win-16/img-3.jpg",
      "/images/wins/win-16/img-4.webp",
      "/images/wins/win-16/img-5.webp",
      "/images/wins/win-16/img-6.jpg"
    ]
  },
  {
    "id": "win-17",
    "title": "Darshan Glasses",
    "hackathon": "UST Sight 2.0 Project Presentation",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "BEST INNOVATION",
    "date": "2025",
    "projectRef": "darshan-ust",
    "tagline": "Wearable spatial awareness system for visually impaired.",
    "techStack": [
      "Computer Vision",
      "Embedded AI",
      "Hardware"
    ],
    "description": "Presented Darshan Glasses, winning Best Innovation award for social impact and real-time edge processing.",
    "images": [
      "/images/wins/win-17/img-1.jpg",
      "/images/wins/win-17/img-2.jpg",
      "/images/wins/win-17/img-3.jpg",
      "/images/wins/win-17/img-4.jpg",
      "/images/wins/win-17/img-5.jpg",
      "/images/wins/win-17/img-6.jpg"
    ]
  },
  {
    "id": "win-18",
    "title": "Posture Correction",
    "hackathon": "Lion Circuits X PCB Cupid Hardware Hackathon 1.0",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "1ST PLACE",
    "date": "2025",
    "projectRef": "posture-correct",
    "tagline": "IoT bio-feedback sensor wearable for spinal ergonomics.",
    "techStack": [
      "PCB Design",
      "BLE",
      "Microcontrollers",
      "C++"
    ],
    "description": "Designed and etched custom PCB wearable with real-time IMU bio-feedback for posture tracking.",
    "images": [
      "/images/wins/win-18/img-1.jpg",
      "/images/wins/win-18/img-2.png",
      "/images/wins/win-18/img-3.jpg",
      "/images/wins/win-18/img-4.jpg",
      "/images/wins/win-18/img-5.jpg",
      "/images/wins/win-18/img-6.jpg"
    ]
  },
  {
    "id": "win-19",
    "title": "Darshan Glasses",
    "hackathon": "AIT Project Presentation",
    "location": "Bengaluru, India",
    "track": "ecell",
    "award": "BEST PROJECT",
    "date": "2025",
    "projectRef": "darshan-ait",
    "tagline": "Real-time assistive AI hardware architecture.",
    "techStack": [
      "Edge AI",
      "Embedded Systems",
      "Sensors"
    ],
    "description": "Awarded Best Project for hardware architecture and optical sensor integration in Darshan Glasses.",
    "images": [
      "/images/wins/win-19/img-1.png",
      "/images/wins/win-19/img-2.png",
      "/images/wins/win-19/img-3.png"
    ]
  },
  {
    "id": "win-20",
    "title": "GAJA",
    "hackathon": "AICTE Fellowship",
    "location": "India",
    "track": "ecell",
    "award": "FELLOWSHIP",
    "date": "2025",
    "projectRef": "gaja-aicte",
    "tagline": "National research fellowship for autonomous aerial robotics.",
    "techStack": [
      "Aerial Robotics",
      "AI",
      "Autonomous Systems"
    ],
    "description": "Secured prestigious AICTE Fellowship to further expand research and deployment of GAJA autonomous drone systems.",
    "images": [
      "/images/wins/win-20/img-1.jpg",
      "/images/wins/win-20/img-2.jpg",
      "/images/wins/win-20/img-3.jpg",
      "/images/wins/win-20/img-4.jpg",
      "/images/wins/win-20/img-5.jpg",
      "/images/wins/win-20/img-6.jpg"
    ]
  }
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
