<script>
    import { fly } from "svelte/transition";
    import { enhance } from "$app/forms";

    export let data;
    export let form;

    
    let { questions, user } = data;
    questions = questions.map(question => { return { ...question, hiddenReplies:true}});
    const maxMessageLength = 1_000;
    let replyModal = false;
    let replyModalQuestionId;
    let message = "";
    let isReplying = false;
    let newQuestionModal = false;
    let replieContainer;
    let replieContainerMaxHeight;
    
    $: if(form?.success && form?.submitType === "newReplie") {
        questions.filter(el => el.id === replyModalQuestionId)[0].replies = [...questions.filter(el => el.id === replyModalQuestionId)[0].replies, form.replie];
        replyModal = false;
        questions = questions;
        questions = questions.map(question => { return { ...question, hiddenReplies:true}});
    }else if(form?.success && form?.submitType === "newQuestion"){
        questions = [ form.question, ...questions ];
        newQuestionModal = false;
    }
    $: if(message?.length > maxMessageLength) message = message.slice(0, 1000);
    $: if(replieContainer) replieContainerMaxHeight = replieContainer.clientHeight;
</script>

<svelte:head>
    <title>PCC - Get Help</title>
</svelte:head>

<div class="max-w-screen-lg mx-auto mt-4 grow w-full p-2">
    <div class="w-full h-full flex flex-col gap-4">
        {#if user}
            <button class="button-primary" on:click={() => {newQuestionModal = !newQuestionModal}}>New question</button>
        {:else}
            <h3>To be able to ask a question, you need to be <a href="/auth" class="link">logged-in</a></h3>
        {/if}
        {#if questions.length === 0}
            <h2>No questions for now</h2>
        {/if}
        {#each questions as question}
            <div class="w-full flex flex-col gap-2 px-2 border-x border-neutral-200">
                <div class="flex flex-col gap-2">
                    <h3>{question.title}</h3>
                    {@html question.description.replaceAll("\n", "<br />")}
                    <h6>{question.postedBy.username} - <small>{new Date(question.postedAt).toLocaleDateString()}</small></h6>
                    <div class="w-full">
                        {#if user}
                            <button class="button-secondary" on:click={() => {replyModalQuestionId = question.id;replyModal = !replyModal;}}>Replie</button>
                        {:else}
                            <p>
                                To reply, please <a href="/auth" class="link">log-in</a>
                            </p>
                        {/if}
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <button class="w-full flex flex-row gap-4 no-scale underline" on:click={() => {question.hiddenReplies = !question.hiddenReplies;}}>
                        Show replies
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all {!question.hiddenReplies && "rotate-180"}">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    <div class="w-full overflow-hidden transition-all" style="max-height: {question.hiddenReplies ? 0 : replieContainerMaxHeight}px;">
                        <div class="w-full flex flex-col gap-4 pl-2" bind:this={replieContainer}>
                            {#each question.replies as replie}
                                <div class="flex flex-col gap-2 border-b border-neutral-200">
                                    <h5>{replie.user.username} - <small>{new Date(replie.at).toLocaleDateString()}</small></h5>
                                    <p>{@html replie.message.replaceAll("\n", "<br />")}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Replie modal -->
<div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 p-2 {newQuestionModal ? "opacity-100 z-40" : "opacity-0 -z-10"}">
    <form method="POST" action="?/newQuestion" use:enhance={(e) => {
        isReplying = true;
        return ({ update }) => {
            isReplying = false;
            update({ reset: false });
        }
    }} 
    class="rounded-lg bg-white p-4 flex flex-col gap-4 max-w-lg w-full relative">
        <button type="button" on:click={() => {replyModal = false;}} class="group absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-90">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h3>New question</h3>
        <input type="text" name="title" class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2" placeholder="Question title">
        <div class="relative">
            <span class="absolute top-1 right-1 text-xs font-normal">
                {message?.length}/{maxMessageLength}
            </span>
            <textarea name="description" placeholder="Question content" rows="6" bind:value={message} class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2"></textarea>
        </div>
        <button type="submit" class="button-primary transition-all overflow-hidden" disabled="{message?.length === 0}">
            {#if isReplying}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" in:fly={{ y: 100, duration: 400 }}>
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            {/if}
            <span class="transition-all">
                Post
            </span>
        </button>
    </form>
</div>

{#if questions.length > 0}
    <!-- Replie modal -->
    <div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 p-2 {replyModal ? "opacity-100 z-40" : "opacity-0 -z-10"}">
        <form method="POST" action="?/newReplie" use:enhance={(e) => {
            isReplying = true;
            e.formData.set("postId", questions.filter(el => el.id === replyModalQuestionId)[0].id)
            return ({ update }) => {
                isReplying = false;
                update({ reset: false });
            }
        }} 
        class="rounded-lg bg-white p-4 flex flex-col gap-4 max-w-lg w-full relative">
            <button type="button" on:click={() => {replyModalQuestionId = undefined;replyModal = false;}} class="group absolute top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-90">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h3>Reply to {replyModalQuestionId ? questions.filter(el => el.id === replyModalQuestionId)[0].postedBy.username : ""}</h3>
            <div class="relative">
                <span class="absolute top-1 right-1 text-xs font-normal">
                    {message?.length}/{maxMessageLength}
                </span>
                <textarea placeholder="Replie content" name="message" rows="6" bind:value={message} class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2"></textarea>
            </div>
            <button type="submit" class="button-primary transition-all overflow-hidden" disabled="{message?.length === 0}">
                {#if isReplying}
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" in:fly={{ y: 100, duration: 400 }}>
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                {/if}
                <span class="transition-all">
                    Reply
                </span>
            </button>
        </form>
    </div>
{/if}