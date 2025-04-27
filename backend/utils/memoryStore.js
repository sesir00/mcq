// memoryStore.js
const memoryStore = {};

module.exports = {
    setItem: (key, value) => {
        memoryStore[key] = value;
    },
    getItem: (key) => {
        return memoryStore[key];
    },
    removeItem: (key) => {
        delete memoryStore[key];
    },
};
