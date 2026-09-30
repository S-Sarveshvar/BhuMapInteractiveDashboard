import { useState } from 'react';
import {
  Layers, Eye, EyeOff, CheckCircle, AlertTriangle, XCircle, Clock, MapPin, FileText,
  Send, RefreshCw, Download, X, TreePine, Droplets, ChevronRight
} from 'lucide-react';
import { PARCELS, type Parcel } from '../data/mockData';
import RealTimeMap from './RealTimeMap';

interface Layer {
  id: string;
  name: string;
  sublabel: string;
  visible: boolean;
  opacity: number;
  color: string;
}

const STATUS_COLOR: Record<string, string> = {
  verified: 'var(--emerald)',
  proposed: 'var(--amber)',
  disputed: 'var(--crimson)',
  pending: '#64748B',
};

const STATUS_LABEL: Record<string, string> = {
  verified: 'Verified',
  proposed: 'AI-Proposed',
  disputed: 'Disputed',
  pending: 'Pending',
};

function DeltaBadge({ delta, status }: { delta: number; status: string }) {
  const color = status === 'pass' ? 'var(--emerald)' : status === 'flag' ? 'var(--amber)' : 'var(--crimson)';
  const icon = status === 'pass' ? <CheckCircle size={12} /> : status === 'flag' ? <AlertTriangle size={12} /> : <XCircle size={12} />;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono-data font-medium"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
      {icon} {delta} cm — {status === 'pass' ? 'Passed' : status === 'flag' ? 'Flagged' : 'CRITICAL'}
    </span>
  );
}

export default function GISWorkspace({ role }: { role: 'officer' | 'public' }) {
  const [layers, setLayers] = useState<Layer[]>([
    { id: 'drone', name: 'Drone Imagery', sublabel: 'RTK Orthomosaic + DSM (2–3 cm/px)', visible: true, opacity: 85, color: '#8B5CF6' },
    { id: 'rover', name: 'RTK Rover Points', sublabel: 'CORS-corrected GCPs + IMU tilt', visible: true, opacity: 100, color: 'var(--cyan)' },
    { id: 'parcels', name: 'Parcel Polygons', sublabel: 'U-Net AI Segmentation + Human Review', visible: true, opacity: 80, color: 'var(--emerald)' },
    { id: 'ror', name: 'PostGIS Land Records', sublabel: 'RoR, Mutation & Registry API', visible: true, opacity: 90, color: 'var(--amber)' },
  ]);
  const [showAI, setShowAI] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const toggleLayer = (id: string) => {
    setLayers(l => l.map(layer => layer.id === id ? { ...layer, visible: !layer.visible } : layer));
  };
  const setOpacity = (id: string, val: number) => {
    setLayers(l => l.map(layer => layer.id === id ? { ...layer, opacity: val } : layer));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="flex h-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Left: Layer Manager */}
      <div
        className="w-64 flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ background: 'var(--bg-panel)', borderRight: '1px solid var(--border-dim)' }}
      >
        <div className="px-3 py-2.5 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-dim)' }}>
          <Layers size={14} style={{ color: 'var(--cyan)' }} />
          <span className="text-xs font-display font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Layer Manager
          </span>
        </div>

        <div className="p-3 space-y-4">
          {layers.map((layer) => (
            <div key={layer.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleLayer(layer.id)}>
                    {layer.visible
                      ? <Eye size={13} style={{ color: layer.color }} />
                      : <EyeOff size={13} style={{ color: 'var(--text-dim)' }} />
                    }
                  </button>
                  <div>
                    <div className="text-xs font-medium" style={{ color: layer.visible ? 'var(--text-primary)' : 'var(--text-dim)' }}>
                      {layer.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>
                      {layer.sublabel}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <input
                  type="range" min={0} max={100} value={layer.opacity}
                  onChange={e => setOpacity(layer.id, Number(e.target.value))}
                  className="flex-1 h-1 accent-current"
                  style={{ accentColor: layer.color, opacity: layer.visible ? 1 : 0.4 }}
                />
                <span className="text-xs font-mono-data w-7 text-right" style={{ color: 'var(--text-dim)' }}>
                  {layer.opacity}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Parcel Mode Toggle */}
        <div className="px-3 py-2.5 space-y-2" style={{ borderTop: '1px solid var(--border-dim)' }}>
          <div className="text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Parcel Display Mode
          </div>
          <button
            onClick={() => setShowAI(true)}
            className="w-full text-left px-3 py-2 rounded text-xs transition-colors"
            style={{
              background: showAI ? 'var(--amber-dim)' : 'transparent',
              border: `1px solid ${showAI ? 'var(--amber)' : 'var(--border-dim)'}`,
              color: showAI ? 'var(--amber)' : 'var(--text-secondary)',
            }}
          >
            U-Net AI Segmentation Proposals
          </button>
          <button
            onClick={() => setShowAI(false)}
            className="w-full text-left px-3 py-2 rounded text-xs transition-colors"
            style={{
              background: !showAI ? 'var(--emerald-dim)' : 'transparent',
              border: `1px solid ${!showAI ? 'var(--emerald)' : 'var(--border-dim)'}`,
              color: !showAI ? 'var(--emerald)' : 'var(--text-secondary)',
            }}
          >
            Human-Reviewed Polygons
          </button>
        </div>

        {/* Legend */}
        <div className="px-3 py-2.5 space-y-1.5" style={{ borderTop: '1px solid var(--border-dim)' }}>
          <div className="text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Legend
          </div>
          {[
            { color: 'var(--emerald)', label: 'Verified Parcel', count: 11 },
            { color: 'var(--amber)', label: 'AI-Proposed (Pending)', count: 5 },
            { color: 'var(--crimson)', label: 'Disputed / Flagged', count: 3 },
            { color: '#64748B', label: 'Survey Pending', count: 1 },
            { color: 'var(--cyan)', label: 'RTK Control Point', count: 8 },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: `${item.color}66`, border: `1.5px solid ${item.color}` }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              </div>
              <span className="text-xs font-mono-data" style={{ color: 'var(--text-dim)' }}>{item.count}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="px-3 py-2.5 mt-auto" style={{ borderTop: '1px solid var(--border-dim)' }}>
          <div className="text-xs font-mono-data space-y-1" style={{ color: 'var(--text-dim)' }}>
            <div className="flex justify-between">
              <span>Total Parcels</span>
              <span style={{ color: 'var(--text-secondary)' }}>20</span>
            </div>
            <div className="flex justify-between">
              <span>Village Area</span>
              <span style={{ color: 'var(--text-secondary)' }}>28.72 ha</span>
            </div>
            <div className="flex justify-between">
              <span>Drone Coverage</span>
              <span style={{ color: 'var(--amber)' }}>74% live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Real-Time Interactive Leaflet Map Canvas */}
      <div className="flex-1 relative overflow-hidden flex flex-col" style={{ background: '#0A1628' }}>
        <RealTimeMap
          selectedParcel={selectedParcel}
          onSelectParcel={setSelectedParcel}
          layers={layers}
          showAI={showAI}
        />

        {/* Floating Toast Notification */}
        {toast && (
          <div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-xs font-medium z-30 transition-all shadow-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--emerald)', color: 'var(--emerald)', boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            {toast}
          </div>
        )}
      </div>

      {/* Right: Parcel Inspector */}
      <div
        className="w-80 flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ background: 'var(--bg-panel)', borderLeft: '1px solid var(--border-dim)' }}
      >
        {selectedParcel ? (
          <ParcelInspector
            parcel={selectedParcel}
            onClose={() => setSelectedParcel(null)}
            role={role}
            onAction={(msg) => showToast(msg)}
          />
        ) : (
          <EmptyInspector />
        )}
      </div>
    </div>
  );
}

function EmptyInspector() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
        <MapPin size={20} style={{ color: 'var(--text-dim)' }} />
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
        No Parcel Selected
      </div>
      <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
        Click any parcel polygon on the map to inspect its land records, RTK accuracy data, and field verification status.
      </div>
    </div>
  );
}

