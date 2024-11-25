import { useEffect, useMemo } from "react";
import { apiDeleteEmployee, apiGetEmployees } from "../../apis/employee";
import EmployeeDialog from "../../components/EmployeeDialog";
import useApi from "../../hooks/use-api";
import Employee from "../../components/Employee";
import Button from "../../components/ui/button";

import {
  ArrowDownIcon,
  PencilIcon,
  PlusCircleIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

import Input from "../../components/ui/input";
import useDebounce from "../../hooks/use-debounce";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/ui/loader";
import {
  employeeTableHeadings,
  limitOptions,
} from "../../utils/validations/employee";
import Pagination from "../../components/ui/pagination";

const EmployeesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = useMemo(() => searchParams.get("q") || "", [searchParams]);
  const orderBy = useMemo(
    () => searchParams.get("orderBy") || "_id",
    [searchParams]
  );
  const order = useMemo(
    () => searchParams.get("order") || "ASC",
    [searchParams]
  );
  const page = useMemo(
    () => parseInt(searchParams.get("page")) || 1,
    [searchParams]
  );
  const limit = useMemo(
    () => parseInt(searchParams.get("limit")) || 5,
    [searchParams]
  );

  const updateSearchParams = (params) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      ...params,
    }));
  };

  const updateSorting = (name) => {
    const setOrder = orderBy == name && order == "DESC" ? "ASC" : "DESC";

    updateSearchParams({
      orderBy: name,
      order: setOrder,
    });
  };

  const debounceSearchParams = useDebounce(
    JSON.stringify({ q: searchTerm, order, orderBy, page, limit })
  );

  const { data = [], fn, loading, refetch, meta } = useApi(apiGetEmployees);

  const onUpdate = () => refetch(JSON.parse(debounceSearchParams));

  useEffect(() => {
    fn(JSON.parse(debounceSearchParams));
  }, [debounceSearchParams]);

  const { fn: deleteEmployee, loading: dLoading } = useApi(apiDeleteEmployee, {
    success: true,
  });

  const handleDelete = async (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this Employee?"
    );
    if (confirmation) {
      await deleteEmployee(id);
      await onUpdate();
    }
  };

  const renderTable = () => {
    return (
      <tbody>
        {data.map((e) => (
          <Employee {...e} key={e.id} refetch={onUpdate}>
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
                cb={onUpdate}
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
    );
  };

  return (
    <div className="h-full">
      <div className="flex justify-end items-center gap-5">
        {meta?.total > 0 && <p>total: {meta.total}</p>}
        <Input
          Icon={<SearchIcon />}
          placeholder="Search..."
          value={searchTerm}
          className="max-w-sm"
          type="search"
          onChange={(e) => updateSearchParams({ q: e.target.value })}
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

      <table className="table mt-5 max-h-full">
        <thead>
          <tr>
            {employeeTableHeadings.map((v, i) => (
              <th key={i}>
                {v.sort ? (
                  <button
                    className="flex gap-1 items-start"
                    onClick={() => updateSorting(v.value)}
                  >
                    <p>{v.label}</p>
                    {orderBy == v.value && order == "DESC" && (
                      <ArrowDownIcon size={15} />
                    )}
                  </button>
                ) : (
                  v.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        {renderTable()}
      </table>
      {loading && <Loader fullscreen />}
      <div className="flex justify-end py-10 ">
        <div className="flex gap-2">
          {meta?.total > 5 && (
            <Input
              type="select"
              className="w-20"
              options={limitOptions}
              value={limit}
              onChange={(e) =>
                updateSearchParams({ limit: e.target.value, page: 1 })
              }
            />
          )}
          <Pagination
            pages={meta?.pages}
            current={page}
            onClick={(v) => updateSearchParams({ page: v })}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
