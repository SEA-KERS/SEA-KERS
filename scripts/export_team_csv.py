import csv
import json
import os

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
csv_path = os.path.join(base_dir, 'team.csv')

team_members = [
    {
        "id": "arjun-s",
        "name": "ARJUN_S",
        "role": "PROTOCOL ARCHITECT",
        "handle": "@arjun_builds",
        "specialization": "DePIN & Distributed Systems",
        "winsCount": 8,
        "bio": "Lead builder on Neon Mesh. Obsessed with distributed consensus, memory models, and kernel-level networking.",
        "skills": "Rust;Solana;gRPC;C++",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/arjun-s.jpg"
    },
    {
        "id": "meera-v",
        "name": "MEERA_V",
        "role": "ZK RESEARCHER",
        "handle": "@meera_zk",
        "specialization": "Zero-Knowledge Cryptography",
        "winsCount": 7,
        "bio": "Designing succinct cryptographic proof systems and custom arithmetic circuits. ETHIndia Grand Winner.",
        "skills": "Circom;SnarkJS;Halo2;Solidity",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/meera-v.jpg"
    },
    {
        "id": "rohan-k",
        "name": "ROHAN_K",
        "role": "INFRA LEAD",
        "handle": "@rohan_infra",
        "specialization": "Cross-Chain & Systems",
        "winsCount": 6,
        "bio": "Building zero-downtime relayer nodes, high-throughput RPC indexers, and custom database plugins.",
        "skills": "Go;Cosmos SDK;ClickHouse;Docker",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/rohan-k.jpg"
    },
    {
        "id": "zayn-x",
        "name": "ZAYN_X",
        "role": "AI ENGINEER",
        "handle": "@zayn_ai",
        "specialization": "Agentic AI & Security",
        "winsCount": 6,
        "bio": "Train multi-agent LLM systems and static analysis parsers. Grand Winner at Global AI Safety Hack.",
        "skills": "Python;PyTorch;CUDA;LangGraph",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/zayn-x.jpg"
    },
    {
        "id": "ananya-r",
        "name": "ANANYA_R",
        "role": "SMART CONTRACT AUDITOR",
        "handle": "@ananya_sec",
        "specialization": "EVM Invariants & Formal Verification",
        "winsCount": 5,
        "bio": "Specialist in smart contract security audits, reentrancy invariant testing, and bytecode analysis.",
        "skills": "Solidity;Foundry;Echidna;Yul",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/ananya-r.jpg"
    },
    {
        "id": "dev-p",
        "name": "DEV_P",
        "role": "HARDWARE LEAD",
        "handle": "@dev_robotics",
        "specialization": "ROS2 & Autonomous Systems",
        "winsCount": 4,
        "bio": "Hacking embedded hardware, Jetson microcontrollers, and autonomous swarm robotics protocols.",
        "skills": "C++;ROS2;LiDAR;CUDA",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/dev-p.jpg"
    },
    {
        "id": "vikram-n",
        "name": "VIKRAM_N",
        "role": "BACKEND ENGINEER",
        "handle": "@vikram_dev",
        "specialization": "gRPC & High-Scale Microservices",
        "winsCount": 3,
        "bio": "Building microservices, telemetry streaming endpoints, and state indexing pipelines.",
        "skills": "Go;gRPC;PostgreSQL;Redis",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/vikram-n.jpg"
    },
    {
        "id": "riya-k",
        "name": "RIYA_K",
        "role": "ZK CIRCUIT DEVELOPER",
        "handle": "@riya_zk",
        "specialization": "SnarkJS & Identity Proofs",
        "winsCount": 3,
        "bio": "Focusing on polynomial commitment schemes and client-side zero-knowledge proof generation.",
        "skills": "Circom;SnarkJS;JavaScript;Rust",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/riya-k.jpg"
    },
    {
        "id": "siddharth-b",
        "name": "SIDDHARTH_B",
        "role": "SMART CONTRACT DEV",
        "handle": "@sid_sol",
        "specialization": "Anchor & Solana Programs",
        "winsCount": 2,
        "bio": "Developing custom Solana on-chain state transition rules and Anchor framework contracts.",
        "skills": "Rust;Anchor;Solana CLI;TypeScript",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/siddharth-b.jpg"
    },
    {
        "id": "neha-g",
        "name": "NEHA_G",
        "role": "DATA ENGINE RESEARCHER",
        "handle": "@neha_data",
        "specialization": "ClickHouse & SIMD Indexing",
        "winsCount": 2,
        "bio": "Optimizing database queries and log ingestion benchmarks for EVM historical state storage.",
        "skills": "Python;SQL;ClickHouse;Docker",
        "github": "",
        "twitter": "",
        "linkedin": "",
        "avatar": "/images/team/neha-g.jpg"
    }
]

with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['id', 'name', 'role', 'handle', 'specialization', 'winsCount', 'bio', 'skills', 'github', 'twitter', 'linkedin', 'avatar'])
    writer.writeheader()
    writer.writerows(team_members)

print("Exported team.csv successfully!")
