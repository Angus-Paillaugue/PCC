<script>
    import { fly } from "svelte/transition";
    import { enhance } from "$app/forms";
    import { newToast } from "$lib/stores";

    export let data;
    export let form;

    
    let { questions, user, supportEmail } = data;
    questions = questions.map(question => { return { ...question, hiddenReplies:true}});
    const maxMessageLength = 1_000;
    let replyModal = false;
    let deleteQuestionModal = false;
    let isReplying = false;
    let newQuestionModal = false;
    let deleteReplieModal = false;
    let newQuestionTitle = "";
    let deleteReplieId;
    let message = "";
    let replyModalQuestionId;
    let replieContainer;
    let replieContainerMaxHeight;
    
    $: if(form?.success) location.reload();
    $: if(message?.length > maxMessageLength) message = message.slice(0, maxMessageLength);
    $: if(replieContainer) replieContainerMaxHeight = replieContainer.clientHeight;

    function copyToClipboard(){
        const textarea = document.createElement('textarea');
        textarea.style.opacity = 0;
        textarea.style.width = 0;
        textarea.style.height = 0;
        textarea.style.position = 'absolute';
        textarea.style.bottom = '-100%';
        textarea.style.left = '-100%';
        textarea.style.margin = 0;
        textarea.value = supportEmail;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        console.log(textarea);
        textarea.remove();
        console.log(supportEmail);
        newToast("success", "Copied to clipboard");
    }
</script>

<svelte:head>
    <title>PCC - Get Help</title>
</svelte:head>

<div class="max-w-screen-lg mx-auto mt-4 grow w-full py-8 px-4 lg:px-6">
    <div class="w-full h-full flex flex-col gap-4">
        <h6 class="font-normal">Support e-mail : <button class="font-semibold" on:click={() => {copyToClipboard()}}>pandabuycurrencyconversion@gmail.com</button></h6>
        {#if user}
            <button class="button-primary" on:click={() => {newQuestionModal = !newQuestionModal}}>New question</button>
        {:else}
            <h3>To be able to ask a question, you need to be <a href="/auth" class="link">logged-in</a></h3>
        {/if}
        {#if questions.length === 0}
            <h2>No questions for now</h2>
        {/if}
        {#each questions as question}
            <div class="w-full flex flex-col gap-2 px-2 border-x border-neutral-200 relative">
                <div class="group/question flex flex-col gap-2">
                    {#if question.postedBy.username === user?.username}
                        <button class="absolute top-1 right-1 transition-all opacity-0 group-hover/question:opacity-100 group/button" on:click={() => {replyModalQuestionId = question.id;deleteQuestionModal = !deleteQuestionModal;}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover/button:text-red-600 transition-all">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    {/if}
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
                </div>
                <div class="flex flex-col gap-2">
                    <button class="w-full flex flex-row gap-4 no-scale underline" type="button" on:click={() => {question.hiddenReplies = !question.hiddenReplies;}}>
                        Show replies ({question.replies.length})
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all {!question.hiddenReplies && "rotate-180"}">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    <div class="w-full overflow-hidden transition-all" style="max-height: {question.hiddenReplies ? 0 : replieContainerMaxHeight}px;">
                        <div class="w-full flex flex-col gap-4 pl-2" bind:this={replieContainer}>
                            {#each question.replies as replie}
                                <div class="flex flex-col gap-2 border-b border-neutral-200 group/replie relative">
                                    {#if replie.user.username === user?.username}
                                        <button class="absolute top-1 right-1 transition-all opacity-0 group-hover/replie:opacity-100 group/button" on:click={() => {replyModalQuestionId = question.id;deleteReplieId = replie.id; deleteReplieModal = !deleteReplieModal;}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover/button:text-red-600 transition-all">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    {/if}
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


<!-- Delete replie modal -->
<div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 p-2 {deleteReplieModal ? "opacity-100 z-40" : "opacity-0 -z-10"}">
    <form method="POST" action="?/deleteReplie" 
    use:enhance={(e) => {
        e.formData.set("questionId", replyModalQuestionId);
        e.formData.set("replieId", deleteReplieId);
        return ({ update }) => {
            update({ reset: false });
        }
    }} 
    class="rounded-lg bg-white p-4 flex flex-col gap-4 max-w-lg w-full relative">
        <h3>Delete replie</h3>
        <p><span class="text-red-600 font-semibold">WARNING</span> : This operation is irreversible. Are you sure you want to delete this replie ?</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button class="button-secondary" type="button" on:click={() => {deleteQuestionModal = false;}}>No, cancel</button>
            <button class="button-primary" type="submit">Yes, delete</button>
        </div>
    </form>
</div>

<!-- Delete question modal -->
<div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 p-2 {deleteQuestionModal ? "opacity-100 z-40" : "opacity-0 -z-10"}">
    <form method="POST" action="?/deleteQuestion" 
    use:enhance={(e) => {
        e.formData.set("questionId", replyModalQuestionId);
        return ({ update }) => {
            update({ reset: false });
        }
    }} 
    class="rounded-lg bg-white p-4 flex flex-col gap-4 max-w-lg w-full relative">
        <h3>Delete question</h3>
        <p><span class="text-red-600 font-semibold">WARNING</span> : This operation is irreversible. Are you sure you want to delete this question ?</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button class="button-secondary" type="button" on:click={() => {deleteQuestionModal = false;}}>No, cancel</button>
            <button class="button-primary" type="submit">Yes, delete</button>
        </div>
    </form>
</div>

<!-- New question modal -->
<div class="fixed top-O left-0 w-full h-full transition-opacity flex flex-col justify-center items-center bg-neutral-600/50 p-2 {newQuestionModal ? "opacity-100 z-40" : "opacity-0 -z-10"}">
    <form method="POST" action="?/newQuestion" use:enhance={() => {
        isReplying = true;
        return ({ update }) => {
            isReplying = false;
            update({ reset: false });
        }
    }} 
    class="rounded-lg bg-white p-4 flex flex-col gap-4 max-w-lg w-full relative">
        <button type="button" on:click={() => {newQuestionModal = false;}} class="group absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all group-hover:rotate-90">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h3>New question</h3>
        <input type="text" name="title" bind:value={newQuestionTitle} class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2" placeholder="Question title">
        <div class="relative">
            <span class="absolute top-1 right-1 text-xs font-normal">
                {message?.length}/{maxMessageLength}
            </span>
            <textarea name="description" placeholder="Question content" rows="6" bind:value={message} class="border text-sm rounded-lg block w-full p-2.5 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:text-white focus:ring-primary-500 focus:border-primary-500 focus:outline-none outline-none transition-all caret-primary-600 focus:ring-offset-white focus:ring-offset-2 focus:ring-2"></textarea>
        </div>
        <button type="submit" class="button-primary transition-all overflow-hidden" disabled="{message?.length === 0 || newQuestionTitle?.length === 0}">
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
            e.formData.set("postId", replyModalQuestionId);
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
            <h3>Reply to {replyModalQuestionId ? questions.filter(el => el.id === replyModalQuestionId)[0]?.postedBy?.username : ""}</h3>
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