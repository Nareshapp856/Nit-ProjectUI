function TopicNameRenderer({ topics, selectedTopic, setSelectedTopic }) {
  return (
    <div className="max-w-[33%] w-[33%] flex flex-col me-6">
      <label htmlFor="TopicID">Topic Name:</label>

      <select
        id="TopicID"
        name="TopicID"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {/**  Default */}
        <option value="-1">Select A Topic</option>
        {/** TopicID names */}
        {topics &&
          topics.map(({ TopicID, TopicName }) => {
            return (
              <option key={TopicID} value={TopicID}>
                {TopicName}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default TopicNameRenderer;
