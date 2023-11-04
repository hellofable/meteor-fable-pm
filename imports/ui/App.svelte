<script>
  import { Route, router } from "tinro";
  import { onMount } from "svelte";

  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { _state } from "../code/state.js";
  import { makeId } from "../code/makeId.js";
  import { setBodyClasses } from "/imports/code/setBodyClasses.js";

  import Modal from "/imports/ui/Modal/Modal.svelte";
  import Login from "/imports/ui/User/Login.svelte";
  import NavBar from "./NavBar/NavBar.svelte";
  import SideBar from "./SideBar/SideBar.svelte";
  import Script from "./Script/Script.svelte";
  import Scripts from "./Scripts/Scripts.svelte";
  import State from "./State.svelte";
  import "animate.css";

  onMount(() => {
    $_state.sessionId = makeId();
    setBodyClasses();
  });

  const _currentUser = useTracker(() => Meteor.user());

  // $: console.log($_currentUser);
</script>

<!-- <State {_state} /> -->
{#if !$_currentUser}
  <Login {_state} />
{/if}

{#if $_currentUser}
  <Modal {_state} />
  <Route path="/script/:sid" let:meta>
    <div class="wrap-1 d-flex flex-column vh-100 w-100 overflow-hidden">
      <div class="wrap-2 d-flex flex-grow-1 w-100 overflow-hidden">
        <SideBar {_state} {meta} />
        <div class="w-100 flex-grow-1 wrap-3">
          <NavBar {_state} {meta} {_currentUser} />
          <Script scriptId={meta.params.sid} {_state} />
        </div>
      </div>
    </div>
  </Route>

  <Route path="/" let:meta>
    <NavBar {_state} {meta} {_currentUser} />
    <Scripts {_state} {meta} />
  </Route>
{/if}

<style>
</style>
