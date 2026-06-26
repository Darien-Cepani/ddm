import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  X,
  ArrowRight,
  MapPin,
  Phone,
  Instagram,
  Search,
  Heart,
  ShieldCheck,
  Sparkles,
  Clock,
  Check,
  MessageCircle,
  Mail
} from 'lucide-react';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Graceful fallback when a remote (Unsplash) image fails to load, so cards never
// degrade into raw alt text. Falls back to a known-stable editorial image.
const IMAGE_FALLBACK = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200";
const handleImageError = (e) => {
  if (e.currentTarget.src !== IMAGE_FALLBACK) {
    e.currentTarget.src = IMAGE_FALLBACK;
  }
};

// --- BILINGUAL DICTIONARY (English / Albanian) -----------------------------
// Every visible UI string lives here keyed by language so the whole site can be
// toggled between English ("en") and Albanian ("sq") at runtime.
const LANG = {
  en: {
    tagline: "LUXURY BOUTIQUE",
    categories: { all: "All", apparel: "Apparel", jewelry: "Jewelry", perfumes: "Perfumes", flowers: "Flowers" },
    nav: { browse: "Browse Showroom", book: "Book Sitting" },
    hero: {
      leftEyebrow: "Atelier Spring Campaign '26",
      leftTitleA: "The Quiet Elegance of", leftTitleEm: "Structure",
      leftBody: "Sharply-tailored Italian silhouettes, fine drapery, and curated garments designed for modern distinction.",
      leftCta: "Explore Apparel",
      rightEyebrow: "Olfactory & Flora",
      rightTitleA: "Ethereal Petals &", rightTitleEm: "Scented Poetry",
      rightBody: "Custom-blended French perfumery oils and structural botanical bouquets assembled fresh in our Tirana workshop.",
      rightCta: "Explore Fragrances",
      scroll: "Scroll Down"
    },
    editorial: {
      eyebrow: "Atelier Vision & Creed",
      quote: "“We believe curation is a sacred art. Each dress, each drop of amber oil, and each hand-tied rose is carefully selected to evoke memories, awaken the senses, and craft an exquisite sanctuary of everyday luxury.”"
    },
    collections: {
      eyebrow: "Explore the Boutique",
      title: "The Curated Collections",
      intro: "Explore our limited-batch seasonal releases. Every category is meticulously curated to bring Tirana’s Bllok neighborhood the zenith of haute couture, fine ornaments, and olfactory poetry.",
      cards: [
        { num: "01 / Curated Wardrobe", title: "Prêt-à-Porter", discover: "Discover Clothing" },
        { num: "02 / Finely Crafted", title: "Fine Ornaments", discover: "Discover Jewelry" },
        { num: "03 / Olfactory Art", title: "Scented Poetry", discover: "Discover Scent" },
        { num: "04 / Fresh Arrangements", title: "Botanical Design", discover: "Discover Flora" }
      ]
    },
    shop: {
      eyebrow: "Curated Catalogue",
      title: "Atelier Exhibition Curation",
      inquire: "Inquire Specimen"
    },
    consult: {
      eyebrow: "Private Sittings",
      title: "Exclusive Showroom Consultations",
      body: "Book a private, after-hours sitting at our Tirana showroom. Indulge in bespoke bridal floral designs, fine jewelry styling, or custom fragrance layering profiles with our head curator.",
      cta: "Request Private Booking"
    },
    visit: {
      eyebrow: "The Tirana Showroom",
      title: "Visit the Atelier",
      body: "Experience the physical sanctuary of Jardin Luxury Boutique in person. Located in the heart of Tirana's Bllok district, our showroom offers a quiet luxury atmosphere where you can explore our collections and receive personal curation.",
      addressLabel: "Our Address",
      addressNote: "Near the President's Residence",
      hoursLabel: "Opening Hours",
      days: ["Monday — Friday", "Saturday", "Sunday"],
      hoursNote: "Special appointments outside hours on request",
      contactLabel: "Direct Showroom Contact",
      inquiriesWord: "Inquiries:",
      emailWord: "Email:",
      loading: "Loading Showroom Map…"
    },
    social: {
      eyebrow: "Social Feed",
      viewPost: "View Post",
      tiles: ["Atelier Romanticism", "Showroom Architecture", "Olfactory Layering", "Baroque Curation"]
    },
    footer: {
      about: "An intimate sanctuary of haute Prêt-à-Porter wardrobe curations, bespoke ornaments, personalized perfumery profiles, and premium floral designs. Located in Bllok, Tirana.",
      collections: "Collections",
      salon: "The Salon",
      salonDays: ["Mon — Fri", "Saturday", "Sunday"],
      salonNote: "Bespoke private sittings are available upon early atelier request.",
      circle: "The Circle",
      circleBody: "Subscribe to our private circle and receive invitations to seasonal showroom arrivals and luxury workshops.",
      emailPlaceholder: "Atelier Email Address",
      requestEntry: "Request Entry",
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms"
    },
    modal: {
      selected: "Selected Specimen",
      exclusive: "Exclusive Atelier Specimen",
      details: "Details & Composition",
      guarantee: "Curated Atelier Quality Guarantee",
      inquire: "Inquire About This Piece",
      wishlisted: "Wishlisted",
      add: "Add to Private Collection"
    },
    drawer: {
      searchTitle: "Search the Atelier",
      searchPlaceholder: "Search garments, scents, blooms…",
      searchHint: "Begin typing to explore the collection — by name, category, or note.",
      noResults: "No specimens match your search.",
      wishlistTitle: "Your Private Collection",
      wishlistSubtitle: "A curated edit of the specimens you have saved.",
      wishlistEmpty: "Your collection is empty.",
      wishlistEmptyHint: "Tap the heart on any specimen to save it here.",
      remove: "Remove",
      close: "Close"
    },
    toast: {
      search: "Search is currently offline for this showcase.",
      wishlist: (n) => `Your curated collection has ${n} item(s).`,
      inquiry: (n) => `Atelier inquiry sent for "${n}". Our curators will contact you.`,
      removed: (n) => `Removed "${n}" from your private list.`,
      added: (n) => `Added "${n}" to your private list.`,
      newsletter: "Subscription successful. Welcome to the Jardin Atelier Circle.",
      booking: "Booking portal is offline. Please call +355 69 863 7620."
    }
  },
  sq: {
    tagline: "BUTIK LUKSI",
    categories: { all: "Të Gjitha", apparel: "Veshje", jewelry: "Bizhuteri", perfumes: "Parfume", flowers: "Lule" },
    nav: { browse: "Shfleto Sallonin", book: "Rezervo Takim" },
    hero: {
      leftEyebrow: "Fushata e Pranverës '26",
      leftTitleA: "Eleganca e Qetë e", leftTitleEm: "Strukturës",
      leftBody: "Silueta italiane të qepura me kujdes, drapëri të hollë dhe veshje të kuruara për dallim modern.",
      leftCta: "Eksploro Veshjet",
      rightEyebrow: "Aroma & Flora",
      rightTitleA: "Petale Eterike &", rightTitleEm: "Poezi e Aromatizuar",
      rightBody: "Vajra parfumesh franceze të përziera me porosi dhe buqeta botanike strukturore, të përgatitura të freskëta në punishtën tonë në Tiranë.",
      rightCta: "Eksploro Parfumet",
      scroll: "Zbrit Poshtë"
    },
    editorial: {
      eyebrow: "Vizioni & Kredoja e Atelierit",
      quote: "“Ne besojmë se kurimi është një art i shenjtë. Çdo fustan, çdo pikë vaji qelibari dhe çdo trëndafil i lidhur me dorë zgjidhet me kujdes për të zgjuar kujtime, për të zgjuar shqisat dhe për të krijuar një strehë të mrekullueshme luksi të përditshëm.”"
    },
    collections: {
      eyebrow: "Eksploroni Butikun",
      title: "Koleksionet e Kuruara",
      intro: "Eksploroni koleksionet tona sezonale me sasi të kufizuara. Çdo kategori kurohet me përpikëri për t'i sjellë lagjes Bllok të Tiranës kulmin e modës së lartë, ornamenteve të çmuara dhe poezisë së aromave.",
      cards: [
        { num: "01 / Garderoba e Kuruar", title: "Prêt-à-Porter", discover: "Zbulo Veshjet" },
        { num: "02 / Punuar me Mjeshtëri", title: "Bizhuteri të Çmuara", discover: "Zbulo Bizhuteritë" },
        { num: "03 / Arti i Aromave", title: "Poezi e Aromatizuar", discover: "Zbulo Parfumet" },
        { num: "04 / Buqeta të Freskëta", title: "Dizajn Botanik", discover: "Zbulo Florën" }
      ]
    },
    shop: {
      eyebrow: "Katalogu i Kuruar",
      title: "Kurimi i Ekspozitës së Atelierit",
      inquire: "Pyet për Pjesën"
    },
    consult: {
      eyebrow: "Takime Private",
      title: "Konsulta Ekskluzive në Sallon",
      body: "Rezervoni një takim privat pas orarit në sallonin tonë në Tiranë. Shijoni dizajne floreale nusërie, stilim bizhuterish ose profile parfumesh të personalizuara me kuratorin tonë kryesor.",
      cta: "Kërko Rezervim Privat"
    },
    visit: {
      eyebrow: "Salloni në Tiranë",
      title: "Vizitoni Atelierin",
      body: "Përjetoni personalisht strehën fizike të Jardin Luxury Boutique. E vendosur në zemër të lagjes Bllok në Tiranë, salloni ynë ofron një atmosferë luksi të qetë ku mund të eksploroni koleksionet dhe të merrni kurim personal.",
      addressLabel: "Adresa Jonë",
      addressNote: "Pranë Rezidencës së Presidentit",
      hoursLabel: "Orari i Hapjes",
      days: ["E hënë — E premte", "E shtunë", "E diel"],
      hoursNote: "Takime speciale jashtë orarit me kërkesë",
      contactLabel: "Kontakt i Drejtpërdrejtë",
      inquiriesWord: "Pyetje:",
      emailWord: "Email:",
      loading: "Duke ngarkuar hartën…"
    },
    social: {
      eyebrow: "Rrjetet Sociale",
      viewPost: "Shiko Postimin",
      tiles: ["Romanticizëm Atelieri", "Arkitekturë Salloni", "Shtresëzim Aromash", "Kurim Barok"]
    },
    footer: {
      about: "Një strehë intime e garderobës haute Prêt-à-Porter, ornamenteve të personalizuara, profileve të parfumerisë dhe dizajneve premium floreale. E vendosur në Bllok, Tiranë.",
      collections: "Koleksionet",
      salon: "Salloni",
      salonDays: ["Hën — Pre", "E shtunë", "E diel"],
      salonNote: "Takime private me porosi ofrohen me kërkesë të hershme.",
      circle: "Rrethi",
      circleBody: "Abonohuni në rrethin tonë privat dhe merrni ftesa për ardhjet sezonale dhe punëtoritë e luksit.",
      emailPlaceholder: "Adresa juaj e email-it",
      requestEntry: "Bashkohu",
      rights: "Të gjitha të drejtat e rezervuara.",
      privacy: "Privatësia",
      terms: "Kushtet"
    },
    modal: {
      selected: "Pjesë e Zgjedhur",
      exclusive: "Pjesë Ekskluzive Atelieri",
      details: "Detaje & Përbërje",
      guarantee: "Garanci Cilësie e Atelierit",
      inquire: "Pyet për këtë Pjesë",
      wishlisted: "E Ruajtur",
      add: "Shto në Koleksion Privat"
    },
    drawer: {
      searchTitle: "Kërko në Atelier",
      searchPlaceholder: "Kërko veshje, parfume, lule…",
      searchHint: "Filloni të shkruani për të eksploruar koleksionin — sipas emrit, kategorisë ose notës.",
      noResults: "Asnjë pjesë nuk përputhet me kërkimin.",
      wishlistTitle: "Koleksioni Juaj Privat",
      wishlistSubtitle: "Një përzgjedhje e kuruar e pjesëve që keni ruajtur.",
      wishlistEmpty: "Koleksioni juaj është bosh.",
      wishlistEmptyHint: "Prekni zemrën te çdo pjesë për ta ruajtur këtu.",
      remove: "Hiq",
      close: "Mbyll"
    },
    toast: {
      search: "Kërkimi është aktualisht jashtë funksionit për këtë ekspozitë.",
      wishlist: (n) => `Koleksioni juaj ka ${n} artikull(a).`,
      inquiry: (n) => `Pyetja për "${n}" u dërgua. Kuratorët tanë do t'ju kontaktojnë.`,
      removed: (n) => `"${n}" u hoq nga lista juaj private.`,
      added: (n) => `"${n}" u shtua në listën tuaj private.`,
      newsletter: "Abonimi me sukses. Mirë se vini në Rrethin e Jardin Atelier.",
      booking: "Portali i rezervimeve është jashtë funksionit. Ju lutemi telefononi +355 69 863 7620."
    }
  }
};

