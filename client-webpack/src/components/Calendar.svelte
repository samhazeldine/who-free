<script lang="ts">
    import {
        eachMonthOfInterval,
        formatISO,
        isBefore,
        addDays,
        parseISO,
    } from "date-fns";
    import Month from "./Month.svelte";
    import axios from "axios";

    let startDate: Date;
    let endDate: Date;
    let eventName: String;
    let selectedDates: Map<string, boolean> = new Map();
    let clickAndDown: boolean = false;
    let months: Date[] = [];

    async function getStartAndEndDate() {
        let id = window.location.pathname.split("/")[2];
        const data = axios.get("/api/event/" + id).then(
            (response) => {
                startDate = parseISO(response.data[0].start_date);
                console.log(startDate);
                endDate = parseISO(response.data[0].end_date);
                console.log(endDate);
                eventName = response.data[0].event_name;
                console.log(eventName)
                months = eachMonthOfInterval({start: startDate, end: endDate});
                console.dir(months);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const promise = getStartAndEndDate();


    function setClickAndDownFalse() {
        clickAndDown = false;
    }

    function selectAll() {
        let date: Date = startDate;
        while (isBefore(date, addDays(endDate, 1))) {
            selectedDates.set(formatISO(date), true);
            date = addDays(date, 1);
        }
        selectedDates = selectedDates; //needed for Svelte reactivity
    }

</script>

{#await promise then none}
    <div
        id="calendar"
        on:mouseup={setClickAndDownFalse}
        on:mouseleave={setClickAndDownFalse}
    >
        {#each months as month}
            <Month
                {month}
                {startDate}
                {endDate}
                {selectedDates}
                bind:clickAndDown
            />
        {/each}
    </div>

    <button on:click={selectAll}>Select All</button>

{:catch error}
    <p> ERROR </p>
{/await}

<style>
    button {
        background-color: white;
        margin-left: 20px;
        margin-top: 20px;
    }
</style>
