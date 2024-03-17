<script setup lang="ts">

const user = useSupabaseUser();

const client = useSupabaseClient();

const navLinks = ref<
  {
    to: string;
    label: string;
  }[]
>([
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]);

const handleLogout = async () => {
  await client.auth.signOut();

  useRouter().push({name: 'index'})
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 border-b border-white/20 bg-blur z-50">
    <nav class="container py-4 flex justify-between">
      <NuxtLink :to="{ name: 'index' }" class="text-2xl font-bold text-white">
        ShortLink
      </NuxtLink>
      <ul class="flex justify-between items-center gap-4">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
        </li>
        <li v-if="!user">
          <NuxtLink class="btn btn-primary" :to="{name: 'auth'}">
            Sign In
          </NuxtLink>
        </li>
        <li v-else>
          <button @click="handleLogout">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<scope lang="scss"></scope>
