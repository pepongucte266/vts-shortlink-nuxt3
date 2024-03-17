<script setup lang='ts'>
import type { Database } from '~/types/supabase';
const params = useRoute().params;

const client = useSupabaseClient<Database>();

if(!params.id) {
  throw createError({
    statusCode: 404,
    message: "Not found"
  })
}

//get data from supabase
const {data} = useAsyncData('link', async () => {
  const {data, error} = await client.from('links').select('*').eq('key', params.id || '').single();
  if(error) {
    throw createError({
      statusCode: 404,
      message: "Not found"
    })
  }
  
  return data;
});

//redirect to long url
if(data.value?.long_url) {

  //var userAgent = useUserAgent();
  var userAgent = {ip: '192.160.0.2', userAgent: ''};
  if(userAgent && userAgent.ip) {
    var a = await client.from('clicks').insert({
      link_id: data.value.id,
      ip: userAgent.ip,
      country: null,
      city: null,
      user_agent: userAgent.userAgent || null
    });
  }
  useExtranalRedirect(data.value?.long_url)
}

</script>

<template>
  <div class="h-screen grid place-content-center">
    The website is redirecting, please wait
  </div>
</template>

<scope lang='scss'>
 
</scope>
