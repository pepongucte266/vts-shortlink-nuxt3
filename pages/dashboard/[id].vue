<script setup lang="ts">
import type { Database } from "~/types/supabase";

const { id } = useRoute().params;

const { data } = useAsyncData(id.toString(), async () => {
  const client = useSupabaseClient<Database>();

  const { data: res, error } = await client
    .from("links")
    .select("*, clicks(*)")
    .eq("key", id)
    .single();

  return res;
});
</script>

<template>
  <main class="pt-28">
    <div class="container">
      <h1 class="text-5xl text-amber-500 font-bold">{{ data?.key }}</h1>
      <div class="mt-5">{{ data?.created_at }}</div>
      <div class="mt-5 flex flex-col md:flex-row  gap-5 justify-between">
        <div class="card flex-1">
          <div class="text-2x text-white/40 texteditable overflow-x-auto">{{ data?.long_url }}</div>
        </div>
        <div class="card flex flex-row md:flex-col items-center md:items-start">
          <div class="text-6xl font-bold text-white">{{ data?.total_clicks }}</div>
          <div>Total Clicks</div>
        </div>
      </div>
    </div>
    <div class="container mt-10">

      <h2 class="text-2xl mb-5">Clicks log</h2>
      <div v-for="(click) in data?.clicks" :key="click.id" class="card mb-5">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-lg font-bold text-amber-500">{{ click.ip }}</div>
            {{ click.created_at }}
          </div>
          <div>
            Viet Nam
            {{ click.city }}

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<scope lang="scss"></scope>
