const Button = (props) => {
  const { children, variant, type = "button", loading, disabled } = props;
  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`}
      type={type}
      disabled={disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
export default Button;
