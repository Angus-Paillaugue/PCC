<script>
    import "../app.css";
    export let data;

    const { extensionPageUrl } = data;
</script>

<nav class="px-4 py-2 border-b border-neutral-200">
    <div class="flex flex-row items-center justify-between max-w-screen-lg mx-auto gap-4 h-14">
        <a href="/" class="h-full"><img src="/128-icon.png" alt="" class="h-full"></a>

        <div class="flex flex-row gap-4">
            <a href="/help" class="button-secondary w-fit">Get help</a>
    
            <a href="{extensionPageUrl}" class="button-primary w-fit">Get Started</a>
        </div>
    </div>
</nav>

<slot />