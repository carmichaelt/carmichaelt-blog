import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-sm text-muted-foreground">
      {format(date, "do MMM yy")}
    </time>
  );
};

export default DateFormatter;