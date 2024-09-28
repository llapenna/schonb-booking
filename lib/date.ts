import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);

export const WEEKDAYS = dayjs.localeData().weekdays();
