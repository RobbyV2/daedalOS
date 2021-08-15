import type { FolderActions } from "components/system/Files/FileManager/useFolder";
import { useMenu } from "contexts/menu";
import type { MenuItem } from "contexts/menu/useMenuContextState";
import { EMPTY_BUFFER, MENU_SEPERATOR } from "utils/constants";

const NEW_FOLDER = "New folder";
const NEW_TEXT_DOCUMENT = "New Text Document.txt";

const useFolderContextMenu = (
  { newPath, addToFolder }: FolderActions,
  updateFiles: (appendFile?: string | undefined) => void
): { onContextMenuCapture: React.MouseEventHandler<HTMLElement> } => {
  const { contextMenu } = useMenu();
  const menuItems: MenuItem[] = [
    { label: "Refresh", action: () => updateFiles() },
    MENU_SEPERATOR,
    { label: "Add file", action: () => addToFolder() },
    MENU_SEPERATOR,
    {
      label: "New",
      menu: [
        {
          label: "Folder",
          action: () => newPath(NEW_FOLDER, undefined, true),
        },
        MENU_SEPERATOR,
        {
          label: "Text Document",
          action: () => newPath(NEW_TEXT_DOCUMENT, EMPTY_BUFFER, true),
        },
      ],
    },
  ];

  return {
    onContextMenuCapture: contextMenu?.(menuItems),
  };
};

export default useFolderContextMenu;
