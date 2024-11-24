import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { convertMask } from "../utils";
const Employee = ({ children, ...props }) => {
  return (
    <tr className="hover">
      <td>{props.id}</td>
      <td>
        <div className="flex gap-2 items-center">
          <img
            className="mask mask-circle h-12 w-12 object-cover"
            src={props.image}
            alt={props.name}
          />
          <div>
            <p className="font-semibold">{props.name}</p>
            <Link to={`mailto:${props.email}`} className="font-light">
              {props.email}
            </Link>
          </div>
        </div>
      </td>
      <td className="font-medium group">
        <p className="block group-hover:hidden">{convertMask(props.mobile)}</p>
        <p className="hidden group-hover:block">{props.mobile}</p>
      </td>
      <td>{props.designation}</td>
      <td>{props.gender}</td>
      <td>{props.course.join(",")}</td>
      <td>{formatDistanceToNow(props.createdAt, { addSuffix: true })}</td>
      <td>{formatDistanceToNow(props.updatedAt, { addSuffix: true })}</td>
      {children}
    </tr>
  );
};

export default Employee;
