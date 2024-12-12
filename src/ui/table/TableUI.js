import React from "react";

export function TableHead({ titles }) {
  return (
    <tr className="border-b border-gray-300 overflow-clip">
      {titles.map(({ title, id }) => (
        <th className="py-3 px-4 text-left" key={id}>
          {title}
        </th>
      ))}
    </tr>
  );
}

export function TableBodyRenderer({ element, handler }) {
  const {
    TestDescription,
    IsActive,
    TestStartDate,
    TestEndDate,
    TestStartTime,
    TestEndTime,
    CreatedAt,
    CreatedBy,
  } = element;

  function getFormattedTime(timeString) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes] = new Date(timeString)
      .toUTCString()
      .split(" ")[4]
      .split(":");

    // Determine if it's AM or PM
    const meridiem = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const twelveHour = hours === 0 ? 12 : hours % 12;

    // Return formatted time without seconds
    return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${meridiem}`;
  }

  const dateStart = TestStartDate ? new Date(TestStartDate) : null;
  const dateEnd = TestEndDate ? new Date(TestEndDate) : null;

  const fullStartDate = dateStart
    ? `${dateStart.getUTCFullYear()}-${(dateStart.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateStart.getDate().toString().padStart(2, "0")}`
    : "";
  const fullEndDate = dateEnd
    ? `${dateEnd.getUTCFullYear()}-${(dateEnd.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateEnd.getDate().toString().padStart(2, "0")}`
    : "";

  const fullStartTime = TestStartTime && getFormattedTime(TestStartTime);
  const fullEndTime = TestEndTime && getFormattedTime(TestEndTime);

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <Tbody
        data={TestDescription}
        onClick={() => handler(element)}
        className="hover:cursor-pointer md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px] underline text-blue-800"
      />
      <Tbody
        data={IsActive ? 1 : 0}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
      <Tbody
        data={fullStartDate}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
      <Tbody
        data={fullEndDate}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
      <Tbody
        data={fullStartTime}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
      <Tbody
        data={fullEndTime}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
      <Tbody
        data={CreatedBy}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
      <Tbody
        data={CreatedAt && new Date(CreatedAt).toDateString()}
        className="md:px-5 max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      />
    </tr>
  );
}

export function Tbody({ data, ...props }) {
  return <td {...props}>{data}</td>;
}
