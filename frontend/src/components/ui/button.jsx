import cn from "../../utils/cn";
import Loader from "./loader";

const Button = ({
  loading = false,
  children,
  className,
  size = "default",
  disabled = false,

  ...props
}) => {
  return (
    <button
      className={cn(
        "btn",
        {
          "btn-outline min-w-24": size === "default",
          "btn-ghost btn-circle": size === "icon",
        },
        className
      )}
      {...props}
      disabled={loading || disabled}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
