import firebase from "firebase/app";
import FileUtils from "utils/file";

class FileService {
  private storage: firebase.storage.Storage;

  constructor(storage: firebase.storage.Storage) {
    this.storage = storage;
  }

  /**
   * Uploads a file to firebase storage.
   * @param dir Destination directory without trailing slash
   * @param file File object
   * @param filename Custom filename while retaining the file type
   */
  async uploadFile(dir: string, file: File, filename?: string) {
    const newFilename = filename ? `${filename}${FileUtils.getExtension(file)}` : file.name;
    const ref = this.storage.ref(`${dir}/${newFilename}`);
    await ref.put(file);
    return await ref.getDownloadURL();
  }

  /**
   * Delete a file from firebase storage.
   * @param downloadUrl File download URL taken from object metadata
   */
  async deleteFile(downloadUrl: string) {
    const ref = this.storage.refFromURL(downloadUrl);
    await ref.delete();
  }
}

export default FileService;
