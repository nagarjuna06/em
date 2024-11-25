import { useEffect } from "react";
import { apiGetEmployees } from "../../apis/employee";
import EmployeeDialog from "../../components/EmployeeDialog";
import useApi from "../../hooks/use-api";
import Employee from "../../components/Employee";
import Button from "../../components/ui/button";

import { PlusCircleIcon, SearchIcon } from "lucide-react";

import Input from "../../components/ui/input";
import useDebounce from "../../hooks/use-debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/ui/loader";

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
  const navigate = useNavigate();
  const searchTerm = useSearchParams()[0].get("q") || "";

  const debounceSearchTerm = useDebounce(searchTerm);

  const { data = [], fn, loading, refetch } = useApi(apiGetEmployees);

  const onUpdate = () => refetch(debounceSearchTerm);

  useEffect(() => {
    fn(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const renderTable = () => {
    return (
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
            <Employee {...e} key={e.id} refetch={onUpdate} />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="h-full">
      <div className="flex justify-end items-center gap-5">
        <Input
          Icon={<SearchIcon />}
          placeholder="Search..."
          value={searchTerm}
          className="max-w-sm"
          type="search"
          onChange={(e) => {
            navigate(`?q=${e.target.value}`);
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
      {loading ? <Loader fullscreen size="lg" /> : renderTable()}
    </div>
  );
};

export default EmployeesList;
