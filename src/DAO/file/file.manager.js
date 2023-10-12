import fs from 'fs';

class FileManager {
  constructor(path = './db/db.json') {
    this.path = path;
  }

  getNextId(list) {
    return list.length === 0 ? 1 : list[list.length - 1]._id + 1;
  }

  async get() {
    try {
      const fileData = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    const data = await this.get();
    return data.find((d) => d._id == id);
  }

  async add(data) {
    const list = await this.get();
    data._id = this.getNextId(list);
    list.push(data);

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(list));
      return data;
    } catch (error) {
      throw error; // Manejar el error apropiadamente en tu aplicación
    }
  }

  async update(id, data) {
    const list = await this.get();
    const idx = list.findIndex((item) => item._id == id);

    if (idx !== -1) {
      list[idx] = data;
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(list));
        return data;
      } catch (error) {
        throw error; // Manejar el error apropiadamente en tu aplicación
      }
    } else {
      return null; // Puedes retornar null u otro valor para indicar que no se encontró el objeto.
    }
  }
  async writeData(data) {
    return fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }
}

export default FileManager;
