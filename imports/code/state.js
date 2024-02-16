
import { get, writable } from 'svelte/store';



const stateWritable = writable({
    view: {
        mode: "page",
        fullWidth: false,
        darkMode: false
    },
    current: {
        script: { title: "" },
        project: { title: "" },
        card: {
            _id: null
        }
    },
    modal: {
        name: ""
    },
    navbar: {
        collapsed: false,
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
            showOptions: true,


        },
        selected: "projects",
        show: false,
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

