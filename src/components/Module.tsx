import { FaRegTrashAlt } from "react-icons/fa";
import { ModuleType } from "../types";
import dayjs from "dayjs";

export const Module: React.FC<{ module: ModuleType; showRemoveModuleModal: (module: ModuleType) => void }> = ({
  module,
  showRemoveModuleModal,
}) => {
  return (
    <div key={module.id} className="border rounded-md py-2 px-3 flex flex-row gap-8 justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-sm">{module.name}</span>
        <span className="text-xs">{dayjs(module.startTime).format("DD.MM.YYYY HH:mm")}</span>
      </div>
      <button type="button" onClick={() => showRemoveModuleModal(module)}>
        <FaRegTrashAlt className="text-red-600" />
      </button>
    </div>
  );
};
