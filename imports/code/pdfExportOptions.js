import { writable } from 'svelte/store';

const settings = {
    embolden_scene_headers: true,
    show_page_numbers: true,
    split_dialogue: true,
    print_title_page: false,
    print_profile: "usletter",
    double_space_between_scenes: false,
    print_sections: false,
    print_synopsis: false,
    print_actions: true,
    print_headers: true,
    print_dialogues: true,
    number_sections: false,
    use_dual_dialogue: true,
    print_notes: false,
    print_header: "",
    print_footer: "",
    print_watermark: "",
    scenes_numbers: "none",
    each_scene_on_new_page: false,
};


export const _pdfExportOptions = writable(settings);



