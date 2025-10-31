export default function BreweryCard({ brewery }) {
  const {
    name,
    brewery_type,
    city,
    state,
    country,
    website_url,
    phone,
  } = brewery;

  return (
    <article className="card">
      <h3>{name ?? "Unknown"}</h3>
      <div className="badges">
  {brewery_type && <span className="badge">{brewery_type}</span>}
  {state && <span className="badge">📍 {city ? `${city}, ` : ""}{state}</span>}
</div>
      <p className="meta">
        <strong>Type:</strong> {brewery_type ?? "—"} •{" "}
        <strong>Location:</strong> {city ?? "—"}, {state ?? "—"} {country ?? ""}
      </p>
      <div className="row">
        {website_url ? (
          <a className="btn" href={website_url} target="_blank" rel="noreferrer">
            Website
          </a>
        ) : (
          <span className="muted">No website</span>
        )}
        <span className="muted">{phone ? `☎ ${phone}` : "No phone"}</span>
      </div>
    </article>
  );
}