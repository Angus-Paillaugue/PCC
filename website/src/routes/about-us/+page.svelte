<script>
  import Icon from '@iconify/svelte';

  const teamMembers = [
    {
      firstName: 'Angus',
      name: 'Paillaugue',
      role: 'Project manager',
      profilePicture:
        'https://media.licdn.com/dms/image/D4E03AQEj5C1kgTQ5dw/profile-displayphoto-shrink_200_200/0/1679573349910?e=1706140800&v=beta&t=Krlgub0FEKD7OzQFF3MoPsJx9X3D175NcXxAMEI4BwU',
      githubProfileUrl: 'https://github.com/Angus-Paillaugue',
      linkedinProfileUrl: 'https://www.linkedin.com/in/angus-paillaugue/',
    },
  ];
</script>

<svelte:head>
  <title>PCC - About us</title>
  <meta name="description" content="About PCC" />
</svelte:head>

<section class="grow p-4 lg:p-6 mx-auto max-w-4xl w-full">
  <h2>About us</h2>

  <p>
    Hi, this is Angus, the creator of our beloved Pandabuy Currency Conversion
    navigator extension and this is my team.
  </p>

  <div
    class="grid mt-10"
    style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));"
  >
    {#each teamMembers as member}
      <div
        class="flex flex-col items-center justify-center relative max-w-[250px]"
      >
        <img
          src={member.profilePicture}
          alt=" {member.name} profile picture"
          draggable="false"
          class="w-28 h-28 object-cover rounded-full"
        />
        <h5 class="mt-4">{member.firstName} {member.name}</h5>
        <p class="text-base">{member.role}</p>
        <div
          class="flex flex-row items-center justify-center gap-6 mt-2 text-neutral-600 dark:text-neutral-400"
        >
          <a href={member.githubProfileUrl} target="_blank">
            <Icon
              icon="carbon:logo-github"
              class="w-8 h-8 hover:text-neutral-800 dark:hover:text-neutral-600 transition-all"
            />
          </a>
          <a href={member.linkedinProfileUrl} target="_blank">
            <Icon
              icon="carbon:logo-linkedin"
              class="w-8 h-8 hover:text-neutral-800 dark:hover:text-neutral-600 transition-all"
            />
          </a>
        </div>
      </div>
    {/each}
  </div>
</section>
