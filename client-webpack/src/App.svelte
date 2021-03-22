<script lang="ts">
    import Calendar from './components/Calendar.svelte';
    import WelcomeScreen from './components/WelcomeScreen.svelte';
    import router from 'page';
    let page = 'Home';

    router('/', () => (page = 'Home'));
    router('/availability', () => (page = 'Home'));
    router('/availability/:id', () => (page = 'Availability'));
    router.start();
    

</script>

<main>
    
    {#if page === 'Home'}
        <WelcomeScreen/>
    {:else}
        <Calendar/>
    {/if}
    
</main>

<style>
  
</style>