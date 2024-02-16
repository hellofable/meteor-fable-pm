<script>
  import { Route, router } from "tinro";
  import { onMount } from "svelte";

  import { useTracker } from "meteor/rdb:svelte-meteor-data";
  import { _state } from "../code/state.js";
  import { makeId } from "../code/makeId.js";
  import { setBodyClasses } from "/imports/code/setBodyClasses.js";
  import { setGlobalSettings } from "/imports/code/setGlobalSettings.js";

  import Modal from "/imports/ui/Modal/Modal.svelte";
  import Login from "/imports/ui/User/Login.svelte";
  import Account from "./Account/Account.svelte";
  import NavBar from "./NavBar/NavBar.svelte";
  import SideBar from "./SideBar/SideBar.svelte";
  import State from "./State.svelte";
  import Projects from "./Projects/Projects.svelte";
  import BottomBar from "./BottomBar/BottomBar.svelte";
  import { Meteor } from "meteor/meteor";
  import Project from "./Project/Project.svelte";

  onMount(() => {
    $_state.sessionId = makeId();
    setBodyClasses();
    setGlobalSettings();
  });

  let setSettings = false;
  const _currentUser = useTracker(function () {
    return Meteor.user();
  });
</script>

<Modal {_state} />

<Route path="/project/:pid/*" let:meta>
  <Project {_state} {meta} />
</Route>

<Route path="/projects" let:meta>
  <Projects {_state} {meta} />
</Route>
