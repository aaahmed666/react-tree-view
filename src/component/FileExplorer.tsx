import { useState, useEffect } from "react";
import "../style/FileExplorer.css";
import { File, FileSystem, Folder } from "../type/types";

interface FileExplorerProps {
  data: FileSystem;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ data }) => {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    filePath: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    filePath: null,
  });

  // Toggle folder open/close
  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  // Handle right-click (open context menu)
  const handleRightClick = (e: React.MouseEvent, filePath: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      filePath,
    });
  };

  // Handle context menu actions
  const handleContextMenuAction = (action: "copy" | "delete" | "rename") => {
    if (contextMenu.filePath) {
      console.log(
        `${action.toUpperCase()} action on file: ${contextMenu.filePath}`
      );
    }
    setContextMenu({ ...contextMenu, visible: false });
  };

  // Close context menu on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  // Render file system
  const renderFileSystem = (node: Folder | File, path: string = "") => {
    if (node.type === "folder") {
      const isOpen = expandedFolders[path];
      return (
        <div
          key={path}
          className="folder"
        >
          <div
            onClick={() => toggleFolder(path)}
            className="folder-name"
          >
            {isOpen ? "📂" : "📁"} {node.name}
          </div>
          {isOpen && (
            <div className="folder-contents">
              {node.data.map((child) =>
                renderFileSystem(child, `${path}/${child.name}`)
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={path}
          className={`file ${selectedFile === path ? "selected" : ""}`}
          onClick={() => setSelectedFile(path)}
          onContextMenu={(e) => handleRightClick(e, path)}
        >
          📄 {node.name}
        </div>
      );
    }
  };

  return (
    <div className="file-explorer">
      {renderFileSystem(data)}
      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div onClick={() => handleContextMenuAction("copy")}>Copy</div>
          <div onClick={() => handleContextMenuAction("delete")}>Delete</div>
          <div onClick={() => handleContextMenuAction("rename")}>Rename</div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