function ParcelInspector({ parcel, onClose, role, onAction }: {
  parcel: Parcel;
  onClose: () => void;
  role: 'officer' | 'public';
  onAction: (msg: string) => void;
}) {
  const rorInfo = ROR_LABEL[parcel.rorStatus];
  const statusColor = STATUS_COLOR[parcel.status];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between px-3 py-2.5" style={{ borderBottom: '1px solid var(--border-dim)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-data font-medium" style={{ color: 'var(--cyan)' }}>
              {parcel.ulpin}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              Khasra {parcel.khasraNo}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{
              background: `${statusColor}22`,
              color: statusColor,
              border: `1px solid ${statusColor}44`,
            }}>
              {STATUS_LABEL[parcel.status]}
            </span>
          </div>
        </div>
        <button onClick={onClose} style={{ color: 'var(--text-dim)' }}>
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Owner Info */}
        <section>
          <SectionLabel>Landowner</SectionLabel>
          <div className="space-y-1.5">
            <Row label="Name" value={parcel.ownerName} />
            <Row label="Aadhaar" value={parcel.ownerAadhaarMasked} mono />
            <Row label="Village" value={parcel.village} />
            <Row label="Area" value={`${parcel.area} Bigha (${parcel.areaHectare} ha)`} />
            <Row label="Crop" value={parcel.cropType} />
            <Row label="Irrigation" value={parcel.irrigationType} capitalize />
          </div>
        </section>

        {/* RoR Status */}
        <section>
          <SectionLabel>Land Records Status</SectionLabel>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--text-dim)' }}>Record of Rights</span>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded"
                style={{ background: `${rorInfo.color}22`, color: rorInfo.color, border: `1px solid ${rorInfo.color}44` }}>
                {rorInfo.label}
              </span>
            </div>
            <Row label="Mutation Pending" value={parcel.mutationPending ? '⚠ Yes' : 'No'} />
            <Row label="Registry Linked" value={parcel.registryLinked ? '✓ Linked' : '✗ Not Linked'} />
            <Row label="Survey No." value={parcel.surveyNo} mono />
            <Row label="Inspected" value={parcel.lastInspected} />
            <Row label="Officer" value={`${parcel.inspectorName} (${parcel.inspectorId})`} />
          </div>
        </section>

        {/* RTK Accuracy */}
        <section>
          <SectionLabel>Positional Quality Check</SectionLabel>
          <div className="p-3 rounded space-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
            <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
              Drone Orthomosaic ↔ RTK Rover Delta
            </div>
            <DeltaBadge delta={parcel.rtkDelta} status={parcel.rtkDeltaStatus} />
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {parcel.rtkNote}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2" style={{ borderTop: '1px solid var(--border-dim)' }}>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>GNSS LAT</div>
                <div className="text-xs font-mono-data" style={{ color: 'var(--cyan)' }}>{parcel.gnssLat}°N</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>GNSS LON</div>
                <div className="text-xs font-mono-data" style={{ color: 'var(--cyan)' }}>{parcel.gnssLon}°E</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>ELEVATION</div>
                <div className="text-xs font-mono-data" style={{ color: 'var(--cyan)' }}>{parcel.elevation} m</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>TREE COVER</div>
                <div className="text-xs font-mono-data" style={{ color: parcel.treeCount > 10 ? 'var(--amber)' : 'var(--text-secondary)' }}>
                  {parcel.treeCount} trees
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Sign-off */}
        <section>
          <SectionLabel>Digital Sign-off (Field Tablet)</SectionLabel>
          <div className="space-y-2">
            <SignBadge label="Landowner Signature" done={parcel.signatureOwner} />
            <SignBadge label="Revenue Officer Signature" done={parcel.signatureOfficer} />
          </div>
        </section>

        {/* Actions — officer only */}
        {role === 'officer' && (
          <section>
            <SectionLabel>Actions</SectionLabel>
            <div className="space-y-2">
              <ActionBtn
                icon={<CheckCircle size={12} />}
                label="Approve U-Net AI Boundary"
                color="var(--emerald)"
                disabled={parcel.aiSegmentApproved}
                onClick={() => onAction(`U-Net boundary approved for Khasra ${parcel.khasraNo}`)}
              />
              <ActionBtn
                icon={<Send size={12} />}
                label="Dispatch Rover Team"
                color="var(--cyan)"
                disabled={parcel.rtkDeltaStatus === 'pass'}
                onClick={() => onAction(`Rover team dispatched to ${parcel.khasraNo}`)}
              />
              <ActionBtn
                icon={<RefreshCw size={12} />}
                label="Sync with State RoR API"
                color="var(--amber)"
                disabled={parcel.rorStatus === 'linked'}
                onClick={() => onAction(`RoR sync initiated for ULPIN ${parcel.ulpin}`)}
              />
              <ActionBtn
                icon={<Download size={12} />}
                label="Export Legal Evidence PDF"
                color="var(--violet)"
                onClick={() => onAction(`PDF export started for Khasra ${parcel.khasraNo}`)}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-display font-semibold uppercase tracking-wider mb-2"
      style={{ color: 'var(--text-dim)' }}>
      {children}
    </div>
  );
}

