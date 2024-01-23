interface Cache {
  set(key: string, value: string): void;
  get(key: string): string | null;
  setJson(key: string, valueJson: any): void;
  getJson<T>(key: string): T | null;
  remove(key: string): void;
}

const cache: Cache = {
  set(key, value) {
    localStorage.setItem(key, value);
  },
  get(key) {
    return localStorage.getItem(key);
  },
  setJson(key, valueJson) {
    localStorage.setItem(key, JSON.stringify(valueJson));
  },
  getJson(key) {
    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : null;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

export default cache;
