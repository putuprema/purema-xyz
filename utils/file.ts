class FileUtils {
  static getExtension(file: File): string {
    const matches = file.name.match(/\.\w+$/);
    return matches ? matches[0] : "";
  }
}

export default FileUtils;
