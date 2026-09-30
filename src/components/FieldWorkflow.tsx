import { CheckCircle, Circle, AlertCircle, Clock, Wifi, WifiOff, Tablet, User, MapPin } from 'lucide-react';
import { FIELD_STAGES, PARCELS } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const syncData = [
  { time: '09:00', parcels: 2 }, { time: '10:00', parcels: 5 }, { time: '11:00', parcels: 8 },
  { time: '12:00', parcels: 9 }, { time: '13:00', parcels: 11 }, { time: '14:00', parcels: 13 },
  { time: '15:00', parcels: 15 }, { time: '16:00', parcels: 15 },
];

const tabletStatus = [
  { id: 'TAB-01', label: 'Tablet Alpha', operator: 'Rover Alpha — Ravi Malviya', online: true, lastSync: '4 min ago', queued: 0, synced: 8, battery: 62 },
  { id: 'TAB-02', label: 'Tablet Bravo', operator: 'Rover Bravo — Sunil Dangi', online: true, lastSync: '11 min ago', queued: 0, synced: 7, battery: 81 },
  { id: 'TAB-03', label: 'Tablet Charlie', operator: 'Patwari Field Team — Hemant Sahu', online: false, lastSync: '2h 14m ago', queued: 3, synced: 3, battery: 44 },
];

