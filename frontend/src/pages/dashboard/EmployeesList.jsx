import { useEffect, useState } from "react";
import { apiDeleteEmployee, apiGetEmployees } from "../../apis/employee";
import EmployeeDialog from "../../components/EmployeeDialog";
import useApi from "../../hooks/use-api";
import Employee from "../../components/Employee";
import Button from "../../components/ui/button";

import {
  PencilIcon,
  PlusCircleIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

import Input from "../../components/ui/input";
import useDebounce from "../../hooks/use-debounce";

const employeeTableHeadings = [
  "ID",
  "Employee",
  "Mobile",
  "Designation",
  "Gender",
  "Course",
  "Created At",
  "Updated At",
];

const EmployeesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm);

  const { data = [], fn, refetch } = useApi(apiGetEmployees);
  const { fn: deleteEmp, loading: dLoading } = useApi(apiDeleteEmployee, {
    success: true,
  });

  useEffect(() => {
    fn(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const handleDelete = async (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this Employee?"
    );
    if (confirmation) {
      await deleteEmp(id);
      await refetch();
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-5">
        <Input
          Icon={<SearchIcon />}
          placeholder="Search..."
          className="max-w-sm"
          type="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <EmployeeDialog
          cb={refetch}
          trigger={
            <Button>
              <PlusCircleIcon />
              New Employee
            </Button>
          }
        />
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            {employeeTableHeadings.map((v, i) => (
              <th key={i}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <Employee {...e} key={e.id}>
              <td>
                <EmployeeDialog
                  defaultValues={e}
                  id={e.id}
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
                  onClick={() => handleDelete(e.id)}
                  className="text-error"
                  size="icon"
                  disabled={dLoading}
                >
                  <Trash2Icon size={20} />
                </Button>
              </td>
            </Employee>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesList;
