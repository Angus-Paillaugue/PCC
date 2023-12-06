<script>
    import { newToast } from "$lib/stores";
    import { copy } from 'svelte-copy';
    import Modal from "$lib/components/Modal.svelte";
    import Card from "$lib/components/Card.svelte";
    import TextInput from "$lib/components/Form/TextInput.svelte";
    import Select from "$lib/components/Form/Select.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";
    import Spinner from "$lib/components/Form/Spinner.svelte";
    import Icon from '@iconify/svelte';
    import Button from "$lib/components/Button.svelte";

    export let data;

    let { user, users, ratesUpdatedAt, credentials } = data;
    let noUsersToDisplay = 12;
    let usersArray = users.slice(0, noUsersToDisplay);
    let isSaving = false;
    let deleteAccountModal = false;
    let isUpdatingRates = false;
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
            newToast(res.error ? "error" : "success", res.error ? res.error : res.message);
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
            search();
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
    }

    function updateRates() {
        isUpdatingRates = true;
        fetch(`/api/update-exchange-rates`, { method: "POST" })
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                ratesUpdatedAt = new Date();
                newToast("success", res.message);
            }else {
                newToast("error", res.message);
            }
            isUpdatingRates = false;
        });
    }
</script>

<svelte:head>
    <title>PCC - Admin dashboard</title>
    <meta name="description" content="PCC admin dashboard">
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

