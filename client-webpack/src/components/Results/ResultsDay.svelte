<script lang="ts">
    import { isSameMonth, format, isWithinInterval, formatISO } from "date-fns";

    export let day: Date;
    export let month: Date;
    export let startDate: Date;
    export let endDate: Date;
    export let daysWithFreeNames: Map<string, string[]>;
    let freePeople:string[] = [];

    const dayFormat: string = "d";

    $: if (daysWithFreeNames.has(formatISO(day, { representation: 'date' }))) {
        freePeople = daysWithFreeNames.get(formatISO(day, { representation: 'date' }));
    }

    
</script>

{#if isSameMonth(day, month)}
    {#if isWithinInterval(day, { start: startDate, end: endDate })}
        <td>
            {format(day, dayFormat)}
            {#if freePeople.length > 0} 
                <div class="num-free-people">
                    {freePeople.length}
                </div>
            {/if}
        </td>
    {:else}
        <td class="disabled">
            {format(day, dayFormat)}
        </td>
    {/if}
{:else}
    <td class="no-day"></td>
{/if}

<style>
  

    .no-day {
        pointer-events: none;
        border: none !important;
    }

    .disabled {
        color: gray;
        border: 1px solid gray;
    }

    td:not(.hidden) {
        user-select: none;
        text-align: center;
    }

    td:not(.hidden):not(.disabled) {
        border: 1px solid black;
    }

    td{
        height:100px;
    }

    .num-free-people {
        color:grey;
    }

</style>
