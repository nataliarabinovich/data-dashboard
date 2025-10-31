export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="input"
      type="text"
      placeholder="Search by name, city, or state…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}