<script lang="ts">
    import {eachMonthOfInterval, formatISO, isBefore, addDays} from 'date-fns';
    import Month from './Month.svelte'; 
    import { onMount } from 'svelte';
    import axios from 'axios';

    let startDate: Date;
    let endDate: Date;
    let selectedDates : Map<string, boolean> = new Map();
    

    // The below is stub data which willl eventually be fetched from a DB
    /************************************************/
    startDate = new Date('02 Mar 2020');
    endDate = new Date('26 Mar 2021');
    /************************************************/


    let clickAndDown: boolean = false;

    const months : Date[] = eachMonthOfInterval({start: startDate, end: endDate});

    function setClickAndDownFalse() {
        clickAndDown = false;
    }

    function selectAll() {
        let date:Date = startDate;
        while (isBefore(date, addDays(endDate, 1))) {
            selectedDates.set(formatISO(date), true);
            date = addDays(date, 1);
        }
        selectedDates = selectedDates; //needed for Svelte reactivity
    }

    onMount(async() => {
        const {data} = await axios.get('/api/availability');
        let dates: string[];
        dates = data.dates;
        data.dates.forEach(date => {
            selectedDates.set(date, true);
        });
        selectedDates = selectedDates; //needed for Svelte reactivity
    });

</script>
<div id='calendar' on:mouseup={setClickAndDownFalse} on:mouseleave={setClickAndDownFalse}>
    {#each months as month} 
        <Month {month} {startDate} {endDate} {selectedDates} bind:clickAndDown/>
    {/each}
</div>

<button on:click={selectAll}>Select All</button>

<style>
    button {
        background-color: white;
        margin-left:20px;
        margin-top: 20px;
    }
  
</style>