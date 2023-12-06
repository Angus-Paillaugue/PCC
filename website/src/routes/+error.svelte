<script>
    import { page } from '$app/stores';
    import Card from "$lib/components/Card.svelte";
    import Link from "$lib/components/Link.svelte";
</script>

<svelte:head>
    <title>PCC - {$page.status} error</title>
    <meta name="description" content="A {$page.status} error occured">
</svelte:head>

<div class="h-full w-full grow flex flex-col justify-center">
    <Card class="w-full max-w-xl mx-auto text-center items-center gap-6">
        <div class="text-9xl font-extrabold text-text-main dark:text-neutral-100">{$page.status}</div>
        <p>{$page.error.message}</p>

        <Link href="/">
            Go back
        </Link>
    </Card>
</div>