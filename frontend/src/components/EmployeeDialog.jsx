import { AtSignIcon, PhoneIcon, User2Icon } from "lucide-react";
import Button from "./ui/button";
import Dialog from "./ui/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  courseOptions,
  designationOptions,
  employeeSchema,
  genderOptions,
} from "../utils/validations/employee";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/ui/input";
import Tooltip from "./ui/tooltip";
import useApi from "../hooks/use-api";
import {
  apiCreateEmployee,
  apiUpdateEmployee,
  apiUploadImage,
} from "../apis/employee";
import cn from "../utils/cn";
import Spinner from "./ui/spinner";

const Upload = ({ register, value = undefined, error, loading, onChange }) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer">
        <Tooltip title="Click to upload Image">
          <div className="relative">
            <img
              src={value ? value : "/profile-picture.png"}
              className={cn("object-cover rounded-full  w-[180px] h-[180px]", {
                "brightness-50": loading,
              })}
            />
            <div
              className={cn(
                "absolute hidden justify-center items-center top-0 h-full w-full",
                {
                  flex: loading,
                }
              )}
            >
              <Spinner />
            </div>
          </div>
        </Tooltip>
        <input
          disabled={loading}
          hidden
          type="file"
          className="file-input file-input-bordered w-full"
          accept=".jpg,.png"
          onChange={onChange}
        />
        <input {...register} hidden />
      </label>
      {error && (
        <span className="text-error label-text pt-1 pl-5">{error.message}</span>
      )}
    </div>
  );
};

const EmployeeDialog = ({
  cb,
  defaultValues = {},
  trigger,
  purpose = "Create",
  id,
}) => {
  const [open, setOpen] = useState(false);
  const { fn: create, loading: createLoading } = useApi(apiCreateEmployee, {
    success: true,
  });

  const { fn: update, loading: updateLoading } = useApi(apiUpdateEmployee, {
    success: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      course: [],
      image: undefined,
      ...defaultValues,
    },
    resolver: yupResolver(employeeSchema),
  });

  useEffect(() => {
    if (purpose == "Create") {
      reset(undefined);
    }
  }, [open]);

  const image = watch("image");

  const onSubmit = async (data) => {
    let res;

    if (purpose == "Create") {
      res = await create(data);
    } else if (purpose == "Update") {
      res = await update(id, data);
    }

    if (res.success) {
      setOpen(false);
      await cb();
    } else {
      setError(res.data.path, { message: res.message });
    }
  };

  const { fn: uploadApiRequest, loading: uploadLoading } =
    useApi(apiUploadImage);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpg", "image/png", "image/jpeg"].includes(file.type)) {
      setError("image", {
        message: "Only JPG,PNG Images are allowed",
      });
      return;
    }
    const fromData = new FormData();
    fromData.append("image", file);

    if (image) {
      fromData.append("url", image);
    }

    const res = await uploadApiRequest(fromData);

    if (res.success) {
      setValue("image", res.data.url);
      clearErrors("image");
    }
  };

  return (
    <Dialog
      hideCloseBtn={createLoading || uploadLoading || updateLoading}
      open={open}
      onClose={reset}
      setOpen={setOpen}
      name={`${purpose} Employee`}
      className="max-w-3xl"
      trigger={trigger}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="grid grid-cols-3">
          <Upload
            register={register("image")}
            error={errors.image}
            value={image}
            loading={uploadLoading}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-y-5 col-span-2">
            <Input
              register={register("name")}
              error={errors.name}
              Icon={<User2Icon />}
            />
            <Input
              register={register("email")}
              error={errors.email}
              Icon={<AtSignIcon />}
            />
            <Input
              type="number"
              register={register("mobile")}
              error={errors.mobile}
              Icon={<PhoneIcon />}
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <Input
            type="radio"
            register={register("gender")}
            error={errors.gender}
            options={genderOptions}
          />
          <Input
            type="select"
            register={register("designation")}
            error={errors.designation}
            placeholder="Choose a Designation"
            options={designationOptions}
            className="col-span-2"
          />
        </div>
        <Input
          type="checkbox"
          register={register("course")}
          error={errors.course}
          options={courseOptions}
        />
        <Button
          className="w-full"
          type="submit"
          loading={createLoading || updateLoading}
          disabled={uploadLoading}
        >
          {purpose}
        </Button>
      </form>
    </Dialog>
  );
};

export default EmployeeDialog;
