import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticBtn from './MagneticBtn'

// Game engineering backdrop renders
import fpsCover from '../assets/Games/posters/fpsCover.jpg'
import fpsDuel from '../assets/Games/posters/fpsDuel.jpg'
import fpsInterior from '../assets/Games/posters/fpsInterior.jpg'
import owsCover from '../assets/Games/posters/owsCover.jpg'
import soulsWideDark from '../assets/Games/posters/soulsWideDark.jpg'
import soulsCenter from '../assets/Games/posters/soulsCenter.jpg'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   TECH STACK DOMAINS — Comprehensive Unreal Engine 5.4 / C++23 Slices
═══════════════════════════════════════════════════════════════════ */
const SKILL_DOMAINS = [
  {
    id: 'engine',
    index: '01',
    label: 'ENGINE CORE',
    score: 96,
    headline: 'Unreal Engine 5.4 & C++23',
    subtitle: 'Low-Level Subsystems, TaskGraph Concurrency & Memory Arenas',
    projectTitle: 'VOID BREACH',
    projectSubtitle: 'Orbital CQC Duel & Chaos Physics Destruction',
    projectEngine: 'Unreal Engine 5.4 · C++23',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    bgImage: fpsCover,
    codeSnippet: [
      '// Subsystem Lifecycle & TaskGraph Concurrency',
      'UCLASS() class UGameCoreSubsystem : public UEngineSubsystem {',
      '    GENERATED_BODY()',
      'public:',
      '    virtual void Initialize(FSubsystemCollectionBase& Collection) override;',
      '    void DispatchPhysicsTick() {',
      '        FFunctionGraphTask::CreateAndDispatchWhenReady([]() {',
      '            Chaos::FPhysicsSolver::TickSubstep(0.00833f);',
      '        }, TStatId(), nullptr, ENamedThreads::AnyHiPriThreadHiPriTask);',
      '    }',
      '};'
    ],
    techItems: [
      {
        name: 'Modern C++ (C++20 / C++23)',
        badge: 'CORE LANGUAGE',
        level: '96%',
        desc: 'Memory arenas, move semantics, template metaprogramming, SIMD intrinsics, zero heap alloc in tick loops.',
        chips: ['C++23', 'Memory Arenas', 'SIMD Intrinsics', 'Zero Heap Alloc']
      },
      {
        name: 'UE5.4 Engine Subsystems',
        badge: 'ARCHITECTURE',
        level: '95%',
        desc: 'Decoupled UEngineSubsystem and UGameInstanceSubsystem lifecycles with zero singleton anti-patterns.',
        chips: ['EngineSubsystems', 'WorldSubsystems', 'Lifecycle Management', 'Event Buses']
      },
      {
        name: 'TaskGraph Concurrency',
        badge: 'MULTI-THREADING',
        level: '94%',
        desc: 'Parallel physics substep dispatch, async raycasting sweeps, and lock-free work-stealing queues.',
        chips: ['TaskGraph', 'Lock-Free Queues', 'Async Raycasts', 'Worker Threads']
      },
      {
        name: 'Data-Oriented Design (DOD)',
        badge: 'MEMORY & CACHE',
        level: '92%',
        desc: 'Struct-of-Arrays (SoA) memory layouts, cache-aligned data traversals, Mass Entity integration.',
        chips: ['Mass Entity', 'Struct-of-Arrays', 'Cache Alignment', 'Entity Processors']
      }
    ],
    industryTools: ['UE5.4', 'Visual Studio 2022', 'Unreal Insights', 'Tracy Profiler', 'Perforce (P4)'],
    architecture:
      'Custom Subsystem lifecycles · TaskGraph multi-threading · Data-Oriented Design (DOD) · Arena allocators · Zero heap fragmentation',
    metric: { label: 'TICK BUDGET', value: '<0.38ms' },
    benchmark: '0.34ms @ 120 FPS on Ryzen 7 7800X3D (zero GC stalls)',
    tags: ['UE5.4', 'C++23', 'Subsystems', 'TaskGraph', 'DOD', 'Arena Alloc'],
    deepDive: {
      philosophy:
        'Game loops cannot tolerate dynamic heap allocation spikes. Every subsystem operates on fixed-capacity ring buffers, linear frame arenas, and cache-coherent data arrays.',
      subsystems: [
        {
          name: 'Memory Architecture',
          detail:
            'Custom linear scratchpads for frame-transient vectors, avoiding malloc contention across worker threads.'
        },
        {
          name: 'TaskGraph Concurrency',
          detail:
            'Asynchronous broadphase query jobs and raycast sweeps scheduled on AnyHiPriThread with explicit completion gates.'
        },
        {
          name: 'UObject Lifecycle',
          detail:
            'Deterministic destruction protocols and fast garbage collection clustering (FGCObject) for critical gameplay actors.'
        }
      ],
      deliverables: [
        'Custom Engine Subsystem Architecture',
        'Parallel TaskGraph Dispatcher',
        'Cache-Friendly DOD Component Slices'
      ]
    }
  },
  {
    id: 'combat',
    index: '02',
    label: 'COMBAT SYSTEMS',
    score: 94,
    headline: 'Gameplay Ability System & Combo FSM',
    subtitle: 'Deterministic GAS AttributeSets & Motion-Warped Melee',
    projectTitle: 'VOID BREACH // MELEE',
    projectSubtitle: 'Motion-Warped GAS Combat & Frame Buffers',
    projectEngine: 'Unreal Engine 5.4 · GAS Framework',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    bgImage: fpsDuel,
    codeSnippet: [
      '// Server-Verified GAS Execution & Motion Warping',
      'void UCombatComponent::ExecuteMeleeAttack(FGameplayTag AttackTag) {',
      '    FGameplayAbilitySpec* Spec = AbilitySystem->FindAbilitySpecFromTag(AttackTag);',
      '    if (Spec && AbilitySystem->TryActivateAbility(Spec->Handle)) {',
      '        MotionWarpComp->AddOrUpdateWarpTargetFromTransform(',
      '            FName("TargetLock"), BestTarget->GetActorTransform());',
      '        CommitAbilityCost(Spec->Handle);',
      '    }',
      '}'
    ],
    techItems: [
      {
        name: 'Gameplay Ability System (GAS)',
        badge: 'COMBAT FRAMEWORK',
        level: '96%',
        desc: 'Modular GameplayAbilities, custom AttributeSets (Health, Stamina, Poise), GameplayEffects & Tags.',
        chips: ['GAS', 'AttributeSets', 'GameplayTags', 'GameplayEffects', 'AbilityTasks']
      },
      {
        name: 'Motion Warping & Procedural IK',
        badge: 'KINEMATICS',
        level: '93%',
        desc: 'Target-locked root motion warping, Pose Search / Motion Matching, dynamic Control Rig foot placement.',
        chips: ['Motion Warping', 'Control Rig', 'Motion Matching', 'Procedural IK']
      },
      {
        name: 'Combat Finite State Machine',
        badge: 'GAMEPLAY FSM',
        level: '95%',
        desc: 'Deterministic frame-buffered input queuing, attack cancel windows, poise & stagger depletion.',
        chips: ['Combat FSM', 'Input Buffering', 'Cancel Windows', 'Poise Breakdown']
      },
      {
        name: 'Hitbox Socket Verification',
        badge: 'HIT REGISTRATION',
        level: '94%',
        desc: 'Swept sphere / capsule traces anchored to weapon sockets with sub-step sampling to prevent pass-through.',
        chips: ['Socket Sweeps', 'Sub-Stepping', 'Hit Reactions', 'Interpolation']
      }
    ],
    industryTools: ['GAS Framework', 'Control Rig', 'Motion Matching', 'Anim Notifies', 'Visual Studio 2022'],
    architecture:
      'GameplayAbilitySystem (GAS) · Custom AttributeSets · Motion Warping · Frame-accurate anim notifies · Poise & stamina depletion state machine',
    metric: { label: 'INPUT LATENCY', value: '0-FRAME' },
    benchmark: 'Buffered input polling with sub-frame animation cancel windows',
    tags: [
      'GAS',
      'AttributeSets',
      'GameplayTags',
      'Motion Warping',
      'Hitboxes',
      'Combo FSM'
    ],
    deepDive: {
      philosophy:
        'Melee combat feel lives or dies on frame-level responsiveness and authoritative hit registration. Combos are driven by deterministic Finite State Machines with input buffering windows.',
      subsystems: [
        {
          name: 'GAS AttributeSets',
          detail:
            'Clamped health, stamina, poise, and posture attributes with custom PreAttributeChange and PostGameplayEffectExecute logic.'
        },
        {
          name: 'Root Motion & Warping',
          detail:
            'Dynamically scales montage translation and rotation vectors to align with locked combat targets while preventing mesh penetration.'
        },
        {
          name: 'Hitbox Verification',
          detail:
            'Swept sphere / capsule traces anchored to weapon sockets with sub-step sampling to eliminate weapon pass-through at high attack speeds.'
        }
      ],
      deliverables: [
        'Full GAS Ability Tree',
        'Directional Motion Warping',
        'Frame-Accurate Melee Combat Framework'
      ]
    }
  },
  {
    id: 'graphics',
    index: '03',
    label: 'GRAPHICS / VFX',
    score: 92,
    headline: 'HLSL / USF Shaders & Niagara GPU',
    subtitle: 'Custom Depth-Stencil Shading & 120k GPU Particle Sims',
    projectTitle: 'ASHEN VEIL',
    projectSubtitle: 'Gothic Shading, Lumen Dynamic GI & Niagara GPU FX',
    projectEngine: 'Unreal Engine 5.4 · HLSL & USF',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    bgImage: soulsWideDark,
    codeSnippet: [
      '// Custom Post-Process Depth-Stencil Outline USF',
      'float4 MainPS(FVertexFactoryInterpolantsVSToPS Input) : SV_Target0 {',
      '    float2 UV = Input.Position.xy * View.ViewSizeAndInvSize.zw;',
      '    uint Stencil = SceneTexturesStruct.CustomStencilTexture.Load(int3(Input.Position.xy, 0));',
      '    float Edge = EvaluateSobelDepthStencil(UV, Stencil);',
      '    float3 FinalColor = lerp(SceneColor.rgb, EmissiveGlowColor.rgb * 2.5f, Edge);',
      '    return float4(FinalColor, 1.0f);',
      '}'
    ],
    techItems: [
      {
        name: 'HLSL / USF Compute Shaders',
        badge: 'GPU SHADERS',
        level: '93%',
        desc: 'Custom vertex, pixel, and compute shaders, Sobel depth-stencil edge outline post-process passes.',
        chips: ['HLSL', 'USF', 'Compute Shaders', 'Sobel Filter', 'Custom Depth-Stencil']
      },
      {
        name: 'Render Dependency Graph (RDG)',
        badge: 'RENDER PIPELINE',
        level: '92%',
        desc: 'Engine-level compute passes and custom post-processing integrated into Unreal RDG pipelines.',
        chips: ['RDG Passes', 'RenderGraph', 'Compute Dispatch', 'Buffer Binding']
      },
      {
        name: 'Niagara GPU Simulations (120k+)',
        badge: 'PARTICLE FX',
        level: '94%',
        desc: '120k+ GPU particles with curl-noise vector fields, distance field mesh collisions, and ribbon trails.',
        chips: ['Niagara GPU', 'Vector Fields', 'Distance Fields', 'Ribbon FX']
      },
      {
        name: 'Lumen Dynamic GI & Nanite Budgets',
        badge: 'GEOMETRY & LIGHT',
        level: '91%',
        desc: 'Hardware ray-tracing tuning, surface cache optimization, Nanite fallback meshes for dynamic colliders.',
        chips: ['Lumen Dynamic GI', 'Nanite', 'VSM Shadow Bias', 'Ray Tracing']
      }
    ],
    industryTools: ['HLSL / USF', 'Niagara GPU', 'RenderDoc', 'Lumen Dynamic GI', 'Nanite Geometry'],
    architecture:
      'Custom HLSL USF shaders · Post-process depth-stencil outlines · 120,000 GPU Niagara particles · Lumen dynamic GI tuning · Nanite mesh budgets',
    metric: { label: 'GPU SIM @ 4K', value: '1.08ms' },
    benchmark:
      '120k GPU particles simulated on RTX 4070 @ 4K with <1.1ms render pass',
    tags: ['HLSL', 'USF', 'Niagara GPU', 'Custom Stencils', 'Lumen', 'Nanite'],
    deepDive: {
      philosophy:
        'Rendering pipeline efficiency requires understanding how Unreal translates HLSL and material nodes into native graphics API calls, optimizing shader complexity and draw calls.',
      subsystems: [
        {
          name: 'Custom USF Global Shaders',
          detail:
            'Engine-level post-processing passes with custom compute shaders integrated into the Unreal Render Dependency Graph (RDG).'
        },
        {
          name: 'Niagara GPU Simulations',
          detail:
            'Direct GPU compute emitters using curl-noise vector fields, distance fields, and custom Niagara simulation stages.'
        },
        {
          name: 'Lumen & Nanite Tuning',
          detail:
            'Fallback meshes, custom virtual shadow map bias, and geometric cluster optimization for steady 60+ FPS performance.'
        }
      ],
      deliverables: [
        'Post-Process Depth Stencil Shaders',
        'GPU Niagara Particle FX Systems',
        'RDG Render Pipeline Integrations'
      ]
    }
  },
  {
    id: 'network',
    index: '04',
    label: 'MULTIPLAYER & IRIS',
    score: 95,
    headline: 'Server-Auth Replication & Iris',
    subtitle: '60Hz Netcode, Replication Graph & Sub-Frame Rewind Buffers',
    projectTitle: 'VOID BREACH // NETCODE',
    projectSubtitle: 'Iris Replication Graph & Server Rewind Buffers',
    projectEngine: 'Unreal Engine 5.4 · Dedicated Server',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    bgImage: fpsInterior,
    codeSnippet: [
      '// Iris Spatial Replication Graph & FastArraySerializer',
      'void UIrisNetworkSubsystem::RegisterReplicatedActor(APawn* InPawn) {',
      '    UE::Net::FIrisReplicationGraph::RegisterActor(InPawn);',
      '    TReplicationGrid<64>& Grid = GetSpatialSpatialGrid();',
      '    Grid.AddActor(InPawn->GetNetDriver(), InPawn);',
      '    PawnInventorySerializer.MarkArrayDirty();',
      '}'
    ],
    techItems: [
      {
        name: 'Server-Authoritative Netcode (60Hz)',
        badge: 'MULTIPLAYER ARCH',
        level: '95%',
        desc: '60Hz dedicated server architecture, autonomous client prediction, authoritative server reconciliation.',
        chips: ['Dedicated Server', 'Client Prediction', 'Server Reconciliation', '60Hz Netcode']
      },
      {
        name: 'Iris Protocol & Spatial Graph',
        badge: 'REPLICATION GRAPH',
        level: '93%',
        desc: 'Next-gen multi-threaded object replication, spatial grid clustering reducing bandwidth by 58%.',
        chips: ['Iris Protocol', 'Replication Graph', 'Spatial Grid', 'Bandwidth Culling']
      },
      {
        name: 'Lag Compensation & Rewind Buffers',
        badge: 'ANTI-CHEAT',
        level: '94%',
        desc: 'Circular rewind buffers (1000ms history) for timestamped player hitbox rewind and hit verification.',
        chips: ['Lag Compensation', 'Rewind Buffers', 'Anti-Cheat', 'Hit Validation']
      },
      {
        name: 'Delta Serialization (FastArray)',
        badge: 'SERIALIZATION',
        level: '92%',
        desc: 'FFastArraySerializer delta compression for dynamic player combat states and inventory replication.',
        chips: ['FastArraySerializer', 'Delta Compression', 'RPC Batching', 'UDP Sockets']
      }
    ],
    industryTools: ['Dedicated Server', 'Iris Protocol', 'Replication Graph', 'FastArraySerializer', 'Wireshark'],
    architecture:
      'Iris replication system · Custom Replication Graph spatial clusters · FFastArraySerializer · Lag-compensated rewind hit validation · 60Hz dedicated server',
    metric: { label: 'BANDWIDTH', value: '−58%' },
    benchmark:
      'Iris spatial filtering reduced packet overhead by 58% across 64 concurrent players',
    tags: [
      'Replication Graph',
      'Iris',
      'FastArraySerializer',
      'Lag Compensation',
      'Rollback',
      '60Hz'
    ],
    deepDive: {
      philosophy:
        'In high-stakes multiplayer, the server is king. Client prediction gives instant responsiveness, while authoritative rewind buffers guarantee cheat-free, accurate resolution.',
      subsystems: [
        {
          name: 'Iris Replication Architecture',
          detail:
            'Leveraging UE5.4 Iris multi-threaded replication protocol for decoupled object state replication and zero main-thread serialization stalling.'
        },
        {
          name: 'Fast Array Serialization',
          detail:
            'Delta-compressed dynamic inventory and player combat states with FFastArraySerializer to transmit only modified item elements.'
        },
        {
          name: 'Lag-Compensated Rewind',
          detail:
            'Server rewinds target player skeletal colliders back to the exact network timestamp of the firing client to confirm valid hits.'
        }
      ],
      deliverables: [
        'Custom Replication Graph Nodes',
        'Delta Netcode Serializers',
        'Authoritative Hit Registration'
      ]
    }
  },
  {
    id: 'ai',
    index: '05',
    label: 'TACTICAL AI',
    score: 91,
    headline: 'Behavior Trees, EQS & StateTrees',
    subtitle: 'Reactive Spatial Navigation, Threat Aggregation & Detour Crowds',
    projectTitle: 'ASHEN VEIL // BOSS AI',
    projectSubtitle: 'Tactical Spatial EQS & Hierarchical StateTrees',
    projectEngine: 'Unreal Engine 5.4 · Two-Bone IK',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    bgImage: soulsCenter,
    codeSnippet: [
      '// Spatial Environmental Query & StateTree Evaluation',
      'void UEnemyAIController::EvaluateFlankPath() {',
      '    FEQSQueryRequest FlankQuery(FindFlankPathQueryTemplate, this);',
      '    FlankQuery.Execute(EEnvQueryRunMode::SingleResult, this,',
      '        &UEnemyAIController::OnFlankQueryFinished);',
      '    StateTreeComp->SendEvent(TAG_AI_State_Reposition);',
      '}'
    ],
    techItems: [
      {
        name: 'Hierarchical StateTrees',
        badge: 'TACTICAL AI',
        level: '93%',
        desc: 'Event-driven state machine architecture replacing rigid tick-based behavior trees with clean data bindings.',
        chips: ['StateTrees', 'Behavior Trees', 'Event-Driven', 'State Transitions']
      },
      {
        name: 'Environmental Query System (EQS)',
        badge: 'SPATIAL INTELLIGENCE',
        level: '94%',
        desc: 'Custom C++ EQS spatial generators scoring 120 candidate points in 0.18ms for flanking and cover.',
        chips: ['EQS Queries', 'Spatial Scoring', 'Cover Systems', 'Flanking Logic']
      },
      {
        name: 'AIPerception Sensory Aggregator',
        badge: 'SENSORY AGGREGATOR',
        level: '91%',
        desc: 'Multi-sensory threat aggregation (sight, hearing, damage stimulus) with dynamic target weighting.',
        chips: ['AIPerception', 'Threat Aggregation', 'Stimulus Senses', 'Target Scoring']
      },
      {
        name: 'Detour Crowd Avoidance (RVO)',
        badge: 'NAVIGATION & CROWDS',
        level: '90%',
        desc: 'Recast NavMesh dynamic invokers with RVO velocity obstacle resolution preventing horde corridor jams.',
        chips: ['Detour Crowds', 'NavMesh Invokers', 'RVO Avoidance', 'Squad Tactics']
      }
    ],
    industryTools: ['StateTrees', 'Behavior Trees', 'EQS Queries', 'AIPerception', 'Detour Crowds'],
    architecture:
      'Custom EQS spatial queries · AIPerception sight & sound aggregation · Hierarchical StateTrees · Detour crowd avoidance · Dynamic NavMesh invokers',
    metric: { label: 'EQS QUERY', value: '0.18ms' },
    benchmark:
      'Spatial grid of 120 points evaluated and scored in 0.18ms per query',
    tags: [
      'BehaviorTrees',
      'EQS',
      'StateTrees',
      'AIPerception',
      'Detour Crowd',
      'NavMesh'
    ],
    deepDive: {
      philosophy:
        'Enemies should feel intelligent and coordinated, not like scripted drones. Tactical spatial queries allow AI to find real cover, flank players, and react to line-of-sight breaches.',
      subsystems: [
        {
          name: 'Environmental Query System (EQS)',
          detail:
            'Custom C++ test generators evaluating visibility traces, player cone of sight, and optimal cover height with distance weighting.'
        },
        {
          name: 'Hierarchical StateTrees',
          detail:
            'Next-gen state machine behavior replacing rigid behavior trees with clean data bindings, transitions, and direct event routing.'
        },
        {
          name: 'Detour Crowd Avoidance',
          detail:
            'Group flocking and velocity obstacle resolution allowing large hordes of enemies to advance without clogging narrow corridors.'
        }
      ],
      deliverables: [
        'Custom C++ EQS Tests',
        'Hierarchical StateTree Assets',
        'Crowd Coordination Subsystems'
      ]
    }
  },
  {
    id: 'profiling',
    index: '06',
    label: 'PROFILING & OPTIMIZATION',
    score: 98,
    headline: 'Unreal Insights, RenderDoc & Tooling',
    subtitle: 'Zero PSO Stutter, Memory Footprint & GPU Trace Auditing',
    projectTitle: 'ONE WRONG STEP',
    projectSubtitle: 'Precision Kinematics, PSO Pre-Caching & UnitGraph',
    projectEngine: 'Unreal Engine 5.3 · Profiling & Tooling',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    bgImage: owsCover,
    codeSnippet: [
      '// Scoped CPU Profiler Macro & Pre-compiled PSO Cache',
      'void UProfilingManager::CaptureScopedTick() {',
      '    TRACE_CPUPROFILER_EVENT_SCOPE(TEXT("PhysicsSubstep_Tick"));',
      '    if (FPSOPrecompileCache::NeedsWarming()) {',
      '        FPSOPrecompileCache::WarmCachedPipelines();',
      '    }',
      '    GRenderDocCapture->TriggerManualFrameCapture();',
      '}'
    ],
    techItems: [
      {
        name: 'Unreal Insights Instrumentation',
        badge: 'CPU/GPU TRACING',
        level: '96%',
        desc: 'Microsecond-accurate timeline trace scopes across Game, Render, and RHI threads to isolate stalls.',
        chips: ['Unreal Insights', 'Trace Scopes', 'Thread Auditing', 'Lock Contention']
      },
      {
        name: 'PSO Pre-Caching Pipeline',
        badge: 'ANTI-HITCHING',
        level: '95%',
        desc: 'Automated Pipeline State Object pre-compilation bundles completely eliminating runtime shader hitches.',
        chips: ['PSO Cache', 'Shader Pre-Warm', 'Zero Stutter', 'Asset Auditing']
      },
      {
        name: 'RenderDoc GPU Tracing & VRAM',
        badge: 'DRAW CALL AUDITING',
        level: '94%',
        desc: 'Draw call inspection, overdraw heatmaps, and texture memory footprint analysis to fit tight VRAM budgets.',
        chips: ['RenderDoc', 'Draw Calls', 'Overdraw Heatmaps', 'VRAM Audits']
      },
      {
        name: 'Enterprise Production Pipeline',
        badge: 'VERSION CONTROL',
        level: '95%',
        desc: 'Perforce (P4) stream branching, typemap locks, Git LFS for binary assets, Visual Studio 2022, UBT/UAT.',
        chips: ['Perforce (P4)', 'Git LFS', 'Visual Studio 2022', 'JetBrains Rider']
      }
    ],
    industryTools: ['Unreal Insights', 'RenderDoc', 'PSO Cache', 'Perforce Helix Core', 'Tracy Profiler'],
    architecture:
      'Unreal Insights CPU trace scopes · RenderDoc GPU pipeline captures · Pre-compiled PSO caches · LLM tag and asset auditing · Stat UnitGraph monitoring',
    metric: { label: 'FRAME TARGET', value: '60+ FPS' },
    benchmark:
      'Zero shader compilation hitches with automated PSO pre-warm bundles',
    tags: [
      'Unreal Insights',
      'RenderDoc',
      'PSO Cache',
      'Memory Tracing',
      'Stat UnitGraph',
      'LLM Tools'
    ],
    deepDive: {
      philosophy:
        'Performance is a feature built from day one, not patched in at the end. Continuous profiling prevents memory leaks, CPU thread stalls, and shader compilation hitches.',
      subsystems: [
        {
          name: 'Unreal Insights Tracing',
          detail:
            'Channel-based event instrumentation across RenderThread, GameThread, and RHIThread to isolate microsecond-level bottlenecks.'
        },
        {
          name: 'Pipeline State Object (PSO) Caching',
          detail:
            'Comprehensive user-run PSO capture passes bundled into pre-compile caches, eliminating runtime hitching.'
        },
        {
          name: 'RenderDoc GPU Inspection',
          detail:
            'Detailed draw call inspection, overdraw heatmaps, and texture memory footprint analysis to fit tight VRAM budgets.'
        }
      ],
      deliverables: [
        'Automated PSO Pre-Compiler',
        'Custom Insights Trace Channels',
        'Performance Budget Test Harness'
      ]
    }
  }
]

