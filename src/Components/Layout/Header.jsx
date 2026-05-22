import { DataContext } from "@/DataContext";
import { VerticalEllipsisImg } from "@assets";
import { DropDown, CustomeDialog, AddNewBoardForm } from "@Elements";
import { useState, useContext } from "react";

export function Header() {
  const { data, setData, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);
  const [open, setOpen] = useState(false);

  const onEditBoard = () => setOpen(true);
  const onDeleteBoard = () => {
    if (confirm("Are you sure you want to delete this board?")) {
      setData((prev) => prev.toSpliced(selectedBoardIndex, 1));
      setSelectedBoardIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const dropDownTriggerComponent = () => {
    return (
      <button className="flex items-center gap-2 px-2 py-1 text-[14px] font-bold text-main-purple">
        <VerticalEllipsisImg />
      </button>
    );
  };
  const items = {
    edit: {
      label: "Edit",
      onClick: () => onEditBoard(),
    },
    delete: {
      label: "Delete",
      onClick: () => onDeleteBoard(),
    },
  };

  return (
    <header className="flex h-[97px] shrink-0 items-center">
      <div className="flex w-[300px] items-center gap-4 self-stretch border-b border-r border-lines-light pl-8 text-[32px] font-bold">
        Kanban
      </div>

      <div className="flex flex-1 items-center justify-between self-stretch border-b border-lines-light pl-6 pr-6">
        <h2 className="text-heading-xl">Platform Launch</h2>
        <DropDown items={items} triggerComponent={dropDownTriggerComponent} />
        <CustomeDialog isOpen={open} setOpen={setOpen} title="Edit Board">
          <AddNewBoardForm
            triggerDialog={setOpen}
            boardId={data[selectedBoardIndex]?.id}
            columns={data[selectedBoardIndex]?.columns}
            title={data[selectedBoardIndex]?.title}
          />
        </CustomeDialog>
      </div>
    </header>
  );
}
