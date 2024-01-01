import { createMonth, navigateMonth, createWeek, navigateWeek, Weekday } from './calendar-utils'; // Adjust the import path as necessary

describe('calendarService', () => {
  // Testing createMonth function
  describe('createMonth', () => {
    it('creates a month with Sunday as the start day', () => {
      const year = '2023';
      const month = '03';
      const monthSelection = createMonth(year, month, Weekday.Sunday);

      expect(monthSelection.currentMonthDays.length).toBeGreaterThan(27);
      expect(monthSelection.selectedMonth).toBe('March 2023');
    });

    it('creates a month with Monday as the start day', () => {
      const year = '2023';
      const month = '03';
      const monthSelection = createMonth(year, month, Weekday.Monday);

      expect(monthSelection.currentMonthDays.length).toBeGreaterThan(27);
    });
  });

  describe('Leap Year Functionality', () => {
    it('correctly handles February in a leap year', () => {
      const leapYear = '2024'; // 2024 is a leap year
      const february = '02';
      const monthSelection = createMonth(leapYear, february, Weekday.Sunday);

      // Check if February has 29 days in a leap year
      expect(monthSelection.currentMonthDays.length).toBe(29);
      expect(monthSelection.selectedMonth).toBe('February 2024');
      
      // Check if the extra day (29th) is correctly included
      const extraDay = monthSelection.currentMonthDays.find(day => day.dayOfMonth === 29);
      expect(extraDay).not.toBeUndefined();
      expect(extraDay?.date).toBe('2024-02-29');
    });

    it('handles February in a non-leap year', () => {
      const nonLeapYear = '2023'; // 2023 is not a leap year
      const february = '02';
      const monthSelection = createMonth(nonLeapYear, february, Weekday.Sunday);

      // Check if February has 28 days in a non-leap year
      expect(monthSelection.currentMonthDays.length).toBe(28);
      expect(monthSelection.selectedMonth).toBe('February 2023');
    });
  });

  // Testing navigateMonth function
  describe('navigateMonth', () => {
    const selectedMonth = '2023-03';

    it('navigates to the previous month', () => {
      const monthSelection = navigateMonth(selectedMonth, 'prev');
      expect(monthSelection.selectedMonth).toBe('February 2023');
    });

    it('navigates to the next month', () => {
      const monthSelection = navigateMonth(selectedMonth, 'next');
      expect(monthSelection.selectedMonth).toBe('April 2023');
    });

    it('navigates to the current month', () => {
      const monthSelection = navigateMonth(selectedMonth, 'current');
      expect(monthSelection.selectedMonth).toBe('March 2023');
    });
  });

  // Testing createWeek function
  describe('createWeek', () => {
    const date = '2023-03-15';

    it('creates a week for a given date', () => {
      const weekSelection = createWeek(date);
      expect(weekSelection.weekDays.length).toBe(7);
      expect(weekSelection.selectedWeek).toContain('Mar');
    });
  });

  // Testing navigateWeek function
  describe('navigateWeek', () => {
    const selectedWeekDate = '2023-03-15'; // A date in March
  
    it('navigates to the previous week', () => {
      const weekSelection = navigateWeek(selectedWeekDate, 'prev');
  
      // Since '2023-03-15' is a Wednesday, the previous week should start on the Sunday before
      expect(weekSelection.selectedWeek).toContain('Mar 05'); // Start of the previous week
      expect(weekSelection.selectedWeek).toContain('Mar 11, 2023'); // End of the previous week
      expect(weekSelection.weekDays[0].date).toBe('2023-03-05'); // Check start date of the week
      expect(weekSelection.weekDays[6].date).toBe('2023-03-11'); // Check end date of the week
    });
  
    it('navigates to the next week', () => {
      const weekSelection = navigateWeek(selectedWeekDate, 'next');
  
      // Since '2023-03-15' is a Wednesday, the next week should start on the Sunday after
      expect(weekSelection.selectedWeek).toContain('Mar 19'); // Start of the next week
      expect(weekSelection.selectedWeek).toContain('Mar 25, 2023'); // End of the next week
      expect(weekSelection.weekDays[0].date).toBe('2023-03-19'); // Check start date of the week
      expect(weekSelection.weekDays[6].date).toBe('2023-03-25'); // Check end date of the week
    });
  });
  
});
