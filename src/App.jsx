import { useEffect, useMemo, useState } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar.jsx";
import Filters from "./components/Filters.jsx";
import Stats from "./components/Stats.jsx";
import BreweryList from "./components/BreweryList.jsx";

export default function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");           // text search
  const [typeFilter, setTypeFilter] = useState("All"); // dropdown filter

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        // Fetch first 200 breweries to have enough for stats/filtering.
        const res = await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=200");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBreweries(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Unique types for filter dropdown
  const breweryTypes = useMemo(() => {
    const set = new Set(breweries.map(b => b.brewery_type).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [breweries]);

  // Derived, filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return breweries.filter(b => {
      const matchesSearch =
        !q ||
        (b.name && b.name.toLowerCase().includes(q)) ||
        (b.city && b.city.toLowerCase().includes(q)) ||
        (b.state && b.state.toLowerCase().includes(q));
      const matchesType = typeFilter === "All" || b.brewery_type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [breweries, search, typeFilter]);

  // Example summary stats: total, by-type counts, and states covered
  const stats = useMemo(() => {
    const total = breweries.length;

    const byType = breweries.reduce((acc, b) => {
      const t = b.brewery_type || "unknown";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});

    const uniqueStates = new Set(breweries.map(b => b.state).filter(Boolean));
    const statesCovered = uniqueStates.size;

    // “Top state” by count (mode of the state attribute)
    const stateCounts = {};
    breweries.forEach(b => {
      if (!b.state) return;
      stateCounts[b.state] = (stateCounts[b.state] || 0) + 1;
    });
    let topState = null;
    let topCount = 0;
    Object.entries(stateCounts).forEach(([st, cnt]) => {
      if (cnt > topCount) {
        topCount = cnt;
        topState = st;
      }
    });

    return { total, byType, statesCovered, topState, topCount };
  }, [breweries]);

  return (
    <div className="container">
      <header className="header">
        <div className="container">
          <div className="title">
      <div className="logo">🍺</div>
      <div>
        <h1 style={{margin:0}}>Brewery Dashboard</h1>
        <p>Search & filter U.S. breweries. Live stats from Open Brewery DB.</p>
      </div>
    </div>
  </div>
</header>

      <section className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          typeOptions={breweryTypes}
        />
      </section>

      <p className="muted" style={{marginTop:0}}>
  Showing <strong>{filtered.length}</strong> of {breweries.length} breweries
</p>


      <section className="stats">
        <Stats stats={stats} />
      </section>

      <section className="list">
        {loading && <p>Loading…</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <BreweryList breweries={filtered.slice(0, 200)} />
        )}
      </section>
    </div>
  );
}