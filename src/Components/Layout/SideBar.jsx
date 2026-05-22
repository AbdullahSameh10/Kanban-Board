import { BoardImg } from "@assets";
import clsx from "clsx";
import { useState } from "react";
import { CustomeDialog, AddNewBoardForm } from "@Elements";
import { DataContext } from "@/DataContext";
import { useContext } from "react";

const CustomeButton = (props) => {
  const { children, index, selectedBoardIndex, setSelectedBoardIndex } = props;
  return (
    <button
      className={clsx(
        "flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 text-heading-m text-medium-grey transition data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple",
        {
          "bg-main-purple !text-white hover:bg-main-purple":
            selectedBoardIndex === index,
        },
      )}
      data-isactive={selectedBoardIndex === index}
      onClick={() => setSelectedBoardIndex(index)}
    >
      {children}
    </button>
  );
};

const DialogTrigger = () => {
  return (
    <button className="flex w-full items-center gap-4 text-heading-m text-main-purple">
      <BoardImg /> + Create New Board
    </button>
  );
};

export function SideBar() {
  const [open, setOpen] = useState(false);
  const { data, selectedBoardIndex, setSelectedBoardIndex } = useContext(DataContext);
  
  return (
    <aside className="side-menu -mt-px flex max-w-[300px] w-[300px] flex-1 flex-col border-r border-lines-light bg-white">
      <p className="px-8 py-4 text-heading-s">ALL BOARDS ({data.length})</p>
      <ul>
        {data?.map((option, index) => (
          <li key={option.id}>
            <CustomeButton
              index={index}
              selectedBoardIndex={selectedBoardIndex}
              setSelectedBoardIndex={setSelectedBoardIndex}
            >
              {<BoardImg />} {option.title}
            </CustomeButton>
          </li>
        ))}
        <li className="px-8 py-4">
          <CustomeDialog
            isOpen={open}
            setOpen={setOpen}
            title="Create New Board"
            triggerComponent={DialogTrigger()}
          >
            <AddNewBoardForm triggerDialog={setOpen} />
          </CustomeDialog>
        </li>
      </ul>
    </aside>
  );
}
