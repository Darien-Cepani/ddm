import type { Project } from '../types';

export const getProjectsList = (lang: 'sq' | 'en'): Project[] => [
  {
    id: 1,
    title: "Golden Sand",
    location: lang === 'sq' ? "Baks Rrjoll, Shkodër" : "Baks Rrjoll, Shkoder",
    image: "https://cdn.sanity.io/images/ubwtzl2q/production/daf7a35c5b11b22e79ccd33c1c7ef7e72d937b02-2048x1143.jpg?w=1400&q=80",
    area: "18,500 m²",
    status: "new",
    features: lang === 'sq' 
      ? ["Vila luksoze private", "Apartamente me pamje nga deti", "Plazh ekskluziv privat", "Izolim ekologjik", "Zonë rekreative"]
      : ["Private luxury villas", "Sea-view apartments", "Exclusive private beach", "Eco-friendly insulation", "Recreational zone"],
    desc: {
      sq: "Golden Sand është një kompleks rezidencial dhe turistik modern i vendosur në bregdetin piktoresk të Baks Rrjollit, Shkodër. Projekti gërsheton arkitekturën bashkëkohore me natyrën e pacënuar, duke ofruar vila luksoze, apartamente me pamje nga deti dhe shërbime ekskluzive si pishina private, plazh privat dhe zona rekreative.",
      en: "Golden Sand is a modern residential and tourist complex located on the picturesque coast of Baks Rrjoll, Shkoder. The project blends contemporary architecture with untouched nature, offering luxury villas, sea-view apartments, and exclusive services like private pools, private beach, and recreational zones."
    },
    spec: {
      structure: lang === 'sq' ? "Kornizë betoni të përforcuar anti-seizmike" : "Reinforced anti-seismic concrete frame",
      facade: lang === 'sq' ? "Guri natyral i kombinuar me xham termo-izolues" : "Natural stone combined with thermal-insulated glass",
      energy: lang === 'sq' ? "Klasa A+ me panele fotovoltaike të integruara" : "Class A+ with integrated photovoltaic panels"
    }
  },
  {
    id: 2,
    title: "Peak Tower",
    location: lang === 'sq' ? "Rruga \"Muhamet Gjollesha\", Tiranë" : "Muhamet Gjollesha Street, Tirana",
    image: "https://cdn.sanity.io/images/ubwtzl2q/production/2cf93a396118e4bfa87bcebbe6707da91435f313-2048x1529.jpg?w=1400&q=80",
    area: "32,000 m²",
    status: "new",
    features: lang === 'sq'
      ? ["Zyra të klasit A", "Hapësira tregtare luksoze", "Rezidenca premium", "Fasadë xhami inteligjente", "4 kate parkim nëntokësor"]
      : ["Class A offices", "Luxury retail spaces", "Premium residences", "Smart glass facade", "4 underground parking levels"],
    desc: {
      sq: "Peak Tower përfaqëson një standard të ri të zhvillimit urban në zemër të Tiranës. Ky projekt madhështor shumëfunksional kombinon zyra të klasit A, hapësira tregtare luksoze dhe rezidenca premium, me një fasadë xhami inteligjente që kursen energjinë.",
      en: "Peak Tower represents a new standard of urban development in the heart of Tirana. This grand mixed-use project combines Class A offices, luxury retail spaces, and premium residences, featuring an energy-saving smart glass facade."
    },
    spec: {
      structure: lang === 'sq' ? "Strukturë metalike dhe beton i klasës së lartë" : "Steel composite structure with high-grade concrete",
      facade: lang === 'sq' ? "Fasadë e ventiluar dy-shtresore me xham inteligjent" : "Double-skin ventilated smart glass facade",
      energy: lang === 'sq' ? "Sistem qendror HVAC me rekuperim nxehtësie" : "Central HVAC system with heat recovery"
    }
  },
  {
    id: 3,
    title: "Golden Park Residence",
    location: lang === 'sq' ? "Rruga \"Faik Konica\", Tiranë" : "Faik Konica Street, Tirana",
    image: "https://cdn.sanity.io/images/ubwtzl2q/production/55026bbfdb0acdf889c079a867fcacaf03b1a92e-2048x1365.jpg?w=1400&q=80",
    area: "12,400 m²",
    status: "completed",
    year: "2022",
    features: lang === 'sq' ? ["Gjelbërim maksimal", "Ndërtim ekologjik", "Hapësira rekreative"] : ["Max green area", "Eco-friendly materials", "Recreational yards"],
    desc: {
      sq: "Golden Park Residence është një kompleks banimi elitar pranë qendrës së Tiranës, që ofron jetesë luksoze, hapësira të gjelbëruara, dhe siguri maksimale për të gjithë banorët.",
      en: "Golden Park Residence is an elite residential complex near the center of Tirana, delivering luxury living, extensive green spaces, and maximum 24/7 security for all residents."
    },
    spec: {
      structure: "Reinforced concrete",
      facade: "Thermal insulation layered",
      energy: "A+"
    }
  },
  {
    id: 4,
    title: "Zirkoni Residence",
    location: lang === 'sq' ? "Rruga \"Kongresi i Manastirit\", Tiranë" : "Kongresi i Manastirit Street, Tirana",
    image: "https://cdn.sanity.io/images/ubwtzl2q/production/cdea53cc6121e890cd6cb03ea9d41281b81b7af7-2048x1143.jpg?w=1400&q=80",
    area: "9,800 m²",
    status: "completed",
    year: "2023",
    features: lang === 'sq' ? ["Izolim akustik", "Ventilim natyral", "Parkim nëntokësor"] : ["Acoustic isolation", "Natural ventilation", "Underground parking"],
    desc: {
      sq: "Zirkoni Residence përfaqëson një qasje moderne të banimit urban me arkitekturë bashkëkohore dhe materiale ekologjike, duke siguruar mirëqenie dhe rehati.",
      en: "Zirkoni Residence represents a modern approach to urban living with contemporary architecture and green materials, ensuring comfort and sustainable wellness."
    },
    spec: {
      structure: "Anti-seismic concrete",
      facade: "Double skin frame",
      energy: "A"
    }
  },
  {
    id: 5,
    title: "Commercial & Residential Complex",
    location: lang === 'sq' ? "Rruga \"Sadik Petrela\", Tiranë" : "Sadik Petrela Street, Tirana",
    image: "https://cdn.sanity.io/images/ubwtzl2q/production/a384fb35ac23b36184e22a2346e151b7b6fdcb71-2048x1143.jpg?w=1400&q=80",
    area: "15,600 m²",
    status: "completed",
    year: "2022",
    features: lang === 'sq' ? ["Zyra moderne", "Sallë konferencash", "Panele diellore"] : ["Modern offices", "Conference rooms", "Solar integration"],
    desc: {
      sq: "Kompleks shumëfunksional me zyra, hapësira tregtare dhe rezidenca komode, i projektuar për të plotësuar të gjitha nevojat e bizneseve dhe familjeve moderne.",
      en: "Multi-functional complex incorporating Class-A offices, retail zones, and comfortable residences, tailored to modern business and family needs."
    },
    spec: {
      structure: "Composite steel",
      facade: "Glass grid curtain",
      energy: "A+"
    }
  },
  {
    id: 6,
    title: "Turdiu Center",
    location: lang === 'sq' ? "Rruga \"e Barrikadave\", Tiranë" : "Barrikadave Street, Tirana",
    image: "https://cdn.sanity.io/images/ubwtzl2q/production/e0ec13875a28dc16a2418b792997881259e8d311-2048x1529.jpg?w=1400&q=80",
    area: "24,000 m²",
    status: "completed",
    year: "2017",
    features: lang === 'sq' ? ["Qendër tregtare", "Sistem HVAC qendror", "Lokacion strategjik"] : ["Shopping mall", "Central HVAC system", "Strategic location"],
    desc: {
      sq: "Turdiu Center është një nga pikat më rëndësishme referuese tregtare në Tiranë, duke integruar zyrat e biznesit me qasjen rezidenciale.",
      en: "Turdiu Center stands as a prime commercial landmark in Tirana, merging central business suites and upscale residences seamlessly."
    },
    spec: {
      structure: "High grade concrete",
      facade: "Ventilated stone facade",
      energy: "A"
    }
  }
];
