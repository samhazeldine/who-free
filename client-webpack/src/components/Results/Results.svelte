<script lang="ts">
    import axios from "axios";
    import Calendar from './ResultsCalendar.svelte';
    const eventId = window.location.pathname.split("/")[2];
    let daysWithFreeNames: Map<String, string[]> = new Map();
    const promise1 = getAvailabilities();
    console.dir(daysWithFreeNames)

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
    }

</script>

{#await promise1 then none}
    <Calendar/>
{/await}
<style>
</style>
