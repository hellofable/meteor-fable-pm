<script>
  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { _state } from "../code/state.js";
  import { makeId } from "../code/makeId.js";

  import Modal from "/imports/ui/Modal/Modal.svelte";
  import Login from "/imports/ui/User/Login.svelte";

  import { Route, router } from "tinro";
  import Script from "./Script/Script.svelte";
  import { onMount } from "svelte";

  import Scripts from "./Scripts/Scripts.svelte";

  onMount(() => {
    $_state.sessionId = makeId();
  });

  const _currentUser = useTracker(() => Meteor.user());

  // $: console.log($_currentUser);
</script>

{#if !$_currentUser}
  <Login {_state} />
{/if}

{#if $_currentUser}
  <Modal {_state} />
  <Route path="/script/:sid" let:meta>
    <a href="/">Home</a>
    <Script scriptId={meta.params.sid} {_state} />
  </Route>

  <Route path="/" let:meta>
    <Scripts {_state} {meta} />
  </Route>
{/if}
