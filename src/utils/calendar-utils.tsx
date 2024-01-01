// calendarService.ts
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export interface Day {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
}

export interface MonthSelection {
  currentMonthDays: Day[];
  previousMonthDays: Day[];
  nextMonthDays: Day[];
  selectedMonth: string;
}

export interface WeekSelection {
  weekDays: Day[];
  selectedWeek: string;
}

export enum Weekday {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

const getNumberOfDaysInMonth = (year: string, month: string): number => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
};

const createDaysForMonth = (year: string, month: string, isCurrentMonth: boolean): Day[] => {
  const numberOfDays = getNumberOfDaysInMonth(year, month);
  return Array.from({ length: numberOfDays }, (_, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth,
    };
  });
};

const createDaysForCurrentMonth = (year: string, month: string): Day[] => {
  return createDaysForMonth(year, month, true);
};

const getWeekday = (date: string, startDay: Weekday = Weekday.Sunday): number => {
  let weekday = dayjs(date).weekday() - startDay;
  if (weekday < 0) weekday += 7; // Adjust if the start day is not Sunday
  return weekday;
};

const createDaysForPreviousMonth = (
  year: string,
  month: string,
  currentMonthDays: Day[],
  startDay: Weekday = Weekday.Sunday
): Day[] => {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date, startDay);

  const visibleNumberOfDaysFromPreviousMonth = startDay === Weekday.Sunday 
    ? firstDayOfTheMonthWeekday
    : firstDayOfTheMonthWeekday === 0 ? 6 : firstDayOfTheMonthWeekday - 1;

  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
  const lastDayOfPreviousMonth = dayjs(previousMonth.endOf('month').format("YYYY-MM-DD")).date();

  return Array.from({ length: visibleNumberOfDaysFromPreviousMonth }).map((_, index) => {
    const dayOfMonth = lastDayOfPreviousMonth - visibleNumberOfDaysFromPreviousMonth + index + 1;
    return {
      date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${dayOfMonth}`).format("YYYY-MM-DD"),
      dayOfMonth: dayOfMonth,
      isCurrentMonth: false
    };
  });
};


const createDaysForNextMonth = (
  year: string, 
  month: string, 
  currentMonthDays: Day[], 
  startDay: Weekday = Weekday.Sunday
): Day[] => {
  const lastDayOfTheMonthWeekday = getWeekday(
    currentMonthDays[currentMonthDays.length - 1].date, 
    startDay
  );

  const visibleNumberOfDaysFromNextMonth = startDay === Weekday.Sunday 
    ? (6 - lastDayOfTheMonthWeekday)
    : (lastDayOfTheMonthWeekday === 0 ? 0 : 7 - lastDayOfTheMonthWeekday);

  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

  return Array.from({ length: visibleNumberOfDaysFromNextMonth }).map((_, index) => {
    return {
      date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false
    };
  });
};

export const createMonth = (year: string, month: string, startDay: Weekday = Weekday.Sunday): MonthSelection => {
  const currentMonthDays = createDaysForCurrentMonth(year, month);
  const previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays, startDay);
  const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);

  return {
    currentMonthDays,
    previousMonthDays,
    nextMonthDays,
    selectedMonth: dayjs(`${year}-${month}-01`).format("MMMM YYYY"),
  };
};

export const navigateMonth = (selectedMonth: string, direction: 'prev' | 'next' | 'current'): MonthSelection => {
  const month = dayjs(selectedMonth);
  const year = month.format('YYYY');
  const monthIndex = month.format('M');

  switch (direction) {
    case 'prev':
      return createMonth(year, String(parseInt(monthIndex, 10) - 1));
    case 'next':
      return createMonth(year, String(parseInt(monthIndex, 10) + 1));
    case 'current':
    default:
      return createMonth(year, monthIndex);
  }
};

// Week

const getWeekRange = (date: string, startDay: Weekday = Weekday.Sunday): { start: string, end: string } => {
  const startOfWeek = dayjs(date).startOf('week').add(startDay, 'day');
  const endOfWeek = startOfWeek.add(6, 'day');
  return {
    start: startOfWeek.format('YYYY-MM-DD'),
    end: endOfWeek.format('YYYY-MM-DD')
  };
};

const createDaysForWeek = (date: string, startDay: Weekday = Weekday.Sunday): Day[] => {
  const { start } = getWeekRange(date, startDay);
  return Array.from({ length: 7 }).map((_, index) => {
    const day = dayjs(start).add(index, 'day');
    return {
      date: day.format('YYYY-MM-DD'),
      dayOfMonth: day.date(),
      isCurrentMonth: day.month() === dayjs(date).month()
    };
  });
};

export const createWeek = (date: string): WeekSelection => {
  const weekDays = createDaysForWeek(date);
  const selectedWeek = `${dayjs(weekDays[0].date).format('MMM DD')} - ${dayjs(weekDays[6].date).format('MMM DD, YYYY')}`;

  return { weekDays, selectedWeek };
};

export const navigateWeek = (selectedWeek: string, direction: 'prev' | 'next'): WeekSelection => {
  const date = direction === 'prev' ? dayjs(selectedWeek).subtract(1, 'week') : dayjs(selectedWeek).add(1, 'week');
  return createWeek(date.format('YYYY-MM-DD'));
};
