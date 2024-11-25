import { Link } from "react-router-dom";
import { format } from "date-fns";

const Employee = ({ children, ...props }) => {
  return (
    <tr className="hover">
      <td className="font-semibold">{props.id}</td>
      <td>
        <img
          className="mask mask-squircle h-16 w-16 object-cover"
          src={props.image}
          alt={props.name}
        />
      </td>
      <td>{props.name}</td>
      <td>
        <Link to={`mailto:${props.email}`} className="hover:underline">
          {props.email}
        </Link>
      </td>
      <td className="font-medium group">{props.mobile}</td>
      <td>{props.designation}</td>
      <td>{props.gender}</td>
      <td>{props.course.join(",")}</td>
      <td>{format(props.createdAt, "dd-MMM-yy hh:mm a")}</td>
      {children}
    </tr>
  );
};

export default Employee;
