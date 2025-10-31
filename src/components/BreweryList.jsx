import BreweryCard from "./BreweryCard.jsx";

export default function BreweryList({ breweries }) {
  if (!breweries?.length) return <p>No results.</p>;
  return (
    <div className="list-grid">
      {breweries.map((b) => (
        <BreweryCard key={b.id ?? `${b.name}-${b.phone}`} brewery={b} />
      ))}
    </div>
  );
}