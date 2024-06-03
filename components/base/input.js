import clsx from "clsx";
export default function Input({className, placeholder, name, value, type, onChange}) {
  return (
    <div>
      <input
        className={clsx('w-3/4 h-16 pl-5 rounded-md outline-none', className)}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        required
      />
    </div>
  );
}