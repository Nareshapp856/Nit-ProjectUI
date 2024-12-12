import { TableBodyRenderer, TableHead } from "../ui/table/TableUI";

/**
 * Component for displaying a table of assessments.
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.titles - An array of assessment titles.
 * @param {Array} props.assessments - An array of assessment data.
 * @returns {JSX.Element} The AssessmentTable component.
 */
function AssessmentTable({ titles, assessments, handler }) {
  return (
    <table className="w-auto">
      <caption className="sr-only">Assessment Details</caption>
      <thead className="bg-gray-100 sticky top-0 z-10">
        <TableHead titles={titles} />
      </thead>
      <tbody>
        {assessments.map((element) => {
          return (
            <TableBodyRenderer
              handler={handler}
              key={element.TestID}
              index={element.TestID}
              element={element}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default AssessmentTable;
