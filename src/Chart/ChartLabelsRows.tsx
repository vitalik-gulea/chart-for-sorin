interface IChartLabelsRowsProps {
  labels: string[];
}
const ChartLabelsRows = ({ labels }: IChartLabelsRowsProps) => {
  return (
    <div className="h-full grid flex-col">
      {labels.map((label, index) => (
        <p key={index} className="flex justify-center items-center text-[12px]">
          {label}
        </p>
      ))}
    </div>
  );
};

export default ChartLabelsRows;
