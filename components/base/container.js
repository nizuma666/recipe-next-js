export default function Container({ children }) {
  return (
    <div className="w-full mx-auto my-auto bg-bg-pattern bg-cover">
      {children}
    </div>
  );
}
