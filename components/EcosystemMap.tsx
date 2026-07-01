'use client';

const NODES = [
  { id: 1, x: '50%', y: '50%', label: 'CORE', size: 100 },
  { id: 2, x: '30%', y: '30%', label: 'COLLECTIVE', size: 60 },
  { id: 3, x: '70%', y: '30%', label: 'ROSTER', size: 60 },
  { id: 4, x: '25%', y: '70%', label: 'LABS', size: 40 },
  { id: 5, x: '75%', y: '70%', label: 'VENTURES', size: 40 },
  { id: 6, x: '50%', y: '15%', label: 'GOVERNANCE', size: 30 },
];

const CONNECTIONS = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 1, to: 6 },
  { from: 4, to: 5 },
];

export default function EcosystemMap() {
  return (
    <div className="relative w-full h-[80vh] bg-okra-deep/5 border border-white/5 overflow-hidden">
      <svg className="w-full h-full">
        {/* Connections */}
        {CONNECTIONS.map((conn, i) => {
          const fromNode = NODES.find(n => n.id === conn.from)!;
          const toNode = NODES.find(n => n.id === conn.to)!;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#00ff00"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 transition-transform hover:scale-110"
          style={{ left: node.x, top: node.y }}
        >
          <div 
            className="rounded-full border border-okra-bright/30 bg-okra-deep/20 backdrop-blur-md flex items-center justify-center group cursor-help transition-all hover:bg-okra-bright/10 hover:border-okra-bright"
            style={{ width: node.size, height: node.size }}
          >
            {node.id === 1 && (
              <div className="w-4 h-4 bg-okra-bright rounded-full opacity-50" />
            )}
            <div className="absolute inset-0 bg-okra-bright/5 blur-xl group-hover:bg-okra-bright/20 transition-all" />
          </div>
          <span className="text-xs font-oo-neureal tracking-[0.3em] text-white/50 group-hover:text-okra-bright transition-colors">
            {node.label}
          </span>
        </div>
      ))}

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #00ff00 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}
