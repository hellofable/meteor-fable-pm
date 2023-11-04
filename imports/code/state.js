
import { get, writable } from 'svelte/store';



const stateWritable = writable({
    view: {
        mode: "cards",
        fullWidth: true,
        darkMode: false
    },
    current: {
        script: { title: "" },
        project: { title: "" },
        card: {
            // _id: null
        }
    },
    darkMode: false,
    modal: {
        name: ""
    },
    savedStatus: {
        saving: false,
        saved: true,
    },
    sidebar: {
        browserOptions: {
            show: {
                colors: false,
                notes: false,
                synopses: true,
                firstline: true
            },
            showOptions: false

        },

        selected: "Browser",
        show: true,
        showOptions: false,
        inTrash: false
    },
    sessionId: null,
    user: {
        _id: null,
    },
    initAllCards: false
});

function createState() {
    const { subscribe, set } = stateWritable;
    return {
        subscribe,
        set,
        get: function () {
            return get(stateWritable)
        },
        setKey: function (key, value) {
            const appStoreClone = get(stateWritable);
            function setProp(appStoreClone, prop, value) {
                var props = prop.split(".");
                return [appStoreClone].concat(props).reduce(function (a, b, i) {
                    return i == props.length ? (a[b] = value) : a[b];
                });
            }
            setProp(appStoreClone, key, value);
            stateWritable.set(appStoreClone);
        },
    };
}

export const _state = createState();

