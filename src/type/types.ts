export interface File {
  type: "file";
  name: string;
  meta?: string;
}

export interface Folder {
  type: "folder";
  name: string;
  data: Array<File | Folder>;
}

export type FileSystem = Folder;
