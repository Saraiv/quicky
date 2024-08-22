export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  saveBase64ToFile(base64String: string): Promise<string>;
}
