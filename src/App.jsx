import { Header } from "@Layout";
import { SideBar, Workspace } from "@Layout";
import { DataContext } from "./DataContext";
import { useState, useEffect } from "react";

function App() {
  const KEY = "kanban-data";
  const [dataState, setDataState] = useState(() =>
    localStorage.getItem(KEY)
      ? JSON.parse(localStorage.getItem(KEY))
      : undefined,
  );
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  useEffect(() => {
    if (!dataState) return;
    localStorage.setItem(KEY, JSON.stringify(dataState));
  }, [dataState]);

  return (
    <DataContext.Provider
      value={{
        data: dataState || [],
        setData: setDataState,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      <div className="flex h-screen flex-col font-jakarta">
        <Header />
        <div className="flex flex-1">
          <SideBar />
          <Workspace />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