function Row({ label, value, mono, capitalize }: { label: string; value: string; mono?: boolean; capitalize?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span className={`text-xs text-right ${mono ? 'font-mono-data' : ''} ${capitalize ? 'capitalize' : ''}`}
        style={{ color: 'var(--text-secondary)' }}>
        {value}
      </span>
    </div>
  );
}

function SignBadge({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded"
      style={{ background: done ? 'var(--emerald-dim)' : 'rgba(239,68,68,0.08)', border: `1px solid ${done ? 'var(--emerald)' : 'var(--crimson)'}33` }}>
      {done
        ? <CheckCircle size={12} style={{ color: 'var(--emerald)' }} />
        : <Clock size={12} style={{ color: 'var(--crimson)' }} />
      }
      <span className="text-xs" style={{ color: done ? 'var(--emerald)' : 'var(--crimson)' }}>
        {label}
      </span>
    </div>
  );
}

function ActionBtn({ icon, label, color, disabled, onClick }: {
  icon: React.ReactNode; label: string; color: string;
  disabled?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-colors"
      style={{
        background: disabled ? 'transparent' : `${color}15`,
        border: `1px solid ${disabled ? 'var(--border-dim)' : `${color}44`}`,
        color: disabled ? 'var(--text-dim)' : color,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {icon}
      {label}
      {!disabled && <ChevronRight size={10} className="ml-auto" />}
    </button>
  );
}

const ROR_LABEL: Record<string, { label: string; color: string }> = {
  linked: { label: 'RoR Linked', color: 'var(--emerald)' },
  mismatch: { label: 'Area Mismatch', color: 'var(--amber)' },
  pending: { label: 'Pending Linkage', color: '#64748B' },
  disputed: { label: 'RoR Disputed', color: 'var(--crimson)' },
};
