import { CrossImg } from "@assets";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "@/DataContext";

export function AddNewBoardForm(props) {
  // eslint-disable-next-line react-hooks/purity
  const { triggerDialog, boardId, columns=[{ id: Date.now() }], title } = props;
  const [columnsArray, setColumnsArray] = useState(columns);
  const { setData, setSelectedBoardIndex, selectedBoardIndex } = useContext(DataContext);
  const removeColumnHundler = (id) => {
    setColumnsArray((prev) => prev.filter((column) => column.id !== id));
  };

  const addColumnHundler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now() }]);
  };

  const getNewColumnsArray = (formData, columnsArray, boardId) => {
    return columnsArray.map((obj, id) => {
      const newTasks = boardId ? obj.tasks : [];
            
      return {
        id,
        title: formData.get(obj.id),
        tasks: newTasks,
      };
    });
  };

  const updateData = (boardName, columns, setData, boardId) => {
    setData((prev) => {
      if (boardId) {
        const newData = [...prev];
        newData[selectedBoardIndex] = {
          ...newData[selectedBoardIndex],
          title: boardName,
          columns: columns,
        };
        return newData;
      }
      else {
        if (!prev){
        setSelectedBoardIndex(0);
        return [
          {
            id: Date.now(),
            title: boardName,
            columns: columns,
          }
        ]
      } 
      else {
        setSelectedBoardIndex(prev.length);
        return [
          ...prev,
          {
            id: Date.now(),
            title: boardName,
            columns: columns,
          },
        ];
      }
      }
      
    });
  };

  const onFormSubmitHundler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const boardName = formData.get("boardName");
    const columns = getNewColumnsArray(formData, columnsArray, boardId);
    // console.log(columnsArray);
    

    updateData(boardName, columns, setData, boardId);
    triggerDialog(false);
  };

  return (
    <form onSubmit={onFormSubmitHundler}>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Name</h3>
        <TextField placeholder="e.g. Web Design" name="boardName" defaultValue={title} required />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey">Columns</h3>
        {columnsArray.map((obj) => (
          <div key={obj.id} className="flex items-center gap-4">
            <TextField
              placeholder="e.g. Todo"
              name={obj.id}
              defaultValue={obj.title}
              required
            />
            <button type="button" onClick={() => removeColumnHundler(obj.id)}>
              <CrossImg />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => addColumnHundler()}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6 w-full">
        <Button type="submit" variant="primary" size="sm" fullWidth>
          {boardId ? "Update" : "Create New"} Board
        </Button>
      </div>
    </form>
  );
}
