import { parseISO, format, isValid } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  if (!dateString) {
    return null;
  }

  const date = parseISO(dateString);
  
  if (!isValid(date)) {
    return null;
  }

  return (
    <time dateTime={dateString} className="text-sm text-muted-foreground">
      {format(date, "do MMM yy")}
    </time>
  );
};

export default DateFormatter;
