<script>
    import { newToast } from "$lib/stores";

    export let data;

    const { user, users } = data;
    let isSaving = false;

    function save(uuid) {
        isSaving = true;
        const userCard = document.querySelector(`[data-user-id="${uuid}"]`);
        const username = userCard.querySelector(`[name="username"]`).value;
        const email = userCard.querySelector(`[name="email"]`).value;
        const isPremium = userCard.querySelector(`[name="isPremium"]`).value;
        const isAdmin = userCard.querySelector(`[name="isAdmin"]`).value;
        console.log(isPremium, !!isPremium, !isPremium, Boolean(isPremium));
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
</script>

<svelte:head>
    <title>PCC - Dashboard</title>
</svelte:head>

<section class="grow w-full py-8 px-4 lg:py-16 lg:px-6 space-y-6">
    <div class="rounded-lg max-w-lg mx-auto border-neutral-200 border flex flex-col gap-2 md:p-10 p-6 h-fit">
        <h3>Welcome {user.username}</h3>
    
        <p>Current plan : <span class="font-semibold">{ user.isPremium ? "Premium" : "Basic" }</span></p>
    
        <a href="/log-out" class="button-red">Log-out</a>
    </div>

    <div class="max-w-screen-lg mx-auto flex flex-col gap-2 h-fit">
        <h3>Users</h3>
        <div class="grid" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
            {#each users as u}
                <div class="p-2 border-neutral-200 border rounded-lg flex flex-col gap-4" data-user-id="{u.id}">
                    <label for="username">
                        Username :
                        <input type="text" name="username" value="{u.username}" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2">
                    </label>
                    <label for="email">
                        E-mail :
                        <input type="text" name="email" value="{u.email}" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2">
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
    </div>
</section>