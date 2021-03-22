<script lang="ts">
    import Calendar from './components/Calendar.svelte';
    import WelcomeScreen from './components/WelcomeScreen.svelte';
    import Results from './components/Results.svelte';
    import router from 'page';
    let page = 'Home';

    router('/', () => (page = 'Home'));
    //The two below ensure home is given if the string doesn't match
    router('/availability', () => (page = 'Home'));
    router('/results', () => (page = 'Home'));
    router('/availability/:id', () => (page = 'Availability'));
    router('/results/:id', () => (page = 'Results'));
    router.start();
    

</script>

<main>
    
    {#if page === 'Home'}
        <WelcomeScreen/>
    {:else if page === 'Availability'}
        <Calendar/>
    {:else if page === 'Results'}
        <Results/>
    {/if}
    
</main>

<style>
  
</style>