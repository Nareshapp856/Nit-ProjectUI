function SubTopicNameRenderer({
  subTopics,
  selectedSubTopics,
  setSelectedSubTopic,
}) {
  return (
    <div className="max-w-[33%] w-[33%] flex flex-col me-6">
      <label htmlFor="SubTopicID">SubTopic Name:</label>

      <select
        id="SubTopicID"
        name="SubTopicID"
        value={selectedSubTopics}
        onChange={(e) => setSelectedSubTopic(e.target.value)}
      >
        {/**  Default */}
        <option value="-1">Select A SubTopic</option>
        {/** SubTopic names */}
        {subTopics &&
          subTopics.map(({ SubTopicID, SubTopicName }) => {
            return (
              <option key={SubTopicID} value={SubTopicID}>
                {SubTopicName}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default SubTopicNameRenderer;
