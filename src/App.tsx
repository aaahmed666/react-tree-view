import FileExplorer from "./component/FileExplorer";
import { FileSystem } from "./type/types";

function App() {
  const Files: FileSystem = {
    type: "folder",
    name: "parent",
    data: [
      {
        type: "folder",
        name: "root",
        data: [
          {
            type: "folder",
            name: "src",
            data: [
              {
                type: "file",
                meta: "js",
                name: "index.js",
              },
            ],
          },
          {
            type: "folder",
            name: "public",
            data: [
              {
                type: "file",
                meta: "ts",
                name: "index.ts",
              },
            ],
          },
          {
            type: "folder",
            name: "data",
            data: [
              {
                type: "folder",
                name: "images",
                data: [
                  {
                    type: "file",
                    meta: "img",
                    name: "image.png",
                  },
                  {
                    type: "file",
                    meta: "img",
                    name: "image2.webp",
                  },
                ],
              },
              {
                type: "file",
                meta: "svg",
                name: "logo.svg",
              },
            ],
          },
          {
            type: "file",
            meta: "html",
            name: "index.html",
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className="App">
        <h1>File Explorer</h1>
        <FileExplorer data={Files} />
      </div>
    </>
  );
}

export default App;
