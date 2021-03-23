<script lang="ts">
    import axios from "axios";
    import {formatISO, parseISO} from "date-fns";
    import Calendar from './ResultsCalendar.svelte';
    const eventId = window.location.pathname.split("/")[2];
    let daysWithFreeNames: Map<string, string[]> = new Map();
    const promise = getAvailabilities();

    async function getAvailabilities() {
        axios.get("/api/availability/" + eventId)
        .then((response) => {
            if (Object.keys(response.data).length === 0) {
                throw Error("No availabilities");
            }
           
            convertAvailabilitiesIntoDays(response.data);
            
        })
        .catch((error) => {
                console.log(error);
                window.location.href = "/";
        });
    };

    async function convertAvailabilitiesIntoDays (availabilities) {
        availabilities.forEach(availability => {
            availability.dates.forEach(date => {
                if (daysWithFreeNames.has(date)) {
                    let currentNames = daysWithFreeNames.get(date);
                    currentNames.push(availability.name);
                    daysWithFreeNames.set(date, currentNames);
                }
                else {
                    daysWithFreeNames.set(date, [availability.name]);
                }
                    
            });
        });
        daysWithFreeNames = daysWithFreeNames;
    }

</script>

{#await promise then none}
    <Calendar {daysWithFreeNames}/>
{/await}
<style>
</style>