// Curated mock products. Names are proper product nouns (kept identical across
// languages); descriptions and detail bullets are bilingual.
const PRODUCTS = [
  {
    id: 1,
    name: "La Rose Sauvage Eau de Parfum",
    category: "perfumes",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
    description: {
      en: "A dramatic, bold blend of wild Turkish rose, warm patchouli, and deep golden amber notes. Captures the high-contrast romanticism of the Jardin Boutique.",
      sq: "Një përzierje dramatike dhe e guximshme trëndafili të egër turk, paçuli të ngrohtë dhe qelibar të artë e të thellë. Kap romanticizmin me kontrast të lartë të Jardin Boutique."
    },
    details: {
      en: ["100ml / 3.4 fl. oz.", "Key notes: Turkish Rose, Patchouli, Saffron, Amber", "Hand-labeled in Tirana atelier"],
      sq: ["100ml / 3.4 fl. oz.", "Nota kryesore: Trëndafil Turk, Paçuli, Shafran, Qelibar", "Etiketuar me dorë në atelierin e Tiranës"]
    }
  },
  {
    id: 2,
    name: "Gold Baroque Pearl Drop Earrings",
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200",
    description: {
      en: "Asymmetrical natural baroque freshwater pearls suspended from elegant, minimal 14k gold hoops. Each pair is uniquely structured, representing raw, quiet luxury.",
      sq: "Perla baroke natyrale të ujërave të ëmbla, asimetrike, të varura nga unaza minimale prej ari 14k. Çdo palë është unike në strukturë, mishërim i luksit të qetë."
    },
    details: {
      en: ["14k yellow solid gold", "Cultured freshwater baroque pearls", "Hypoallergenic, ultra-lightweight"],
      sq: ["Ar i plotë i verdhë 14k", "Perla baroke të kultivuara", "Hipoalergjike, ultra të lehta"]
    }
  },
  {
    id: 3,
    name: "Oversized Double-Breasted Wool Blazer",
    category: "apparel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200",
    description: {
      en: "An elegant, structured silhouette tailored from double-breasted fine Italian wool. Features custom padded shoulders, silk lining, and charcoal marbled buttons.",
      sq: "Një siluetë elegante dhe e strukturuar e qepur prej leshi të hollë italian me dy radhë kopsash. Me supe të mbushura, astar mëndafshi dhe kopsa mermeri qymyri."
    },
    details: {
      en: ["100% Italian Virgin Wool", "Silk-satin inner lining", "Relaxed tailored fit"],
      sq: ["100% lesh i virgjër italian", "Astar i brendshëm prej mëndafshi-satin", "Prerje e rehatshme"]
    }
  },
  {
    id: 4,
    name: "Eucalyptus & White Rose Botanical Bouquet",
    category: "flowers",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200",
    description: {
      en: "A modern, organic curation of fresh silver dollar eucalyptus, ivory garden roses, white hydrangeas, and delicate field greenery. Arranged in Parisian style.",
      sq: "Një kompozim modern dhe organik eukalipti të freskët, trëndafilave fildishtë, hortensieve të bardha dhe gjelbërimi delikat. Rregulluar në stil parizien."
    },
    details: {
      en: ["Fresh cut daily", "Includes ceramic minimalist vase", "Care instructions included"],
      sq: ["Prerë të freskët çdo ditë", "Përfshin vazo minimaliste qeramike", "Me udhëzime kujdesi"]
    }
  },
  {
    id: 5,
    name: "Noir Velvet Bias-Cut Evening Slip Dress",
    category: "apparel",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200",
    description: {
      en: "A fluid, bias-cut slip dress crafted in heavy noir velvet-satin. Drapes beautifully along the body, with a subtle low-back cut and delicate adjustable thin straps.",
      sq: "Një fustan i lëngshëm me prerje diagonale prej kadifeje-satin të zezë. Bie bukur përgjatë trupit, me prerje të ulët në shpinë dhe rripa të hollë të rregullueshme."
    },
    details: {
      en: ["Velvet-infused silk blend", "Bias-cut for a natural, flowing silhouette", "Dry clean only"],
      sq: ["Përzierje mëndafshi me kadife", "Prerje diagonale për siluetë natyrale", "Vetëm pastrim kimik"]
    }
  },
  {
    id: 6,
    name: "L'Ambre Impérial Perfume Oil",
    category: "perfumes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200",
    description: {
      en: "A highly concentrated luxury perfume oil. Warm base of rich golden amber, madagascar vanilla, and creamy sandalwood infused in high-purity jojoba oil.",
      sq: "Një vaj parfumi luksoz shumë i koncentruar. Bazë e ngrohtë qelibari të artë, vanilje madagaskari dhe sandali kremoz në vaj jojoba të pastër."
    },
    details: {
      en: ["50ml / 1.7 fl. oz. roll-on bottle", "Zero alcohol formulation", "Long-lasting warm sillage"],
      sq: ["Shishe 50ml / 1.7 fl. oz. me rul", "Formulë pa alkool", "Aromë e ngrohtë dhe e qëndrueshme"]
    }
  },
  {
    id: 7,
    name: "Minimalist Gold Solitaire Pearl Ring",
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200",
    description: {
      en: "Handcrafted solid yellow gold band featuring a single, high-luster white freshwater pearl. Timeless, modern design that acts as a quiet luxury statement.",
      sq: "Unazë e punuar me dorë prej ari të verdhë me një perlë të vetme të bardhë ujërash të ëmbla me shkëlqim të lartë. Dizajn modern dhe i përjetshëm."
    },
    details: {
      en: ["18k solid yellow gold", "8.5mm AAA freshwater pearl", "Comfort-fit band"],
      sq: ["Ar i plotë i verdhë 18k", "Perlë 8.5mm AAA", "Brez i rehatshëm"]
    }
  },
  {
    id: 8,
    name: "Casablanca Lilies & Monstera Arrangement",
    category: "flowers",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200",
    description: {
      en: "A high-fashion arrangement combining the wild, structural leaves of split-leaf monstera with pure sweet-scented Casablanca white lilies.",
      sq: "Një kompozim mode i lartë që ndërthur gjethet e egra strukturore të monsterës me zambakë të bardhë Casablanca me aromë të ëmbël."
    },
    details: {
      en: ["Sustainably sourced blooms", "Premium wrapping with silk ribbon", "Express local delivery ready"],
      sq: ["Lule të siguruara në mënyrë të qëndrueshme", "Mbështjellje premium me fjongo mëndafshi", "Gati për dërgim lokal të shpejtë"]
    }
  }
];

