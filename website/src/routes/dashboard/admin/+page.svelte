<script>
    import { newToast } from "$lib/stores";

    export let data;

    let { user, users } = data;
    let noUsersToDisplay = 9;
    let usersArray = users.slice(0, noUsersToDisplay);
    let isSaving = false;
    let deleteAccountModal = false;
    let isSavingUuid;
    let searchQuery;
    let deleteAccountId;
    let searchQueryPremium;

    $: searchQuery, search();
    $: searchQueryPremium, search();

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

    function deleteAccount() {
        fetch(`/api/deleteUser`, { method: "DELETE", body: JSON.stringify({ id:deleteAccountId }) })
        .then(res => res.json()).then(res => {
            newToast("success", res.message);
        }).catch(err => {
            newToast("error", err);
        }).finally(() => {
            users = users.filter(el => el.id !== deleteAccountId);
            deleteAccountModal = false;
            deleteAccountId = undefined;
        });
    }

    function search() {
        if(!searchQuery) searchQuery = "";
        if(!searchQueryPremium) searchQueryPremium = "*";
        const tolerance = 2;
        const searchWords = searchQuery.toLowerCase().split(' ');
        usersArray = users.filter(u => searchQueryPremium == "*" ? true : searchQueryPremium == u.isPremium.toString()).filter(u => {
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
        });
        noUsersToDisplay = 9;
    }

    function updateRates() {
        fetch(`/api/update-exchange-rates`, { method: "POST" })
        .then(res => {
            newToast("success", res);
        }).catch(err => {
            newToast("error", err);
        });
    }
</script>

<svelte:head>
    <title>PCC - Admin dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
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
                <a href="/payment" class="link w-fit">Upgrade</a>
            {/if}
        </p>
        <a href="/dashboard/admin/charts" class="link w-fit">Charts</a>

        <button class="button-primary" on:click={updateRates}>Update rates</button>
    
        <a href="/log-out" class="button-red">Log-out</a>
    </div>

    <div class="max-w-screen-lg mx-auto flex flex-col gap-2 h-fit p-4 rounded-lg border border-nautral-200">
        <h3>Users ({usersArray.length})</h3>
        <label for="search">
            Search :
            <div class="flex flex-col sm:flex-row gap-4 mt-1">
                <input type="text" autocomplete="off" bind:value={searchQuery} name="search" placeholder="Search users by usernames or emails">
                <div class="relative">
                    <select bind:value={searchQueryPremium} class="appearance-none peer w-full sm:w-fit pr-6">
                        <option value="*">Premium : *</option>
                        <option value="true">Premium : true</option>
                        <option value="false">Premium : false</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </label>
        
        {#if usersArray.length > 0}
            
            <div class="grid mt-2 gap-4" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                {#each usersArray.slice(0, noUsersToDisplay) as u}
                    <div class="p-2 shadow-sm rounded-lg flex flex-col gap-4" data-user-id="{u.id}">
                        <label for="username">
                            Username :
                            <input type="text" autocomplete="off" name="username" value="{u.username}" >
                        </label>
                        <label for="email">
                            E-mail :
                            <input type="text" autocomplete="off" name="email" value="{u.email}">
                        </label>

                        <label for="isPremium">
                            Premium :
                            <div class="relative">
                                <select name="isPremium" class="appearance-none peer">
                                    <option value="true" selected="{u.isPremium}">Yes</option>
                                    <option value="false" selected="{!u.isPremium}">No</option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </label>

                        <label for="isAdmin">
                            Admin :
                            <div class="relative">
                                <select name="isAdmin" class="appearance-none peer">
                                    <option value="true" selected="{u.isAdmin}">Yes</option>
                                    <option value="false" selected="{!u.isAdmin}">No</option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 transition-all peer-focus:rotate-180 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </label>

                        <p class="text-sm">Joined on : {new Date(u.joined).toLocaleString()}</p>

                        <button class="button-red button-small" on:click={() => {deleteAccountId = u.id; deleteAccountModal = true;}}>Delete account</button>

                        <button class="button-primary button-small" on:click={() => {save(u.id);isSavingUuid = u.id;}}>
                            {#if isSaving && isSavingUuid === u.id}
                                <svg fill='none' class="w-6 h-6 animate-spin mx-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>
                            {:else}
                                Save
                            {/if}
                        </button>
                    </div>
                {/each}
            </div>
            {#if noUsersToDisplay < usersArray.length}
                <button class="button-secondary mx-auto w-fit hover:gap-4 button-small" on:click={() => {noUsersToDisplay += 9;}}>
                    Load more
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            {/if}
        {:else}
            <h4 class="mt-2">No users found</h4>
        {/if}
    </div>
</section>

<div class="fixed inset-0 bg-neutral-600/50 flex justify-center items-center tranition-all { deleteAccountModal ? "z-50 opacity-100" : "-z-10 opacity-0" }">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-4">
        <h3>Delete account</h3>
        <p>Are you sure you want to delete {deleteAccountId ? users?.filter(el => el.id === deleteAccountId)[0].username : ""}'s account ?</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button class="button-red" on:click={() => {deleteAccountModal = false;}}>No, cancel</button>
            <button class="button-primary" on:click={deleteAccount}>Yes, delete</button>
        </div>
    </div>
</div>