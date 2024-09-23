//定义strores
import { defineStore } from "pinia"
import { ref } from "vue"

export const useIdStore = defineStore("id", () => {
    const id = ref("");
    const name = ref("");

    const setId = (newId) => {
        id.value = newId;
    };

    const setName = (newName) => {
        name.value = newName;
    };

    const removeId = () => {
        id.value = "";
    };

    const removeName = () => {
        name.value = "";
    };

    return {
        id, setId, removeId,
        name, setName, removeName
    };
},
{
    persist: true
});
