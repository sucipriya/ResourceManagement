import { Table } from "antd";
import { TableData } from "./type";

const TableWithAntDesign = ({ columns, dataList, loading }: any) => {
  return (
    <Table<TableData>
      dataSource={dataList}
      columns={columns}
      loading={loading}
    />
  );
};

export default TableWithAntDesign;
