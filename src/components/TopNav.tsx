import { Sun, Moon, Satellite, ChevronDown, Activity, AlertTriangle, MapPin, Hash } from 'lucide-react';
import { VILLAGE_STATS } from '../data/mockData';

interface TopNavProps {
  role: 'officer' | 'public';
  setRole: (r: 'officer' | 'public') => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
}

export default function TopNav({ role, setRole, darkMode, setDarkMode }: TopNavProps) {
  return (
    <div className="flex-shrink-0">
      {/* Main nav bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-dim)' }}
      >
        {/* Logo + branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #10B981 100%)' }}
            >
              <Satellite size={16} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>
                BhuMap
              </div>
              <div className="text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                SIH26010 · Team NOSTROMO
              </div>
            </div>
          </div>

          <div className="w-px h-8 mx-1" style={{ background: 'var(--border-dim)' }} />

          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--text-dim)' }}>Village:</span>{' '}
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {VILLAGE_STATS.villageName}
            </span>
            <span className="mx-1" style={{ color: 'var(--text-dim)' }}>·</span>
            <span style={{ color: 'var(--text-dim)' }}>{VILLAGE_STATS.tehsil}, {VILLAGE_STATS.district}, {VILLAGE_STATS.state}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Role switcher */}
          <div
            className="flex rounded overflow-hidden text-xs"
            style={{ border: '1px solid var(--border-bright)' }}
          >
            <button
              onClick={() => setRole('officer')}
              className="px-3 py-1.5 font-medium transition-colors"
              style={{
                background: role === 'officer' ? 'var(--cyan)' : 'transparent',
                color: role === 'officer' ? '#0F172A' : 'var(--text-secondary)',
              }}
            >
              Revenue Officer
            </button>
            <button
              onClick={() => setRole('public')}
              className="px-3 py-1.5 font-medium transition-colors"
              style={{
                background: role === 'public' ? 'var(--emerald)' : 'transparent',
                color: role === 'public' ? '#0F172A' : 'var(--text-secondary)',
              }}
            >
              Public Portal
            </button>
          </div>

          <div className="w-px h-6 mx-1" style={{ background: 'var(--border-dim)' }} />

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* KPI ribbon */}
      <div
        className="flex items-stretch divide-x text-xs"
        style={{
          background: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-dim)',
        }}
      >
        {/* Progress */}
        <div className="flex items-center gap-3 px-4 py-2 flex-1">
          <Activity size={14} style={{ color: 'var(--cyan)' }} />
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Survey Progress
            </div>
            <div className="font-medium font-display" style={{ color: 'var(--text-primary)' }}>
              Pilot Village:{' '}
              <span style={{ color: 'var(--emerald)' }}>{VILLAGE_STATS.progressPercent}% Completed</span>
              {' '}in {VILLAGE_STATS.surveyDays} Days
            </div>
          </div>
          <div className="ml-2 h-1.5 rounded-full flex-1 max-w-[120px]" style={{ background: 'var(--border-bright)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${VILLAGE_STATS.progressPercent}%`, background: 'var(--emerald)' }}
            />
          </div>
        </div>

        {/* RTK Accuracy */}
        <div className="flex items-center gap-3 px-4 py-2">
          <MapPin size={14} style={{ color: 'var(--cyan)' }} />
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              RTK Accuracy
            </div>
            <div className="font-medium font-display" style={{ color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--cyan)' }}>{VILLAGE_STATS.rtkAccuracy} cm</span>{' '}Mean Positional Error
            </div>
          </div>
          <div
            className="pulse-dot w-2 h-2 rounded-full ml-1"
            style={{ background: 'var(--cyan)' }}
          />
        </div>

        {/* ULPIN */}
        <div className="flex items-center gap-3 px-4 py-2">
          <Hash size={14} style={{ color: 'var(--emerald)' }} />
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ULPIN Generated
            </div>
            <div className="font-medium font-display" style={{ color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--emerald)' }}>{VILLAGE_STATS.ulpinsGenerated}</span>{' '}Generated
              <span className="mx-1" style={{ color: 'var(--text-dim)' }}>·</span>
              <span style={{ color: 'var(--cyan)' }}>{VILLAGE_STATS.ulpinsLinked}</span>{' '}RoR-Linked
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="flex items-center gap-3 px-4 py-2">
          <AlertTriangle size={14} style={{ color: 'var(--crimson)' }} />
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Active Discrepancy Flags
            </div>
            <div className="font-medium font-display" style={{ color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--crimson)' }}>{VILLAGE_STATS.activeFlags} Parcels</span>{' '}Require Rover Re-Survey
            </div>
          </div>
        </div>

        {/* Drone status */}
        <div className="flex items-center gap-3 px-4 py-2">
          <Satellite size={14} style={{ color: 'var(--amber)' }} />
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Aerial Coverage
            </div>
            <div className="font-medium font-display" style={{ color: 'var(--text-primary)' }}>
              Sortie <span style={{ color: 'var(--amber)' }}>{VILLAGE_STATS.droneSortiesCompleted+1}</span>/{VILLAGE_STATS.totalPlannedSorties}{' '}
              <span className="blink" style={{ color: 'var(--amber)' }}>●</span> IN-FLIGHT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
