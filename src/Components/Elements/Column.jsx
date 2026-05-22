import { Card } from "./Card";
import { useContext } from "react";
import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.tasks
 * @param {number} props.columnIndex
 * @returns {JSX.Element}
 */
export function Column(props) {
  const { title, columnId, tasks, columnIndex } = props;
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  const addTaskHundler = () => {
  const newTask = {
    id: Date.now(),
    title: "New Task",
  };

  setData((prev) =>
    produce(prev, (draft) => {
      const board = draft[selectedBoardIndex];
      if (!board) return;

      const columnIdx = board.columns.findIndex(
        (col) => col.id === columnId
      );
      if (columnIdx === -1) return;

      if (!Array.isArray(board.columns[columnIdx].tasks)) {
        board.columns[columnIdx].tasks = [];
      }

      board.columns[columnIdx].tasks.push(newTask);
    })
  );
};

  const deleteColumnHundler = () => {
    if (confirm(`Are You Sure You Want To Delete "${title}"`)) {
      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns.splice(columnIndex, 1);
        }),
      );
    }
  };

  const tasksIndices = useMemo(() => {
    if (!Array.isArray(columns)) return [];

    return columns.flatMap((column) =>
      Array.isArray(column.tasks)
        ? column.tasks.map((task) => task.id)
        : []
    );
  }, [columns]);

  return (
    <div className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks?.length || 0})
        <button
          className="absolute bottom-0 right-0 top-0 p-2 text-body-m text-red opacity-0 duration-300 focus:opacity-100 group-hover/column:opacity-100"
          onClick={deleteColumnHundler}
        >
          Delete
        </button>
      </h2>
      <SortableContext
        items={tasksIndices}
        strategy={verticalListSortingStrategy}
      >
        <div className="mb-5 flex flex-col gap-5">
          {tasks && tasks?.map((task, index) => (
            <Card
              key={task.id}
              title={task.title}
              cardId={task.id}
              columnId={columnId}
              columnIndex={columnIndex}
              cardIndex={index}
            />
          ))}
        </div>
      </SortableContext>
      <button
        className="-mx-2 mt-auto border-t border-light-grey bg-lines-light px-2 py-4 text-heading-m text-medium-grey"
        onClick={addTaskHundler}
      >
        + Add New Task
      </button>
    </div>
  );
}
