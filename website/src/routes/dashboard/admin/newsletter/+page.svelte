<script>
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import { newToast } from "$lib/stores";
    import Modal from "$lib/components/Modal.svelte";

    export let form;
    export let data;

    const { subscribers } = data;

    const noUsersToDisplay = 9;
    let subscribersArray = subscribers.slice(0, noUsersToDisplay);
    let searchButton = false;
    let newNewsletterModal = false;
    let isSendingNewNewsletter = false;
    let subscribersChartContainer;
    let searchQuery;
    let newNewsletterFormData = {
        subject: form?.formData?.subject ?? "",
        contents: form?.formData?.contents ?? ""
    };

    $: searchQuery , search();
    $: if(form){
        if(form.type === "sendEmails"){
            newToast(form.success ? "success" : "error", form.message)
        }
        if(form.type === "newMail"){
            newToast(form.success ? "success" : "error", form.message)
        }
    }

    const userProgressionData = {};
    subscribers.forEach(user => {
        const joinDate = user.joinedAt.toISOString().split('T')[0];
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
    let subscribersOptions = {
        ...baseChartStyle,
        series: [
            {
                name: "Subscribers",
                data: cumulativeData
            }
        ],
        title: {
            text: 'Subscribers progression',
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
                text: 'Subscribers'
            },
            min: 0,
            max: Math.max(...cumulativeData.map(d => d.y))
        },
    }

    onMount(() => {
        const subscribersChart = new ApexCharts(subscribersChartContainer, subscribersOptions);
        subscribersChart.render();
    });

    function search() {
        if(!searchQuery) {
            subscribersArray = subscribers.slice(0, noUsersToDisplay);
            return;
        }
        const tolerance = 2;
        const searchWords = searchQuery.toLowerCase().split(' ');
        subscribersArray = subscribers.filter(u => {
            const userWords = u.email.toLowerCase().split(' ');
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
    <title>PCC - Newsletter management</title>
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
        <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div bind:this={subscribersChartContainer} class="w-full"/>
            </div>
            <div class="h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative">
                <h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">
                    Newsletter status
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
                            <input type="text" autocomplete="off" bind:value={searchQuery} name="search" class="border text-sm rounded-lg block w-full p-1.5 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2 mt-1" placeholder="Search users by emails">
                            <button on:click={() => {searchButton = false; searchQuery = "";}} class="absolute top-0 right-0 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-180">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>                                  
                            </button>
                        </div>
                    </div>
                {/if}
                <div class="flex flex-col gap-0 overflow-y-auto overflow-x-hidden">
                    {#each subscribersArray as u}
                        <form action="?/sendEmails" method="POST" class="w-full transition-all text-text-main dark:text-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100 p-2 cursor-pointer rounded-lg hover:px-4 items-center relative group flex flex-row justify-between" use:enhance={(e) => {
                            e.formData.set("email", u.email);
                            return ({ update }) => {
                                update({ reset: false });
                            }
                        }}>
                            {u.email}
                            <div class="switch-wrapper opacity-0 group-hover:opacity-100 transition-all">
                                <input type="checkbox" id="sendEmail-{u.email}" name="sendEmails-{u.email}" checked={u.sendEmails} class="hidden" on:change={(e) => {e.target.closest("form").requestSubmit();}}/>
                                <label for="sendEmail-{u.email}"><span><em></em></span></label>
                            </div>
                        </form>
                    {/each}
                </div>
            </div>
            <div class="h-full flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-lg max-h-[450px] p-4 relative">
                <button class="button-primary" on:click={() => {newNewsletterModal = true;}}>Send new newsletter</button>
            </div>
        </div>
    </div>
</section>

<Modal title="New newsletter mail" bind:status={newNewsletterModal}>

    <form action="?/newMail" method="POST" id="newNewsletterForm" slot="body" class="flex flex-col gap-4" use:enhance={() => {
        isSendingNewNewsletter = true;
        return ({ update }) => {
            isSendingNewNewsletter = false;
            update({ reset: false });}
    }}>
        <p>In email subject and body, you can use use &#123;&#123;email&#125&#125 to insert the user's email</p>
        <p class="font-bold">
            Newsletter subject
            <input type="text" name="subject" id="subject" placeholder="Subject" bind:value={newNewsletterFormData.subject}>
        </p>

        <p class="font-bold">
            Newsletter contents
            <textarea name="contents" id="contents" placeholder="Contents" rows="10" bind:value={newNewsletterFormData.contents}></textarea>
        </p>
    </form>

    <svelte:fragment slot="footer">
        <button class="button-secondary" on:click={() => {newNewsletterModal = false;}}>Cancel</button>
        <button form="newNewsletterForm" class="button-primary" disabled="{newNewsletterFormData.subject.length === 0 || newNewsletterFormData.contents.length === 0}">
            {#if isSendingNewNewsletter}
                <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>
            {:else}
                Send
            {/if}
        </button>
    </svelte:fragment>

</Modal>