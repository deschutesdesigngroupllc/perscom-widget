export function Status({ text, color = '#2563eb' }) {
  return (
    <span
      className="inline-flex rounded-full px-2 text-xs font-normal leading-5 text-white"
      style={{
        backgroundColor: color
      }}
    >
      {text}
    </span>
  );
}
