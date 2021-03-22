<script lang="ts">
    import axios from "axios";
    const eventId = window.location.pathname.split("/")[2];
    let availailabilities = [];
    const promise1 = getAvailabilities();

    async function getAvailabilities() {
        axios.get("/api/availability/" + eventId)
        .then((response) => {
            if (Object.keys(response.data).length === 0) {
                throw Error("No availabilities");
            }
            else {
                availailabilities = response.data;
            }
        })
        .catch((error) => {
                console.log(error);
                window.location.href = "/";
        });
    };
</script>

<p>gonna add results here</p>

{#await promise1 then none}
    {#each availailabilities as availability}
        {JSON.stringify(availability)}
    {/each}
{/await}
<style>
</style>