/* ═══════════════════════════════════════════════════════════════════
   UNWOVEN GLSL SHADERS (User's Exact Threaded Loom Architecture)
═══════════════════════════════════════════════════════════════════ */
const VERTEX_SHADER = /* glsl */ `
  attribute float aThread;   // ribbon index, 0 .. threads-1
  attribute float aRim;      // -1 at the ribbon's top edge, +1 at the bottom

  uniform float uTime;
  uniform float uHalfWidth;  // half the viewport width, in pixels
  uniform float uZone;       // depth of the tear zone at each edge, in pixels
  uniform float uStrength;   // global 0..1 master switch, tweened on load
  uniform float uWobble;     // 0 when user prefers reduced motion
  uniform float uSeed;       // per-card, so two cards never unravel alike

  varying vec2  vUv;
  varying float vTear;       // 0 = woven, 1 = fully unravelled
  varying float vRim;
  varying float vRandom;     // this ribbon's random value, for fragment stage

  float hash(float n) {
    return fract(sin(n * 127.1 + 311.7) * 43758.5453);
  }

  void main() {
    vUv = uv;
    vRim = aRim;

    vec4 world = modelMatrix * vec4(position, 1.0);
    float x = world.x;

    // How far into a tear zone is this vertex?
    float left  = 1.0 - smoothstep(-uHalfWidth, -uHalfWidth + uZone, x);
    float right = smoothstep(uHalfWidth - uZone, uHalfWidth, x);
    float tear  = max(left, right) * uStrength;

    // Zones never overlap the centre, so the sign of x is the escape direction.
    float direction = x < 0.0 ? -1.0 : 1.0;

    float randomA = hash(aThread + uSeed * 57.0);
    float randomB = hash(aThread * 3.7 + uSeed * 91.0);
    vRandom = randomA;

    // Bias the ramp so the card stays readable in center, then unravels fast toward edges
    float t = pow(tear, 1.4);

    // Each ribbon escapes at its own speed (comb of threads)
    float run = t * (70.0 + randomA * 440.0);
    run *= 0.85 + 0.15 * sin(uTime * (1.0 + randomB * 2.0) + randomA * 6.2831);
    world.x += direction * run;

    // Loosen vertically
    world.y += (randomA - 0.5) * 180.0 * t * t;

    // Flutter along displaced length
    world.y += sin(world.x * 0.018 + uTime * (1.6 + randomA * 2.2) + randomA * 6.2831)
               * (5.0 + 14.0 * randomA) * t * uWobble;

    vTear = tear;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D uMap;
  uniform vec2  uCardSize;    // px
  uniform float uRadius;      // px
  uniform float uImageAspect; // width / height of the texture

  varying vec2  vUv;
  varying float vTear;
  varying float vRim;
  varying float vRandom;

  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    float tear = vTear;
    float rim  = abs(vRim); // 0 at core, 1 at edge

    // --- Open the weave ---
    float coreWidth = mix(0.85, 0.18 + vRandom * 0.14, smoothstep(0.0, 0.85, tear));
    float threadAlpha = 1.0 - smoothstep(coreWidth - 0.10, coreWidth + 0.06, rim);
    threadAlpha = mix(1.0, threadAlpha, smoothstep(0.03, 0.30, tear));

    // --- Card silhouette with rounded corners ---
    vec2 p = (vUv - 0.5) * uCardSize;
    float cardAlpha = 1.0 - smoothstep(-1.5, 0.5, sdRoundBox(p, uCardSize * 0.5, uRadius));

    float fade  = 1.0 - smoothstep(0.70, 1.0, tear) * 0.85;
    float alpha = cardAlpha * threadAlpha * fade;
    if (alpha < 0.003) discard;

    // --- Sample image cover-fit ---
    float cardAspect = uCardSize.x / uCardSize.y;
    vec2 scale = cardAspect > uImageAspect
      ? vec2(1.0, uImageAspect / cardAspect)
      : vec2(cardAspect / uImageAspect, 1.0);
    vec3 color = texture2D(uMap, (vUv - 0.5) * scale + 0.5).rgb;

    // --- Physical read for each ribbon ---
    color *= 1.0 - tear * 0.45 * rim * rim;                                    // edge shadow
    color += tear * 0.35 * vec3(0.94, 0.32, 0.26) * (1.0 - smoothstep(0.0, 0.45, rim)); // red-orange cyber ember glint!
    color = mix(color, vec3(0.03, 0.03, 0.04), smoothstep(0.60, 1.0, tear) * 0.95); // dissolve into dark canvas!

    gl_FragColor = vec4(color, alpha);
  }
`

