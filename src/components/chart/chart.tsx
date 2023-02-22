import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const Chart = ({ data, xaxisLabel, yaxisLabel }) => {
  const tickFormatter = (tick: any) => {
    return tick;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={tickFormatter}>
          <Label value={xaxisLabel} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value={yaxisLabel} angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Bar dataKey="value" fill={"teal"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
