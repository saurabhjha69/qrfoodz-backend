import path from "path"
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
console.log(filePath)
const dirname = path.dirname(filePath).replace(/\\src\\utils$/, '');
console.log(dirname)

export default dirname