/* ═══════════════════════════════════════════════════════════════════
   Ribbon Geometry Generator (Shared buffer across cards)
═══════════════════════════════════════════════════════════════════ */
function buildRibbonGeometry (THREE, width, height, threads, segments) {
  const columns = segments + 1
  const perThread = columns * 2
  const total = threads * perThread

  const positions = new Float32Array(total * 3)
  const uvs = new Float32Array(total * 2)
  const rims = new Float32Array(total)
  const threadIds = new Float32Array(total)
  const indices = []

  let v = 0
  for (let t = 0; t < threads; t++) {
    for (let row = 0; row < 2; row++) {
      const vy = (t + row) / threads // 0 at bottom, 1 at top
      for (let c = 0; c < columns; c++) {
        const ux = c / segments
        positions[v * 3 + 0] = (ux - 0.5) * width
        positions[v * 3 + 1] = (vy - 0.5) * height
        positions[v * 3 + 2] = 0
        uvs[v * 2 + 0] = ux
        uvs[v * 2 + 1] = vy
        rims[v] = row === 0 ? -1 : 1
        threadIds[v] = t
        v++
      }
    }

    const base = t * perThread
    for (let c = 0; c < segments; c++) {
      const bl = base + c
      const br = base + c + 1
      const tl = base + columns + c
      const tr = base + columns + c + 1
      indices.push(bl, br, tl, br, tr, tl)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geometry.setAttribute('aRim', new THREE.BufferAttribute(rims, 1))
  geometry.setAttribute('aThread', new THREE.BufferAttribute(threadIds, 1))
  geometry.setIndex(indices)
  return geometry
}

/* ═══════════════════════════════════════════════════════════════════
   CANVAS CARD TEXTURE GENERATOR — High-End AAA Game Dev Spec Sheet
═══════════════════════════════════════════════════════════════════ */
function drawCanvasRoundRect (ctx, x, y, w, h, r = 6) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }
}

