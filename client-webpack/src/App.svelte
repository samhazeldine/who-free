<script lang="ts">
    import Calendar from './components/Calendar.svelte';
    import axios from 'axios';
    import {onMount} from 'svelte';

    onMount(async() => {
        const {data} = await axios.get('/api/availability');
    });
</script>

<main>
    <Calendar/>
</main>

<style>
  
</style>