<script>
  import '../app.css';
  import Analytics from '$lib/components/Analytics.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import CookieModal from '$lib/components/CookieModal.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import Toasts from '$lib/components/Toasts.svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import Theme from '$lib/components/Theme.svelte';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
  <script>
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 3748048, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  </script>
</svelte:head>

<Analytics />
<CookieModal />
<Banner />
<Toasts />

<main class="flex flex-col pr-2">
  <NavBar />

  <div class="min-h-screen pb-4 pt-20 w-full flex flex-col items-center">
    <slot />
  </div>

  <Footer />
</main>

<Theme />
