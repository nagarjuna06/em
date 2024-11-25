import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { convertMask } from "../utils";
import EmployeeDialog from "./EmployeeDialog";
import Button from "./ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { apiDeleteEmployee } from "../apis/employee";
import useApi from "../hooks/use-api";
const Employee = ({ refetch, ...props }) => {
  const { fn, loading } = useApi(apiDeleteEmployee, {
    success: true,
  });

  const handleDelete = async (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this Employee?"
    );
    if (confirmation) {
      await fn(id);
      await refetch();
    }
  };

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
      <td>
        <EmployeeDialog
          defaultValues={props}
          id={props.id}
          purpose="Update"
          trigger={
            <Button size="icon">
              <PencilIcon size={20} />
            </Button>
          }
          cb={refetch}
        />
      </td>
      <td>
        <Button
          onClick={() => handleDelete(props.id)}
          className="text-error"
          size="icon"
          disabled={loading}
        >
          <Trash2Icon size={20} />
        </Button>
      </td>
    </tr>
  );
};

export default Employee;
