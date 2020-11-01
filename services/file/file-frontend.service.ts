import firebase from "firebase/app";
import FileUtils from "utils/file";
import { FileService } from "./interface";

class FileServiceFrontendImpl implements FileService {
  private readonly storage: firebase.storage.Storage;

  constructor(storage: firebase.storage.Storage) {
    this.storage = storage;
  }

  async uploadFile(dir: string, file: File, filename?: string) {
    const newFilename = filename ? `${filename}${FileUtils.getExtension(file)}` : file.name;
    const ref = this.storage.ref(`${dir}/${newFilename}`);
    await ref.put(file);
    return await ref.getDownloadURL();
  }

  async deleteFile(downloadUrl: string) {
    const ref = this.storage.refFromURL(downloadUrl);
    await ref.delete();
  }
}

export default FileServiceFrontendImpl;