// Reusable right-hand slide-in drawer (search & wishlist). Defined at module
// scope so it keeps a stable component identity across re-renders — otherwise
// the search input inside would remount on every keystroke and lose focus.
function SideDrawer({ open, onClose, title, subtitle, closeLabel, children }) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[160] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed top-0 right-0 z-[170] h-full w-full max-w-md bg-white shadow-2xl border-l border-brand-champagne/40 flex flex-col transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 py-6 border-b border-brand-champagne/40">
          <div>
            <h3 className="text-lg font-serif text-brand-dark tracking-wide">{title}</h3>
            {subtitle && <p className="text-xs text-brand-dark/55 font-sans font-light mt-1 tracking-wide leading-relaxed">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="p-2 -mr-2 text-brand-dark hover:text-brand-gold transition-colors shrink-0"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          {children}
        </div>
      </aside>
    </>
  );
}

export default function App() {
  // State variables
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorHovering, setCursorHovering] = useState(false);
  const [lang, setLang] = useState("en");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Active-language string bundle + small helpers
  const t = LANG[lang];
  const catLabel = (c) => t.categories[c] || c;

  // Refs for GSAP
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const headerRef = useRef(null);
  const bookBtnRef = useRef(null);
  const searchInputRef = useRef(null);

  // React Map Reference to safely prevent Leaflet initialization collision
  const mapRef = useRef(null);

  // Keep the document language + title in sync for accessibility / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "sq"
      ? "Jardin Luxury Boutique — Lule, Parfume & Modë e Lartë"
      : "Jardin Luxury Boutique — Curated Flowers, Perfumes & High Fashion";
  }, [lang]);

  // Lock body scroll while any overlay (search / wishlist / modal) is open.
  useEffect(() => {
    const anyOpen = searchOpen || wishlistOpen || selectedProduct;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen, wishlistOpen, selectedProduct]);

  // Focus the search field once the drawer has slid in.
  useEffect(() => {
    if (searchOpen) {
      setSearchQuery("");
      const id = setTimeout(() => searchInputRef.current?.focus(), 320);
      return () => clearTimeout(id);
    }
  }, [searchOpen]);

  // Escape closes any open overlay.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setWishlistOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // --- MOUSE CURSOR HIGH-FIDELITY TRACKING (0 DELAY) ---
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Update central dot instantly via inline styles (ABSOLUTELY ZERO LAG/DELAY)
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      // Ring has a fluid, ultra-snappy GSAP follow to feel organic yet completely attached
      gsap.to(ring, {
        left: x,
        top: y,
        duration: 0.1, // extremely snappy follow curve
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Set up custom cursor hover states with organic liquid scaling
  const triggerCursor = (text = "", isHovering = true) => {
    setCursorText(text);
    setCursorHovering(isHovering);

    gsap.to(cursorRingRef.current, {
      scale: isHovering ? 1.3 : 1,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(cursorDotRef.current, {
      scale: isHovering ? 0.6 : 1,
      backgroundColor: isHovering ? '#D4AF37' : '#ffffff', // glows gold on hover
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // --- PRELOADER & REVEAL TIMELINE (Overhauled to light theme & bolder typeface) ---
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
      }
    });

    // Masked, staggered slide-up reveal of each letter
    tl.fromTo(".loader-letter", {
      yPercent: 120
    }, {
      yPercent: 0,
      stagger: 0.08,
      duration: 1.0,
      ease: 'power4.out'
    });

    // Gold hairline expands beneath the wordmark
    tl.fromTo(".loader-line", {
      width: 0,
      opacity: 0
    }, {
      width: 180,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.inOut'
    }, "-=0.45");

    // Tagline fades in while the wordmark breathes wider
    tl.to(".loader-sub", {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.55");

    tl.to(".loader-letter-group", {
      letterSpacing: '0.32em',
      duration: 1.1,
      ease: 'power2.out'
    }, "-=0.9");

    // Hold a beat, then sweep the whole panel up to reveal the site
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 1.25,
      ease: 'power4.inOut'
    }, "+=0.35")
    .set(loaderRef.current, { pointerEvents: 'none' });

    // Clean, Apple-style masked slide-up reveal for Hero elements (removes glitchy idle floating)
    tl.fromTo(".hero-animate", {
      yPercent: 100,
      opacity: 0,
      skewY: 3
    }, {
      yPercent: 0,
      opacity: 1,
      skewY: 0,
      stagger: 0.05,
      duration: 0.85,
      ease: 'power3.out'
    }, "-=0.6");

    tl.fromTo(headerRef.current, {
      y: -80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=1.1");
  }, { scope: containerRef });

  // --- SCROLL ANIMATIONS ---
  useGSAP(() => {
    if (loading) return;

    // Stagger characters in editorial philosophy text on scroll
    gsap.fromTo(".editorial-text",
      { opacity: 0.25, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: ".editorial-section",
          start: "top 80%",
          end: "center 65%",
          scrub: true,
        }
      }
    );

    // Reveal category cards
    gsap.utils.toArray(".collection-card").forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // --- PARALLAX ON ALL IMAGERY ---
    // Foreground <img> elements (object-cover): a small base scale gives overflow
    // room, then we translate vertically as the element travels the viewport. GSAP
    // owns the transform here, so the scale + translate compose cleanly with the
    // GSAP hover-zoom without the two fighting over the same `transform`.
    gsap.utils.toArray(".parallax-img").forEach((img) => {
      gsap.set(img, { scale: 1.16, transformOrigin: "center center" });
      gsap.fromTo(img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // Background-image panels: shift background-position instead of transform, so the
    // existing CSS hover-zoom (group-hover:scale-105) on these cards keeps working.
    gsap.utils.toArray(".parallax-bg").forEach((bg) => {
      gsap.fromTo(bg,
        { backgroundPosition: "50% 30%" },
        {
          backgroundPosition: "50% 70%",
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // Recalculate trigger positions once lazy images have settled.
    ScrollTrigger.refresh();

    // Sticky navbar morphs/scales on Scroll (Snaps top, removes floating, gains solid white blur, remains square rounded-none)
    ScrollTrigger.create({
      start: "top -30",
      onEnter: () => {
        // Hero → solid: drop the gradient scrim, tighten padding, switch to a clean white bar.
        headerRef.current.classList.add("bg-white/95", "backdrop-blur-md", "shadow-sm", "border-b", "border-brand-champagne/40", "text-brand-dark", "py-3", "md:py-4");
        headerRef.current.classList.remove("text-white", "bg-gradient-to-b", "from-black/60", "via-black/20", "to-transparent", "py-5", "md:py-6");
        // Invert the Book Sitting button: white on the hero, solid dark once the bar turns white.
        bookBtnRef.current?.classList.add("bg-brand-dark", "text-white");
        bookBtnRef.current?.classList.remove("bg-white", "text-brand-dark");
      },
      onLeaveBack: () => {
        headerRef.current.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-sm", "border-b", "border-brand-champagne/40", "text-brand-dark", "py-3", "md:py-4");
        headerRef.current.classList.add("text-white", "bg-gradient-to-b", "from-black/60", "via-black/20", "to-transparent", "py-5", "md:py-6");
        bookBtnRef.current?.classList.remove("bg-brand-dark", "text-white");
        bookBtnRef.current?.classList.add("bg-white", "text-brand-dark");
      }
    });

    // Infinite slow, stately spin for custom cursor text (crystal clear legibility)
    gsap.to(".cursor-svg-text", {
      rotation: 360,
      repeat: -1,
      duration: 22,
      ease: "none"
    });

    // Workshops banner background parallax scale zoom on scroll
    gsap.fromTo(".workshops-banner-bg",
      { scale: 1 },
      {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: "#showroom-consultations",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Sparkle drift sways in booking consultations banner
    gsap.fromTo(".workshops-sparkle",
      { y: 0, rotation: 0, opacity: 0.3 },
      {
        y: -25,
        rotation: 180,
        opacity: 0.9,
        duration: 4,
        stagger: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      }
    );

  }, [loading]);

  // --- MINIMALIST CRISP HOVER HANDLERS (VOGUE MINIMAL STACK) ---
  const handleCardMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.specimen-img');
    const label = card.querySelector('.inquire-label');

    gsap.to(card, {
      y: -6,
      duration: 0.4,
      ease: "power2.out"
    });
    if (img) gsap.to(img, { scale: 1.21, duration: 0.6, ease: "power2.out" });
    if (label) gsap.to(label, { color: "#0A0A0A", duration: 0.3 });
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.specimen-img');
    const label = card.querySelector('.inquire-label');

    gsap.to(card, {
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    });
    if (img) gsap.to(img, { scale: 1.16, duration: 0.6, ease: "power2.out" });
    if (label) gsap.to(label, { color: "#8A7325", duration: 0.3 });
  };

  // --- SHOWCASE CORE UTILITIES ---
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  const handleInquiry = (productName) => {
    showToast(t.toast.inquiry(productName));
  };

  const toggleWishlist = (product, e) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(t.toast.removed(product.name));
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(t.toast.added(product.name));
        return [...prev, product];
      }
    });
  };

  // Filtered products
  const filteredProducts = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  // Live search across name, description (current + English), and category
  const searchTerm = searchQuery.trim().toLowerCase();
  const searchResults = searchTerm === ""
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description[lang].toLowerCase().includes(searchTerm) ||
        p.description.en.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        catLabel(p.category).toLowerCase().includes(searchTerm)
      );

  // Newsletter Submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    showToast(t.toast.newsletter);
    e.target.reset();
  };

  // Small inline language switcher used in both the navbar and footer.
  const LangToggle = ({ className = "" }) => (
    <div className={`flex items-center gap-1.5 text-[10px] font-display tracking-[0.2em] font-semibold uppercase ${className}`}>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`transition-colors ${lang === "en" ? "text-brand-gold" : "opacity-60 hover:opacity-100"}`}
      >
        EN
      </button>
      <span className="opacity-40">/</span>
      <button
        onClick={() => setLang("sq")}
        aria-pressed={lang === "sq"}
        className={`transition-colors ${lang === "sq" ? "text-brand-gold" : "opacity-60 hover:opacity-100"}`}
      >
        AL
      </button>
    </div>
  );

  // --- DYNAMICALLY LOAD LEAFLET MAP & STYLE IT (Fixed OS maps loading beautifully) ---
  useEffect(() => {
    if (loading) return;

    // Create Leaflet elements dynamically to avoid bloated bundle packages
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.id = 'leaflet-css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.id = 'leaflet-js';

    script.onload = () => {
      const L = window.L;
      if (!L) return;

      // Prevent map double-initialization collision
      if (mapRef.current) return;

      // Initialize Map over Tirana Bllok
      const map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false // Avoid accidental zoom when scrolling down the page
      }).setView([41.3217, 19.8138], 17); // Coordinate for Rruga Brigada VIII, Blloku, Tirana

      mapRef.current = map;

      // Add rock-solid, ultra-fast OpenStreetMap standard tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom pulsing gold icon marker to match luxury aesthetic
      const goldIcon = L.divIcon({
        className: 'custom-gold-marker',
        html: `<div class="w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white shadow-2xl relative flex items-center justify-center">
                 <div class="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-75"></div>
               </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      // Place Marker
      L.marker([41.3217, 19.8138], { icon: goldIcon })
        .addTo(map)
        .bindPopup(`<div style="font-family: 'Montserrat', sans-serif; text-align: center; padding: 4px; min-width: 110px;">
                     <h5 style="font-weight: 500; font-size: 11px; margin: 0 0 2px 0; color: #0A0A0A; tracking: 0.1em; text-transform: uppercase;">JARDIN</h5>
                     <p style="font-size: 9px; color: #8A7325; margin: 0; font-weight: 400; text-transform: uppercase; tracking: 0.05em;">Luxury Boutique</p>
                   </div>`, {
                     closeButton: false,
                     offset: [0, -4]
                   })
        .openPopup();

      // Style leaflet popups dynamically to adhere strictly to guidelines
      const style = document.createElement('style');
      style.id = 'leaflet-popup-custom-styles';
      style.innerHTML = `
        .leaflet-popup-content-wrapper {
          background: #ffffff !important;
          border-radius: 0px !important;
          border: 1px solid #8A7325 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05) !important;
          padding: 2px 6px !important;
        }
        .leaflet-popup-tip {
          background: #ffffff !important;
          border-left: 1px solid #8A7325 !important;
          border-bottom: 1px solid #8A7325 !important;
        }
      `;
      document.head.appendChild(style);
    };

    document.head.appendChild(script);

    return () => {
      // Clean up script, link, & styles tags on unmount to keep the DOM leak-free
      const lLink = document.getElementById('leaflet-css');
      const lScript = document.getElementById('leaflet-js');
      const popupStyle = document.getElementById('leaflet-popup-custom-styles');
      if (lLink) lLink.remove();
      if (lScript) lScript.remove();
      if (popupStyle) popupStyle.remove();

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [loading]);

  return (
    <div ref={containerRef} className="relative min-h-screen font-sans antialiased text-brand-dark selection:bg-[#8A7325]/20 selection:text-brand-dark select-none bg-white">

      {/* LUXURY CUSTOM CURSOR (DOT follows mouse instantly without delay) */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-gold z-50 pointer-events-none hidden md:block mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />

      {/* Enhanced rotating text cursor ring (centers cleanly under pointer) */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-[110px] h-[110px] z-50 pointer-events-none hidden md:flex items-center justify-center select-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      >
        <svg className="absolute inset-0 w-full h-full cursor-svg-text" viewBox="0 0 120 120">
          <path
            id="cursor-text-path"
            d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
            fill="none"
          />
          <text className="text-[8px] font-display uppercase tracking-[0.25em] fill-white font-light">
            <textPath href="#cursor-text-path" startOffset="0%">
              {cursorHovering ? ` • ${cursorText} • ${cursorText}` : " • Jardin Luxury Boutique • Jardin Luxury Boutique"}
            </textPath>
          </text>
        </svg>
      </div>

      {/* LUXURY SCREEN PRELOADER (Elegant light preloader) */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[9999] bg-[#0B0B0B] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
      >
        {/* Ambient gold glow + vignette for depth */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 42%, rgba(212,175,55,0.12), transparent 58%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,0.65))' }} />

        <div className="relative text-center px-6">
          <div className="loader-letter-group flex justify-center gap-1 sm:gap-3 md:gap-4 text-5xl sm:text-6xl md:text-7xl tracking-[0.18em] font-display font-semibold select-none">
            {"JARDIN".split("").map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 -mb-2">
                <span className="loader-letter loader-shimmer inline-block">{letter}</span>
              </span>
            ))}
          </div>

          {/* Gold hairline expands beneath the wordmark */}
          <div className="loader-line h-px w-0 mx-auto mt-7 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          <div className="loader-sub opacity-0 mt-6 text-[10px] sm:text-xs tracking-[0.55em] uppercase text-brand-gold/85 font-display font-semibold select-none">
            Atelier Tirana
          </div>
        </div>
      </div>

      {/* FLOAT NOTIFICATION TOAST */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[2000] bg-brand-dark text-white border border-brand-gold/20 px-6 py-4 flex items-center gap-3 shadow-2xl rounded-none animate-fade-in font-display tracking-wide text-sm">
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* REBUILT NAVBAR: SQUARE, SEMI-TRANSPARENT, GLASSMORPHIC & BOLDER LOGO */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-40 transition-all duration-500 py-5 md:py-6 px-6 md:px-12 grid grid-cols-2 lg:grid-cols-3 items-center text-white bg-gradient-to-b from-black/60 via-black/20 to-transparent"
      >
        {/* Left cluster — desktop nav links / mobile browse link */}
        <div className="flex items-center justify-start">
          <nav className="hidden lg:flex items-center gap-9 text-[11px] tracking-[0.28em] uppercase font-display font-medium">
            {["apparel", "jewelry", "perfumes", "flowers"].map((cat) => (
              <a
                key={cat}
                href="#shop-section"
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => triggerCursor("EXPLORE")}
                onMouseLeave={() => triggerCursor("", false)}
                className="hover:text-brand-gold transition-colors relative group py-1"
              >
                {catLabel(cat)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#shop-section"
            className="lg:hidden text-[10px] tracking-[0.2em] font-display font-medium uppercase border-b border-current pb-0.5"
            onClick={() => setActiveCategory("all")}
          >
            {t.nav.browse}
          </a>
        </div>

        {/* Logo - Center */}
        <a
          href="#"
          onMouseEnter={() => triggerCursor("HOME")}
          onMouseLeave={() => triggerCursor("", false)}
          className="flex flex-col items-center justify-self-center group leading-none"
        >
          <span className="text-2xl md:text-[28px] font-display font-semibold tracking-[0.42em] pl-[0.42em] group-hover:text-brand-gold transition-colors duration-500">
            JARDIN
          </span>
          <span className="text-[7px] tracking-[0.62em] text-brand-gold uppercase block mt-1.5 pl-[0.62em] font-semibold">
            {t.tagline}
          </span>
        </a>

        {/* Nav Actions - Right */}
        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <LangToggle />

          <span className="hidden sm:block w-px h-4 bg-current opacity-25" />

          <button
            onMouseEnter={() => triggerCursor("SEARCH")}
            onMouseLeave={() => triggerCursor("", false)}
            onClick={() => { setWishlistOpen(false); setSearchOpen(true); }}
            className="p-1 hover:text-brand-gold transition-colors"
            aria-label={t.drawer.searchTitle}
          >
            <Search className="w-[18px] h-[18px] stroke-[1.4]" />
          </button>

          <button
            onMouseEnter={() => triggerCursor("FAVORITES")}
            onMouseLeave={() => triggerCursor("", false)}
            onClick={() => { setSearchOpen(false); setWishlistOpen(true); }}
            className="p-1 hover:text-brand-gold transition-colors relative"
            aria-label={t.drawer.wishlistTitle}
          >
            <Heart className={`w-[18px] h-[18px] stroke-[1.4] ${wishlist.length > 0 ? "fill-brand-red text-brand-red stroke-brand-red" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-brand-gold text-brand-dark text-[8px] font-display font-bold rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          <a
            ref={bookBtnRef}
            href="#showroom-consultations"
            onMouseEnter={() => triggerCursor("RESERVE")}
            onMouseLeave={() => triggerCursor("", false)}
            className="hidden sm:flex items-center gap-1.5 bg-white text-brand-dark hover:bg-[#8A7325] hover:text-white transition-colors duration-300 rounded-none px-5 py-2.5 text-[10px] font-display tracking-[0.2em] uppercase font-semibold"
          >
            <span className="whitespace-nowrap">{t.nav.book}</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION - ALL LIGHT BACKGROUND LAYOUT WITH PREMIUM BACKGROUND VIDEOS (Less bright / with dark overlays for moody high-contrast legibility) */}
      <section className="relative h-screen overflow-hidden hero-section bg-[#0B0B0B]">

        {/* Soft elegant central seam line splitting left and right */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 hidden lg:block z-30" />

        <div className="absolute inset-0 flex flex-col lg:flex-row h-full">

          {/* Hero Left - High Fashion MOODY DARK (Less bright background with rich typography) */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-20 pb-20 md:pb-24 text-white">
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              tabIndex={-1}
              poster="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            >
              <source src="https://videos.pexels.com/video-files/9512048/9512048-hd_720_1366_25fps.mp4" type="video/mp4" />
            </video>

            {/* Elegant glass mask underlay - reduces brightness beautifully */}
            <div className="absolute inset-0 bg-[#0B0B0B]/45 z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0B] to-transparent opacity-70 z-10" />

            <div className="relative z-20 text-center lg:text-left max-w-lg">
              <div className="overflow-hidden mb-1">
                <span className="inline-block text-xs md:text-sm tracking-[0.45em] uppercase text-brand-gold font-display font-bold hero-animate">
                  {t.hero.leftEyebrow}
                </span>
              </div>
              <div className="overflow-hidden mb-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-serif font-normal leading-tight hero-animate text-white">
                  {t.hero.leftTitleA} <span className="italic text-brand-gold font-light">{t.hero.leftTitleEm}</span>
                </h1>
              </div>
              <div className="overflow-hidden">
                <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed max-w-sm mx-auto lg:mx-0 hero-animate">
                  {t.hero.leftBody}
                </p>
              </div>
              <div className="overflow-hidden mt-5 sm:mt-6 flex justify-center lg:justify-start pb-1">
                <a
                  href="#shop-section"
                  onClick={() => setActiveCategory("apparel")}
                  onMouseEnter={() => triggerCursor("VIEW")}
                  onMouseLeave={() => triggerCursor("", false)}
                  className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-display border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-brand-dark px-6 py-3.5 transition-all duration-300 text-white hero-animate"
                >
                  {t.hero.leftCta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Right - Fragrances & Botanicals MOODY (Less bright background with rich typography) */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-20 pb-20 md:pb-24 text-white">
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              tabIndex={-1}
              poster="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            >
              <source src="https://player.vimeo.com/external/360643552.hd.mp4?s=22b6ec54df3df3cecb7b84ceb52c1f427ded2364&profile_id=174" type="video/mp4" />
            </video>

            {/* Elegant glass mask underlay - reduces brightness beautifully */}
            <div className="absolute inset-0 bg-[#0B0B0B]/45 z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0B] to-transparent opacity-70 z-10" />

            <div className="relative z-20 text-center lg:text-left max-w-lg">
              <div className="overflow-hidden mb-1">
                <span className="inline-block text-xs md:text-sm tracking-[0.45em] uppercase text-brand-gold font-display font-bold hero-animate">
                  {t.hero.rightEyebrow}
                </span>
              </div>
              <div className="overflow-hidden mb-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-serif font-normal leading-tight text-white hero-animate">
                  {t.hero.rightTitleA} <span className="italic text-brand-gold font-light">{t.hero.rightTitleEm}</span>
                </h2>
              </div>
              <div className="overflow-hidden">
                <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed max-w-sm mx-auto lg:mx-0 hero-animate">
                  {t.hero.rightBody}
                </p>
              </div>
              <div className="overflow-hidden mt-5 sm:mt-6 flex justify-center lg:justify-start pb-1">
                <a
                  href="#shop-section"
                  onClick={() => setActiveCategory("perfumes")}
                  onMouseEnter={() => triggerCursor("SENSE")}
                  onMouseLeave={() => triggerCursor("", false)}
                  className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-display border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-brand-dark px-6 py-3.5 transition-all duration-300 text-white hero-animate"
                >
                  {t.hero.rightCta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none hero-animate">
          <span className="text-[8px] tracking-[0.3em] font-display uppercase opacity-60 text-white/70">{t.hero.scroll}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-gold animate-bounce" />
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE BANNER - Lightened & increased size to 1.5x-2x for absolute readability */}
      <section className="bg-[#F4F1EB]/50 text-brand-dark py-8 sm:py-10 border-y border-brand-gold/15 overflow-hidden relative z-30 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-infinite-scroll gap-12 sm:gap-20 text-base sm:text-lg md:text-xl tracking-[0.45em] uppercase font-display font-light items-center">
            <span className="font-display font-semibold tracking-[0.55em]">Givenchy Paris</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-serif italic font-medium tracking-[0.35em]">Saint Laurent</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-display font-bold tracking-[0.25em]">Dolce & Gabbana</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-serif font-normal uppercase tracking-[0.45em]">Zimmermann</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-sans font-normal tracking-[0.6em] text-brand-dark/90">Vivetta Milan</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-serif italic font-semibold tracking-[0.3em] text-[#8A7325]">Yves Salomon</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-display font-black tracking-[0.15em]">Moncler</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-sans tracking-[0.5em] font-normal italic text-brand-dark/90">Farm Rio</span> <span className="text-[#8A7325] opacity-60">•</span>
            {/* Duplicate for infinite loop */}
            <span className="font-display font-semibold tracking-[0.55em]">Givenchy Paris</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-serif italic font-medium tracking-[0.35em]">Saint Laurent</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-display font-bold tracking-[0.25em]">Dolce & Gabbana</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-serif font-normal uppercase tracking-[0.45em]">Zimmermann</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-sans font-normal tracking-[0.6em] text-brand-dark/90">Vivetta Milan</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-serif italic font-semibold tracking-[0.3em] text-[#8A7325]">Yves Salomon</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-display font-black tracking-[0.15em]">Moncler</span> <span className="text-[#8A7325] opacity-60">•</span>
            <span className="font-sans tracking-[0.5em] font-normal italic text-brand-dark/90">Farm Rio</span> <span className="text-[#8A7325] opacity-60">•</span>
          </div>
        </div>
      </section>

      {/* EDITORIAL PHILOSOPHY SECTION */}
      <section className="py-24 md:py-36 px-4 max-w-5xl mx-auto text-center editorial-section relative overflow-hidden bg-white">
        {/* Centered and Static Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] sm:text-[14rem] md:text-[18rem] font-display font-black font-outline-gold pointer-events-none select-none z-0 whitespace-nowrap text-center">
          JARDIN
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#8A7325] mb-6 inline-block font-display font-semibold">
            {t.editorial.eyebrow}
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal leading-relaxed text-brand-dark">
            {t.editorial.quote
              .split(" ")
              .map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                  {word.split("").map((char, cIndex) => (
                    <span key={cIndex} className="editorial-text inline-block origin-bottom">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
          </p>
          <div className="w-12 h-[1px] bg-[#8A7325] mx-auto mt-8 sm:mt-12" />
        </div>
      </section>

      {/* CURATED CATEGORIES ASYMMETRICAL GRID */}
      <section className="pb-24 px-4 md:px-12 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#8A7325] font-display font-semibold block mb-2">
            {t.collections.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-brand-dark tracking-wide">
            {t.collections.title}
          </h2>
          <p className="text-center text-base text-brand-dark/65 font-light max-w-lg mx-auto mt-4 font-sans leading-relaxed">
            {t.collections.intro}
          </p>
          <div className="w-12 h-[1px] bg-[#8A7325] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {[
            { span: "md:col-span-7", cat: "apparel", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200", cursor: "GARMENTS" },
            { span: "md:col-span-5", cat: "jewelry", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200", cursor: "ORNAMENTS" },
            { span: "md:col-span-5", cat: "perfumes", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200", cursor: "ESSENCES" },
            { span: "md:col-span-7", cat: "flowers", img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200", cursor: "PETALS" }
          ].map((c, i) => (
            <div
              key={c.cat}
              className={`${c.span} relative h-[380px] md:h-[500px] overflow-hidden collection-card bg-brand-champagne/10 group cursor-pointer border border-brand-champagne/20 shadow-sm animate-fade-in`}
              onClick={() => {
                setActiveCategory(c.cat);
                document.getElementById("shop-section")?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => triggerCursor(c.cursor)}
              onMouseLeave={() => triggerCursor("", false)}
            >
              <div
                className="parallax-bg absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${c.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10">
                <span className="text-xs tracking-[0.3em] text-brand-gold uppercase block mb-1 font-semibold">{t.collections.cards[i].num}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal tracking-wide">{t.collections.cards[i].title}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-display text-brand-gold mt-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out font-semibold">
                  {t.collections.cards[i].discover} <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWROOM PORTFOLIO GRID - Overhauled product cards: Vogue Minimal Stack (No price, only inquiry) */}
      <section id="shop-section" className="py-24 bg-white border-t border-brand-champagne/40">
        <div className="max-w-7xl mx-auto px-4 md:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
            <div>
              <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#8A7325] font-display font-semibold block mb-2">
                {t.shop.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-brand-dark tracking-wide">
                {t.shop.title}
              </h2>
            </div>

            {/* Premium, borderless category tab controls */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-display tracking-widest uppercase border-b border-brand-champagne/30 pb-2">
              {["all", "apparel", "jewelry", "perfumes", "flowers"].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    gsap.fromTo(".product-grid-card",
                      { opacity: 0, scale: 0.98, y: 15 },
                      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
                    );
                  }}
                  className={`py-2 text-sm font-display tracking-[0.25em] uppercase transition-all duration-300 relative ${
                    activeCategory === category
                      ? "text-[#8A7325] font-bold"
                      : "text-brand-dark/45 hover:text-brand-dark font-medium"
                  }`}
                >
                  {catLabel(category)}
                  {activeCategory === category && (
                    <span className="absolute bottom-[-9px] left-0 right-0 h-[1.5px] bg-[#8A7325] animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Products Airy Grid - Vogue Minimal Stack Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                onMouseEnter={(e) => {
                  handleCardMouseEnter(e);
                  triggerCursor("VIEW SPECIMEN");
                }}
                onMouseLeave={(e) => {
                  handleCardMouseLeave(e);
                  triggerCursor("", false);
                }}
                className="product-grid-card bg-transparent group cursor-pointer flex flex-col pb-4"
              >
                {/* Image wrapper: crisp aspect-[3/4] full bleed */}
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-champagne/15 border border-brand-champagne/15 transition-all duration-500 shadow-sm group-hover:shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={handleImageError}
                    className="specimen-img parallax-img absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Minimal subtle hover overlay */}
                  <div className="absolute inset-0 bg-brand-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Label */}
                  <span className="category-badge absolute bottom-3 left-3 bg-brand-dark/80 backdrop-blur-md text-white text-[8px] tracking-[0.25em] font-display uppercase px-2.5 py-1 rounded-none transition-colors duration-300 font-semibold z-20">
                    {catLabel(product.category)}
                  </span>
                </div>

                {/* Metadata details block */}
                <div className="mt-4 flex-1 flex flex-col justify-between px-1">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] font-display text-[#8A7325] font-bold uppercase mb-1.5 block">
                      {catLabel(product.category)}
                    </span>
                    <h4 className="text-lg font-serif font-medium text-brand-dark tracking-wide line-clamp-1 group-hover:text-[#8A7325] transition-colors duration-300">
                      {product.name}
                    </h4>
                    <p className="mt-2 text-sm text-brand-dark/70 font-light line-clamp-2 leading-relaxed font-sans">
                      {product.description[lang]}
                    </p>
                  </div>

                  {/* Inquiry action tag instead of price */}
                  <div className="inquire-label text-xs tracking-[0.2em] font-display uppercase font-bold text-[#8A7325] mt-4 pt-3 border-t border-brand-champagne/30 transition-colors duration-300 flex items-center gap-1.5">
                    <span>{t.shop.inquire}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRIVATE SITTINGS BANNER - DARK BACKGROUND (As requested) */}
      <section id="showroom-consultations" className="relative py-28 overflow-hidden text-center bg-brand-dark text-white border-y border-brand-gold/20">
        <div
          className="workshops-banner-bg absolute inset-0 bg-cover bg-center opacity-25 scale-105 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark opacity-80" />

        {/* Floating desaturated golden sparkles */}
        <Sparkles className="workshops-sparkle absolute top-12 left-1/4 w-5 h-5 text-brand-gold opacity-50 z-0 hidden md:block" />
        <Sparkles className="workshops-sparkle absolute bottom-16 right-1/4 w-4 h-4 text-brand-gold opacity-40 z-0 hidden md:block" />
        <Sparkles className="workshops-sparkle absolute top-24 right-1/3 w-3.5 h-3.5 text-brand-gold opacity-60 z-0 hidden md:block" />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="text-xs tracking-[0.4em] uppercase text-brand-gold font-display block mb-3 font-semibold">{t.consult.eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white leading-tight">{t.consult.title}</h2>
          <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed font-light max-w-lg mx-auto">
            {t.consult.body}
          </p>
          <div className="mt-10 flex justify-center">
            <button
              onMouseEnter={() => triggerCursor("BOOK SITTING")}
              onMouseLeave={() => triggerCursor("", false)}
              onClick={() => showToast(t.toast.booking)}
              className="px-8 py-4 bg-brand-gold hover:bg-white text-brand-dark text-xs tracking-[0.25em] font-display uppercase transition-all duration-500 shadow-xl font-semibold"
            >
              {t.consult.cta}
            </button>
          </div>
        </div>
      </section>

      {/* DYNAMIC LEAFLET OPENSTREETMAP SECTION - Outlines & backgrounds removed from icons, grayscale map styled */}
      <section className="py-24 bg-white text-brand-dark border-t border-brand-champagne/40">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Left Column - Beautifully Styled Map */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs tracking-[0.4em] uppercase text-[#8A7325] font-display font-semibold">{t.visit.eyebrow}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-brand-dark leading-tight">{t.visit.title}</h2>
            <p className="text-base text-brand-dark/75 font-light leading-relaxed max-w-xl">
              {t.visit.body}
            </p>

            {/* Map Container */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-brand-champagne/10 border border-brand-champagne/50 shadow-md overflow-hidden mt-4">
              <div id="map" role="img" aria-label="Map showing Jardin Luxury Boutique in the Bllok district, Tirana" className="w-full h-full absolute inset-0 z-10 desaturate-map" />
              {/* Fallback load screen */}
              <div className="absolute inset-0 bg-[#F4F1EB]/10 flex flex-col items-center justify-center z-0">
                <span className="text-xs font-display tracking-widest text-[#8A7325] animate-pulse font-semibold">{t.visit.loading}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Store Details (Clean naked icons, backgrounds/outlines removed) */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full pt-8 lg:pt-0">
            <div className="space-y-8">

              {/* Location */}
              <div className="flex gap-4 items-start pb-6 border-b border-brand-champagne/30">
                <div className="text-[#8A7325] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-[#8A7325]">{t.visit.addressLabel}</h4>
                  <p className="text-base text-brand-dark mt-2.5 font-serif font-light leading-relaxed">
                    Rruga Brigada e VIII, Pallati Teknoprojekt<br />
                    Bllok, Tirana 1001, Albania
                  </p>
                  <p className="text-sm text-brand-dark/50 mt-1 font-sans font-light">{t.visit.addressNote}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start pb-6 border-b border-brand-champagne/30">
                <div className="text-[#8A7325] shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-[#8A7325]">{t.visit.hoursLabel}</h4>
                  <ul className="text-base text-brand-dark/80 font-sans font-light space-y-2.5 leading-relaxed">
                    <li className="flex justify-between gap-12"><span>{t.visit.days[0]}</span> <span className="font-semibold text-brand-dark">10:00 — 21:00</span></li>
                    <li className="flex justify-between gap-12"><span>{t.visit.days[1]}</span> <span className="font-semibold text-brand-dark">11:00 — 20:00</span></li>
                    <li className="flex justify-between gap-12"><span>{t.visit.days[2]}</span> <span className="font-semibold text-brand-dark">11:00 — 17:00</span></li>
                  </ul>
                  <div className="text-sm text-[#8A7325] italic mt-3 flex items-center gap-1.5 font-light">
                    <Sparkles className="w-3.5 h-3.5 text-[#8A7325]" /> {t.visit.hoursNote}
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="flex gap-4 items-start">
                <div className="text-[#8A7325] shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-semibold uppercase tracking-widest text-[#8A7325]">{t.visit.contactLabel}</h4>
                  <p className="text-base text-brand-dark/80 font-serif font-light leading-relaxed">
                    {t.visit.inquiriesWord} <span className="font-sans font-medium text-brand-dark tracking-wide">+355 69 863 7620</span><br />
                    {t.visit.emailWord} <span className="font-sans font-light text-[#8A7325] hover:underline">curator@jardintirana.com</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* INSTAGRAM GRID SOCIAL FEED */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-12 bg-white">
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#8A7325] block font-display mb-2 font-semibold">{t.social.eyebrow}</span>
          <h2 className="text-3xl font-serif font-normal text-brand-dark">Follow @jardin_luxury_boutique</h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => triggerCursor("INSTAGRAM")}
            onMouseLeave={() => triggerCursor("", false)}
            className="inline-flex items-center gap-1.5 text-xs text-[#8A7325] font-display tracking-wider mt-3 hover:text-brand-dark transition-colors font-semibold uppercase"
          >
            <Instagram className="w-4 h-4" /> Jardin Luxury Boutique
          </a>
        </div>

        {/* Instagrid with unique luxury desaturated photographs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800",
            "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1200",
            "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800"
          ].map((url, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden group rounded-none bg-brand-champagne/10 border border-brand-champagne/20"
            >
              <img
                src={url}
                alt={t.social.tiles[i]}
                onError={handleImageError}
                className="parallax-img w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                <Instagram className="w-5 h-5 mb-2 text-brand-gold" />
                <span className="text-xs tracking-widest uppercase font-display font-light">{t.social.viewPost}</span>
                <span className="text-xs text-gray-300 italic mt-1 font-serif">{t.social.tiles[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REWORKED ENTIRE FOOTER: ARCHITECTURAL, FANCY, ULTRA-LUXURY AND MODERN */}
      <footer className="bg-[#0B0B0B] text-white relative overflow-hidden border-t border-[#8A7325]/20">

        {/* Gold hairline accent across the very top of the footer */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-20 md:pt-24 pb-10">

          {/* TOP: brand statement + featured newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">

            {/* Brand crest + about + coordinates */}
            <div className="lg:col-span-7">
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold tracking-[0.4em] text-white">JARDIN</span>
                <span className="text-[8px] tracking-[0.6em] text-brand-gold uppercase block mt-1.5 font-bold">{t.tagline}</span>
              </div>
              <p className="mt-7 text-base text-gray-400 font-light leading-relaxed font-sans max-w-md">
                {t.footer.about}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
                <a href="#" className="flex items-center gap-2.5 text-gray-300 hover:text-brand-gold transition-colors font-light">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" /> Rruga Brigada e VIII, Tirana
                </a>
                <a href="tel:+355698637620" className="flex items-center gap-2.5 text-gray-300 hover:text-brand-gold transition-colors font-light">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" /> +355 69 863 7620
                </a>
              </div>
            </div>

            {/* Featured newsletter — minimalist bottom-border field */}
            <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-white/10">
              <h4 className="font-display uppercase tracking-[0.3em] text-brand-gold font-bold text-xs">
                {t.footer.circle}
              </h4>
              <p className="text-gray-400 font-light leading-relaxed mt-4 mb-6 text-base font-sans max-w-sm">
                {t.footer.circleBody}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="max-w-sm">
                <div className="relative flex items-center gap-3 border-b border-white/25 focus-within:border-brand-gold transition-colors duration-500 pb-2">
                  <Mail className="w-4 h-4 text-brand-gold/80 shrink-0" />
                  <input
                    type="email"
                    placeholder={t.footer.emailPlaceholder}
                    aria-label="Email address for the Jardin newsletter"
                    required
                    className="bg-transparent w-full text-white text-sm tracking-[0.12em] focus:outline-none placeholder:text-gray-500 rounded-none font-light"
                  />
                  <button
                    type="submit"
                    aria-label={t.footer.requestEntry}
                    className="shrink-0 text-brand-gold hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <span className="block mt-3 text-[10px] tracking-[0.3em] uppercase text-gray-500 font-display font-semibold">
                  {t.footer.requestEntry}
                </span>
              </form>
            </div>
          </div>

          {/* MIDDLE: link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 py-14">

            {/* Collections */}
            <div>
              <h4 className="font-display uppercase tracking-[0.3em] text-brand-gold mb-6 font-bold text-xs">
                {t.footer.collections}
              </h4>
              <ul className="space-y-3.5 font-light text-gray-400 text-sm">
                {["apparel", "jewelry", "perfumes", "flowers"].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#shop-section"
                      onClick={() => setActiveCategory(cat)}
                      className="hover:text-white transition-colors duration-300 flex items-center gap-2 group font-sans"
                    >
                      <span className="w-1.5 h-1.5 bg-[#8A7325] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {catLabel(cat)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Salon */}
            <div>
              <h4 className="font-display uppercase tracking-[0.3em] text-brand-gold mb-6 font-bold text-xs">
                {t.footer.salon}
              </h4>
              <ul className="space-y-3 font-light text-gray-400 text-xs font-display tracking-wider uppercase">
                <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <span>{t.footer.salonDays[0]}</span>
                  <span className="font-medium text-white">10:00 — 21:00</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <span>{t.footer.salonDays[1]}</span>
                  <span className="font-medium text-white">11:00 — 20:00</span>
                </li>
                <li className="flex justify-between gap-4 pb-1">
                  <span>{t.footer.salonDays[2]}</span>
                  <span className="font-medium text-white">11:00 — 17:00</span>
                </li>
              </ul>
              <p className="text-[11px] text-[#8A7325] italic mt-4 flex items-start gap-1.5 font-light leading-snug">
                <Sparkles className="w-3 h-3 text-[#8A7325] shrink-0 mt-0.5" />
                {t.footer.salonNote}
              </p>
            </div>

            {/* Connect / social */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-display uppercase tracking-[0.3em] text-brand-gold mb-6 font-bold text-xs">
                Instagram
              </h4>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => triggerCursor("INSTAGRAM")}
                onMouseLeave={() => triggerCursor("", false)}
                className="inline-flex items-center gap-2.5 text-sm text-gray-300 hover:text-brand-gold transition-colors font-light font-sans group"
              >
                <span className="flex items-center justify-center w-9 h-9 border border-white/15 group-hover:border-brand-gold/60 transition-colors">
                  <Instagram className="w-4 h-4" />
                </span>
                @jardin_luxury_boutique
              </a>
            </div>
          </div>

          {/* Colossal Brand Banner backdrop (Pinnacle of Modern Haute Design) */}
          <span className="text-[6vw] sm:text-[9vw] lg:text-[11vw] font-display font-light text-white/[0.04] select-none tracking-[0.25em] uppercase leading-none block text-center mt-2 mb-6">
            JARDIN ATELIER
          </span>

          {/* Symmetrical Middle Border */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent mb-8" />

          {/* Bottom Copyright & Terms Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-5 items-center text-[10px] text-gray-500 font-display font-medium tracking-[0.2em] uppercase">
            <span>&copy; {new Date().getFullYear()} JARDIN LUXURY BOUTIQUE. {t.footer.rights}</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <span className="text-[#8A7325]/35">•</span>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
              <span className="text-[#8A7325]/35">•</span>
              <LangToggle />
            </div>
          </div>

        </div>
      </footer>

      {/* --- SEARCH DRAWER (right) --- */}
      <SideDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        title={t.drawer.searchTitle}
        closeLabel={t.drawer.close}
      >
        <div className="relative flex items-center gap-3 border-b border-brand-champagne/60 focus-within:border-[#8A7325] transition-colors pb-3">
          <Search className="w-4 h-4 text-[#8A7325] shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.drawer.searchPlaceholder}
            aria-label={t.drawer.searchTitle}
            className="bg-transparent w-full text-sm text-brand-dark tracking-wide focus:outline-none placeholder:text-brand-dark/40 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); searchInputRef.current?.focus(); }}
              aria-label={t.drawer.close}
              className="text-brand-dark/40 hover:text-brand-dark transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {searchTerm === "" ? (
          <p className="mt-8 text-sm text-brand-dark/50 font-light leading-relaxed">{t.drawer.searchHint}</p>
        ) : searchResults.length === 0 ? (
          <p className="mt-8 text-sm text-brand-dark/50 font-light leading-relaxed">{t.drawer.noResults}</p>
        ) : (
          <ul className="mt-6 space-y-5">
            {searchResults.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => { setSelectedProduct(p); setSearchOpen(false); }}
                  className="w-full flex items-center gap-4 group text-left"
                >
                  <div className="w-16 h-20 shrink-0 overflow-hidden bg-brand-champagne/15 border border-brand-champagne/20">
                    <img src={p.image} alt={p.name} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8A7325] font-display font-bold mb-0.5">{catLabel(p.category)}</span>
                    <span className="block text-sm font-serif text-brand-dark truncate group-hover:text-[#8A7325] transition-colors">{p.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-dark/30 group-hover:text-[#8A7325] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </SideDrawer>

      {/* --- WISHLIST / PRIVATE COLLECTION DRAWER (right) --- */}
      <SideDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        title={t.drawer.wishlistTitle}
        subtitle={t.drawer.wishlistSubtitle}
        closeLabel={t.drawer.close}
      >
        {wishlist.length === 0 ? (
          <div className="mt-10 text-center">
            <Heart className="w-8 h-8 text-brand-champagne mx-auto mb-4" strokeWidth={1.2} />
            <p className="text-sm text-brand-dark/60 font-light">{t.drawer.wishlistEmpty}</p>
            <p className="text-xs text-brand-dark/40 font-light mt-2 leading-relaxed">{t.drawer.wishlistEmptyHint}</p>
          </div>
        ) : (
          <ul className="space-y-5">
            {wishlist.map((p) => (
              <li key={p.id} className="flex items-center gap-4">
                <button
                  onClick={() => { setSelectedProduct(p); setWishlistOpen(false); }}
                  className="flex items-center gap-4 flex-1 min-w-0 group text-left"
                >
                  <div className="w-16 h-20 shrink-0 overflow-hidden bg-brand-champagne/15 border border-brand-champagne/20">
                    <img src={p.image} alt={p.name} onError={handleImageError} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8A7325] font-display font-bold mb-0.5">{catLabel(p.category)}</span>
                    <span className="block text-sm font-serif text-brand-dark truncate group-hover:text-[#8A7325] transition-colors">{p.name}</span>
                  </div>
                </button>
                <button
                  onClick={(e) => toggleWishlist(p, e)}
                  aria-label={t.drawer.remove}
                  className="p-2 text-brand-dark/35 hover:text-brand-red transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </SideDrawer>

      {/* --- QUICK VIEW SHOWCASE PRODUCT MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">

          {/* Backdrop blur */}
          <div
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-none shadow-2xl border border-brand-champagne/40 grid grid-cols-1 md:grid-cols-12 z-10 animate-scale-up">

            {/* Close btn */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white text-brand-dark hover:text-brand-gold shadow-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Left - Image (Col-span 5) */}
            <div className="md:col-span-5 relative aspect-[3/4] md:aspect-auto md:h-full bg-brand-champagne/10 min-h-[300px] overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} onError={handleImageError} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] hover:scale-105" />
            </div>

            {/* Right - Product details (Col-span 7) */}
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>

                {/* Category Specimen */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-[0.25em] font-display uppercase text-[#8A7325] font-semibold bg-brand-champagne/30 px-3 py-1 rounded-none">
                    {catLabel(selectedProduct.category)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="text-sm font-display font-medium text-brand-dark uppercase tracking-widest">{t.modal.selected}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-serif text-brand-dark tracking-wide">{selectedProduct.name}</h3>

                {/* Showcase indicator */}
                <div className="text-sm font-display text-[#8A7325] uppercase tracking-[0.2em] font-semibold mt-2.5">
                  {t.modal.exclusive}
                </div>

                {/* Description */}
                <p className="text-base text-gray-600 font-light mt-4 leading-relaxed font-sans">
                  {selectedProduct.description[lang]}
                </p>

                {/* Specifications bullets */}
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-xs tracking-widest font-display uppercase font-semibold text-brand-dark mb-1">{t.modal.details}</h4>
                  {selectedProduct.details[lang].map((detail, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-brand-dark/70 font-light">
                      <Check className="w-4 h-4 text-[#8A7325] shrink-0 stroke-[2.5]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Secure guarantee info */}
                <div className="mt-6 p-3 bg-brand-champagne/15 border border-brand-champagne rounded-none flex items-center gap-2.5 text-xs text-gray-500 uppercase tracking-widest font-light">
                  <ShieldCheck className="w-4 h-4 text-brand-gold stroke-[1.5]" />
                  <span>{t.modal.guarantee}</span>
                </div>
              </div>

              {/* CTAs - E-commerce removed, replaced with Premium Showroom Inquiries */}
              <div className="mt-8 pt-6 border-t border-[#8A7325]/15 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    handleInquiry(selectedProduct.name);
                    setSelectedProduct(null);
                  }}
                  className="flex-grow py-4 bg-brand-dark hover:bg-[#8A7325] text-white text-xs tracking-widest font-display uppercase transition-colors duration-500 rounded-none shadow-md font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.modal.inquire}</span>
                </button>
                <button
                  onClick={(e) => {
                    toggleWishlist(selectedProduct, e);
                  }}
                  className="px-6 py-4 border border-[#8A7325]/15 hover:border-brand-dark text-brand-dark text-xs tracking-widest font-display uppercase transition-all duration-300 rounded-none flex items-center justify-center gap-2 font-semibold"
                >
                  <Heart className={`w-4 h-4 ${wishlist.find(item => item.id === selectedProduct.id) ? "fill-brand-red text-brand-red stroke-brand-red" : ""}`} />
                  <span>{wishlist.find(item => item.id === selectedProduct.id) ? t.modal.wishlisted : t.modal.add}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
