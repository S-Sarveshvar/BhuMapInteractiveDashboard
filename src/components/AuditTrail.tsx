import { useState } from 'react';
import { Search, Shield, Download, ExternalLink, CheckCircle, Satellite, RefreshCw, AlertTriangle, FileText, Hash } from 'lucide-react';
import { AUDIT_LOG, type AuditEntry } from '../data/mockData';

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  boundary: <FileText size={12} />,
  approval: <CheckCircle size={12} />,
  sync: <RefreshCw size={12} />,
  dispute: <AlertTriangle size={12} />,
  drone: <Satellite size={12} />,
  rover: <Hash size={12} />,
};

const CATEGORY_COLOR: Record<string, string> = {
  boundary: 'var(--amber)',
  approval: 'var(--emerald)',
  sync: 'var(--cyan)',
  dispute: 'var(--crimson)',
  drone: '#8B5CF6',
  rover: 'var(--cyan)',
};

const DOMAIN_CARDS = [
  {
    label: 'Revenue Departments',
    sublabel: 'State Resurvey Batch Export',
    action: 'Export 15 Verified Parcels',
    color: 'var(--emerald)',
    icon: <FileText size={18} />,
    stats: [
      { label: 'Parcels Ready', value: '15' },
      { label: 'Area', value: '19.84 ha' },
      { label: 'Format', value: 'Shapefile + PDF' },
    ],
  },
  {
    label: 'Gram Panchayats',
    sublabel: 'Village Map Registry Update',
    action: 'Push to Panchayat Portal',
    color: 'var(--cyan)',
    icon: <ExternalLink size={18} />,
    stats: [
      { label: 'Village', value: 'Rampur Khurd' },
      { label: 'Sarpanch', value: 'Dinesh Patel' },
      { label: 'Status', value: 'Awaiting Sign-off' },
    ],
  },
  {
    label: 'Agri Schemes (DBT)',
    sublabel: 'Plot Area for Crop Insurance / PM-KISAN',
    action: 'Validate for Direct Benefit Transfer',
    color: 'var(--amber)',
    icon: <CheckCircle size={18} />,
    stats: [
      { label: 'Eligible Farmers', value: '11' },
      { label: 'Scheme', value: 'PM-KISAN + PMFBY' },
      { label: 'Area Validated', value: '19.84 ha' },
    ],
  },
  {
    label: 'Courts & Tribunals',
    sublabel: 'Colonial vs BhuMap Boundary Overlay',
    action: 'Generate Certified Comparison PDF',
    color: 'var(--crimson)',
    icon: <Shield size={18} />,
    stats: [
      { label: 'Disputes Pending', value: '3' },
      { label: 'Case Ref', value: 'SDM-2026/341' },
      { label: 'Legacy Survey', value: 'Chain & Tape 1943' },
    ],
  },
];

