<script lang="ts">
    import {
        eachMonthOfInterval,
        parseISO,
    } from "date-fns";
    import Month from "./ResultsMonth.svelte";
    import axios from "axios";

    let startDate: Date;
    let endDate: Date;
    let eventName: String;
    let months: Date[] = [];
    export let daysWithFreeNames: Map<string, string[]>;

    const eventId = window.location.pathname.split("/")[2];
    const promise = getStartAndEndDate();


    async function getStartAndEndDate() {
        const data = axios.get("/api/event/" + eventId)
        .then((response) => {
                startDate = parseISO(response.data[0].start_date);
                endDate = parseISO(response.data[0].end_date);
                eventName = response.data[0].event_name;
                months = eachMonthOfInterval({start: startDate, end: endDate});
        })
        .catch((error) => {
            console.log(error);                
            window.location.href = "/";
        });
    };

</script>


{#await promise then none}
    <div>
        <h1>Who's Free for {eventName}</h1>

        <div id="calendar">
            {#each months as month}
                <Month
                    {month}
                    {startDate}
                    {endDate}
                    {daysWithFreeNames}
                />
            {/each}
        </div>
    </div>
{/await}

<style>
    h1 {
        text-align: center;
    }
</style>
