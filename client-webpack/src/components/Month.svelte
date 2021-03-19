<script lang="ts">
    import {format, addDays, startOfWeek, endOfMonth, eachWeekOfInterval} from "date-fns";
    import Day from "./Day.svelte";

    export let month: Date;
    export let clickAndDown: boolean;
    export let startDate : Date; 
    export let endDate : Date; 
    export let selectedDates : Map<number, boolean>;


    const dayOfWeekFormat: string = "E";
    const firstDayOfWeek: Date = startOfWeek(month, { weekStartsOn: 1 });
    const weeks: Date[] = eachWeekOfInterval({start: month, end: endOfMonth(month)}, { weekStartsOn: 1});

</script>

<h2>{format(month,'MMMM Y')}</h2>

<table id="month">
    <tr>
        {#each { length: 7 } as _, i}
            <th>
                {format(addDays(firstDayOfWeek, i), dayOfWeekFormat)}
            </th>
        {/each}
    </tr>

    {#each weeks as week} 
        <tr>
            {#each { length: 7 } as _, i}
                <Day {month} {startDate} {endDate} {selectedDates} day={addDays(week, i)} bind:clickAndDown/>
            {/each}
        </tr>
    {/each}

</table>

<style>
    table{
        margin:auto;
        table-layout:fixed;
        width:300px;
    }
    @media (max-width: 500px) {
        table{
            width:90%;
        }
    }   
    th {
        height:20px;
    }
    h2 {
        margin-bottom:0px;
        margin-top:30px;
        margin-left:20px;
    }
    tr {
        height:40px;
    } 
</style>
