<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import axios from "axios";

    const dispatch = createEventDispatcher();

    let name: string;
    let startDate: string;
    let endDate: string;

    async function createEvent() {
        const data = axios.post("/api/event", {
            event_name: name,
            start_date: startDate,
            end_date: endDate
        })
        .then (
            (response) => {
                window.location.href = "/availability/" + response.data;
            },
            (error) => {
                console.log(error);
            }
        )
    }

</script>

<div class=page>
<h1>Who's Free?</h1>

<form class="pure-form pure-form-stacked"  on:submit|preventDefault={createEvent}>

    <label for="eventName">What are you trying to plan?</label>
    <input
        class="input"
        id="eventName"
        type="text"
        bind:value={name}
        required
    />

    <h3>What dates would you like to see?</h3>

    <label for="startDate">Start Date:</label>
    <input
        type="date"
        name="startDate"
        id="startDate"
        bind:value={startDate}
        required
    />

    <label for="endDate">End Date:</label>
    <input
        type="date"
        name="startDate"
        id="endDate"
        bind:value={endDate}
        required
    />

    
    <button class="pure-button" type="submit">Let's Go!</button>
    
</form>
</div>

<style>
    button{
        margin-top: 10px;
    }
</style>
