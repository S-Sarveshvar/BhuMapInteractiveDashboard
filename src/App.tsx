import { useState, useEffect } from 'react';
import { Map, Workflow, Cpu, Shield } from 'lucide-react';
import TopNav from './components/TopNav';
import GISWorkspace from './components/GISWorkspace';
import FieldWorkflow from './components/FieldWorkflow';
import HardwareTelemetry from './components/HardwareTelemetry';
import AuditTrail from './components/AuditTrail';
import PublicPortal from './components/PublicPortal';

type Tab = 'gis' | 'field' | 'hardware' | 'audit';
type Role = 'officer' | 'public';

const OFFICER_TABS = [
  { id: 'gis' as Tab, label: 'GIS Map Workspace', icon: <Map size={14} /> },
  { id: 'field' as Tab, label: 'Field Workflow', icon: <Workflow size={14} /> },
  { id: 'hardware' as Tab, label: 'Hardware Fleet', icon: <Cpu size={14} /> },
  { id: 'audit' as Tab, label: 'Audit & Exports', icon: <Shield size={14} /> },
];

export default function App() {
  const [role, setRole] = useState<Role>('officer');
  const [tab, setTab] = useState<Tab>('gis');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  if (role === 'public') {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <TopNav role={role} setRole={setRole} darkMode={darkMode} setDarkMode={setDarkMode} />
        <PublicPortal />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNav role={role} setRole={setRole} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Tab bar */}
      <div
        className="flex items-end px-4 flex-shrink-0"
        style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-dim)' }}
      >
        {OFFICER_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors"
            style={{
              color: tab === t.id ? 'var(--text-primary)' : 'var(--text-dim)',
              borderBottom: tab === t.id ? '2px solid var(--cyan)' : '2px solid transparent',
            }}
          >
            <span style={{ color: tab === t.id ? 'var(--cyan)' : 'var(--text-dim)' }}>{t.icon}</span>
            {t.label}
          </button>
        ))}

        <div className="ml-auto pb-2 flex items-center gap-2 text-xs" style={{ color: 'var(--text-dim)' }}>
          <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--emerald)' }} />
          Revenue Officer Command Dashboard
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === 'gis' && <GISWorkspace role={role} />}
        {tab === 'field' && <FieldWorkflow />}
        {tab === 'hardware' && <HardwareTelemetry />}
        {tab === 'audit' && <AuditTrail />}
      </div>
    </div>
  );
}
