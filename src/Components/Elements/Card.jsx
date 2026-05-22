import { DataContext } from "@/DataContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { produce } from "immer";
import { useState, useContext } from "react";

export function Card(props) {
  const { title, cardId, columnId, columnIndex, cardIndex } = props;
  const { setData, selectedBoardIndex } = useContext(DataContext);

  const [isEditMode, setIsEditMode] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: cardId,
      data: { columnId },
      disabled: isEditMode,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onDeleteHandler = () => {
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns[columnIndex].tasks.splice(
          cardIndex,
          1,
        );
      }),
    );
  };

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    if (e.target.value.trim() === title) return;
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns[columnIndex].tasks[cardIndex].title =
          e.target.value.trim();
      }),
    );
  };

  return (
    <div
      className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!isEditMode ? listeners : {})}
    >
      {isEditMode ? (
        <textarea
          className="h-full resize-none text-heading-m outline-light-grey"
          defaultValue={title}
          onFocus={(e) => e.target.select()}
          onPointerDown={(e) => e.stopPropagation()}
          onBlur={onBlurHandler}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          autoFocus
        />
      ) : (
        <button
          className="peer h-full text-start text-heading-m"
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          {title}
        </button>
      )}

      <button
        className="absolute bottom-0 right-0 top-0 bg-white p-2 text-body-m text-red opacity-0 shadow duration-300 focus:opacity-100 group-hover/card:opacity-100 peer-focus:opacity-100"
        onClick={onDeleteHandler}
      >
        Delete
      </button>
    </div>
  );
}
