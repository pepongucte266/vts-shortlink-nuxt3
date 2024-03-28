<script setup lang='ts'>
const props = defineProps<{
  link: {
    shortKey: string,
    lonnngUrl: string,
    id: string,
    totalClick: number, 
  }
}>()

const config = useRuntimeConfig();

const handleCopy = () => {
  navigator.clipboard.writeText(`${config.public.appUrl}/${props.link.shortKey}`)
  alert('Copied to clipboard')
}

const handleOpenLink = () => {
  window.open(props.link.lonnngUrl);
}
</script>

<template>
  <div class="card flex justify-between">
    <div class="link-info">
      <NuxtLink :to="`/dashboard/${link.shortKey}`" class="text-amber-500 font-bold text-2xl">/{{ link.shortKey }}</NuxtLink>
      <div class="text-sm text-white/40">{{ link.lonnngUrl.slice(0, 20) + '...' }}</div>
    </div>
    <div class="flex justify-between gap-3">
      <div class="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>

         {{ link.totalClick }}
      </div>
      <button class="btn-primary w-12 h12 grid place-content-center rounded-full" @click="handleCopy">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>

      </button>
      <button class="border border-white/20 w-12 h12 grid place-content-center rounded-full" @click="handleOpenLink">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>

      </button>
    </div>

  </div>
</template>
