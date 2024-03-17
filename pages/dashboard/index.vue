<script setup lang='ts'>
import { type Database } from '~/types/supabase';

  definePageMeta({
    middleware: ['auth']
  })

  const client = useSupabaseClient<Database>();

  const user = useSupabaseUser();

  const {data, refresh} = useAsyncData('links', async () => {
    const {data, error} = await client.from('links').select('*').eq('user_id', user.value?.id || '').order('created_at', {ascending: false})
    return data;
  })

  
</script>

<template>
  <main class="pt-28">
    <section class="container">
      <h1 class="text-2xl text-white font-bold">Dashboard</h1>
    </section>
    <section class="container mt-10">
      <LinkForm @created="refresh"></LinkForm>
    </section>
    <section class="container mt-10">
      <LinkItem 
        v-for="link in data"
        :link="{
          shortKey: link.key,
          lonnngUrl: link.long_url || '',
          id: link.id,
          totalClick: link.total_clicks || 0}"
        class="mb-5" />
    </section>
  </main>
</template>