<section class="grow w-full p-4 lg:p-6 space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 max-w-screen-2xl mx-auto">
        <Card class="md:row-span-2">
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
                
            <div class="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                <a href="/dashboard/admin/charts" class="card-button">
                    <Icon icon="heroicons:chart-bar-solid" class="w-6 h-6" />
                    Charts
                </a>
                <a href="/dashboard/admin/newsletter" class="card-button">
                    <Icon icon="heroicons:envelope-solid" class="w-6 h-6" />
                    Newsletter
                </a>
                <a href="/dashboard/settings" class="card-button">
                    <Icon icon="heroicons:cog-6-tooth-solid" class="w-6 h-6" />
                    Settings
                </a>
                <a href="/log-out" class="card-button">
                    <Icon icon="carbon:logout" class="w-6 h-6" />
                    Log-out
                </a>
            </div>
        </Card>
        <Card>
            <h3>Rates</h3>
    
            <p>Last updated {new Date(ratesUpdatedAt).toLocaleString("fr-FR")}</p>
    
            <Button buttonType="button" color="primary" class="mt-auto" disabled={isUpdatingRates} on:click={updateRates}>
                {#if isUpdatingRates}
                    Updating rates
                    <Spinner />
                {:else}
                    Update rates
                {/if}
            </Button>
        </Card>
        <Card class="md:col-span-2">
            <h3>Accounts infos</h3>
    
            {#each credentials as credential}
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
                    <span class="text-center">{credential.type} : {credential.username}</span>
                    <button class="no-scale text-center" use:copy={credential.showPassword ? credential.password : ""} on:click={() => {
                        if(credential.showPassword){
                            newToast("success", "Copied to clipboard successfully !");
                            credential.showPassword = false;
                        }else {
                            credentials.map(el => el.showPassword = false);
                            credential.showPassword = true;
                        }
                    }}>{credential.showPassword ? credential.password : "******************"}</button>
                </div>
            {/each}
    
            <h3 class="mt-4">Tools</h3>
            <div class="flex flex-row gap-4 flex-wrap">
                <Tooltip text="Log-in with send.email.pcc@gmail.com google account">
                    <a href="https://app.brevo.com/" target="_blank" class="link">SMTP</a>
                </Tooltip>
                <Tooltip text="Log-in with pandabuycurrencyconverter@gmail.com google account">
                    <a href="https://my.stripo.email/account/templates/1068358" target="_blank" class="link">E-mail templates</a>
                </Tooltip>
                <a href="https://vercel.com/angus-paillaugue/pcc" target="_blank" class="link">Vercel</a>
                <Tooltip text="Log-in with pandabuycurrencyconverter@gmail.com google account">
                    <a href="https://cloud.mongodb.com/v2/65663cc0b387d24672b14a2e#/clusters" target="_blank" class="link">MongoDB</a>
                </Tooltip>
                <a href="https://dash.cloudflare.com/92f5796f7fdf0c37529d5c39b8670c8f/paillaugue.fr" target="_blank" class="link">Cloudflare</a>
                <a href="https://analytics.google.com/analytics/web/?authuser=0#/p414534698/reports/intelligenthome" target="_blank" class="link">Analytics</a>
                <a href="https://insights.hotjar.com/sites/3748048/overview" target="_blank" class="link">Hotjar</a>
                <Tooltip text="Log-in with send.email.pcc@gmail.com google account">
                    <a href="https://mail.google.com/mail/u/4/#inbox" target="_blank" class="link">Mail box</a>
                </Tooltip>
            </div>
        </Card>
    </div>

    <Card class="max-w-screen-2xl mx-auto">
        <h3>Users ({usersArray.length})</h3>
        <h6>Search :</h6>
        <div class="flex flex-col sm:flex-row gap-4 mt-1 w-full">
            <TextInput type="text" autocomplete="off" bind:value={searchQuery} name="search" placeholder="Search users by usernames or emails" class="w-full" />
            <Select bind:value={searchQueryPremium} class="w-40">
                <option value="*">Premium : *</option>
                <option value="true">Premium : true</option>
                <option value="false">Premium : false</option>
            </Select>
        </div>
        
        {#if usersArray.length > 0}
            
            <div class="grid mt-2 gap-4" style="grid-template-rows: min-content; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                {#each usersArray.slice(0, noUsersToDisplay) as u}
                    <div class="p-2 shadow-sm dark:shadow-none dark:border dark:border-neutral-700 rounded-lg flex flex-col gap-4" data-user-id="{u.id}">
                        <TextInput type="text" autocomplete="off" label="Username :" placeholder="Username" name="username" value="{u.username}" />
                        <TextInput type="email" autocomplete="off" label="E-mail :" placeholder="E-mail" name="email" value="{u.email}" />
    
                        <Select label="Premium :" name="isPremium" class="w-full">
                            <option value="true" selected="{u.isPremium}">Yes</option>
                            <option value="false" selected="{!u.isPremium}">No</option>
                        </Select>
    
                        <Select label="Admin :" name="isAdmin" class="w-full">
                            <option value="true" selected="{u.isAdmin}">Yes</option>
                            <option value="false" selected="{!u.isAdmin}">No</option>
                        </Select>
    
                        <p class="text-sm">Joined on : {new Date(u.joined).toLocaleString("fr-FR")}</p>
    
                        <Button buttonType="button" color="red" size="small" on:click={() => {deleteAccountId = u.id; deleteAccountModal = true;}}>Delete account</Button>
    
                        <Button size="small" buttonType="button" color="primary" on:click={() => {save(u.id);isSavingUuid = u.id;}}>
                            {#if isSaving && isSavingUuid === u.id}
                                <Spinner />
                            {:else}
                                Save
                            {/if}
                        </Button>
                    </div>
                {/each}
            </div>
            {#if noUsersToDisplay < usersArray.length}
                <Button buttonType="button" color="secondary" size="small" animationTo="left" icon="heroicons:plus" class="mx-auto mt-4" on:click={() => {noUsersToDisplay += 12;}}>
                    Load more
                </Button>
            {/if}
        {:else}
            <h4 class="mt-2">No users found</h4>
        {/if}
    </Card>
</section>

<Modal title="Delete account" bind:status={deleteAccountModal}>

    <p slot="body">Are you sure you want to delete {deleteAccountId ? users?.filter(el => el.id === deleteAccountId)[0].username : ""}'s account ?</p>

    <svelte:fragment slot="footer">
        <Button buttonType="button" color="red" on:click={() => {deleteAccountModal = false;}}>No, cancel</Button>
        <Button buttonType="button" color="primary" on:click={deleteAccount}>Yes, delete</Button>
    </svelte:fragment>
</Modal>