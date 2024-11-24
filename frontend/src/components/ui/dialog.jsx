import { XIcon } from "lucide-react";
import cn from "../../utils/cn";

const Dialog = ({
  name,
  trigger,
  open,
  hideCloseBtn = false,
  setOpen,
  onClose = () => {},
  children,
  className,
}) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <input type="checkbox" checked={open} className="modal-toggle" readOnly />
      <div className="modal" role="dialog">
        <div className={cn("modal-box", className)}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{name}</h3>
            {!hideCloseBtn && (
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={handleClose}
              >
                <XIcon />
              </button>
            )}
          </div>
          <div className="pt-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
