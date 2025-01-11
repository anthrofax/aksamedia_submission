function Button({
  children,
  className,
  disabled = false,
  onClick = () => {},
  type,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (arg: unknown) => void;
  type: "button" | "reset" | "submit";
}) {
  return (
    <button
      className={`${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
