import cn from "../../utils/cn";

const Tooltip = ({ title, position = "top", children }) => {
  return (
    <div className={cn(`tooltip tooltip-${position}`)} data-tip={title}>
      {children}
    </div>
  );
};

export default Tooltip;
