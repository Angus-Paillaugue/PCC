<script>
    import { onMount } from "svelte";

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
    const earliestDate = Math.min(...joinDates.map(date => new Date(date)));
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
        console.log("Start :",data.at(-1)," End :",data.at(-nbDays));
        return Math.round((data.at(-nbDays)-data.at(-1))/data.at(-1)*100);
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
    <title>PCC - Admin dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

<section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6">

    <div class="max-w-screen-lg mx-auto flex flex-col gap-6">

        <a href="../" class="button-secondary w-fit button-small group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Go back
        </a>
        <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="md:col-span-2 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div class="w-full grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
                    <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center">
                        <h3 class="text-center w-fit">+<span class="text-green-600 dark:text-green-800">{getProgression(1)}</span>% Today</h3>
                    </div>
                    <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center">
                        <h3 class="text-center w-fit">+<span class="text-green-600 dark:text-green-800">{getProgression(7)}</span>% Last 7 days</h3>
                    </div>
                    <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 flex flex-row items-center justify-center">
                        <h3 class="text-center w-fit">+<span class="text-green-600 dark:text-green-800">{getProgression(30)}</span>% Last 30 days</h3>
                    </div>
                </div>
                <div bind:this={usersChartContainer} class="w-full"/>
            </div>
            <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div bind:this={premiumChartContainer} class=""/>
            </div>
            <div class="h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative">
                <h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">
                    Premium users
                    <button on:click={() => {searchButton = !searchButton;}} class="w-fit button-secondary button-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </h5>
                {#if searchButton}
                    <div class="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2 absolute top-0 left-0 right-0">
                        <div class="relative w-full h-full text-sm text-text-main dark:text-neutral-100">
                            Search :
                            <input type="text" autocomplete="off" bind:value={searchQuery} name="search" class="border text-sm rounded-lg block w-full p-1.5 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2 mt-1" placeholder="Search users by usernames">
                            <button on:click={() => {searchButton = false; searchQuery = "";}} class="absolute top-0 right-0 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-180">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>                                  
                            </button>
                        </div>
                    </div>
                {/if}
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
            </div>
        </div>
    </div>

</section>