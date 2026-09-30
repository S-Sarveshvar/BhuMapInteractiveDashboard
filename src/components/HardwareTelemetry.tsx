import { Wifi, WifiOff, Battery, BatteryLow, Satellite, Wind, Camera, Radio, Activity, AlertTriangle } from 'lucide-react';
import { DRONES, ROVERS } from '../data/mockData';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const batteryHistory = [
  { t: '09:00', alpha: 100, bravo: 100 },
  { t: '10:30', alpha: 85, bravo: 88 },
  { t: '12:00', alpha: 71, bravo: 74 },
  { t: '13:30', alpha: 74, bravo: 32 },
  { t: '15:00', alpha: 62, bravo: 18 },
  { t: '16:38', alpha: 61, bravo: 18 },
];

const altitudeHistory = [
  { t: '16:16', alt: 0 }, { t: '16:18', alt: 42 }, { t: '16:20', alt: 87 },
  { t: '16:25', alt: 87 }, { t: '16:30', alt: 86 }, { t: '16:35', alt: 87 },
  { t: '16:38', alt: 87 },
];

function BatteryBar({ level, compact }: { level: number; compact?: boolean }) {
  const color = level > 50 ? 'var(--emerald)' : level > 20 ? 'var(--amber)' : 'var(--crimson)';
  if (compact) return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 rounded-full" style={{ background: 'var(--border-bright)' }}>
        <div className="h-full rounded-full" style={{ width: `${level}%`, background: color }} />
      </div>
      <span className="text-xs font-mono-data" style={{ color }}>{level}%</span>
    </div>
  );
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span style={{ color: 'var(--text-dim)' }}>Battery</span>
        <span className="font-mono-data" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-bright)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${level}%`, background: color }} />
      </div>
    </div>
  );
}

function StatusDot({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: ok ? 'var(--emerald)' : 'var(--crimson)' }} />
      <span className="text-xs" style={{ color: ok ? 'var(--text-secondary)' : 'var(--crimson)' }}>{label}</span>
    </div>
  );
}

function MetricBox({ label, value, unit, color }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <div className="rounded p-2.5 text-center" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-dim)' }}>
      <div className="text-xs mb-1" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div className="font-mono-data font-medium text-sm" style={{ color: color ?? 'var(--text-primary)' }}>
        {value}{unit && <span className="text-xs ml-0.5" style={{ color: 'var(--text-dim)' }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function HardwareTelemetry() {
  return (
    <div className="flex-1 overflow-y-auto p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto space-y-5">

        <div>
          <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
            Hardware Fleet Status
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
            BhuMap RTK Quadcopters + Rover Kits · Last telemetry refresh 12s ago
          </p>
        </div>

        {/* Drones */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Satellite size={14} style={{ color: 'var(--cyan)' }} />
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
              Survey Drones — RTK Quadcopters
            </h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {DRONES.map(drone => {
              const statusColor = drone.status === 'flying' ? 'var(--emerald)'
                : drone.status === 'charging' ? 'var(--amber)'
                : 'var(--text-dim)';
              return (
                <div key={drone.id} className="panel rounded-lg overflow-hidden">
                  <div className="px-4 py-3 flex items-center justify-between"
                    style={{ borderBottom: '1px solid var(--border-dim)', background: drone.status === 'flying' ? 'rgba(16,185,129,0.05)' : 'transparent' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: `${statusColor}22`, border: `1px solid ${statusColor}44` }}>
                        <Satellite size={16} style={{ color: statusColor }} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                          {drone.label}
                          <span className="font-mono-data text-xs ml-2" style={{ color: 'var(--text-dim)' }}>{drone.id}</span>
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-dim)' }}>Pilot: {drone.pilot}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium"
                      style={{ color: statusColor }}>
                      {drone.status === 'flying' && <span className="blink">●</span>}
                      {drone.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      <MetricBox label="Altitude" value={drone.altitude} unit="m" color="var(--cyan)" />
                      <MetricBox label="Flight Time" value={drone.flightTime > 0 ? `${drone.flightTime}m` : '—'} color="var(--text-primary)" />
                      <MetricBox label="Cam Triggers" value={drone.camTriggers.toLocaleString()} color="var(--amber)" />
                      <MetricBox label="Wind" value={drone.windSpeed} unit="kmh" color={drone.windSpeed > 25 ? 'var(--crimson)' : 'var(--text-secondary)'} />
                    </div>

                    <BatteryBar level={drone.battery} />

                    <div className="grid grid-cols-2 gap-3">
                      <StatusDot ok={drone.rtkLock} label={drone.rtkLock ? 'RTK/PPK GNSS Locked' : 'No RTK Lock'} />
                      <StatusDot ok={drone.gpsSats > 10} label={`${drone.gpsSats} Satellites`} />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--text-dim)' }}>Area Coverage</span>
                        <span className="font-mono-data" style={{ color: 'var(--cyan)' }}>
                          Sortie {drone.currentSortie}/{drone.totalSorties} — {drone.coveragePercent}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-bright)' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${(drone.currentSortie / drone.totalSorties) * 100}%`,
                          background: 'linear-gradient(to right, var(--cyan), var(--emerald))'
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Altitude chart */}
          <div className="panel rounded-lg p-4 mt-3">
            <div className="text-xs font-display font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
              BhuKopter Alpha — Live Altitude Profile (Today)
            </div>
            <div style={{ height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={altitudeHistory}>
                  <XAxis dataKey="t" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 120]} />
                  <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-bright)', borderRadius: 6, fontSize: 11 }}
                    itemStyle={{ color: 'var(--cyan)' }} labelStyle={{ color: 'var(--text-secondary)' }} />
                  <Line type="monotone" dataKey="alt" stroke="var(--cyan)" strokeWidth={1.5} dot={false} name="Altitude (m)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Rovers */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Radio size={14} style={{ color: 'var(--amber)' }} />
            <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
              RTK Rover Kits — Field Units
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROVERS.map(rover => {
              const statusColor = rover.status === 'active' ? 'var(--emerald)'
                : rover.status === 'idle' ? 'var(--amber)'
                : rover.status === 'charging' ? 'var(--cyan)'
                : 'var(--text-dim)';
              return (
                <div key={rover.id} className="panel rounded-lg overflow-hidden">
                  <div className="px-3 py-2.5 flex items-center justify-between"
                    style={{ borderBottom: '1px solid var(--border-dim)' }}>
                    <div>
                      <div className="font-display font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>
                        {rover.label}
                      </div>
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.6rem', fontFamily: 'var(--font-mono)' }}>{rover.id}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium" style={{ color: statusColor }}>
                      {rover.status === 'active' && <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: statusColor }} />}
                      {rover.status.charAt(0).toUpperCase() + rover.status.slice(1)}
                    </div>
                  </div>
                  <div className="p-3 space-y-2.5">
                    <div className="text-xs" style={{ color: 'var(--text-dim)' }}>Op: <span style={{ color: 'var(--text-secondary)' }}>{rover.operator}</span></div>

                    <BatteryBar level={rover.battery} compact />

                    <div className="space-y-1.5">
                      <StatusDot ok={rover.gnssLock} label={rover.gnssLock ? `GNSS Lock · ${rover.accuracy} cm RMS` : 'No GNSS Lock'} />
                      <StatusDot ok={rover.corsLink !== 'Standalone'} label={`Link: ${rover.corsLink}`} />
                      <StatusDot ok={rover.imuOk} label={`IMU Tilt: ${rover.imuTilt}°`} />
                      <StatusDot ok={rover.tabletConnected} label={rover.tabletConnected ? `Tablet: ${rover.tabletBattery}%` : 'No Tablet'} />
                    </div>

                    {rover.currentParcel && (
                      <div className="text-xs px-2 py-1 rounded font-mono-data"
                        style={{ background: 'var(--emerald-dim)', color: 'var(--emerald)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        Active: {rover.currentParcel}
                      </div>
                    )}

                    <div className="flex justify-between text-xs pt-1">
                      <span style={{ color: 'var(--text-dim)' }}>Fix Count</span>
                      <span className="font-mono-data" style={{ color: 'var(--text-secondary)' }}>{rover.fixCount}</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-dim)', fontSize: '0.6rem', fontFamily: 'var(--font-mono)' }}>
                      Last: {rover.lastFix}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Battery Drain Chart */}
        <div className="panel rounded-lg p-4">
          <div className="text-xs font-display font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
            Drone Battery Drain — Alpha vs. Bravo (Today's Sorties)
          </div>
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={batteryHistory}>
                <XAxis dataKey="t" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-bright)', borderRadius: 6, fontSize: 11 }}
                  itemStyle={{ color: 'var(--cyan)' }} labelStyle={{ color: 'var(--text-secondary)' }} />
                <Line type="monotone" dataKey="alpha" stroke="var(--cyan)" strokeWidth={1.5} dot={false} name="BhuKopter Alpha %" />
                <Line type="monotone" dataKey="bravo" stroke="var(--amber)" strokeWidth={1.5} dot={false} name="BhuKopter Bravo %" strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CORS Base Station */}
        <div className="panel rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={14} style={{ color: 'var(--cyan)' }} />
            <span className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              Reference Station Status
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded p-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>CORS Network</div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--emerald)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--emerald)' }}>MP-CORS Online</span>
              </div>
            </div>
            <div className="rounded p-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>Base Station</div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--emerald)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--emerald)' }}>Gram Panchayat Rooftop</span>
              </div>
            </div>
            <div className="rounded p-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>Baseline Distance</div>
              <div className="text-xs font-mono-data font-medium" style={{ color: 'var(--cyan)' }}>3.2 km</div>
            </div>
            <div className="rounded p-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-dim)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>Network RMS</div>
              <div className="text-xs font-mono-data font-medium" style={{ color: 'var(--emerald)' }}>±1.4 cm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
