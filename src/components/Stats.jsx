export default function Stats({ stats }) {
  const { total, byType, statesCovered, topState, topCount } = stats || {};
  return (
    <div className="stats-grid">
      <div className="card kpi">
        <h3>Total Breweries</h3>
        <p className="big">{total ?? 0}</p>
      </div>
      <div className="card kpi">
        <h3>States Covered</h3>
        <p className="big">{statesCovered ?? 0}</p>
      </div>
      <div className="card kpi">
        <h3>Top State (count)</h3>
        <p className="big">{topState ? `${topState} (${topCount})` : "—"}</p>
      </div>

      <div className="card bytpye">
        <h3>By Type</h3>
        <ul className="bytype">
          {byType &&
            Object.entries(byType)
              .sort((a, b) => b[1] - a[1])
              .map(([t, n]) => (
                <li key={t}>
                  <span>{t}</span>
                  <span>{n}</span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}