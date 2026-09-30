import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { PARCELS, RTK_CONTROL_POINTS, DRONE_FLIGHT_PATH, type Parcel } from '../data/mockData';
import { VILLAGE_CENTER, DEFAULT_ZOOM, parseSvgPointsToLatLngs, svgToLatLng, geocodeLocation, getParcelCentroid } from '../utils/geoUtils';
import { Search, MapPin, Layers, Satellite, Map as MapIcon, Globe, Navigation, Loader2 } from 'lucide-react';

export type MapTileProvider = 'dark' | 'satellite' | 'osm' | 'topo';

interface LayerState {
  id: string;
  visible: boolean;
  opacity: number;
}

interface RealTimeMapProps {
  selectedParcel: Parcel | null;
  onSelectParcel: (parcel: Parcel | null) => void;
  layers: LayerState[];
  showAI: boolean;
}

const TILE_SERVERS: Record<MapTileProvider, { url: string; attribution: string; name: string }> = {
  satellite: {
    name: 'Satellite Aerial',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and GIS User Community',
  },
  dark: {
    name: 'Carto Dark Matter',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  osm: {
    name: 'OpenStreetMap Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  topo: {
    name: 'OpenTopoMap Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  }
};

export default function RealTimeMap({ selectedParcel, onSelectParcel, layers, showAI }: RealTimeMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const polygonLayersGroupRef = useRef<L.FeatureGroup | null>(null);
  const rtkGroupRef = useRef<L.FeatureGroup | null>(null);
  const droneGroupRef = useRef<L.FeatureGroup | null>(null);
  const rorGroupRef = useRef<L.FeatureGroup | null>(null);
  const searchMarkerRef = useRef<L.Marker | null>(null);

  const [tileProvider, setTileProvider] = useState<MapTileProvider>('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);

  const layerVisible = (id: string) => layers.find(l => l.id === id)?.visible ?? true;
  const layerOpacity = (id: string) => (layers.find(l => l.id === id)?.opacity ?? 100) / 100;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: VILLAGE_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false, // custom controls
      attributionControl: true,
    });

    // Add scale control
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Initial tile layer
    const initialTileConfig = TILE_SERVERS[tileProvider];
    const tileLayer = L.tileLayer(initialTileConfig.url, {
      maxZoom: 19,
      attribution: initialTileConfig.attribution,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Feature groups
    polygonLayersGroupRef.current = L.featureGroup().addTo(map);
    rtkGroupRef.current = L.featureGroup().addTo(map);
    droneGroupRef.current = L.featureGroup().addTo(map);
    rorGroupRef.current = L.featureGroup().addTo(map);

    // Track cursor coordinates
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorCoords({
        lat: Number(e.latlng.lat.toFixed(5)),
        lng: Number(e.latlng.lng.toFixed(5)),
      });
    });

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Provider Change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = TILE_SERVERS[tileProvider];
    const newTileLayer = L.tileLayer(config.url, {
      maxZoom: 19,
      attribution: config.attribution,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
  }, [tileProvider]);

  // Render Parcels Polygons
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = polygonLayersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    if (!layerVisible('parcels')) return;

    const pOpacity = layerOpacity('parcels');

    PARCELS.forEach(parcel => {
      const coords = parseSvgPointsToLatLngs(parcel.svgPoints);
      const isSelected = selectedParcel?.id === parcel.id;

      // Color coding logic
      const rawColor = showAI && parcel.status === 'proposed' ? '#F59E0B'
        : parcel.status === 'disputed' ? '#EF4444'
        : parcel.status === 'pending' ? '#64748B'
        : '#10B981';

      const polygon = L.polygon(coords, {
        color: isSelected ? '#06B6D4' : rawColor,
        weight: isSelected ? 3 : 1.5,
        opacity: isSelected ? 1.0 : Math.min(1.0, pOpacity + 0.2),
        fillColor: rawColor,
        fillOpacity: isSelected ? 0.6 : pOpacity * 0.45,
        className: 'parcel-polygon-layer',
      });

      // Tooltip
      const statusLabel = parcel.status === 'verified' ? 'Verified' : parcel.status === 'proposed' ? 'AI Proposed' : parcel.status === 'disputed' ? 'Disputed' : 'Pending';
      polygon.bindTooltip(`
        <div style="font-family: var(--font-sans); font-size: 11px;">
          <strong style="color: ${rawColor}">Khasra ${parcel.khasraNo}</strong> · ${parcel.ownerName}<br/>
          <span style="color: var(--text-dim);">${parcel.area} Bigha (${parcel.areaHectare} ha) · ${statusLabel}</span>
        </div>
      `, { sticky: true });

      // Click to select parcel
      polygon.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectParcel(parcel);
      });

      polygon.addTo(group);
    });
  }, [layers, showAI, selectedParcel, onSelectParcel]);

  // Render RTK Control Points Layer
  useEffect(() => {
    const group = rtkGroupRef.current;
    if (!group) return;

    group.clearLayers();

    if (!layerVisible('rover')) return;

    const rOpacity = layerOpacity('rover');

    RTK_CONTROL_POINTS.forEach(gcp => {
      const color = gcp.status === 'locked' ? '#06B6D4' : gcp.status === 'flagged' ? '#EF4444' : '#F59E0B';

      const marker = L.circleMarker([gcp.gnssLat, gcp.gnssLon], {
        radius: 6,
        color: color,
        weight: 2,
        opacity: rOpacity,
        fillColor: color,
        fillOpacity: rOpacity * 0.8,
      });

      marker.bindTooltip(`
        <div style="font-family: var(--font-mono); font-size: 11px;">
          <strong style="color: ${color}">${gcp.id}</strong> (RTK GCP)<br/>
          Accuracy: ±${(gcp.accuracy * 100).toFixed(1)} cm · ${gcp.status.toUpperCase()}<br/>
          <span style="color: #94A3B8;">${gcp.gnssLat.toFixed(5)}° N, ${gcp.gnssLon.toFixed(5)}° E</span>
        </div>
      `);

      marker.addTo(group);
    });
  }, [layers]);

  // Render Drone Flight Path Polyline Layer
  useEffect(() => {
    const group = droneGroupRef.current;
    if (!group) return;

    group.clearLayers();

    if (!layerVisible('drone')) return;

    const dOpacity = layerOpacity('drone');

    const latLngs = DRONE_FLIGHT_PATH.map(pt => svgToLatLng(pt.x, pt.y));

    const polyline = L.polyline(latLngs, {
      color: '#8B5CF6',
      weight: 2,
      dashArray: '6, 6',
      opacity: dOpacity * 0.85,
    });

    polyline.bindTooltip('<span style="color: #8B5CF6; font-weight: 600;">Drone Sortie Flight Track #04</span>');

    polyline.addTo(group);
  }, [layers]);

  // Render RoR Status Indicators Layer
  useEffect(() => {
    const group = rorGroupRef.current;
    if (!group) return;

    group.clearLayers();

    if (!layerVisible('ror')) return;

    const rorOpacity = layerOpacity('ror');

    PARCELS.forEach(parcel => {
      const centroid = getParcelCentroid(parcel);
      const color = parcel.rorStatus === 'linked' ? '#10B981' : parcel.rorStatus === 'mismatch' ? '#F59E0B' : parcel.rorStatus === 'disputed' ? '#EF4444' : '#64748B';

      const circle = L.circleMarker(centroid, {
        radius: 4,
        color: '#0F172A',
        weight: 1,
        fillColor: color,
        fillOpacity: rorOpacity,
      });

      circle.bindTooltip(`RoR Status: ${parcel.rorStatus.toUpperCase()}`);
      circle.addTo(group);
    });
  }, [layers]);

  // Handle Selected Parcel flyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedParcel) return;

    const centroid = getParcelCentroid(selectedParcel);
    map.flyTo(centroid, 17, { duration: 1.2 });
  }, [selectedParcel]);

  // Reset to Village Center
  const resetView = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo(VILLAGE_CENTER, DEFAULT_ZOOM, { duration: 1 });
    if (searchMarkerRef.current) {
      map.removeLayer(searchMarkerRef.current);
      searchMarkerRef.current = null;
    }
    setSearchMessage(null);
  }, []);

  // Search Handler (Khasra, ULPIN, Owner or Real-time Nominatim Geocoding)
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    setIsSearching(true);
    setSearchMessage(null);

    // 1. Check local cadastral parcels
    const matchedParcel = PARCELS.find(p =>
      p.khasraNo.toLowerCase().includes(q.toLowerCase()) ||
      p.ulpin.toLowerCase().includes(q.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(q.toLowerCase())
    );

    if (matchedParcel) {
      onSelectParcel(matchedParcel);
      setIsSearching(false);
      setSearchMessage(`Found Khasra ${matchedParcel.khasraNo} (${matchedParcel.ownerName})`);
      setTimeout(() => setSearchMessage(null), 3500);
      return;
    }

    // 2. Query Nominatim Real-Time Map Geocoding API
    const geoResult = await geocodeLocation(q);
    setIsSearching(false);

    if (geoResult && mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      map.flyTo([geoResult.lat, geoResult.lon], 14, { duration: 1.5 });

      if (searchMarkerRef.current) {
        map.removeLayer(searchMarkerRef.current);
      }

      const newMarker = L.marker([geoResult.lat, geoResult.lon])
        .bindPopup(`<b>${geoResult.displayName}</b><br/>Lat: ${geoResult.lat}, Lon: ${geoResult.lon}`)
        .addTo(map)
        .openPopup();

      searchMarkerRef.current = newMarker;
      setSearchMessage(`Location: ${geoResult.displayName.slice(0, 40)}...`);
      setTimeout(() => setSearchMessage(null), 5000);
    } else {
      setSearchMessage(`No matches found for "${q}"`);
      setTimeout(() => setSearchMessage(null), 4000);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#0A1628]">
      {/* Top Map Toolbar / Search & Basemap Controls */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Real-time Location / Cadastral Search Bar */}
        <form onSubmit={handleSearchSubmit} className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-lg"
          style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-bright)', backdropFilter: 'blur(8px)' }}>
          <Search size={14} style={{ color: 'var(--cyan)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Khasra (e.g. 112/1), Farmer Name or any Place..."
            className="bg-transparent text-xs w-64 md:w-80 outline-none font-sans"
            style={{ color: 'var(--text-primary)' }}
          />
          {isSearching ? (
            <Loader2 size={13} className="animate-spin" style={{ color: 'var(--cyan)' }} />
          ) : (
            <button type="submit" className="text-xs px-2 py-1 rounded font-medium transition-colors"
              style={{ background: 'var(--cyan-dim)', color: 'var(--cyan)', border: '1px solid rgba(6,182,212,0.3)' }}>
              Search
            </button>
          )}
        </form>

        {/* Real-time Tile Layer Selector */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-lg shadow-lg"
          style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-bright)', backdropFilter: 'blur(8px)' }}>
          {[
            { id: 'satellite' as MapTileProvider, label: 'Satellite', icon: <Satellite size={12} /> },
            { id: 'dark' as MapTileProvider, label: 'Dark Mode', icon: <Globe size={12} /> },
            { id: 'osm' as MapTileProvider, label: 'Street OSM', icon: <MapIcon size={12} /> },
            { id: 'topo' as MapTileProvider, label: 'Topo Terrain', icon: <Layers size={12} /> },
          ].map(b => (
            <button
              key={b.id}
              onClick={() => setTileProvider(b.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all"
              style={{
                background: tileProvider === b.id ? 'var(--cyan-dim)' : 'transparent',
                color: tileProvider === b.id ? 'var(--cyan)' : 'var(--text-secondary)',
                border: `1px solid ${tileProvider === b.id ? 'var(--cyan)' : 'transparent'}`,
              }}
            >
              {b.icon}
              <span className="hidden sm:inline">{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Status Message Toast */}
      {searchMessage && (
        <div className="absolute top-16 left-3 z-[1000] px-3 py-1.5 rounded text-xs font-medium shadow-md transition-all"
          style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}>
          {searchMessage}
        </div>
      )}

      {/* Leaflet Map Target Div */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Bottom Map Overlay Bar: Scale / Coords / Reset */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex items-center justify-between pointer-events-none">
        
        {/* Coordinates readout */}
        <div className="pointer-events-auto flex items-center gap-3 px-3 py-1.5 rounded text-xs font-mono-data shadow-md"
          style={{ background: 'rgba(15, 23, 42, 0.88)', border: '1px solid var(--border-dim)', color: 'var(--text-dim)' }}>
          <span className="flex items-center gap-1" style={{ color: 'var(--cyan)' }}>
            <MapPin size={12} /> Rampur Khurd Cadastral Survey
          </span>
          {cursorCoords ? (
            <span>{cursorCoords.lat}° N, {cursorCoords.lng}° E</span>
          ) : (
            <span>Hover map for coords</span>
          )}
          <span>Zoom: {currentZoom}x</span>
        </div>

        {/* Reset / Recenter Button */}
        <button
          onClick={resetView}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium shadow-md transition-colors"
          style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-bright)', color: 'var(--text-primary)' }}
        >
          <Navigation size={12} style={{ color: 'var(--cyan)' }} />
          Recenter Village
        </button>
      </div>
    </div>
  );
}
