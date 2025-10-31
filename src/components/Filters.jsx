export default function Filters({ typeFilter, onTypeChange, typeOptions }) {
  return (
    <div className="filters">
      <label>
        Type:&nbsp;
        <select
          className="select"
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          {typeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}