export default function AuditTrail() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const categories = ['all', 'approval', 'boundary', 'sync', 'dispute', 'drone', 'rover'];

  const filtered = AUDIT_LOG.filter(entry => {
    const matchCat = catFilter === 'all' || entry.category === catFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || entry.action.toLowerCase().includes(q)
      || entry.khasraNo.toLowerCase().includes(q)
      || entry.officerName.toLowerCase().includes(q)
      || entry.details.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto space-y-5">

        <div>
          <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
            Immutable Audit Trail & Domain Exports
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
            Every boundary edit, AI approval, and sync event is cryptographically hashed and time-stamped.
          </p>
        </div>

        {/* Domain Integration Hub */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <ExternalLink size={14} style={{ color: 'var(--cyan)' }} />
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
              Domain Integration Hub
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {DOMAIN_CARDS.map(card => (
              <div key={card.label} className="panel rounded-lg overflow-hidden flex flex-col">
                <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-dim)', background: `${card.color}0A` }}>
                  <div className="flex items-center gap-2 mb-1" style={{ color: card.color }}>
                    {card.icon}
                    <span className="font-display font-semibold text-xs">{card.label}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{card.sublabel}</div>
                </div>
                <div className="p-3 flex-1 space-y-1.5">
                  {card.stats.map(s => (
                    <div key={s.label} className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-dim)' }}>{s.label}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-3 pb-3">
                  <button
                    onClick={() => showToast(`${card.action} initiated`)}
                    className="w-full py-1.5 rounded text-xs font-medium transition-colors"
                    style={{
                      background: `${card.color}18`,
                      border: `1px solid ${card.color}44`,
                      color: card.color,
                    }}
                  >
                    {card.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Court comparison note */}
        <div className="rounded-lg px-4 py-3 flex items-start gap-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--crimson)' }} />
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-medium" style={{ color: 'var(--crimson)' }}>Court Reference: SDM-2026/341</span>
            {' '}— Boundary dispute for Khasra 143/3 (Dinesh Vishwakarma). Colonial 1943 chain-and-tape survey shows 31.2 cm positional offset from BhuMap drone+rover ground truth.
            Certified comparison overlay PDF is being prepared for Sub-Divisional Magistrate, Ichhawar.
          </div>
        </div>

        {/* Audit Log */}
        <section>
          <div className="panel rounded-lg overflow-hidden">
            <div className="px-4 py-3 flex flex-wrap items-center gap-3" style={{ borderBottom: '1px solid var(--border-dim)' }}>
              <div className="flex items-center gap-2">
                <Shield size={14} style={{ color: 'var(--cyan)' }} />
                <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Time-Stamped Audit Log
                </h3>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 px-2 py-1 rounded flex-1 min-w-[160px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
                <Search size={12} style={{ color: 'var(--text-dim)' }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search log..."
                  className="bg-transparent text-xs outline-none flex-1"
                  style={{ color: 'var(--text-primary)', caretColor: 'var(--cyan)' }}
                />
              </div>

              {/* Category filter */}
              <div className="flex gap-1 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCatFilter(cat)}
                    className="px-2 py-1 rounded text-xs capitalize transition-colors"
                    style={{
                      background: catFilter === cat ? `${CATEGORY_COLOR[cat] ?? 'var(--cyan)'}22` : 'transparent',
                      border: `1px solid ${catFilter === cat ? (CATEGORY_COLOR[cat] ?? 'var(--cyan)') : 'var(--border-dim)'}`,
                      color: catFilter === cat ? (CATEGORY_COLOR[cat] ?? 'var(--cyan)') : 'var(--text-dim)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-dim)' }}>
                    {['Timestamp', 'Action', 'Parcel / Khasra', 'Officer', 'Details', 'Hash', ''].map(h => (
                      <th key={h} className="px-4 py-2 text-left font-medium"
                        style={{ color: 'var(--text-dim)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--bg-secondary)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry, i) => {
                    const color = CATEGORY_COLOR[entry.category] ?? 'var(--text-dim)';
                    return (
                      <tr key={entry.id}
                        style={{ borderBottom: '1px solid var(--border-dim)', background: i % 2 === 0 ? 'transparent' : 'rgba(148,163,184,0.02)' }}>
                        <td className="px-4 py-2.5 font-mono-data whitespace-nowrap" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>
                          {entry.timestamp}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span style={{ color }}>{CATEGORY_ICON[entry.category]}</span>
                            <span className="font-medium whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{entry.action}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-mono-data" style={{ color: 'var(--cyan)' }}>
                          {entry.khasraNo}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                          <div>{entry.officerName}</div>
                          <div className="font-mono-data" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{entry.officerId}</div>
                        </td>
                        <td className="px-4 py-2.5 max-w-xs" style={{ color: 'var(--text-dim)' }}>
                          <div className="truncate max-w-[240px]">{entry.details}</div>
                        </td>
                        <td className="px-4 py-2.5 font-mono-data" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>
                          0x{entry.hash}
                        </td>
                        <td className="px-4 py-2.5">
                          <button
                            onClick={() => showToast(`Audit entry ${entry.id} copied`)}
                            className="px-2 py-1 rounded text-xs transition-colors"
                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)', color: 'var(--text-dim)' }}
                          >
                            Copy
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-xs" style={{ color: 'var(--text-dim)' }}>
                  No audit entries match your filter.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-xs font-medium z-50"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--emerald)', color: 'var(--emerald)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
