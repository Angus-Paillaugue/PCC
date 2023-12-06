<script>
    import { onMount } from "svelte";
    import Card from '$lib/components/Card.svelte';
    import TextInput from "$lib/components/Form/TextInput.svelte";
    import Button from "$lib/components/Button.svelte";
    import CloseButton from "$lib/components/CloseButton.svelte";

    export let data;

    let { users } = data;
    const noUsersToDisplay = 9;
    let usersArray = users.slice(0, noUsersToDisplay);
    let usersChartContainer;
    let premiumChartContainer;
    let searchQuery;
    let searchButton = false;

    $: searchQuery , search();

    const userProgressionData = {};
    users.forEach(user => {
        const joinDate = user.joined.toISOString().split('T')[0];
        userProgressionData[joinDate] = (userProgressionData[joinDate] || 0) + 1;
    });

    // Find the earliest and latest join dates
    const joinDates = Object.keys(userProgressionData);
    const earliestDate = Math.min(...joinDates.filter(date => new Date(date) > new Date(new Date().setDate(new Date().getDate() - 30))).map(date => new Date(date)));
    const latestDate = Math.max(new Date());
    // Generate an array of all dates between the earliest and latest dates
    const allDates = [];
    for (let currentDate = new Date(earliestDate); currentDate <= latestDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const dateString = currentDate.toISOString().split('T')[0];
        allDates.push(dateString);
    }

    // Convert Data to Cumulative Series
    const cumulativeData = [];
    let cumulativeCount = 0;
    allDates.forEach(date => {
        const count = userProgressionData[date] || 0;
        cumulativeCount += count;
        cumulativeData.push({ x: new Date(date).getDate()+"/"+(new Date(date).getMonth()+1), y: cumulativeCount });
    });

    const premiumUsers = users.filter(user => user.isPremium);
    const getProgression = (nbDays) => {
        nbDays = Math.min((nbDays+1), cumulativeData.length);
        const data = cumulativeData.map(d => d.y);
        return Math.round((data.at(-1)-data.at(-nbDays))/data.at(-nbDays)*100);
    }
    
    let baseChartStyle = {
        chart: {
            height: 450,
            type: 'line',
            toolbar: {
                show: false
            }
        },
        colors: ['#0da858'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
    }
    let usersChartOptions = {
        ...baseChartStyle,
        series: [
            {
                name: "Users",
                data: cumulativeData
            }
        ],
        title: {
            text: 'Users progression',
            align: 'left'
        },
        xaxis: {
            categories: Object.keys(userProgressionData),
            title: {
                text: 'Days'
            }
        },
        yaxis: {
            title: {
                text: 'Users'
            },
            min: 0,
            max: Math.max(...cumulativeData.map(d => d.y))
        },
    }
    let premiumUsersChart = {
        series: [premiumUsers.length, users.length - premiumUsers.length],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Premium', 'Free'],
    }

    onMount(() => {
        const usersChart = new ApexCharts(usersChartContainer, usersChartOptions);
        usersChart.render();
        const premiumChart = new ApexCharts(premiumChartContainer, premiumUsersChart);
        premiumChart.render();
    });

    function search() {
        if(!searchQuery) {
            usersArray = premiumUsers.slice(0, noUsersToDisplay);
            return;
        }
        const tolerance = 2;
        const searchWords = searchQuery.toLowerCase().split(' ');
        usersArray = premiumUsers.filter(u => {
            const userWords = u.username.toLowerCase().split(' ');
            for (let i = 0; i < searchWords.length; i++) {
                const searchWord = searchWords[i];
                let found = false;
                for (let j = 0; j < userWords.length; j++) {
                    const userWord = userWords[j];
                    if (userWord.includes(searchWord)) {
                        found = true;
                        break;
                    }
                    if (searchWord.length - userWord.length <= tolerance) {
                        let distance = 0;
                        for (let k = 0; k < userWord.length; k++) {
                            if (userWord[k] !== searchWord[k]) {
                                distance++;
                                if (distance > tolerance) break;
                            }
                        }
                        if (distance <= tolerance) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) return false;
            }
            return true;
        }).slice(0, noUsersToDisplay);
    }

</script>

<svelte:head>
    <title>PCC - Admin charts</title>
    <meta name="description" content="PCC Admin charts">
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

<section class="grow w-full p-4 lg:p-6 space-y-6">

    <div class="max-w-screen-lg mx-auto flex flex-col gap-6">

        <Button buttonType="link" href="../" size="small" class="w-fit" color="secondary" iconPosition="left" animationTo="rotate" icon="heroicons:arrow-uturn-left">Go back</Button>
        <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card class="md:col-span-2 overflow-x-auto">
                <div class="w-full grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
                    <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center">
                        <h3 class="text-center w-fit">+<span class="text-green-600">{getProgression(1)}</span>% Today</h3>
                    </div>
                    <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center">
                        <h3 class="text-center w-fit">+<span class="text-green-600">{getProgression(7)}</span>% Last 7 days</h3>
                    </div>
                    <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center">
                        <h3 class="text-center w-fit">+<span class="text-green-600">{getProgression(30)}</span>% Last 30 days</h3>
                    </div>
                </div>
                <div bind:this={usersChartContainer} class="w-full"/>
            </Card>
            <Card class="overflow-x-auto">
                <div bind:this={premiumChartContainer} class=""/>
            </Card>
            <Card class="relative">
                <h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">
                    Premium users
                    <Button buttonType="button" color="secondary" size="small" icon="heroicons:magnifying-glass" on:click={() => {searchButton = !searchButton;}}></Button>
                </h5>
                <div class="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2.5 absolute top-0 left-0 right-0 transition-all {searchButton ? "z-10 opacity-100" : "-z-10 opacity-0"}">
                    <TextInput label="Search" type="text" placeholder="Search users by usernames" name="search" bind:value={searchQuery} />
                    <CloseButton on:click={() => {searchButton = false; searchQuery = "";}} class="absolute top-1 right-1" />
                </div>
                <div class="flex flex-col gap-0 overflow-y-auto overflow-x-hidden">
                    {#each usersArray as u}
                        <div class="w-full transition-all text-text-main dark:text-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100 p-2 cursor-pointer rounded-lg hover:px-4 relative group flex flex-row justify-between">
                            {u.username}
                            <div class="opacity-0 group-hover:opacity-100 transition-all">
                                {u.email}
                            </div>
                        </div>
                    {/each}
                </div>
            </Card>
        </div>
    </div>

</section>