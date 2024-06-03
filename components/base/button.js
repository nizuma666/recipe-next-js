import clsx from "clsx";

const Button = ({ children, className, onClick, disabled }) => {
  return (
    <div>
      <button
        type="submit"
        className={clsx(
          "w-[200px] h-[64px] rounded-lg bg-leery-lemon font-[500] text-base border-none hover:cursor-pointer",
          className,
          { "text-white": !className?.includes("text-") }
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
