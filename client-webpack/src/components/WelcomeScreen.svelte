<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    let name:string;
    let startDate:string;
    let endDate:string;
    
    async function eventCreated() {
        dispatch('eventCreated', {
            name: name,
            startDate: startDate,
            endDate: endDate
        });
    }
</script>


<h1>Who Free?</h1>

<form on:submit|preventDefault="{eventCreated}">
    <label for="eventName">What are you trying to plan?</label>
    <input class="input" id="eventName" type="text" bind:value={name} required>

    <p>What dates would you like to see?</p>

    <label for="startDate">Start Date:</label>
    <input type="date" name="startDate" id="startDate" bind:value={startDate} required>

    <label for="endDate">End Date:</label>
    <input type="date" name="startDate" id="endDate" bind:value={endDate} required>

    <div>
        <button type="submit">Let's Go!</button>
    </div>
</form>


<style>
  
</style>