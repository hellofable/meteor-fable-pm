<script>
    import * as yup from "yup";
    import { Form, Message } from "svelte-yup";
    import { _state } from "/imports/code/state";
    import { Meteor } from "meteor/meteor";

    let schema = yup.object().shape({
        title: yup.string().required().max(30).label("Project Title"),
    });

    let fields = { title: "", synopsis: "", imageUrl: "" };
    let submitted = false;
    let isValid;

    function formSubmit() {
        submitted = true;
        isValid = schema.isValidSync(fields);

        if (isValid) {
            Meteor.call("projects.insert", fields);
            $_state.modal.name = null;
            fields = { title: "", synopsis: "", imageUrl: "" };
            submitted = false;
        }
    }

    function loadMovie() {
        fetch("https://yts.mx/api/v2/movie_suggestions.json?movie_id=" + Math.floor(Math.random() * 10000))
            .then((response) => response.json())
            .then((data) => {
                const movie = data.data.movies[0];
                fields.title = movie.title;
                fields.synopsis = movie.synopsis;
            })
            .catch((error) => {
                console.error("Error fetching random movie:", error);
            });
    }

    async function get_random_movie() {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const randomNumber2 = Math.floor(Math.random() * 20) + 1;
        const url =
            "https://api.themoviedb.org/3/discover/movie?api_key=00c9b2f03e26fcdde6a0149636eaf8ff&include_adult=false&sort_by=popularity.desc&page=" +
            randomNumber;
        const response = await fetch(url);
        const data = await response.json();

        const movie = data.results[randomNumber2];

        fields.title = movie.title;
        fields.synopsis = movie.overview;
        fields.imageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
    }
</script>

<Form {schema} {fields} submitHandler={formSubmit} {submitted}>
    <input
        bind:value={fields.title}
        class="form-control"
        type="text"
        placeholder="Project Title"
        aria-label="default input example"
    />
    <textarea class="form-control mt-2" type="textarea" placeholder="Synopsis" bind:value={fields.synopsis} rows="5" />
    <input
        bind:value={fields.imageUrl}
        class="form-control mt-2"
        type="text"
        placeholder="Link to Image"
        aria-label="image url"
    />
    <div class="ms-1">
        <Message name="title" />
    </div>

    <div class="text-end mt-4">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
    </div>
</Form>

<button on:click={get_random_movie}>Load Movie</button>
