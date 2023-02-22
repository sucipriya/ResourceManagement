import { useEffect, useMemo } from "react";
import { Chart } from "src/components";
import { Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getEmpDetails, setEmployeeDetails } from "src/redux/slicers/homeSlice";
import { GET_ALL_EMPLOYEES } from "src/api/url";
import { useQuery } from "src/api/APIHooks";
import { countEmployeesJoinedByYear } from "./helper";
import { emptyChartData } from "./constants";

const ChartPage = () => {
  const emplyeeList = useSelector(getEmpDetails);
  const dispatch = useDispatch();

  const {
    data: employeeData,
    loading: emplyeeLoading,
    refetch: employeeDataRefetch,
  }: any = useQuery({
    url: `${GET_ALL_EMPLOYEES}`,
  });

  useEffect(() => {
    if (!emplyeeList?.length) {
      employeeDataRefetch();
    }
  }, []);

  useEffect(() => {
    if (employeeData?.data) {
      dispatch(setEmployeeDetails(employeeData.data));
    } else {
      dispatch(setEmployeeDetails([]));
    }
  }, [employeeData]);

  const chartData = useMemo(() => {
    if (emplyeeList?.length) {
      return countEmployeesJoinedByYear(emplyeeList);
    } else {
      return [];
    }
  }, [emplyeeList]);

  return (
    <div>
      <h3>Annual Employee Onboarding Trends</h3>
      <Spin tip="Loading..." size="large" spinning={emplyeeLoading}>
        <Chart
          data={chartData?.length ? chartData : emptyChartData}
          xaxisLabel="Year"
          yaxisLabel="Employee Count"
        />
      </Spin>
    </div>
  );
};

export default ChartPage;
