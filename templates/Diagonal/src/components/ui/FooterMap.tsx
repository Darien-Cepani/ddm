import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Diagonal HQ — Golden Park Residence, Rruga "Faik Konica", Tirana
const HQ: [number, number] = [41.3289, 19.8169];
const GMAPS = `https://www.google.com/maps/search/?api=1&query=${HQ[0]},${HQ[1]}`;

export default function FooterMap({ label = 'Open in Google Maps' }: { label?: string }) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!elRef.current || mapRef.current) return;

    const map = L.map(elRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      keyboard: false,
    }).setView(HQ, 16);
    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: `<span style="position:relative;display:flex;align-items:center;justify-content:center;width:22px;height:22px;">
               <span style="position:absolute;width:22px;height:22px;background:rgba(22,10,255,0.35);animation:dgPing 1.8s cubic-bezier(0,0,0.2,1) infinite;"></span>
               <span style="position:relative;width:12px;height:12px;background:#160aff;box-shadow:0 0 0 2.5px #fff;"></span>
             </span>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    L.marker(HQ, { icon }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.open(GMAPS, '_blank', 'noopener,noreferrer')}
      className="relative block w-full h-72 md:h-[420px] border border-white/10 overflow-hidden group cursor-pointer text-left"
      aria-label={label}
    >
      <div ref={elRef} className="absolute inset-0 pointer-events-none" />
      {/* click affordance */}
      <span className="absolute inset-0 z-[500] bg-brand-ink/0 group-hover:bg-brand-ink/30 transition-colors" />
      <span className="absolute top-3 right-3 z-[500] inline-flex items-center gap-1.5 bg-brand-blue text-white text-[10px] font-display font-semibold uppercase tracking-[0.12em] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={12} /> {label}
      </span>
      {/* corner ticks */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-blue z-[500] pointer-events-none" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-blue z-[500] pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-blue z-[500] pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-blue z-[500] pointer-events-none" />
      <span className="absolute bottom-2 right-2 z-[500] text-[9px] text-white/40 tracking-wide pointer-events-none">
        © OpenStreetMap · CARTO
      </span>
    </button>
  );
}
