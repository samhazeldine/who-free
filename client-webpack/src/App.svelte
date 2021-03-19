<script lang="ts">
    import Calendar from './components/Calendar.svelte';
    import WelcomeScreen from './components/WelcomeScreen.svelte';
    let eventCreated = false;
    let startDate;
    let endDate;

    function toggleEventCreated(event) {
        eventCreated = true;
    }

</script>

<main>
    {#if eventCreated}
        <Calendar/>
    {:else}
        <WelcomeScreen on:eventCreated={toggleEventCreated}/>
    {/if}
</main>

<style>
  
</style>