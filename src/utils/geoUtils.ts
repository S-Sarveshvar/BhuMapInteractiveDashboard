import { Parcel } from '../data/mockData';

// Rampur Khurd Cadastral Survey Center: [23.0245, 77.0220]
export const VILLAGE_CENTER: [number, number] = [23.0245, 77.0220];
export const DEFAULT_ZOOM = 16;

/**
 * Converts mock SVG pixel coordinates to real-world Geographic Latitude & Longitude
 * within Rampur Khurd, Ichhawar Tehsil, Sehore District, Madhya Pradesh, India.
 */
export function svgToLatLng(x: number, y: number): [number, number] {
  const lng = 77.0170 + (x / 730) * 0.0100;
  const lat = 23.0265 - (y / 450) * 0.0050;
  return [Number(lat.toFixed(6)), Number(lng.toFixed(6))];
}

/**
 * Converts SVG polygon points string (e.g. "42,28 162,22 168,118 48,126")
 * into an array of Leaflet LatLng tuples [[lat, lng], [lat, lng], ...].
 */
export function parseSvgPointsToLatLngs(svgPointsStr: string): [number, number][] {
  const pairs = svgPointsStr.trim().split(/\s+/);
  return pairs.map(pair => {
    const [xStr, yStr] = pair.split(',');
    return svgToLatLng(parseFloat(xStr), parseFloat(yStr));
  });
}

/**
 * Calculates geographic centroid [lat, lng] for a given parcel.
 */
export function getParcelCentroid(parcel: Parcel): [number, number] {
  if (parcel.cx && parcel.cy) {
    return svgToLatLng(parcel.cx, parcel.cy);
  }
  return [parcel.gnssLat, parcel.gnssLon];
}

/**
 * Real-time Geocoding using Nominatim OpenStreetMap API
 */
export async function geocodeLocation(query: string): Promise<{ lat: number; lon: number; displayName: string } | null> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
      headers: {
        'User-Agent': 'BhuMapInteractiveDashboard/1.0'
      }
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
    return null;
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
}
