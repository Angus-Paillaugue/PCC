<script>
    import { newToast } from "$lib/stores";

    export let data;

    const { user, users } = data;
    let usersArray = users;
    let isSaving = false;
    let searchQuery;

    $: searchQuery , search();

    function save(uuid) {
        isSaving = true;
        const userCard = document.querySelector(`[data-user-id="${uuid}"]`);
        const username = userCard.querySelector(`[name="username"]`).value;
        const email = userCard.querySelector(`[name="email"]`).value;
        const isPremium = userCard.querySelector(`[name="isPremium"]`).value == "true" ? true : false;
        const isAdmin = userCard.querySelector(`[name="isAdmin"]`).value == "true" ? true : false;
        const userData = { id:uuid, username, email, isPremium, isAdmin };

        fetch(`/api/updateUser`, { method: "PATCH", body: JSON.stringify(userData) })
        .then(res => res.json()).then(res => {
            newToast("success", res.message);
        }).catch(err => {
            newToast("error", err);
        }).finally(() => {
            isSaving = false;
        });
    }

    function search() {
        if(!searchQuery) {
            usersArray = users;
            return;
        }
        const tolerance = 2;
        const searchWords = searchQuery.toLowerCase().split(' ');
        usersArray = users.filter(u => {
            const userWords = `${u.username} ${u.email}`.toLowerCase().split(' ');
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
                                if (distance > tolerance) {
                                    break;
                                }
                            }
                        }
                        if (distance <= tolerance) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    return false;
                }
            }
            return true;
        });
    }
</script>

<svelte:head>
    <title>PCC - Dashboard</title>
</svelte:head>

<section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6">
    <div class="rounded-lg max-w-lg mx-auto border-neutral-200 border flex flex-col gap-2 md:p-10 p-6 h-fit">
        <h3>Welcome {user.username}</h3>
    
        <p>
            Current plan : 
            <span class="font-semibold">{ user.isPremium ? "Premium" : "Basic" }</span>
            {#if !user.isPremium}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-4 inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <a href="/payment" class="link">Upgrade</a>
            {/if}
        </p>
    
        <a href="/log-out" class="button-red">Log-out</a>
    </div>

    <div class="max-w-screen-lg mx-auto flex flex-col gap-2 h-fit p-4 rounded-md border border-nautral-200">
        <h3>Users</h3>
        <label for="search">
            Search :
            <input type="text" autocomplete="off" bind:value={searchQuery} name="search" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2 mt-1" placeholder="Search for users by any criteria">
        </label>
        {#if usersArray.length > 0}
            
            <div class="grid mt-2" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                {#each usersArray as u}
                    <div class="p-2 border-neutral-200 border rounded-lg flex flex-col gap-4" data-user-id="{u.id}">
                        <label for="username">
                            Username :
                            <input type="text" autocomplete="off" name="username" value="{u.username}" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2">
                        </label>
                        <label for="email">
                            E-mail :
                            <input type="text" autocomplete="off" name="email" value="{u.email}" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2">
                        </label>

                        <label for="isPremium">
                            Premium :
                            <select name="isPremium" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2">
                                <option value="true" selected="{u.isPremium}">Yes</option>
                                <option value="false" selected="{!u.isPremium}">No</option>
                            </select>
                        </label>

                        <label for="isAdmin">
                            Admin :
                            <select name="isAdmin" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2">
                                <option value="true" selected="{u.isAdmin}">Yes</option>
                                <option value="false" selected="{!u.isAdmin}">No</option>
                            </select>
                        </label>

                        <button class="button-primary button-small" on:click={() => {save(u.id)}}>
                            {#if isSaving}
                                <svg fill='none' class="w-6 h-6 animate-spin mx-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>
                            {:else}
                                Save
                            {/if}
                        </button>
                    </div>
                {/each}
            </div>
        {:else}
            <h4 class="mt-2">No users found</h4>
        {/if}
    </div>
</section>