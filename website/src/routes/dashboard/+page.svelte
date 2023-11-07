<script>
    export let data;

    const { user } = data;
</script>

<section class="grow w-full flex flex-col gap-2 p-2 max-w-screen-lg mx-auto">
    <h3>Welcome {user.username}</h3>

    <p>Current plan : <span class="font-semibold">{ user.isPremium ? "Premium" : "Basic" }</span></p>

    <a href="/log-out" class="link">Log-out</a>
</section>