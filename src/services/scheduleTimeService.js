export class ScheduleTimeClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new ScheduleTimeClass();
    return this.instance;
  }

  constructor() {
    this.scheduleTimeData = {
      testName: "",
      testDescription: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    };
  }

  setScheduleTimeData(
    testName,
    testDescription,
    startDate,
    endDate,
    startTime,
    endTime
  ) {
    this.scheduleTimeData = {
      testName,
      testDescription,
      startDate,
      endDate,
      startTime,
      endTime,
    };
    return this;
  }

  getScheduleTimeData() {
    return this.scheduleTimeData;
  }
}

const ScheduleTimeService = ScheduleTimeClass.getInstance();
export default ScheduleTimeService;
