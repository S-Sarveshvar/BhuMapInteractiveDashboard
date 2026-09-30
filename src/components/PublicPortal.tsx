import { useState } from 'react';
import { Search, MapPin, FileText, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { PARCELS, VILLAGE_STATS } from '../data/mockData';

export default function PublicPortal() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<typeof PARCELS[0] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    const found = PARCELS.find(p =>
      p.khasraNo.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      p.ulpin.toLowerCase().includes(q)
    );
    setResult(found ?? null);
    setNotFound(!found && q.length > 0);
  };

  const statusColor: Record<string, string> = {
    verified: 'var(--emerald)', proposed: 'var(--amber)', disputed: 'var(--crimson)', pending: '#64748B',
  };
  const statusLabel: Record<string, string> = {
    verified: 'Verified & Linked', proposed: 'Under Review', disputed: 'Disputed — Legal Hold', pending: 'Survey Pending',
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
      {/* Portal header */}
      <div className="px-6 py-10 text-center"
        style={{ background: 'linear-gradient(180deg, rgba(6,182,212,0.08) 0%, transparent 100%)', borderBottom: '1px solid var(--border-dim)' }}>
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
          style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--emerald)' }}>
          <CheckCircle size={11} /> BhuMap Public Land Record Portal
        </div>
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Verify Your Agricultural Land Record
        </h1>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Search by Khasra Number, ULPIN, or Landowner name to view your verified survey boundary, RoR linkage, and dispute status.
        </p>

        {/* Search box */}
        <div className="flex gap-2 max-w-md mx-auto mt-6">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-bright)' }}>
            <Search size={14} style={{ color: 'var(--text-dim)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Khasra No., ULPIN or Farmer Name..."
              className="bg-transparent flex-1 text-sm outline-none"
              style={{ color: 'var(--text-primary)', caretColor: 'var(--cyan)' }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: 'var(--cyan)', color: '#0F172A' }}
          >
            Search
          </button>
        </div>

        <div className="mt-3 text-xs" style={{ color: 'var(--text-dim)' }}>
          Try: <button onClick={() => { setQuery('112/1'); }} className="underline mx-1">112/1</button>
          <button onClick={() => { setQuery('Ramesh Patel'); }} className="underline mx-1">Ramesh Patel</button>
          <button onClick={() => { setQuery('143/3'); }} className="underline mx-1">143/3 (Disputed)</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* Result */}
        {notFound && (
          <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--crimson)' }}>
            <XCircle size={14} />
            No record found for "{query}". Please check your Khasra number or contact the Patwari office.
          </div>
        )}

        {result && (
          <div className="panel rounded-lg overflow-hidden">
            <div className="px-5 py-4 flex items-start justify-between"
              style={{ borderBottom: '1px solid var(--border-dim)', background: `${statusColor[result.status]}0A` }}>
              <div>
                <div className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Khasra {result.khasraNo}
                </div>
                <div className="text-xs font-mono-data mt-0.5" style={{ color: 'var(--cyan)' }}>
                  ULPIN: {result.ulpin}
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${statusColor[result.status]}18`,
                  border: `1px solid ${statusColor[result.status]}44`,
                  color: statusColor[result.status],
                }}>
                {result.status === 'verified' ? <CheckCircle size={12} />
                  : result.status === 'disputed' ? <XCircle size={12} />
                  : <AlertTriangle size={12} />}
                {statusLabel[result.status]}
              </div>
            </div>

            <div className="p-5 grid gap-5 md:grid-cols-2">
              <div className="space-y-4">
                <Section title="Landowner Information">
                  <Row label="Name" value={result.ownerName} />
                  <Row label="Aadhaar (Masked)" value={result.ownerAadhaarMasked} mono />
                  <Row label="Village" value={`${result.village}, ${result.tehsil}`} />
                  <Row label="District / State" value={`${result.district}, ${result.state}`} />
                </Section>
                <Section title="Land Details">
                  <Row label="Survey Number" value={result.surveyNo} mono />
                  <Row label="Area" value={`${result.area} Bigha (${result.areaHectare} Hectare)`} />
                  <Row label="Crop Type" value={result.cropType} />
                  <Row label="Irrigation" value={result.irrigationType} capitalize />
                </Section>
              </div>
              <div className="space-y-4">
                <Section title="Survey & RoR Status">
                  <Row label="Record of Rights" value={
                    result.rorStatus === 'linked' ? '✓ Linked to Bhulekh'
                    : result.rorStatus === 'disputed' ? '⚠ Disputed'
                    : 'Pending Linkage'
                  } />
                  <Row label="Mutation" value={result.mutationPending ? 'Pending' : 'Clear'} />
                  <Row label="Registry" value={result.registryLinked ? '✓ Linked' : 'Not Linked'} />
                </Section>
                <Section title="Positional Accuracy">
                  <Row label="RTK Delta" value={`${result.rtkDelta} cm`} mono />
                  <Row label="Status" value={result.rtkDeltaStatus === 'pass' ? '✓ Within Tolerance' : '⚠ Flagged'} />
                  <Row label="GNSS Coordinates" value={`${result.gnssLat}°N, ${result.gnssLon}°E`} mono />
                  <Row label="Last Surveyed" value={result.lastInspected} />
                  <Row label="Surveying Officer" value={`${result.inspectorName} (${result.inspectorId})`} />
                </Section>
                <Section title="Digital Verification">
                  <Row label="Owner Signature" value={result.signatureOwner ? '✓ Complete' : 'Pending'} />
                  <Row label="Officer Signature" value={result.signatureOfficer ? '✓ Complete' : 'Pending'} />
                  <Row label="AI Boundary Approved" value={result.aiSegmentApproved ? '✓ Approved' : 'Pending Officer Review'} />
                </Section>
              </div>
            </div>

            {result.status === 'disputed' && (
              <div className="mx-5 mb-5 rounded-lg px-4 py-3"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={12} style={{ color: 'var(--crimson)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--crimson)' }}>Boundary Dispute Notice</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {result.rtkNote} For legal assistance, contact the Sub-Divisional Magistrate office, Ichhawar Tehsil or call Helpline: 1800-180-1234 (toll-free).
                </p>
              </div>
            )}

            <div className="px-5 pb-5 flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-lg text-xs font-medium"
                style={{ background: 'var(--emerald-dim)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--emerald)' }}>
                <FileText size={12} className="inline mr-1" />Download RoR Certificate
              </button>
              <button className="px-4 py-2 rounded-lg text-xs font-medium"
                style={{ background: 'var(--cyan-dim)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--cyan)' }}>
                <MapPin size={12} className="inline mr-1" />View on Map
              </button>
            </div>
          </div>
        )}

        {/* Village summary for public view */}
        {!result && !notFound && (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
              Rampur Khurd Survey Progress — Public Summary
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Verified Parcels', value: VILLAGE_STATS.verified, color: 'var(--emerald)' },
                { label: 'Under Review', value: VILLAGE_STATS.proposed, color: 'var(--amber)' },
                { label: 'Disputed', value: VILLAGE_STATS.disputed, color: 'var(--crimson)' },
                { label: 'ULPIN Generated', value: VILLAGE_STATS.ulpinsGenerated, color: 'var(--cyan)' },
              ].map(card => (
                <div key={card.label} className="panel rounded-lg p-4 text-center">
                  <div className="font-display font-bold text-2xl" style={{ color: card.color }}>{card.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{card.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg px-4 py-3 flex items-start gap-3"
              style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
              <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--cyan)' }} />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                For objections to survey boundaries, contact the Patwari office within 15 days of the survey notice.
                Bring your Khasra Nakal, Aadhaar card, and any prior court orders. Gram Sabha grievance meetings
                are held every Tuesday at the Panchayat Bhavan, Rampur Khurd.
              </p>
            </div>

            {/* Stakeholder quick-links */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { group: 'Agri Scheme Beneficiaries', info: 'Check your PM-KISAN / PMFBY eligibility based on verified land area', color: 'var(--emerald)' },
                { group: 'Gram Panchayat Members', info: 'Access village cadaster maps and common land records', color: 'var(--cyan)' },
                { group: 'Courts & Advocates', info: 'Download certified boundary comparison reports for active disputes', color: 'var(--crimson)' },
                { group: 'Banks & Financial Institutions', info: 'Verify land ownership and area for agricultural loans (KCC)', color: 'var(--amber)' },
              ].map(s => (
                <div key={s.group} className="panel rounded-lg p-4">
                  <div className="text-xs font-medium font-display mb-1.5" style={{ color: s.color }}>{s.group}</div>
                  <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{s.info}</div>
                  <button className="mt-2 text-xs underline" style={{ color: s.color }}>Learn more →</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
        {title}
      </div>
      <div className="space-y-1.5 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, mono, capitalize }: { label: string; value: string; mono?: boolean; capitalize?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span className={`text-xs text-right ${mono ? 'font-mono-data' : ''} ${capitalize ? 'capitalize' : ''}`}
        style={{ color: 'var(--text-secondary)' }}>
        {value}
      </span>
    </div>
  );
}
