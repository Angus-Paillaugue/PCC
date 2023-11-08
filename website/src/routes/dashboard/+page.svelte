<script>
    export let data;

    const { user } = data;
</script>

<svelte:head>
    <title>PCC - Dashboard</title>
</svelte:head>

<section class="grow w-full p-2 max-w-lg mx-auto">
    <div class="rounded-lg shadow border flex flex-col gap-2 p-2 border-neutral-100 h-fit">
        <h3>Welcome {user.username}</h3>
    
        <p>Current plan : <span class="font-semibold">{ user.isPremium ? "Premium" : "Basic" }</span></p>
    
        <a href="/log-out" class="button-red">Log-out</a>
    </div>
</section>