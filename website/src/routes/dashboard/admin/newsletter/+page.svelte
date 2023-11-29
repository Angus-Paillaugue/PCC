<script>
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import { newToast } from "$lib/stores";
    import Modal from "$lib/components/Modal.svelte";
    import Card from "$lib/components/Card.svelte";
    import TextInput from "$lib/components/Form/TextInput.svelte";
    import Textarea from "$lib/components/Form/Textarea.svelte";
    import Icon from '@iconify/svelte';
    import Spinner from "$lib/components/Form/Spinner.svelte";

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
            newToast(form.success ? "success" : "error", form.message);
        }
        if(form.type === "newMail"){
            newToast(form.success ? "success" : "error", form.message);
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
            <Icon icon="heroicons:arrow-uturn-left" class="w-6 h-6 transition-all group-hover:rotate-[360deg] duration-300" />
            Go back
        </a>
        <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card class="md:col-span-2">
                <div bind:this={subscribersChartContainer} class="w-full"/>
            </Card>
            <Card class="relative">
                <h5 class="w-full border-b border-neutral-200 dark:border-neutral-700 flex flex-row p-2 items-center justify-between">
                    Newsletter status
                    <button on:click={() => {searchButton = !searchButton;}} class="w-fit button-secondary button-small">
                        <Icon icon="heroicons:magnifying-glass" class="w-4 h-4" />
                    </button>
                </h5>
                <div class="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-2.5 absolute top-0 left-0 right-0 transition-all {searchButton ? "z-10 opacity-100" : "-z-10 opacity-0"}">
                    <TextInput label="Search" type="text" placeholder="Search users by usernames" name="search" bind:value={searchQuery} />
                    <button type="button" on:click={() => {searchButton = false; searchQuery = "";}} class="group absolute top-1 right-1 button-close">
                        <Icon icon="heroicons:x-mark" class="w-6 h-6 transition-all group-hover:rotate-90" />
                    </button>
                </div>
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
            </Card>
            <Card>
                <button class="button-primary" on:click={() => {newNewsletterModal = true;}}>Send new newsletter</button>
            </Card>
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
        <TextInput label="Email subject" type="text" placeholder="Subject" name="subject" id="subject" bind:value={newNewsletterFormData.subject} />
        
        <Textarea label="Newsletter contents" rows="10" placeholder="Contents" name="contents" id="contents" bind:value={newNewsletterFormData.contents} />
    </form>

    <svelte:fragment slot="footer">
        <button class="button-secondary" on:click={() => {newNewsletterModal = false;}}>Cancel</button>
        <button form="newNewsletterForm" class="button-primary" disabled="{newNewsletterFormData.subject?.length === 0 || newNewsletterFormData.contents?.length === 0}">
            {#if isSendingNewNewsletter}
                <Spinner />
            {:else}
                Send
            {/if}
        </button>
    </svelte:fragment>

</Modal>