function wrapCanvasText (ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  if (!text) return y
  const words = text.split(' ')
  let curLine = ''
  let curY = y
  let linesDrawn = 0

  for (let n = 0; n < words.length; n++) {
    const testLine = curLine + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && n > 0) {
      linesDrawn++
      if (linesDrawn >= maxLines && n < words.length) {
        let trimmed = curLine
        while (
          ctx.measureText(trimmed + '...').width > maxWidth &&
          trimmed.length > 0
        ) {
          trimmed = trimmed.substring(0, trimmed.length - 1)
        }
        ctx.fillText(trimmed.trim() + '...', x, curY)
        return curY + lineHeight
      }
      ctx.fillText(curLine.trim(), x, curY)
      curLine = words[n] + ' '
      curY += lineHeight
    } else {
      curLine = testLine
    }
  }
  ctx.fillText(curLine.trim(), x, curY)
  return curY + lineHeight
}

function renderDomainToCanvas (ctx, d, bgImg) {
  const w = 1600
  const h = 900
  ctx.clearRect(0, 0, w, h)

  // 1. Dark Base Background
  ctx.fillStyle = '#08080d'
  ctx.fillRect(0, 0, w, h)

  // 2. Draw Key Art Backdrop (Subtle cinematic render)
  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    ctx.save()
    ctx.globalAlpha = 0.2
    const imgAspect = bgImg.naturalWidth / bgImg.naturalHeight
    const canvasAspect = w / h
    let dw, dh, dx, dy
    if (imgAspect > canvasAspect) {
      dh = h
      dw = h * imgAspect
      dx = (w - dw) / 2
      dy = 0
    } else {
      dw = w
      dh = w / imgAspect
      dx = 0
      dy = (h - dh) / 2
    }
    ctx.drawImage(bgImg, dx, dy, dw, dh)
    ctx.restore()
  }

  // 3. Cyber Grid Lines & Deep Radial Vignette
  ctx.save()
  ctx.strokeStyle = 'rgba(239, 81, 67, 0.035)'
  ctx.lineWidth = 1
  const gridSize = 40
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  const grad = ctx.createRadialGradient(
    w / 2,
    h / 2,
    w * 0.15,
    w / 2,
    h / 2,
    w * 0.65
  )
  grad.addColorStop(0, 'rgba(6, 7, 10, 0.45)')
  grad.addColorStop(1, 'rgba(4, 5, 8, 0.95)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
  ctx.restore()

  // 4. Outer HUD Tech Inset Frame & Corner Brackets
  const pad = 32
  ctx.save()
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)'
  ctx.lineWidth = 1
  ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2)

  // Minimal refined corner brackets (24px length, 2.5px stroke)
  const bLen = 24
  ctx.strokeStyle = '#ef5143'
  ctx.lineWidth = 2.5
  // Top Left
  ctx.beginPath()
  ctx.moveTo(pad, pad + bLen)
  ctx.lineTo(pad, pad)
  ctx.lineTo(pad + bLen, pad)
  ctx.stroke()
  // Top Right
  ctx.beginPath()
  ctx.moveTo(w - pad - bLen, pad)
  ctx.lineTo(w - pad, pad)
  ctx.lineTo(w - pad, pad + bLen)
  ctx.stroke()
  // Bottom Left
  ctx.beginPath()
  ctx.moveTo(pad, h - pad - bLen)
  ctx.lineTo(pad, h - pad)
  ctx.lineTo(pad + bLen, h - pad)
  ctx.stroke()
  // Bottom Right
  ctx.beginPath()
  ctx.moveTo(w - pad - bLen, h - pad)
  ctx.lineTo(w - pad, h - pad)
  ctx.lineTo(w - pad, h - pad - bLen)
  ctx.stroke()
  ctx.restore()

  // 5. Header HUD Status Strip
  ctx.save()
  const headH = 46
  ctx.fillStyle = 'rgba(12, 13, 19, 0.92)'
  ctx.fillRect(pad + 1, pad + 1, w - (pad + 1) * 2, headH)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
  ctx.beginPath()
  ctx.moveTo(pad, pad + headH)
  ctx.lineTo(w - pad, pad + headH)
  ctx.stroke()

  // Left: Red dot + Spec Title
  ctx.fillStyle = '#ef5143'
  ctx.beginPath()
  ctx.arc(pad + 24, pad + 23, 4, 0, Math.PI * 2)
  ctx.fill()

  ctx.font = "600 13px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = '#ffffff'
  ctx.letterSpacing = '1.8px'
  ctx.fillText(`ARCHITECTURAL LOADOUT  //  SPEC ${d.index} : ${d.label}`, pad + 38, pad + 28)

  // Center: Sub-heading
  ctx.font = "500 11px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.38)'
  ctx.letterSpacing = '2px'
  ctx.fillText('AAA SYSTEM ARCHITECTURE & PRODUCTION TELEMETRY', w / 2 - 190, pad + 28)

  // Right: Clean engine pill
  const engText = d.projectEngine || 'UNREAL ENGINE 5.4 · C++23'
  ctx.font = "600 11px 'MainFont', monospace, sans-serif"
  const engW = ctx.measureText(engText).width + 24
  const engX = w - pad - engW - 16
  ctx.fillStyle = 'rgba(239, 81, 67, 0.12)'
  ctx.strokeStyle = 'rgba(239, 81, 67, 0.35)'
  ctx.lineWidth = 1
  drawCanvasRoundRect(ctx, engX, pad + 11, engW, 24, 3)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#ef5143'
  ctx.fillText(engText, engX + 12, pad + 27)
  ctx.restore()

  // 6. Domain Identity & Headline
  const contentLeft = pad + 28
  ctx.save()

  // Domain specification tag
  ctx.font = "600 11px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = '#ef5143'
  ctx.letterSpacing = '1.8px'
  ctx.fillText(`// SPECIFICATION DOMAIN: ${d.label}`, contentLeft, 114)

  // Headline
  ctx.font = "700 36px 'MainFont', sans-serif"
  ctx.fillStyle = '#ffffff'
  ctx.fillText(d.headline, contentLeft, 154)

  // Subtitle
  ctx.font = "400 16px 'SecondaryFont', sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.68)'
  ctx.fillText(d.subtitle, contentLeft, 184)

  // Horizontal Rule with red accent pip (NO colliding segmented bar)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(contentLeft, 204)
  ctx.lineTo(w - contentLeft, 204)
  ctx.stroke()

  ctx.fillStyle = '#ef5143'
  ctx.fillRect(contentLeft, 203, 140, 2)
  ctx.restore()

  // 7. Left Section: 2x2 Clean Technical Capability Grid (Compact & Sleek)
  const gridX = contentLeft
  const gridW = 920
  const cellW = (gridW - 20) / 2 // 450px
  const cellH = 215
  const row0Y = 215
  const row1Y = 445

  if (d.techItems && d.techItems.length > 0) {
    d.techItems.forEach((item, i) => {
      const colIdx = i % 2
      const rowIdx = Math.floor(i / 2)
      const cX = gridX + colIdx * (cellW + 20)
      const cY = rowIdx === 0 ? row0Y : row1Y

      ctx.save()
      // Cell background card
      ctx.fillStyle = 'rgba(13, 15, 22, 0.92)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      drawCanvasRoundRect(ctx, cX, cY, cellW, cellH, 7)
      ctx.fill()
      ctx.stroke()

      // Top-left red accent tab
      ctx.fillStyle = '#ef5143'
      drawCanvasRoundRect(ctx, cX + 16, cY, 36, 2.5, [0, 0, 2, 2])
      ctx.fill()

      // 1. Category label
      ctx.font = "600 10px 'MainFont', monospace, sans-serif"
      ctx.fillStyle = '#ef5143'
      ctx.letterSpacing = '1.8px'
      ctx.fillText(`0${i + 1} // ${item.badge}`, cX + 16, cY + 24)

      // 2. System / Tech Name
      ctx.font = "700 15px 'MainFont', sans-serif"
      ctx.fillStyle = '#ffffff'
      ctx.letterSpacing = '0.5px'
      ctx.fillText(item.name, cX + 16, cY + 48)

      // 3. Hairline divider
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cX + 16, cY + 60)
      ctx.lineTo(cX + cellW - 16, cY + 60)
      ctx.stroke()

      // 4. Description (wrapped, 3 lines max)
      ctx.font = "400 12.5px 'SecondaryFont', sans-serif"
      ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
      wrapCanvasText(ctx, item.desc, cX + 16, cY + 80, cellW - 32, 18, 3)

      // 5. Capability Chips (along bottom)
      let chipX = cX + 16
      let chipY = cY + 184
      item.chips.forEach(chip => {
        ctx.font = "600 10px 'SecondaryFont', monospace, sans-serif"
        const chipW = ctx.measureText(chip).width + 16
        if (chipX + chipW > cX + cellW - 14) {
          chipX = cX + 16
          chipY += 22
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
        ctx.lineWidth = 1
        drawCanvasRoundRect(ctx, chipX, chipY - 12, chipW, 18, 3)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
        ctx.fillText(chip, chipX + 8, chipY)
        chipX += chipW + 6
      })

      ctx.restore()
    })
  }

  // 8. Right Section: Unified Telemetry & Production Console (Compact)
  const rX = gridX + gridW + 24
  const rW = w - contentLeft - rX
  const rY = row0Y
  const rH = cellH * 2 + 15 // 445px

  ctx.save()
  // Console background
  ctx.fillStyle = 'rgba(11, 12, 18, 0.95)'
  ctx.strokeStyle = 'rgba(239, 81, 67, 0.3)'
  ctx.lineWidth = 1
  drawCanvasRoundRect(ctx, rX, rY, rW, rH, 7)
  ctx.fill()
  ctx.stroke()

  // Console Corner Bracket Accents
  ctx.strokeStyle = '#ef5143'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(rX + rW - 16, rY)
  ctx.lineTo(rX + rW, rY)
  ctx.lineTo(rX + rW, rY + 16)
  ctx.stroke()

  // ════ SUB-PANEL 1: Performance Telemetry & Frame Budget ════
  const p1Y = rY + 14
  ctx.font = "600 10.5px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = '#ef5143'
  ctx.letterSpacing = '1.8px'
  ctx.fillText('// PERFORMANCE TELEMETRY & FRAME BUDGET', rX + 18, p1Y + 10)

  // Big Metric
  ctx.font = "700 34px 'MainFont', sans-serif"
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = '#ef5143'
  ctx.shadowBlur = 10
  ctx.fillText(d.metric.value, rX + 18, p1Y + 48)
  ctx.shadowBlur = 0

  // Metric Label
  ctx.font = "600 11px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.letterSpacing = '1px'
  ctx.fillText(`( ${d.metric.label} )`, rX + 18 + ctx.measureText(d.metric.value).width + 12, p1Y + 36)

  // Benchmark detail line
  ctx.font = "400 12px 'SecondaryFont', sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.fillText(d.benchmark, rX + 18, p1Y + 70)

  // Visual Frame Budget Meter
  const barW = rW - 36
  const barH = 6
  const barY = p1Y + 84
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
  drawCanvasRoundRect(ctx, rX + 18, barY, barW, barH, 3)
  ctx.fill()

  // Cost Fill
  ctx.fillStyle = '#ef5143'
  drawCanvasRoundRect(ctx, rX + 18, barY, Math.min(barW, Math.max(26, barW * 0.16)), barH, 3)
  ctx.fill()

  ctx.font = "500 10px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
  ctx.letterSpacing = '1px'
  ctx.fillText(`TICK COST: ${d.metric.value}   |   120 FPS FRAME CEILING: 8.33ms`, rX + 18, barY + 16)

  // Hairline Divider 1
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(rX + 16, p1Y + 114)
  ctx.lineTo(rX + rW - 16, p1Y + 114)
  ctx.stroke()

  // ════ SUB-PANEL 2: Shipped Production Project ════
  const p2Y = p1Y + 126
  ctx.font = "600 10.5px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = '#ef5143'
  ctx.letterSpacing = '1.8px'
  ctx.fillText('// PROVEN IN PRODUCTION ARCHITECTURE', rX + 18, p2Y + 8)

  ctx.font = "700 16px 'MainFont', sans-serif"
  ctx.fillStyle = '#ffffff'
  ctx.fillText(d.projectTitle, rX + 18, p2Y + 28)

  ctx.font = "500 11.5px 'SecondaryFont', monospace, sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
  ctx.fillText(`// ${d.projectEngine}`, rX + 18, p2Y + 46)

  if (d.deepDive && d.deepDive.deliverables) {
    d.deepDive.deliverables.slice(0, 2).forEach((del, dIdx) => {
      const delY = p2Y + 68 + dIdx * 20
      ctx.fillStyle = '#ef5143'
      ctx.font = "700 12px 'MainFont', sans-serif"
      ctx.fillText('✓', rX + 18, delY)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.font = "400 12px 'SecondaryFont', sans-serif"
      ctx.fillText(del, rX + 32, delY)
    })
  }

  // Hairline Divider 2
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(rX + 16, p2Y + 116)
  ctx.lineTo(rX + rW - 16, p2Y + 116)
  ctx.stroke()

  // ════ SUB-PANEL 3: AAA Industry Toolchain ════
  const p3Y = p2Y + 128
  ctx.font = "600 10.5px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.letterSpacing = '1.8px'
  ctx.fillText('// PRODUCTION TOOLCHAIN & PIPELINE', rX + 18, p3Y + 8)

  let toolX = rX + 18
  let toolY = p3Y + 28
  const tools =
    d.industryTools || [
      'Unreal Engine 5.4',
      'Visual Studio 2022',
      'Unreal Insights',
      'RenderDoc',
      'Perforce'
    ]

  tools.forEach(tool => {
    ctx.font = "600 10.5px 'MainFont', monospace, sans-serif"
    const tWidth = ctx.measureText(tool).width + 16
    if (toolX + tWidth > rX + rW - 16) {
      toolX = rX + 18
      toolY += 28
    }
    ctx.fillStyle = 'rgba(239, 81, 67, 0.1)'
    ctx.strokeStyle = 'rgba(239, 81, 67, 0.35)'
    ctx.lineWidth = 1
    drawCanvasRoundRect(ctx, toolX, toolY - 12, tWidth, 20, 3)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.fillText(tool, toolX + 8, toolY + 2)
    toolX += tWidth + 6
  })

  ctx.restore()

  // 9. Technical Tag Badges (Along bottom)
  ctx.save()
  const tagY = h - pad - 30

  // Hairline Divider across bottom
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(contentLeft, tagY - 14)
  ctx.lineTo(w - contentLeft, tagY - 14)
  ctx.stroke()

  ctx.font = "600 11.5px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  ctx.letterSpacing = '1.5px'
  ctx.fillText('SUBSYSTEM TAGS:', contentLeft, tagY + 5)

  let tagX = contentLeft + 155
  d.tags.forEach(tag => {
    ctx.font = "600 11px 'MainFont', monospace, sans-serif"
    const tagWidth = ctx.measureText(tag).width + 20

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)'
    ctx.lineWidth = 1
    drawCanvasRoundRect(ctx, tagX, tagY - 12, tagWidth, 22, 3)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.fillText(tag, tagX + 10, tagY + 4)

    tagX += tagWidth + 8
  })

  // Tap Hint on bottom right
  ctx.font = "600 12px 'MainFont', monospace, sans-serif"
  ctx.fillStyle = '#ef5143'
  ctx.letterSpacing = '1px'
  ctx.fillText(
    '[ CLICK CARD TO EXPAND DEEP-DIVE BLUEPRINT ↗ ]',
    w - contentLeft - 370,
    tagY + 5
  )
  ctx.restore()
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT — Unwoven Pinned Scrollable Tech Stack Showcase
═══════════════════════════════════════════════════════════════════ */
const UnwovenSkills = () => {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)

  const [activeDomain, setActiveDomain] = useState(SKILL_DOMAINS[0])
  const activeDomRef = useRef(SKILL_DOMAINS[0])
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedModal, setSelectedModal] = useState(null)
  const [isDraggingState, setIsDraggingState] = useState(false)

  // Dynamic Three.js lazy loader via IntersectionObserver
  const [threeReady, setThreeReady] = useState(Boolean(window.THREE))

  const scrollTriggerInstanceRef = useRef(null)

  useEffect(() => {
    if (window.THREE) {
      setThreeReady(true)
      return
    }

    const loadThree = () => {
      if (window.THREE) {
        setThreeReady(true)
        return
      }
      if (document.getElementById('three-cdn-script')) return
      const script = document.createElement('script')
      script.id = 'three-cdn-script'
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
      script.async = true
      script.onload = () => {
        setThreeReady(true)
      }
      document.head.appendChild(script)
    }

    if (!sectionRef.current) {
      loadThree()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadThree()
            observer.disconnect()
          }
        })
      },
      { rootMargin: '600px 0px' }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* ═══════════════════════════════════════════════════════════════════
     THREE.JS ENGINE + GSAP SCROLLTRIGGER PIN INTEGRATION
  ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!threeReady || !stageRef.current || !sectionRef.current) return
    const THREE = window.THREE
    const stage = stageRef.current
    const section = sectionRef.current

    const CONFIG = {
      threads: 26,
      segments: 28,
      cardRadius: 20
    }

    let renderer = null
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    stage.replaceChildren(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100)

    const shared = {
      uTime: { value: 0 },
      uHalfWidth: { value: 1 },
      uZone: { value: 1 },
      uStrength: { value: 0 },
      uWobble: { value: 1 },
      uCardSize: { value: new THREE.Vector2(1, 1) },
      uRadius: { value: CONFIG.cardRadius }
    }

    // Build textures & materials for each Tech Stack Domain Card
    const slots = SKILL_DOMAINS.map((dom, i) => {
      const canvas = document.createElement('canvas')
      canvas.width = 1600
      canvas.height = 900
      const ctx = canvas.getContext('2d')

      // Initial synchronous render onto canvas
      renderDomainToCanvas(ctx, dom, null)

      const texture = new THREE.CanvasTexture(canvas)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
      texture.generateMipmaps = false

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uMap: { value: texture },
          uSeed: { value: (i + 1) * 0.817 },
          uImageAspect: { value: 16 / 9 },
          uTime: shared.uTime,
          uHalfWidth: shared.uHalfWidth,
          uZone: shared.uZone,
          uStrength: shared.uStrength,
          uWobble: shared.uWobble,
          uCardSize: shared.uCardSize,
          uRadius: shared.uRadius
        }
      })

      // Asynchronously load the key art backdrop image
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        renderDomainToCanvas(ctx, dom, img)
        texture.needsUpdate = true
      }
      img.src = dom.bgImage

      return { domain: dom, texture, material }
    })

    const cards = []
    let geometry = null
    let cardWidth = 0,
      cardHeight = 0,
      pitch = 0,
      stripSpan = 0
    let viewportWidth = 0,
      viewportHeight = 0
    let totalScrollSpan = 0

    function rebuildStrip () {
      cards.forEach(c => scene.remove(c.mesh))
      cards.length = 0
      if (geometry) geometry.dispose()

      geometry = buildRibbonGeometry(
        THREE,
        cardWidth,
        cardHeight,
        CONFIG.threads,
        CONFIG.segments
      )

      // Enough cards to fill viewport plus slack on both edges
      const count = Math.max(12, Math.ceil((viewportWidth + pitch * 4) / pitch))
      stripSpan = count * pitch
      totalScrollSpan = (SKILL_DOMAINS.length - 1) * pitch

      for (let i = 0; i < count; i++) {
        const slot = slots[i % slots.length]
        const mesh = new THREE.Mesh(geometry, slot.material)
        mesh.frustumCulled = false
        scene.add(mesh)
        cards.push({ mesh, baseX: i * pitch, slotIndex: i % slots.length })
      }
    }

    function resize () {
      if (!stage) return
      viewportWidth = stage.clientWidth
      viewportHeight = stage.clientHeight || 580

      renderer.setSize(viewportWidth, viewportHeight)
      camera.left = -viewportWidth / 2
      camera.right = viewportWidth / 2
      camera.top = viewportHeight / 2
      camera.bottom = -viewportHeight / 2
      camera.updateProjectionMatrix()

      // Responsive container width: outer card covers screen generously
      const isMobile = viewportWidth < 768
      if (isMobile) {
        cardWidth = Math.min(viewportWidth * 0.94, 600)
        cardHeight = Math.min(viewportHeight * 0.75, cardWidth * (9 / 16))
      } else {
        // Desktop: Proportional 16:9 card that majestically covers screen (~88% width, ~84% height)
        const targetW = viewportWidth * 0.88
        const targetH = viewportHeight * 0.84
        if (targetW / (16 / 9) <= targetH) {
          cardWidth = Math.min(targetW, 1680)
          cardHeight = cardWidth * (9 / 16)
        } else {
          cardHeight = Math.min(targetH, 945)
          cardWidth = cardHeight * (16 / 9)
        }
      }
      pitch = cardWidth + Math.max(32, cardWidth * 0.07)

      shared.uHalfWidth.value = viewportWidth / 2
      // Tear zone calibrated so the card is solid in center, and unravels upon exit
      shared.uZone.value = Math.max(50, viewportWidth * 0.08)
      shared.uCardSize.value.set(cardWidth, cardHeight)

      rebuildStrip()
    }

    /* ── SCROLLTRIGGER PIN SETUP ── */
    const scrollProgressRef = { current: 0 }
    const dragOffsetRef = { current: 0 }
    let currentRenderOffset = 0

    gsap.to(shared.uStrength, {
      value: 1,
      duration: 1.4,
      ease: 'power3.inOut',
      delay: 0.2
    })

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=240%',
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      refreshPriority: 1,
      onUpdate: self => {
        scrollProgressRef.current = self.progress
      }
    })

    scrollTriggerInstanceRef.current = pinTrigger
    ScrollTrigger.refresh()

    /* ── Pointer Drag interaction (allows manual tactile nudge) ── */
    let dragging = false
    let hasMoved = false
    let startX = 0,
      lastX = 0

    const onPointerDown = e => {
      dragging = true
      hasMoved = false
      startX = e.clientX
      lastX = e.clientX
      setIsDraggingState(true)
      stage.setPointerCapture(e.pointerId)
    }

    const onPointerMove = e => {
      if (!dragging) return
      const dx = e.clientX - lastX
      if (Math.abs(e.clientX - startX) > 6) {
        hasMoved = true
      }
      dragOffsetRef.current -= dx * 1.2
      lastX = e.clientX
    }

    const onPointerUp = e => {
      if (!dragging) return
      dragging = false
      setIsDraggingState(false)

      // Smoothly spring drag offset back into alignment with scroll progress
      gsap.to(dragOffsetRef, { current: 0, duration: 0.9, ease: 'power2.out' })

      // If user tapped without dragging, detect clicked card
      if (!hasMoved) {
        const rect = stage.getBoundingClientRect()
        const clickX = e.clientX - rect.left - viewportWidth / 2
        let closestCard = null
        let closestDist = Infinity
        cards.forEach(c => {
          const dist = Math.abs(c.mesh.position.x - clickX)
          if (dist < closestDist) {
            closestDist = dist
            closestCard = c
          }
        })
        if (closestCard && closestDist < cardWidth * 0.58) {
          const clickedDom = slots[closestCard.slotIndex].domain
          setSelectedModal(clickedDom)
        }
      }
    }

    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', onPointerUp)
    stage.addEventListener('pointercancel', onPointerUp)

    /* ── Viewport Visibility Observer (Saves massive GPU/CPU when off-screen) ── */
    let isVisible = true
    const visibilityObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting
        })
      },
      { rootMargin: '300px 0px' }
    )
    visibilityObserver.observe(section)

    /* ── Render ticker loop — smoothly driven by scrollProgress ── */
    const ticker = time => {
      if (!isVisible) return

      shared.uTime.value = time

      // Calculate target offset strictly from ScrollTrigger progress
      const targetOffset =
        scrollProgressRef.current * totalScrollSpan + dragOffsetRef.current
      currentRenderOffset += (targetOffset - currentRenderOffset) * 0.12

      const half = stripSpan / 2
      let minCenterDist = Infinity
      let centerDomain = null
      let centerIdx = 0

      for (const card of cards) {
        const x =
          (((card.baseX - currentRenderOffset) % stripSpan) + stripSpan) %
          stripSpan
        const posX = x - half
        card.mesh.position.x = posX

        const distFromCenter = Math.abs(posX)
        if (distFromCenter < minCenterDist) {
          minCenterDist = distFromCenter
          centerDomain = slots[card.slotIndex].domain
          centerIdx = card.slotIndex
        }
      }

      // Update active telemetry domain when a new card takes center stage
      if (centerDomain && centerDomain.id !== activeDomRef.current.id) {
        activeDomRef.current = centerDomain
        setActiveDomain(centerDomain)
        setActiveIdx(centerIdx)
      }

      renderer.render(scene, camera)
    }

    gsap.ticker.add(ticker)
    window.addEventListener('resize', resize)
    resize()

    return () => {
      visibilityObserver.disconnect()
      gsap.ticker.remove(ticker)
      window.removeEventListener('resize', resize)
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerup', onPointerUp)
      stage.removeEventListener('pointercancel', onPointerUp)
      if (pinTrigger) {
        pinTrigger.kill()
        ScrollTrigger.refresh()
      }
      if (renderer.domElement && stage.contains(renderer.domElement)) {
        stage.removeChild(renderer.domElement)
      }
      renderer.dispose()
      cards.forEach(c => scene.remove(c.mesh))
      if (geometry) geometry.dispose()
      slots.forEach(s => {
        s.material.dispose()
        s.texture.dispose()
      })
    }
  }, [threeReady])

  const scrollTo = href => e => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (!el) return
    if (window.__lenis)
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id='skills'
      className='unwoven-skills-section'
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '620px',
        background: '#050505',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0'
      }}
    >
      {/* ── Background Cyber Grid & Vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(239, 81, 67, 0.08) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />



      {/* ── STAGE CANVAS WRAPPER (WebGL Unwoven Loom) ── */}
      <div
        ref={stageRef}
        className='unwoven-skills-stage'
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          flex: 1,
          cursor: isDraggingState ? 'grabbing' : 'grab',
          touchAction: 'none',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
         INTERACTIVE DOMAIN INSPECTION MODAL (With Blob-Clipped Video)
      ═══════════════════════════════════════════════════════════════ */}
      {selectedModal && (
        <div
          role='dialog'
          aria-modal='true'
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(3, 3, 5, 0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2.5rem)'
          }}
          onClick={() => setSelectedModal(null)}
        >
          <div
            className='unwoven-modal-card'
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '890px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0a0a0f',
              border: '1px solid rgba(239, 81, 67, 0.35)',
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              boxShadow:
                '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(239, 81, 67, 0.15)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type='button'
              onClick={() => setSelectedModal(null)}
              aria-label='Close'
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--main-color)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(255, 255, 255, 0.06)'
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                marginBottom: '0.6rem'
              }}
            >
              <span
                style={{
                  fontFamily: "'MainFont', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  color: 'var(--main-color)',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                MODULE_{selectedModal.index} // {selectedModal.label}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>//</span>
              <span
                style={{
                  fontFamily: "'MainFont', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                SYSTEM SPECIFICATION // PRODUCTION VERIFIED
              </span>
            </div>

            {/* Split Top Hero: Project Details & Blob Video */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center',
                marginBottom: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(239, 81, 67, 0.25)',
                borderRadius: '8px',
                padding: '1.2rem'
              }}
            >
              {/* Left Column of Modal Hero */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    marginBottom: '0.4rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'MainFont', sans-serif",
                      fontSize: '0.72rem',
                      letterSpacing: '0.2em',
                      color: 'var(--main-color, #ef5143)',
                      textTransform: 'uppercase',
                      fontWeight: 600
                    }}
                  >
                    PROJECT ARCHIVE // {selectedModal.projectTitle || 'VOID BREACH'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: "'SecondaryFont', monospace",
                      backgroundColor: 'rgba(239, 81, 67, 0.15)',
                      border: '1px solid rgba(239, 81, 67, 0.35)',
                      color: '#ffffff',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}
                  >
                    {selectedModal.projectEngine || 'UNREAL ENGINE 5.4'}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'MainFont', sans-serif",
                    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                    color: '#ffffff',
                    margin: '0 0 0.5rem 0',
                    fontWeight: 700
                  }}
                >
                  {selectedModal.headline}
                </h2>

                <p
                  style={{
                    fontFamily: "'SecondaryFont', sans-serif",
                    fontSize: '0.92rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.55,
                    margin: '0 0 0.8rem 0'
                  }}
                >
                  {selectedModal.deepDive.philosophy}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.6rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'MainFont', sans-serif",
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    BENCHMARK:
                  </span>
                  <span
                    style={{
                      fontFamily: "'MainFont', sans-serif",
                      fontSize: '1.15rem',
                      color: 'var(--main-color, #ef5143)',
                      fontWeight: 700
                    }}
                  >
                    {selectedModal.metric.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "'SecondaryFont', sans-serif",
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.55)'
                    }}
                  >
                    ({selectedModal.benchmark})
                  </span>
                </div>
              </div>

              {/* Right Column of Modal Hero: Clean High-Tech 16:9 Video */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid rgba(239, 81, 67, 0.35)',
                  backgroundColor: '#050508',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)'
                }}
              >
                <video
                  src={selectedModal.videoSrc}
                  poster={selectedModal.bgImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
                    opacity: 0.5
                  }}
                />
              </div>
            </div>

            {/* Code Terminal Snippet */}
            <div
              style={{
                backgroundColor: 'rgba(12, 13, 17, 0.95)',
                border: '1px solid rgba(239, 81, 67, 0.3)',
                borderRadius: '8px',
                padding: '1.2rem',
                marginBottom: '1.5rem',
                fontFamily: "'Consolas', monospace",
                fontSize: '0.84rem',
                overflowX: 'auto'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem'
                  }}
                >
                  // Source/{selectedModal.id}_subsystem.cpp
                </span>
                <span
                  style={{ color: 'var(--main-color)', fontSize: '0.75rem' }}
                >
                  BENCHMARK: {selectedModal.metric.value}
                </span>
              </div>
              {selectedModal.codeSnippet.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    color: line.startsWith('//') ? '#8b949e' : '#e6edf3',
                    lineHeight: 1.5
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Deep Dive Subsystems Breakdown */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                marginBottom: '1.8rem'
              }}
            >
              <span
                style={{
                  fontFamily: "'MainFont', sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  color: 'var(--main-color)',
                  textTransform: 'uppercase'
                }}
              >
                CORE ARCHITECTURAL PILLARS
              </span>
              {selectedModal.deepDive.subsystems.map((sub, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '0.85rem 1.1rem'
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'MainFont', sans-serif",
                      fontSize: '0.85rem',
                      color: '#ffffff',
                      marginBottom: '0.3rem'
                    }}
                  >
                    {sub.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'SecondaryFont', sans-serif",
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.5
                    }}
                  >
                    {sub.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.8rem'
              }}
            >
              {selectedModal.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'MainFont', sans-serif",
                    fontSize: '0.72rem',
                    color: '#ffffff',
                    backgroundColor: 'rgba(239, 81, 67, 0.12)',
                    border: '1px solid rgba(239, 81, 67, 0.3)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Bottom Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <MagneticBtn
                href='/Sanyukt_Resume.pdf'
                target='_blank'
                rel='noreferrer'
                style={{
                  fontFamily: "'MainFont', sans-serif",
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  backgroundColor: 'var(--main-color)',
                  border: '1px solid var(--main-color)',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                strength={0.35}
              >
                Download Full Resume
              </MagneticBtn>
              <MagneticBtn
                href='#contact'
                onClick={e => {
                  setSelectedModal(null)
                  scrollTo('#contact')(e)
                }}
                style={{
                  fontFamily: "'MainFont', sans-serif",
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.85)',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                strength={0.35}
              >
                Discuss Systems / Hire
              </MagneticBtn>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default UnwovenSkills
