interface IChartLabelTimeProps {
  columns: number;
}
const ChartLabelTime = ({ columns }: IChartLabelTimeProps) => {
  const labelsArray = [
    "M",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "N",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {labelsArray.map((value, index) => (
        <p key={index}>{value}</p>
      ))}
    </div>
  );
};

export default ChartLabelTime;
