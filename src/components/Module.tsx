import { FaRegTrashAlt, FaUndoAlt } from "react-icons/fa";

import { ModuleType } from "../types";
import dayjs from "dayjs";

export const Module: React.FC<{ module: ModuleType; showRemoveModuleModal: (module: ModuleType) => void }> = ({
  module,
  showRemoveModuleModal,
}) => {
  return (
    <div
      key={module.id}
      className={`border rounded-md py-2 px-3 flex flex-row gap-8 justify-between ${
        module.isRemoved ? "border-neutral-200 text-neutral-300" : "border-neutral-500"
      }`}
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm">{module.name}</span>
        <span className="text-xs">{dayjs(module.startTime).format("DD.MM.YYYY HH:mm")}</span>
      </div>
      <button type="button" onClick={() => showRemoveModuleModal(module)}>
        {module.isRemoved ? <FaUndoAlt className="text-neutral-800" /> : <FaRegTrashAlt className="text-red-600" />}
      </button>
    </div>
  );
};
