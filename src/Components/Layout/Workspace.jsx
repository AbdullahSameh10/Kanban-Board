import { DataContext } from "@/DataContext";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column } from "@Elements";
import { produce } from "immer";
import { useMemo, useContext } from "react";

export function Workspace() {
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  );

  const tasksIndices = useMemo(() => {
  if (!Array.isArray(columns)) return [];

  return columns.flatMap((column) =>
    Array.isArray(column.tasks)
      ? column.tasks.map((task) => task.id)
      : []
  );
}, [columns]);

  const newColumn = (num) => ({
    id: Date.now(),
    title: `New Column ${num}`,
    tasks: [],
  });

  const onAddColumndHundler = () => {
    const num = data[selectedBoardIndex].columns.length + 1;
    const newColumnVal = newColumn(num);
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns.push(newColumnVal);
      }),
    );
  };

  const onDragEndHundler = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    if (activeId === overId) return;
    if (activeColumnId !== overColumnId) return;

    const newColumns = columns.map((column) => {
      if (column.id === activeColumnId) {
        const activeIdIndex = column.tasks.findIndex(
          (task) => task.id === activeId,
        );
        const overIdIndex = column.tasks.findIndex(
          (task) => task.id === overId,
        );
        const tasks = arrayMove(column.tasks, activeIdIndex, overIdIndex);

        return { ...column, tasks };
      }
      return column;
    });

    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns = newColumns;
      }),
    );
  };

  const onDragOverHundler = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    if (activeColumnId === overColumnId) return;

    const newColumns = columns.map((column) => {
      if (column.id === overColumnId) {
        const activeTask = columns
          .find((column) => column.id === activeColumnId)
          .tasks.find((task) => task.id === activeId);
        const tasks = [...column.tasks, activeTask];

        return { ...column, tasks };
      }

      if (column.id === activeColumnId) {
        const tasks = column.tasks.filter((task) => task.id !== activeId);

        return { ...column, tasks };
      }

      return column;
    });

    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns = newColumns;
      }),
    );
  };

  return (
    <DndContext
      key={data[selectedBoardIndex]?.id}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndHundler}
      onDragOver={onDragOverHundler}
    >
      <div className="flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto bg-light-grey p-6">
        <SortableContext
          key={data[selectedBoardIndex]?.id}
          items={tasksIndices}
          strategy={verticalListSortingStrategy}
        >
          {columns &&
            columns.map((column, index) => (
              <Column
                key={column.id}
                columnId={column.id}
                title={column.title}
                tasks={column.tasks}
                columnIndex={index}
              />
            ))}
        </SortableContext>
        {columns && (
          <button
            className="w-72 shrink-0 self-start rounded-md bg-lines-light p-3 text-heading-l text-medium-grey"
            onClick={onAddColumndHundler}
          >
            + New Column
          </button>
        )}
      </div>
    </DndContext>
  );
}
