<script>
  import { Route, router } from "tinro";
  import { onMount } from "svelte";

  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { _state } from "../code/state.js";
  import { makeId } from "../code/makeId.js";
  import { setBodyClasses } from "/imports/code/setBodyClasses.js";

  import Modal from "/imports/ui/Modal/Modal.svelte";
  import Login from "/imports/ui/User/Login.svelte";
  import Account from "./Account/Account.svelte";
  import NavBar from "./NavBar/NavBar.svelte";
  import SideBar from "./SideBar/SideBar.svelte";
  import Script from "./Script/Script.svelte";
  import Scripts from "./Scripts/Scripts.svelte";
  import State from "./State.svelte";
  import "animate.css";
  import BottomBar from "./BottomBar/BottomBar.svelte";

  onMount(() => {
    $_state.sessionId = makeId();
    setBodyClasses();
  });

  const _currentUser = useTracker(() => Meteor.user());

  // $: console.log($_currentUser);
</script>

<Modal {_state} />

{#if $_currentUser}
  <Route path="/script/:sid" let:meta>
    <div>
      <div id="sidebar-wrapper"><SideBar {_state} {meta} /></div>
      <div id="main" class="d-flex flex-column">
        <NavBar {_state} {meta} {_currentUser} />

        <Script scriptId={meta.params.sid} {_state} />
      </div>
    </div>
  </Route>

  <Route let:meta>
    {#if meta.url == "/scripts" || meta.url == "/"}
      <div id="" class="d-flex flex-column">
        <NavBar {_state} {meta} {_currentUser} />
        <Scripts {_state} {meta} />
      </div>
    {/if}
  </Route>
{/if}

{#if !$_currentUser}
  <Route let:meta>
    <div id="" class="d-flex flex-column">
      <Account {_state} {meta} />
    </div>
  </Route>
{/if}

<style>
  #sidebar-wrapper {
    width: 350px;
    height: 100vh;
    overflow-y: hidden;
    float: left;
  }

  #main {
    height: 100vh;
    overflow: hidden;
    float: right;
  }
</style>
