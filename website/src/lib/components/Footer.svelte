<script>
    import Link from "$lib/components/Link.svelte";
</script>

<footer class="w-full p-6 pt-24 flex flex-col border-t dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
    <div class="max-w-screen-xl mx-auto w-full">
        <div class="flex flex-col gap-6">
            <a href="/" class="flex flex-row items-center gap-2 w-fit">
                <img src="/logos/128-icon.png" alt="" class="w-10">
                <h5>PCC</h5>
            </a>
            <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div class="flex flex-col gap-4">
                    <h6>Support</h6>
                    <Link href="/help">Help</Link>
                    <Link href="/contact-us">Contact us</Link>
                </div>
                <div class="flex flex-col gap-4">
                    <h6>Company</h6>
                    <Link href="/about-us">About</Link>
                </div>
                <div class="flex flex-col gap-4 max-sm:col-span-2">
                    <h6>Legal</h6>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-of-services">Terms of services</Link>
                </div>
            </div>
        </div>
        <hr>
        <p class="mt-4 text-xs">© {new Date().getFullYear()} Pandabuy Currency Conversion, Inc. All rights reserved.</p>
    </div>
</footer>