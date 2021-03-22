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
    import { fade } from 'svelte/transition';


    let startDate: Date;
    let endDate: Date;
    let eventName: String;
    let selectedDates: Map<string, boolean> = new Map();
    let clickAndDown: boolean = false;
    let months: Date[] = [];
    let isNameEntered = false;
    let name: string;
    const eventId = window.location.pathname.split("/")[2];


    async function getStartAndEndDate() {
        const data = axios.get("/api/event/" + eventId)
        .then((response) => {
                startDate = parseISO(response.data[0].start_date);
                endDate = parseISO(response.data[0].end_date);
                eventName = response.data[0].event_name;
                months = eachMonthOfInterval({start: startDate, end: endDate});
        })
        .catch((error) => {
                //If the system cannot find the Event, just go to the homepage, no need to error
                window.location.href = "/";
        });
    };

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

    const promise = getStartAndEndDate();

    function submitName() {
        isNameEntered = true;
    }

    async function submitAvailability() {
        axios.post("/api/availability", {
            name: name,
            dates: Array.from(selectedDates.keys()),
            event_id: eventId
        })
        .then (
            (response) => {
                window.location.href = "/results/" + eventId;
            },
            (error) => {
                console.log(error);
            }
        )
    }

    function handleDayToggled (event) {
        if (event.detail.selected === false) {
            selectedDates.delete(event.detail.day);
        }
        else {
            selectedDates.set(event.detail.day, true);
        }
    }

</script>

{#if isNameEntered}

    {#await promise then none}
        <div transition:fade>
            <h1>Select when you're free for {eventName}</h1>
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
                        on:dayToggled={handleDayToggled}
                        bind:clickAndDown
                    />
                {/each}
            </div>

            <button class="pure-button" on:click={selectAll}>Select All</button>
            <button id="button__submit" class="pure-button" on:click={submitAvailability}>Submit</button>

        </div>
    {/await}
{:else} 
    <h1>Who's Free for {eventName}?</h1>

    <form class="pure-form pure-form-stacked" on:submit|preventDefault={submitName}>
        <div>
            <label for="name">What's your name?</label>
            <input type="text" name="name" required bind:value="{name}">
        </div>
        <button class="pure-button" type="submit">Next</button>
    </form>

{/if}

<style>
    button {
        background-color: white;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    #button__submit {
        float:right;
        margin-right: 20px;
    }
</style>
