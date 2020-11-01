export interface FileService {
  /**
   * Uploads a file to firebase storage.
   * @param dir Destination directory without trailing slash
   * @param file File object
   * @param filename Custom filename while retaining the file type
   */
  uploadFile(dir: string, file: File, filename?: string): Promise<any>;
  /**
   * Delete a file from firebase storage.
   * @param downloadUrl File download URL taken from object metadata
   */
  deleteFile(downloadUrl: string): Promise<void>;
}
