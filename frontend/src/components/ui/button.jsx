export function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white p-2 rounded hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}
