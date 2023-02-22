import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, DatePicker, Modal, Space } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { InputField, Table, Button, Alert, Error } from "src/components";
import { useMutation, useQuery } from "src/api/APIHooks";
import { GET_ALL_EMPLOYEES } from "src/api/url";
import { TableData } from "src/components/table/type";
import {
  firstNameRules,
  lastNameRules,
  emailRules,
  genderRules,
  phoneRules,
} from "./rules";
import { getEmpDetails, setEmployeeDetails } from "src/redux/slicers/homeSlice";
import { columns, intialFormData } from "./constants";
import "./home.scss";

interface FormValues {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  joinedDate: any;
}

const HomePage: React.FC = () => {
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const dispatch = useDispatch();
  const dataList = useSelector(getEmpDetails);

  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setDeletedId = useState("");
  const [columnData, setColumnDat] = useState(columns);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const actionField = {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text: string, record: TableData) => {
      return (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            iconComp={<EditOutlined />}
          />

          <Button
            onClick={() => onConfirmDelete(record)}
            danger
            iconComp={<DeleteOutlined />}
          />
        </Space>
      );
    },
  };

  //api to fetch all employee lists
  const {
    data: employeeData,
    loading: emplyeeLoading,
    refetch: employeeDataRefetch,
  }: any = useQuery({
    url: `${GET_ALL_EMPLOYEES}`,
  });

  // successcallback for deleting employee
  const onSuccssDeletionEmployeeCallback = () => {
    employeeDataRefetch();
    setToast({ message: "Deleted Employee", type: "success" });
  };

  //api to delete the employee
  const { refetch: employeeDeleteRefetch }: any = useQuery({
    url: `${GET_ALL_EMPLOYEES}`,
    disableInitialLoad: true,
    successCallback: onSuccssDeletionEmployeeCallback,
  });

  useEffect(() => {
    if (employeeData?.data) {
      const updateEmployeeData = employeeData.data.reverse();
      dispatch(setEmployeeDetails(updateEmployeeData));
    } else {
      dispatch(setEmployeeDetails([]));
    }
  }, [employeeData, dispatch]);

  //employee creating and update success callback
  const onSuccssCallback = () => {
    employeeDataRefetch();
    setIsModalVisible(false);
    setFormValues(null);

    if (formValues) {
      setToast({ message: "updated successfully ", type: "success" });
    } else {
      setToast({ message: "created successfully", type: "success" });
    }
  };

  //api to update the employee details
  const {
    error,
    loading: formSubmitLoading,
    onSubmit,
    setError,
  } = useMutation({
    url: `${GET_ALL_EMPLOYEES}`,
    successCallback: onSuccssCallback,
  });

  useEffect(() => {
    if (sessionStorage.getItem("role") === "Admin") {
      setColumnDat([...columnData, actionField]);
    }
  }, []);

  useEffect(() => {
    if (formValues) {
      setIsModalVisible(true);
      const updatedFormValue = { ...formValues };
      updatedFormValue.joinedDate = dayjs(formValues.joinedDate);
      form.setFieldsValue(updatedFormValue);
    }
  }, [formValues, form]);

  // submission of employee payload on creation and update
  const handleFormSubmit = (values: FormValues) => {
    const payload: any = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phone: values?.phone,
      gender: values?.gender,
      joinedDate: dayjs(values.joinedDate).format("YYYY-MM-DD"),
    };

    if (formValues) {
      onSubmit(payload, `${GET_ALL_EMPLOYEES}/${formValues?.id}`, "put");
    } else {
      onSubmit(payload);
    }
  };

  const handleEdit = (data: FormValues) => {
    setFormValues(data);
  };

  const handleDelete = (data: FormValues) => {
    if (data) {
      setDeletedId[1](data?.id);
      employeeDeleteRefetch(`${GET_ALL_EMPLOYEES}/${data.id}`, "delete");
    }
  };

  const modalOnclose = useCallback(() => {
    setIsModalVisible(false);
    setFormValues(null);
    form.resetFields();
    setError("");
  }, [form]);

  const onAddEmployee = useCallback(() => {
    setIsModalVisible(true);
    form.setFieldsValue(intialFormData);
  }, [form]);

  // delete confirmation callback
  const onConfirmDelete = (data: FormValues) => {
    confirm({
      title: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(data);
      },
    });
  };

  const disabledDate = (current: Dayjs | null) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <>
      {toast?.message ? (
        <Alert
          message={toast.message}
          type={"success"}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      ) : null}
      {sessionStorage.getItem("role") === "Admin" ? (
        <div className="employee-add-btn">
          <Button
            label="Add"
            type="primary"
            onClick={onAddEmployee}
            iconComp={<PlusCircleOutlined />}
          />
        </div>
      ) : null}
      <h3>Employees List</h3>
      <div className="employee-table">
        <Table
          columns={columnData}
          dataList={dataList}
          loading={emplyeeLoading}
        />
      </div>
      <Modal visible={isModalVisible} onCancel={modalOnclose} footer={[]}>
        <div className="my-form-card">
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <InputField
              label="First Name"
              name="firstName"
              rules={firstNameRules}
              placeholder="Enter your first name"
              allowClear
            />
            <InputField
              label="Last Name"
              name="lastName"
              rules={lastNameRules}
              placeholder="Enter your last name"
              allowClear
            />
            <InputField
              label="Email"
              name="email"
              rules={emailRules}
              placeholder="Enter your email"
              allowClear
            />
            <InputField
              label="Phone Number"
              name="phone"
              rules={phoneRules}
              validateTrigger={["onChange", "onBlur"]}
              placeholder="Enter your phone number"
              allowClear
            />
            <InputField
              label="Gender"
              name="gender"
              rules={genderRules}
              type="radio"
              items={["male", "female", "other"]}
            />
            <Form.Item
              label="Joined Date"
              name="joinedDate"
              rules={[{ required: true }]}
            >
              <DatePicker
                placeholder="Select your joined date"
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                label="Submit"
                iconComp={<SaveOutlined />}
                loading={formSubmitLoading}
              />
            </Form.Item>
            {error?.message ? <Error message={error.message} /> : null}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;
