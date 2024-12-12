import { connect } from "react-redux";
import { types } from "../../../../store/root.actions";
import { useEffect } from "react";
import { format } from "date-fns";

function TestRendererComponent({}) {
  return (
    <ul className="my-ayto space-y-4">
      <li>
        <p className="text-sm mb-2">
          <b>Date:</b> {String(format(new Date(), "yyyy-mm-dd"))}
        </p>
        <p className="text-sm mb-2">
          <b>Test Title:</b> The Test
        </p>
        <p className="text-sm line-clamp-4">
          <b>Test Description:</b> waiting just for somebuddy to love i was out
          driving every mile if i rewind it's all been a wast of time
        </p>
      </li>

      <li>
        <p className="text-sm mb-2">
          <b>Date:</b> {String(format(new Date(), "yyyy-mm-dd"))}
        </p>
        <p className="text-sm mb-2">
          <b>Test Title:</b> The Test
        </p>
        <p className="text-sm line-clamp-4">
          <b>Test Description:</b> waiting just for somebuddy to love and to
          surrond me and to handle my emotion i was out driving every mile if i
          rewind it's all been a wast of time
        </p>
      </li>

      <li>
        <p className="text-sm mb-2">
          <b>Date:</b> {String(format(new Date(), "yyyy-mm-dd"))}
        </p>
        <p className="text-sm mb-2">
          <b>Test Title:</b> The Test
        </p>
        <p className="text-sm line-clamp-4">
          <b>Test Description:</b> waiting just for somebuddy to love and to
          surrond me and to handle
        </p>
      </li>
    </ul>
  );
}

const mapState = (state) => ({
  testList: state.testsByDateReducer.data,
  isTestListLoading: state.testsByDateReducer.isLoading,
  testListFetchError: state.testsByDateReducer.isError,
});

const mapDispatch = {
  testsByDateDispatch: ({ startDate, endDate }) => ({
    type: types.TESTSBYDATE,
    payload: { startDate, endDate },
  }),
};

const TestRenderer = connect(mapState, mapDispatch)(TestRendererComponent);

export default TestRenderer;
