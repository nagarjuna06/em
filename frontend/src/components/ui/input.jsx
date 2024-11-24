import { Eye, EyeOff } from "lucide-react";
import cn from "../../utils/cn";
import { useState } from "react";

const Input = ({
  register,
  Icon = null,
  type = "text",
  placeholder,
  error,
  options,
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);

  const renderInput = () => {
    switch (type) {
      case "checkbox":
        return (
          <div className="flex gap-x-10 items-center flex-wrap">
            {options.map((e, i) => (
              <label className="label cursor-pointer flex gap-2" key={i}>
                <input
                  type="checkbox"
                  className="checkbox"
                  value={e.value}
                  {...register}
                />
                <span className="label-text">{e.label}</span>
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div className="flex items-center gap-x-10 flex-wrap">
            {options.map((e, i) => (
              <label key={i} className="label cursor-pointer flex gap-3">
                <input
                  {...register}
                  type="radio"
                  className="radio"
                  value={e.value}
                  id={e.label}
                />
                <span className="label-text">{e.label}</span>
              </label>
            ))}
          </div>
        );
      case "select":
        return (
          <select
            className={cn("select select-bordered", {
              "select-error": error,
            })}
            defaultValue={placeholder}
            {...register}
          >
            <option disabled>{placeholder}</option>
            {options?.map((e, i) => (
              <option value={e.value} key={i}>
                {e.label}
              </option>
            ))}
          </select>
        );

      case "password":
        return (
          <label
            className={cn("input input-bordered flex items-center gap-2", {
              "input-error": error,
            })}
          >
            {Icon}
            <input
              type={show ? "text" : "password"}
              placeholder={placeholder ?? register?.name}
              {...register}
              className="w-full"
            />
            <button type="button" onClick={() => setShow(!show)}>
              {show ? <Eye /> : <EyeOff />}
            </button>
          </label>
        );

      default:
        return (
          <label
            className={cn("input input-bordered flex items-center gap-2", {
              "input-error": error,
            })}
          >
            {Icon}
            <input
              type={type ?? "text"}
              placeholder={placeholder ?? register?.name}
              {...register}
              {...props}
              className="grow"
            />
          </label>
        );
    }
  };

  return (
    <div className={cn("form-control w-full", className)}>
      {renderInput()}
      {error && (
        <span className="text-error label-text pt-1">{error.message}</span>
      )}
    </div>
  );
};

export default Input;
