import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const Pagination = ({ pages = 0, current = 1, onClick }) => {
  if (pages <= 1) return;

  return (
    <div className="join">
      <button
        className="join-item btn"
        disabled={current <= 2}
        onClick={() => onClick(current - 2)}
      >
        <ChevronFirstIcon size={20} />
      </button>
      <button
        className="join-item btn"
        disabled={current == 1}
        onClick={() => onClick(current - 1)}
      >
        <ChevronLeftIcon size={20} />
      </button>
      <button className="join-item btn">Page {current}</button>
      <button
        className="join-item btn"
        disabled={current == pages}
        onClick={() => onClick(current + 1)}
      >
        <ChevronRightIcon size={20} />
      </button>
      <button
        className="join-item btn"
        disabled={current >= pages - 1}
        onClick={() => onClick(current + 2)}
      >
        <ChevronLastIcon size={20} />
      </button>
    </div>
  );
};

export default Pagination;