export default function FieldWorkflow() {
  return (
    <div className="flex-1 overflow-y-auto p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto space-y-5">

        {/* Header */}
        <div>
          <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
            Field Workflow Tracker — Rampur Khurd
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
            4-Stage BhuMap Survey Pipeline · Ichhawar Tehsil, Sehore District, Madhya Pradesh
          </p>
        </div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {FIELD_STAGES.map(stage => (
            <StageCard key={stage.stageNo} stage={stage} />
          ))}
        </div>

        {/* Tablet Verification Queue */}
        <div className="panel rounded-lg overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-dim)' }}>
            <Tablet size={14} style={{ color: 'var(--cyan)' }} />
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              On-Site Tablet Verification Queue
            </h3>
            <span className="ml-auto text-xs font-mono-data" style={{ color: 'var(--text-dim)' }}>
              Offline-First Android App · AES-256 Local Encryption
            </span>
          </div>
          <div className="p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {tabletStatus.map(tab => (
                <div key={tab.id} className="rounded-lg p-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${tab.online ? 'var(--emerald)' : 'var(--crimson)'}33`,
                  }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-medium font-display" style={{ color: 'var(--text-primary)' }}>{tab.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{tab.operator}</div>
                    </div>
                    {tab.online
                      ? <Wifi size={13} style={{ color: 'var(--emerald)' }} />
                      : <WifiOff size={13} style={{ color: 'var(--crimson)' }} />
                    }
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-dim)' }}>Status</span>
                      <span style={{ color: tab.online ? 'var(--emerald)' : 'var(--crimson)', fontWeight: 500 }}>
                        {tab.online ? 'Online' : `OFFLINE ${tab.lastSync}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-dim)' }}>Last Sync</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{tab.lastSync}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-dim)' }}>Synced / Queued</span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--emerald)' }}>{tab.synced}</span>
                        {tab.queued > 0 && <> / <span style={{ color: 'var(--amber)' }}>{tab.queued} pending</span></>}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--text-dim)' }}>Battery</span>
                        <span style={{ color: tab.battery < 30 ? 'var(--crimson)' : 'var(--text-secondary)' }}>{tab.battery}%</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: 'var(--border-bright)' }}>
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${tab.battery}%`, background: tab.battery < 30 ? 'var(--crimson)' : 'var(--emerald)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Owner Sign-off cards */}
        <div className="panel rounded-lg overflow-hidden">
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-dim)' }}>
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              Landowner & Officer Dual Sign-off Register
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
              Aadhaar-linked OTP + GPS-stamped · Immutable on blockchain-hash after both signatures
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-dim)' }}>
                  {['Khasra No.', 'ULPIN', 'Owner', 'Area', 'Crop', 'Owner Sig.', 'Officer Sig.', 'Status'].map(h => (
                    <th key={h} className="px-4 py-2 text-left font-medium"
                      style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PARCELS.slice(0, 12).map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-dim)', background: i % 2 === 0 ? 'transparent' : 'rgba(148,163,184,0.03)' }}>
                    <td className="px-4 py-2 font-mono-data" style={{ color: 'var(--text-primary)' }}>{p.khasraNo}</td>
                    <td className="px-4 py-2 font-mono-data" style={{ color: 'var(--cyan)', fontSize: '0.65rem' }}>
                      {p.ulpin.slice(-8)}...
                    </td>
                    <td className="px-4 py-2" style={{ color: 'var(--text-secondary)' }}>{p.ownerName}</td>
                    <td className="px-4 py-2 font-mono-data" style={{ color: 'var(--text-dim)' }}>{p.areaHectare} ha</td>
                    <td className="px-4 py-2" style={{ color: 'var(--text-secondary)' }}>{p.cropType}</td>
                    <td className="px-4 py-2">
                      {p.signatureOwner
                        ? <span style={{ color: 'var(--emerald)' }}>✓ Signed</span>
                        : <span style={{ color: 'var(--text-dim)' }}>Pending</span>}
                    </td>
                    <td className="px-4 py-2">
                      {p.signatureOfficer
                        ? <span style={{ color: 'var(--emerald)' }}>✓ Signed</span>
                        : <span style={{ color: 'var(--text-dim)' }}>Pending</span>}
                    </td>
                    <td className="px-4 py-2">
                      <StatusPill status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sync timeline */}
        <div className="panel rounded-lg overflow-hidden">
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-dim)' }}>
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              Offline→Online Sync Timeline (Today)
            </h3>
          </div>
          <div className="p-4" style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={syncData}>
                <defs>
                  <linearGradient id="syncGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-bright)', borderRadius: 6, fontSize: 11 }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                  itemStyle={{ color: 'var(--emerald)' }}
                />
                <Area type="monotone" dataKey="parcels" stroke="#10B981" fill="url(#syncGrad)" strokeWidth={1.5} dot={false} name="Parcels Synced" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageCard({ stage }: { stage: typeof FIELD_STAGES[0] }) {
  const statusColor = stage.status === 'completed' ? 'var(--emerald)'
    : stage.status === 'in-progress' ? 'var(--cyan)'
    : '#64748B';

  const stageIcon = stage.status === 'completed' ? <CheckCircle size={14} />
    : stage.status === 'in-progress' ? <Clock size={14} />
    : <Circle size={14} />;

  return (
    <div className="panel rounded-lg overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-dim)' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono-data flex-shrink-0"
          style={{ background: `${statusColor}22`, color: statusColor, border: `1px solid ${statusColor}44` }}>
          {stage.stageNo}
        </div>
        <div className="flex-1">
          <div className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            Stage {stage.stageNo}: {stage.name}
          </div>
          <div className="h-1 mt-1.5 rounded-full" style={{ background: 'var(--border-bright)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${stage.progress}%`, background: statusColor }} />
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: statusColor }}>
          {stageIcon}
          <span>{stage.progress}%</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {stage.items.map(item => (
          <div key={item.id} className="flex items-start gap-2">
            {item.done
              ? <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--emerald)' }} />
              : item.critical
              ? <AlertCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--amber)' }} />
              : <Circle size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--text-dim)' }} />
            }
            <span className="text-xs leading-relaxed" style={{
              color: item.done ? 'var(--text-secondary)' : item.critical ? 'var(--amber)' : 'var(--text-dim)'
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    verified: { label: 'Verified', color: 'var(--emerald)' },
    proposed: { label: 'AI-Proposed', color: 'var(--amber)' },
    disputed: { label: 'Disputed', color: 'var(--crimson)' },
    pending: { label: 'Pending', color: '#64748B' },
  };
  const { label, color } = map[status] ?? { label: status, color: '#64748B' };
  return (
    <span className="px-1.5 py-0.5 rounded text-xs"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
      {label}
    </span>
  );
}
