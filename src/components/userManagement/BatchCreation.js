function BatchCreation() {
  return (
    <>
      <h2>Batch Creation</h2>
      <div>
        <div className="flex justify-between">
          <div>
            <label htmlFor="branchid">BranchID</label>
            <select id="branchid" name="BranchID" defaultValue={-1}>
              <option value={-1}>auto</option>
            </select>
          </div>
          <div>
            <label htmlFor="technology">Technology</label>
            <select id="technology" name="TechnologyID" defaultValue={-1}>
              <option value={-1}>Select A Technology</option>
            </select>
          </div>
          <div>
            <lable id="course">Course</lable>
            <select id="course" name="CourseID" defaultValue={-1}>
              <option value={-1}>Select A Course</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default BatchCreation;
