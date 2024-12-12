// ./batchTable/RecordTooltip.jsx
import React from "react";

const RecordTooltip = ({ record }) => {
  if (!record) return null;

  const commentsArr = record?.comments?.split(",");

  return record.comments || record.reasons ? (
    <div className="space-y-2">
      {record.comments &&
      !(
        record.comments.includes("Other reasons") && commentsArr?.length === 1
      ) ? (
        <div>
          <strong className="underline block mb-1">Reasons</strong>
          <ul className="list-disc pl-5">
            {commentsArr.map(
              (comment, index) =>
                !comment.includes("Other reasons") && (
                  <li key={index} className="">
                    {comment}
                  </li>
                )
            )}
          </ul>
        </div>
      ) : null}
      {record.reasons && (
        <div>
          <strong className="underline block mb-1">Comment</strong>
          <p className="px-1">{record.reasons}</p>
        </div>
      )}
    </div>
  ) : (
    <strong className="text-center">No Data to Show.</strong>
  );
};

export default RecordTooltip;
